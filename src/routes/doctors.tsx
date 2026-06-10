import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import drTsai from "@/assets/dr-tsai.jpg";

const TIMELINE = [
  { year: "Foundation", title: "Doctor of Dental Medicine", body: "Comprehensive dental training establishing the clinical foundation that underpins every specialist decision." },
  { year: "Specialty", title: "Master's & Certificate in Orthodontics", body: "Two to three years of full-time post-graduate training focused exclusively on tooth movement, growth, and facial development." },
  { year: "Research", title: "Published Research", body: "Peer-reviewed contributions to the orthodontic literature — keeping clinical practice rooted in evidence." },
  { year: "Certification", title: "Board Certification", body: "Voluntary advanced examination demonstrating ongoing commitment to the highest standards of specialist care." },
  { year: "Continuing", title: "Advanced Education", body: "Ongoing study in airway-conscious orthodontics, MARPE, digital workflow, and aesthetic finishing — never finished, always learning." },
];

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Meet Dr. Tsai — Specialist Orthodontist, Vancouver" },
      {
        name: "description",
        content:
          "Dr. Tsai is a certified specialist orthodontist in Vancouver, with university training, published research, and a commitment to family-centered care.",
      },
      { property: "og:title", content: "Meet Dr. Tsai" },
      { property: "og:description", content: "A certified specialist orthodontist in Vancouver, building long relationships through considered care." },
      { property: "og:url", content: "/doctors" },
    ],
    links: [{ rel: "canonical", href: "/doctors" }],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet the Doctors"
        title={<>Hello — <span className="italic font-normal">I'm Dr. Tsai.</span></>}
        intro="A certified specialist in orthodontics, a lifelong student of facial development, and the person who will personally design your treatment plan."
      />

      {/* Portrait + bio */}
      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl sticky top-28">
              <img src={drTsai} alt="Dr. Tsai" className="w-full aspect-[4/5] object-cover" loading="lazy" />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              I trained as a dentist first, and then committed to several more years of full-time specialist study in orthodontics. That additional training is what makes the difference — it is the reason I can tell a parent honestly when a child does not yet need treatment, and the reason I can quietly recommend it when they do.
            </p>
            <p>
              My approach has been shaped as much by what I've seen go wrong in other practices as by what I learned in school. Treatment that ignores the airway. Aligners designed by software instead of a person. Patients moved through like inventory. I built this practice to be the opposite of all that.
            </p>
            <p>
              I see every patient personally. I design every plan personally. And I would rather see fewer families a year and know each of them well, than the other way around.
            </p>
            <p className="font-display italic text-2xl text-foreground pt-4">
              — Dr. Tsai
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
            Personal Philosophy
          </div>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-balance">
            "A finished smile should look like it was always there. Specialist orthodontics, done well, is invisible work."
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6">
            Extended Learning & Expertise
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-16 text-balance">
            Years of training that quietly stand behind every appointment.
          </h2>
          <div className="space-y-0">
            {TIMELINE.map((t, i) => (
              <div
                key={t.title}
                className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 border-t border-foreground/10 last:border-b"
              >
                <div className="md:col-span-3">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-primary font-medium">
                    Stage {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">{t.year}</div>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl md:text-3xl mb-3">{t.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty max-w-2xl">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-10 text-balance">
            Meet in person.
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
