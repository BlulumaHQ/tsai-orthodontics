import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV, SITE, type NavItem } from "@/lib/site-data";
import { ChevronDown, Menu, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { TopBar } from "./TopBar";
import logoHeader from "@/assets/tsai-logo-light-bg.svg.asset.json";

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { t, lang } = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const desktopNav = NAV.filter((n) => n.label !== "Home");
  const solid = !transparent || scrolled;

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      {/* TOP BAR */}
      <TopBar />

      {/* MAIN HEADER */}
      <header
        className={`transition-colors duration-500 ${
          solid
            ? "bg-background/95 backdrop-blur-md border-b border-foreground/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between gap-6">
          <Link
            to="/"
            className="shrink-0 flex items-center"
            aria-label={SITE.name}
          >
            <img
              src={logoHeader.url}
              alt={SITE.name}
              className="h-7 lg:h-9 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 min-w-0">
            {desktopNav.map((item) => (
              <DesktopNavItem
                key={item.to + item.label}
                item={item}
                solid={solid}
                label={t(item.label, item.labelZh)}
              />
            ))}
          </nav>

          {/* Desktop right cluster: CTA only (phone + lang live in top bar) */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="text-[11px] uppercase tracking-[0.18em] font-medium px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-foreground transition-colors"
            >
              {t("Book a Consultation", "預約諮詢")}
            </Link>
          </div>

          {/* Mobile right cluster: hamburger only (lang switcher is in top bar) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setOpen(true)}
              aria-label={t("Open menu", "開啟選單")}
              className={`p-2 -mr-2 ${solid ? "text-foreground" : "text-white"}`}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE PANEL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          <div className="flex items-center justify-between h-16 px-6 border-b border-foreground/5 sticky top-0 bg-background">
            <img src={logoHeader.url} alt={SITE.name} className="h-7 w-auto" />
            <div className="flex items-center gap-3">
              <LanguageSwitcher tone="dark" />
              <button
                onClick={() => setOpen(false)}
                aria-label={t("Close menu", "關閉選單")}
                className="p-2 -mr-2"
              >
                <X className="size-6" />
              </button>
            </div>
          </div>
          <nav className="flex flex-col px-6 py-6 gap-1 pb-32">
            {NAV.map((item) => {
              const itemLabel = lang === "zh" ? item.labelZh : item.label;
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = openGroup === item.label;
              if (!hasChildren) {
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="font-serif text-2xl py-3 border-b border-foreground/5"
                  >
                    {itemLabel}
                  </Link>
                );
              }
              return (
                <div key={item.label} className="border-b border-foreground/5">
                  <button
                    onClick={() => setOpenGroup(isOpen ? null : item.label)}
                    className="w-full flex items-center justify-between font-serif text-2xl py-3"
                  >
                    <span>{itemLabel}</span>
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
                          {lang === "zh" ? c.labelZh : c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <a
              href={SITE.phoneHref}
              className="mt-6 text-center text-base text-foreground py-3 border-b border-foreground/5"
            >
              {SITE.phone}
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center px-6 py-4 rounded-full bg-primary text-primary-foreground text-sm uppercase tracking-[0.18em]"
            >
              {t("Book a Consultation", "預約諮詢")}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}

function DesktopNavItem({
  item,
  solid,
  label,
}: {
  item: NavItem;
  solid: boolean;
  label: string;
}) {
  const { lang } = useT();
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
        {label}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <Link to={item.to} className={`${base} inline-flex items-center gap-1`}>
        {label}
        <ChevronDown className="size-3.5 opacity-60" />
      </Link>
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
        <div className="bg-background border border-foreground/8 rounded-2xl shadow-xl py-3 min-w-[260px]">
          {item.children.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="block px-5 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/40 transition"
            >
              {lang === "zh" ? c.labelZh : c.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
