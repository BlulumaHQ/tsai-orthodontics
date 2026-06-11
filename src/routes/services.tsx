import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SERVICES } from "@/lib/services-data";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Tsai Orthodontics Vancouver" },
      {
        name: "description",
        content:
          "Specialist orthodontic care for children, teens, and adults in Vancouver. Braces, Invisalign, Phase I treatment, MARPE, airway-friendly orthodontics, and retainers — all planned personally by Dr. Andrew Tsai.",
      },
      { property: "og:title", content: "Our Services — Tsai Orthodontics" },
      {
        property: "og:description",
        content:
          "Specialist orthodontic care for children, teens, and adults in Vancouver.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            Our <span className="italic font-normal">Services</span>
          </>
        }
        intro="Specialist orthodontic care for children, teens, and adults in Vancouver."
      />

      <section className="px-6 lg:px-10 pb-16 lg:pb-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed text-pretty">
            Every smile is different. Some patients need early guidance, some need fixed appliances, and others may be candidates for clear aligners or retention care. At Tsai Orthodontics, treatment begins with a careful evaluation and a clear explanation of the options.
          </p>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group block bg-background rounded-3xl overflow-hidden border border-foreground/10 hover:border-primary hover:shadow-xl transition-all"
            >
              <div className="overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  width={1280}
                  height={1600}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="text-primary text-[10px] font-mono tracking-[0.25em] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="font-display text-2xl lg:text-3xl mb-3 leading-tight">
                  {s.name}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {s.short}
                </p>
                <span className="inline-flex items-center gap-1 text-primary text-[11px] uppercase tracking-[0.2em] group-hover:gap-2 transition-all">
                  {s.ctaLabel} <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 bg-secondary/40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
            Next step
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 text-balance">
            Not sure which option fits? Let&rsquo;s talk.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            The first consultation is complimentary. We&rsquo;ll look carefully, answer every question, and help you decide what&rsquo;s right — with no pressure to commit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground transition-colors inline-flex items-center justify-center gap-2"
            >
              Book a Consultation <ArrowRight className="size-4" />
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
