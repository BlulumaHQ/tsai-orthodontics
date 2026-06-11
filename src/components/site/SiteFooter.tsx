import { Link } from "@tanstack/react-router";
import { FOOTER_NAV, FOOTER_SERVICES, SITE } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background pt-24 pb-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-10 pb-16 border-b border-white/10">
          {/* Column 1 — brand */}
          <div className="lg:col-span-1">
            <div className="font-display text-2xl lg:text-3xl mb-5 leading-tight">
              {SITE.name}
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Specialist orthodontic care in Vancouver — delivered with clarity, warmth, and personal attention.
            </p>
          </div>

          {/* Column 2 — intentional spacer (desktop) */}
          <div className="hidden lg:block" aria-hidden />

          {/* Column 3 — practice nav */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-4">
              Practice
            </div>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/85 hover:text-primary transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — services */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-4">
              Services
            </div>
            <ul className="space-y-2 text-sm">
              {FOOTER_SERVICES.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/85 hover:text-primary transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — contact */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-4">
              Contact
            </div>
            <address className="not-italic text-white/85 leading-relaxed text-sm">
              {SITE.address.street}<br />
              {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
            </address>
            <a
              href={SITE.phoneHref}
              className="block text-sm text-white/85 hover:text-primary transition mt-3"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="block text-sm text-white/85 hover:text-primary transition mt-1 break-all"
            >
              {SITE.email}
            </a>

            <div className="mt-6 text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2">
              Hours
            </div>
            <ul className="space-y-1 text-xs text-white/70">
              {SITE.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-white/50">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] tracking-[0.04em] text-white/40">
          <p>
            © 2026 {SITE.name}. All rights reserved. | Web Design by{" "}
            <a
              href="https://bluluma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-primary transition"
            >
              Bluluma
            </a>
          </p>
          <p>{SITE.address.city}, {SITE.address.region}</p>
        </div>
      </div>
    </footer>
  );
}
