import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

const STEPS = [
  { n: "01", title: "Consultation", body: "A relaxed first conversation with Dr. Tsai. We listen carefully, take a careful look, and answer every question. There is no fee, and no pressure to commit." },
  { n: "02", title: "Digital Records", body: "If treatment seems likely, we capture digital scans, photographs, and x-rays in a single visit. No goopy impressions, no rush." },
  { n: "03", title: "Personalized Plan", body: "Dr. Tsai designs your plan personally. We walk you through it together — what we'll do, why, how long, and what it will cost." },
  { n: "04", title: "Begin Treatment", body: "When you're ready, we begin. From here, we are partners — and we are here for the whole journey." },
];

const PANELS = [
  { title: "Insurance", body: "We work with most major Canadian insurance plans, submit claims on your behalf, and explain your benefits clearly before treatment begins." },
  { title: "Financing", body: "Interest-free in-house monthly payment plans, designed to fit your family's budget over the length of treatment. We will never pressure you into a plan." },
  { title: "Patient Forms", body: "New-patient forms are sent ahead of your first visit so we can spend our time together actually talking, not filling out paperwork." },
  { title: "What to Expect", body: "Your first visit is about 45 minutes. Bring any prior records you have. You'll leave with a clear sense of next steps — and a coffee, if you'd like one." },
];

export const Route = createFileRoute("/new-patients")({
  head: () => ({
    meta: [
      { title: "New Patients — Tsai Orthodontics" },
      {
        name: "description",
        content:
          "What to expect at your first visit to Tsai Orthodontics in Vancouver: complimentary consultation, digital records, personalized planning, and clear financing.",
      },
      { property: "og:title", content: "New Patients — Tsai Orthodontics" },
      { property: "og:description", content: "An unhurried, transparent first visit, from consultation to clear treatment planning." },
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

      {/* Panels */}
      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
          {PANELS.map((p) => (
            <div key={p.title} className="bg-secondary/40 p-10 lg:p-12 rounded-3xl">
              <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-3">Information</div>
              <h3 className="font-display text-3xl mb-4">{p.title}</h3>
              <p className="text-foreground/80 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-10 text-balance">
            Ready when you are.
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
          >
            Request your consultation
          </Link>
        </div>
      </section>
    </>
  );
}
