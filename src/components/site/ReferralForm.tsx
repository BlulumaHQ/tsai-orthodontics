import { useState } from "react";
import { toast } from "sonner";
import { submitFormValues } from "@/lib/forms/submit-form";
import {
  CheckboxGroup,
  FormSection,
  Grid,
  Honeypot,
  RadioGroup,
  TextArea,
  TextField,
  type Values,
} from "@/components/site/forms/FormKit";

export const REFERRAL_EMAIL = "admin@tsaiorthodontics.ca";

const REASONS = [
  "Crowding / spacing",
  "Overbite / deep bite",
  "Underbite / Class III",
  "Crossbite",
  "Overjet / protrusion",
  "Open bite",
  "Phase I evaluation",
  "Impacted teeth",
  "Missing teeth",
  "Habit appliance",
  "Surgical orthodontics",
  "Other",
];

export function ReferralForm() {
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const set = (k: string, v: string | string[]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!String(values.patientName ?? "").trim()) next.patientName = "Required";
    if (!String(values.referringDoctor ?? "").trim()) next.referringDoctor = "Required";
    const em = String(values.officeEmail ?? "").trim();
    if (em && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) next.officeEmail = "Invalid email";
    const pem = String(values.patientEmail ?? "").trim();
    if (pem && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(pem)) next.patientEmail = "Invalid email";
    if (Object.keys(next).length) {
      setErrors(next);
      toast.error("Please correct the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      await submitFormValues("dentist-referral", values);
      setValues({});
      toast.success("Thank you — the referral has been received.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "We could not submit the referral. Please try again or call the office.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative bg-background border border-foreground/10 rounded-3xl p-6 md:p-10 lg:p-12 space-y-10"
    >
      <Honeypot values={values} set={set} />

      <div className="rounded-2xl bg-secondary/40 border border-foreground/10 p-6 md:p-8">
        <div className="font-serif text-2xl mb-3">Orthodontic Referral</div>
        <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-2">
          CERTIFIED SPECIALIST IN ORTHODONTICS
        </div>
        <p className="text-sm text-foreground/85 leading-relaxed">
          Dr. Andrew Tsai, DMD, MSD, FRCD(C)
          <br />
          3431 Main Street, Vancouver, BC V5V 3M9
          <br />
          Phone:{" "}
          <a href="tel:+16046362686" className="hover:text-primary">
            (604) 636-2686
          </a>
        </p>
      </div>

      <FormSection title="Referral Urgency">
        <RadioGroup
          name="urgency"
          label="Referral Urgency"
          options={["Routine", "Within 1 month", "Urgent - please call"]}
          values={values}
          set={set}
        />
      </FormSection>

      <FormSection title="Patient">
        <div className="space-y-5">
          <Grid>
            <TextField
              name="patientName"
              label="Patient Name *"
              values={values}
              set={set}
              error={errors.patientName}
            />
            <TextField
              name="patientDob"
              label="Date of Birth"
              type="date"
              values={values}
              set={set}
            />
            <TextField name="patientPhone" label="Phone" type="tel" values={values} set={set} />
            <TextField
              name="patientEmail"
              label="Email"
              type="email"
              values={values}
              set={set}
              error={errors.patientEmail}
            />
            <TextField name="gender" label="Gender" values={values} set={set} />
            <TextField name="guardian" label="Parent / Guardian Name" values={values} set={set} />
          </Grid>
          <RadioGroup
            name="language"
            label="Language Preference"
            options={["English", "Mandarin", "Cantonese"]}
            values={values}
            set={set}
          />
        </div>
      </FormSection>

      <FormSection title="Referring Doctor / Practice">
        <Grid>
          <TextField
            name="referringDoctor"
            label="Referring Doctor / Practice *"
            values={values}
            set={set}
            error={errors.referringDoctor}
          />
          <TextField name="officePhone" label="Office Phone" type="tel" values={values} set={set} />
          <TextField
            name="referralDate"
            label="Date of Referral"
            type="date"
            values={values}
            set={set}
          />
          <TextField
            name="officeEmail"
            label="Office Email"
            type="email"
            values={values}
            set={set}
            error={errors.officeEmail}
          />
        </Grid>
      </FormSection>

      <FormSection title="Reason for Referral">
        <CheckboxGroup name="reasons" options={REASONS} values={values} set={set} />
      </FormSection>

      <FormSection title="Clinical Notes">
        <TextArea name="notes" label="Clinical Notes" rows={7} values={values} set={set} />
      </FormSection>

      <FormSection title="Enclosures & Dental History">
        <div className="space-y-6">
          <RadioGroup
            name="pano"
            label="Panoramic X-Ray"
            options={["None", "Emailed", "Copy given to patient"]}
            values={values}
            set={set}
          />
          <RadioGroup
            name="pending"
            label="Pending Dental Treatment Before Ortho?"
            options={["No", "Yes"]}
            values={values}
            set={set}
          />
          <Grid>
            <TextField
              name="lastCleaning"
              label="Date of Last Dental Cleaning"
              type="date"
              values={values}
              set={set}
            />
          </Grid>
          <TextArea
            name="pendingDetails"
            label="If Yes, Details:"
            values={values}
            set={set}
            rows={3}
          />
        </div>
      </FormSection>

      <div className="pt-6 border-t border-foreground/10 space-y-6">
        <p className="text-sm text-foreground/80 leading-relaxed">
          Complimentary consultations available. We welcome your patients and value your trust in
          our care.
          <br />
          For referral questions, email us at:{" "}
          <a href={`mailto:${REFERRAL_EMAIL}`} className="text-primary underline">
            {REFERRAL_EMAIL}
          </a>
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit Referral"}
        </button>
      </div>
    </form>
  );
}
