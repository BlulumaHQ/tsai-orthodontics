import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import {
  SERVICE_BY_SLUG,
  localizedService,
  type Service,
} from "@/lib/services-data";
import { SITE } from "@/lib/site-data";
import { useT } from "@/lib/i18n";
import { Zoomable } from "@/components/site/Zoomable";
import dentalChairBg from "@/assets/dental-chair-brand.jpg.asset.json";

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
          description: s.intro.join(" "),
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
      <h1 className="font-display text-5xl mb-6">{t("Service not found", "找不到該項服務")}</h1>
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
  const { lang } = useT();
  const service = localizedService(raw, lang);

  switch (service.slug) {
    case "children-and-teens":
      return <ChildrenAndTeensPage service={service} />;
    case "adults":
      return <AdultsPage service={service} />;
    case "braces-and-fixed-appliances":
      return <BracesPage service={service} />;
    case "invisalign":
      return <InvisalignPage service={service} />;
    case "phase-i-treatment":
      return <PhaseIPage service={service} />;
    case "airway-friendly-orthodontics":
      return <AirwayPage service={service} />;
    case "marpe":
      return <MarpePage service={service} />;
    case "retainers":
      return <RetainersPage service={service} />;
    default:
      return <ChildrenAndTeensPage service={service} />;
  }
}

function ChildrenAndTeensPage({ service }: { service: Service }) {
  return (
    <>
      <section className="pt-32 lg:pt-40 px-6 lg:px-10 pb-16">
        <div className="max-w-7xl mx-auto">
          <BackLink />
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <Eyebrow>{service.name}</Eyebrow>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] max-w-3xl text-balance">
                {service.heroTitle}
              </h1>
            </div>
            <div className="lg:col-span-5 rounded-[1.5rem] overflow-hidden bg-secondary/40 flex items-center justify-center">
              <Zoomable src={service.image} alt={service.heroAlt} width={1280} height={960} className="w-full h-auto max-h-[520px] object-contain" />
            </div>
          </div>
          <IntroBlock service={service} className="mt-16 lg:mt-20 max-w-3xl" />
        </div>
      </section>
      <TwoColumnCare service={service} />
      <WhyPanel service={service} align="center" />
      <FAQSection service={service} />
      <ServiceGallery service={service} />
      <RelatedServices service={service} />
      <ConsultationCTA service={service} />
    </>
  );
}

function AdultsPage({ service }: { service: Service }) {
  return (
    <>
      <section className="pt-32 lg:pt-40 px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto">
          <BackLink />
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-20 items-end">
            <div className="order-2 lg:order-1 rounded-[1.5rem] overflow-hidden bg-secondary/40 flex items-center justify-center">
              <Zoomable src={service.image} alt={service.heroAlt} width={1080} height={1350} className="w-full h-auto max-h-[640px] object-contain" />
            </div>
            <div className="order-1 lg:order-2 pb-0 lg:pb-10">
              <Eyebrow>{service.name}</Eyebrow>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.92] text-balance">
                {service.heroTitle}
              </h1>
              <IntroBlock service={service} className="mt-10 max-w-xl" />
            </div>
          </div>
        </div>
      </section>
      <SplitListSection service={service} />
      <WhyPanel service={service} align="left" />
      <ServiceGallery service={service} />
      <RelatedServices service={service} />
      <ConsultationCTA service={service} />
    </>
  );
}

function BracesPage({ service }: { service: Service }) {
  const { t } = useT();
  return (
    <>
      <section className="pt-32 lg:pt-40 px-6 lg:px-10 pb-12">
        <div className="max-w-7xl mx-auto">
          <BackLink />
          <div className="max-w-4xl">
            <Eyebrow>{service.name}</Eyebrow>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.94] text-balance">
              {service.heroTitle}
            </h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 rounded-[1.5rem] overflow-hidden bg-secondary/40 flex items-center justify-center">
          <Zoomable src={service.image} alt={service.heroAlt} width={1600} height={900} className="w-full h-auto max-h-[560px] object-contain" />
        </div>
      </section>
      <section className="px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <IntroBlock service={service} className="lg:col-span-5" />
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-foreground/10 rounded-[1.25rem] overflow-hidden border border-foreground/10">
            {service.primaryItems.map((item) => (
              <div key={item} className="bg-background p-7 lg:p-8 flex items-center gap-4">
                <Check className="size-5 text-primary flex-none" aria-label={t("included", "包含")} />
                <span className="font-display text-2xl leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceGallery service={service} />
      <RelatedServices service={service} />
      <ConsultationCTA service={service} />
    </>
  );
}

function InvisalignPage({ service }: { service: Service }) {
  const { t } = useT();
  return (
    <>
      <section className="pt-32 lg:pt-40 px-6 lg:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <BackLink />
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-secondary/60 text-foreground px-5 py-2 mb-8">
                <span className="font-display italic text-xl">Invisalign</span>
                <span className="h-4 w-px bg-foreground/20" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/65">
                  {t("Clear aligners", "隱形牙套")}
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.94] text-balance">
                {service.heroTitle}
              </h1>
              <IntroBlock service={service} className="mt-10 max-w-xl" dark={false} />
            </div>
            <div className="rounded-[1.75rem] overflow-hidden bg-secondary/40 flex items-center justify-center">
              <Zoomable src={service.image} alt={service.heroAlt} width={1280} height={1280} className="w-full h-auto max-h-[620px] object-contain" />
            </div>
          </div>
        </div>
      </section>
      <IconListBand service={service} />
      <ServiceGallery service={service} />
      <RelatedServices service={service} />
      <ConsultationCTA service={service} />
    </>
  );
}

function PhaseIPage({ service }: { service: Service }) {
  return (
    <>
      <section className="pt-32 lg:pt-40 px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="max-w-5xl mx-auto text-center">
          <BackLink centered />
          <Eyebrow>{service.name}</Eyebrow>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.96] text-balance mx-auto">
            {service.heroTitle}
          </h1>
        </div>
        <div className="max-w-6xl mx-auto mt-14 rounded-[1.5rem] overflow-hidden">
          <img src={service.image} alt={service.heroAlt} width={1600} height={1000} className="w-full aspect-[16/8] object-cover" />
        </div>
      </section>
      <section className="px-6 lg:px-10 py-20 bg-secondary/35">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <IntroBlock service={service} />
          <NumberedList title={service.primarySectionTitle} items={service.primaryItems} />
        </div>
      </section>
      <ServiceGallery service={service} />
      <RelatedServices service={service} />
      <ConsultationCTA service={service} />
    </>
  );
}

function AirwayPage({ service }: { service: Service }) {
  return (
    <>
      <section className="pt-32 lg:pt-40 px-6 lg:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <BackLink />
          <div className="grid lg:grid-cols-2 gap-0 rounded-[1.75rem] overflow-hidden bg-secondary/35">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <Eyebrow>{service.name}</Eyebrow>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.96] text-balance">
                {service.heroTitle}
              </h1>
              <IntroBlock service={service} className="mt-10" />
            </div>
            <img src={service.image} alt={service.heroAlt} width={1280} height={1280} className="w-full h-full min-h-[420px] object-cover" />
          </div>
        </div>
      </section>
      <section className="px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto border-l-2 border-primary pl-8 lg:pl-12">
          <Eyebrow>{service.primarySectionTitle}</Eyebrow>
          <p className="font-display text-3xl md:text-5xl leading-[1.12] text-balance">
            {service.primaryItems[0]}
          </p>
        </div>
      </section>
      <ServiceGallery service={service} />
      <RelatedServices service={service} />
      <ConsultationCTA service={service} />
    </>
  );
}

function MarpePage({ service }: { service: Service }) {
  return (
    <>
      <section className="pt-32 lg:pt-40 px-6 lg:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <BackLink />
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <img src={service.image} alt={service.heroAlt} width={1100} height={1100} className="w-full aspect-square object-cover rounded-full" />
            </div>
            <div className="lg:col-span-7">
              <Eyebrow>{service.name}</Eyebrow>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.92] text-balance">
                {service.heroTitle}
              </h1>
              <IntroBlock service={service} className="mt-10 max-w-2xl" />
            </div>
          </div>
        </div>
      </section>
      <IconListBand service={service} />
      <ServiceGallery service={service} />
      <RelatedServices service={service} />
      <ConsultationCTA service={service} />
    </>
  );
}

function RetainersPage({ service }: { service: Service }) {
  return (
    <>
      <section className="pt-32 lg:pt-40 px-6 lg:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <BackLink />
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
            <div>
              <Eyebrow>{service.name}</Eyebrow>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.94] text-balance">
                {service.heroTitle}
              </h1>
              <IntroBlock service={service} className="mt-10 max-w-2xl" />
            </div>
            <div className="rounded-[1.5rem] overflow-hidden bg-secondary/40 p-3">
              <img src={service.image} alt={service.heroAlt} width={1080} height={1080} className="w-full aspect-square object-cover rounded-[1.1rem]" />
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.primaryItems.map((item) => (
            <div key={item} className="min-h-40 bg-secondary/35 p-7 rounded-[1.25rem] flex items-end">
              <h2 className="font-display text-2xl leading-tight">{item}</h2>
            </div>
          ))}
        </div>
      </section>
      <ServiceGallery service={service} />
      <RelatedServices service={service} />
      <ConsultationCTA service={service} />
    </>
  );
}

function BackLink({ centered = false }: { centered?: boolean }) {
  const { t } = useT();
  return (
    <div className={centered ? "mb-8 flex justify-center" : "mb-8 lg:mb-10"}>
      <Link to="/services" className="inline-flex items-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary">
        ← {t("All services", "全部服務")}
      </Link>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">{children}</div>;
}

function IntroBlock({ service, className = "", dark = false }: { service: Service; className?: string; dark?: boolean }) {
  return (
    <div className={className}>
      {service.intro.map((p) => (
        <p key={p} className={`text-lg lg:text-xl leading-relaxed mb-5 last:mb-0 ${dark ? "text-background/80" : "text-foreground/80"}`}>
          {p}
        </p>
      ))}
    </div>
  );
}

function TwoColumnCare({ service }: { service: Service }) {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-secondary/35">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
        <CheckList title={service.primarySectionTitle} items={service.primaryItems} />
        {service.expectTitle && service.expectItems && <CheckList title={service.expectTitle} items={service.expectItems} />}
      </div>
    </section>
  );
}

function SplitListSection({ service }: { service: Service }) {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-foreground text-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>{service.primarySectionTitle}</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-balance">{service.primarySectionTitle}</h2>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {service.primaryItems.map((item) => (
            <div key={item} className="border border-background/15 p-6 rounded-[1rem] text-lg text-background/85">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <Eyebrow>{title}</Eyebrow>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-4 text-foreground/85 leading-relaxed">
            <Check className="size-5 text-primary flex-none mt-1" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NumberedList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <Eyebrow>{title}</Eyebrow>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-5 border-b border-foreground/10 py-5">
            <span className="text-primary text-[10px] font-mono tracking-[0.25em]">{String(index + 1).padStart(2, "0")}</span>
            <span className="font-display text-2xl leading-tight">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IconListBand({ service }: { service: Service }) {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-secondary/35">
      <div className="max-w-6xl mx-auto">
        <Eyebrow>{service.primarySectionTitle}</Eyebrow>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.primaryItems.map((item) => (
            <div key={item} className="bg-background border border-foreground/10 rounded-[1.25rem] p-7 min-h-44 flex flex-col justify-between">
              <Check className="size-5 text-primary" />
              <h2 className="font-display text-2xl leading-tight mt-10">{item}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyPanel({ service, align }: { service: Service; align: "left" | "center" }) {
  const { t } = useT();
  if (!service.whyUs) return null;
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className={`max-w-4xl mx-auto ${align === "center" ? "text-center" : ""}`}>
        <Eyebrow>{t("Why Tsai Orthodontics", "為什麼選擇 Tsai Orthodontics")}</Eyebrow>
        <p className="font-display text-3xl md:text-5xl leading-[1.12] text-balance">{service.whyUs}</p>
      </div>
    </section>
  );
}

function FAQSection({ service }: { service: Service }) {
  const { t } = useT();
  if (service.faqs.length === 0) return null;
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-secondary/35">
      <div className="max-w-5xl mx-auto">
        <Eyebrow>{t("FAQ", "常見問題")}</Eyebrow>
        <div className="divide-y divide-foreground/10 border-y border-foreground/10">
          {service.faqs.map((f) => (
            <details key={f.q} className="group py-6 lg:py-7">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                <span className="font-display text-xl md:text-2xl leading-snug text-balance">{f.q}</span>
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
            <Eyebrow>{t("Inside the practice", "走進診所")}</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] max-w-2xl text-balance">
              {t(
                `A closer look at ${service.name.toLowerCase()} at Tsai Orthodontics.`,
                `走近看看 Tsai Orthodontics 的 ${service.name}。`,
              )}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {service.gallery.map((g, i) => (
            <div
              key={g.src + i}
              className={`overflow-hidden rounded-2xl bg-secondary/40 ${i === 0 ? "col-span-2 lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto" : "aspect-[4/5]"}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
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
        <Eyebrow>{t("Related Services", "相關服務")}</Eyebrow>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {related.map((r) => (
            <Link key={r.slug} to="/services/$slug" params={{ slug: r.slug }} className="group bg-background border border-foreground/10 rounded-[1.25rem] p-7 hover:border-primary transition-all">
              <h2 className="font-display text-2xl mb-3">{r.name}</h2>
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

function ConsultationCTA({ service }: { service: Service }) {
  const { t } = useT();
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div
        className="relative max-w-5xl mx-auto rounded-[1.5rem] overflow-hidden p-8 md:p-12 lg:p-16 text-background"
        style={{
          backgroundImage: `linear-gradient(120deg, oklch(0.45 0.12 50 / 0.92), oklch(0.63 0.12 50 / 0.78)), url(${dentalChairBg.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="font-display text-3xl md:text-5xl leading-[1.1] mb-8 max-w-3xl text-balance">
          {t(
            `Curious if ${service.name.toLowerCase()} is right for you?`,
            `想了解 ${service.name} 是否適合您嗎？`,
          )}
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/contact" className="px-8 py-4 rounded-full bg-background text-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors inline-flex items-center justify-center gap-2">
            {t("Book a Consultation", "預約諮詢")} <ArrowRight className="size-4" />
          </Link>
          <a href={SITE.phoneHref} className="px-8 py-4 rounded-full border border-background/40 text-background text-xs uppercase tracking-[0.2em] hover:bg-background/15 transition-colors text-center">
            {t("Call", "電話聯絡")} {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
