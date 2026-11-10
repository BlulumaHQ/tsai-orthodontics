import { describe, expect, it } from "bun:test";
import { renderFormNotification, sendFormNotification } from "../src/lib/forms/notification.server";
import { getWorkerSecret, withWorkerBindings } from "../src/lib/forms/worker-env.server";
import { SUBMISSION_TYPES } from "../src/lib/forms/submission-schemas";

const mockFetch = (callback: (url: string, init?: RequestInit) => Promise<Response>) =>
  callback as typeof fetch;

describe("private owner notifications", () => {
  for (const type of SUBMISSION_TYPES) {
    it(`sends ${type} only to the approved clinic address`, async () => {
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

describe("submitted clinic email details", () => {
  it("includes consultation contact details and message as plain text", () => {
    const rendered = renderFormNotification("consultation", "synthetic-reference", {
      name: "Synthetic Patient",
      email: "synthetic@example.invalid",
      phone: "6045550100",
      interest: "Braces",
      message: "<script>alert('test')</script> & questions",
    });
    expect(rendered.text).toContain("Name: Synthetic Patient");
    expect(rendered.text).toContain("Phone: 6045550100");
    expect(rendered.text).toContain("Interest: Braces");
    expect(rendered.text).toContain("<script>alert('test')</script> & questions");
    expect(rendered.reply_to).toBe("synthetic@example.invalid");
    expect("html" in rendered).toBe(false);
  });

  it("includes intake name, cell phone, and submitted intake answers only", () => {
    const rendered = renderFormNotification("patient-intake", "test", {
      firstName: "Synthetic",
      lastName: "Patient",
      email: "synthetic@example.invalid",
      cell: "6045550100",
      parentCell: "6045550101",
      reason: "Consultation question",
      medicationList: "Synthetic answer",
      "sleep_Always snore?": "No",
      city: "",
    });
    for (const value of [
      "Synthetic",
      "Patient",
      "6045550100",
      "6045550101",
      "Consultation question",
      "Synthetic answer",
      "Always snore?: No",
    ]) {
      expect(rendered.text).toContain(value);
    }
    expect(rendered.text).not.toContain("City:");
    expect(rendered.text).not.toContain("Please sign in");
  });

  it("includes referral contacts and text, replying to the referring office", () => {
    const rendered = renderFormNotification("dentist-referral", "test", {
      referringDoctor: "Synthetic Doctor",
      officeEmail: "office@example.invalid",
      officePhone: "6045550102",
      patientName: "Synthetic Patient",
      patientEmail: "patient@example.invalid",
      patientPhone: "6045550103",
      reasons: ["Crowding", "Other"],
      notes: "Synthetic referral notes",
      pendingDetails: "Synthetic treatment text",
    });
    for (const value of [
      "Synthetic Doctor",
      "office@example.invalid",
      "6045550102",
      "Synthetic Patient",
      "patient@example.invalid",
      "6045550103",
      "Crowding, Other",
      "Synthetic referral notes",
      "Synthetic treatment text",
    ]) {
      expect(rendered.text).toContain(value);
    }
    expect(rendered.reply_to).toBe("office@example.invalid");
  });

  it.each([
    "bad-address",
    "patient@example.invalid\r\nBcc: intruder@example.invalid",
    "Patient <patient@example.invalid>",
  ])("omits invalid Reply-To %s", (email) => {
    expect(renderFormNotification("consultation", "test", { email }).reply_to).toBeUndefined();
  });

  it("excludes honeypot, secrets, attachments, and upload links", () => {
    const rendered = renderFormNotification("patient-intake", "test", {
      firstName: "Synthetic",
      _hp: "hidden",
      RESEND_API_KEY: "not-a-real-secret",
      attachment: "fake-file",
      uploadUrl: "https://example.invalid/file",
      token: "fake-token",
    });
    for (const value of [
      "hidden",
      "not-a-real-secret",
      "fake-file",
      "https://example.invalid/file",
      "fake-token",
    ]) {
      expect(rendered.text).not.toContain(value);
    }
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
