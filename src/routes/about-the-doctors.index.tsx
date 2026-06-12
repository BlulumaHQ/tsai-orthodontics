import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import drAndrew from "@/assets/dr-andrew-tsai.webp.asset.json";
import drMarjorie from "@/assets/dr-marjorie-tsai.webp.asset.json";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/about-the-doctors/")({
  head: () => ({
    meta: [
      { title: "About the Doctors | Tsai Orthodontics" },
      {
        name: "description",
        content:
          "Meet the orthodontists at Tsai Orthodontics in Vancouver. Specialist care shaped by advanced training, precision, and personal attention.",
      },
      { property: "og:title", content: "About the Doctors | Tsai Orthodontics" },
      { property: "og:description", content: "Meet Dr. Andrew Tsai and Dr. Marjorie Tsai." },
      { property: "og:url", content: "/about-the-doctors" },
    ],
    links: [{ rel: "canonical", href: "/about-the-doctors" }],
  }),
  component: AboutTheDoctorsPage,
});

function AboutTheDoctorsPage() {
  const { t } = useT();
  return (
    <>
      <PageHero
        eyebrow={t("About the Doctors", "認識醫師")}
        title={t(
          "Specialist orthodontic care, shaped by training and personal attention.",
          "齒顎矯正專科照護，由完整訓練與細膩關懷一同打造。",
        )}
        intro={t(
          "Tsai Orthodontics is led by orthodontists who have completed the highest levels of training in the profession — and who believe great care begins with a real conversation.",
          "Tsai Orthodontics 由完成業界最高層級訓練的齒顎矯正專科醫師主持——我們相信，真正好的照護從一次真誠的對話開始。",
        )}
      />

      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-14">
          <article className="group">
            <Link to="/about-the-doctors/dr-andrew-tsai" className="block">
              <div className="overflow-hidden rounded-3xl mb-6 bg-foreground/5">
                <img
                  src={drAndrew.url}
                  alt="Dr. Andrew Tsai"
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-2">
                {t("Certified Specialist", "認證專科醫師")}
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-3">Dr. Andrew Tsai</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {t(
                  "Trained through the Seven-Year Bio-Dental Program at the University of Pennsylvania and the orthodontic specialty program at the University of the Pacific. Diplomate of the American Board of Orthodontics, Fellow of the Royal College of Dentists of Canada.",
                  "畢業於賓州大學七年制 Bio-Dental Program，並完成 University of the Pacific 齒顎矯正專科訓練。為 American Board of Orthodontics 認證專科醫師（Diplomate），以及 Royal College of Dentists of Canada 院士（Fellow）。",
                )}
              </p>
              <span className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] border-b border-primary pb-1">
                {t("Meet Dr. Andrew Tsai", "認識 Dr. Andrew Tsai")} <ArrowRight className="size-4" />
              </span>
            </Link>
          </article>

          <article className="group">
            <Link to="/about-the-doctors/dr-marjorie-tsai" className="block">
              <div className="overflow-hidden rounded-3xl mb-6 bg-secondary/50 aspect-[4/5]">
                <img
                  src={drMarjorie.url}
                  alt="Dr. Marjorie Tsai"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-2">
                {t("Biography Coming Soon", "醫師介紹即將上線")}
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-3">Dr. Marjorie Tsai</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {t(
                  "Dr. Marjorie Tsai's full biography will be added soon. Patients can expect the same thoughtful, family-centered approach that defines the Tsai Orthodontics experience.",
                  "Dr. Marjorie Tsai 的完整介紹將於近期上線。您可以期待與 Tsai Orthodontics 一貫相同的細膩、以家庭為中心的看診體驗。",
                )}
              </p>
              <span className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] border-b border-primary pb-1">
                {t("Learn More", "了解更多")} <ArrowRight className="size-4" />
              </span>
            </Link>
          </article>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-secondary/30 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">
            {t("Our Philosophy", "我們的理念")}
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
            {t("Treatment should be clear before it begins.", "治療在開始之前，就應該是清楚的。")}
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            {t(
              "Specialist-level orthodontic planning, careful explanation, and warm communication shape every visit. Families leave appointments better informed, more confident, and with less anxiety than when they arrived.",
              "專科層級的矯正規劃、仔細的說明與溫暖的溝通，貫穿每一次看診。家屬離開時，會比進門時更了解狀況、更有信心，也更安心。",
            )}
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 lg:py-32 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
        >
          {t("Book a Consultation", "預約諮詢")}
        </Link>
      </section>
    </>
  );
}
