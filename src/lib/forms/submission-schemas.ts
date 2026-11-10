import { z } from "zod";

export const SUBMISSION_TYPES = ["consultation", "patient-intake", "dentist-referral"] as const;
export type SubmissionType = (typeof SUBMISSION_TYPES)[number];

const optionalEmail = z
  .string()
  .trim()
  .max(255)
  .refine((value) => value === "" || z.email().safeParse(value).success, "Invalid email");

export const consultationSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().min(7).max(30),
    interest: z.string().trim().max(100),
    message: z.string().trim().min(1).max(1500),
    _hp: z.string().max(200).optional(),
  })
  .strict();

const formValuesSchema = z
  .record(
    z.string().trim().min(1).max(160),
    z.union([z.string().max(5000), z.array(z.string().max(300)).max(30)]),
  )
  .refine((values) => Object.keys(values).length <= 160, "Too many fields")
  .refine((values) => JSON.stringify(values).length <= 90_000, "Submission is too large");

const patientIntakeEnvelopeSchema = z
  .object({ values: formValuesSchema })
  .strict()
  .superRefine((body, context) => {
    for (const field of ["firstName", "lastName", "signature"] as const) {
      const value = body.values[field];
      if (typeof value !== "string" || !value.trim()) {
        context.addIssue({
          code: "custom",
          message: `${field} is required`,
          path: ["values", field],
        });
      }
    }
    const email = body.values.email;
    if (typeof email !== "string" || !z.string().trim().email().max(255).safeParse(email).success) {
      context.addIssue({
        code: "custom",
        message: "A valid email is required",
        path: ["values", "email"],
      });
    }
  });

const dentistReferralEnvelopeSchema = z
  .object({ values: formValuesSchema })
  .strict()
  .superRefine((body, context) => {
    for (const field of ["patientName", "referringDoctor"] as const) {
      const value = body.values[field];
      if (typeof value !== "string" || !value.trim()) {
        context.addIssue({
          code: "custom",
          message: `${field} is required`,
          path: ["values", field],
        });
      }
    }
    for (const field of ["officeEmail", "patientEmail"] as const) {
      const value = body.values[field];
      if (
        value !== undefined &&
        (typeof value !== "string" || !optionalEmail.safeParse(value).success)
      ) {
        context.addIssue({ code: "custom", message: `Invalid ${field}`, path: ["values", field] });
      }
    }
  });

export function parseSubmission(type: SubmissionType, body: unknown) {
  if (type === "consultation") return consultationSchema.safeParse(body);
  if (type === "patient-intake") return patientIntakeEnvelopeSchema.safeParse(body);
  return dentistReferralEnvelopeSchema.safeParse(body);
}

export function submissionValues(
  type: SubmissionType,
  body: unknown,
): Record<string, string | string[]> | null {
  const parsed = parseSubmission(type, body);
  if (!parsed.success) return null;
  if (type === "consultation") return parsed.data as Record<string, string | string[]>;
  return "values" in parsed.data ? parsed.data.values : null;
}

export function isSubmissionType(value: string): value is SubmissionType {
  return SUBMISSION_TYPES.includes(value as SubmissionType);
}
