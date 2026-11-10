import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { ReferralForm } from "@/components/site/ReferralForm";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site-data";
import { useT } from "@/lib/i18n";
import textureReferral from "@/assets/clinic-operatory.webp.asset.json";

export const Route = createFileRoute("/dentist-referral")({
  head: () => ({
    meta: [
      { title: "Dentist Referral — Tsai Orthodontics Vancouver" },
      {
        name: "description",
        content:
          "Refer a patient to Tsai Orthodontics in Vancouver. A clear, professional referral process with respectful coordination and thoughtful follow-through.",
      },
      { property: "og:title", content: "Dentist Referral — Tsai Orthodontics" },
      {
        property: "og:description",
        content:
          "A clear, professional referral process for general dentists and healthcare colleagues.",
      },
      { property: "og:url", content: "https://tsaiorthodontics.ca/dentist-referral" },
    ],
    links: [{ rel: "canonical", href: "https://tsaiorthodontics.ca/dentist-referral" }],
  }),
  component: DentistReferralPage,
});

function DentistReferralPage() {
  const { t } = useT();
  const VALUE_CARDS: [string, string][] = [
    [
      t("Specialist Coordination", "專科醫師協同照護"),
      t(
        "Direct line to Dr. Andrew Tsai for case discussions and complex referrals.",
        "可直接與 Dr. Andrew Tsai 聯繫，進行個案討論與複雜病例轉診。",
      ),
    ],
    [
      t("Transparent Communication", "透明的溝通"),
      t(
        "Treatment letters, progress updates, and post-treatment summaries shared promptly.",
        "治療計畫信件、療程進度與治療後總結，皆會即時與您分享。",
      ),
    ],
    [
      t("Collaborative Care", "跨專科協作"),
      t(
        "Restorative, periodontal, and airway colleagues welcome — we plan together.",
        "歡迎與假牙、牙周與呼吸道相關專科同行合作，一同規劃治療。",
      ),
    ],
  ];

  return (
    <>
      <PageHero
        textureSrc={textureReferral.url}
        eyebrow={t("For Referring Dentists", "提供給轉診牙醫")}
        title={t("Dentist Referral", "牙醫轉診")}
        intro={t(
          "We welcome referrals from general dentists and other healthcare professionals. Tsai Orthodontics is committed to clear communication, thoughtful follow-through, and respectful coordination with the referring office.",
          "我們歡迎一般牙醫師與其他醫療專業人員的轉診。Tsai Orthodontics 重視清楚的溝通、細膩的後續追蹤，以及與轉診診所之間互相尊重的協作。",
        )}
      />

      {/* PRINTABLE PDF — redesigned, prominent split layout */}
      <section id="download-forms" className="px-6 lg:px-10 pb-20 lg:pb-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch bg-secondary/40 border border-foreground/10 rounded-[2rem] overflow-hidden">
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">
                {t("Printable Referral Form", "紙本轉診表單")}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-5 text-balance">
                {t("Prefer a printable form?", "偏好紙本表單？")}
              </h2>
              <p className="text-foreground/75 leading-relaxed max-w-xl mb-8">
                {t(
                  "Download our referral form and complete it by hand, then fax, email, or send it with the patient.",
                  "下載我們的轉診表單，親手填寫後可傳真、電郵，或交由病患攜帶帶來。",
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/forms/referral-form.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                >
                  <Download className="size-4" aria-hidden />
                  {t("Download Printable PDF", "下載紙本 PDF")}
                </a>
                <a
                  href="#form"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-foreground/25 text-foreground text-[11px] uppercase tracking-[0.2em] font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  {t("Or refer online", "或線上轉診")}
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 bg-background border-t lg:border-t-0 lg:border-l border-foreground/10 p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center justify-center size-14 rounded-2xl bg-primary/10 text-primary mb-6">
                <Download className="size-6" aria-hidden />
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
                {t("PDF · 1 page", "PDF · 一頁")}
              </div>
              <h3 className="font-serif text-xl md:text-2xl mb-3 leading-snug">
                {t("Tsai Orthodontics Referral Form", "Tsai Orthodontics 轉診表單")}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(
                  "Standard letter-sized form. Print, fill out, and send.",
                  "標準 Letter 尺寸表單。列印、填寫後寄出即可。",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="form" className="px-6 lg:px-10 pb-24 lg:pb-32 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-4">
            {t("Submit a Referral", "提交轉診")}
          </div>
          <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight text-balance">
            {t("Refer a patient to our practice.", "轉診一位病患至本診所。")}
          </h2>
          <p className="text-foreground/80 leading-relaxed max-w-2xl mb-10">
            {t(
              "Complete the form below to send a professional referral directly to our team. We will confirm receipt and follow up with your office once the consultation is scheduled.",
              "請完成下方表單，將專業的轉診資料直接送交我們的團隊。我們會在收到後與您確認，並在病患預約諮詢後與貴診所聯繫。",
            )}
          </p>

          <ReferralForm />
        </div>
      </section>

      {/* SPECIALIST COORDINATION — moved to bottom */}
      <section className="px-6 lg:px-10 pb-20 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 lg:mb-14">
            <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-4">
              {t("How we work with you", "我們與您的合作方式")}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-balance">
              {t("Coordinated, transparent, collaborative.", "協同照護、透明溝通、跨科合作。")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-3xl overflow-hidden">
            {VALUE_CARDS.map(([title, body]) => (
              <div key={title} className="bg-background p-8 lg:p-10">
                <h3 className="font-serif text-2xl mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-3">
              {t("Questions about a referral?", "對轉診有任何問題嗎？")}
            </h2>
            <p className="text-muted-foreground">
              {t("Contact our office directly.", "歡迎直接聯絡診所。")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-3xl overflow-hidden">
            <div className="bg-background p-8">
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
                {t("Phone", "電話")}
              </div>
              <a href={SITE.phoneHref} className="font-serif text-xl hover:text-primary">
                {SITE.phone}
              </a>
            </div>
            <div className="bg-background p-8">
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
                {t("Email", "電子郵件")}
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="font-serif text-xl hover:text-primary break-all"
              >
                {SITE.email}
              </a>
            </div>
            <div className="bg-background p-8">
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
                {t("Address", "地址")}
              </div>
              <address className="not-italic text-foreground/85 leading-relaxed text-sm">
                {SITE.address.street}
                <br />
                {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
              </address>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-foreground/15 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
            >
              {t("Contact the Office", "聯絡診所")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
