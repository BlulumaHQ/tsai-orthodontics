import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Review = { name: string; text: string };

export const GOOGLE_REVIEWS: Review[] = [
  {
    name: "Kenneth Ng",
    text: "Hands down the best orthodontist I've been to! I recently started my Invisalign treatment with Dr. Andrew Tsai and am very pleased with the process so far. The entire team is friendly, professional and caring. Highly recommend to anyone looking for an orthodontist",
  },
  {
    name: "Sarah Cheung",
    text: "Very happy with my experience doing Invisalign with Dr. Andrew Tsai. The entire process was smooth and Dr. Tsai was always warm and welcoming. I'm thrilled with the results and would highly recommend them to anyone looking for high-quality invisalign!",
  },
  {
    name: "Arvin Liao",
    text: "Great experience. The staff were friendly, professional, and made me feel comfortable throughout the whole visit. Everything was explained clearly, and the dentist was very thorough.",
  },
  { name: "林林", text: "Dr. Tsai is very good! 👍👍👍" },
  {
    name: "George Lin",
    text: "After considering invisalign for quite a while, I finally committed and am pleased to have entrusted Dr. Andrew Tsai with handling my treatment. Him and his staff have been informative throughout the process and so far it’s been seamless. I can’t wait to see the final results!",
  },
  {
    name: "Young Lee",
    text: "I came here as I had tons of ortho work done many years ago through various dentists and needed a new one in Vancouver to make sure I haven't regressed. Dr. Tsai was super knowledgeable, personable, and professional in reviewing my super ...",
  },
  {
    name: "Jeffrey Roseth",
    text: "Dr. Tsai is the best! Very personable, knowledgeable and trustworthy. Communication throughout the process was excellent as well as the results! Would highly recommend to anyone seeking orthodontic treatment.",
  },
  {
    name: "Alvin Tsuei",
    text: "I had a great experience with Dr. Andrew Tsai for my Invisalign treatment! He always took time to explain the process, answer my questions, and make sure I was comfortable with the plan. He’s also very personable and friendly and I felt like I was in good hands the entire time. Would highly recommend!",
  },
];

function usePerView() {
  const [pv, setPv] = useState(3);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPv(w < 768 ? 1 : w < 1024 ? 2 : 3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return pv;
}

export function ReviewsCarousel({ reviews = GOOGLE_REVIEWS }: { reviews?: Review[] }) {
  const n = reviews.length;
  const perView = usePerView();
  const items = [...reviews, ...reviews, ...reviews];
  const [index, setIndex] = useState(n);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const next = () => {
    setAnimate(true);
    setIndex((i) => i + 1);
  };
  const prev = () => {
    setAnimate(true);
    setIndex((i) => i - 1);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused]);

  const onTransitionEnd = () => {
    if (index >= 2 * n || index < n) {
      setAnimate(false);
      setIndex((i) => ((i % n) + n) % n + n);
    }
  };

  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  const active = ((index % n) + n) % n;
  const arrowCls =
    "flex items-center justify-center size-11 rounded-full border border-foreground/15 bg-background text-foreground hover:border-primary hover:text-primary transition-colors";

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div
        className="overflow-hidden"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
          setPaused(true);
        }}
        onTouchEnd={(e) => {
          if (touchX.current !== null) {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (dx < -40) next();
            else if (dx > 40) prev();
          }
          touchX.current = null;
          setPaused(false);
        }}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${(index * 100) / perView}%)`,
            transition: animate ? "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {items.map((r, i) => (
            <div
              key={i}
              className="shrink-0 px-2 lg:px-2.5"
              style={{ width: `${100 / perView}%` }}
              aria-hidden={i < index || i >= index + perView}
            >
              <article className="h-full bg-background rounded-3xl border border-foreground/10 p-6 lg:p-7 flex flex-col">
                <div className="text-base font-medium text-foreground mb-2">{r.name}</div>
                <div
                  className="tracking-widest text-base mb-4"
                  style={{ color: "#E5A823" }}
                  aria-label="5 out of 5 stars"
                >
                  ★★★★★
                </div>
                <p className="text-foreground/85 leading-relaxed text-[14px] flex-1">
                  &ldquo;{r.text}&rdquo;
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button type="button" onClick={prev} className={arrowCls} aria-label="Previous review">
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex gap-2">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => {
                setAnimate(true);
                setIndex(n + i);
              }}
              aria-label={`Go to review ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-primary" : "w-2 bg-foreground/20"
              }`}
            />
          ))}
        </div>
        <button type="button" onClick={next} className={arrowCls} aria-label="Next review">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
