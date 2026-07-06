import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileStickyCTA } from "@/components/site/MobileStickyCTA";
import { SITE } from "@/lib/site-data";
import { LanguageProvider } from "@/lib/i18n";
import faviconAsset from "@/assets/favicon.png.asset.json";

function NotFoundComponent() {
  return (
    <>
      <SiteHeader />
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <div className="font-serif text-8xl">404</div>
          <h1 className="mt-4 text-xl font-semibold text-foreground">Page not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-[0.18em] font-medium text-primary-foreground transition-colors hover:bg-foreground"
            >
              Return home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-primary-foreground transition-colors hover:bg-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-foreground/10 bg-background px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: SITE.name,
  url: `https://${SITE.domain}`,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postal,
    addressCountry: SITE.address.country,
  },
  areaServed: "Vancouver, BC",
  medicalSpecialty: "Orthodontics",
  priceRange: "$$$",
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tsai Orthodontics — Specialist Orthodontic Care, Vancouver" },
      {
        name: "description",
        content:
          "Tsai Orthodontics provides specialist orthodontic care in Vancouver for children, teens, and adults, with clear treatment planning, personal attention, and a warm family experience.",
      },
      { name: "author", content: SITE.name },
      { property: "og:site_name", content: SITE.name },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#FAF8F6" },
      { property: "og:title", content: "Tsai Orthodontics — Specialist Orthodontic Care, Vancouver" },
      { name: "twitter:title", content: "Tsai Orthodontics — Specialist Orthodontic Care, Vancouver" },
      { property: "og:description", content: "Specialist orthodontic care on Main Street in Vancouver. Braces, Invisalign, and unhurried family care from Dr. Tsai." },
      { name: "twitter:description", content: "Specialist orthodontic care on Main Street in Vancouver. Braces, Invisalign, and unhurried family care from Dr. Tsai." },
      { name: "description", content: "Specialist orthodontic care on Main Street in Vancouver. Braces, Invisalign, and unhurried family care from Dr. Tsai." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ab1f1a73-6a0e-46cd-b87e-cb5076c88a5e/id-preview-fed8e244--a3ce2391-661c-4537-9060-a239936ca419.lovable.app-1783245457128.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ab1f1a73-6a0e-46cd-b87e-cb5076c88a5e/id-preview-fed8e244--a3ce2391-661c-4537-9060-a239936ca419.lovable.app-1783245457128.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: faviconAsset.url },
      { rel: "shortcut icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: faviconAsset.url },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(orgJsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = router.state.location.pathname;
  void pathname;
  const transparent = false;

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <SiteHeader transparent={transparent} />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <SiteFooter />
        <MobileStickyCTA />
        <Toaster position="top-center" richColors />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
