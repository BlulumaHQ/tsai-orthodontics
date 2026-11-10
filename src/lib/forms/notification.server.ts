import type { SubmissionType } from "./submission-schemas";

export type NotificationResult =
  | { status: "sent"; providerId: string }
  | {
      status: "failed";
      code: "secret_missing" | "provider_rejected" | "provider_invalid_response" | "network_error";
      httpStatus?: number;
    };

const labels: Record<SubmissionType, string> = {
  consultation: "Consultation request",
  "patient-intake": "New patient intake",
  "dentist-referral": "Dentist referral",
};

// Provider acceptance is not proof of delivery to the clinic inbox.
export async function sendFormNotification(
  type: SubmissionType,
  reference: string,
  apiKey: string | undefined,
  fetcher: typeof fetch = fetch,
): Promise<NotificationResult> {
  if (!apiKey) return { status: "failed", code: "secret_missing" };
  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `website-form/${type}/${reference}`,
      },
      body: JSON.stringify({
        from: "Tsai Orthodontics <forms@send.tsaiorthodontics.ca>",
        to: ["admin@tsaiorthodontics.ca"],
        subject: `Website form received: ${labels[type]}`,
        text: `A ${labels[type].toLowerCase()} has been securely saved.\n\nReference: ${reference}\n\nPlease sign in to the clinic's authorized submission storage to review it. Patient names, contact details, medical history, and attachments are intentionally omitted from this notification.`,
      }),
    });
    if (!response.ok) {
      // Never log provider bodies: they may echo credentials or patient data.
      await response.body?.cancel();
      return { status: "failed", code: "provider_rejected", httpStatus: response.status };
    }
    const body: unknown = await response.json();
    if (
      !body ||
      typeof body !== "object" ||
      !("id" in body) ||
      typeof body.id !== "string" ||
      !body.id
    ) {
      return { status: "failed", code: "provider_invalid_response" };
    }
    return { status: "sent", providerId: body.id };
  } catch {
    return { status: "failed", code: "network_error" };
  }
}
