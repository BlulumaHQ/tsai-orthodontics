import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  logoSrc,
  logoAlt,
  textureSrc,
  textureAlt,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  logoSrc?: string;
  logoAlt?: string;
  /** Optional subtle clinic photograph used as a quiet architectural texture. */
  textureSrc?: string;
  textureAlt?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-36 lg:pt-44 pb-16 lg:pb-24 px-6 lg:px-10">
      {textureSrc && (
        <>
          {/* Texture: heavily desaturated, blurred clinic photo behind a near-opaque white wash */}
          <img
            src={textureSrc}
            alt={textureAlt ?? ""}
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover grayscale opacity-[0.18] blur-[28px] scale-110"
            loading="lazy"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-background/[0.93]"
          />
          {/* Soft vignette toward the bottom to ease into the next section */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background"
          />
        </>
      )}
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
