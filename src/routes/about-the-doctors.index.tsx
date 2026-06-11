import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import drAndrew from "@/assets/dr-andrew-tsai.webp.asset.json";
import drMarjorie from "@/assets/dr-marjorie-tsai.webp.asset.json";

export const Route = createFileRoute("/about-the-doctors/")({
  head: () => ({
    meta: [
      { title: "About the Doctors | Tsai Orthodontics" },
      {
        name: "description",
        content:
          "Meet the orthodontists at Tsai Orthodontics in Vancouver. Specialist care shaped by advanced training, precision, and personal attention.",
      },
      { property: "og:title", content: "About the Doctors | Tsai Orthodontics" },
      { property: "og:description", content: "Meet Dr. Andrew Tsai and Dr. Marjorie Tsai." },
      { property: "og:url", content: "/about-the-doctors" },
    ],
    links: [{ rel: "canonical", href: "/about-the-doctors" }],
  }),
  component: AboutTheDoctorsPage,
});

function AboutTheDoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Doctors"
        title={<>Specialist orthodontic care, <span className="italic font-normal">shaped by training and personal attention.</span></>}
        intro="Tsai Orthodontics is led by orthodontists who have completed the highest levels of training in the profession — and who believe great care begins with a real conversation."
      />

      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-14">
          {/* Dr. Andrew */}
          <article className="group">
            <Link to="/about-the-doctors/dr-andrew-tsai" className="block">
              <div className="overflow-hidden rounded-3xl mb-6 bg-foreground/5">
                <img
                  src={drAndrew.url}
                  alt="Dr. Andrew Tsai"
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-2">
                Certified Specialist
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-3">Dr. Andrew Tsai</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Trained through the Seven-Year Bio-Dental Program at the University of Pennsylvania and the orthodontic specialty program at the University of the Pacific. Diplomate of the American Board of Orthodontics, Fellow of the Royal College of Dentists of Canada.
              </p>
              <span className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] border-b border-primary pb-1">
                Meet Dr. Andrew Tsai <ArrowRight className="size-4" />
              </span>
            </Link>
          </article>

          {/* Dr. Marjorie */}
          <article className="group">
            <Link to="/about-the-doctors/dr-marjorie-tsai" className="block">
              <div className="overflow-hidden rounded-3xl mb-6 bg-secondary/50 aspect-[4/5] flex items-center justify-center">
                <span className="font-display text-5xl text-foreground/30">M.T.</span>
              </div>
              <div className="text-primary text-[11px] uppercase tracking-[0.25em] mb-2">
                Biography Coming Soon
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-3">Dr. Marjorie Tsai</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Dr. Marjorie Tsai's full biography will be added soon. Patients can expect the same thoughtful, family-centered approach that defines the Tsai Orthodontics experience.
              </p>
              <span className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] border-b border-primary pb-1">
                Learn More <ArrowRight className="size-4" />
              </span>
            </Link>
          </article>
        </div>
      </section>

      {/* Shared philosophy */}
      <section className="py-24 lg:py-32 bg-secondary/30 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">
            Our Philosophy
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
            Treatment should be clear before it begins.
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Specialist-level orthodontic planning, careful explanation, and warm communication shape every visit. Families leave appointments better informed, more confident, and with less anxiety than when they arrived.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 lg:py-32 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
        >
          Book a Consultation
        </Link>
      </section>
    </>
  );
}
