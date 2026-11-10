import { createHmac } from "node:crypto";
import { createFileRoute } from "@tanstack/react-router";
import {
  isSubmissionType,
  parseSubmission,
  submissionValues,
  type SubmissionType,
} from "@/lib/forms/submission-schemas";

const MAX_BODY_BYTES = 100_000;
const HOURLY_LIMIT = 10;

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  try {
    const requestUrl = new URL(request.url);
    return origin === `${requestUrl.protocol}//${requestUrl.host}`;
  } catch {
    return false;
  }
}

function rateLimitKey(
  request: Request,
  type: SubmissionType,
  workerSecret?: string,
): string | null {
  const secret = workerSecret ?? process.env.LOVABLE_API_KEY;
  if (!secret) return null;
  const address = request.headers.get("CF-Connecting-IP") ?? "local";
  return createHmac("sha256", secret).update(`${type}:${address}`).digest("hex");
}

async function insertSubmission(
  type: SubmissionType,
  payload: Record<string, string | string[]>,
  requestKey: string | null,
): Promise<{ id?: string; error?: { code?: string } }> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const table = submissionTable(type);
  if (requestKey) {
    const { data, error } = await supabaseAdmin
      .from(table)
      .select("id")
      .eq("request_key", requestKey)
      .maybeSingle();
    if (error) return { error };
    if (data) return { id: data.id };
  }
  const { data, error } = await supabaseAdmin
    .from(table)
    .insert({ payload, request_key: requestKey, notification_status: "pending" })
    .select("id")
    .single();
  if (error?.code === "23505" && requestKey) {
    const existing = await supabaseAdmin
      .from(table)
      .select("id")
      .eq("request_key", requestKey)
      .single();
    return { id: existing.data?.id, error: existing.error ?? undefined };
  }
  return { id: data?.id, error: error ?? undefined };
}

function submissionTable(type: SubmissionType) {
  if (type === "consultation") return "consultation_requests" as const;
  if (type === "patient-intake") return "patient_intake_submissions" as const;
  return "dentist_referral_submissions" as const;
}

async function notifySubmission(request: Request, type: SubmissionType, id: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { getWorkerSecret } = await import("@/lib/forms/worker-env.server");
  const { sendFormNotification } = await import("@/lib/forms/notification.server");
  const table = submissionTable(type);
  // Atomic claim prevents concurrent retries from sending the same notification.
  const claim = await supabaseAdmin
    .from(table)
    .update({
      notification_status: "sending",
      notification_attempted_at: new Date().toISOString(),
    })
    .eq("id", id)
    .in("notification_status", ["pending", "failed"])
    .select("id, payload")
    .maybeSingle();
  if (claim.error) {
    console.error("Form notification claim failed", { type, code: claim.error.code });
    return "status_unavailable";
  }
  if (!claim.data) {
    const current = await supabaseAdmin
      .from(table)
      .select("notification_status")
      .eq("id", id)
      .single();
    return current.data?.notification_status ?? "status_unavailable";
  }
  // Render the stored, validated submission, not a potentially changed retry body.
  const storedValues = submissionValues(
    type,
    type === "consultation" ? claim.data.payload : { values: claim.data.payload },
  );
  if (!storedValues) {
    await supabaseAdmin
      .from(table)
      .update({ notification_status: "failed", notification_error_code: "stored_payload_invalid" })
      .eq("id", id);
    console.error("Form notification payload validation failed", { type });
    return "failed";
  }
  const result = await sendFormNotification(
    type,
    id,
    getWorkerSecret(request, "RESEND_API_KEY"),
    fetch,
    storedValues,
  );
  const update = await supabaseAdmin
    .from(table)
    .update({
      notification_status: result.status,
      notification_provider_id: result.status === "sent" ? result.providerId : null,
      notification_error_code: result.status === "failed" ? result.code : null,
      notification_http_status: result.status === "failed" ? (result.httpStatus ?? null) : null,
    })
    .eq("id", id);
  if (result.status === "failed") {
    console.error("Form notification failed", {
      type,
      code: result.code,
      httpStatus: result.httpStatus,
    });
  }
  if (update.error) {
    console.error("Form notification status update failed", { type, code: update.error.code });
    return "status_unavailable";
  }
  return result.status;
}

export const Route = createFileRoute("/api/public/submissions/$type")({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        if (!isSubmissionType(params.type)) return json({ ok: false }, 404);
        if (!isSameOrigin(request)) return json({ ok: false }, 403);
        if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
          return json({ ok: false }, 415);
        }

        let body: unknown;
        try {
          const text = await request.text();
          if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
            return json({ ok: false }, 413);
          }
          body = JSON.parse(text);
        } catch {
          return json({ ok: false }, 400);
        }

        const parsed = parseSubmission(params.type, body);
        if (!parsed.success) return json({ ok: false }, 400);
        const values = submissionValues(params.type, body);
        if (!values) return json({ ok: false }, 400);
        if (typeof values._hp === "string" && values._hp.trim()) return json({ ok: true });

        const requestKey = request.headers.get("Idempotency-Key");
        if (
          requestKey &&
          !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestKey)
        ) {
          return json({ ok: false }, 400);
        }
        const { getWorkerSecret } = await import("@/lib/forms/worker-env.server");
        const key = rateLimitKey(request, params.type, getWorkerSecret(request, "LOVABLE_API_KEY"));
        if (!key) {
          console.error("Form submission configuration is unavailable");
          return json({ ok: false }, 503);
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: allowed, error: rateLimitError } = await supabaseAdmin.rpc(
          "consume_form_submission_rate_limit",
          { p_key: key, p_limit: HOURLY_LIMIT },
        );
        if (rateLimitError) {
          console.error("Form submission rate limit failed", { code: rateLimitError.code });
          return json({ ok: false }, 503);
        }
        if (!allowed) return json({ ok: false }, 429);

        const result = await insertSubmission(params.type, values, requestKey);
        if (result.error || !result.id) {
          console.error("Form submission storage failed", {
            type: params.type,
            code: result.error?.code,
          });
          return json({ ok: false }, 500);
        }

        let notification = "status_unavailable";
        try {
          notification = await notifySubmission(request, params.type, result.id);
        } catch {
          console.error("Form notification processing failed", { type: params.type });
        }
        // The existing received UX means saved, never proof of inbox delivery.
        return json({ ok: true, saved: true, reference: result.id, notification }, 201);
      },
    },
  },
});
