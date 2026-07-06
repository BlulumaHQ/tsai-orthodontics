import { Link } from "@tanstack/react-router";
import { FOOTER_NAV, FOOTER_SERVICES, SITE } from "@/lib/site-data";
import { useT } from "@/lib/i18n";
import logoFooter from "@/assets/tsai-logo-footer-new.svg.asset.json";

export function SiteFooter() {
  const { t, lang } = useT();
  return (
    <footer className="bg-foreground text-background pt-14 md:pt-24 pb-8 md:pb-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 pb-10 md:pb-16 border-b border-white/10">
          {/* Column 1 — brand */}
          <div className="col-span-2 md:col-span-1">
            <img
              src={logoFooter.url}
              alt={SITE.name}
              className="h-32 md:h-40 w-auto mb-4 md:mb-6"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              <span className="block font-serif text-white/90 text-base italic mb-2">
                {t("Your smile, by design.", "屬於你的笑容，細心設計。")}
              </span>
              {t(
                "Specialist orthodontic care in Vancouver, made to fit into your life, and delivered with craft, care and clarity.",
                "溫哥華的齒顎矯正專科照護，貼合你的生活節奏，並以工藝、關懷與清晰為本。",
              )}
            </p>
          </div>

          {/* Column 2 — spacer (desktop) */}
          <div className="hidden md:block" aria-hidden />

          {/* Column 3 — practice nav */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3 md:mb-4">
              {t("Practice", "診所")}
            </div>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              {FOOTER_NAV.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/85 hover:text-primary transition">
                    {lang === "zh" ? l.labelZh : l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — services */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3 md:mb-4">
              {t("Services", "矯正服務")}
            </div>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              {FOOTER_SERVICES.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/85 hover:text-primary transition">
                    {lang === "zh" ? l.labelZh : l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — contact */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3 md:mb-4">
              {t("Contact", "聯絡我們")}
            </div>
            <address className="not-italic text-white/85 leading-relaxed text-xs md:text-sm">
              {SITE.address.street}<br />
              {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
            </address>
            <a
              href={SITE.phoneHref}
              className="block text-xs md:text-sm text-white/85 hover:text-primary transition mt-2 md:mt-3"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="block text-xs md:text-sm text-white/85 hover:text-primary transition mt-1 break-all"
            >
              {SITE.email}
            </a>

            <div className="mt-4 md:mt-6 text-[10px] uppercase tracking-[0.22em] text-white/40 mb-1.5 md:mb-2">
              {t("Hours", "看診時間")}
            </div>
            <ul className="space-y-0.5 md:space-y-1 text-[11px] md:text-xs text-white/70">
              {SITE.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{lang === "zh" ? h.dayZh : h.day}</span>
                  <span className="text-white/50">{lang === "zh" ? h.timeZh : h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] tracking-[0.04em] text-white/40">
          <p>
            © 2026 {SITE.name}.{" "}
            {t("All rights reserved.", "版權所有。")} | {t("Web Design by", "網站設計：")}{" "}
            <a
              href="https://bluluma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-primary transition"
            >
              Bluluma
            </a>
          </p>
          <p>{SITE.address.city}, {SITE.address.region}</p>
        </div>
      </div>
    </footer>
  );
}
