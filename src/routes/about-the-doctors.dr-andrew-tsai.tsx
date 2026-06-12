import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import drTsai from "@/assets/dr-andrew-tsai.webp.asset.json";
import { useT } from "@/lib/i18n";

interface EducationItem {
  year: string;
  yearZh: string;
  title: string;
  titleZh: string;
  body: string;
  bodyZh: string;
}

const EDUCATION: EducationItem[] = [
  {
    year: "Penn",
    yearZh: "Penn",
    title: "Seven-Year Bio-Dental Program",
    titleZh: "Seven-Year Bio-Dental Program",
    body: "University of Pennsylvania — undergraduate degree and Doctor of Dental Medicine.",
    bodyZh: "賓州大學七年制學程——完成大學學位與牙醫博士（DMD）。",
  },
  {
    year: "DMD",
    yearZh: "DMD",
    title: "Doctor of Dental Medicine",
    titleZh: "牙醫博士（DMD）",
    body: "Conferred by the University of Pennsylvania School of Dental Medicine.",
    bodyZh: "由賓州大學牙醫學院授予。",
  },
  {
    year: "Ortho",
    yearZh: "Ortho",
    title: "Specialty Training in Orthodontics",
    titleZh: "齒顎矯正專科訓練",
    body: "University of the Pacific, Arthur A. Dugoni School of Dentistry in San Francisco — one of the leading programs in the world for clear aligner treatment.",
    bodyZh: "舊金山 University of the Pacific，Arthur A. Dugoni 牙醫學院——隱形牙套治療領域全球領先的訓練機構之一。",
  },
  {
    year: "Cert.",
    yearZh: "Cert.",
    title: "Certificate in Orthodontics",
    titleZh: "齒顎矯正專科證書",
    body: "Awarded on completion of full-time specialty training.",
    bodyZh: "於完成全職專科訓練後授予。",
  },
  {
    year: "MSD",
    yearZh: "MSD",
    title: "Master of Science in Dentistry",
    titleZh: "牙科科學碩士（MSD）",
    body: "Master's thesis on the stability of clear aligner treatment for mixed dentition children — published in the American Journal of Orthodontics and Dentofacial Orthopedics.",
    bodyZh: "碩士論文研究混合齒列期兒童使用隱形牙套治療的穩定性，並發表於 American Journal of Orthodontics and Dentofacial Orthopedics。",
  },
];

const CREDENTIALS: { en: string; zh: string }[] = [
  {
    en: "Certified Specialist in Orthodontics and Dentofacial Orthopedics",
    zh: "齒顎矯正暨顏面齒槽骨矯正認證專科醫師",
  },
  {
    en: "Fellow of the Royal College of Dentists of Canada",
    zh: "加拿大皇家牙醫學會院士（Fellow, RCDC）",
  },
  {
    en: "Diplomate of the American Board of Orthodontics",
    zh: "American Board of Orthodontics 認證專科醫師（Diplomate）",
  },
];

const CLINICAL_FOCUS: { en: string; zh: string }[] = [
  { en: "Clear aligners", zh: "隱形牙套" },
  { en: "Traditional braces", zh: "傳統 Braces" },
  { en: "Early interceptive orthodontic treatment", zh: "兒童早期介入矯正" },
  { en: "Care for children, teens, and adults", zh: "兒童、青少年與成人矯正照護" },
];

export const Route = createFileRoute("/about-the-doctors/dr-andrew-tsai")({
  head: () => ({
    meta: [
      { title: "Dr. Andrew Tsai | Tsai Orthodontics" },
      {
        name: "description",
        content:
          "Dr. Andrew Tsai is a Certified Specialist in Orthodontics and Dentofacial Orthopedics in Vancouver, with advanced training from the University of Pennsylvania and the University of the Pacific.",
      },
      { property: "og:title", content: "Dr. Andrew Tsai | Tsai Orthodontics" },
      {
        property: "og:description",
        content:
          "Diplomate of the American Board of Orthodontics. Fellow of the Royal College of Dentists of Canada.",
      },
      { property: "og:url", content: "/about-the-doctors/dr-andrew-tsai" },
    ],
    links: [{ rel: "canonical", href: "/about-the-doctors/dr-andrew-tsai" }],
  }),
  component: DrAndrewPage,
});

function DrAndrewPage() {
  const { t, lang } = useT();
  return (
    <>
      <PageHero
        eyebrow="Dr. Andrew Tsai"
        title={t(
          <>
            Certified Specialist in <span className="italic font-normal">Orthodontics and Dentofacial Orthopedics.</span>
          </>,
          <>
            齒顎矯正暨顏面齒槽骨<span className="italic font-normal">矯正認證專科醫師。</span>
          </>,
        )}
        intro={t(
          "Born in Taipei, Taiwan and raised in Vancouver, BC — Dr. Andrew grew up inspired by his parents' love for dentistry and the impact it had on helping others.",
          "Dr. Andrew 出生於台灣台北，在加拿大 BC 省溫哥華長大。從小受到父母對牙醫工作的熱忱與助人初衷所啟發，逐步踏上專科醫師之路。",
        )}
      />

      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={drTsai.url}
                alt="Dr. Andrew Tsai"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              {t(
                "Dr. Andrew Tsai is a Certified Specialist in Orthodontics and Dentofacial Orthopedics. He has completed the highest levels of certification within the profession and has the rare distinction of being both a Fellow of the Royal College of Dentists of Canada and a Diplomate of the American Board of Orthodontics.",
                "Dr. Andrew Tsai 為齒顎矯正暨顏面齒槽骨矯正認證專科醫師，已完成業界最高層級的認證，並少見地同時取得 Fellow of the Royal College of Dentists of Canada 與 Diplomate of the American Board of Orthodontics 兩項殊榮。",
              )}
            </p>
            <p>
              {t(
                "He is passionate about helping patients of all ages achieve healthy, beautiful smiles that boost their confidence and improve their overall well-being. He offers the latest treatment options including clear aligners, traditional braces, and early interceptive orthodontic treatment.",
                "他熱衷於協助各年齡層的病患，建立健康又自然好看的笑容，進而提升自信與整體生活品質。療程選項涵蓋 Invisalign 隱形牙套、傳統 Braces，以及兒童早期介入矯正。",
              )}
            </p>
            <p className="text-foreground/70">
              {t(
                "Outside the office, Dr. Andrew enjoys exploring hiking trails, discovering new restaurants, and working on his golf game.",
                "工作之餘，Dr. Andrew 喜歡走訪不同的健行步道、嘗試新餐廳，以及精進自己的高爾夫球技。",
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">
            {t("Education & Training", "學歷與訓練")}
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-16 max-w-2xl text-balance">
            {t(
              "A path defined by depth, not shortcuts.",
              "一條以扎實為基礎、不走捷徑的學習之路。",
            )}
          </h2>
          <ol className="relative border-l border-foreground/15 ml-3 space-y-12">
            {EDUCATION.map((e) => (
              <li key={e.title} className="pl-8">
                <span className="absolute -left-[7px] mt-2 size-3.5 rounded-full bg-primary border-4 border-secondary" />
                <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-2">
                  {lang === "zh" ? e.yearZh : e.year}
                </div>
                <h3 className="font-display text-2xl mb-2">{lang === "zh" ? e.titleZh : e.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {lang === "zh" ? e.bodyZh : e.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">
              {t("Specialist Credentials", "專科認證")}
            </div>
            <h3 className="font-display text-3xl md:text-4xl mb-8 leading-tight">
              {t(
                "The highest levels of certification in the profession.",
                "業界最高層級的專科認證。",
              )}
            </h3>
            <ul className="space-y-4">
              {CREDENTIALS.map((c) => (
                <li key={c.en} className="flex gap-4 border-t border-foreground/10 pt-4 text-foreground/85">
                  <span className="text-primary font-mono text-xs mt-1">◆</span>
                  <span>{t(c.en, c.zh)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">
              {t("Clinical Focus", "臨床專長")}
            </div>
            <h3 className="font-display text-3xl md:text-4xl mb-8 leading-tight">
              {t("Care designed around each patient's needs.", "依每位病患需求設計的治療。")}
            </h3>
            <ul className="space-y-4">
              {CLINICAL_FOCUS.map((c) => (
                <li key={c.en} className="flex gap-4 border-t border-foreground/10 pt-4 text-foreground/85">
                  <span className="text-primary font-mono text-xs mt-1">◆</span>
                  <span>{t(c.en, c.zh)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-foreground text-background px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">
            {t("Patient Philosophy", "看診理念")}
          </div>
          <p className="font-display text-3xl md:text-4xl leading-snug text-balance">
            {t(
              "“Dr. Andrew helps patients understand their options clearly and feel comfortable with the treatment plan before moving forward.”",
              "「Dr. Andrew 會協助病患清楚了解所有選項，並在開始治療之前，對整個療程計畫感到安心。」",
            )}
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-10 text-center">
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
