import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SERVICES, SERVICE_BY_SLUG } from "@/lib/services-data";

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
        { title: `${s.name} — Tsai Orthodontics` },
        { name: "description", content: s.overview.slice(0, 158) },
        { property: "og:title", content: `${s.name} — Tsai Orthodontics` },
        { property: "og:description", content: s.tagline },
        { property: "og:url", content: `/services/${s.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/services/${s.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            name: s.name,
            description: s.overview,
            procedureType: "Orthodontic",
          }),
        },
      ],
    };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="pt-40 pb-32 text-center px-6">
      <h1 className="font-display text-5xl mb-6">Service not found</h1>
      <Link to="/services" className="text-primary uppercase tracking-[0.2em] text-xs border-b border-primary pb-1">
        Back to all services
      </Link>
    </div>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const idx = SERVICES.findIndex((s) => s.slug === service.slug);
  const next = SERVICES[(idx + 1) % SERVICES.length];

  return (
    <>
      <section className="pt-36 lg:pt-44 pb-16 lg:pb-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary mb-10"
          >
            ← All services
          </Link>
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
            Service
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance">
            {service.name}
          </h1>
          <p className="mt-8 font-display italic text-2xl md:text-3xl text-muted-foreground max-w-2xl">
            {service.tagline}
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10 lg:gap-16">
          <div className="md:col-span-4 md:sticky md:top-28 self-start">
            <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-3">Overview</div>
            <div className="text-sm text-muted-foreground leading-relaxed">{service.who}</div>
          </div>
          <div className="md:col-span-8 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>{service.overview}</p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24 lg:pb-32 bg-secondary/30 py-24 lg:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-6">Benefits</div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {service.benefits.map((b: string, i: number) => (
              <div key={b} className="flex gap-5 py-5 border-t border-foreground/10">
                <span className="text-primary font-mono text-sm">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-foreground/85 leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <section className="px-6 lg:px-10 pb-24 lg:pb-32">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl mb-12">Common questions</h2>
            <div>
              {service.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group border-t border-foreground/10 last:border-b py-6"
                >
                  <summary className="flex justify-between gap-6 cursor-pointer font-display text-xl md:text-2xl leading-snug list-none">
                    <span>{f.q}</span>
                    <span className="text-primary transition-transform group-open:rotate-45 text-3xl leading-none">+</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-5xl mx-auto p-10 lg:p-16 rounded-3xl bg-foreground text-background">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-8 max-w-2xl leading-[1.1]">
            Curious if {service.name.toLowerCase()} is right for you?
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-foreground transition-colors"
            >
              Book a Consultation
            </Link>
            <Link
              to="/services/$slug"
              params={{ slug: next.slug }}
              className="px-8 py-4 rounded-full border border-white/20 text-background text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              Next: {next.name} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
