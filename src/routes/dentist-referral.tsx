import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site-data";

const REFERRAL_REASONS = [
  "Children / Teens Orthodontic Evaluation",
  "Adult Orthodontic Evaluation",
  "Braces / Fixed Appliances",
  "Invisalign",
  "Phase I Treatment",
  "Airway Friendly Orthodontics",
  "MARPE Evaluation",
  "Retainers",
  "Other",
] as const;

const referralSchema = z.object({
  dentistName: z.string().trim().min(1, "Required").max(120),
  clinicName: z.string().trim().min(1, "Required").max(160),
  clinicPhone: z.string().trim().min(7, "Required").max(40),
  clinicEmail: z.string().trim().email("Invalid email").max(200),
  patientFirstName: z.string().trim().min(1, "Required").max(80),
  patientLastName: z.string().trim().min(1, "Required").max(80),
  patientDob: z.string().trim().max(40).optional().or(z.literal("")),
  guardianName: z.string().trim().max(160).optional().or(z.literal("")),
  patientPhone: z.string().trim().max(40).optional().or(z.literal("")),
  patientEmail: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => !v || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),
      "Invalid email",
    ),
  reason: z.enum(REFERRAL_REASONS, { message: "Please choose a reason" }),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, {
    message: "Please confirm patient/guardian consent",
  }),
});
type ReferralForm = {
  dentistName: string;
  clinicName: string;
  clinicPhone: string;
  clinicEmail: string;
  patientFirstName: string;
  patientLastName: string;
  patientDob: string;
  guardianName: string;
  patientPhone: string;
  patientEmail: string;
  reason: (typeof REFERRAL_REASONS)[number] | "";
  notes: string;
  consent: boolean;
};

const INITIAL: ReferralForm = {
  dentistName: "",
  clinicName: "",
  clinicPhone: "",
  clinicEmail: "",
  patientFirstName: "",
  patientLastName: "",
  patientDob: "",
  guardianName: "",
  patientPhone: "",
  patientEmail: "",
  reason: "",
  notes: "",
  consent: false,
};

export const Route = createFileRoute("/dentist-referral")({
  head: () => ({
    meta: [
      { title: "Dentist Referral — Tsai Orthodontics Vancouver" },
      {
        name: "description",
        content:
          "Refer a patient to Tsai Orthodontics in Vancouver. A clear, professional referral process with respectful coordination and thoughtful follow-through.",
      },
      { property: "og:title", content: "Dentist Referral — Tsai Orthodontics" },
      {
        property: "og:description",
        content:
          "A clear, professional referral process for general dentists and healthcare colleagues.",
      },
      { property: "og:url", content: "/dentist-referral" },
    ],
    links: [{ rel: "canonical", href: "/dentist-referral" }],
  }),
  component: DentistReferralPage,
});

function DentistReferralPage() {
  const [form, setForm] = useState<ReferralForm>(INITIAL);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ReferralForm, string>>
  >({});

  const update =
    <K extends keyof ReferralForm>(key: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm((f) => ({ ...f, [key]: value as ReferralForm[K] }));
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = referralSchema.safeParse(form);
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof ReferralForm;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      toast.error("Please correct the highlighted fields.");
      return;
    }
    setErrors({});
    const d = parsed.data;
    const subject = `Patient Referral: ${d.patientFirstName} ${d.patientLastName} — from ${d.clinicName}`;
    const body = [
      "REFERRING DENTIST",
      `Name: ${d.dentistName}`,
      `Clinic: ${d.clinicName}`,
      `Clinic Phone: ${d.clinicPhone}`,
      `Clinic Email: ${d.clinicEmail}`,
      "",
      "PATIENT",
      `Name: ${d.patientFirstName} ${d.patientLastName}`,
      `Date of Birth: ${d.patientDob || "—"}`,
      `Parent / Guardian: ${d.guardianName || "—"}`,
      `Phone: ${d.patientPhone || "—"}`,
      `Email: ${d.patientEmail || "—"}`,
      "",
      "REFERRAL",
      `Reason: ${d.reason}`,
      "",
      "CLINICAL NOTES",
      d.notes || "—",
      "",
      files.length
        ? `Attachments (please send separately): ${files.map((f) => f.name).join(", ")}`
        : "Attachments: none",
      "",
      "Consent confirmed by referring dentist.",
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your email client to send the referral.");
  };

  const inputCls =
    "w-full bg-background border border-foreground/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors";
  const labelCls =
    "block text-[10px] uppercase tracking-[0.22em] text-foreground/60 mb-2";

  return (
    <>
      <PageHero
        eyebrow="For Referring Dentists"
        title={
          <>
            Dentist <span className="italic font-normal">Referral</span>
          </>
        }
        intro="We welcome referrals from general dentists and healthcare professionals. Tsai Orthodontics is committed to clear communication, thoughtful follow-through, and respectful coordination with the referring office."
      />

      {/* Value cards */}
      <section className="px-6 lg:px-10 pb-20 lg:pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-3xl overflow-hidden">
          {[
            ["Specialist Coordination", "Direct line to Dr. Andrew Tsai for case discussions and complex referrals."],
            ["Transparent Communication", "Treatment letters, progress updates, and post-treatment summaries shared promptly."],
            ["Collaborative Care", "Restorative, periodontal, and airway colleagues welcome — we plan together."],
          ].map(([t, b]) => (
            <div key={t} className="bg-background p-8 lg:p-10">
              <h3 className="font-display text-2xl mb-3">{t}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Referral form */}
      <section id="form" className="px-6 lg:px-10 pb-24 lg:pb-32 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-4">
            Submit a Referral
          </div>
          <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight text-balance">
            Refer a patient to our practice.
          </h2>
          <p className="text-foreground/80 leading-relaxed max-w-2xl mb-10">
            Complete the form below. Submitting opens your email client with a pre-filled, professional referral to{" "}
            <a href={`mailto:${SITE.email}`} className="text-primary underline">
              {SITE.email}
            </a>
            . We will confirm receipt and follow up with your office once the consultation is scheduled.
          </p>

          <form
            onSubmit={onSubmit}
            className="bg-background border border-foreground/10 rounded-3xl p-8 lg:p-12 space-y-12"
          >
            {/* Referring Dentist */}
            <div>
              <div className="font-display text-2xl mb-6">Referring Dentist Information</div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Dentist Name *</label>
                  <input className={inputCls} value={form.dentistName} onChange={update("dentistName")} />
                  {errors.dentistName && <p className="text-xs text-destructive mt-2">{errors.dentistName}</p>}
                </div>
                <div>
                  <label className={labelCls}>Clinic Name *</label>
                  <input className={inputCls} value={form.clinicName} onChange={update("clinicName")} />
                  {errors.clinicName && <p className="text-xs text-destructive mt-2">{errors.clinicName}</p>}
                </div>
                <div>
                  <label className={labelCls}>Clinic Phone *</label>
                  <input className={inputCls} value={form.clinicPhone} onChange={update("clinicPhone")} />
                  {errors.clinicPhone && <p className="text-xs text-destructive mt-2">{errors.clinicPhone}</p>}
                </div>
                <div>
                  <label className={labelCls}>Clinic Email *</label>
                  <input type="email" className={inputCls} value={form.clinicEmail} onChange={update("clinicEmail")} />
                  {errors.clinicEmail && <p className="text-xs text-destructive mt-2">{errors.clinicEmail}</p>}
                </div>
              </div>
            </div>

            {/* Patient Information */}
            <div>
              <div className="font-display text-2xl mb-6">Patient Information</div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Patient First Name *</label>
                  <input className={inputCls} value={form.patientFirstName} onChange={update("patientFirstName")} />
                  {errors.patientFirstName && <p className="text-xs text-destructive mt-2">{errors.patientFirstName}</p>}
                </div>
                <div>
                  <label className={labelCls}>Patient Last Name *</label>
                  <input className={inputCls} value={form.patientLastName} onChange={update("patientLastName")} />
                  {errors.patientLastName && <p className="text-xs text-destructive mt-2">{errors.patientLastName}</p>}
                </div>
                <div>
                  <label className={labelCls}>Patient Date of Birth</label>
                  <input type="date" className={inputCls} value={form.patientDob} onChange={update("patientDob")} />
                </div>
                <div>
                  <label className={labelCls}>Parent / Guardian Name</label>
                  <input className={inputCls} value={form.guardianName} onChange={update("guardianName")} />
                </div>
                <div>
                  <label className={labelCls}>Patient Phone</label>
                  <input className={inputCls} value={form.patientPhone} onChange={update("patientPhone")} />
                </div>
                <div>
                  <label className={labelCls}>Patient Email</label>
                  <input type="email" className={inputCls} value={form.patientEmail} onChange={update("patientEmail")} />
                  {errors.patientEmail && <p className="text-xs text-destructive mt-2">{errors.patientEmail}</p>}
                </div>
              </div>
            </div>

            {/* Referral Details */}
            <div>
              <div className="font-display text-2xl mb-6">Referral Details</div>
              <div className="grid gap-5">
                <div>
                  <label className={labelCls}>Reason for Referral *</label>
                  <select className={inputCls} value={form.reason} onChange={update("reason")}>
                    <option value="">Select a reason…</option>
                    {REFERRAL_REASONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.reason && <p className="text-xs text-destructive mt-2">{errors.reason}</p>}
                </div>
                <div>
                  <label className={labelCls}>Message / Clinical Notes</label>
                  <textarea
                    className={`${inputCls} min-h-[140px] resize-y`}
                    placeholder="Relevant history, current findings, or anything we should know before the consultation."
                    value={form.notes}
                    onChange={update("notes")}
                  />
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <div className="font-display text-2xl mb-6">Attachments</div>
              <label className="flex flex-col items-center justify-center gap-3 border border-dashed border-foreground/20 rounded-2xl px-6 py-10 text-center cursor-pointer hover:border-primary hover:bg-secondary/30 transition-colors">
                <Upload className="size-6 text-primary" />
                <span className="text-sm text-foreground/80">
                  Upload X-rays, photos, or documents
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  PDF, JPG, PNG · or send separately to {SITE.email}
                </span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
                />
              </label>
              {files.length > 0 && (
                <ul className="mt-4 text-xs text-muted-foreground space-y-1">
                  {files.map((f) => (
                    <li key={f.name}>· {f.name}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Consent */}
            <div>
              <label className="flex gap-3 items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={update("consent")}
                  className="mt-1 size-4 accent-primary flex-none"
                />
                <span className="text-sm text-foreground/80 leading-relaxed">
                  I confirm that the patient or guardian has consented to this referral.
                </span>
              </label>
              {errors.consent && <p className="text-xs text-destructive mt-2">{errors.consent}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between pt-2 border-t border-foreground/10">
              <p className="text-xs text-muted-foreground max-w-md">
                Submitting opens your email client with the referral details ready to send.
              </p>
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
              >
                Submit Referral
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Referral contact */}
      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl mb-3">
              Questions about a referral?
            </h2>
            <p className="text-muted-foreground">Contact our office directly.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-3xl overflow-hidden">
            <div className="bg-background p-8">
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">Phone</div>
              <a href={SITE.phoneHref} className="font-display text-xl hover:text-primary">{SITE.phone}</a>
            </div>
            <div className="bg-background p-8">
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">Email</div>
              <a href={`mailto:${SITE.email}`} className="font-display text-xl hover:text-primary break-all">{SITE.email}</a>
            </div>
            <div className="bg-background p-8">
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">Address</div>
              <address className="not-italic text-foreground/85 leading-relaxed text-sm">
                {SITE.address.street}<br />
                {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
              </address>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-foreground/15 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
            >
              Contact the Office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
