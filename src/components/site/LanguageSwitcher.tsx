import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";

export function LanguageSwitcher({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const { lang, setLang } = useLang();

  const base =
    "px-2.5 py-1 text-[11px] tracking-[0.12em] font-medium uppercase transition-colors";
  // Active language is rendered in the brand orange in both tones for a
  // consistent, recognizable cue.
  const activeCls = "text-primary";
  const inactiveCls =
    tone === "light"
      ? "text-white/55 hover:text-primary"
      : "text-foreground/55 hover:text-primary";
  const dividerCls = tone === "light" ? "text-white/30" : "text-foreground/25";

  return (
    <div
      className={`inline-flex items-center ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <Link
        to="."
        search={((prev: Record<string, unknown>) => ({ ...prev, lang: undefined })) as never}
        hrefLang="en"
        onClick={(e) => {
          e.preventDefault();
          setLang("en");
        }}
        aria-current={lang === "en" ? "true" : undefined}
        className={`${base} ${lang === "en" ? activeCls : inactiveCls}`}
      >
        EN
      </Link>
      <span className={`text-[10px] ${dividerCls}`}>/</span>
      <Link
        to="."
        search={((prev: Record<string, unknown>) => ({ ...prev, lang: "zh" })) as never}
        hrefLang="zh-Hant"
        lang="zh-Hant"
        onClick={(e) => {
          e.preventDefault();
          setLang("zh");
        }}
        aria-current={lang === "zh" ? "true" : undefined}
        className={`${base} ${lang === "zh" ? activeCls : inactiveCls}`}
      >
        中文
      </Link>
    </div>
  );
}
