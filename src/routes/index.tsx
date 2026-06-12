import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import drTsai from "@/assets/dr-andrew-tsai.webp.asset.json";
import hero1 from "@/assets/hero-001_1.webp.asset.json";
import hero2 from "@/assets/hero-002_1.webp.asset.json";
import pillarCraftAsset from "@/assets/craft-026.webp.asset.json";
import pillarCareAsset from "@/assets/care-004.webp.asset.json";
import pillarClarityAsset from "@/assets/clarity-007.webp.asset.json";
import pillarConvenienceAsset from "@/assets/convenience022.webp.asset.json";
import { SITE } from "@/lib/site-data";
import { SERVICES, localizedService } from "@/lib/services-data";
import { useT } from "@/lib/i18n";

const pillarCraft = pillarCraftAsset.url;
const pillarCare = pillarCareAsset.url;
const pillarClarity = pillarClarityAsset.url;
const pillarConvenience = pillarConvenienceAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tsai Orthodontics — Specialist Orthodontic Care, Vancouver" },
      {
        name: "description",
        content:
          "Boutique specialist orthodontics on Main Street in Vancouver. Braces, Invisalign, and unhurried family care from Dr. Tsai.",
      },
      { property: "og:title", content: "Tsai Orthodontics — Specialist Care, Made Personal" },
      {
        property: "og:description",
        content:
          "Specialist orthodontic care for Vancouver families. Considered, unhurried, built on long-term relationships.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, lang } = useT();
  const [slide, setSlide] = useState(0);

  const HERO_SLIDES = [
    {
      src: hero1.url,
      alt: t("A Vancouver family laughing together", "溫哥華家庭一起歡笑的瞬間"),
      eyebrow: t("Specialist Orthodontics · Vancouver", "齒顎矯正專科 · 溫哥華"),
      title: t(
        <>
          Your smile,
          <br />
          <span className="italic font-normal">by design.</span>
        </>,
        <>
          屬於你的笑容，
          <br />
          <span className="italic font-normal">細心設計。</span>
        </>,
      ),
      tagline: t(
        "Specialist orthodontic care in Vancouver, delivered with clarity, warmth, and personal attention.",
        "溫哥華齒顎矯正專科照護，以清晰、溫暖與細膩的個人關懷陪伴每一位病患。",
      ),
      align: "center" as const,
      objectPosition: "center",
    },
    {
      src: hero2.url,
      alt: t("A Vancouver family outdoors", "在戶外的溫哥華家庭"),
      eyebrow: t("Care for every stage", "陪伴每一個人生階段"),
      title: t(
        <>
          Built on
          <br />
          <span className="italic font-normal">long relationships.</span>
        </>,
        <>
          建立在
          <br />
          <span className="italic font-normal">長期信任之上。</span>
        </>,
      ),
      tagline: t(
        "From a child's first visit to adult treatment — orthodontic care planned around your family, not a template.",
        "從孩子的第一次看診到成人矯正，為您的家庭量身規劃，不套用範本。",
      ),
      align: "left" as const,
      objectPosition: "right",
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(id);
  }, [HERO_SLIDES.length]);

  const PILLARS = [
    {
      n: "01",
      label: t("Craft", "Craft"),
      headline: t("Precision matters.", "精準，至關重要。"),
      body: t(
        "Careful planning and specialist training help us build treatment plans that are tailored to the individual patient — never to a template.",
        "細膩的規劃與專科訓練，讓我們為每一位病患量身打造療程，而非套用既有模板。",
      ),
      image: pillarCraft,
      alt: "Close-up of a digital orthodontic treatment plan on a clinical monitor",
    },
    {
      n: "02",
      label: t("Care", "Care"),
      headline: t("Orthodontics is personal.", "矯正治療，是非常個人的事。"),
      body: t(
        "We take time to listen, to explain, and to help every patient feel comfortable throughout the process — children, teens, and adults alike.",
        "我們願意花時間傾聽、說明，並讓每一位病患——無論是孩子、青少年或成人——在整個療程中都感到安心。",
      ),
      image: pillarCare,
      alt: "An orthodontist gently talking with a young patient in a consult room",
    },
    {
      n: "03",
      label: t("Clarity", "Clarity"),
      headline: t("Patients deserve clear answers.", "病患值得清楚的答案。"),
      body: t(
        "We explain what we see, what we recommend, and why — using your own images, in plain language, before any treatment decision is made.",
        "在做任何治療決定之前，我們會以您自己的口腔影像，用淺白的語言說明我們看到的狀況、建議的方式以及背後的原因。",
      ),
      image: pillarClarity,
      alt: "Clinician reviewing a 3D dental scan on screen with a patient",
    },
    {
      n: "04",
      label: t("Convenience", "Convenience"),
      headline: t("Care that fits into your life.", "貼近生活節奏的看診體驗。"),
      body: t(
        "Flexible appointments, family scheduling for siblings, and bilingual care in English, Mandarin, and Cantonese — so every visit feels effortless, not interruptive.",
        "彈性的看診時段、可一同安排的家庭預約，並提供英文、國語與廣東話雙語服務，讓每一次回診都更從容、不打亂生活。",
      ),
      image: pillarConvenience,
      alt: "A warm, sunlit modern orthodontic consultation space",
    },
  ];

  const DIFFERENTIATORS: [string, string][] = [
    [
      t("Specialist-led from the first call", "從第一通電話起，皆由專科醫師主導"),
      t(
        "Every plan is designed and supervised by Dr. Tsai — never delegated to an algorithm or a junior associate.",
        "每一份矯正計畫都由 Dr. Tsai 親自設計與監督，不會交由演算法或資淺助理執行。",
      ),
    ],
    [
      t("Advanced digital workflow", "完整的數位化看診流程"),
      t(
        "Intraoral scanning, 3D treatment simulation, and a fully paperless practice — built for accuracy, not novelty.",
        "口內掃描、3D 治療模擬與無紙化作業——一切設計都以精準為目的，而非追求新奇。",
      ),
    ],
    [
      t("Personalized treatment planning", "個人化療程規劃"),
      t(
        "No templates, no aligner-mill shortcuts. Each plan is built from scratch around one set of teeth and one life.",
        "不套用模板、不走流水線。每一份治療計畫，都依照單一病患的牙齒與生活方式，從零開始量身規劃。",
      ),
    ],
    [
      t("Family-centered experience", "以家庭為中心的就診體驗"),
      t(
        "Coordinated scheduling for siblings, quiet appointment slots for nervous kids, and a calm waiting area that doesn't feel clinical.",
        "可同時安排兄弟姊妹的看診時段，為較緊張的孩子保留安靜時段，候診空間也刻意設計得不像傳統診所。",
      ),
    ],
    [
      t("Long-term relationships", "長期的醫病關係"),
      t(
        "We follow patients for years — through retention, college, and beyond. The smile you finish with is the smile we protect.",
        "我們會陪伴病患許多年——從維持器階段、上大學，到日後人生的不同階段。完成矯正時的笑容，就是我們長期守護的目標。",
      ),
    ],
    [
      t("Mandarin and English support", "提供國語與英文服務"),
      t(
        "Consultations and care delivered in both languages, so your whole family can participate fully in every conversation.",
        "諮詢與療程皆以雙語進行，讓全家人都能完整參與每一次對話。",
      ),
    ],
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-foreground">
        <div className="absolute inset-0">
          {HERO_SLIDES.map((s, i) => {
            // On mobile, slide 2 ("right" focal) crops the person off-screen.
            // Center it on mobile, then return to the designed focal point at md+.
            const isRight = s.objectPosition === "right";
            const positionClass = isRight
              ? "[object-position:50%_30%] md:[object-position:right]"
              : "[object-position:center]";
            return (
              <img
                key={s.src}
                src={s.src}
                alt={String(s.alt)}
                className={`absolute inset-0 w-full h-full object-cover ${positionClass} transition-opacity duration-[1600ms] ease-in-out ${i === slide ? "opacity-100" : "opacity-0"}`}
                width={1920}
                height={1080}
                loading={i === 0 ? "eager" : "lazy"}
              />
            );
          })}
          {HERO_SLIDES[slide].align === "left" ? (
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />
          )}
        </div>

        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.src}
            className={`relative h-full flex flex-col pb-20 lg:pb-28 px-6 lg:px-12 transition-opacity duration-[1200ms] ${
              i === slide ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"
            } ${s.align === "left" ? "items-start justify-end text-left max-w-3xl" : "items-center justify-end text-center"}`}
          >
            <div className="text-primary/90 text-[11px] uppercase tracking-[0.3em] mb-6">
              {s.eyebrow}
            </div>
            <h1 className={`font-display text-[44px] sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] text-balance ${s.align === "left" ? "" : "max-w-5xl"}`}>
              {s.title}
            </h1>
            <p className={`mt-8 text-white/85 text-base lg:text-lg leading-relaxed ${s.align === "left" ? "max-w-lg" : "max-w-xl"}`}>
              {s.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300 rounded-full text-xs font-medium uppercase tracking-[0.2em]"
              >
                {t("Book a Consultation", "預約諮詢")}
              </Link>
              <Link
                to="/about-the-doctors/dr-andrew-tsai"
                className="px-8 py-4 border border-white/40 backdrop-blur-md text-white hover:bg-white/10 transition-all rounded-full text-xs font-medium uppercase tracking-[0.2em]"
              >
                {t("Meet Dr. Andrew Tsai", "認識 Dr. Andrew Tsai")}
              </Link>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-6 right-6 lg:left-10 lg:right-10 flex justify-between items-end text-[10px] uppercase tracking-[0.25em] text-white/60 z-10">
          <span>3431 Main Street</span>
          <div className="flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-[3px] transition-all ${i === slide ? "w-10 bg-white" : "w-6 bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* INTRO STATEMENT */}
      <section className="pt-28 lg:pt-40 pb-16 lg:pb-24 px-6 lg:px-10 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-8">
            {t("Our Philosophy", "我們的理念")}
          </div>
          <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-balance">
            {t(
              "We chose to build a different kind of orthodontic practice — one shaped by careful listening, specialist training, and the warmth of a small Vancouver family business.",
              "我們選擇打造一間不一樣的矯正診所——以細心聆聽、專科訓練，以及溫哥華在地小型家族診所的溫度，作為一切的起點。",
            )}
          </p>
          <div className="mt-12 lg:mt-16 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <span className="text-muted-foreground text-[11px] uppercase tracking-[0.3em]">
              {t("Four principles guide every plan", "四項核心理念，貫穿每一份治療計畫")}
            </span>
            <span className="font-display text-foreground text-xl md:text-2xl">
              Clarity · Care · Craft · Convenience
            </span>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 lg:gap-8">
          {PILLARS.map((p) => (
            <article
              key={p.n}
              className="group bg-background border border-foreground/10 rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all flex flex-col"
            >
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  width={1280}
                  height={720}
                  className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <h3 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                    {p.label}
                  </h3>
                  <span className="text-primary text-[10px] font-mono tracking-[0.25em] mt-3">
                    {p.n}
                  </span>
                </div>
                <p className="font-display text-xl md:text-2xl leading-snug mb-4 text-balance text-foreground/90">
                  {p.headline}
                </p>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="py-24 lg:py-32 bg-secondary/30 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-14 lg:mb-20">
            <div className="max-w-2xl">
              <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-4">
                {t("Our Services", "矯正服務")}
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                {t("Specialist care for every stage.", "陪伴每個人生階段的專科照護。")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mt-6 max-w-xl">
                {t(
                  "Orthodontic care for children, teens, and adults — planned carefully, explained clearly, and tailored to each patient’s needs.",
                  "為兒童、青少年與成人提供的齒顎矯正照護——規劃細膩、說明清楚，並依每位病患的需求量身打造。",
                )}
              </p>
            </div>
            <Link
              to="/services"
              className="hidden md:inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-medium border-b border-primary pb-1 hover:gap-3 transition-all self-start md:self-end"
            >
              {t("All services", "全部矯正服務")} <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {SERVICES.map((raw, i) => {
              const s = localizedService(raw, lang);
              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group bg-background rounded-3xl overflow-hidden border border-foreground/10 hover:border-primary hover:shadow-xl transition-all flex flex-col"
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
                  <div className="p-6 lg:p-7 flex flex-col flex-1">
                    <div className="text-primary text-[10px] font-mono tracking-[0.25em] mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display text-xl lg:text-2xl mb-3 leading-tight">
                      {s.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
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

          <div className="mt-10 md:hidden">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-medium border-b border-primary pb-1"
            >
              {t("All services", "全部矯正服務")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DOCTOR TEASER */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={drTsai.url}
                alt="Dr. Tsai, specialist orthodontist"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
              {t("Meet the Specialist", "認識專科醫師")}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 text-balance">
              {t(
                "Dr. Tsai believes good orthodontics is mostly good listening.",
                "Dr. Tsai 相信，好的矯正治療，大半來自願意傾聽。",
              )}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-xl">
              {t(
                "A certified specialist in orthodontics with university training, published research, and a quiet practice on Main Street — Dr. Tsai built this clinic to be the kind of place his own family would choose.",
                "Dr. Tsai 為認證的齒顎矯正專科醫師，具備完整的大學專科訓練與發表期刊論文的研究經驗。他在 Main Street 上打造這間沉靜的診所，希望它是自己家人也會願意選擇的地方。",
              )}
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                t("Certified Specialist", "認證專科醫師"),
                t("University Trained", "大學專科訓練"),
                t("Mandarin & English", "國語與英文服務"),
              ].map((c) => (
                <span
                  key={c}
                  className="text-[11px] uppercase tracking-[0.2em] py-2 px-4 border border-foreground/10 rounded-full text-foreground/70"
                >
                  {c}
                </span>
              ))}
            </div>
            <Link
              to="/about-the-doctors/dr-andrew-tsai"
              className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-medium border-b border-primary pb-1 hover:gap-3 transition-all"
            >
              {t("Meet Dr. Andrew Tsai", "認識 Dr. Andrew Tsai")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="py-24 lg:py-32 bg-foreground text-background px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
            {t("What Sets Us Apart", "我們的不同之處")}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-16 max-w-4xl text-balance">
            {t(
              "Orthodontic care should feel thoughtful from the first conversation. At Tsai Orthodontics, every treatment plan is shaped by specialist training, clear communication, and a calmer experience for patients and families.",
              "矯正治療應該從第一次對話就讓人感到細膩用心。在 Tsai Orthodontics，每一份治療計畫都建立在專科訓練、清楚溝通，以及讓病患與家屬更安心的就診體驗之上。",
            )}
          </h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl">
            {DIFFERENTIATORS.map(([title, body]) => (
              <div key={title}>
                <h3 className="font-display text-2xl mb-3 text-background">{title}</h3>
                <p className="text-background/65 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Link
              to="/what-sets-us-apart"
              className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-medium border-b border-primary pb-1"
            >
              {t("The full comparison", "完整比較")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-24 lg:py-40 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
            {t("Start the conversation", "從一次對話開始")}
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.0] mb-10 text-balance">
            {t(
              "Come and see if we're the right fit for your family.",
              "歡迎來認識我們，看看是否適合您的家庭。",
            )}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
            {t(
              "The first consultation is complimentary. Bring your questions, bring your family, and we'll take it from there.",
              "第一次諮詢完全免費。歡迎帶著您的問題與家人一同前來，後續由我們陪您一步一步討論。",
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground transition-colors"
            >
              {t("Book a Consultation", "預約諮詢")}
            </Link>
            <a
              href={SITE.phoneHref}
              className="px-8 py-4 border border-foreground/15 rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              {t("Call", "電話聯絡")} {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
