import { useState } from "react";
import { toast } from "sonner";
import { submitFormValues } from "@/lib/forms/submit-form";
import {
  FormSection,
  Grid,
  Honeypot,
  RadioGroup,
  TextArea,
  TextField,
  type Values,
} from "@/components/site/forms/FormKit";

const YN = ["Yes", "No"];
const YND = ["Yes", "No", "Don't Know"];
const RELATIONSHIPS = ["Self", "Mother", "Father", "Grandparent", "Guardian", "Spouse", "Other"];

const MEDICAL_YN: [string, string][] = [
  ["goodHealth", "Is the patient in good health?"],
  ["physician", "Treated by a physician in last 2 years?"],
  ["medications", "Currently taking any medications?"],
  ["allergies", "Any allergies?"],
];

const CONDITIONS = [
  "Diabetes",
  "Arthritis",
  "Hepatitis",
  "Tuberculosis",
  "Autism spectrum disorder",
  "Asthma",
  "Nervous disorders",
  "Epilepsy",
  "Kidney disease",
  "Sensory disorder",
  "Prolonged bleeding",
  "Heart murmur",
  "Osteoporosis",
  "Anemia",
];

const DENTAL_YN = [
  "Jaw joint popping?",
  "Clench or grind teeth?",
  "Injury to head / neck / jaw?",
  "Previously treated TMJ?",
  "Noise / pain in jaw or ears?",
  "Mouth breather?",
  "Missing teeth?",
  "Extra teeth?",
  "Uncomfortable bite?",
  "Oral habits (thumb/finger/nail)?",
  "Previous ortho treatment / consult?",
  "History of jaw joint problems?",
];

const SLEEP_GROUPS: [string, string[]][] = [
  [
    "While sleeping, does your child...",
    [
      "Snore more than half the time?",
      "Always snore?",
      "Snore loudly?",
      'Have "heavy" or loud breathing?',
      "Have trouble breathing or struggle to breathe?",
    ],
  ],
  ["Have you ever...", ["Seen your child stop breathing during the night?"]],
  [
    "Does your child...",
    [
      "Tend to breathe through the mouth during the day?",
      "Have a dry mouth on waking up in the morning?",
      "Occasionally wet the bed?",
      "Wake up feeling un-refreshed in the morning?",
      "Have a problem with sleepiness during the day?",
      "Has a teacher or other supervisor commented that your child appears sleepy during the day?",
      "Is it hard to wake your child up in the morning?",
      "Does your child wake up with headaches in the morning?",
      "Did your child stop growing at a normal rate at any time since birth?",
      "Is your child overweight?",
    ],
  ],
  [
    "This child often...",
    [
      "Does not seem to listen when spoken to directly",
      "Has difficulty organizing tasks",
      "Is easily distracted by extraneous stimuli",
      "Fidgets with hands or feet or squirms in seat",
      'Is "on the go" or often acts as if "driven by a motor"',
      "Interrupts or intrudes on others (e.g. butts into conversations or games)",
    ],
  ],
];

const CONSENT_TEXT =
  "I attest that the information above is true and accurate. I authorize Tsai Orthodontics to bill my dental insurance for treatment where applicable. I acknowledge that my personal health information will be collected, used, and protected in accordance with the practice's privacy policy under British Columbia's Personal Information Protection Act (PIPA) and Canada's PIPEDA. A copy of the privacy policy is available on request.";

function InsuranceFields({
  prefix,
  values,
  set,
}: {
  prefix: string;
  values: Values;
  set: (k: string, v: string | string[]) => void;
}) {
  const p = (k: string) => `${prefix}${k}`;
  return (
    <div className="space-y-5">
      <Grid>
        <TextField name={p("holderName")} label="Policy Holder's Name" values={values} set={set} />
        <TextField
          name={p("holderDob")}
          label="Policy Holder's DOB"
          placeholder="DD/MM/YYYY"
          values={values}
          set={set}
        />
      </Grid>
      <RadioGroup
        name={p("relationship")}
        label="Policy Holder's Relationship to Patient"
        options={RELATIONSHIPS}
        values={values}
        set={set}
      />
      <Grid>
        <TextField
          name={p("employer")}
          label="Policy Holder's Employer"
          values={values}
          set={set}
        />
        <TextField name={p("company")} label="Insurance Company" values={values} set={set} />
        <TextField
          name={p("certificate")}
          label="Certificate / Subscriber ID"
          values={values}
          set={set}
        />
        <TextField name={p("group")} label="Group / Policy Number" values={values} set={set} />
        <TextField
          name={p("insurerPhone")}
          label="Insurer Phone"
          type="tel"
          values={values}
          set={set}
        />
      </Grid>
    </div>
  );
}

export function NewPatientIntakeForm() {
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
    if (!String(values.firstName ?? "").trim()) next.firstName = "Required";
    if (!String(values.lastName ?? "").trim()) next.lastName = "Required";
    const email = String(values.email ?? "").trim();
    if (!email) next.email = "Required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = "Invalid email";
    if (!String(values.signature ?? "").trim()) next.signature = "Required";
    if (Object.keys(next).length) {
      setErrors(next);
      toast.error("Please correct the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      await submitFormValues("patient-intake", values);
      setValues({});
      toast.success("Thank you — your intake form has been received.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "We could not submit your form. Please try again or call the office.",
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

      <FormSection number="01" title="Patient Information">
        <div className="space-y-5">
          <Grid cols={3}>
            <TextField
              name="firstName"
              label="First Name *"
              values={values}
              set={set}
              error={errors.firstName}
              autoComplete="given-name"
            />
            <TextField
              name="middle"
              label="Middle"
              values={values}
              set={set}
              autoComplete="additional-name"
            />
            <TextField
              name="lastName"
              label="Last Name *"
              values={values}
              set={set}
              error={errors.lastName}
              autoComplete="family-name"
            />
          </Grid>
          <Grid>
            <TextField name="preferredName" label="Preferred Name" values={values} set={set} />
            <TextField
              name="dob"
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
              values={values}
              set={set}
            />
            <TextField name="sex" label="Sex" values={values} set={set} />
            <TextField
              name="street"
              label="Street Address"
              values={values}
              set={set}
              autoComplete="street-address"
            />
          </Grid>
          <Grid cols={3}>
            <TextField
              name="city"
              label="City"
              values={values}
              set={set}
              autoComplete="address-level2"
            />
            <TextField
              name="province"
              label="Province"
              values={values}
              set={set}
              autoComplete="address-level1"
            />
            <TextField
              name="postal"
              label="Postal Code"
              values={values}
              set={set}
              autoComplete="postal-code"
            />
          </Grid>
          <Grid>
            <TextField
              name="cell"
              label="Cell Phone"
              type="tel"
              values={values}
              set={set}
              autoComplete="tel"
            />
            <TextField
              name="email"
              label="Email *"
              type="email"
              values={values}
              set={set}
              error={errors.email}
              autoComplete="email"
            />
            <TextField
              name="languages"
              label="Languages Spoken at Home"
              values={values}
              set={set}
            />
            <TextField
              name="school"
              label="School & Grade"
              helper="If a student"
              values={values}
              set={set}
            />
            <TextField name="referredBy" label="Referred By" values={values} set={set} />
            <TextField
              name="parentName"
              label="Responsible Party / Parent Name"
              values={values}
              set={set}
            />
            <TextField
              name="parentRelationship"
              label="Relationship to Patient"
              values={values}
              set={set}
            />
            <TextField
              name="parentCell"
              label="Responsible Party / Parent Cell Phone"
              type="tel"
              values={values}
              set={set}
            />
          </Grid>
          <TextArea
            name="reason"
            label="Primary Reason for Seeking Treatment"
            rows={3}
            values={values}
            set={set}
          />
        </div>
      </FormSection>

      <FormSection
        number="02"
        title="Dental Insurance"
        note="Skip this section if you have already provided insurance details or have no coverage."
      >
        <InsuranceFields prefix="ins1_" values={values} set={set} />
      </FormSection>

      <FormSection number="03" title="Dual Dental Coverage">
        <RadioGroup
          name="dual"
          label="Do you have dual dental coverage? (coordination of benefits)"
          options={YN}
          values={values}
          set={set}
        />
        {values.dual === "Yes" && (
          <div className="mt-8 rounded-2xl bg-secondary/30 border border-foreground/10 p-5 md:p-8">
            <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-5">
              Secondary Plan
            </div>
            <InsuranceFields prefix="ins2_" values={values} set={set} />
          </div>
        )}
      </FormSection>

      <FormSection number="04" title="Medical History">
        <div className="space-y-6">
          <div>
            {MEDICAL_YN.map(([k, l]) => (
              <RadioGroup
                key={k}
                compact
                name={k}
                label={l}
                options={YN}
                values={values}
                set={set}
              />
            ))}
          </div>
          <Grid>
            <TextArea
              name="medicationList"
              label="If taking medications, please list:"
              values={values}
              set={set}
              rows={3}
            />
            <TextArea
              name="allergyList"
              label="If allergic, please list:"
              helper="Include latex, nickel, anesthetics"
              values={values}
              set={set}
              rows={3}
            />
          </Grid>
          <div>
            <p className="font-serif text-lg mb-2">
              Has the patient had any of the following, now or in the past?
            </p>
            <div className="grid md:grid-cols-2 md:gap-x-10">
              {CONDITIONS.map((c) => (
                <RadioGroup
                  key={c}
                  compact
                  name={`cond_${c}`}
                  label={c}
                  options={YN}
                  values={values}
                  set={set}
                />
              ))}
            </div>
          </div>
          <TextArea
            name="otherMedical"
            label="Other Medical Conditions / Details"
            values={values}
            set={set}
          />
        </div>
      </FormSection>

      <FormSection
        number="05"
        title="Dental History"
        note="This helps us communicate and plan your care during treatment."
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 md:gap-x-10">
            {DENTAL_YN.map((q) => (
              <RadioGroup
                key={q}
                compact
                name={`dental_${q}`}
                label={q}
                options={YN}
                values={values}
                set={set}
              />
            ))}
          </div>
          <Grid>
            <TextField
              name="lastVisit"
              label="Last Dental Visit"
              placeholder="DD/MM/YYYY"
              values={values}
              set={set}
            />
            <TextField name="dentistName" label="Dentist's Name" values={values} set={set} />
            <TextField name="dentalOffice" label="Dental Office Name" values={values} set={set} />
            <TextField
              name="dentalOfficeContact"
              label="Dental Office Email / Phone"
              values={values}
              set={set}
            />
          </Grid>
          <TextArea
            name="dentalExplain"
            label="If any dental question above was “Yes”, please explain"
            values={values}
            set={set}
          />
        </div>
      </FormSection>

      <FormSection number="06" title="Consent & Authorization">
        <p className="text-sm text-foreground/80 leading-relaxed mb-6 bg-secondary/30 border border-foreground/10 rounded-2xl p-5">
          {CONSENT_TEXT}
        </p>
        <Grid cols={3}>
          <TextField
            name="signature"
            label="Signature of Patient / Parent / Guardian *"
            values={values}
            set={set}
            error={errors.signature}
          />
          <TextField
            name="signatureRelationship"
            label="Relationship to Patient"
            values={values}
            set={set}
          />
          <TextField name="signatureDate" label="Date" type="date" values={values} set={set} />
        </Grid>
      </FormSection>

      <FormSection
        number="07"
        title="PEDIATRIC SLEEP QUESTIONNAIRE (OPTIONAL)"
        note="Please complete this questionnaire on behalf of your child. This optional sleep-breathing screening helps us assess your child's airway and sleep."
      >
        <div className="space-y-8">
          {SLEEP_GROUPS.map(([g, qs]) => (
            <div key={g}>
              <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-2">{g}</div>
              {qs.map((q) => (
                <RadioGroup
                  key={q}
                  compact
                  name={`sleep_${q}`}
                  label={q}
                  options={YND}
                  values={values}
                  set={set}
                />
              ))}
            </div>
          ))}
        </div>
      </FormSection>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-6 border-t border-foreground/10">
        <p className="text-xs text-muted-foreground max-w-md">
          Your completed form goes directly to our team. Please call us if you need help.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit Intake Form"}
        </button>
      </div>
    </form>
  );
}
