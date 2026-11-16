import { createContext, useCallback, useContext, useEffect, type ReactNode } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import type { Lang } from "./locale";

export type { Lang } from "./locale";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
});

const STORAGE_KEY = "tsai_lang";

/** Current language from the URL (/zh-tw/… → "zh"). Works during SSR. */
export function useUrlLang(): Lang {
  return useRouterState({
    select: (s) => ((s.location.search as { lang?: string }).lang === "zh" ? "zh" : "en"),
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const lang = useUrlLang();

  const setLang = useCallback(
    (l: Lang) => {
      try {
        localStorage.setItem(STORAGE_KEY, l);
      } catch {
        /* noop */
      }
      void router.navigate({
        to: ".",
        search: (prev: Record<string, unknown>) => ({ ...prev, lang: l === "zh" ? "zh" : undefined }),
        hash: (h: string | undefined) => h ?? "",
        resetScroll: false,
      } as never);
    },
    [router],
  );

  // Visitors who previously chose Chinese land on the Chinese URL.
  useEffect(() => {
    try {
      if (lang === "en" && localStorage.getItem(STORAGE_KEY) === "zh") setLang("zh");
    } catch {
      /* noop */
    }
    // run once on first load only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/**
 * useT — returns the current language and a helper t(en, zh) that picks the
 * right translation. Works with strings or ReactNodes.
 */
export function useT() {
  const { lang } = useContext(LangContext);
  function t<E, Z>(en: E, zh: Z): E | Z {
    return lang === "zh" ? zh : en;
  }
  return { lang, t };
}
