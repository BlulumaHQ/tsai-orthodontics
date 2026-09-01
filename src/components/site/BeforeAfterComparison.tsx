import { useCallback, useRef, useState } from "react";

/**
 * A quiet, dependency-free before/after image comparison.
 * Drag interaction is desktop-only (>=1024px); below that the two images
 * simply stack vertically via CSS — the same <img> elements are reused.
 */
export function BeforeAfterComparison({
  initialSrc,
  resultSrc,
  initialAlt,
  resultAlt,
  ariaLabel,
}: {
  initialSrc: string;
  resultSrc: string;
  initialAlt: string;
  resultAlt: string;
  ariaLabel: string;
}) {
  const [pos, setPos] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromEvent = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <div className="lg:contents">
      {/* Stacked (mobile / tablet) + overlay (desktop) share these images */}
      <div
        ref={frameRef}
        className="
          flex flex-col gap-3
          lg:block lg:relative lg:gap-0 lg:aspect-[5/3] lg:overflow-hidden
          lg:rounded-2xl lg:cursor-ew-resize lg:select-none lg:touch-none
        "
        onPointerDown={(e) => {
          if (typeof window !== "undefined" && window.innerWidth < 1024) return;
          draggingRef.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          updateFromEvent(e.clientX);
        }}
        onPointerMove={(e) => {
          if (!draggingRef.current) return;
          updateFromEvent(e.clientX);
        }}
        onPointerUp={(e) => {
          draggingRef.current = false;
          if (e.currentTarget.hasPointerCapture(e.pointerId))
            e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
      >
        <img
          src={initialSrc}
          alt={initialAlt}
          width={900}
          height={540}
          loading="lazy"
          decoding="async"
          className="w-full aspect-[5/3] object-cover rounded-2xl lg:rounded-none lg:absolute lg:inset-0 lg:h-full lg:aspect-auto"
        />
        <img
          src={resultSrc}
          alt={resultAlt}
          width={900}
          height={540}
          loading="lazy"
          decoding="async"
          className="w-full aspect-[5/3] object-cover rounded-2xl lg:rounded-none lg:absolute lg:inset-0 lg:h-full lg:aspect-auto"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        />

        {/* Divider + handle: desktop only */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-y-0 w-px bg-background/80"
          style={{ left: `${pos}%` }}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label={ariaLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-orientation="horizontal"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              setPos((p) => Math.max(0, p - 5));
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              setPos((p) => Math.min(100, p + 5));
            } else if (e.key === "Home") {
              e.preventDefault();
              setPos(0);
            } else if (e.key === "End") {
              e.preventDefault();
              setPos(100);
            }
          }}
          className="
            hidden lg:flex absolute top-1/2 -translate-y-1/2 -translate-x-1/2
            h-9 w-9 items-center justify-center rounded-full
            bg-background/90 text-foreground/70 ring-1 ring-foreground/15
            transition-transform duration-150 motion-reduce:transition-none
            hover:scale-110 focus:scale-110 focus:outline-none
            focus-visible:ring-2 focus-visible:ring-primary
          "
          style={{ left: `${pos}%` }}
        >
          <svg
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 1 1 5l4 4M13 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
