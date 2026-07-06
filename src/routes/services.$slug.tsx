import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import {
  SERVICE_BY_SLUG,
  localizedService,
  type Service,
  type ServiceBlock,
} from "@/lib/services-data";
import { SITE } from "@/lib/site-data";
import { useT } from "@/lib/i18n";
import { Zoomable } from "@/components/site/Zoomable";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICE_BY_SLUG[params.slug];
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service — Tsai Orthodontics" }] };

    const scripts = [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          name: s.name,
          description: s.body
            .filter((b) => b.kind === "p")
            .map((b) => (b as { en: string }).en)
            .join(" "),
          procedureType: "Orthodontic",
        }),
      },
    ];

    if (s.faqs.length > 0) {
      scripts.push({
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
      });
    }

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
      scripts,
    };
  },
  component: ServicePage,
  notFoundComponent: () => <NotFound />,
});

function NotFound() {
  const { t } = useT();
  return (
    <div className="pt-40 pb-32 text-center px-6">
      <h1 className="font-serif text-5xl mb-6">{t("Service not found", "找不到該項服務")}</h1>
      <Link
        to="/services"
        className="text-primary uppercase tracking-[0.2em] text-xs border-b border-primary pb-1"
      >
        {t("Back to all services", "返回全部服務")}
      </Link>
    </div>
  );
}

function ServicePage() {
  const { service: raw } = Route.useLoaderData() as { service: Service };
  const { t, lang } = useT();
  const service = localizedService(raw, lang);
  const pick = (en: string, zh: string) => (lang === "zh" ? zh : en);

  return (
    <>
      {/* HERO */}
      <section className="pt-32 lg:pt-40 px-6 lg:px-10 pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 lg:mb-10">
            <Link
              to="/services"
              className="inline-flex items-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
            >
              ← {t("All services", "全部服務")}
            </Link>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
                {service.name}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.98] max-w-3xl text-balance">
                {service.heroTitle}
              </h1>
            </div>
            <div className="lg:col-span-5 rounded-[1.5rem] overflow-hidden bg-secondary/40 flex items-center justify-center">
              <Zoomable
                src={service.image}
                alt={service.heroAlt}
                width={1280}
                height={960}
                style={{ objectPosition: service.imagePosition ?? "center" }}
                className="w-full aspect-[3/2] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="px-6 lg:px-10 py-12 lg:py-20">
        <div className="max-w-2xl mx-auto space-y-8">
          {service.body.map((block, i) => (
            <BodyBlock key={i} block={block} pick={pick} />
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl leading-snug text-balance mb-8">
            {pick(service.ctaLead.en, service.ctaLead.zh)}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-foreground text-background text-xs uppercase tracking-[0.2em] hover:bg-primary transition-colors inline-flex items-center justify-center gap-2"
            >
              {t("Book a Consultation", "預約諮詢")} <ArrowRight className="size-4" />
            </Link>
            <a
              href="tel:+16047088138"
              className="px-8 py-4 rounded-full border border-foreground/30 text-foreground text-xs uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors text-center"
            >
              {t("Call 604-708-8138", "電話 604-708-8138")}
            </a>
          </div>
        </div>
      </section>

      
      <FAQSection service={service} />
      <RelatedServices service={service} />
    </>
  );
}

function BodyBlock({
  block,
  pick,
}: {
  block: ServiceBlock;
  pick: (en: string, zh: string) => string;
}) {
  if (block.kind === "p") {
    return (
      <p className="text-lg md:text-xl leading-relaxed text-foreground/85 text-pretty">
        {pick(block.en, block.zh)}
      </p>
    );
  }
  if (block.kind === "subhead") {
    return (
      <h2 className="font-serif text-2xl md:text-3xl leading-snug text-balance pt-4">
        {pick(block.en, block.zh)}
      </h2>
    );
  }
  if (block.kind === "bullets") {
    return (
      <div>
        <p className="text-lg md:text-xl leading-relaxed text-foreground/85 mb-4">
          {pick(block.en, block.zh)}
        </p>
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-foreground/85">
              <Check className="size-4 text-primary mt-1.5 shrink-0" />
              <span className="leading-relaxed">{pick(item.en, item.zh)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (block.kind === "steps") {
    return (
      <div>
        <p className="text-lg md:text-xl leading-relaxed text-foreground/85 mb-4">
          {pick(block.en, block.zh)}
        </p>
        <ol className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-4 text-foreground/85">
              <span className="font-mono text-primary text-sm mt-1 shrink-0 w-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-relaxed">{pick(item.en, item.zh)}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return null;
}

function FAQSection({ service }: { service: Service }) {
  const { t } = useT();
  if (service.faqs.length === 0) return null;
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-secondary/35">
      <div className="max-w-5xl mx-auto">
        <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
          {t("FAQ", "常見問題")}
        </div>
        <div className="divide-y divide-foreground/10 border-y border-foreground/10">
          {service.faqs.map((f, idx) => (
            <details key={f.q} open={idx === 0} className="group py-6 lg:py-7">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                <span className="font-serif text-xl md:text-2xl leading-snug text-balance">{f.q}</span>
                <span className="text-primary text-2xl leading-none mt-1 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-foreground/75 leading-relaxed max-w-3xl">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceGallery({ service }: { service: Service }) {
  const { t } = useT();
  if (!service.gallery || service.gallery.length === 0) return null;
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-4">
              {t("Inside the practice", "走進診所")}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] max-w-2xl text-balance">
              {t(
                `A closer look at ${service.name.toLowerCase()} at Tsai Orthodontics.`,
                `走近看看 Tsai Orthodontics 的 ${service.name}。`,
              )}
            </h2>
          </div>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-5 [column-fill:_balance]">
          {service.gallery.map((g, i) => (
            <div
              key={g.src + i}
              className="mb-4 lg:mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-secondary/40"
            >
              <Zoomable
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="w-full h-auto block hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedServices({ service }: { service: Service }) {
  const { t, lang } = useT();
  const related = service.related
    .map((slug) => SERVICE_BY_SLUG[slug])
    .filter(Boolean)
    .map((s) => localizedService(s, lang));
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-secondary/35">
      <div className="max-w-7xl mx-auto">
        <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
          {t("Related Services", "相關服務")}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {related.map((r) => (
            <Link key={r.slug} to="/services/$slug" params={{ slug: r.slug }} className="group bg-background border border-foreground/10 rounded-[1.25rem] p-7 hover:border-primary transition-all">
              <h2 className="font-serif text-2xl mb-3">{r.name}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{r.short}</p>
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

// Note: SITE import preserved for any future use; not referenced here.
void SITE;
