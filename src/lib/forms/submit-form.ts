import type { SubmissionType } from "./submission-schemas";

const pendingKeys = new Map<SubmissionType, { body: string; key: string }>();

export async function submitFormValues(
  type: SubmissionType,
  values: Record<string, string | string[]>,
): Promise<{ saved: true; notification: string }> {
  const body = type === "consultation" ? values : { values };
  const encoded = JSON.stringify(body);
  const pending = pendingKeys.get(type);
  const key = pending?.body === encoded ? pending.key : crypto.randomUUID();
  pendingKeys.set(type, { body: encoded, key });
  const response = await fetch(`/api/public/submissions/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": key },
    body: encoded,
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Too many submissions. Please try again later or call the office.");
    }
    throw new Error("We could not submit your form. Please try again or call the office.");
  }
  const result = await response.json();
  if (!result.ok)
    throw new Error("We could not submit your form. Please try again or call the office.");
  pendingKeys.delete(type);
  return { saved: true, notification: result.notification ?? "not_requested" };
}
