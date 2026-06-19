import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site-data";
import { useT } from "@/lib/i18n";

const REFERRAL_REASONS: { en: string; zh: string }[] = [
  { en: "Children / Teens Orthodontic Evaluation", zh: "兒童／青少年矯正評估" },
  { en: "Adult Orthodontic Evaluation", zh: "成人矯正評估" },
  { en: "Braces / Fixed Appliances", zh: "Braces／固定式矯正器" },
  { en: "Invisalign", zh: "Invisalign" },
  { en: "Phase I Treatment", zh: "Phase I Treatment" },
  { en: "Airway Friendly Orthodontics", zh: "Airway Friendly Orthodontics" },
  { en: "MARPE Evaluation", zh: "MARPE 評估" },
  { en: "Retainers", zh: "Retainers" },
  { en: "Other", zh: "其他" },
];

const REASON_VALUES = REFERRAL_REASONS.map((r) => r.en) as [string, ...string[]];

const referralSchema = z.object({
  dentistName: z.string().trim().min(1, "Required").max(120),
  clinicName: z.string().trim().min(1, "Required").max(160),
  clinicPhone: z.string().trim().min(7, "Required").max(40),
  clinicEmail: z.string().trim().email("Invalid email").max(200),
  patientFirstName: z.string().trim().min(1, "Required").max(80),
  patientLastName: z.string().trim().min(1, "Required").max(80),
  patientDob: z.string().trim().max(40).optional().or(z.literal("")),
  guardianName: z.string().trim().max(160).optional().or(z.literal("")),
  patientPhone: z.string().trim().max(40).optional().or(z.literal("")),
  patientEmail: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v), "Invalid email"),
  reason: z.enum(REASON_VALUES, { message: "Please choose a reason" }),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, {
    message: "Please confirm patient/guardian consent",
  }),
});

type ReferralForm = {
  dentistName: string;
  clinicName: string;
  clinicPhone: string;
  clinicEmail: string;
  patientFirstName: string;
  patientLastName: string;
  patientDob: string;
  guardianName: string;
  patientPhone: string;
  patientEmail: string;
  reason: string;
  notes: string;
  consent: boolean;
};

const INITIAL: ReferralForm = {
  dentistName: "",
  clinicName: "",
  clinicPhone: "",
  clinicEmail: "",
  patientFirstName: "",
  patientLastName: "",
  patientDob: "",
  guardianName: "",
  patientPhone: "",
  patientEmail: "",
  reason: "",
  notes: "",
  consent: false,
};

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
      { property: "og:url", content: "/dentist-referral" },
    ],
    links: [{ rel: "canonical", href: "/dentist-referral" }],
  }),
  component: DentistReferralPage,
});

function DentistReferralPage() {
  const { t } = useT();
  const [form, setForm] = useState<ReferralForm>(INITIAL);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof ReferralForm, string>>>({});

  const update =
    <K extends keyof ReferralForm>(key: K) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm((f) => ({ ...f, [key]: value as ReferralForm[K] }));
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = referralSchema.safeParse(form);
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof ReferralForm;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      toast.error(
        t("Please correct the highlighted fields.", "請修正標示為紅色的欄位。"),
      );
      return;
    }
    setErrors({});
    const d = parsed.data;
    const subject = `Patient Referral: ${d.patientFirstName} ${d.patientLastName} — from ${d.clinicName}`;
    const body = [
      "REFERRING DENTIST",
      `Name: ${d.dentistName}`,
      `Clinic: ${d.clinicName}`,
      `Clinic Phone: ${d.clinicPhone}`,
      `Clinic Email: ${d.clinicEmail}`,
      "",
      "PATIENT",
      `Name: ${d.patientFirstName} ${d.patientLastName}`,
      `Date of Birth: ${d.patientDob || "—"}`,
      `Parent / Guardian: ${d.guardianName || "—"}`,
      `Phone: ${d.patientPhone || "—"}`,
      `Email: ${d.patientEmail || "—"}`,
      "",
      "REFERRAL",
      `Reason: ${d.reason}`,
      "",
      "CLINICAL NOTES",
      d.notes || "—",
      "",
      files.length
        ? `Attachments (please send separately): ${files.map((f) => f.name).join(", ")}`
        : "Attachments: none",
      "",
      "Consent confirmed by referring dentist.",
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    toast.success(
      t(
        "Opening your email client to send the referral.",
        "正在開啟您的電子郵件，準備寄出轉診資料。",
      ),
    );
  };

  const inputCls =
    "w-full bg-background border border-foreground/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors";
  const labelCls =
    "block text-[10px] uppercase tracking-[0.22em] text-foreground/60 mb-2";

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
        eyebrow={t("For Referring Dentists", "提供給轉診牙醫")}
        title={t("Dentist Referral", "牙醫轉診")}
        intro={t(
          "We welcome referrals from general dentists and other healthcare professionals. Tsai Orthodontics is committed to clear communication, thoughtful follow through, and respectful coordination with the referring office.",
          "我們歡迎一般牙醫師與其他醫療專業人員的轉診。Tsai Orthodontics 重視清楚的溝通、細膩的後續追蹤，以及與轉診診所之間互相尊重的協作。",
        )}
      />

      <section className="px-6 lg:px-10 pb-20 lg:pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-3xl overflow-hidden">
          {VALUE_CARDS.map(([title, body]) => (
            <div key={title} className="bg-background p-8 lg:p-10">
              <h3 className="font-serif text-2xl mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{body}</p>
            </div>
          ))}
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
              "Complete the form below. Submitting opens your email client with a pre-filled, professional referral to ",
              "請完成下方表單。送出後會自動開啟您的電子郵件，並預先填好一封專業的轉診信件，寄送至 ",
            )}
            <a href={`mailto:${SITE.email}`} className="text-primary underline">
              {SITE.email}
            </a>
            {t(
              ". We will confirm receipt and follow up with your office once the consultation is scheduled.",
              "。我們會在收到後與您確認，並在病患預約諮詢後與貴診所聯繫。",
            )}
          </p>

          <form
            onSubmit={onSubmit}
            className="bg-background border border-foreground/10 rounded-3xl p-8 lg:p-12 space-y-12"
          >
            <div>
              <div className="font-serif text-2xl mb-6">
                {t("Referring Dentist Information", "轉診牙醫師資料")}
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>{t("Dentist Name *", "牙醫師姓名 *")}</label>
                  <input className={inputCls} value={form.dentistName} onChange={update("dentistName")} />
                  {errors.dentistName && <p className="text-xs text-destructive mt-2">{errors.dentistName}</p>}
                </div>
                <div>
                  <label className={labelCls}>{t("Clinic Name *", "診所名稱 *")}</label>
                  <input className={inputCls} value={form.clinicName} onChange={update("clinicName")} />
                  {errors.clinicName && <p className="text-xs text-destructive mt-2">{errors.clinicName}</p>}
                </div>
                <div>
                  <label className={labelCls}>{t("Clinic Phone *", "診所電話 *")}</label>
                  <input className={inputCls} value={form.clinicPhone} onChange={update("clinicPhone")} />
                  {errors.clinicPhone && <p className="text-xs text-destructive mt-2">{errors.clinicPhone}</p>}
                </div>
                <div>
                  <label className={labelCls}>{t("Clinic Email *", "診所電子郵件 *")}</label>
                  <input type="email" className={inputCls} value={form.clinicEmail} onChange={update("clinicEmail")} />
                  {errors.clinicEmail && <p className="text-xs text-destructive mt-2">{errors.clinicEmail}</p>}
                </div>
              </div>
            </div>

            <div>
              <div className="font-serif text-2xl mb-6">{t("Patient Information", "病患資料")}</div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>{t("Patient First Name *", "病患名字 *")}</label>
                  <input className={inputCls} value={form.patientFirstName} onChange={update("patientFirstName")} />
                  {errors.patientFirstName && <p className="text-xs text-destructive mt-2">{errors.patientFirstName}</p>}
                </div>
                <div>
                  <label className={labelCls}>{t("Patient Last Name *", "病患姓氏 *")}</label>
                  <input className={inputCls} value={form.patientLastName} onChange={update("patientLastName")} />
                  {errors.patientLastName && <p className="text-xs text-destructive mt-2">{errors.patientLastName}</p>}
                </div>
                <div>
                  <label className={labelCls}>{t("Patient Date of Birth", "病患出生日期")}</label>
                  <input type="date" className={inputCls} value={form.patientDob} onChange={update("patientDob")} />
                </div>
                <div>
                  <label className={labelCls}>{t("Parent / Guardian Name", "家長／監護人姓名")}</label>
                  <input className={inputCls} value={form.guardianName} onChange={update("guardianName")} />
                </div>
                <div>
                  <label className={labelCls}>{t("Patient Phone", "病患電話")}</label>
                  <input className={inputCls} value={form.patientPhone} onChange={update("patientPhone")} />
                </div>
                <div>
                  <label className={labelCls}>{t("Patient Email", "病患電子郵件")}</label>
                  <input type="email" className={inputCls} value={form.patientEmail} onChange={update("patientEmail")} />
                  {errors.patientEmail && <p className="text-xs text-destructive mt-2">{errors.patientEmail}</p>}
                </div>
              </div>
            </div>

            <div>
              <div className="font-serif text-2xl mb-6">{t("Referral Details", "轉診內容")}</div>
              <div className="grid gap-5">
                <div>
                  <label className={labelCls}>{t("Reason for Referral *", "轉診原因 *")}</label>
                  <select className={inputCls} value={form.reason} onChange={update("reason")}>
                    <option value="">{t("Select a reason…", "請選擇原因…")}</option>
                    {REFERRAL_REASONS.map((r) => (
                      <option key={r.en} value={r.en}>{t(r.en, r.zh)}</option>
                    ))}
                  </select>
                  {errors.reason && <p className="text-xs text-destructive mt-2">{errors.reason}</p>}
                </div>
                <div>
                  <label className={labelCls}>{t("Message / Clinical Notes", "訊息／臨床備註")}</label>
                  <textarea
                    className={`${inputCls} min-h-[140px] resize-y`}
                    placeholder={t(
                      "Relevant history, current findings, or anything we should know before the consultation.",
                      "相關病史、目前的檢查發現，或任何在諮詢前希望我們了解的資訊。",
                    )}
                    value={form.notes}
                    onChange={update("notes")}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="font-serif text-2xl mb-6">{t("Attachments", "附件")}</div>
              <label className="flex flex-col items-center justify-center gap-3 border border-dashed border-foreground/20 rounded-2xl px-6 py-10 text-center cursor-pointer hover:border-primary hover:bg-secondary/30 transition-colors">
                <Upload className="size-6 text-primary" />
                <span className="text-sm text-foreground/80">
                  {t("Upload X-rays, photos, or documents", "上傳 X 光、照片或相關文件")}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {t("PDF, JPG, PNG · or send separately to ", "PDF、JPG、PNG · 或另行寄至 ")}{SITE.email}
                </span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
                />
              </label>
              {files.length > 0 && (
                <ul className="mt-4 text-xs text-muted-foreground space-y-1">
                  {files.map((f) => (
                    <li key={f.name}>· {f.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="flex gap-3 items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={update("consent")}
                  className="mt-1 size-4 accent-primary flex-none"
                />
                <span className="text-sm text-foreground/80 leading-relaxed">
                  {t(
                    "I confirm that the patient or guardian has consented to this referral.",
                    "我確認病患或其監護人已同意此次轉診。",
                  )}
                </span>
              </label>
              {errors.consent && <p className="text-xs text-destructive mt-2">{errors.consent}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between pt-2 border-t border-foreground/10">
              <p className="text-xs text-muted-foreground max-w-md">
                {t(
                  "Submitting opens your email client with the referral details ready to send.",
                  "送出後將開啟您的電子郵件，並已預先填好轉診內容供您寄出。",
                )}
              </p>
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
              >
                {t("Submit Referral", "送出轉診")}
              </button>
            </div>
          </form>
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
              <a href={SITE.phoneHref} className="font-serif text-xl hover:text-primary">{SITE.phone}</a>
            </div>
            <div className="bg-background p-8">
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
                {t("Email", "電子郵件")}
              </div>
              <a href={`mailto:${SITE.email}`} className="font-serif text-xl hover:text-primary break-all">{SITE.email}</a>
            </div>
            <div className="bg-background p-8">
              <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">
                {t("Address", "地址")}
              </div>
              <address className="not-italic text-foreground/85 leading-relaxed text-sm">
                {SITE.address.street}<br />
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
