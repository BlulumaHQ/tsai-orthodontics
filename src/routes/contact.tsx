import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ConsultationForm } from "@/components/site/ConsultationForm";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Tsai Orthodontics, Vancouver" },
      {
        name: "description",
        content:
          "Visit Tsai Orthodontics at 3431 Main Street, Vancouver. Book your complimentary consultation, or call 604-708-8138.",
      },
      { property: "og:title", content: "Contact Tsai Orthodontics" },
      { property: "og:description", content: "Book your complimentary specialist consultation in Vancouver." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const mapQuery = encodeURIComponent(
    `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}`
  );
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Come and <span className="italic font-normal">say hello.</span></>}
        intro="Your first consultation is complimentary. Send us a note below, or call — we are happy either way."
      />

      <section className="px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-foreground/5 rounded-3xl p-8 lg:p-12 shadow-sm">
              <h2 className="font-display text-3xl mb-8">Request a consultation</h2>
              <ConsultationForm />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-3">Visit</div>
              <address className="not-italic font-display text-2xl leading-snug">
                {SITE.address.street}<br />
                {SITE.address.city}, {SITE.address.region}<br />
                {SITE.address.postal}
              </address>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-3">Call</div>
              <a href={SITE.phoneHref} className="font-display text-2xl block hover:text-primary transition">
                {SITE.phone}
              </a>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-3">Email</div>
              <a href={`mailto:${SITE.email}`} className="font-display text-2xl block hover:text-primary transition break-all">
                {SITE.email}
              </a>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-3">Hours</div>
              <ul className="space-y-2 text-base text-foreground/85">
                {SITE.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6">
                    <span>{h.day}</span>
                    <span className="text-muted-foreground">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-foreground/5">
          <iframe
            title="Tsai Orthodontics location"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            width="100%"
            height="500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full"
          />
        </div>
      </section>
    </>
  );
}
