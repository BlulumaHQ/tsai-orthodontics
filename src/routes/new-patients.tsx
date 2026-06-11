import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site-data";

const STEPS = [
  { n: "01", title: "Consultation", body: "A relaxed first conversation with Dr. Tsai. We listen carefully, take a careful look, and answer every question. There is no fee, and no pressure to commit." },
  { n: "02", title: "Digital Records", body: "If treatment seems likely, we capture digital scans, photographs, and x-rays in a single visit. No goopy impressions, no rush." },
  { n: "03", title: "Personalized Plan", body: "Dr. Tsai designs your plan personally. We walk you through it together — what we'll do, why, how long, and what it will cost." },
  { n: "04", title: "Begin Treatment", body: "When you're ready, we begin. From here, we are partners — and we are here for the whole journey." },
];

const FORMS = [
  {
    title: "New Patient Intake Form",
    body: "Medical and dental history, contact details, and consent. Please complete before your first visit.",
    href: "#",
  },
  {
    title: "Child Patient Form",
    body: "For patients under 18. Includes guardian information and school schedule preferences.",
    href: "#",
  },
  {
    title: "Insurance Information Form",
    body: "Your plan details and policyholder information, so we can submit claims on your behalf.",
    href: "#",
  },
];

const INSURANCE_POINTS = [
  "We accept most major Canadian dental insurance plans.",
  "Direct billing wherever your plan allows.",
  "Pre-treatment estimates submitted to your insurer for full transparency.",
  "Clear, written breakdown of what your plan covers — and what it doesn't — before treatment begins.",
];

const FINANCING_POINTS = [
  "Interest-free, in-house monthly payment plans.",
  "Flexible down payment options to suit your budget.",
  "No third-party financing or credit checks required.",
  "All fees disclosed in writing before you commit to anything.",
];

export const Route = createFileRoute("/new-patients")({
  head: () => ({
    meta: [
      { title: "New Patients — Tsai Orthodontics" },
      {
        name: "description",
        content:
          "What to expect at your first visit: complimentary consultation, downloadable intake forms, insurance and billing information, and flexible in-house financing.",
      },
      { property: "og:title", content: "New Patients — Tsai Orthodontics" },
      { property: "og:description", content: "An unhurried, transparent first visit — with downloadable forms, insurance support, and clear financing." },
      { property: "og:url", content: "/new-patients" },
    ],
    links: [{ rel: "canonical", href: "/new-patients" }],
  }),
  component: NewPatients,
});

function NewPatients() {
  return (
    <>
      <PageHero
        eyebrow="New Patients"
        title={<>A first visit that <span className="italic font-normal">actually feels like a conversation.</span></>}
        intro="From the moment you walk in, our goal is the same: make sure you leave with answers, not pressure. Here's what to expect."
      />

      {/* Steps */}
      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10 rounded-3xl overflow-hidden">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-background p-8 lg:p-10">
              <div className="font-display text-5xl text-primary mb-6">{s.n}</div>
              <h3 className="font-display text-2xl mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Downloadable Forms */}
      <section id="forms" className="px-6 lg:px-10 pb-24 lg:pb-32 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">Patient Forms</div>
          <h2 className="font-display text-4xl md:text-5xl mb-12 max-w-2xl text-balance leading-tight">
            Download what you need ahead of your visit.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FORMS.map((f) => (
              <a
                key={f.title}
                href={f.href}
                className="group bg-background border border-foreground/10 rounded-3xl p-8 hover:border-primary transition-colors flex flex-col"
              >
                <Download className="size-6 text-primary mb-6 group-hover:translate-y-0.5 transition-transform" />
                <h3 className="font-display text-xl mb-3 leading-snug">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{f.body}</p>
                <div className="mt-6 text-[11px] uppercase tracking-[0.2em] text-primary">Download PDF</div>
              </a>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-8 max-w-2xl">
            Prefer to complete forms in the office? That's fine too — please arrive 15 minutes before your appointment.
          </p>
        </div>
      </section>

      {/* Insurance & Financing */}
      <section id="insurance" className="px-6 lg:px-10 pb-24 lg:pb-32 scroll-mt-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 rounded-3xl overflow-hidden">
          <div className="bg-background p-10 lg:p-12">
            <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-4">Insurance & Billing</div>
            <h3 className="font-display text-3xl mb-6 leading-tight">We handle the paperwork.</h3>
            <ul className="space-y-3">
              {INSURANCE_POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-foreground/85 leading-relaxed">
                  <span className="size-1.5 mt-2.5 rounded-full bg-primary flex-none" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-background p-10 lg:p-12">
            <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-4">Flexible Financing</div>
            <h3 className="font-display text-3xl mb-6 leading-tight">Payment plans that fit your life.</h3>
            <ul className="space-y-3">
              {FINANCING_POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-foreground/85 leading-relaxed">
                  <span className="size-1.5 mt-2.5 rounded-full bg-primary flex-none" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What to expect strip */}
      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto bg-secondary/40 rounded-3xl p-10 lg:p-14 grid md:grid-cols-3 gap-10">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">Length</div>
            <p className="font-display text-2xl leading-snug">About 45 minutes for your first visit.</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">Bring</div>
            <p className="font-display text-2xl leading-snug">Any prior records or x-rays you have.</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">Leave with</div>
            <p className="font-display text-2xl leading-snug">A clear sense of next steps — and a coffee.</p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-10 text-balance">
            Ready when you are.
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
            >
              Request your consultation <ArrowRight className="size-4" />
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-foreground/15 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
            >
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
