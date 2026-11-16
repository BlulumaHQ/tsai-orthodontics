import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SERVICES } from "@/lib/services-data";
import { absoluteUrl, type Lang } from "@/lib/locale";

const LASTMOD = "2026-11-15";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about-the-doctors", changefreq: "monthly", priority: "0.8" },
          { path: "/about-the-doctors/dr-andrew-tsai", changefreq: "monthly", priority: "0.8" },
          { path: "/about-the-doctors/dr-marjorie-tsai", changefreq: "monthly", priority: "0.6" },
          { path: "/what-sets-us-apart", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.8" },
          { path: "/new-patients", changefreq: "monthly", priority: "0.8" },
          { path: "/faq", changefreq: "monthly", priority: "0.7" },
          { path: "/dentist-referral", changefreq: "yearly", priority: "0.6" },
          { path: "/contact", changefreq: "yearly", priority: "0.9" },
          ...SERVICES.map((s) => ({
            path: `/services/${s.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ];

        const langs: Lang[] = ["en", "zh"];
        const urls = entries.flatMap((e) =>
          langs.map((lang) =>
            [
              `  <url>`,
              `    <loc>${absoluteUrl(e.path, lang)}</loc>`,
              `    <xhtml:link rel="alternate" hreflang="en" href="${absoluteUrl(e.path, "en")}"/>`,
              `    <xhtml:link rel="alternate" hreflang="zh-Hant" href="${absoluteUrl(e.path, "zh")}"/>`,
              `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(e.path, "en")}"/>`,
              `    <lastmod>${LASTMOD}</lastmod>`,
              e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? `    <priority>${e.priority}</priority>` : null,
              `  </url>`,
            ]
              .filter(Boolean)
              .join("\n"),
          ),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
