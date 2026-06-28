import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageHero } from "@/components/site/PageHero";
import drAndrew from "@/assets/dr-andrew-tsai.webp.asset.json";
import drMarjorie from "@/assets/dr-marjorie-tsai.webp.asset.json";
import brandLogo from "@/assets/tsai-logo-main.svg.asset.json";
import { SITE } from "@/lib/site-data";
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

const ASSOCIATIONS: string[] = [
  "Canadian Association of Orthodontists (CAO)",
  "British Columbia Society of Orthodontists (BCSO)",
  "American Association of Orthodontists (AAO)",
  "Pacific Coast Society of Orthodontics (PCSO)",
];

export const Route = createFileRoute("/about-the-doctors/")({
  head: () => ({
    meta: [
      { title: "About the Doctors | Tsai Orthodontics" },
      {
        name: "description",
        content:
          "Meet Dr. Andrew Tsai and Dr. Marjorie Tsai at Tsai Orthodontics in Vancouver. Specialist orthodontic care shaped by advanced training, precision, and personal attention.",
      },
      { property: "og:title", content: "About the Doctors | Tsai Orthodontics" },
      { property: "og:description", content: "Meet Dr. Andrew Tsai, DMD, MSD, FRCD(C) and Dr. Marjorie Tsai, DDS, M.Ortho." },
      { property: "og:url", content: "/about-the-doctors" },
    ],
    links: [{ rel: "canonical", href: "/about-the-doctors" }],
  }),
  component: AboutTheDoctorsPage,
});

function AboutTheDoctorsPage() {
  const { t, lang } = useT();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }, []);

  // Larger, more prominent section labels (per client) — used in place of the
  // small uppercase eyebrow + decorative h3 sub-headlines.
  const sectionLabelCls =
    "font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-10 text-balance";

  return (
    <>
      <PageHero
        eyebrow={t("About the Doctors", "認識醫師")}
        title={t(
          "Specialist orthodontic care, shaped by training and personal attention.",
          "齒顎矯正專科照護，由完整訓練與細膩關懷一同打造。",
        )}
        intro={t(
          "Tsai Orthodontics is led by Dr. Andrew Tsai, who has completed the highest levels of training in the profession and believes great care begins with a real conversation. From education to guidance to execution, Dr. Andrew Tsai personally oversees your customized treatment from start to finish.",
          "Tsai Orthodontics 由 Dr. Andrew Tsai 主持，他已完成業界最高層級的專科訓練，並相信真正好的照護始於一次真誠的對話。從衛教、引導到執行，您的個人化療程都由 Dr. Andrew Tsai 親自負責，自始至終。",
        )}
      />

      {/* ============ DR. ANDREW TSAI ============ */}
      <section id="dr-andrew-tsai" className="px-6 lg:px-10 pt-8 pb-20 lg:pb-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={drAndrew.url}
                alt="Dr. Andrew Tsai"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-4">
              {t("Meet the Specialist", "認識專科醫師")}
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] mb-2 text-balance">
              Dr. Andrew Tsai
            </h2>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-6">
              DMD, MSD, FRCD(C)
            </div>
            <p className="text-sm md:text-base text-foreground/75 mb-8 max-w-xl">
              {t(
                "Certified Specialist in Orthodontics and Dentofacial Orthopedics",
                "齒顎矯正暨顏面齒槽骨矯正認證專科醫師",
              )}
            </p>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/85">
              <p>
                {t(
                  "Born in Taipei, Taiwan and raised in beautiful Vancouver, BC, Dr. Andrew Tsai grew up inspired by his parents' love for dentistry and the impact it had on helping others. Deciding to pursue a career in dentistry of his own, he graduated from the prestigious Seven-Year Bio-Dental Program at the University of Pennsylvania, earning both his undergraduate and Doctor of Dental Medicine degrees. Dr. Andrew then pursued advanced specialty training in Orthodontics at the University of the Pacific, Arthur A. Dugoni School of Dentistry in San Francisco, one of the leading programs in the world for clear aligner treatment. There, he received his Certificate in Orthodontics and his Master of Science in Dentistry. His Master's thesis on the stability of clear aligner treatment for mixed dentition children was recently published in the premier journal in orthodontics ",
                  "Dr. Andrew Tsai 出生於台灣台北，在美麗的卑詩省溫哥華長大。父母對牙醫工作的熱愛與助人的影響力，自小啟發了他。下定決心走上牙醫之路後，他畢業於賓州大學享負盛名的七年制 Bio-Dental Program，同時取得學士與牙醫博士（DMD）學位。隨後，他於舊金山 University of the Pacific, Arthur A. Dugoni School of Dentistry 接受齒顎矯正專科進階訓練——該校是全球清晰隱形牙套治療最頂尖的學程之一——並取得齒顎矯正專科證書與牙醫碩士（MSD）學位。他以「混合齒列兒童清晰隱形牙套治療之穩定度」為題的碩士論文，近期發表於齒顎矯正領域的頂尖期刊 ",
                )}
                <a
                  href="https://www.ajodo.org/article/S0889-5406(26)00068-5/fulltext"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition"
                >
                  {t("(AJODO)", "AJODO")}
                </a>
                {t(".", "。")}
              </p>
              <p className="text-sm">
                <a
                  href="/research/tsai-ajodo-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition"
                >
                  {t("Read the published study (PDF)", "閱讀已發表的研究全文（PDF）")}
                </a>
              </p>
              <p>
                {t(
                  "Dr. Andrew Tsai is a Certified Specialist in Orthodontics and Dentofacial Orthopedics, and he is committed to providing excellent orthodontic care to his patients. Having completed the highest levels of certification within the profession, Dr. Andrew Tsai has the rare distinction of being both a Fellow of the Royal College of Dentists of Canada and a Diplomate of the American Board of Orthodontics. He is passionate about helping patients of all ages achieve healthy, beautiful smiles that boost their confidence and improve their overall function and well-being. He offers the latest treatment options including clear aligners, traditional braces, and early interceptive orthodontic treatment.",
                  "Dr. Andrew Tsai 是齒顎矯正暨顏面齒槽骨矯正的認證專科醫師，致力於為病患提供卓越的矯正照護。他已完成業界最高層級的認證，同時身兼 Royal College of Dentists of Canada 院士（Fellow）與 American Board of Orthodontics 認證專科醫師（Diplomate）——這是相當難得的雙重肯定。他熱衷於協助各年齡層的病患擁有健康、美麗的笑容，不僅提升自信，也改善整體口腔功能與健康。他提供最新的治療選項，包括清晰隱形牙套、傳統矯正器，以及早期阻斷性矯正治療。",
                )}
              </p>
              <p className="text-foreground/70">
                {t(
                  "Outside the office, you'll find Dr. Andrew exploring hiking trails, discovering new restaurants, or working on his golf game. He looks forward to welcoming you to the practice and designing and crafting the smile you've always wanted.",
                  "在診間之外，你常會看到 Dr. Andrew 走訪健行步道、探索新餐廳，或精進他的高爾夫球技。他期待歡迎您來到診所，為您設計並打造您一直嚮往的笑容。",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education timeline — large prominent section label, decorative subheadline removed */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h3 className={sectionLabelCls}>
            {t("Education & Training", "學歷與訓練")}
          </h3>
          <ol className="relative border-l border-foreground/15 ml-3 space-y-12">
            {EDUCATION.map((e) => (
              <li key={e.title} className="pl-8">
                <span className="absolute -left-[7px] mt-2 size-3.5 rounded-full bg-primary border-4 border-secondary" />
                <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-2">
                  {lang === "zh" ? e.yearZh : e.year}
                </div>
                <h4 className="font-serif text-2xl mb-2">{lang === "zh" ? e.titleZh : e.title}</h4>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {lang === "zh" ? e.bodyZh : e.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Credentials + Clinical Focus — large prominent section labels, decorative subheadlines removed */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
          <div>
            <h3 className={sectionLabelCls}>
              {t("Specialist Credentials", "專科認證")}
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
            <h3 className={sectionLabelCls}>
              {t("Clinical Focus", "臨床專長")}
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

      {/* Professional Associations — no subheadline, list only */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h3 className={sectionLabelCls}>
            {t("Professional Associations", "專業學會")}
          </h3>
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4 max-w-4xl">
            {ASSOCIATIONS.map((a) => (
              <li key={a} className="flex gap-4 border-t border-foreground/10 pt-4 text-foreground/85">
                <span className="text-primary font-mono text-xs mt-1">◆</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Patient Philosophy */}
      <section className="py-20 lg:py-28 bg-foreground text-background px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">
            {t("Patient Philosophy", "看診理念")}
          </div>
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug text-balance">
            {t(
              "“Dr. Andrew is committed to helping patients understand their options clearly and feel comfortable with the treatment plan before moving forward.”",
              "「Dr. Andrew 致力於協助病患清楚了解所有選項，並在開始治療前，對整個療程計畫感到安心。」",
            )}
          </p>
        </div>
      </section>

      {/* ============ DR. MARJORIE TSAI ============ */}
      <section id="dr-marjorie-tsai" className="px-6 lg:px-10 py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-[1.5rem] overflow-hidden bg-secondary/40">
              <img
                src={drMarjorie.url}
                alt="Dr. Marjorie Tsai"
                width={1080}
                height={1350}
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-4">
              {t("Meet the Specialist", "認識專科醫師")}
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] mb-2 text-balance">
              Dr. Marjorie Tsai
            </h2>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-8">
              DDS, M.Ortho
            </div>
            <p className="font-serif text-xl lg:text-2xl leading-relaxed text-foreground/85 mb-8">
              {t(
                "Dr. Marjorie Tsai supports the practice with coverage and continuity of care. Every patient's treatment is planned and supervised by Dr. Andrew Tsai, ensuring one consistent clinical vision from first visit to last.",
                "Dr. Marjorie Tsai 負責診所的支援與照護的延續性。每位病患的療程皆由 Dr. Andrew Tsai 親自規劃與督導，確保從第一次到最後一次看診，都維持一致的臨床理念。",
              )}
            </p>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/85">
              <p>
                {t(
                  "Dr. Marjorie Tsai has spent her career helping people smile with confidence, and she brings that same warmth to every patient who sits in her chair. She graduated from Taipei Medical University and went on to complete three years of advanced orthodontic specialty training at the University of Hong Kong, Faculty of Dentistry. Today she's licensed to practice in three places close to her heart: Canada, Hong Kong, and Taiwan.",
                  "Dr. Marjorie Tsai 的職涯始終在幫助人們自信地展露笑容，她也把同樣的溫暖帶給每一位坐上診療椅的病患。她畢業於臺北醫學大學，並於香港大學牙醫學院完成三年的進階齒顎矯正專科訓練。如今她在三個對她意義深遠的地方擁有執業資格：加拿大、香港與台灣。",
                )}
              </p>
              <p>
                {t(
                  "What patients notice first about Dr. Tsai is how genuinely she listens. She takes the time to understand what each person hopes for before recommending any treatment, and her years of experience — from simple alignment to complex bite corrections — mean families can relax knowing they're in caring, capable hands.",
                  "病患對 Dr. Tsai 的第一印象，往往是她真誠的傾聽。在建議任何療程之前，她都會花時間了解每個人真正的期待；而她從單純排列到複雜咬合矯正的多年經驗，也讓家屬能安心地把自己交到一雙細心又可靠的手中。",
                )}
              </p>
              <p className="text-foreground/70">
                {t(
                  "When she's not in the practice, you'll likely find Dr. Tsai lacing up her running shoes. She's a passionate marathoner chasing all eight majors one finish line at a time, and she competes in triathlons with her daughters. The rest of her time is happily spent with her husband, their two daughters, and the family's beloved shiba inu, Rocky.",
                  "不在診所的時候，多半能看到 Dr. Tsai 綁起跑鞋的身影。她是熱情的馬拉松跑者，正一場一場地朝六大馬拉松（八大賽事）邁進，也和女兒們一起參加鐵人三項。其餘的時間，她最喜歡和先生、兩個女兒，以及家中最寶貝的柴犬 Rocky 一起度過。",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-20 lg:py-28 text-center">
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
