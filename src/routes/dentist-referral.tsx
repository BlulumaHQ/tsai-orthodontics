import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site-data";

const referralSchema = z.object({
  dentistName: z.string().trim().min(1, "Required").max(120),
  practiceName: z.string().trim().min(1, "Required").max(160),
  dentistEmail: z.string().trim().email("Invalid email").max(200),
  dentistPhone: z.string().trim().min(7, "Required").max(40),
  patientName: z.string().trim().min(1, "Required").max(120),
  patientAge: z.string().trim().max(10).optional().or(z.literal("")),
  patientPhone: z.string().trim().max(40).optional().or(z.literal("")),
  patientEmail: z.string().trim().max(200).optional().or(z.literal("")).refine(
    (v) => !v || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),
    "Invalid email",
  ),
  reason: z.string().trim().min(1, "Required").max(140),
  urgency: z.enum(["routine", "soon", "urgent"]),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});
type ReferralForm = z.infer<typeof referralSchema>;

const INITIAL: ReferralForm = {
  dentistName: "",
  practiceName: "",
  dentistEmail: "",
  dentistPhone: "",
  patientName: "",
  patientAge: "",
  patientPhone: "",
  patientEmail: "",
  reason: "",
  urgency: "routine",
  notes: "",
};

export const Route = createFileRoute("/dentist-referral")({
  head: () => ({
    meta: [
      { title: "Dentist Referral | Tsai Orthodontics" },
      {
        name: "description",
        content:
          "A clear and professional referral process for dentists in Vancouver and the Lower Mainland. Refer your patient to Tsai Orthodontics with confidence.",
      },
      { property: "og:title", content: "Dentist Referral | Tsai Orthodontics" },
      { property: "og:description", content: "Specialist orthodontic referrals handled with clarity, follow-through, and respect for the patient relationship." },
      { property: "og:url", content: "/dentist-referral" },
    ],
    links: [{ rel: "canonical", href: "/dentist-referral" }],
  }),
  component: DentistReferralPage,
});

function DentistReferralPage() {
  const [form, setForm] = useState<ReferralForm>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof ReferralForm, string>>>({});

  const update =
    <K extends keyof ReferralForm>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value as ReferralForm[K] }));
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
    const subject = `Patient Referral: ${d.patientName} — from ${d.practiceName}`;
    const body = [
      "REFERRING DENTIST",
      `Name: ${d.dentistName}`,
      `Practice: ${d.practiceName}`,
      `Email: ${d.dentistEmail}`,
      `Phone: ${d.dentistPhone}`,
      "",
      "PATIENT",
      `Name: ${d.patientName}`,
      `Age: ${d.patientAge || "—"}`,
      `Phone: ${d.patientPhone || "—"}`,
      `Email: ${d.patientEmail || "—"}`,
      "",
      "REFERRAL",
      `Reason: ${d.reason}`,
      `Urgency: ${d.urgency}`,
      "",
      "NOTES",
      d.notes || "—",
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your email client to send the referral.");
  };

  const inputCls =
    "w-full bg-background border border-foreground/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors";
  const labelCls = "block text-[10px] uppercase tracking-[0.22em] text-foreground/60 mb-2";

  return (
    <>
      <PageHero
        eyebrow="For Referring Dentists"
        title={<>A clear and professional <span className="italic font-normal">referral process for trusted colleagues.</span></>}
        intro="Tsai Orthodontics values strong relationships with general dentists and healthcare professionals. Referrals are handled with clarity, follow-through, and respect for the patient relationship."
      />

      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-3xl overflow-hidden">
          {[
            ["Specialist Coordination", "Direct line to Dr. Andrew Tsai for case discussions and complex referrals."],
            ["Transparent Communication", "Treatment letters, progress updates, and post-treatment summaries shared promptly."],
            ["Collaborative Care", "Restorative, periodontal, and airway colleagues welcome — we plan together."],
          ].map(([t, b]) => (
            <div key={t} className="bg-background p-10">
              <h3 className="font-display text-2xl mb-3">{t}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Referral form */}
      <section id="form" className="px-6 lg:px-10 pb-24 lg:pb-32 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-4">Submit a Referral</div>
          <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight text-balance">
            Refer a patient to our practice.
          </h2>
          <p className="text-foreground/80 leading-relaxed max-w-2xl mb-10">
            Complete the form below to send a patient's details to our team. Submitting opens your email client with a pre-filled, professional referral to <a href={`mailto:${SITE.email}`} className="text-primary underline">{SITE.email}</a>. We will confirm receipt and follow up with your office once the consultation is scheduled.
          </p>

          <form
            onSubmit={onSubmit}
            className="bg-background border border-foreground/10 rounded-3xl p-8 lg:p-12 space-y-10"
          >
            {/* Dentist info */}
            <div>
              <div className="font-display text-2xl mb-6">Referring Dentist</div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Dentist Name *</label>
                  <input className={inputCls} value={form.dentistName} onChange={update("dentistName")} />
                  {errors.dentistName && <p className="text-xs text-destructive mt-2">{errors.dentistName}</p>}
                </div>
                <div>
                  <label className={labelCls}>Practice Name *</label>
                  <input className={inputCls} value={form.practiceName} onChange={update("practiceName")} />
                  {errors.practiceName && <p className="text-xs text-destructive mt-2">{errors.practiceName}</p>}
                </div>
                <div>
                  <label className={labelCls}>Email *</label>
                  <input type="email" className={inputCls} value={form.dentistEmail} onChange={update("dentistEmail")} />
                  {errors.dentistEmail && <p className="text-xs text-destructive mt-2">{errors.dentistEmail}</p>}
                </div>
                <div>
                  <label className={labelCls}>Phone *</label>
                  <input className={inputCls} value={form.dentistPhone} onChange={update("dentistPhone")} />
                  {errors.dentistPhone && <p className="text-xs text-destructive mt-2">{errors.dentistPhone}</p>}
                </div>
              </div>
            </div>

            {/* Patient info */}
            <div>
              <div className="font-display text-2xl mb-6">Patient</div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Patient Name *</label>
                  <input className={inputCls} value={form.patientName} onChange={update("patientName")} />
                  {errors.patientName && <p className="text-xs text-destructive mt-2">{errors.patientName}</p>}
                </div>
                <div>
                  <label className={labelCls}>Age</label>
                  <input className={inputCls} value={form.patientAge} onChange={update("patientAge")} />
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

            {/* Referral details */}
            <div>
              <div className="font-display text-2xl mb-6">Referral Details</div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className={labelCls}>Reason for Referral *</label>
                  <input
                    className={inputCls}
                    placeholder="e.g. Crowding evaluation, Class II correction, airway concerns"
                    value={form.reason}
                    onChange={update("reason")}
                  />
                  {errors.reason && <p className="text-xs text-destructive mt-2">{errors.reason}</p>}
                </div>
                <div>
                  <label className={labelCls}>Urgency *</label>
                  <select className={inputCls} value={form.urgency} onChange={update("urgency")}>
                    <option value="routine">Routine</option>
                    <option value="soon">Within a few weeks</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label className={labelCls}>Clinical Notes</label>
                <textarea
                  className={`${inputCls} min-h-[140px] resize-y`}
                  placeholder="Relevant history, current findings, or anything we should know before the consultation."
                  value={form.notes}
                  onChange={update("notes")}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between pt-2">
              <p className="text-xs text-muted-foreground max-w-md">
                Please confirm with your patient that you are sharing their contact details with our practice.
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
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-3xl overflow-hidden">
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

        <div className="max-w-5xl mx-auto mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-foreground/15 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
          >
            Contact the Office
          </Link>
        </div>
      </section>
    </>
  );
}
