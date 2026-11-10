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

function rateLimitKey(request: Request, type: SubmissionType): string | null {
  const secret = process.env.LOVABLE_API_KEY;
  if (!secret) return null;
  const address = request.headers.get("CF-Connecting-IP") ?? "local";
  return createHmac("sha256", secret).update(`${type}:${address}`).digest("hex");
}

async function insertSubmission(
  type: SubmissionType,
  payload: Record<string, string | string[]>,
): Promise<{ id?: string; error?: { code?: string } }> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  if (type === "consultation") {
    const { data, error } = await supabaseAdmin
      .from("consultation_requests")
      .insert({ payload })
      .select("id")
      .single();
    return { id: data?.id, error: error ?? undefined };
  }
  if (type === "patient-intake") {
    const { data, error } = await supabaseAdmin
      .from("patient_intake_submissions")
      .insert({ payload })
      .select("id")
      .single();
    return { id: data?.id, error: error ?? undefined };
  }
  const { data, error } = await supabaseAdmin
    .from("dentist_referral_submissions")
    .insert({ payload })
    .select("id")
    .single();
  return { id: data?.id, error: error ?? undefined };
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

        const key = rateLimitKey(request, params.type);
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

        const result = await insertSubmission(params.type, values);
        if (result.error || !result.id) {
          console.error("Form submission storage failed", {
            type: params.type,
            code: result.error?.code,
          });
          return json({ ok: false }, 500);
        }

        return json({ ok: true, reference: result.id }, 201);
      },
    },
  },
});
