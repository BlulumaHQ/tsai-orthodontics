import { Link } from "@tanstack/react-router";
import { FOOTER_LINKS, SITE } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background pt-24 pb-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          <div className="lg:col-span-5">
            <div className="font-display text-3xl lg:text-4xl mb-6">
              {SITE.name}
            </div>
            <p className="text-white/60 max-w-md leading-relaxed">
              Specialist orthodontic care for Vancouver families. Considered,
              unhurried, and built on long-term relationships.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-8 text-primary text-xs uppercase tracking-[0.2em] border-b border-primary pb-1"
            >
              Book a Consultation
            </Link>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">
              Visit
            </div>
            <address className="not-italic text-white/90 leading-relaxed text-sm">
              {SITE.address.street}<br />
              {SITE.address.city}, {SITE.address.region}<br />
              {SITE.address.postal}
            </address>
            <div className="mt-6 text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
              Hours
            </div>
            <ul className="space-y-1 text-sm text-white/80">
              {SITE.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-white/50">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">
              Contact
            </div>
            <a
              href={SITE.phoneHref}
              className="block text-sm text-white/90 hover:text-primary transition"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="block text-sm text-white/90 hover:text-primary transition mt-2 break-all"
            >
              {SITE.email}
            </a>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">
              Practice
            </div>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/80 hover:text-primary transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-white/40">
          <p>© 2026 {SITE.name}. All rights reserved. | Web Design by Bluluma</p>
          <p>{SITE.address.city}, {SITE.address.region}</p>
        </div>
      </div>
    </footer>
  );
}
