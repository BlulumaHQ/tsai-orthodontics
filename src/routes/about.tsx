import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import studio from "@/assets/studio-interior.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Tsai Orthodontics" },
      {
        name: "description",
        content:
          "The story behind Tsai Orthodontics: a boutique specialist practice on Main Street in Vancouver, built on long relationships and quiet craft.",
      },
      { property: "og:title", content: "About Tsai Orthodontics" },
      {
        property: "og:description",
        content:
          "A boutique specialist orthodontic practice in Vancouver — built on listening, craft, and long relationships.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Practice"
        title={<>A small Vancouver practice <span className="italic font-normal">built on a different idea.</span></>}
        intro="We believe specialist orthodontic care should feel less like a clinic and more like a thoughtful conversation. Tsai Orthodontics was built around that simple idea."
      />

      <section className="px-6 lg:px-10 pb-24">
        <div className="max-w-6xl mx-auto overflow-hidden rounded-3xl">
          <img src={studio} alt="The Tsai Orthodontics studio interior" className="w-full aspect-[16/9] object-cover" loading="lazy" />
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-3xl mx-auto space-y-8 text-lg leading-relaxed text-foreground/85">
          <p>
            Most orthodontic offices are built for volume — fast, efficient, and friendly enough. We chose to build something quieter. A practice where Dr. Tsai personally designs every plan, where the waiting area feels like a living room, and where the difference between a good result and a beautiful one is the time we take to get there.
          </p>
          <p>
            We are a family-run practice on Main Street, serving Vancouver families in both English and Mandarin. Many of our patients come to us through a quiet word from someone they trust — and many stay with us for a decade or more.
          </p>
          <p>
            If that approach sounds like a fit, we would love to meet you.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-px bg-foreground/10 border-y border-foreground/10">
          {[
            ["10+", "Years of specialist practice"],
            ["2,500+", "Smiles refined and protected"],
            ["EN / 繁中", "Care in two languages"],
          ].map(([n, l]) => (
            <div key={l} className="bg-background p-10 lg:p-14 text-center">
              <div className="font-display text-5xl lg:text-6xl text-primary mb-3">{n}</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 text-balance">
            Meet the person who will design your care.
          </h2>
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 mt-2 px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
          >
            Meet Dr. Tsai
          </Link>
        </div>
      </section>
    </>
  );
}
