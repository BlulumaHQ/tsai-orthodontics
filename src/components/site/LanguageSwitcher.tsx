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
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`${base} ${lang === "en" ? activeCls : inactiveCls}`}
      >
        EN
      </button>
      <span className={`text-[10px] ${dividerCls}`}>/</span>
      <button
        type="button"
        onClick={() => setLang("zh")}
        aria-pressed={lang === "zh"}
        lang="zh-Hant"
        className={`${base} ${lang === "zh" ? activeCls : inactiveCls}`}
      >
        中文
      </button>
    </div>
  );
}
