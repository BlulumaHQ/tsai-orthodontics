import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { SERVICE_BY_SLUG, SERVICES } from "@/lib/services-data";
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
      ],
      links: [{ rel: "canonical", href: `/services/${s.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            name: s.name,
            description: s.main,
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
  const { service } = Route.useLoaderData();
  const related = service.related
    .map((slug) => SERVICE_BY_SLUG[slug])
    .filter(Boolean);

  return (
    <>
      {/* HERO */}
      <section className="pt-36 lg:pt-44 pb-16 lg:pb-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary mb-10"
          >
            ← All services
          </Link>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
                Service
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-balance mb-8">
                {service.name}
              </h1>
              {service.slug === "invisalign" && (
                <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full border border-foreground/15">
                  <span className="font-display italic text-lg">Invisalign</span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Provider
                  </span>
                </div>
              )}
              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl text-pretty">
                {service.hero}
              </p>
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

      {/* MAIN COPY */}
      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto">
          {service.main.split("\n\n").map((p, i) => (
            <p
              key={i}
              className="text-lg lg:text-xl leading-relaxed text-foreground/85 mb-6"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* PULL QUOTE */}
      {service.pullQuote && (
        <section className="px-6 lg:px-10 pb-24 lg:pb-32">
          <div className="max-w-4xl mx-auto">
            <blockquote className="border-l-2 border-primary pl-8 lg:pl-12 py-6">
              <p className="font-display italic text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-balance">
                &ldquo;{service.pullQuote}&rdquo;
              </p>
            </blockquote>
          </div>
        </section>
      )}

      {/* WHO + HOW */}
      <section className="px-6 lg:px-10 pb-24 lg:pb-32 bg-secondary/30 py-24 lg:py-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-6">
              Who this is for
            </div>
            <ul className="space-y-4">
              {service.who.map((w) => (
                <li key={w} className="flex gap-4 text-foreground/85 leading-relaxed">
                  <Check className="size-5 text-primary flex-none mt-1" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-6">
              How we approach it
            </div>
            <div className="space-y-5">
              {service.how.split("\n\n").map((p, i) => (
                <p key={i} className="text-foreground/85 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      {related.length > 0 && (
        <section className="px-6 lg:px-10 py-24 lg:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-4">
              Related Services
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-12 max-w-2xl text-balance">
              You might also be looking at —
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/services/$slug"
                  params={{ slug: r.slug }}
                  className="group block p-8 rounded-3xl border border-foreground/10 hover:border-primary hover:shadow-lg transition-all"
                >
                  <h3 className="font-display text-2xl mb-3">{r.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {r.short}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-[11px] uppercase tracking-[0.2em] group-hover:gap-2 transition-all">
                    Learn more <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 lg:px-10 pb-32">
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

      {/* unused for now - keep SERVICES referenced */}
      <span className="hidden">{SERVICES.length}</span>
    </>
  );
}
