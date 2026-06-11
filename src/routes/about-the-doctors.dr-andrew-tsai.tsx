import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import drTsai from "@/assets/dr-tsai.jpg";

const EDUCATION = [
  { year: "Penn", title: "Seven-Year Bio-Dental Program", body: "University of Pennsylvania — undergraduate degree and Doctor of Dental Medicine." },
  { year: "DMD", title: "Doctor of Dental Medicine", body: "Conferred by the University of Pennsylvania School of Dental Medicine." },
  { year: "Ortho", title: "Specialty Training in Orthodontics", body: "University of the Pacific, Arthur A. Dugoni School of Dentistry in San Francisco — one of the leading programs in the world for clear aligner treatment." },
  { year: "Cert.", title: "Certificate in Orthodontics", body: "Awarded on completion of full-time specialty training." },
  { year: "MSD", title: "Master of Science in Dentistry", body: "Master's thesis on the stability of clear aligner treatment for mixed dentition children — published in the American Journal of Orthodontics and Dentofacial Orthopedics." },
];

const CREDENTIALS = [
  "Certified Specialist in Orthodontics and Dentofacial Orthopedics",
  "Fellow of the Royal College of Dentists of Canada",
  "Diplomate of the American Board of Orthodontics",
];

const CLINICAL_FOCUS = [
  "Clear aligners",
  "Traditional braces",
  "Early interceptive orthodontic treatment",
  "Care for children, teens, and adults",
];

export const Route = createFileRoute("/about-the-doctors/dr-andrew-tsai")({
  head: () => ({
    meta: [
      { title: "Dr. Andrew Tsai | Tsai Orthodontics" },
      {
        name: "description",
        content:
          "Dr. Andrew Tsai is a Certified Specialist in Orthodontics and Dentofacial Orthopedics in Vancouver, with advanced training from the University of Pennsylvania and the University of the Pacific.",
      },
      { property: "og:title", content: "Dr. Andrew Tsai | Tsai Orthodontics" },
      { property: "og:description", content: "Diplomate of the American Board of Orthodontics. Fellow of the Royal College of Dentists of Canada." },
      { property: "og:url", content: "/about-the-doctors/dr-andrew-tsai" },
    ],
    links: [{ rel: "canonical", href: "/about-the-doctors/dr-andrew-tsai" }],
  }),
  component: DrAndrewPage,
});

function DrAndrewPage() {
  return (
    <>
      <PageHero
        eyebrow="Dr. Andrew Tsai"
        title={<>Certified Specialist in <span className="italic font-normal">Orthodontics and Dentofacial Orthopedics.</span></>}
        intro="Born in Taipei, Taiwan and raised in Vancouver, BC — Dr. Andrew grew up inspired by his parents' love for dentistry and the impact it had on helping others."
      />

      {/* Portrait + intro */}
      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl">
              <img src={drTsai} alt="Dr. Andrew Tsai" className="w-full aspect-[4/5] object-cover" loading="lazy" />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              Dr. Andrew Tsai is a Certified Specialist in Orthodontics and Dentofacial Orthopedics. He has completed the highest levels of certification within the profession and has the rare distinction of being both a Fellow of the Royal College of Dentists of Canada and a Diplomate of the American Board of Orthodontics.
            </p>
            <p>
              He is passionate about helping patients of all ages achieve healthy, beautiful smiles that boost their confidence and improve their overall well-being. He offers the latest treatment options including clear aligners, traditional braces, and early interceptive orthodontic treatment.
            </p>
            <p className="text-foreground/70">
              Outside the office, Dr. Andrew enjoys exploring hiking trails, discovering new restaurants, and working on his golf game.
            </p>
          </div>
        </div>
      </section>

      {/* Education timeline */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">Education & Training</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-16 max-w-2xl text-balance">
            A path defined by depth, not shortcuts.
          </h2>
          <ol className="relative border-l border-foreground/15 ml-3 space-y-12">
            {EDUCATION.map((e) => (
              <li key={e.title} className="pl-8">
                <span className="absolute -left-[7px] mt-2 size-3.5 rounded-full bg-primary border-4 border-secondary" />
                <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-2">{e.year}</div>
                <h3 className="font-display text-2xl mb-2">{e.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">{e.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">Specialist Credentials</div>
            <h3 className="font-display text-3xl md:text-4xl mb-8 leading-tight">The highest levels of certification in the profession.</h3>
            <ul className="space-y-4">
              {CREDENTIALS.map((c) => (
                <li key={c} className="flex gap-4 border-t border-foreground/10 pt-4 text-foreground/85">
                  <span className="text-primary font-mono text-xs mt-1">◆</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">Clinical Focus</div>
            <h3 className="font-display text-3xl md:text-4xl mb-8 leading-tight">Care designed around each patient's needs.</h3>
            <ul className="space-y-4">
              {CLINICAL_FOCUS.map((c) => (
                <li key={c} className="flex gap-4 border-t border-foreground/10 pt-4 text-foreground/85">
                  <span className="text-primary font-mono text-xs mt-1">◆</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 lg:py-32 bg-foreground text-background px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-5">Patient Philosophy</div>
          <p className="font-display text-3xl md:text-4xl leading-snug text-balance">
            "Dr. Andrew helps patients understand their options clearly and feel comfortable with the treatment plan before moving forward."
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 text-center">
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
