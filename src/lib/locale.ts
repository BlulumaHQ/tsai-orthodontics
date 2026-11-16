// Language lives in the URL: English at /…, Traditional Chinese at /zh-tw/….
// Internally the router sees the English path plus ?lang=zh; the rewrite in
// src/router.tsx maps between the two, so route files and <Link to> stay unchanged.
export const ZH_PREFIX = "/zh-tw";
export const SITE_ORIGIN = "https://tsaiorthodontics.ca";
export type Lang = "en" | "zh";

const UNPREFIXED = /^\/(api|sitemap\.xml|robots\.txt|images|forms|research|assets)(\/|$)/;

export function stripZhPrefix(pathname: string): string | null {
  if (pathname === ZH_PREFIX || pathname === `${ZH_PREFIX}/`) return "/";
  if (pathname.startsWith(`${ZH_PREFIX}/`)) return pathname.slice(ZH_PREFIX.length);
  return null;
}

export function publicPath(pathname: string, lang: Lang): string {
  const clean = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  if (lang !== "zh" || UNPREFIXED.test(clean)) return clean;
  return clean === "/" ? `${ZH_PREFIX}/` : `${ZH_PREFIX}${clean}`;
}

export function absoluteUrl(pathname: string, lang: Lang): string {
  return `${SITE_ORIGIN}${publicPath(pathname, lang)}`;
}

export const rewrite = {
  input: ({ url }: { url: URL }) => {
    const stripped = stripZhPrefix(url.pathname);
    if (stripped === null) return url;
    url.pathname = stripped;
    url.searchParams.set("lang", "zh");
    return url;
  },
  output: ({ url }: { url: URL }) => {
    if (url.searchParams.get("lang") !== "zh") {
      url.searchParams.delete("lang");
      return url;
    }
    url.searchParams.delete("lang");
    url.pathname = publicPath(url.pathname, "zh");
    return url;
  },
};

type MetaTag = { title?: string; name?: string; property?: string; content?: string } & Record<string, unknown>;
export type ZhMeta = { title: string; description: string };

/** Lang of a route match (root search param retained on every match). */
export function matchLang(match: { search?: unknown } | undefined): Lang {
  return (match?.search as { lang?: string } | undefined)?.lang === "zh" ? "zh" : "en";
}

/** Swap title / description / og:title / og:description for the Chinese version. */
export function localizeMeta<T extends MetaTag>(meta: T[], lang: Lang, zh: ZhMeta | undefined): T[] {
  if (lang !== "zh" || !zh) return meta;
  return meta.map((m) => {
    if ("title" in m && m.title !== undefined) return { ...m, title: zh.title };
    if (m.name === "description" || m.property === "og:description") return { ...m, content: zh.description };
    if (m.property === "og:title") return { ...m, content: zh.title };
    return m;
  });
}

// Chinese titles and descriptions per page. Focus: 溫哥華牙齒矯正專科醫生.
export const ZH_META: Record<string, ZhMeta> = {
  "/": {
    title: "溫哥華牙齒矯正專科醫生 Dr. Andrew Tsai｜Tsai Orthodontics",
    description:
      "Dr. Andrew Tsai 是溫哥華 Main Street 的齒顎矯正專科醫生，為兒童、青少年與成人提供牙齒矯正、Invisalign 隱形牙套與 MARPE。可用國語、廣東話溝通，歡迎預約免費初診諮詢。",
  },
  "/about-the-doctors": {
    title: "認識醫師｜溫哥華齒顎矯正專科醫生 Dr. Andrew Tsai｜Tsai Orthodontics",
    description:
      "認識 Tsai Orthodontics 的 Dr. Andrew Tsai 與 Dr. Marjorie Tsai。兩位都是受過完整專科訓練的齒顎矯正專科醫生，以國語與英文為溫哥華家庭提供細心的矯正治療。",
  },
  "/what-sets-us-apart": {
    title: "我們的不同之處｜溫哥華牙齒矯正專科診所 Tsai Orthodontics",
    description:
      "由矯正專科醫生親自規劃每一個療程：精湛工藝、用心照護、清楚透明、方便安排。Tsai Orthodontics 為溫哥華家庭提供以專科為本的牙齒矯正。",
  },
  "/services": {
    title: "矯正服務｜溫哥華牙齒矯正、隱形牙套、MARPE｜Tsai Orthodontics",
    description:
      "溫哥華齒顎矯正專科診所的完整服務：兒童與青少年矯正、成人矯正、傳統矯正器、Invisalign 隱形牙套、兒童早期矯正、MARPE 與維持器，皆由 Dr. Andrew Tsai 親自規劃。",
  },
  "/new-patients": {
    title: "新病患須知｜溫哥華牙齒矯正 Tsai Orthodontics",
    description:
      "第一次來 Tsai Orthodontics？了解免費初診諮詢的流程、下載初診表格，以及保險、付款與分期方案。可用國語、廣東話溝通。",
  },
  "/faq": {
    title: "常見問題｜溫哥華牙齒矯正專科 Tsai Orthodontics",
    description:
      "關於溫哥華牙齒矯正的常見問題：諮詢、療程、Invisalign 隱形牙套、保險與付款方式，由 Tsai Orthodontics 為你解答。",
  },
  "/contact": {
    title: "聯絡我們｜溫哥華 Main Street 牙齒矯正專科 Tsai Orthodontics",
    description:
      "Tsai Orthodontics 位於溫哥華 3431 Main Street。預約免費初診諮詢，請致電 604-636-2686。週二至週六上午 10 點至下午 6 點。",
  },
  "/dentist-referral": {
    title: "牙醫轉診｜溫哥華齒顎矯正專科 Tsai Orthodontics",
    description:
      "轉介病患至 Tsai Orthodontics。清楚專業的轉診流程，與轉診牙醫保持良好溝通與追蹤。",
  },
};

export const ZH_SERVICE_META: Record<string, ZhMeta> = {
  "children-and-teens": {
    title: "兒童與青少年牙齒矯正｜溫哥華矯正專科 Tsai Orthodontics",
    description: "溫哥華兒童與青少年牙齒矯正，由齒顎矯正專科醫生 Dr. Andrew Tsai 評估最適合的時機與療程。",
  },
  adults: {
    title: "成人牙齒矯正｜溫哥華矯正專科 Tsai Orthodontics",
    description: "溫哥華成人牙齒矯正：Invisalign 隱形牙套或矯正器，由矯正專科醫生依你的咬合量身規劃。",
  },
  "braces-and-fixed-appliances": {
    title: "牙齒矯正器 Braces｜溫哥華矯正專科 Tsai Orthodontics",
    description: "溫哥華傳統矯正器與固定式矯正裝置，由齒顎矯正專科醫生精準規劃每一步牙齒移動。",
  },
  invisalign: {
    title: "溫哥華隱適美 Invisalign 隱形牙套｜矯正專科 Tsai Orthodontics",
    description: "溫哥華 Invisalign 隱適美隱形牙套，由齒顎矯正專科醫生以數位方式規劃並定期追蹤。歡迎預約免費諮詢。",
  },
  "phase-i-treatment": {
    title: "兒童早期矯正 Phase I｜溫哥華矯正專科 Tsai Orthodontics",
    description: "溫哥華兒童早期矯正（Phase I）。由矯正專科醫生判斷孩子是否需要及早介入，以及最佳時機。",
  },
  "airway-friendly-orthodontics": {
    title: "呼吸道友善矯正｜溫哥華矯正專科 Tsai Orthodontics",
    description: "溫哥華呼吸道友善矯正：在規劃牙齒矯正時，一併考量呼吸道與顎骨的發展。",
  },
  marpe: {
    title: "MARPE 上顎骨擴張｜溫哥華矯正專科 Tsai Orthodontics",
    description: "溫哥華 MARPE 骨釘輔助上顎擴張與 TADs 骨釘矯正，由齒顎矯正專科醫生 Dr. Andrew Tsai 執行。",
  },
  retainers: {
    title: "矯正維持器 Retainers｜溫哥華矯正專科 Tsai Orthodontics",
    description: "矯正後的維持器，幫你長久保持矯正成果。Tsai Orthodontics，溫哥華齒顎矯正專科診所。",
  },
};
