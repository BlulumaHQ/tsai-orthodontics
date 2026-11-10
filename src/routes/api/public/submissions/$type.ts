import { createHmac } from "node:crypto";
import { createFileRoute } from "@tanstack/react-router";
import {
  isSubmissionType,
  parseSubmission,
  submissionValues,
  type SubmissionType,
} from "@/lib/forms/submission-schemas";
import type { StoreError, SubmissionStore } from "@/lib/forms/submission-store.server";

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

function rateLimitKey(request: Request, type: SubmissionType, secret?: string): string | null {
  if (!secret) return null;
  const address = request.headers.get("CF-Connecting-IP") ?? "local";
  return createHmac("sha256", secret).update(`${type}:${address}`).digest("hex");
}

async function notifySubmission(
  request: Request,
  store: SubmissionStore,
  type: SubmissionType,
  id: string,
) {
  const { getWorkerSecret } = await import("@/lib/forms/worker-env.server");
  const { sendFormNotification } = await import("@/lib/forms/notification.server");
  let claim;
  try {
    // Atomic claim prevents concurrent retries from sending the same notification.
    claim = await store.claim(type, id);
  } catch (e) {
    console.error("Form notification claim failed", { type, code: (e as StoreError).code });
    return "status_unavailable";
  }
  if (!claim.claimed) return claim.status ?? "status_unavailable";
  // Render the stored, validated submission, not a potentially changed retry body.
  const storedValues = submissionValues(
    type,
    type === "consultation" ? claim.payload : { values: claim.payload },
  );
  if (!storedValues) {
    await store
      .finish(type, id, { status: "failed", errorCode: "stored_payload_invalid" })
      .catch(() => undefined);
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
  if (result.status === "failed") {
    console.error("Form notification failed", {
      type,
      code: result.code,
      httpStatus: result.httpStatus,
    });
  }
  try {
    await store.finish(
      type,
      id,
      result.status === "sent"
        ? { status: "sent", providerId: result.providerId }
        : { status: "failed", errorCode: result.code, httpStatus: result.httpStatus ?? null },
    );
  } catch (e) {
    console.error("Form notification status update failed", { type, code: (e as StoreError).code });
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
        const { getSubmissionStore, resolveRateLimitSecret } = await import(
          "@/lib/forms/submission-store.server"
        );
        const key = rateLimitKey(request, params.type, resolveRateLimitSecret(request));
        const store = await getSubmissionStore(request);
        if (!key || !store) {
          console.error("Form submission configuration is unavailable");
          return json({ ok: false }, 503);
        }

        let allowed: boolean;
        try {
          allowed = await store.rateLimit(key, HOURLY_LIMIT);
        } catch (e) {
          console.error("Form submission rate limit failed", { code: (e as StoreError).code });
          return json({ ok: false }, 503);
        }
        if (!allowed) return json({ ok: false }, 429);

        let id: string;
        try {
          id = await store.insert(params.type, values, requestKey);
        } catch (e) {
          console.error("Form submission storage failed", {
            type: params.type,
            code: (e as StoreError).code,
          });
          return json({ ok: false }, 500);
        }

        let notification = "status_unavailable";
        try {
          notification = await notifySubmission(request, store, params.type, id);
        } catch {
          console.error("Form notification processing failed", { type: params.type });
        }
        // The existing received UX means saved, never proof of inbox delivery.
        return json({ ok: true, saved: true, reference: id, notification }, 201);
      },
    },
  },
});
