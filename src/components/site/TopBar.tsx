import { SITE } from "@/lib/site-data";
import { useT } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function TopBar() {
  const { t } = useT();
  return (
    <div className="bg-foreground text-background/85 text-[11px] tracking-[0.12em]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-9 flex items-center justify-between gap-4">
        <p className="uppercase tracking-[0.18em] text-background/70 truncate">
          {t("Boutique orthodontic care in Vancouver", "溫哥華精品齒顎矯正診所")}
        </p>
        <div className="flex items-center gap-4 lg:gap-5 shrink-0">
          <a
            href={SITE.phoneHref}
            className="uppercase tracking-[0.18em] text-background/85 hover:text-white transition-colors"
          >
            {SITE.phone}
          </a>
          <span className="hidden md:inline-block h-3 w-px bg-background/20" />
          <span className="hidden md:inline-flex">
            <LanguageSwitcher tone="light" />
          </span>
        </div>
      </div>
    </div>
  );
}
