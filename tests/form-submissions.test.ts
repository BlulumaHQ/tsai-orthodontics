import { describe, expect, it } from "bun:test";
import {
  isSubmissionType,
  parseSubmission,
  submissionValues,
} from "../src/lib/forms/submission-schemas";

const consultation = {
  name: "Synthetic Test",
  email: "test@example.invalid",
  phone: "604-555-0100",
  interest: "Other",
  message: "Synthetic maintenance test",
};

describe("consultation submission validation", () => {
  it("accepts a complete consultation request", () => {
    expect(parseSubmission("consultation", consultation).success).toBe(true);
  });

  it("rejects an invalid email address", () => {
    expect(
      parseSubmission("consultation", { ...consultation, email: "not-an-email" }).success,
    ).toBe(false);
  });

  it("rejects missing contact details", () => {
    expect(parseSubmission("consultation", { ...consultation, name: "" }).success).toBe(false);
    expect(parseSubmission("consultation", { ...consultation, phone: "123" }).success).toBe(false);
    expect(parseSubmission("consultation", { ...consultation, message: "" }).success).toBe(false);
  });

  it("rejects unexpected fields", () => {
    expect(parseSubmission("consultation", { ...consultation, admin: true }).success).toBe(false);
  });
});

describe("patient intake submission validation", () => {
  const valid = {
    values: {
      firstName: "Synthetic",
      lastName: "Test",
      email: "test@example.invalid",
      signature: "Synthetic Test",
      medications: "None",
    },
  };

  it("accepts required intake fields", () => {
    expect(parseSubmission("patient-intake", valid).success).toBe(true);
  });

  it.each(["firstName", "lastName", "email", "signature"])("requires %s", (field) => {
    const values = { ...valid.values, [field]: "" };
    expect(parseSubmission("patient-intake", { values }).success).toBe(false);
  });
});

describe("dentist referral submission validation", () => {
  const valid = {
    values: {
      patientName: "Synthetic Test",
      referringDoctor: "Test Dental Office",
      officeEmail: "office@example.invalid",
      reasons: ["Crowding / spacing", "Other"],
    },
  };

  it("accepts required referral fields", () => {
    expect(parseSubmission("dentist-referral", valid).success).toBe(true);
  });

  it("requires patient and referring doctor names", () => {
    expect(
      parseSubmission("dentist-referral", { values: { ...valid.values, patientName: "" } }).success,
    ).toBe(false);
    expect(
      parseSubmission("dentist-referral", { values: { ...valid.values, referringDoctor: "" } })
        .success,
    ).toBe(false);
  });

  it("rejects malformed optional email addresses", () => {
    expect(
      parseSubmission("dentist-referral", { values: { ...valid.values, patientEmail: "bad" } })
        .success,
    ).toBe(false);
  });
});

describe("submission routing and extraction", () => {
  it("recognizes only the three public form types", () => {
    expect(isSubmissionType("consultation")).toBe(true);
    expect(isSubmissionType("patient-intake")).toBe(true);
    expect(isSubmissionType("dentist-referral")).toBe(true);
    expect(isSubmissionType("admin")).toBe(false);
  });

  it("returns only validated values", () => {
    expect(submissionValues("consultation", consultation)?.email).toBe("test@example.invalid");
    expect(submissionValues("consultation", { ...consultation, email: "bad" })).toBeNull();
  });
});
