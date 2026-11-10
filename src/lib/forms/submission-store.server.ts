import type { SubmissionType } from "@/lib/forms/submission-schemas";
import { getWorkerSecret } from "@/lib/forms/worker-env.server";

type Payload = Record<string, string | string[]>;
export type ClaimResult =
  | { claimed: true; payload: unknown }
  | { claimed: false; status: string | null };
export type FinishInput = {
  status: "sent" | "failed";
  providerId?: string | null;
  errorCode?: string | null;
  httpStatus?: number | null;
};

export interface SubmissionStore {
  rateLimit(key: string, limit: number): Promise<boolean>;
  insert(type: SubmissionType, payload: Payload, requestKey: string | null): Promise<string>;
  claim(type: SubmissionType, id: string): Promise<ClaimResult>;
  finish(type: SubmissionType, id: string, input: FinishInput): Promise<void>;
}

export class StoreError extends Error {
  constructor(public code: string) {
    super(code);
  }
}

/**
 * External Worker backend: gated SECURITY DEFINER RPCs over the Data API with the
 * publishable key. The shared secret is the only authorization; never log it.
 */
export function createGatewayStore(
  url: string,
  publishableKey: string,
  secret: string,
  fetchImpl: typeof fetch = fetch,
): SubmissionStore {
  async function rpc<T>(name: string, args: Record<string, unknown>): Promise<T> {
    const res = await fetchImpl(`${url.replace(/\/$/, "")}/rest/v1/rpc/${name}`, {
      method: "POST",
      headers: { apikey: publishableKey, "Content-Type": "application/json" },
      body: JSON.stringify({ p_secret: secret, ...args }),
    });
    if (!res.ok) {
      let code = `http_${res.status}`;
      try {
        const body = (await res.json()) as { code?: string };
        if (body?.code) code = body.code;
      } catch {
        /* ignore */
      }
      throw new StoreError(code);
    }
    const text = await res.text();
    return (text ? JSON.parse(text) : null) as T;
  }
  return {
    rateLimit: async (key, limit) =>
      (await rpc<boolean>("form_gateway_rate_limit", { p_key: key, p_limit: limit })) === true,
    insert: async (type, payload, requestKey) => {
      const id = await rpc<string | null>("form_gateway_insert", {
        p_type: type,
        p_payload: payload,
        p_request_key: requestKey,
      });
      if (!id) throw new StoreError("insert_failed");
      return id;
    },
    claim: async (type, id) => {
      const r = await rpc<{ claimed: boolean; payload?: unknown; status?: string | null }>(
        "form_gateway_claim",
        { p_type: type, p_id: id },
      );
      return r?.claimed
        ? { claimed: true, payload: r.payload }
        : { claimed: false, status: r?.status ?? null };
    },
    finish: async (type, id, input) => {
      await rpc("form_gateway_finish", {
        p_type: type,
        p_id: id,
        p_status: input.status,
        p_provider_id: input.providerId ?? null,
        p_error_code: input.errorCode ?? null,
        p_http_status: input.httpStatus ?? null,
      });
    },
  };
}

function table(type: SubmissionType) {
  if (type === "consultation") return "consultation_requests" as const;
  if (type === "patient-intake") return "patient_intake_submissions" as const;
  return "dentist_referral_submissions" as const;
}

async function createAdminStore(): Promise<SubmissionStore> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const fail = (e: { code?: string } | null) => {
    if (e) throw new StoreError(e.code ?? "db_error");
  };
  return {
    async rateLimit(key, limit) {
      const { data, error } = await supabaseAdmin.rpc("consume_form_submission_rate_limit", {
        p_key: key,
        p_limit: limit,
      });
      fail(error);
      return data === true;
    },
    async insert(type, payload, requestKey) {
      const t = table(type);
      if (requestKey) {
        const { data, error } = await supabaseAdmin.from(t).select("id").eq("request_key", requestKey).maybeSingle();
        fail(error);
        if (data) return data.id;
      }
      const { data, error } = await supabaseAdmin
        .from(t)
        .insert({ payload, request_key: requestKey, notification_status: "pending" })
        .select("id")
        .single();
      if (error?.code === "23505" && requestKey) {
        const ex = await supabaseAdmin.from(t).select("id").eq("request_key", requestKey).single();
        fail(ex.error);
        return ex.data!.id;
      }
      fail(error);
      return data!.id;
    },
    async claim(type, id) {
      const t = table(type);
      const c = await supabaseAdmin
        .from(t)
        .update({ notification_status: "sending", notification_attempted_at: new Date().toISOString() })
        .eq("id", id)
        .in("notification_status", ["pending", "failed"])
        .select("payload")
        .maybeSingle();
      fail(c.error);
      if (c.data) return { claimed: true, payload: c.data.payload };
      const cur = await supabaseAdmin.from(t).select("notification_status").eq("id", id).single();
      return { claimed: false, status: cur.data?.notification_status ?? null };
    },
    async finish(type, id, input) {
      const { error } = await supabaseAdmin
        .from(table(type))
        .update({
          notification_status: input.status,
          notification_provider_id: input.status === "sent" ? (input.providerId ?? null) : null,
          notification_error_code: input.status === "failed" ? (input.errorCode ?? null) : null,
          notification_http_status: input.status === "failed" ? (input.httpStatus ?? null) : null,
        })
        .eq("id", id);
      fail(error);
    },
  };
}

/** Returns null when neither backend is configured. */
export async function getSubmissionStore(request: Request): Promise<SubmissionStore | null> {
  const env = (n: string) => getWorkerSecret(request, n) ?? process.env[n];
  const gatewaySecret = env("FORM_GATEWAY_SECRET");
  const url = env("SUPABASE_URL");
  const key = env("SUPABASE_PUBLISHABLE_KEY");
  if (gatewaySecret && url && key) return createGatewayStore(url, key, gatewaySecret);
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) return createAdminStore();
  return null;
}

export function resolveRateLimitSecret(request: Request): string | undefined {
  return (
    getWorkerSecret(request, "FORM_RATE_LIMIT_SECRET") ??
    getWorkerSecret(request, "LOVABLE_API_KEY") ??
    process.env.FORM_RATE_LIMIT_SECRET ??
    process.env.LOVABLE_API_KEY
  );
}
