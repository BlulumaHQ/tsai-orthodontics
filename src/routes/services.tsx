import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SERVICES } from "@/lib/services-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Tsai Orthodontics" },
      {
        name: "description",
        content:
          "Specialist orthodontic services in Vancouver: braces, Invisalign, Phase I treatment, MARPE, airway-friendly orthodontics, and retainers.",
      },
      { property: "og:title", content: "Services — Tsai Orthodontics" },
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
        eyebrow="Services"
        title={<>Specialist care, <span className="italic font-normal">considered in full.</span></>}
        intro="Every service we offer is delivered personally by Dr. Tsai. Browse the list to learn what each treatment is, who it's for, and how we approach it."
      />

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-7xl mx-auto grid gap-px bg-foreground/10 border border-foreground/10 rounded-3xl overflow-hidden md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group bg-background p-8 lg:p-12 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <span className="text-primary text-[11px] uppercase tracking-[0.25em] font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight className="size-5 text-foreground/40 group-hover:text-primary transition-colors" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-3 leading-tight">{s.name}</h2>
              <p className="text-muted-foreground italic text-lg mb-5">{s.tagline}</p>
              <p className="text-foreground/70 leading-relaxed text-pretty">{s.overview.slice(0, 140)}…</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
