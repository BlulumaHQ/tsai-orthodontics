import journeyKids from "@/assets/journey-kids.jpg";
import journeyTeens from "@/assets/journey-teens.jpg";
import journeyAdults from "@/assets/journey-adults.jpg";
import journeyParents from "@/assets/journey-parents.jpg";
import atmosCare from "@/assets/atmos-care.jpg";
import svcBraces from "@/assets/svc-braces.jpg";
import svcInvisalign from "@/assets/svc-invisalign.jpg";
import svcRetainers from "@/assets/svc-retainers.jpg";
import svcMarpe from "@/assets/svc-marpe.jpg";

export interface Service {
  slug: string;
  name: string;
  short: string;          // card description
  hero: string;           // hero copy
  main: string;           // main page copy
  who: string[];          // who this is for, bullets
  how: string;            // how we approach it
  pullQuote?: string;     // optional highlighted quote
  related: string[];      // related slugs
  image: string;
  metaTitle: string;
  metaDescription: string;
}

export const SERVICES: Service[] = [
  {
    slug: "children-and-teens",
    name: "Children & Teens",
    short:
      "Specialist evaluations and orthodontic care timed to a child or teen's natural development.",
    hero: "Orthodontic care for growing smiles, explained clearly for parents and made easier for kids and teens.",
    main: "Children and teens need more than straight teeth. They need the right timing, a clear plan, and an experience that does not feel intimidating. At Tsai Orthodontics, we take time to evaluate growth, bite development, spacing, crowding, and each patient's comfort level before recommending treatment.",
    who: [
      "Children who may need an early orthodontic evaluation",
      "Teens who are ready for braces or clear aligners",
      "Parents who want a clear answer about timing",
      "Families looking for a calm, thoughtful orthodontic experience",
    ],
    how: "We explain what we see, what can wait, and what may need attention sooner. Not every child needs treatment right away. The goal is to give parents clarity and help young patients feel comfortable throughout the process.",
    related: ["phase-i-treatment", "braces-and-fixed-appliances", "invisalign", "retainers"],
    image: journeyKids,
    metaTitle: "Orthodontics for Children & Teens — Tsai Orthodontics Vancouver",
    metaDescription:
      "Specialist orthodontic care for children and teens in Vancouver. Calm consultations, clear timing, and treatment shaped around your child's development.",
  },
  {
    slug: "adults",
    name: "Adults",
    short:
      "Discreet, considered orthodontic treatment for adults — planned around real life.",
    hero: "Orthodontic treatment for adults who want clear options, discreet solutions, and specialist guidance.",
    main: "Adult orthodontic treatment is often about more than appearance. Some patients want to improve function, address long-standing concerns, or finally explore treatment they postponed earlier in life. Tsai Orthodontics provides adult care with careful planning, clear communication, and respect for work, family, and daily routines.",
    who: [
      "Adults considering orthodontic treatment for the first time",
      "Adults who had braces before and noticed shifting",
      "Patients interested in clear aligners",
      "Patients who may need fixed appliances for more complex movement",
    ],
    how: "We begin with a clear evaluation and explain which options are realistic for your case. Invisalign may be appropriate for some adults, while braces or fixed appliances may be better for others. The recommendation depends on your goals, bite, and clinical needs.",
    related: ["invisalign", "braces-and-fixed-appliances", "retainers"],
    image: journeyAdults,
    metaTitle: "Adult Orthodontics — Tsai Orthodontics Vancouver",
    metaDescription:
      "Specialist orthodontic care for adults in Vancouver. Discreet treatment options, careful planning, and clear answers from Dr. Andrew Tsai.",
  },
  {
    slug: "braces-and-fixed-appliances",
    name: "Braces & Fixed Appliances",
    short:
      "Reliable orthodontic tools for precise tooth movement and carefully planned results.",
    hero: "Reliable orthodontic tools for precise tooth movement and carefully planned results.",
    main: "Braces and fixed appliances remain one of the most effective ways to guide tooth movement. They may be recommended for children, teens, or adults depending on the complexity of the case and the level of control needed.",
    who: [
      "Patients who need precise tooth movement",
      "Children and teens starting comprehensive orthodontic treatment",
      "Adults whose cases may require fixed appliance control",
      "Patients who are not ideal candidates for clear aligners",
    ],
    how: "Braces are not outdated. They are still a powerful and reliable orthodontic tool when used with careful planning. At Tsai Orthodontics, fixed appliances are recommended when they are the right fit for the patient, not because one option is promoted over another.",
    related: ["children-and-teens", "adults", "retainers"],
    image: svcBraces,
    metaTitle: "Braces & Fixed Appliances — Tsai Orthodontics Vancouver",
    metaDescription:
      "Modern braces and fixed orthodontic appliances in Vancouver, planned and supervised by specialist orthodontist Dr. Andrew Tsai.",
  },
  {
    slug: "invisalign",
    name: "Invisalign",
    short:
      "Clear aligner treatment planned with specialist-level attention.",
    hero: "Clear aligner treatment planned with specialist-level attention.",
    main: "Invisalign can be a discreet and effective orthodontic option for selected patients. It uses a series of removable clear aligners to guide tooth movement over time. Because clear aligner treatment depends on diagnosis, planning, and patient compliance, specialist oversight matters.",
    who: [
      "Teens and adults interested in a discreet orthodontic option",
      "Patients who prefer removable aligners when clinically appropriate",
      "Patients who can wear aligners consistently",
      "Selected children or mixed dentition patients when appropriate",
    ],
    how: "Dr. Andrew Tsai completed advanced orthodontic training at the University of the Pacific, Arthur A. Dugoni School of Dentistry in San Francisco, one of the leading programs for clear aligner treatment. His Master's thesis focused on the stability of clear aligner treatment for mixed dentition children.\n\nNot every patient is an Invisalign candidate. We evaluate each case carefully and explain whether clear aligners are appropriate or whether another treatment option would be more predictable.",
    related: ["adults", "children-and-teens", "retainers"],
    image: svcInvisalign,
    metaTitle: "Invisalign Clear Aligners — Tsai Orthodontics Vancouver",
    metaDescription:
      "Specialist-led Invisalign clear aligner treatment in Vancouver. Careful diagnosis and personalized planning from Dr. Andrew Tsai.",
  },
  {
    slug: "phase-i-treatment",
    name: "Phase I Treatment",
    short:
      "Early orthodontic guidance for children — only when it will genuinely help.",
    hero: "Early orthodontic guidance when timing matters.",
    main: "Phase I Treatment, also called early interceptive orthodontic treatment, may be recommended while a child is still growing. The goal is not to start treatment early for every child. The goal is to identify whether early guidance could make future treatment simpler, more stable, or more predictable.",
    who: [
      "Children with developing bite concerns",
      "Children with crowding, spacing, or jaw growth concerns",
      "Parents who are unsure if it is too early to see an orthodontist",
      "Children who may benefit from early interceptive care",
    ],
    how: "Not every child needs Phase I Treatment. At Tsai Orthodontics, we give parents a clear answer about what we see, what can wait, and what may benefit from earlier attention.",
    pullQuote:
      "Not sure if it's the right time? Come in. We'll take a look and give you a straight answer — no pressure.",
    related: ["children-and-teens", "airway-friendly-orthodontics", "marpe"],
    image: journeyParents,
    metaTitle: "Phase I Early Orthodontic Treatment — Tsai Orthodontics Vancouver",
    metaDescription:
      "Early interceptive orthodontic treatment for children in Vancouver. Honest guidance from a specialist on whether your child needs Phase I care.",
  },
  {
    slug: "airway-friendly-orthodontics",
    name: "Airway Friendly Orthodontics",
    short:
      "Orthodontic planning that considers growth, structure, and the bigger picture.",
    hero: "Orthodontic planning that considers growth, structure, and the bigger picture.",
    main: "Airway friendly orthodontics means looking carefully at growth, jaw development, bite relationships, and related concerns when they are relevant to treatment planning. It does not mean every patient needs airway-focused treatment, and it does not replace medical diagnosis.",
    who: [
      "Children whose growth and jaw development need evaluation",
      "Patients with orthodontic concerns that may involve arch width or jaw structure",
      "Families looking for thoughtful, comprehensive assessment",
      "Patients who may need coordinated care with other providers",
    ],
    how: "We use careful language, careful diagnosis, and individualized planning. If airway-related concerns are present, we explain what orthodontics can and cannot address, and when collaboration with other healthcare providers may be appropriate.",
    related: ["phase-i-treatment", "marpe", "children-and-teens"],
    image: atmosCare,
    metaTitle: "Airway Friendly Orthodontics — Tsai Orthodontics Vancouver",
    metaDescription:
      "Thoughtful, airway-aware orthodontic planning in Vancouver. Careful evaluation of growth, structure, and bite from a certified specialist.",
  },
  {
    slug: "marpe",
    name: "MARPE",
    short:
      "Miniscrew-assisted rapid palatal expansion for selected orthodontic cases.",
    hero: "A specialized expansion approach for selected orthodontic cases.",
    main: "MARPE stands for Miniscrew-Assisted Rapid Palatal Expansion. It may be used in selected cases where expansion is needed and traditional approaches may not be sufficient. MARPE requires careful diagnosis, planning, and case selection.",
    who: [
      "Selected patients who may need palatal expansion",
      "Patients whose jaw structure requires specialist evaluation",
      "Teens or adults in specific orthodontic situations",
      "Patients being evaluated for more advanced orthodontic planning",
    ],
    how: "MARPE is not for every patient. At Tsai Orthodontics, recommendations are based on diagnosis, growth stage, anatomy, and treatment goals. We explain the purpose, process, and limitations clearly before moving forward.",
    related: ["airway-friendly-orthodontics", "phase-i-treatment", "adults"],
    image: svcMarpe,
    metaTitle: "MARPE Palatal Expansion — Tsai Orthodontics Vancouver",
    metaDescription:
      "Miniscrew-Assisted Rapid Palatal Expansion (MARPE) for selected orthodontic cases in Vancouver. Specialist diagnosis and planning by Dr. Andrew Tsai.",
  },
  {
    slug: "retainers",
    name: "Retainers",
    short:
      "Protecting the result of your treatment with thoughtful, long-term retention care.",
    hero: "Protecting the result is part of the treatment.",
    main: "Orthodontic care does not end when braces or aligners are finished. Retainers help maintain tooth position and protect the result over time. Retention is an important part of long-term orthodontic success.",
    who: [
      "Patients finishing braces",
      "Patients finishing Invisalign",
      "Adults who notice shifting after previous orthodontic treatment",
      "Patients who need replacement or updated retainers",
    ],
    how: "We explain how and when to wear retainers based on each patient's needs. Retainers work best when patients understand why they matter and how to care for them properly.",
    related: ["braces-and-fixed-appliances", "invisalign", "adults"],
    image: svcRetainers,
    metaTitle: "Orthodontic Retainers — Tsai Orthodontics Vancouver",
    metaDescription:
      "Custom orthodontic retainers and long-term retention care in Vancouver. Protect the result of your treatment with specialist follow-through.",
  },
];

// Suppress unused-import warning for journeyTeens (reserved for future use)
void journeyTeens;

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
);
