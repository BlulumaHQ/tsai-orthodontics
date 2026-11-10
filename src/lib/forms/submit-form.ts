import type { SubmissionType } from "./submission-schemas";

export async function submitFormValues(
  type: SubmissionType,
  values: Record<string, string | string[]>,
): Promise<void> {
  const body = type === "consultation" ? values : { values };
  const response = await fetch(`/api/public/submissions/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Too many submissions. Please try again later or call the office.");
    }
    throw new Error("We could not submit your form. Please try again or call the office.");
  }
}
