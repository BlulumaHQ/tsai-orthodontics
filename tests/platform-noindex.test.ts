import { describe, expect, it } from "bun:test";

import { applyPlatformNoindex, isPlatformHostname } from "../src/lib/platform-noindex";

const htmlResponse = () =>
  new Response("<!doctype html><title>Tsai Orthodontics</title>", {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });

describe("platform hostname detection", () => {
  it.each([
    "preview.lovable.app",
    "nested.preview.lovable.app",
    "site.workers.dev",
    "site.pages.dev",
    "site.netlify.app",
    "PREVIEW.LOVABLE.APP.",
  ])("marks %s as a platform hostname", (hostname) => {
    expect(isPlatformHostname(hostname)).toBe(true);
  });

  it.each([
    "tsaiorthodontics.ca",
    "www.tsaiorthodontics.ca",
    "lovable.app",
    "lovable.app.example.com",
    "notworkers.dev",
  ])("does not mark %s as a platform hostname", (hostname) => {
    expect(isPlatformHostname(hostname)).toBe(false);
  });
});

describe("applyPlatformNoindex", () => {
  it.each(["lovable.app", "workers.dev", "pages.dev", "netlify.app"])(
    "adds noindex to nested HTML routes on %s",
    (suffix) => {
      const request = new Request(`https://preview.${suffix}/services/braces?lang=zh`);
      const response = applyPlatformNoindex(request, htmlResponse());

      expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
    },
  );

  it("leaves custom-domain HTML index-eligible", async () => {
    const request = new Request("https://tsaiorthodontics.ca/services/braces");
    const original = htmlResponse();
    const response = applyPlatformNoindex(request, original);

    expect(response).toBe(original);
    expect(response.headers.get("X-Robots-Tag")).toBeNull();
    expect(await response.text()).toContain("Tsai Orthodontics");
  });

  it("does not add noindex to non-HTML platform responses", () => {
    const request = new Request("https://preview.lovable.app/sitemap.xml");
    const original = new Response("<urlset />", {
      headers: { "Content-Type": "application/xml" },
    });
    const response = applyPlatformNoindex(request, original);

    expect(response).toBe(original);
    expect(response.headers.get("X-Robots-Tag")).toBeNull();
  });
});
