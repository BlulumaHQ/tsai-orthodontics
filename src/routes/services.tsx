import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SERVICES } from "@/lib/services-data";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Tsai Orthodontics" },
      {
        name: "description",
        content:
          "Specialist orthodontic services in Vancouver: braces, Invisalign, Phase I treatment, MARPE, airway-friendly orthodontics, and retainers — all delivered personally by Dr. Tsai.",
      },
      { property: "og:title", content: "Our Services — Tsai Orthodontics" },
      { property: "og:description", content: "Considered orthodontic care for children, teens, and adults in Vancouver." },
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
        title={<>Specialist care, <span className="italic font-normal">considered in full.</span></>}
        intro="Every service we offer is delivered personally by Dr. Tsai. Explore each treatment below — or jump directly to what you're looking for."
      />

      {/* Quick navigation chips */}
      <section className="px-6 lg:px-10 pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-5">Jump to</div>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="text-[11px] uppercase tracking-[0.18em] px-4 py-2.5 rounded-full border border-foreground/15 text-foreground/80 hover:bg-foreground hover:text-background transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Long-scroll service sections */}
      <section className="px-6 lg:px-10 pb-24">
        <div className="max-w-6xl mx-auto space-y-24 lg:space-y-32">
          {SERVICES.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="scroll-mt-24 grid lg:grid-cols-12 gap-8 lg:gap-12 pt-8 border-t border-foreground/10"
            >
              <div className="lg:col-span-4">
                <div className="text-primary text-[11px] font-mono tracking-[0.25em] mb-4">
                  {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                </div>
                <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-4 text-balance">
                  {s.name}
                </h2>
                <p className="text-primary italic text-lg">{s.tagline}</p>
              </div>

              <div className="lg:col-span-8 space-y-8">
                <p className="text-foreground/85 text-lg leading-relaxed text-pretty">
                  {s.overview}
                </p>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/50 mb-3">Who it's for</div>
                  <p className="text-foreground/80 leading-relaxed">{s.who}</p>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/50 mb-4">What you can expect</div>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex gap-3 text-foreground/85">
                        <span className="text-primary mt-2 size-1.5 rounded-full bg-primary flex-none" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-medium border-b border-primary pb-1 hover:gap-3 transition-all"
                >
                  Full {s.name} details <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 bg-secondary/40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">Next step</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 text-balance">
            Not sure which option fits? Let's talk.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            The first consultation is complimentary. We'll look carefully, answer every question, and help you decide what's right — with no pressure to commit.
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
