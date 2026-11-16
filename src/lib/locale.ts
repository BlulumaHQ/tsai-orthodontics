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
