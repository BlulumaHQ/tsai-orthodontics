import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FAQ_GROUPS, ALL_FAQS } from "@/lib/faq-data";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Tsai Orthodontics" },
      {
        name: "description",
        content:
          "Answers to common questions about specialist orthodontic care at Tsai Orthodontics in Vancouver — consultations, treatment, insurance, financing.",
      },
      { property: "og:title", content: "Frequently Asked Questions" },
      { property: "og:description", content: "Clear answers to common orthodontic questions, from Tsai Orthodontics." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ALL_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently Asked"
        title={<>The questions <span className="italic font-normal">most families ask.</span></>}
        intro="If yours isn't here, please reach out — we are always happy to talk it through."
      />

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-3xl mx-auto space-y-20">
          {FAQ_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="font-display text-3xl md:text-4xl mb-8">{group.title}</h2>
              <div>
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="group border-t border-foreground/10 last:border-b py-6"
                  >
                    <summary className="flex justify-between gap-6 cursor-pointer font-display text-lg md:text-xl leading-snug list-none">
                      <span>{item.q}</span>
                      <span className="text-primary transition-transform group-open:rotate-45 text-2xl leading-none flex-none">+</span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
