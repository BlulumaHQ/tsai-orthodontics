import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SERVICES, localizedService } from "@/lib/services-data";
import { SITE } from "@/lib/site-data";
import { useT } from "@/lib/i18n";


const clinicChairBackground = "/images/backgrounds/dental-chair.jpg";

export const Route = createFileRoute("/services/")({
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
        content: "Specialist orthodontic care for children, teens, and adults in Vancouver.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const { t, lang } = useT();

  return (
    <>
      <PageHero
        eyebrow={t("Our Services", "矯正服務")}
        title={t("Our Services", "我們的矯正服務")}
        intro={t(
          "Specialist orthodontic care for children, teens, and adults in Vancouver.",
          "為溫哥華的兒童、青少年與成人提供的齒顎矯正專科照護。",
        )}
      />

      <section className="px-6 lg:px-10 pb-16 lg:pb-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed text-pretty">
            {t(
              "Every smile is different. Some patients need early guidance, some need fixed appliances, and others may be candidates for clear aligners or retention care. At Tsai Orthodontics, treatment begins with a careful evaluation and a clear explanation of the options.",
              "每個人的笑容都不一樣。有些病患需要早期引導，有些需要固定式矯正器，也有些適合隱形牙套或維持器照護。在 Tsai Orthodontics，治療一定從仔細的評估與清楚的選項說明開始。",
            )}
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((raw, i) => {
            const s = localizedService(raw, lang);
            return (
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
                  <h2 className="font-serif text-2xl lg:text-3xl mb-3 leading-tight">
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
            );
          })}
        </div>
      </section>

      <section
        className="px-6 lg:px-10 py-24 lg:py-32 text-background"
        style={{
          backgroundImage: `linear-gradient(120deg, color-mix(in oklab, var(--foreground) 50%, var(--primary) 50%), color-mix(in oklab, var(--primary) 76%, var(--secondary) 24%)), url(${clinicChairBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-background/75 text-[11px] uppercase tracking-[0.3em] mb-6">
            {t("Next step", "下一步")}
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 text-balance">
            {t("Not sure which option fits? Let’s talk.", "不確定哪一種適合？歡迎與我們聊聊。")}
          </h2>
          <p className="text-background/80 text-lg max-w-2xl mx-auto mb-10">
            {t(
              "The first consultation is complimentary. We’ll look carefully, answer every question, and help you decide what’s right — with no pressure to commit.",
              "第一次諮詢完全免費。我們會仔細看診、回答您的每一個問題，並協助您做出合適的決定，過程中不會有任何壓力。",
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-background text-foreground rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-colors inline-flex items-center justify-center gap-2"
            >
              {t("Book a Consultation", "預約諮詢")} <ArrowRight className="size-4" />
            </Link>
            <a
              href={SITE.phoneHref}
              className="px-8 py-4 border border-background/40 rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-background/15 transition-colors"
            >
              {t("Call", "電話聯絡")} {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
