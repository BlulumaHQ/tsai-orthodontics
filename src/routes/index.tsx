import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import heroFamily from "@/assets/hero-family.jpg";
import drTsai from "@/assets/dr-tsai.jpg";
import journeyParents from "@/assets/journey-parents.jpg";
import journeyKids from "@/assets/journey-kids.jpg";
import journeyTeens from "@/assets/journey-teens.jpg";
import journeyAdults from "@/assets/journey-adults.jpg";
import atmosClarity from "@/assets/atmos-clarity.jpg";
import atmosEase from "@/assets/atmos-ease.jpg";
import atmosCare from "@/assets/atmos-care.jpg";
import atmosCraft from "@/assets/atmos-craft.jpg";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tsai Orthodontics — Specialist Orthodontic Care, Vancouver" },
      {
        name: "description",
        content:
          "Boutique specialist orthodontics on Main Street in Vancouver. Braces, Invisalign, and unhurried family care from Dr. Tsai.",
      },
      { property: "og:title", content: "Tsai Orthodontics — Specialist Care, Made Personal" },
      {
        property: "og:description",
        content:
          "Specialist orthodontic care for Vancouver families. Considered, unhurried, built on long-term relationships.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const PILLARS = [
  {
    n: "01",
    label: "Clarity",
    title: "A treatment plan you can actually follow.",
    body: "We explain every option in plain language, with clear costs and clear timelines. You leave your consultation knowing exactly what comes next — and why.",
    image: atmosClarity,
  },
  {
    n: "02",
    label: "Ease",
    title: "Care that fits the rhythm of your life.",
    body: "Digital records replace messy impressions. Family scheduling keeps siblings together. Flexible financing makes the path forward simple.",
    image: atmosEase,
  },
  {
    n: "03",
    label: "Care",
    title: "Long relationships, not transactions.",
    body: "Most of our patients are with us for years. We remember names, ask about the school play, and treat your family the way we'd treat our own.",
    image: atmosCare,
  },
  {
    n: "04",
    label: "Craft",
    title: "Specialist precision in every detail.",
    body: "Dr. Tsai personally designs every treatment plan. We never delegate the thinking — and the results show in how naturally each smile finishes.",
    image: atmosCraft,
  },
];

const JOURNEYS = [
  {
    slug: "parents",
    title: "For Parents",
    body: "Early evaluations, honest guidance, and a clear sense of what your child needs — and what they don't.",
    image: journeyParents,
    link: "/services/children-and-teens" as const,
  },
  {
    slug: "kids",
    title: "For Kids",
    body: "An unhurried, gentle first visit. We meet kids where they are, and we make sure they leave smiling.",
    image: journeyKids,
    link: "/services/phase-i-treatment" as const,
  },
  {
    slug: "teens",
    title: "For Teens",
    body: "Braces or Invisalign that work around school, sport, and a full social life — without compromise.",
    image: journeyTeens,
    link: "/services/invisalign" as const,
  },
  {
    slug: "adults",
    title: "For Adults",
    body: "Discreet, sophisticated treatment for the smile you've been thinking about for years. It is not too late.",
    image: journeyAdults,
    link: "/services/adults" as const,
  },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-foreground">
        <div className="absolute inset-0">
          <img
            src={heroFamily}
            alt="A Vancouver family laughing together in a sun-drenched living room"
            className="w-full h-full object-cover animate-scale-in"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-end pb-20 lg:pb-28 text-center px-6">
          <div className="text-primary/90 text-[11px] uppercase tracking-[0.3em] mb-6 animate-fade-up">
            Specialist Orthodontics · Vancouver
          </div>
          <h1 className="font-display text-[44px] sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] max-w-5xl text-balance animate-fade-up [animation-delay:80ms]">
            Your smile,
            <br />
            <span className="italic font-normal">by design.</span>
          </h1>
          <p className="mt-8 max-w-xl text-white/85 text-base lg:text-lg leading-relaxed animate-fade-up [animation-delay:160ms]">
            Specialist orthodontic care in Vancouver, delivered with clarity, warmth, and personal attention.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-10 animate-fade-up [animation-delay:240ms]">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300 rounded-full text-xs font-medium uppercase tracking-[0.2em]"
            >
              Book a Consultation
            </Link>
            <Link
              to="/about-the-doctors/dr-andrew-tsai"
              className="px-8 py-4 border border-white/40 backdrop-blur-md text-white hover:bg-white/10 transition-all rounded-full text-xs font-medium uppercase tracking-[0.2em]"
            >
              Meet Dr. Andrew Tsai
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 lg:left-10 lg:right-10 flex justify-between items-end text-[10px] uppercase tracking-[0.25em] text-white/60 animate-fade-in [animation-delay:600ms]">
          <span>3431 Main Street</span>
          <span className="hidden md:block">Est. for families like yours</span>
        </div>
      </section>

      {/* INTRO STATEMENT */}
      <section className="py-28 lg:py-40 px-6 lg:px-10 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-8">
            Why Tsai Orthodontics
          </div>
          <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-balance">
            We chose to build a different kind of orthodontic practice — one shaped by careful listening, specialist training, and the warmth of a small Vancouver family business.
          </p>
        </div>
      </section>

      {/* PILLARS — zigzag */}
      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto space-y-24 lg:space-y-40">
          {PILLARS.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={p.n}
                className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center"
              >
                <div className={reverse ? "md:order-2" : ""}>
                  <div className="overflow-hidden rounded-3xl">
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="w-full aspect-[4/5] object-cover"
                    />
                  </div>
                </div>
                <div className={`max-w-lg ${reverse ? "md:order-1 md:ml-auto" : ""}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-primary text-xs font-mono tracking-[0.2em]">{p.n}</span>
                    <span className="h-px flex-1 bg-foreground/10" />
                    <span className="text-foreground/60 text-[11px] uppercase tracking-[0.25em]">{p.label}</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-6 text-balance">
                    {p.title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                    {p.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* PATIENT JOURNEYS — horizontal scroll */}
      <section className="py-24 lg:py-32 bg-secondary/30">
        <div className="px-6 lg:px-10 mb-12 lg:mb-16 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div>
              <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-4">
                Patient Journeys
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance max-w-2xl">
                Care for every chapter of your family's life.
              </h2>
            </div>
            <span className="hidden md:block text-muted-foreground text-[11px] uppercase tracking-[0.25em] pb-3">
              Scroll to explore →
            </span>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-6 lg:gap-8 px-6 lg:px-10 pb-12 snap-x snap-mandatory no-scrollbar">
          {JOURNEYS.map((j) => (
            <Link
              to={j.link}
              key={j.slug}
              className="flex-none w-[78vw] sm:w-[400px] lg:w-[460px] snap-start group"
            >
              <div className="relative overflow-hidden rounded-3xl mb-6 bg-foreground/5">
                <img
                  src={j.image}
                  alt={j.title}
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-[0.2em] text-foreground">
                  {j.title.replace("For ", "")}
                </div>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl lg:text-3xl mb-2">{j.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                    {j.body}
                  </p>
                </div>
                <ArrowUpRight className="size-5 text-foreground/40 group-hover:text-primary transition-colors flex-none mt-2" />
              </div>
            </Link>
          ))}
          <div className="flex-none w-6" aria-hidden />
        </div>
      </section>

      {/* DOCTOR TEASER */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={drTsai}
                alt="Dr. Tsai, specialist orthodontist"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
              Meet the Specialist
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 text-balance">
              Dr. Tsai believes good orthodontics is mostly good listening.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-xl">
              A certified specialist in orthodontics with university training, published research, and a quiet practice on Main Street — Dr. Tsai built this clinic to be the kind of place his own family would choose.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["Certified Specialist", "University Trained", "Mandarin & English"].map((c) => (
                <span
                  key={c}
                  className="text-[11px] uppercase tracking-[0.2em] py-2 px-4 border border-foreground/10 rounded-full text-foreground/70"
                >
                  {c}
                </span>
              ))}
            </div>
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-medium border-b border-primary pb-1 hover:gap-3 transition-all"
            >
              Read Dr. Tsai's Story <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="py-24 lg:py-32 bg-foreground text-background px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
            What Sets Us Apart
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-16 max-w-3xl text-balance">
            We are not the cheapest practice in Vancouver. We don't try to be.
          </h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl">
            {[
              ["Specialist-led from the first call", "Every plan is designed and supervised by Dr. Tsai — never delegated to an algorithm or a junior associate."],
              ["Advanced digital workflow", "Intraoral scanning, 3D treatment simulation, and a fully paperless practice — built for accuracy, not novelty."],
              ["Personalized treatment planning", "No templates, no aligner-mill shortcuts. Each plan is built from scratch around one set of teeth and one life."],
              ["Family-centered experience", "Coordinated scheduling for siblings, quiet appointment slots for nervous kids, and a calm waiting area that doesn't feel clinical."],
              ["Long-term relationships", "We follow patients for years — through retention, college, and beyond. The smile you finish with is the smile we protect."],
              ["Mandarin and English support", "Consultations and care delivered in both languages, so your whole family can participate fully in every conversation."],
            ].map(([title, body]) => (
              <div key={title}>
                <h3 className="font-display text-2xl mb-3 text-background">{title}</h3>
                <p className="text-background/65 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Link
              to="/what-sets-us-apart"
              className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-medium border-b border-primary pb-1"
            >
              The full comparison <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-24 lg:py-40 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
            Start the conversation
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.0] mb-10 text-balance">
            Come and see if we're the right fit for your family.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
            The first consultation is complimentary. Bring your questions, bring your family, and we'll take it from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground transition-colors"
            >
              Book a Consultation
            </Link>
            <a
              href={SITE.phoneHref}
              className="px-8 py-4 border border-foreground/15 rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
