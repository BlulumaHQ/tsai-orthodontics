import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site-data";
import { Menu, X } from "lucide-react";

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !transparent || scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-background/85 backdrop-blur-md border-b border-foreground/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
        <Link
          to="/"
          className={`font-display text-xl lg:text-2xl tracking-tight ${
            solid ? "text-foreground" : "text-white"
          }`}
        >
          {SITE.name}
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.slice(0, 6).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-[11px] uppercase tracking-[0.18em] font-medium transition-colors ${
                solid
                  ? "text-foreground/70 hover:text-primary"
                  : "text-white/80 hover:text-white"
              }`}
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="text-[11px] uppercase tracking-[0.18em] font-medium px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-foreground transition-colors"
          >
            Book Consultation
          </Link>
        </nav>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className={`lg:hidden p-2 -mr-2 ${solid ? "text-foreground" : "text-white"}`}
        >
          <Menu className="size-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background animate-fade-in">
          <div className="flex items-center justify-between h-16 px-6 border-b border-foreground/5">
            <span className="font-display text-xl">{SITE.name}</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 -mr-2"
            >
              <X className="size-6" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-10 gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-display text-3xl py-3 border-b border-foreground/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex items-center justify-center px-6 py-4 rounded-full bg-primary text-primary-foreground text-sm uppercase tracking-[0.18em]"
            >
              Book Consultation
            </Link>
            <a
              href={SITE.phoneHref}
              className="mt-4 text-center text-sm text-muted-foreground"
            >
              {SITE.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
