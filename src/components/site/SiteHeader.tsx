import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV, SITE, type NavItem } from "@/lib/site-data";
import { ChevronDown, Menu, X } from "lucide-react";

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop nav — group About + Services as dropdowns, the rest stay flat
  const desktopNav = NAV.filter((n) => n.label !== "Home");

  const solid = !transparent || scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-background/90 backdrop-blur-md border-b border-foreground/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between gap-6">
        <Link
          to="/"
          className={`font-display text-xl lg:text-2xl tracking-tight shrink-0 ${
            solid ? "text-foreground" : "text-white"
          }`}
        >
          {SITE.name}
        </Link>

        <nav className="hidden lg:flex items-center gap-7 min-w-0">
          {desktopNav.map((item) => (
            <DesktopNavItem
              key={item.to + item.label}
              item={item}
              solid={solid}
            />
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <a
            href={SITE.phoneHref}
            className={`text-[11px] uppercase tracking-[0.18em] font-medium transition-colors ${
              solid ? "text-foreground/70 hover:text-primary" : "text-white/85 hover:text-white"
            }`}
          >
            {SITE.phone}
          </a>
          <Link
            to="/contact"
            className="text-[11px] uppercase tracking-[0.18em] font-medium px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-foreground transition-colors"
          >
            Book a Consultation
          </Link>
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className={`lg:hidden p-2 -mr-2 ${solid ? "text-foreground" : "text-white"}`}
        >
          <Menu className="size-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          <div className="flex items-center justify-between h-16 px-6 border-b border-foreground/5 sticky top-0 bg-background">
            <span className="font-display text-xl">{SITE.name}</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 -mr-2"
            >
              <X className="size-6" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-6 gap-1 pb-32">
            {NAV.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = openGroup === item.label;
              if (!hasChildren) {
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl py-3 border-b border-foreground/5"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={item.label} className="border-b border-foreground/5">
                  <button
                    onClick={() => setOpenGroup(isOpen ? null : item.label)}
                    className="w-full flex items-center justify-between font-display text-2xl py-3"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-4 flex flex-col gap-1">
                      {item.children!.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => setOpen(false)}
                          className="text-base py-2 pl-3 text-foreground/75 hover:text-primary"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex items-center justify-center px-6 py-4 rounded-full bg-primary text-primary-foreground text-sm uppercase tracking-[0.18em]"
            >
              Book a Consultation
            </Link>
            <a
              href={SITE.phoneHref}
              className="mt-3 text-center text-sm text-muted-foreground"
            >
              {SITE.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function DesktopNavItem({ item, solid }: { item: NavItem; solid: boolean }) {
  const base = `text-[11px] uppercase tracking-[0.18em] font-medium transition-colors whitespace-nowrap ${
    solid ? "text-foreground/75 hover:text-primary" : "text-white/85 hover:text-white"
  }`;

  if (!item.children) {
    return (
      <Link
        to={item.to}
        className={base}
        activeProps={{ className: "text-primary" }}
        activeOptions={{ exact: item.to === "/" }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <Link to={item.to} className={`${base} inline-flex items-center gap-1`}>
        {item.label}
        <ChevronDown className="size-3.5 opacity-60" />
      </Link>
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
        <div className="bg-background border border-foreground/8 rounded-2xl shadow-xl py-3 min-w-[240px]">
          {item.children.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="block px-5 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/40 transition"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
