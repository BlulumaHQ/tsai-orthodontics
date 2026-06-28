import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  logoSrc,
  logoAlt,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  logoSrc?: string;
  logoAlt?: string;
}) {
  return (
    <section className="pt-36 lg:pt-44 pb-16 lg:pb-24 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        {logoSrc && (
          <img
            src={logoSrc}
            alt={logoAlt ?? ""}
            className="h-24 md:h-32 lg:h-40 w-auto mb-8 animate-fade-up"
          />
        )}
        {eyebrow && (
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] font-medium mb-6 animate-fade-up">
            {eyebrow}
          </div>
        )}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-balance animate-fade-up">
          {title}
        </h1>
        {intro && (
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty animate-fade-up [animation-delay:120ms]">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
