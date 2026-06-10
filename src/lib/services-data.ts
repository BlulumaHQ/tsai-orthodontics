export interface Service {
  slug: string;
  name: string;
  tagline: string;
  overview: string;
  who: string;
  benefits: string[];
  faqs: { q: string; a: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: "children-and-teens",
    name: "Children & Teens",
    tagline: "Care that grows with them.",
    overview:
      "We follow the natural rhythm of growth. From a child's first orthodontic evaluation through their teen years, our care is shaped around development, school schedules, and the small details that make a young patient feel at ease.",
    who: "Children from age seven onward, and teens preparing for or already in active treatment.",
    benefits: [
      "Specialist-led evaluations from age seven",
      "Treatment timed to natural development",
      "Family scheduling and sibling-friendly appointments",
      "A warm, unhurried environment",
    ],
    faqs: [
      { q: "When should my child have their first orthodontic visit?", a: "The Canadian Association of Orthodontists recommends an initial evaluation by age seven. Most children won't need treatment yet — but a single specialist visit gives us a baseline and identifies any issues that are easier to address early." },
      { q: "Does my child need braces if their teeth look straight?", a: "Sometimes. Crowding, bite issues, and jaw growth concerns can be invisible to the eye. Our evaluations are observational and unhurried — we only recommend treatment when there is a clear benefit." },
    ],
  },
  {
    slug: "adults",
    name: "Adults",
    tagline: "It is never too late.",
    overview:
      "Adult orthodontics today is quiet, discreet, and remarkably efficient. We work alongside busy professionals, new parents, and patients who finally have the time to invest in their smile — with treatment plans built around real life.",
    who: "Adults of any age seeking aesthetic refinement, bite correction, or a long-overdue change.",
    benefits: [
      "Discreet treatment options",
      "Appointments tailored to working schedules",
      "Specialist precision and aesthetic focus",
      "Considered, transparent planning",
    ],
    faqs: [
      { q: "Am I too old for orthodontic treatment?", a: "Healthy teeth and gums can be moved at any age. We routinely treat patients in their 30s, 40s, 50s, and beyond." },
      { q: "Will treatment interfere with my work?", a: "Most adult treatments are designed to be unobtrusive. Aligner therapy in particular requires very few in-office visits." },
    ],
  },
  {
    slug: "braces",
    name: "Braces",
    tagline: "Modern, refined, remarkably comfortable.",
    overview:
      "Today's braces are smaller, more precise, and more comfortable than a generation ago. We use a considered selection of bracket systems — including ceramic options — chosen for each patient's anatomy and aesthetic preferences.",
    who: "Patients of all ages who would benefit from comprehensive, fixed orthodontic treatment.",
    benefits: [
      "Precise tooth movement for complex cases",
      "Low-profile metal and ceramic options",
      "Predictable outcomes",
      "Specialist-led adjustments",
    ],
    faqs: [
      { q: "How long does braces treatment usually take?", a: "Comprehensive treatment typically takes 12 to 24 months. Your specific timeline depends on the complexity of your case and how your teeth respond." },
      { q: "Do braces hurt?", a: "There is mild tenderness for a few days after placement and after some adjustments. Most patients describe it as awareness rather than pain." },
    ],
  },
  {
    slug: "invisalign",
    name: "Invisalign",
    tagline: "Discreet aligners, specialist precision.",
    overview:
      "Invisalign works beautifully when planned by a specialist. Dr. Tsai personally designs each aligner sequence using digital scans and a deep understanding of how teeth move — so the treatment finishes the way the plan promises.",
    who: "Teens and adults who want a removable, near-invisible treatment option.",
    benefits: [
      "Clear, removable aligners",
      "Eat and brush as you normally would",
      "Fewer in-office visits",
      "Plans designed by a specialist, not software alone",
    ],
    faqs: [
      { q: "How often do I need to wear my aligners?", a: "Aligners should be worn 20 to 22 hours per day. They are removed for eating, drinking anything other than water, and brushing." },
      { q: "Can Invisalign treat complex cases?", a: "In specialist hands, yes — many cases that were once braces-only are now treatable with aligners. We will tell you honestly if a different approach would serve you better." },
    ],
  },
  {
    slug: "phase-i-treatment",
    name: "Phase I Treatment",
    tagline: "Early intervention, done thoughtfully.",
    overview:
      "Phase I treatment is short, focused care during the mixed dentition years — usually ages seven to ten. It addresses specific growth or bite issues while a child is still developing, so later treatment can be simpler or sometimes avoided altogether.",
    who: "Children with specific early concerns: crossbites, severe crowding, narrow palates, or thumb-related issues.",
    benefits: [
      "Guides healthy jaw growth",
      "Reduces the complexity of later treatment",
      "Addresses functional issues early",
      "Preserves space for permanent teeth",
    ],
    faqs: [
      { q: "Does every child need Phase I treatment?", a: "No. Most children do not. Phase I is recommended only when an early intervention will create a meaningfully better outcome." },
    ],
  },
  {
    slug: "airway-friendly-orthodontics",
    name: "Airway Friendly Orthodontics",
    tagline: "Orthodontics that respects how you breathe.",
    overview:
      "We consider the airway in every treatment plan. Orthodontic decisions can influence how a child sleeps and breathes for the rest of their life — so we plan with that in mind, working alongside ENTs, sleep physicians, and myofunctional therapists when appropriate.",
    who: "Children and adults with signs of restricted airway, snoring, mouth breathing, or sleep-disordered breathing.",
    benefits: [
      "Airway-conscious treatment planning",
      "Coordination with airway and sleep specialists",
      "Focus on facial development, not just teeth",
      "Long-term respiratory and sleep health",
    ],
    faqs: [
      { q: "How does orthodontics affect breathing?", a: "Jaw position and palatal width directly influence the size of the upper airway. Thoughtful orthodontics can support better airflow; less thoughtful planning can constrict it." },
    ],
  },
  {
    slug: "marpe",
    name: "MARPE",
    tagline: "Non-surgical palatal expansion for adults.",
    overview:
      "Mini-screw assisted rapid palatal expansion lets us widen the upper jaw of skeletally mature patients without surgery. It is an advanced specialist procedure with significant benefits for the right candidate — including airway and aesthetic improvements.",
    who: "Adults and older teens with narrow upper jaws, crossbites, or airway concerns.",
    benefits: [
      "Avoids surgical expansion in many cases",
      "Can improve nasal breathing",
      "Creates space for crowded teeth",
      "Performed by a trained specialist",
    ],
    faqs: [
      { q: "Is MARPE painful?", a: "There is pressure and tightness during active expansion, especially in the first few days. Most patients manage comfortably with over-the-counter pain relief." },
    ],
  },
  {
    slug: "retainers",
    name: "Retainers",
    tagline: "Protecting the result of your work.",
    overview:
      "A retainer is the quiet hero of orthodontic treatment. We design and fit retainers carefully, and we are here for the long term — adjustments, replacements, and check-ins — because the smile you finished with should be the smile you keep.",
    who: "Anyone finishing active treatment, and patients needing replacement retainers from prior care.",
    benefits: [
      "Custom fit using digital scans",
      "Fixed or removable options",
      "Long-term follow-up appointments",
      "Replacement support, including for treatment done elsewhere",
    ],
    faqs: [
      { q: "How long do I need to wear my retainer?", a: "Indefinitely, in some form. Teeth want to move throughout life — a retainer keeps them where you finished. Most patients move to nighttime wear after the first year." },
    ],
  },
];

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
);
