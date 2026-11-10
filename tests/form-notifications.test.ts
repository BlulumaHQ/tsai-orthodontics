import { describe, expect, it } from "bun:test";
import { sendFormNotification } from "../src/lib/forms/notification.server";
import { getWorkerSecret, withWorkerBindings } from "../src/lib/forms/worker-env.server";
import { SUBMISSION_TYPES } from "../src/lib/forms/submission-schemas";

const mockFetch = (callback: (url: string, init?: RequestInit) => Promise<Response>) =>
  callback as typeof fetch;

describe("private owner notifications", () => {
  for (const type of SUBMISSION_TYPES) {
    it(`sends ${type} to the approved clinic address without patient payloads`, async () => {
      let calls = 0;
      const result = await sendFormNotification(
        type,
        "synthetic-reference",
        "mock-only",
        mockFetch(async (url, init) => {
          calls++;
          expect(url).toBe("https://api.resend.com/emails");
          const body = JSON.parse(String(init?.body));
          expect(body.from).toBe("Tsai Orthodontics <forms@send.tsaiorthodontics.ca>");
          expect(body.to).toEqual(["admin@tsaiorthodontics.ca"]);
          expect(Object.keys(body).sort()).toEqual(["from", "subject", "text", "to"]);
          expect(body.text).toContain("synthetic-reference");
          expect(new Headers(init?.headers).get("Idempotency-Key")).toBe(
            `website-form/${type}/synthetic-reference`,
          );
          return Response.json({ id: "synthetic-provider-id" });
        }),
      );
      expect(calls).toBe(1);
      expect(result).toEqual({ status: "sent", providerId: "synthetic-provider-id" });
    });
  }

  it("does not call Resend when the Worker secret is missing", async () => {
    let called = false;
    const result = await sendFormNotification(
      "consultation",
      "test",
      undefined,
      mockFetch(async () => {
        called = true;
        return Response.json({ id: "unexpected" });
      }),
    );
    expect(called).toBe(false);
    expect(result).toEqual({ status: "failed", code: "secret_missing" });
  });

  it.each([401, 403, 429, 500])("sanitizes provider failure %s", async (status) => {
    const result = await sendFormNotification(
      "patient-intake",
      "test",
      "mock-only",
      mockFetch(
        async () => new Response("Sensitive provider response must not escape", { status }),
      ),
    );
    expect(result).toEqual({ status: "failed", code: "provider_rejected", httpStatus: status });
  });

  it("rejects a success response without a message id", async () => {
    expect(
      await sendFormNotification(
        "dentist-referral",
        "test",
        "mock-only",
        mockFetch(async () => Response.json({ error: "invalid" })),
      ),
    ).toEqual({ status: "failed", code: "provider_invalid_response" });
  });

  it("sanitizes network exceptions", async () => {
    expect(
      await sendFormNotification(
        "consultation",
        "test",
        "mock-only",
        mockFetch(async () => {
          throw new Error("Sensitive exception");
        }),
      ),
    ).toEqual({ status: "failed", code: "network_error" });
  });

  it("reuses the provider idempotency key across retries", async () => {
    const keys: Array<string | null> = [];
    const provider = mockFetch(async (_, init) => {
      keys.push(new Headers(init?.headers).get("Idempotency-Key"));
      return Response.json({ id: "same-id" });
    });
    await sendFormNotification("consultation", "same-reference", "mock-only", provider);
    await sendFormNotification("consultation", "same-reference", "mock-only", provider);
    expect(keys).toEqual([
      "website-form/consultation/same-reference",
      "website-form/consultation/same-reference",
    ]);
  });
});

describe("native Worker bindings", () => {
  it("reads Nitro's production request binding without process.env", () => {
    const request = Object.assign(new Request("https://tsaiorthodontics.ca"), {
      runtime: { cloudflare: { env: { RESEND_API_KEY: "mock-only" } } },
    });
    expect(getWorkerSecret(request, "RESEND_API_KEY")).toBe("mock-only");
  });

  it("reads the fetch entry binding in downstream handlers", () => {
    const request = new Request("https://tsaiorthodontics.ca");
    expect(
      withWorkerBindings(request, { RESEND_API_KEY: "mock-only" }, () =>
        getWorkerSecret(new Request(request), "RESEND_API_KEY"),
      ),
    ).toBe("mock-only");
    expect(getWorkerSecret(request, "RESEND_API_KEY")).toBeUndefined();
  });

  it("does not mix bindings between concurrent requests", async () => {
    const request = new Request("https://tsaiorthodontics.ca");
    const results = await Promise.all(
      ["mock-a", "mock-b"].map((value) =>
        withWorkerBindings(request, { RESEND_API_KEY: value }, async () => {
          await Promise.resolve();
          return getWorkerSecret(request, "RESEND_API_KEY");
        }),
      ),
    );
    expect(results).toEqual(["mock-a", "mock-b"]);
  });
});
