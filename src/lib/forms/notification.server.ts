import type { SubmissionType } from "./submission-schemas";
import { z } from "zod";

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

type SubmittedValues = Record<string, string | string[]>;
const fields: Record<SubmissionType, readonly string[]> = {
  consultation: ["name", "email", "phone", "interest", "message"],
  "patient-intake": [
    "firstName",
    "middle",
    "lastName",
    "preferredName",
    "dob",
    "sex",
    "street",
    "city",
    "province",
    "postal",
    "cell",
    "email",
    "languages",
    "school",
    "referredBy",
    "parentName",
    "parentRelationship",
    "parentCell",
    "reason",
    "dual",
    "goodHealth",
    "physician",
    "medications",
    "allergies",
    "medicationList",
    "allergyList",
    "otherMedical",
    "lastVisit",
    "dentistName",
    "dentalOffice",
    "dentalOfficeContact",
    "dentalExplain",
    "signature",
    "signatureRelationship",
    "signatureDate",
  ],
  "dentist-referral": [
    "urgency",
    "patientName",
    "patientDob",
    "patientPhone",
    "patientEmail",
    "gender",
    "guardian",
    "language",
    "referringDoctor",
    "officePhone",
    "referralDate",
    "officeEmail",
    "reasons",
    "notes",
    "pano",
    "pending",
    "lastCleaning",
    "pendingDetails",
  ],
};
const insuranceFields = [
  "holderName",
  "holderDob",
  "relationship",
  "employer",
  "company",
  "certificate",
  "group",
  "insurerPhone",
];

export function renderFormNotification(
  type: SubmissionType,
  reference: string,
  values: SubmittedValues,
) {
  const keys = [...fields[type]];
  if (type === "patient-intake") {
    keys.push(
      ...["ins1_", "ins2_"].flatMap((prefix) =>
        insuranceFields.map((field) => `${prefix}${field}`),
      ),
    );
    keys.push(...Object.keys(values).filter((key) => /^(cond_|dental_|sleep_)/.test(key)));
  }
  const answers = keys.flatMap((key) => {
    const value = values[key];
    const text = Array.isArray(value) ? value.filter((item) => item.trim()).join(", ") : value;
    if (typeof text !== "string" || !text.trim()) return [];
    const label = key
      .replace(/^(cond_|dental_|sleep_)/, "")
      .replace(/^ins1_/, "Primary insurance ")
      .replace(/^ins2_/, "Secondary insurance ")
      .replace(/([a-z])([A-Z])/g, "$1 $2");
    return [`${label.charAt(0).toUpperCase()}${label.slice(1)}: ${text}`];
  });
  const candidate = type === "dentist-referral" ? values.officeEmail : values.email;
  const replyTo =
    typeof candidate === "string" && !/[\r\n]/.test(candidate)
      ? z.string().trim().email().max(255).safeParse(candidate)
      : null;
  return {
    subject: `Website form received: ${labels[type]}`,
    // Resend text MIME body: user input is literal text, never interpreted as HTML or headers.
    text: `${labels[type]}\nReference: ${reference}\n\n${answers.join("\n\n")}`,
    ...(replyTo?.success ? { reply_to: replyTo.data } : {}),
  };
}

// Provider acceptance is not proof of delivery to the clinic inbox.
export async function sendFormNotification(
  type: SubmissionType,
  reference: string,
  apiKey: string | undefined,
  fetcher: typeof fetch = fetch,
  values: SubmittedValues = {},
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
        ...renderFormNotification(type, reference, values),
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
