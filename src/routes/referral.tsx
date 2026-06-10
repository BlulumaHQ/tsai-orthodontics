import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/referral")({
  head: () => ({
    meta: [
      { title: "Dentist Referral — Tsai Orthodontics" },
      {
        name: "description",
        content:
          "Dentist referral portal for Tsai Orthodontics in Vancouver. Refer your patient to a certified specialist orthodontist.",
      },
      { property: "og:title", content: "Dentist Referral — Tsai Orthodontics" },
      { property: "og:description", content: "A direct line for referring dentists in Vancouver and the Lower Mainland." },
      { property: "og:url", content: "/referral" },
    ],
    links: [{ rel: "canonical", href: "/referral" }],
  }),
  component: ReferralPage,
});

function ReferralPage() {
  return (
    <>
      <PageHero
        eyebrow="For Referring Dentists"
        title={<>Thank you for <span className="italic font-normal">trusting your patient with us.</span></>}
        intro="We treat every referred patient with the same care we would extend to a member of your own family — and we keep you informed at every step."
      />

      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-3xl overflow-hidden">
          {[
            ["Specialist Coordination", "Direct line to Dr. Tsai for case discussions and complex referrals."],
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

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-3xl mx-auto p-10 lg:p-14 rounded-3xl bg-secondary/40 border border-foreground/5">
          <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-4">
            Referral Form
          </div>
          <h2 className="font-display text-3xl md:text-4xl mb-4">Online referral, coming shortly.</h2>
          <p className="text-foreground/80 leading-relaxed mb-8">
            Our secure online referral form is being finalized. In the meantime, please refer patients directly by phone or email — we'll take care of the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={SITE.phoneHref}
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors text-center"
            >
              Call {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}?subject=Patient referral`}
              className="px-8 py-4 rounded-full border border-foreground/15 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors text-center"
            >
              Email Referral
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
