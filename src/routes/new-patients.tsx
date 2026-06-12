import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site-data";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/new-patients")({
  head: () => ({
    meta: [
      { title: "New Patients — Tsai Orthodontics" },
      {
        name: "description",
        content:
          "What to expect at your first visit: complimentary consultation, downloadable intake forms, insurance and billing information, and flexible in-house financing.",
      },
      { property: "og:title", content: "New Patients — Tsai Orthodontics" },
      {
        property: "og:description",
        content:
          "An unhurried, transparent first visit — with downloadable forms, insurance support, and clear financing.",
      },
      { property: "og:url", content: "/new-patients" },
    ],
    links: [{ rel: "canonical", href: "/new-patients" }],
  }),
  component: NewPatients,
});

function NewPatients() {
  const { t } = useT();

  const STEPS = [
    {
      n: "01",
      title: t("Consultation", "諮詢"),
      body: t(
        "A relaxed first conversation with Dr. Tsai. We listen carefully, take a careful look, and answer every question. There is no fee, and no pressure to commit.",
        "與 Dr. Tsai 進行第一次輕鬆的對話。我們會仔細聆聽、認真檢查並回答您的每一個問題。完全免費，也沒有任何壓力。",
      ),
    },
    {
      n: "02",
      title: t("Digital Records", "數位資料採集"),
      body: t(
        "If treatment seems likely, we capture digital scans, photographs, and x-rays in a single visit. No goopy impressions, no rush.",
        "若可能需要進行矯正，我們會在同一次看診中完成口腔數位掃描、照片與 X 光檢查，不需要傳統的印模、也不會匆促。",
      ),
    },
    {
      n: "03",
      title: t("Personalized Plan", "個人化療程規劃"),
      body: t(
        "Dr. Tsai designs your plan personally. We walk you through it together — what we'll do, why, how long, and what it will cost.",
        "Dr. Tsai 會親自為您設計治療計畫，並與您一同說明：將進行哪些治療、為什麼、預計時程，以及費用。",
      ),
    },
    {
      n: "04",
      title: t("Begin Treatment", "開始矯正"),
      body: t(
        "When you're ready, we begin. From here, we are partners — and we are here for the whole journey.",
        "當您準備好時，我們便開始療程。在這段過程中，我們是您的長期夥伴，會陪伴您走完整段矯正旅程。",
      ),
    },
  ];

  const FORMS = [
    {
      title: t("New Patient Intake Form", "新病患資料表"),
      body: t(
        "Medical and dental history, contact details, and consent. Please complete before your first visit.",
        "包含病史、牙科病歷、聯絡資訊與同意書。請於初診前填寫完成。",
      ),
      href: "#",
    },
    {
      title: t("Child Patient Form", "兒童病患資料表"),
      body: t(
        "For patients under 18. Includes guardian information and school schedule preferences.",
        "適用於 18 歲以下病患。包含監護人資料與學校作息偏好。",
      ),
      href: "#",
    },
    {
      title: t("Insurance Information Form", "保險資料表"),
      body: t(
        "Your plan details and policyholder information, so we can submit claims on your behalf.",
        "請提供保單內容與投保人資訊，以利我們協助代為申報理賠。",
      ),
      href: "#",
    },
  ];

  const INSURANCE_POINTS = [
    t(
      "We accept most major Canadian dental insurance plans.",
      "我們配合加拿大多數的主流牙科保險。",
    ),
    t(
      "Direct billing wherever your plan allows.",
      "在保險方案允許的情況下，可協助直接申報。",
    ),
    t(
      "Pre-treatment estimates submitted to your insurer for full transparency.",
      "可在治療前向保險公司送出預估申請，讓費用更透明。",
    ),
    t(
      "Clear, written breakdown of what your plan covers — and what it doesn't — before treatment begins.",
      "在開始治療前，提供書面、清楚的給付與自費明細。",
    ),
  ];

  const FINANCING_POINTS = [
    t(
      "Interest-free, in-house monthly payment plans.",
      "診所內部零利率的月付方案。",
    ),
    t(
      "Flexible down payment options to suit your budget.",
      "彈性的頭期金安排，配合您的預算。",
    ),
    t(
      "No third-party financing or credit checks required.",
      "不需要透過第三方融資，也不需信用調查。",
    ),
    t(
      "All fees disclosed in writing before you commit to anything.",
      "所有費用在您同意治療前，皆會以書面清楚揭露。",
    ),
  ];

  return (
    <>
      <PageHero
        eyebrow={t("New Patients", "初診須知")}
        title={t(
          <>
            A first visit that <span className="italic font-normal">actually feels like a conversation.</span>
          </>,
          <>
            真正像是<span className="italic font-normal">一次對話的初診體驗。</span>
          </>,
        )}
        intro={t(
          "From the moment you walk in, our goal is the same: make sure you leave with answers, not pressure. Here's what to expect.",
          "從您踏進診所的那一刻起，我們的目標都一樣：讓您帶著答案離開，而不是壓力。以下是您可以期待的流程。",
        )}
      />

      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10 rounded-3xl overflow-hidden">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-background p-8 lg:p-10">
              <div className="font-display text-5xl text-primary mb-6">{s.n}</div>
              <h3 className="font-display text-2xl mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="forms" className="px-6 lg:px-10 pb-24 lg:pb-32 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">
            {t("Patient Forms", "病患表單")}
          </div>
          <h2 className="font-display text-4xl md:text-5xl mb-12 max-w-2xl text-balance leading-tight">
            {t("Download what you need ahead of your visit.", "在看診前先下載您需要的表單。")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FORMS.map((f) => (
              <div
                key={f.title}
                className="bg-background border border-foreground/10 rounded-3xl p-8 hover:border-primary transition-colors flex flex-col"
              >
                <Download className="size-6 text-primary mb-6" />
                <h3 className="font-display text-xl mb-3 leading-snug">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-8">{f.body}</p>
                <a
                  href={f.href}
                  download
                  className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-foreground transition-colors"
                >
                  <Download className="size-4" />
                  {t("Download PDF", "下載 PDF")}
                </a>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-8 max-w-2xl">
            {t(
              "Prefer to complete forms in the office? That's fine too — please arrive 15 minutes before your appointment.",
              "想在診所現場填寫表單也沒問題，請提前 15 分鐘抵達。",
            )}
          </p>
        </div>
      </section>

      <section id="insurance" className="px-6 lg:px-10 pb-24 lg:pb-32 scroll-mt-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 rounded-3xl overflow-hidden">
          <div className="bg-background p-10 lg:p-12">
            <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-4">
              {t("Insurance & Billing", "保險與理賠")}
            </div>
            <h3 className="font-display text-3xl mb-6 leading-tight">
              {t("We handle the paperwork.", "繁瑣的文件，由我們協助處理。")}
            </h3>
            <ul className="space-y-3">
              {INSURANCE_POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-foreground/85 leading-relaxed">
                  <span className="size-1.5 mt-2.5 rounded-full bg-primary flex-none" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-background p-10 lg:p-12">
            <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-4">
              {t("Flexible Financing", "彈性付款")}
            </div>
            <h3 className="font-display text-3xl mb-6 leading-tight">
              {t("Payment plans that fit your life.", "符合您生活步調的付款方案。")}
            </h3>
            <ul className="space-y-3">
              {FINANCING_POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-foreground/85 leading-relaxed">
                  <span className="size-1.5 mt-2.5 rounded-full bg-primary flex-none" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto bg-secondary/40 rounded-3xl p-10 lg:p-14 grid md:grid-cols-3 gap-10">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
              {t("Length", "時間長度")}
            </div>
            <p className="font-display text-2xl leading-snug">
              {t("About 45 minutes for your first visit.", "第一次看診約需 45 分鐘。")}
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
              {t("Bring", "請攜帶")}
            </div>
            <p className="font-display text-2xl leading-snug">
              {t("Any prior records or x-rays you have.", "若有先前的病歷或 X 光資料，請一併帶來。")}
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
              {t("Leave with", "離開時")}
            </div>
            <p className="font-display text-2xl leading-snug">
              {t(
                "A clear sense of next steps — and a coffee.",
                "對下一步有清楚的方向，順手帶杯咖啡離開。",
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-10 text-balance">
            {t("Ready when you are.", "當您準備好，我們就在這裡。")}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
            >
              {t("Request your consultation", "預約諮詢")} <ArrowRight className="size-4" />
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-foreground/15 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
            >
              {t("Call", "電話聯絡")} {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
