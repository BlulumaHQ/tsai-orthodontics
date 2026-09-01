import { useT } from "@/lib/i18n";
import { BeforeAfterComparison } from "@/components/site/BeforeAfterComparison";

const images = import.meta.glob<string>(
  "../../assets/smile-transformations/*/*.webp",
  { eager: true, import: "default", query: "?url" },
);

function img(slug: string, file: string) {
  const key = `../../assets/smile-transformations/${slug}/${file}.webp`;
  return images[key] ?? "";
}

const VIEWS = ["left", "front", "right"] as const;

const CASES = [
  {
    slug: "crossbite-impacted-canine",
    title: "Crossbite / Impacted Canine",
    titleZh: "交叉咬合／阻生犬齒",
  },
  { slug: "crowding", title: "Crowding", titleZh: "牙齒擁擠" },
  { slug: "underbite", title: "Underbite", titleZh: "下顎前突（反咬）" },
  { slug: "deep-bite", title: "Deep Bite", titleZh: "深咬" },
];

const VIEW_LABEL: Record<
  (typeof VIEWS)[number],
  { en: string; zh: string }
> = {
  left: { en: "left side view", zh: "左側視角" },
  front: { en: "front view", zh: "正面視角" },
  right: { en: "right side view", zh: "右側視角" },
};

export function SmileTransformations() {
  const { t, lang } = useT();

  return (
    <section className="px-6 lg:px-10 pb-24 lg:pb-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] mb-12 lg:mb-16 text-balance">
          {t("Smile Transformations", "笑容蛻變")}
        </h2>

        <div className="space-y-16 lg:space-y-24">
          {CASES.map((c) => {
            const caseTitle = lang === "zh" ? c.titleZh : c.title;
            return (
              <article key={c.slug}>
                <h3 className="font-serif text-2xl md:text-3xl mb-6 lg:mb-8">
                  {caseTitle}
                </h3>
                <div className="grid gap-6 lg:grid-cols-3 lg:gap-6">
                  {VIEWS.map((view) => {
                    const vl =
                      lang === "zh"
                        ? VIEW_LABEL[view].zh
                        : VIEW_LABEL[view].en;
                    return (
                      <BeforeAfterComparison
                        key={view}
                        initialSrc={img(c.slug, `${view}-initial`)}
                        resultSrc={img(c.slug, `${view}-result`)}
                        initialAlt={t(
                          `${caseTitle}, ${vl}, first image`,
                          `${caseTitle}，${vl}，第一張影像`,
                        )}
                        resultAlt={t(
                          `${caseTitle}, ${vl}, second image`,
                          `${caseTitle}，${vl}，第二張影像`,
                        )}
                        ariaLabel={t(
                          `${caseTitle}, ${vl} image comparison`,
                          `${caseTitle}，${vl} 影像比較`,
                        )}
                      />
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
