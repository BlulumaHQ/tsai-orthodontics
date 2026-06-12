import { SITE } from "@/lib/site-data";
import { useT } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function TopBar() {
  const { t } = useT();
  return (
    <div className="hidden md:block bg-foreground text-background/85 text-[11px] tracking-[0.12em]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-9 flex items-center justify-between">
        <p className="uppercase tracking-[0.18em] text-background/70">
          {t("Boutique orthodontic care in Vancouver", "溫哥華精品齒顎矯正診所")}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={SITE.phoneHref}
            className="uppercase tracking-[0.18em] text-background/80 hover:text-white transition-colors"
          >
            {SITE.phone}
          </a>
          <span className="h-3 w-px bg-background/20" />
          <LanguageSwitcher tone="light" />
        </div>
      </div>
      {/* Mobile slim bar: phone only (switcher lives in header next to hamburger) */}
      <div className="md:hidden flex items-center justify-center h-8 text-[11px]">
        <a
          href={SITE.phoneHref}
          className="uppercase tracking-[0.18em] text-background/85"
        >
          {SITE.phone}
        </a>
      </div>
    </div>
  );
}
