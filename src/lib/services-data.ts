import journeyKids from "@/assets/journey-kids.jpg";
import journeyTeens from "@/assets/journey-teens.jpg";
import journeyAdults from "@/assets/journey-adults.jpg";
import journeyParents from "@/assets/journey-parents.jpg";
import svcBraces from "@/assets/svc-braces.jpg";
import svcInvisalign from "@/assets/svc-invisalign.jpg";
import svcRetainers from "@/assets/svc-retainers.jpg";
import svcMarpe from "@/assets/svc-marpe.jpg";
import svcAirway from "@/assets/svc-airway.jpg";

export type ServiceVariant =
  | "warm"
  | "editorial"
  | "clinical"
  | "brand"
  | "advisory"
  | "considered"
  | "longterm";

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceHighlight {
  label: string;
  value: string;
}

export interface ServiceTestimonial {
  quote: string;
  attribution: string;
}

export interface Service {
  slug: string;
  name: string;
  /** Short card description for grids/overviews */
  short: string;
  /** Long-form hero headline shown as H1 on the detail page */
  heroTitle: string;
  /** Optional supporting line under the headline (kept short) */
  heroLead?: string;
  /** Multi-paragraph intro (split on \n\n) */
  intro: string;
  /** Section label for the bullet list (varies per service) */
  whenLabel: string;
  /** Bullet list shown under the whenLabel */
  when: string[];
  /** Optional second bullet list — "What to expect" or similar */
  expectLabel?: string;
  expect?: string[];
  /** Short "Why Tsai Orthodontics" paragraph */
  whyUs: string;
  /** Optional pull quote (used by advisory layout) */
  pullQuote?: string;
  /** Optional patient testimonial */
  testimonial?: ServiceTestimonial;
  /** Related service slugs */
  related: string[];
  /** Hero image */
  image: string;
  /** Layout variant — each page renders a different hero/layout */
  variant: ServiceVariant;
  /** Spec/data block — different per service */
  highlights: ServiceHighlight[];
  /** Unique per-service FAQs */
  faqs: ServiceFAQ[];
  /** Optional brand mark label (e.g. "Invisalign Provider") */
  brandMark?: string;
  /** CTA button label used on home grid + service nav */
  ctaLabel: string;
  metaTitle: string;
  metaDescription: string;
}

export const SERVICES: Service[] = [
  {
    slug: "children-and-teens",
    name: "Children & Teens",
    short:
      "Orthodontic care timed around a child or teen's natural growth — not a template.",
    heroTitle: "Orthodontic Care That Grows With Your Child",
    heroLead:
      "Specialist evaluations, careful timing, and an experience that feels calm for kids and clear for parents.",
    intro:
      "Children and teenagers develop at different rates. Some benefit from early guidance, while others simply need careful monitoring until the right time.\n\nAt Tsai Orthodontics, treatment is timed around natural growth rather than rushing into unnecessary appliances. The goal is to create healthy function, balanced development, and a smile that will last.",
    whenLabel: "When Treatment May Help",
    when: [
      "Crowded teeth",
      "Bite problems",
      "Teeth erupting in unusual positions",
      "Jaw growth concerns",
      "Monitoring developing smiles",
    ],
    expectLabel: "What Families Can Expect",
    expect: [
      "Careful evaluation",
      "Clear explanation",
      "Growth monitoring when appropriate",
      "Treatment only when beneficial",
    ],
    whyUs:
      "Parents should leave understanding exactly what is happening and why. Some children need treatment now. Others simply need time.",
    testimonial: {
      quote:
        "Dr. Tsai took the time to actually explain what was going on. We didn't feel rushed into braces, and that made all the difference.",
      attribution: "Parent of a 9-year-old patient",
    },
    variant: "warm",
    highlights: [
      { label: "First evaluation", value: "Age 7" },
      { label: "Consultation", value: "Complimentary" },
      { label: "Languages", value: "EN · 中文 · 廣東話" },
    ],
    faqs: [
      {
        q: "Does every child need braces?",
        a: "No. Many children only require observation. We monitor growth and only recommend treatment when there is a clear clinical reason.",
      },
      {
        q: "When should my child first visit?",
        a: "Around age seven is often recommended. Most early visits result in a simple monitoring plan rather than treatment.",
      },
      {
        q: "How long does teen treatment usually take?",
        a: "Most comprehensive teen cases run 12–24 months, depending on complexity. We give a realistic estimate at the consultation rather than a marketing number.",
      },
      {
        q: "Do you offer Invisalign for teens?",
        a: "Yes, when it is the right fit clinically. The decision is based on the case rather than family preference alone.",
      },
    ],
    related: ["phase-i-treatment", "braces-and-fixed-appliances", "invisalign", "retainers"],
    image: journeyKids,
    ctaLabel: "Explore Children's Orthodontics",
    metaTitle: "Orthodontics for Children & Teens — Tsai Orthodontics Vancouver",
    metaDescription:
      "Specialist orthodontic care for children and teens in Vancouver. Calm consultations, clear timing, and treatment shaped around your child's development.",
  },
  {
    slug: "adults",
    name: "Adults",
    short: "Discreet, considered orthodontic treatment planned around real life.",
    heroTitle: "Orthodontic Treatment That Fits Real Life",
    heroLead:
      "Clear options, discreet solutions, and specialist guidance for adult patients.",
    intro:
      "Many adults missed orthodontic treatment when they were younger. Others notice their teeth have shifted over time.\n\nModern orthodontics allows adults to improve both appearance and function while balancing work, family, and everyday commitments.",
    whenLabel: "Common Reasons Adults Seek Treatment",
    when: [
      "Crowding",
      "Relapse after childhood braces",
      "Bite discomfort",
      "Cosmetic concerns",
      "Preparation for dental work",
    ],
    whyUs:
      "Adult patients often have different priorities. Treatment should feel practical, comfortable, and clearly planned.",
    testimonial: {
      quote:
        "I'd been thinking about treatment for years. Dr. Tsai walked me through the options without any pressure — I finally felt ready.",
      attribution: "Adult Invisalign patient",
    },
    variant: "editorial",
    highlights: [
      { label: "Common options", value: "Invisalign · Braces" },
      { label: "Typical timeline", value: "9–24 months" },
      { label: "Discretion", value: "Aligners or clear brackets" },
    ],
    faqs: [
      {
        q: "Am I too old for orthodontic treatment?",
        a: "Teeth respond to orthodontic forces at any age. We routinely treat adults in their 30s, 40s, 50s, and beyond. What changes is the diagnosis — adult cases often involve gum health, prior dental work, or shifting after previous orthodontics.",
      },
      {
        q: "Will treatment interfere with my work?",
        a: "Most adult appointments are brief and can be scheduled before work or during lunch. Clear aligners and tooth-coloured options make the day-to-day experience discreet.",
      },
      {
        q: "What if I had braces years ago and my teeth shifted?",
        a: "This is common — it usually means retainers were not worn long enough. A limited treatment with aligners or a short course of braces, followed by lifetime retention, often resolves it.",
      },
      {
        q: "Do I need a referral from my dentist?",
        a: "No referral is needed to book a consultation. We do coordinate closely with your general dentist when treatment begins.",
      },
    ],
    related: ["invisalign", "braces-and-fixed-appliances", "retainers"],
    image: journeyAdults,
    ctaLabel: "Explore Adult Treatment",
    metaTitle: "Adult Orthodontics — Tsai Orthodontics Vancouver",
    metaDescription:
      "Specialist orthodontic care for adults in Vancouver. Discreet treatment options, careful planning, and clear answers from Dr. Andrew Tsai.",
  },
  {
    slug: "braces-and-fixed-appliances",
    name: "Braces & Fixed Appliances",
    short: "Precise, dependable tooth movement — the original orthodontic technology, refined.",
    heroTitle: "Reliable Solutions With Proven Results",
    heroLead:
      "Modern fixed appliances for precise tooth movement and carefully planned results.",
    intro:
      "Fixed appliances remain one of the most effective ways to guide tooth movement with precision.\n\nToday's braces are smaller and more comfortable while allowing excellent control over complex orthodontic treatment.",
    whenLabel: "Suitable For",
    when: [
      "Crowding",
      "Spacing",
      "Overbite",
      "Underbite",
      "Crossbite",
      "Complex alignment",
    ],
    whyUs:
      "Braces are not outdated — they remain a powerful, predictable tool when used with careful planning. We recommend them when they are the right fit for the patient, not because one option is promoted over another.",
    testimonial: {
      quote:
        "I expected braces to be a hassle. The visits were short, and I always knew what was happening at each step.",
      attribution: "Teen braces patient",
    },
    variant: "clinical",
    highlights: [
      { label: "Bracket options", value: "Metal · Ceramic" },
      { label: "Adjustment visits", value: "Every 6–8 weeks" },
      { label: "Best for", value: "Complex tooth movement" },
    ],
    faqs: [
      {
        q: "Do modern braces still hurt?",
        a: "Today's brackets are smaller and use lighter, more efficient wires than a decade ago. Most patients describe mild pressure for a few days after each adjustment, not pain.",
      },
      {
        q: "What's the difference between metal and ceramic braces?",
        a: "Ceramic brackets are tooth-coloured and far less visible. They function similarly to metal but require careful handling. We will explain which is appropriate for your case.",
      },
      {
        q: "Are there foods I'll need to avoid?",
        a: "Yes — anything very hard, sticky, or chewy (whole apples, hard candies, gum, bagels) can damage brackets. We give you a clear list, not a vague warning.",
      },
      {
        q: "How often will I need to come in?",
        a: "Most patients are seen every six to eight weeks for adjustments. Visits are short and predictable.",
      },
    ],
    related: ["children-and-teens", "adults", "retainers"],
    image: svcBraces,
    ctaLabel: "Explore Braces",
    metaTitle: "Braces & Fixed Appliances — Tsai Orthodontics Vancouver",
    metaDescription:
      "Modern braces and fixed orthodontic appliances in Vancouver, planned and supervised by specialist orthodontist Dr. Andrew Tsai.",
  },
  {
    slug: "invisalign",
    name: "Invisalign",
    short: "Clear aligner treatment planned with specialist-level attention.",
    heroTitle: "A Clear Approach To Orthodontic Care",
    heroLead:
      "Discreet, removable, and digitally planned — supervised by a specialist orthodontist.",
    intro:
      "For many patients, clear aligners provide a discreet way to straighten teeth without traditional braces.\n\nTreatment is digitally planned and carefully monitored to achieve predictable results.",
    whenLabel: "Benefits",
    when: [
      "Nearly invisible",
      "Removable",
      "Comfortable",
      "Easier daily hygiene",
    ],
    whyUs:
      "Dr. Andrew Tsai completed advanced orthodontic training at the University of the Pacific, Arthur A. Dugoni School of Dentistry in San Francisco — one of the leading programs for clear aligner treatment. Each stage of movement is planned personally rather than left to a software default.",
    testimonial: {
      quote:
        "Most people had no idea I was in treatment. I just kept living my life and the aligners did their work.",
      attribution: "Adult Invisalign patient",
    },
    variant: "brand",
    brandMark: "Invisalign Provider",
    highlights: [
      { label: "Daily wear", value: "20–22 hours" },
      { label: "Aligner changes", value: "Every 1–2 weeks" },
      { label: "Check-ins", value: "Every 8–10 weeks" },
    ],
    faqs: [
      {
        q: "How is Invisalign at a specialist office different?",
        a: "The technology is the same, but the diagnosis and treatment plan are not. An orthodontist designs each stage of movement personally rather than approving a software default. That decision drives the result.",
      },
      {
        q: "Will Invisalign work for my case?",
        a: "Not for everyone. We evaluate the bite, root anatomy, and the type of movement needed. If braces will give you a more predictable result, we will say so.",
      },
      {
        q: "How long does Invisalign treatment take?",
        a: "Most adult cases take 9–18 months. Comprehensive teen cases can run longer. The honest variable is daily wear — under 22 hours a day slows everything down.",
      },
      {
        q: "What happens after the aligners are done?",
        a: "Retainers, always. Without retention, teeth drift back toward their original positions over time. This is true for every orthodontic treatment, not just Invisalign.",
      },
    ],
    related: ["adults", "children-and-teens", "retainers"],
    image: svcInvisalign,
    ctaLabel: "Explore Invisalign",
    metaTitle: "Invisalign Clear Aligners — Tsai Orthodontics Vancouver",
    metaDescription:
      "Specialist-led Invisalign clear aligner treatment in Vancouver. Careful diagnosis and personalized planning from Dr. Andrew Tsai.",
  },
  {
    slug: "phase-i-treatment",
    name: "Phase I Treatment",
    short: "Early orthodontic guidance for children — only when it will genuinely help.",
    heroTitle: "Early Guidance When It Truly Makes A Difference",
    heroLead:
      "Phase I is not for every child. It is recommended only when early intervention will simplify what comes later.",
    intro:
      "Phase I treatment is not recommended for every child.\n\nWhen growth patterns suggest future problems, early intervention may help guide development and simplify later treatment.",
    whenLabel: "Goals",
    when: [
      "Guide jaw growth",
      "Create space",
      "Reduce future complexity",
      "Improve developing bite",
    ],
    whyUs:
      "Not every child needs Phase I treatment. We give parents a clear answer about what we see, what can wait, and what may benefit from earlier attention — without pressure either way.",
    pullQuote:
      "Not sure if it's the right time? Come in. We'll take a look and give you a straight answer — no pressure.",
    testimonial: {
      quote:
        "We were ready to start treatment. Dr. Tsai told us to wait six months and come back. That kind of honesty is rare.",
      attribution: "Parent of a 7-year-old patient",
    },
    variant: "advisory",
    highlights: [
      { label: "Typical age range", value: "7–10" },
      { label: "Visit length", value: "About 45 minutes" },
      { label: "Outcome", value: "Honest recommendation" },
    ],
    faqs: [
      {
        q: "What does Phase I treatment actually do?",
        a: "It addresses specific developing problems — crossbites, severe crowding, jaw growth imbalances, harmful habits — while a child is still growing. It does not replace full orthodontics later, but it can make Phase II simpler.",
      },
      {
        q: "Will my child still need braces later?",
        a: "Most likely, yes. Phase I makes the second phase shorter and more predictable; it rarely eliminates the need for it entirely. We will be honest about that from the start.",
      },
      {
        q: "Are you going to pressure us into early treatment?",
        a: "No. We see many children whose best plan is to wait and monitor. If your child does not need Phase I, we will say so plainly and book a follow-up to check in.",
      },
      {
        q: "How is Phase I different from regular orthodontic treatment?",
        a: "It is shorter, more targeted, and uses simpler appliances. The goal is to guide growth, not to finish a smile — that comes later when all the permanent teeth are in.",
      },
    ],
    related: ["children-and-teens", "airway-friendly-orthodontics", "marpe"],
    image: journeyParents,
    ctaLabel: "Explore Phase I Treatment",
    metaTitle: "Phase I Early Orthodontic Treatment — Tsai Orthodontics Vancouver",
    metaDescription:
      "Early interceptive orthodontic treatment for children in Vancouver. Honest guidance from a specialist on whether your child needs Phase I care.",
  },
  {
    slug: "airway-friendly-orthodontics",
    name: "Airway Friendly Orthodontics",
    short:
      "Orthodontic planning that considers growth, structure, and the bigger picture.",
    heroTitle: "Looking Beyond The Teeth",
    heroLead:
      "Careful evaluation of growth, structure, and bite — not just alignment.",
    intro:
      "Orthodontic planning should consider more than alignment alone.\n\nGrowth, facial structure, and airway development are all part of the bigger picture when evaluating young patients.",
    whenLabel: "Our Philosophy",
    when: [
      "Considered evaluation of growth and structure",
      "Careful attention to arch development",
      "Coordination with other healthcare providers when relevant",
      "Honest scope — orthodontics is not a medical diagnosis",
    ],
    whyUs:
      "We believe every patient deserves an evaluation that considers overall development rather than focusing only on straight teeth.",
    testimonial: {
      quote:
        "Dr. Tsai connected the dots between things our other providers had each looked at separately. It felt thorough.",
      attribution: "Parent of a Phase I patient",
    },
    variant: "considered",
    highlights: [
      { label: "Imaging", value: "3D & cephalometric" },
      { label: "Collaboration", value: "ENT · sleep · pediatrics" },
      { label: "Approach", value: "Evidence-based" },
    ],
    faqs: [
      {
        q: "Can orthodontics cure sleep apnea?",
        a: "No — and we will not claim it can. Sleep apnea is a medical diagnosis. Orthodontics can sometimes support breathing-related care by improving jaw and arch development, but that is a supporting role, not a cure.",
      },
      {
        q: "What does an airway-friendly evaluation include?",
        a: "A careful look at jaw growth, arch width, tongue posture, breathing patterns, and bite relationships — plus 3D imaging when appropriate. We then explain what orthodontics can address and what should be referred to other providers.",
      },
      {
        q: "Does every patient need this kind of evaluation?",
        a: "No. We consider airway factors in every diagnosis, but we only build treatment around them when the clinical picture genuinely calls for it.",
      },
      {
        q: "Who else might be involved in care?",
        a: "Depending on the case: your general dentist, an ENT, a sleep physician, a pediatrician, or a myofunctional therapist. We coordinate, we do not replace.",
      },
    ],
    related: ["phase-i-treatment", "marpe", "children-and-teens"],
    image: svcAirway,
    ctaLabel: "Explore Airway Friendly Care",
    metaTitle: "Airway Friendly Orthodontics — Tsai Orthodontics Vancouver",
    metaDescription:
      "Thoughtful, airway-aware orthodontic planning in Vancouver. Careful evaluation of growth, structure, and bite from a certified specialist.",
  },
  {
    slug: "marpe",
    name: "MARPE",
    short: "Miniscrew-assisted rapid palatal expansion for selected orthodontic cases.",
    heroTitle: "Advanced Expansion For Selected Cases",
    heroLead:
      "A specialised expansion technique used only when careful evaluation indicates it is the right tool.",
    intro:
      "MARPE (Miniscrew-Assisted Rapid Palatal Expansion) is an advanced technique used for carefully selected patients who require skeletal expansion.\n\nNot every patient is a candidate, which is why careful evaluation is essential.",
    whenLabel: "Benefits",
    when: [
      "Skeletal expansion",
      "Improved arch development",
      "Reduced need for surgery in some cases",
      "Specialist planning",
    ],
    whyUs:
      "MARPE is not for every patient. Recommendations are based on diagnosis, growth stage, anatomy, and treatment goals. We explain the purpose, process, and limitations clearly before moving forward.",
    testimonial: {
      quote:
        "I'd been told I would need jaw surgery elsewhere. Dr. Tsai explained MARPE clearly and gave me an alternative path to consider.",
      attribution: "Adult MARPE patient",
    },
    variant: "clinical",
    highlights: [
      { label: "Full name", value: "Miniscrew-Assisted Rapid Palatal Expansion" },
      { label: "Active phase", value: "Several weeks" },
      { label: "Typical candidate", value: "Older teens & adults" },
    ],
    faqs: [
      {
        q: "How is MARPE different from a traditional expander?",
        a: "A traditional expander pushes on the teeth; MARPE anchors directly to the palate using small miniscrews, applying force to the bone itself. That allows skeletal expansion in patients whose palatal suture is already fused.",
      },
      {
        q: "Is the procedure painful?",
        a: "Miniscrew placement is done with local anesthetic and most patients describe pressure rather than pain. The active expansion phase causes brief tightness for the first few days.",
      },
      {
        q: "How long does the appliance stay in?",
        a: "Active expansion usually takes several weeks. The appliance then stays in place for a retention period — typically a few months — while the new bone consolidates.",
      },
      {
        q: "Will I still need braces or aligners afterward?",
        a: "In most cases, yes. MARPE creates the foundation; comprehensive orthodontics finishes the bite and alignment.",
      },
    ],
    related: ["airway-friendly-orthodontics", "phase-i-treatment", "adults"],
    image: svcMarpe,
    ctaLabel: "Explore MARPE",
    metaTitle: "MARPE Palatal Expansion — Tsai Orthodontics Vancouver",
    metaDescription:
      "Miniscrew-Assisted Rapid Palatal Expansion (MARPE) for selected orthodontic cases in Vancouver. Specialist diagnosis and planning by Dr. Andrew Tsai.",
  },
  {
    slug: "retainers",
    name: "Retainers",
    short: "Protecting the result of your treatment with thoughtful, long-term retention care.",
    heroTitle: "Keeping Your Smile Stable",
    heroLead:
      "Retainers preserve the result you worked hard to achieve.",
    intro:
      "Orthodontic treatment does not end when appliances come off.\n\nRetainers help preserve the result you worked hard to achieve and reduce the natural tendency for teeth to shift over time.",
    whenLabel: "Retention Care",
    when: [
      "Clear retainers",
      "Fixed retainers",
      "Replacement retainers",
      "Long-term maintenance",
    ],
    whyUs:
      "We explain how and when to wear retainers based on each patient's needs. Retainers work best when patients understand why they matter and how to care for them properly.",
    testimonial: {
      quote:
        "I lost my retainer years after braces and my teeth had shifted. Dr. Tsai sorted it out without making me feel bad about it.",
      attribution: "Returning adult patient",
    },
    variant: "longterm",
    highlights: [
      { label: "Types", value: "Fixed · Clear · Hawley" },
      { label: "Initial wear", value: "Full-time, several months" },
      { label: "Long-term", value: "Nightly, indefinitely" },
    ],
    faqs: [
      {
        q: "How long do I need to wear my retainer?",
        a: "Honestly — for life, at night. Teeth shift slowly across decades, and the only reliable way to hold the result is consistent nightly retainer wear. The good news: it's a few hours of sleep, not a lifestyle change.",
      },
      {
        q: "What happens if I stop wearing my retainer?",
        a: "Teeth gradually drift back toward their original positions. This is the most common reason adults return for retreatment, and it is avoidable.",
      },
      {
        q: "What's the difference between fixed and removable retainers?",
        a: "Fixed retainers are a thin wire bonded behind the front teeth — invisible and always in place. Removable retainers are worn at night. Many patients use both for maximum stability.",
      },
      {
        q: "I lost my retainer years ago — can I get a new one?",
        a: "Yes. We can take a quick scan and produce a new retainer, though if significant shifting has happened, a short course of treatment may be needed first.",
      },
    ],
    related: ["braces-and-fixed-appliances", "invisalign", "adults"],
    image: svcRetainers,
    ctaLabel: "Explore Retainers",
    metaTitle: "Orthodontic Retainers — Tsai Orthodontics Vancouver",
    metaDescription:
      "Custom orthodontic retainers and long-term retention care in Vancouver. Protect the result of your treatment with specialist follow-through.",
  },
];

// Reserved for future use
void journeyTeens;

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
);
