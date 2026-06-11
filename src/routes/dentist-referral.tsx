import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site-data";

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

      {/* Referral form section — Jotform embed-ready container */}
      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-4">
            Submit a Referral
          </div>
          <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight text-balance">
            Refer a patient to our practice.
          </h2>
          <p className="text-foreground/80 leading-relaxed max-w-2xl mb-10">
            Use the secure referral form below to send a patient's details directly to our team. We will follow up with your office once the consultation is scheduled.
          </p>

          {/*
            DEVELOPER NOTE — JOTFORM EMBED
            Paste the client's Jotform <script> embed (or <iframe>) inside the
            container below. Do not display public placeholder text to users
            while the embed is pending — leave the surrounding shell only.

            Example:
            <iframe
              title="Dentist Referral Form"
              src="https://form.jotform.com/XXXXXXXXXXXXX"
              className="w-full min-h-[900px] border-0"
              loading="lazy"
            />
          */}
          <div
            id="jotform-referral-container"
            className="rounded-3xl border border-foreground/8 bg-secondary/30 min-h-[480px] flex items-center justify-center p-10"
          >
            <div className="text-center max-w-md">
              <div className="font-display text-2xl mb-3">Online referral form</div>
              <p className="text-muted-foreground text-sm mb-6">
                The secure form is being finalized. In the meantime, please refer patients directly by phone or email — we'll take care of the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={SITE.phoneHref}
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
                >
                  Call {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}?subject=Patient referral`}
                  className="px-6 py-3 rounded-full border border-foreground/15 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
                >
                  Email Referral
                </a>
              </div>
            </div>
          </div>
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
