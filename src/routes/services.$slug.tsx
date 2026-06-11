import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Quote } from "lucide-react";
import { SERVICE_BY_SLUG, type Service } from "@/lib/services-data";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICE_BY_SLUG[params.slug];
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service — Tsai Orthodontics" }] };
    return {
      meta: [
        { title: s.metaTitle },
        { name: "description", content: s.metaDescription },
        { property: "og:title", content: s.metaTitle },
        { property: "og:description", content: s.metaDescription },
        { property: "og:url", content: `/services/${s.slug}` },
        { property: "og:type", content: "article" },
        { property: "og:image", content: s.image },
      ],
      links: [{ rel: "canonical", href: `/services/${s.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            name: s.name,
            description: s.intro,
            procedureType: "Orthodontic",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: s.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="pt-40 pb-32 text-center px-6">
      <h1 className="font-display text-5xl mb-6">Service not found</h1>
      <Link
        to="/services"
        className="text-primary uppercase tracking-[0.2em] text-xs border-b border-primary pb-1"
      >
        Back to all services
      </Link>
    </div>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData() as { service: Service };
  const related = service.related
    .map((slug) => SERVICE_BY_SLUG[slug])
    .filter(Boolean);

  return (
    <>
      <ServiceHero service={service} />
      <ServiceIntro service={service} />
      <ServiceHighlights service={service} />
      <ServiceWhenAndExpect service={service} />
      {service.pullQuote && <PullQuote text={service.pullQuote} />}
      <ServiceWhyUs service={service} />
      {service.testimonial && <ServiceTestimonial service={service} />}
      <ServiceFAQ service={service} />
      {related.length > 0 && <RelatedServices items={related} />}
      <ServiceCTA service={service} />
    </>
  );
}

/* ---------------- HERO VARIANTS ---------------- */

function ServiceHero({ service }: { service: Service }) {
  const v = service.variant;

  if (v === "brand") {
    return (
      <section className="pt-32 lg:pt-40 pb-0 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <BackLink />
          <div className="relative rounded-3xl overflow-hidden bg-foreground">
            <img
              src={service.image}
              alt={service.name}
              width={1920}
              height={1080}
              className="w-full h-[420px] md:h-[520px] object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-14 lg:p-16">
              <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full bg-background/95 backdrop-blur">
                <span className="font-display italic text-lg lg:text-xl text-foreground">
                  Invisalign
                </span>
                <span className="w-px h-4 bg-foreground/20" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/70 font-medium">
                  {service.brandMark}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-background leading-[0.95] max-w-3xl text-balance">
                {service.heroTitle}
              </h1>
              {service.heroLead && (
                <p className="mt-6 text-background/80 text-lg md:text-xl max-w-xl leading-relaxed">
                  {service.heroLead}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (v === "advisory") {
    return (
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-20 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <BackLink />
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
            {service.name} · For Children
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-10 text-balance">
            {service.heroTitle}
          </h1>
          {service.heroLead && (
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl">
              {service.heroLead}
            </p>
          )}
        </div>
        <div className="max-w-6xl mx-auto mt-14 rounded-3xl overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            width={1920}
            height={1080}
            className="w-full h-[280px] md:h-[420px] object-cover"
          />
        </div>
      </section>
    );
  }

  if (v === "clinical") {
    return (
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <BackLink />
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={service.image}
                  alt={service.name}
                  width={1280}
                  height={1280}
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
                {service.name}
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8 text-balance">
                {service.heroTitle}
              </h1>
              {service.heroLead && (
                <p className="text-xl text-foreground/80 leading-relaxed">
                  {service.heroLead}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (v === "editorial") {
    return (
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <BackLink />
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
                {service.name}
              </div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.92] mb-8 text-balance">
                {service.heroTitle}
              </h1>
              {service.heroLead && (
                <p className="text-xl md:text-2xl text-foreground/75 leading-relaxed max-w-xl">
                  {service.heroLead}
                </p>
              )}
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={service.image}
                  alt={service.name}
                  width={960}
                  height={1280}
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (v === "considered") {
    return (
      <section className="pt-32 lg:pt-40 pb-12 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <BackLink centered />
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
            {service.name}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8 text-balance">
            {service.heroTitle}
          </h1>
          {service.heroLead && (
            <p className="text-lg md:text-xl text-foreground/75 leading-relaxed">
              {service.heroLead}
            </p>
          )}
        </div>
        <div className="max-w-5xl mx-auto mt-14 rounded-3xl overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            width={1280}
            height={960}
            className="w-full aspect-[4/3] object-cover"
          />
        </div>
      </section>
    );
  }

  if (v === "longterm") {
    return (
      <section className="pt-32 lg:pt-40 pb-0 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <BackLink />
          <div className="bg-secondary/40 rounded-3xl overflow-hidden grid lg:grid-cols-2 gap-0">
            <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-center">
              <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
                {service.name}
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8 text-balance">
                {service.heroTitle}
              </h1>
              {service.heroLead && (
                <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed">
                  {service.heroLead}
                </p>
              )}
            </div>
            <div>
              <img
                src={service.image}
                alt={service.name}
                width={1280}
                height={1280}
                className="w-full h-full min-h-[320px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // WARM (Children & Teens)
  return (
    <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <BackLink />
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
              {service.name}
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8 text-balance">
              {service.heroTitle}
            </h1>
            {service.heroLead && (
              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl">
                {service.heroLead}
              </p>
            )}
          </div>
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={service.image}
                alt={service.name}
                width={1280}
                height={1600}
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BackLink({ centered = false }: { centered?: boolean }) {
  return (
    <div className={centered ? "mb-8 flex justify-center" : "mb-8 lg:mb-10"}>
      <Link
        to="/services"
        className="inline-flex items-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
      >
        ← All services
      </Link>
    </div>
  );
}

/* ---------------- INTRO ---------------- */

function ServiceIntro({ service }: { service: Service }) {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-3xl mx-auto">
        <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-6">
          Overview
        </div>
        {service.intro.split("\n\n").map((p: string, i: number) => (
          <p
            key={i}
            className="text-lg lg:text-xl leading-relaxed text-foreground/85 mb-6 last:mb-0"
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

function ServiceHighlights({ service }: { service: Service }) {
  return (
    <section className="px-6 lg:px-10 pb-20 lg:pb-28">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10 rounded-3xl overflow-hidden border border-foreground/10">
        {service.highlights.map((h) => (
          <div key={h.label} className="bg-background p-8 lg:p-10">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
              {h.label}
            </div>
            <div className="font-display text-2xl lg:text-3xl leading-tight text-balance">
              {h.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- WHEN + WHAT TO EXPECT ---------------- */

function ServiceWhenAndExpect({ service }: { service: Service }) {
  const hasExpect = !!(service.expect && service.expect.length > 0);
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-secondary/30">
      <div
        className={`max-w-6xl mx-auto grid gap-12 lg:gap-20 ${
          hasExpect ? "md:grid-cols-2" : "md:grid-cols-1 max-w-3xl"
        }`}
      >
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-6">
            {service.whenLabel}
          </div>
          <ul className="space-y-4">
            {service.when.map((w: string) => (
              <li key={w} className="flex gap-4 text-foreground/85 leading-relaxed">
                <Check className="size-5 text-primary flex-none mt-1" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
        {hasExpect && (
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-6">
              {service.expectLabel}
            </div>
            <ul className="space-y-4">
              {service.expect!.map((w: string) => (
                <li key={w} className="flex gap-4 text-foreground/85 leading-relaxed">
                  <Check className="size-5 text-primary flex-none mt-1" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function PullQuote({ text }: { text: string }) {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-4xl mx-auto">
        <blockquote className="border-l-2 border-primary pl-8 lg:pl-12 py-4">
          <p className="font-display italic text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-balance">
            &ldquo;{text}&rdquo;
          </p>
        </blockquote>
      </div>
    </section>
  );
}

/* ---------------- WHY US ---------------- */

function ServiceWhyUs({ service }: { service: Service }) {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-4xl mx-auto">
        <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-4">
          Why Tsai Orthodontics
        </div>
        <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-balance text-foreground/90">
          {service.whyUs}
        </p>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIAL ---------------- */

function ServiceTestimonial({ service }: { service: Service }) {
  const t = service.testimonial!;
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <Quote className="size-10 text-primary mb-8" strokeWidth={1.25} />
        <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-snug text-balance mb-8">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          — {t.attribution}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function ServiceFAQ({ service }: { service: Service }) {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-5xl mx-auto">
        <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-4">
          Common questions
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-12 max-w-2xl text-balance">
          About {service.name.toLowerCase()}.
        </h2>
        <div className="divide-y divide-foreground/10 border-y border-foreground/10">
          {service.faqs.map((f) => (
            <details key={f.q} className="group py-6 lg:py-7">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                <span className="font-display text-xl md:text-2xl leading-snug text-balance">
                  {f.q}
                </span>
                <span className="text-primary text-2xl leading-none mt-1 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-foreground/75 leading-relaxed max-w-3xl">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- RELATED + CTA ---------------- */

function RelatedServices({ items }: { items: Service[] }) {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-4">
          Related Services
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-12 max-w-2xl text-balance">
          You might also be looking at —
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((r) => (
            <Link
              key={r.slug}
              to="/services/$slug"
              params={{ slug: r.slug }}
              className="group block bg-background p-8 rounded-3xl border border-foreground/10 hover:border-primary hover:shadow-lg transition-all"
            >
              <h3 className="font-display text-2xl mb-3">{r.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {r.short}
              </p>
              <span className="inline-flex items-center gap-1 text-primary text-[11px] uppercase tracking-[0.2em] group-hover:gap-2 transition-all">
                {r.ctaLabel} <ArrowUpRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCTA({ service }: { service: Service }) {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-5xl mx-auto p-10 lg:p-16 rounded-3xl bg-foreground text-background">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-8 max-w-2xl leading-[1.1]">
          Curious if {service.name.toLowerCase()} is right for you?
        </h2>
        <p className="text-background/70 leading-relaxed max-w-xl mb-10">
          The first consultation is complimentary. We&rsquo;ll look carefully, answer your questions, and give you a clear, honest recommendation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/contact"
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-foreground transition-colors inline-flex items-center justify-center gap-2"
          >
            Book a Consultation <ArrowRight className="size-4" />
          </Link>
          <a
            href={SITE.phoneHref}
            className="px-8 py-4 rounded-full border border-white/20 text-background text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors text-center"
          >
            Call {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
