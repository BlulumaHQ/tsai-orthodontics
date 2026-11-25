import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SERVICES, SERVICE_GALLERIES } from "@/lib/services-data";
import { SITE_ORIGIN, absoluteUrl, type Lang } from "@/lib/locale";

const LASTMOD = "2026-11-15";

interface SitemapEntry {
  path: string;
  images?: string[];
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          {
            path: "/",
            changefreq: "weekly",
            priority: "1.0",
            images: [
              "/images/home/orthodontist-vancouver-tsai-orthodontics.webp",
              "/images/home/orthodontic-check-up-main-street-vancouver.webp",
              "/images/clinic/dr-andrew-and-dr-marjorie-tsai-orthodontists.webp",
              "/images/clinic/orthodontic-treatment-room-vancouver.webp",
              "/images/clinic/orthodontist-patient-consultation-3d-scan.webp",
              "/images/clinic/orthodontic-clinic-hallway-main-street.webp",
            ],
          },
          { path: "/about-the-doctors", changefreq: "monthly", priority: "0.8" },
          { path: "/about-the-doctors/dr-andrew-tsai", changefreq: "monthly", priority: "0.8", images: ["/images/doctors/dr-andrew-tsai-orthodontist-vancouver.webp"] },
          { path: "/about-the-doctors/dr-marjorie-tsai", changefreq: "monthly", priority: "0.6", images: ["/images/doctors/dr-marjorie-tsai-orthodontist-vancouver.webp"] },
          { path: "/what-sets-us-apart", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.8" },
          { path: "/new-patients", changefreq: "monthly", priority: "0.8" },
          { path: "/faq", changefreq: "monthly", priority: "0.7" },
          { path: "/dentist-referral", changefreq: "yearly", priority: "0.6" },
          { path: "/contact", changefreq: "yearly", priority: "0.9" },
          ...SERVICES.map((s) => ({
            path: `/services/${s.slug}`,
            images: [s.image, ...(SERVICE_GALLERIES[s.slug] ?? []).map((g) => g.src)].filter(
              (src, i, arr): src is string => !!src && arr.indexOf(src) === i,
            ),
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
              ...(e.images ?? []).map(
                (src) => `    <image:image><image:loc>${SITE_ORIGIN}${src}</image:loc></image:image>`,
              ),
              `  </url>`,
            ]
              .filter(Boolean)
              .join("\n"),
          ),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
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
