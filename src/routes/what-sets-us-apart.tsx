import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { useT } from "@/lib/i18n";
import textureBelieve from "@/assets/clinic-reception.webp.asset.json";

interface Belief {
  label: string;
  labelZh: string;
  headline: string;
  headlineZh: string;
  body: string;
  bodyZh: string;
}

const BELIEFS: Belief[] = [
  {
    label: "Craft",
    labelZh: "Craft",
    headline: "Careful planning, specialist training.",
    headlineZh: "細膩規劃，專科訓練。",
    body: "We believe careful planning and specialist training create better treatment experiences. Every plan is designed personally by Dr. Tsai and built around one set of teeth and one life — never a template.",
    bodyZh: "我們相信，細膩的規劃與專科訓練，能帶來更好的治療體驗。每一份計畫皆由 Dr. Tsai 親自設計，依照單一病患的牙齒與生活方式量身打造，絕非套用模板。",
  },
  {
    label: "Care",
    labelZh: "Care",
    headline: "Heard, supported, comfortable.",
    headlineZh: "被傾聽、被支持、感到安心。",
    body: "We believe patients should feel heard, supported, and comfortable throughout treatment. We take the time to listen — to children, teens, adults, and the parents who bring them in.",
    bodyZh: "我們相信，病患在整個療程中都應該感受到被傾聽、被支持，並且安心自在。我們願意花時間傾聽，無論是孩子、青少年、成人，以及陪同前來的家屬。",
  },
  {
    label: "Clarity",
    labelZh: "Clarity",
    headline: "Straightforward answers.",
    headlineZh: "清楚直接的回答。",
    body: "We believe families deserve straightforward answers and a clear understanding of their options. We explain what we see, what we recommend, and why — in plain language, before any treatment decision is made.",
    bodyZh: "我們相信，家屬值得獲得清楚、直接的回答，並充分理解所有可行的選擇。我們會用淺白的語言，在做任何治療決定前先說明我們看到的狀況、建議的方式以及背後的原因。",
  },
  {
    label: "Convenience",
    labelZh: "Convenience",
    headline: "Care that fits everyday life.",
    headlineZh: "貼近日常生活的看診體驗。",
    body: "We believe orthodontic care should fit naturally into everyday life. Flexible appointments, family scheduling for siblings, and bilingual support in English and Mandarin, so every visit feels effortless.",
    bodyZh: "我們相信，齒顎矯正照護應該自然融入每天的生活節奏。彈性的看診時段、可一同安排的家庭預約，並提供英文與中文雙語服務，讓每一次回診都更從容。",
  },
];

export const Route = createFileRoute("/what-sets-us-apart")({
  head: () => ({
    meta: [
      { title: "What We Believe In — Tsai Orthodontics" },
      {
        name: "description",
        content:
          "The four beliefs that shape every plan at Tsai Orthodontics — Craft, Care, Clarity, and Convenience. Specialist-led orthodontic care for Vancouver families.",
      },
      { property: "og:title", content: "What We Believe In — Tsai Orthodontics" },
      {
        property: "og:description",
        content:
          "Craft, Care, Clarity, Convenience — the four values behind our specialist-led, family-centred orthodontic care.",
      },
      { property: "og:url", content: "/what-sets-us-apart" },
    ],
    links: [{ rel: "canonical", href: "/what-sets-us-apart" }],
  }),
  component: Page,
});

function Page() {
  const { t, lang } = useT();
  return (
    <>
      <PageHero
        textureSrc={textureBelieve.url}
        eyebrow={t("What We Believe In", "我們所相信的")}
        title={t(
          "Four beliefs that shape every plan.",
          "四項信念，貫穿每一份治療計畫。",
        )}
        intro={t(
          "We are a neighbourhood specialist practice. These are the beliefs that guide how we listen, plan, and care for the families who walk through our door.",
          "我們是一間在地的專科診所。以下這些信念，引導著我們如何傾聽、規劃，以及照顧每一位走進診所的家庭。",
        )}
      />

      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 lg:gap-8">
          {BELIEFS.map((b, i) => (
            <article
              key={b.label}
              className="bg-background border border-foreground/10 rounded-3xl p-8 lg:p-10 flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <h2 className="font-serif text-5xl md:text-6xl leading-[0.95]">
                  {lang === "zh" ? b.labelZh : b.label}
                </h2>
                <span className="text-primary text-[10px] font-mono tracking-[0.25em] mt-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="font-serif text-xl md:text-2xl leading-snug mb-4 text-foreground/90 text-balance">
                {lang === "zh" ? b.headlineZh : b.headline}
              </p>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {lang === "zh" ? b.bodyZh : b.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-3xl md:text-4xl leading-[1.15] text-balance mb-10">
            {t(
              "If these beliefs sound like the kind of care you are looking for, we would love to meet you.",
              "如果這些信念正是您所期待的看診方式，我們很期待與您見面。",
            )}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
          >
            {t("Book your consultation", "預約諮詢")}
          </Link>
        </div>
      </section>
    </>
  );
}
