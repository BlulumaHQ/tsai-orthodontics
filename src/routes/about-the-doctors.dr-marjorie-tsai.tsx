import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/about-the-doctors/dr-marjorie-tsai")({
  head: () => ({
    meta: [
      { title: "Dr. Marjorie Tsai | Tsai Orthodontics" },
      {
        name: "description",
        content:
          "Dr. Marjorie Tsai's biography will be added soon. Tsai Orthodontics provides specialist orthodontic care in Vancouver with the same thoughtful, family-centered approach.",
      },
      { property: "og:title", content: "Dr. Marjorie Tsai | Tsai Orthodontics" },
      { property: "og:description", content: "Biography coming soon." },
      { property: "og:url", content: "/about-the-doctors/dr-marjorie-tsai" },
    ],
    links: [{ rel: "canonical", href: "/about-the-doctors/dr-marjorie-tsai" }],
  }),
  component: DrMarjoriePage,
});

function DrMarjoriePage() {
  return (
    <>
      <PageHero
        eyebrow="Dr. Marjorie Tsai"
        title={<>Biography <span className="italic font-normal">coming soon.</span></>}
        intro="This page is being prepared as part of the complete Tsai Orthodontics website."
      />

      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-foreground/8 bg-secondary/30 p-10 lg:p-14">
            <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-4">
              About Dr. Marjorie Tsai
            </div>
            <p className="text-lg text-foreground/85 leading-relaxed mb-6">
              Dr. Marjorie Tsai's full biography will be added soon. Patients can expect the same thoughtful, family-centered approach that defines the Tsai Orthodontics experience — careful explanation, warm communication, and specialist-level orthodontic planning.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              In the meantime, please feel free to contact the practice directly with any questions.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
        >
          Contact the Practice
        </Link>
      </section>
    </>
  );
}
