import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(30),
  interest: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "Tell us a little about your needs").max(1500),
});

type FormState = z.infer<typeof schema>;

const INTERESTS = [
  "Consultation for my child",
  "Consultation for my teen",
  "Consultation for myself",
  "Invisalign",
  "Braces",
  "Second opinion",
  "Other",
];

export function ConsultationForm() {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  function onChange<K extends keyof FormState>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Thank you — we will be in touch within one business day.");
    setValues({ name: "", email: "", phone: "", interest: "", message: "" });
    setSubmitting(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <Field label="Your name" error={errors.name}>
        <input
          type="text"
          value={values.name}
          onChange={(e) => onChange("name", e.target.value)}
          className={inputCls}
          autoComplete="name"
          required
        />
      </Field>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={inputCls}
            autoComplete="email"
            required
          />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={inputCls}
            autoComplete="tel"
            required
          />
        </Field>
      </div>
      <Field label="I'm interested in" error={errors.interest}>
        <select
          value={values.interest}
          onChange={(e) => onChange("interest", e.target.value)}
          className={inputCls}
        >
          <option value="">Select an option</option>
          {INTERESTS.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </Field>
      <Field label="Tell us a little more" error={errors.message}>
        <textarea
          rows={5}
          value={values.message}
          onChange={(e) => onChange("message", e.target.value)}
          className={`${inputCls} resize-none`}
          required
        />
      </Field>
      <button
        type="submit"
        disabled={submitting}
        className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground text-sm uppercase tracking-[0.18em] font-medium hover:bg-foreground transition-colors disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Request Consultation"}
      </button>
    </form>
  );
}

const inputCls =
  "w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium mb-2 block">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-destructive mt-1 block">{error}</span>}
    </label>
  );
}
