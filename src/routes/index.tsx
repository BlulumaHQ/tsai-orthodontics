import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import drTsai from "@/assets/dr-andrew-tsai.webp.asset.json";
import pillarCraftAsset from "@/assets/clinic-operatory.webp.asset.json";
import pillarCareAsset from "@/assets/clinic-patient-consult.webp.asset.json";
import pillarClarityAsset from "@/assets/clinic-reception.webp.asset.json";
import pillarConvenienceAsset from "@/assets/clinic-hallway.webp.asset.json";
import clinicChairAsset from "@/assets/dental-chair-brand.jpg.asset.json";
import { SITE } from "@/lib/site-data";
import { SERVICES, localizedService } from "@/lib/services-data";
import { useT } from "@/lib/i18n";

const pillarCraft = pillarCraftAsset.url;
const pillarCare = pillarCareAsset.url;
const pillarClarity = pillarClarityAsset.url;
const pillarConvenience = pillarConvenienceAsset.url;
const clinicChairBackground = clinicChairAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tsai Orthodontics — Specialist Orthodontic Care, Vancouver" },
      {
        name: "description",
        content:
          "Specialist orthodontic care on Main Street in Vancouver. Braces, Invisalign, and unhurried family care from Dr. Tsai.",
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
      src: "/images/home/hero-001.webp",
      alt: t("Dr. Andrew Tsai at Tsai Orthodontics reception", "Dr. Andrew Tsai 於 Tsai Orthodontics 診所前台"),
      eyebrow: t("Specialist Orthodontics · Vancouver", "齒顎矯正專科 · 溫哥華"),
      title: t(
        <>
          Your smile,
          <br />
          <span className="italic font-normal">by design.</span>
        </>,
        <>
          你的笑容，
          <br />
          <span className="italic font-normal">細心設計。</span>
        </>,
      ),
      tagline: t(
        "Specialist orthodontic care in Vancouver, made to fit into your life, and delivered with craft, care and clarity.",
        "溫哥華的齒顎矯正專科照護，貼合你的生活節奏，並以工藝、關懷與清晰為本。",
      ),
      align: "center" as const,
      objectPosition: "right",
    },
    {
      src: "/images/home/hero-002.webp",
      alt: t("Dr. Andrew Tsai reviewing a clear aligner with a teen patient", "Dr. Andrew Tsai 與青少年患者一起檢視隱形牙套"),
      eyebrow: t("Care for every stage", "陪伴每一個人生階段"),
      title: t(
        <>
          Built on
          <br />
          long relationships.
        </>,
        <>
          建立在
          <br />
          長期信任之上。
        </>,
      ),
      tagline: t(
        "From a child's first visit to adult treatment — orthodontic care planned around your family, not a template.",
        "從孩子的第一次看診到成人矯正，為您的家庭量身規劃，不套用範本。",
      ),
      align: "center" as const,
      objectPosition: "top",
    },
  ];

  useEffect(() => {
    const id = window.setTimeout(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6000);
    return () => window.clearTimeout(id);
  }, [slide, HERO_SLIDES.length]);

  const PILLARS = [
    {
      n: "01",
      label: t("Craft", "Craft"),
      headline: t("Careful planning, specialist training.", "細膩規劃，專科訓練。"),
      body: t(
        "We believe careful planning and specialist training create better treatment experiences.",
        "我們相信，細膩的規劃與專科訓練，能帶來更好的治療體驗。",
      ),
      image: pillarCraft,
      alt: "Inside a Tsai Orthodontics operatory — chair, iTero scanner and clinical setup",
    },
    {
      n: "02",
      label: t("Care", "Care"),
      headline: t("Heard, supported, comfortable.", "被傾聽、被支持、感到安心。"),
      body: t(
        "We believe patients should feel heard, supported, and comfortable throughout treatment.",
        "我們相信，病患在整個療程中都應該感受到被傾聽、被支持，並且安心自在。",
      ),
      image: "/images/clinic/doctors.webp",
      alt: "Dr. Andrew Tsai and Dr. Marjorie Tsai at Tsai Orthodontics",
    },
    {
      n: "03",
      label: t("Clarity", "Clarity"),
      headline: t("Straightforward answers.", "清楚直接的回答。"),
      body: t(
        "We believe families deserve straightforward answers and a clear understanding of their options.",
        "我們相信，家屬值得獲得清楚、直接的回答，並充分理解所有可行的選擇。",
      ),
      image: "/images/clinic/patient-consult.webp",
      alt: "Dr. Andrew Tsai talking with a patient in the chair, reviewing a scan",
    },
    {
      n: "04",
      label: t("Convenience", "Convenience"),
      headline: t("Care that fits everyday life.", "貼近日常生活的看診體驗。"),
      body: t(
        "We believe orthodontic care should fit naturally into everyday life.",
        "我們相信，齒顎矯正照護應該自然融入每天的生活節奏。",
      ),
      image: pillarConvenience,
      alt: "A quiet hallway connecting the operatories at the practice",
    },
  ];

  const REVIEWS = [
    {
      name: "Sarah L.",
      text: t(
        "Dr. Tsai took the time to explain every step of the process. My daughter actually looks forward to her visits.",
        "Dr. Tsai 花了很多時間，把每一個療程步驟解釋得很清楚。我女兒甚至很期待回診。",
      ),
    },
    {
      name: "Michael W.",
      text: t(
        "The office feels welcoming and organized. I appreciated the clear communication and thoughtful approach.",
        "診所的氛圍親切、流程也很有條理。我特別欣賞他們清楚的溝通與細膩的看診方式。",
      ),
    },
    {
      name: "Emily C.",
      text: t(
        "We never felt rushed. Every question was answered, and the entire experience has been positive for our family.",
        "整個過程我們從來沒有被催促的感覺。每個問題都得到回應，對全家來說都是非常正面的體驗。",
      ),
    },
    {
      name: "Jason H.",
      text: t(
        "Highly recommend Tsai Orthodontics. The team is professional, patient, and made my Invisalign journey smooth from start to finish.",
        "非常推薦 Tsai Orthodontics。整個團隊專業又有耐心，讓我整個隱適美療程從頭到尾都很順利。",
      ),
    },
    {
      name: "Linda K.",
      text: t(
        "Being able to communicate in Mandarin made a huge difference for our family. Dr. Tsai is genuinely caring and detail-oriented.",
        "能夠用中文溝通，對我們全家來說真的差很多。Dr. Tsai 真的很細心，也非常用心。",
      ),
    },
  ];

  const activeHeroSlide = HERO_SLIDES[slide];

  return (
    <>
      {/* HERO */}
      <section className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((s, i) => {
            const isRight = s.objectPosition === "right";
            const isTop = s.objectPosition === "top";
            const positionClass = isRight
              ? "max-md:scale-[1.5] max-md:[object-position:65%_78%] md:[object-position:right]"
              : isTop
                ? "max-md:[object-position:78%_center] md:[object-position:50%_40%]"
                : "[object-position:center]";
            const video = (s as { video?: string }).video;
            const mediaClass = `absolute inset-0 h-full w-full object-cover ${positionClass}`;
            return (
              <div
                key={s.src}
                className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${i === slide ? "opacity-100" : "opacity-0"}`}
              >
              <img
                src={s.src}
                alt={String(s.alt)}
                className={mediaClass}
                width={1920}
                height={1080}
                loading={i === 0 ? "eager" : "lazy"}
              />
                {video ? (
                  <video
                    src={video}
                    poster={s.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className={mediaClass}
                  />
                ) : null}
              </div>
            );
          })}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />


        </div>

        <div
          key={activeHeroSlide.src}
          className="relative z-20 h-full flex flex-col pt-28 lg:pt-32 pb-20 lg:pb-20 xl:pb-28 px-6 lg:px-12 justify-end items-center text-center"
        >
          <div className="text-primary/90 text-[11px] uppercase tracking-[0.3em] mb-4 lg:mb-6">
            {activeHeroSlide.eyebrow}
          </div>
          <h1 className="font-display text-[44px] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-8xl text-white leading-[0.95] text-balance max-w-5xl">
            {activeHeroSlide.title}
          </h1>
          <p className="mt-6 lg:mt-8 text-white/85 text-base lg:text-lg leading-relaxed max-w-xl">
            {activeHeroSlide.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300 rounded-full text-xs font-medium uppercase tracking-[0.2em]"
            >
              {t("Book a Consultation", "預約諮詢")}
            </Link>
            <Link
              to="/about-the-doctors"
              hash="dr-andrew-tsai"
              className="px-8 py-4 border border-white/40 backdrop-blur-md text-white hover:bg-white/10 transition-all rounded-full text-xs font-medium uppercase tracking-[0.2em]"
            >
              {t("Meet Dr. Andrew Tsai", "認識 Dr. Andrew Tsai")}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 lg:left-10 lg:right-10 z-30 flex justify-between items-end text-[10px] uppercase tracking-[0.25em] text-white/60">
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
      <section className="pt-20 lg:pt-40 pb-12 lg:pb-24 px-6 lg:px-10 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-8">
            {t("What We Believe In", "我們所相信的")}
          </div>
          {lang === "zh" && (
            <div className="font-serif text-lg md:text-xl text-foreground/70 mb-6">
              蔡忠霖醫師・齒顎矯正專科
            </div>
          )}
          <p className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.15] text-balance text-foreground/90">
            {t(
              "A neighbourhood orthodontic practice, shaped by specialist training, careful listening, and the legacy and warmth of a Vancouver family business.",
              "一間在地的齒顎矯正診所，由專科訓練、用心聆聽，以及溫哥華家族診所的傳承與溫度共同形塑。",
            )}
          </p>
          <div className="mt-10 lg:mt-16 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <span className="text-muted-foreground text-[11px] uppercase tracking-[0.3em]">
              {t("Four beliefs guide every plan", "四項信念，貫穿每一份治療計畫")}
            </span>
            <span className="font-display text-foreground text-xl md:text-2xl">
              Craft · Care · Clarity · Convenience
            </span>
          </div>
        </div>
      </section>

      {/* PILLARS — mobile: stacked; desktop: compact 2×2 grid */}
      <section className="px-6 lg:px-10 pb-16 lg:pb-32">
        <div className="max-w-6xl mx-auto space-y-24 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-20">
          {PILLARS.map((p) => {
            return (
              <article
                key={p.n}
                className="grid gap-10 items-center lg:block"
              >
                <div className="lg:mb-8">
                  <div className="overflow-hidden rounded-[2px]">
                    <img
                      src={p.image}
                      alt={p.alt}
                      loading="lazy"
                      width={1600}
                      height={1200}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-6 mb-6">
                    <span className="text-primary text-[10px] font-mono tracking-[0.3em]">
                      {p.n}
                    </span>
                    <span className="h-px flex-1 bg-foreground/15" />
                  </div>
                  <h3 className="font-serif text-6xl md:text-7xl lg:text-4xl xl:text-5xl leading-[0.95] tracking-tight mb-6 whitespace-nowrap">
                    {p.label}
                  </h3>
                  <p className="font-serif text-2xl md:text-3xl lg:text-2xl leading-snug mb-4 text-balance text-foreground/90">
                    {p.headline}
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-pretty max-w-md">
                    {p.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>


      {/* DOCTOR TEASER */}
      <section className="py-16 lg:py-32 px-6 lg:px-10">
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
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-2 text-balance">
              Dr. Andrew Tsai
            </h2>
            {lang === "zh" && (
              <div className="font-serif text-lg text-foreground/70 mb-2">蔡忠霖醫師</div>
            )}
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-8">
              DMD, MSD, FRCD(C)
            </div>
            <p className="font-serif text-xl lg:text-2xl text-foreground/85 leading-relaxed mb-6 max-w-xl">
              {t(
                "Dr. Tsai believes good orthodontics is mostly good listening.",
                "Dr. Tsai 相信，好的矯正治療，大半來自願意傾聽。",
              )}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-xl">
              {t(
                "A certified specialist in orthodontics with Ivy League training, published research, and a neighbourhood practice on Main Street. Dr. Tsai built this clinic to be the kind of place his own family would choose.",
                "Dr. Tsai 為認證的齒顎矯正專科醫師，擁有常春藤名校的訓練背景與發表期刊論文的研究經驗。他在 Main Street 上打造這間在地診所，希望它是自己家人也會願意選擇的地方。",
              )}
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                t("Certified Specialist", "認證專科醫師"),
                t("Ivy League Trained", "常春藤名校訓練"),
                t("English & Mandarin", "英文與中文服務"),
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
              to="/about-the-doctors"
              hash="dr-andrew-tsai"
              className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-medium border-b border-primary pb-1 hover:gap-3 transition-all"
            >
              {t("Meet Dr. Andrew Tsai", "認識 Dr. Andrew Tsai")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="py-16 lg:py-32 bg-secondary/30 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-14 lg:mb-20">
            <div className="max-w-2xl">
              <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-4">
                {t("Our Services", "矯正服務")}
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                {t("Specialist care for every stage.", "陪伴每個人生階段的專科照護。")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mt-6 max-w-xl">
                {t(
                  "Orthodontic care for children, teens, and adults. Planned carefully, explained clearly, and tailored to each patient's needs.",
                  "為兒童、青少年與成人提供的齒顎矯正照護。規劃細膩、說明清楚，並依每位病患的需求量身打造。",
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
                    <h3 className="font-serif text-xl lg:text-2xl mb-3 leading-tight">
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



      {/*
        Google Reviews — Placeholder Google Reviews.
        Replace with real Google Business reviews before public launch.
      */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 lg:mb-14">
            <div>
              <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-3">
                {t("Google Reviews", "Google 評論")}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-balance">
                {t("What our families say.", "病患與家屬的真實回饋。")}
              </h2>
            </div>
          </div>
          <div className="-mx-6 lg:mx-0">
            <div className="flex md:grid md:grid-cols-5 gap-4 lg:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none px-6 lg:px-0 pb-4 md:pb-0 scrollbar-none">
              {REVIEWS.map((r) => (
                <article
                  key={r.name}
                  className="bg-background rounded-3xl border border-foreground/10 p-6 lg:p-6 flex flex-col shrink-0 w-[85%] sm:w-[60%] md:w-auto snap-center"
                >
                  <div className="text-primary tracking-widest text-base mb-4" aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <p className="text-foreground/85 leading-relaxed text-[14px] lg:text-[14px] flex-1">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {r.name}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section
        className="py-24 lg:py-40 px-6 lg:px-10 text-background"
        style={{
          backgroundImage: `linear-gradient(120deg, color-mix(in oklab, var(--foreground) 50%, var(--primary) 50%), color-mix(in oklab, var(--primary) 76%, var(--secondary) 24%)), url(${clinicChairBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-background/75 text-[11px] uppercase tracking-[0.3em] mb-6">
            {t("Start the conversation", "從一次對話開始")}
          </div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.0] mb-10 text-balance">
            {t(
              "Come and see if we're the right fit for your family.",
              "歡迎來認識我們，看看是否適合您的家庭。",
            )}
          </h2>
          <p className="text-background/80 text-lg max-w-2xl mx-auto mb-12">
            {t(
              "The first consultation is complimentary. Bring your questions, bring your family, and we'll take it from there.",
              "第一次諮詢完全免費。歡迎帶著您的問題與家人一同前來，後續由我們陪您一步一步討論。",
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-background text-foreground rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              {t("Book a Consultation", "預約諮詢")}
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

      {/* FIND US — MAP BAND */}
      <section className="pb-20 lg:pb-32 px-6 lg:px-10 pt-16 lg:pt-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-4">
            {t("Find Us", "診所位置")}
          </div>
          <address className="not-italic font-serif text-2xl md:text-3xl leading-snug mb-8 text-foreground/85">
            {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
          </address>
          <div className="rounded-3xl overflow-hidden border border-foreground/5">
            <iframe
              title="Tsai Orthodontics location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}`)}&output=embed`}
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
