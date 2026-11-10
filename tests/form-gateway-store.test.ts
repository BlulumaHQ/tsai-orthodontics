import { describe, expect, test } from "bun:test";
import {
  createGatewayStore,
  getSubmissionStore,
  resolveRateLimitSecret,
} from "../src/lib/forms/submission-store.server";

const SECRET = "s".repeat(40);
function req(env: Record<string, string>) {
  const r = new Request("https://tsaiorthodontics.ca/api/public/submissions/consultation") as Request & {
    runtime?: unknown;
  };
  r.runtime = { cloudflare: { env } };
  return r;
}

function mockFetch(response: unknown, status = 200) {
  const calls: { url: string; init: RequestInit }[] = [];
  const f = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return new Response(JSON.stringify(response), { status });
  }) as unknown as typeof fetch;
  return { f, calls };
}

describe("gateway store", () => {
  test("insert calls form_gateway_insert with the secret and publishable key", async () => {
    const { f, calls } = mockFetch("11111111-1111-4111-8111-111111111111");
    const store = createGatewayStore("https://db.example", "pub", SECRET, f);
    const id = await store.insert("consultation", { name: "A" }, null);
    expect(id).toBe("11111111-1111-4111-8111-111111111111");
    expect(calls[0].url).toBe("https://db.example/rest/v1/rpc/form_gateway_insert");
    expect((calls[0].init.headers as Record<string, string>).apikey).toBe("pub");
    const body = JSON.parse(String(calls[0].init.body));
    expect(body.p_secret).toBe(SECRET);
    expect(body.p_type).toBe("consultation");
  });

  test("rate limit false blocks", async () => {
    const { f } = mockFetch(false);
    expect(await createGatewayStore("https://db", "pub", SECRET, f).rateLimit("k", 10)).toBe(false);
  });

  test("rejected secret surfaces the database error code", async () => {
    const { f } = mockFetch({ code: "42501" }, 403);
    await expect(createGatewayStore("https://db", "pub", "bad", f).rateLimit("k", 10)).rejects.toMatchObject({
      code: "42501",
    });
  });

  test("claim maps unclaimed status", async () => {
    const { f } = mockFetch({ claimed: false, status: "sent" });
    expect(await createGatewayStore("https://db", "pub", SECRET, f).claim("patient-intake", "x")).toEqual({
      claimed: false,
      status: "sent",
    });
  });
});

describe("configuration", () => {
  test("external Worker without gateway secret has no store", async () => {
    const saved = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const gw = process.env.FORM_GATEWAY_SECRET;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.FORM_GATEWAY_SECRET;
    expect(await getSubmissionStore(req({ SUPABASE_URL: "https://db", SUPABASE_PUBLISHABLE_KEY: "p" }))).toBeNull();
    if (saved) process.env.SUPABASE_SERVICE_ROLE_KEY = saved;
    if (gw) process.env.FORM_GATEWAY_SECRET = gw;
  });

  test("gateway store used when Worker bindings are complete", async () => {
    const store = await getSubmissionStore(
      req({ SUPABASE_URL: "https://db", SUPABASE_PUBLISHABLE_KEY: "p", FORM_GATEWAY_SECRET: SECRET }),
    );
    expect(store).not.toBeNull();
  });

  test("rate limit secret prefers FORM_RATE_LIMIT_SECRET", () => {
    expect(resolveRateLimitSecret(req({ FORM_RATE_LIMIT_SECRET: "a", LOVABLE_API_KEY: "b" }))).toBe("a");
  });

  test("rate limit secret falls back to LOVABLE_API_KEY", () => {
    expect(resolveRateLimitSecret(req({ LOVABLE_API_KEY: "b" }))).toBe("b");
  });

  test("rate limit secret missing", () => {
    const a = process.env.LOVABLE_API_KEY, b = process.env.FORM_RATE_LIMIT_SECRET;
    delete process.env.LOVABLE_API_KEY; delete process.env.FORM_RATE_LIMIT_SECRET;
    expect(resolveRateLimitSecret(req({}))).toBeUndefined();
    if (a) process.env.LOVABLE_API_KEY = a; if (b) process.env.FORM_RATE_LIMIT_SECRET = b;
  });
});
