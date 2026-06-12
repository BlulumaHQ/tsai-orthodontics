import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "zh";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
});

const STORAGE_KEY = "tsai_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "zh" || saved === "en") {
        setLangState(saved);
        document.documentElement.lang = saved === "zh" ? "zh-Hant" : "en";
      }
    } catch {
      /* noop */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l === "zh" ? "zh-Hant" : "en";
    } catch {
      /* noop */
    }
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
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
