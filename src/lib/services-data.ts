import phaseOneFeature from "@/assets/phase-1-feature-001.webp.asset.json";
import invisalignFeature from "@/assets/invisalign_feature.webp.asset.json";
import marpeFeature from "@/assets/marpe-007.webp.asset.json";
import retainerFeature from "@/assets/retainer-009-feature.webp.asset.json";
import bracesFeature from "@/assets/brace-feature.webp.asset.json";
import airwayFeature from "@/assets/air-way-004.webp.asset.json";
import kidsFeature from "@/assets/005_1.webp.asset.json";
import adultsFeature from "@/assets/012.webp.asset.json";
import bracesCloseUp from "@/assets/tsai-brace.webp.asset.json";
import consultScan from "@/assets/tsai-consult.webp.asset.json";
import adultConsult from "@/assets/tsai-adult-consult.webp.asset.json";
import careImg from "@/assets/care-004.webp.asset.json";
import clarityImg from "@/assets/clarity-007.webp.asset.json";
import craftImg from "@/assets/craft-026.webp.asset.json";
import convenienceImg from "@/assets/convenience022.webp.asset.json";

const svcBraces = bracesFeature.url;
const svcInvisalign = invisalignFeature.url;
const svcRetainers = retainerFeature.url;
const svcMarpe = marpeFeature.url;
const svcAirway = airwayFeature.url;
const journeyKids = kidsFeature.url;
const journeyAdults = adultsFeature.url;
const journeyParents = phaseOneFeature.url;

const IMG = {
  braces: bracesCloseUp.url,
  consult: consultScan.url,
  adultConsult: adultConsult.url,
  care: careImg.url,
  clarity: clarityImg.url,
  craft: craftImg.url,
  convenience: convenienceImg.url,
  invisalign: invisalignFeature.url,
  marpe: marpeFeature.url,
  airway: airwayFeature.url,
  kids: kidsFeature.url,
  adults: adultsFeature.url,
  retainer: retainerFeature.url,
  phaseOne: phaseOneFeature.url,
};

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  short: string;
  ctaLabel: string;
  image: string;
  heroImageDirection: string;
  heroAlt: string;
  heroTitle: string;
  intro: string[];
  primarySectionTitle: string;
  primaryItems: string[];
  expectTitle?: string;
  expectItems?: string[];
  whyUs?: string;
  faqs: ServiceFAQ[];
  related: string[];
  metaTitle: string;
  metaDescription: string;
  gallery?: { src: string; alt: string }[];
}

export const SERVICE_GALLERIES: Record<string, { src: string; alt: string }[]> = {
  "children-and-teens": [
    { src: IMG.kids, alt: "Young patient at Tsai Orthodontics" },
    { src: IMG.consult, alt: "Dr. Tsai reviewing a 3D scan with a patient" },
    { src: IMG.care, alt: "Warm consultation between clinician and child" },
    { src: IMG.phaseOne, alt: "Friendly orthodontic visit for a young child" },
  ],
  adults: [
    { src: IMG.adults, alt: "Adult patient at Tsai Orthodontics" },
    { src: IMG.adultConsult, alt: "Adult patient discussing clear aligners with Dr. Tsai" },
    { src: IMG.invisalign, alt: "Close-up of clear aligner therapy for adults" },
    { src: IMG.clarity, alt: "Calm consultation room at Tsai Orthodontics" },
  ],
  "braces-and-fixed-appliances": [
    { src: IMG.braces, alt: "Close-up of modern braces on healthy teeth" },
    { src: IMG.consult, alt: "Treatment plan reviewed on a digital scan" },
    { src: IMG.craft, alt: "Detailed orthodontic workflow at Tsai Orthodontics" },
    { src: IMG.kids, alt: "Young patient comfortable in braces" },
  ],
  invisalign: [
    { src: IMG.invisalign, alt: "Clear aligner held by a patient" },
    { src: IMG.adultConsult, alt: "Dr. Tsai handing a clear aligner to a patient" },
    { src: IMG.consult, alt: "Digital scan used to plan Invisalign treatment" },
    { src: IMG.adults, alt: "Adult Invisalign patient smiling" },
  ],
  "phase-i-treatment": [
    { src: IMG.phaseOne, alt: "Young child during an early orthodontic visit" },
    { src: IMG.kids, alt: "Child meeting Dr. Tsai for a Phase I consultation" },
    { src: IMG.care, alt: "Calm, family-centered consult room" },
    { src: IMG.consult, alt: "Growth and bite reviewed on a digital scan" },
  ],
  "airway-friendly-orthodontics": [
    { src: IMG.airway, alt: "Profile analysis used in airway-friendly planning" },
    { src: IMG.consult, alt: "3D scan reviewed during airway evaluation" },
    { src: IMG.phaseOne, alt: "Young patient assessed for airway and growth" },
    { src: IMG.clarity, alt: "Quiet consultation space for thorough evaluation" },
  ],
  marpe: [
    { src: IMG.marpe, alt: "Digital model used in MARPE planning" },
    { src: IMG.consult, alt: "MARPE plan explained on a 3D scan" },
    { src: IMG.adultConsult, alt: "Specialist consultation for MARPE candidacy" },
    { src: IMG.craft, alt: "Precise orthodontic planning workflow" },
  ],
  retainers: [
    { src: IMG.retainer, alt: "Clear retainer in a patient's hand" },
    { src: IMG.invisalign, alt: "Custom-fit retainer detail" },
    { src: IMG.adultConsult, alt: "Patient receiving retainer instructions from Dr. Tsai" },
    { src: IMG.care, alt: "Long-term retention check-in" },
  ],
};

export const SERVICES: Service[] = [
  {
    slug: "children-and-teens",
    name: "Children & Teens",
    short: "Orthodontic care timed around a child or teen's natural growth.",
    ctaLabel: "Explore Children's Orthodontics",
    image: journeyKids,
    heroImageDirection: "A child or teenager talking comfortably with Dr. Tsai and a parent.",
    heroAlt: "A child or teenager talking comfortably with Dr. Tsai and a parent",
    heroTitle: "Orthodontic Care That Grows With Your Child",
    intro: [
      "Children and teenagers develop at different rates. Some benefit from early guidance, while others simply need careful monitoring until the right time.",
      "At Tsai Orthodontics, treatment is timed around natural growth rather than rushing into unnecessary appliances. The goal is to create healthy function, balanced development, and a smile that will last.",
    ],
    primarySectionTitle: "When Treatment May Help",
    primaryItems: [
      "Crowded teeth",
      "Bite problems",
      "Teeth erupting in unusual positions",
      "Jaw growth concerns",
      "Monitoring developing smiles",
    ],
    expectTitle: "What Families Can Expect",
    expectItems: [
      "Careful evaluation",
      "Clear explanation",
      "Growth monitoring when appropriate",
      "Treatment only when beneficial",
    ],
    whyUs:
      "Parents should leave understanding exactly what is happening and why. Some children need treatment now. Others simply need time.",
    faqs: [
      {
        q: "Does every child need braces?",
        a: "No. Many children only require observation.",
      },
      {
        q: "When should my child first visit?",
        a: "Around age seven is often recommended.",
      },
    ],
    related: ["phase-i-treatment", "braces-and-fixed-appliances", "invisalign"],
    metaTitle: "Children's Orthodontics — Tsai Orthodontics Vancouver",
    metaDescription:
      "Orthodontic care for children and teens in Vancouver, timed around growth and explained clearly for families.",
  },
  {
    slug: "adults",
    name: "Adults",
    short: "Discreet, considered orthodontic treatment planned around real life.",
    ctaLabel: "Explore Adult Treatment",
    image: journeyAdults,
    heroImageDirection: "Professional adult smiling naturally.",
    heroAlt: "Professional adult smiling naturally",
    heroTitle: "Orthodontic Treatment That Fits Real Life",
    intro: [
      "Many adults missed orthodontic treatment when they were younger. Others notice their teeth have shifted over time.",
      "Modern orthodontics allows adults to improve both appearance and function while balancing work, family, and everyday commitments.",
    ],
    primarySectionTitle: "Common Reasons Adults Seek Treatment",
    primaryItems: [
      "Crowding",
      "Relapse after childhood braces",
      "Bite discomfort",
      "Cosmetic concerns",
      "Preparation for dental work",
    ],
    whyUs:
      "Adult patients often have different priorities. Treatment should feel practical, comfortable, and clearly planned.",
    faqs: [],
    related: ["invisalign", "braces-and-fixed-appliances", "retainers"],
    metaTitle: "Adult Orthodontics — Tsai Orthodontics Vancouver",
    metaDescription:
      "Adult orthodontic treatment in Vancouver with clear options, practical planning, and specialist-level guidance.",
  },
  {
    slug: "braces-and-fixed-appliances",
    name: "Braces & Fixed Appliances",
    short: "Precise, dependable tooth movement with modern fixed appliances.",
    ctaLabel: "Explore Braces",
    image: svcBraces,
    heroImageDirection: "Modern braces with close-up smile photography.",
    heroAlt: "Modern braces with close-up smile photography",
    heroTitle: "Reliable Solutions With Proven Results",
    intro: [
      "Fixed appliances remain one of the most effective ways to guide tooth movement with precision.",
      "Today's braces are smaller and more comfortable while allowing excellent control over complex orthodontic treatment.",
    ],
    primarySectionTitle: "Suitable For",
    primaryItems: [
      "Crowding",
      "Spacing",
      "Overbite",
      "Underbite",
      "Crossbite",
      "Complex alignment",
    ],
    faqs: [],
    related: ["children-and-teens", "adults", "retainers"],
    metaTitle: "Braces & Fixed Appliances — Tsai Orthodontics Vancouver",
    metaDescription:
      "Modern braces and fixed orthodontic appliances in Vancouver for precise, specialist-planned tooth movement.",
  },
  {
    slug: "invisalign",
    name: "Invisalign",
    short: "Clear aligner treatment that is digitally planned and carefully monitored.",
    ctaLabel: "Explore Invisalign",
    image: svcInvisalign,
    heroImageDirection: "Adult patient with subtle clear aligners.",
    heroAlt: "Adult patient with subtle clear aligners",
    heroTitle: "A Clear Approach To Orthodontic Care",
    intro: [
      "For many patients, clear aligners provide a discreet way to straighten teeth without traditional braces.",
      "Treatment is digitally planned and carefully monitored to achieve predictable results.",
    ],
    primarySectionTitle: "Benefits",
    primaryItems: [
      "Nearly invisible",
      "Removable",
      "Comfortable",
      "Easier daily hygiene",
    ],
    faqs: [],
    related: ["adults", "children-and-teens", "retainers"],
    metaTitle: "Invisalign Clear Aligners — Tsai Orthodontics Vancouver",
    metaDescription:
      "Invisalign clear aligner treatment in Vancouver, digitally planned and carefully monitored by Tsai Orthodontics.",
  },
  {
    slug: "phase-i-treatment",
    name: "Phase I Treatment",
    short: "Early guidance for selected children when timing truly matters.",
    ctaLabel: "Explore Phase I Treatment",
    image: journeyParents,
    heroImageDirection: "Young child with parent.",
    heroAlt: "Young child with parent",
    heroTitle: "Early Guidance When It Truly Makes A Difference",
    intro: [
      "Phase I treatment is not recommended for every child.",
      "When growth patterns suggest future problems, early intervention may help guide development and simplify later treatment.",
    ],
    primarySectionTitle: "Goals",
    primaryItems: [
      "Guide jaw growth",
      "Create space",
      "Reduce future complexity",
      "Improve developing bite",
    ],
    faqs: [],
    related: ["children-and-teens", "airway-friendly-orthodontics", "marpe"],
    metaTitle: "Phase I Treatment — Tsai Orthodontics Vancouver",
    metaDescription:
      "Early orthodontic guidance for children in Vancouver when growth patterns suggest future problems.",
  },
  {
    slug: "airway-friendly-orthodontics",
    name: "Airway Friendly Orthodontics",
    short: "Orthodontic planning that considers growth, facial structure, and airway development.",
    ctaLabel: "Explore Airway Friendly Care",
    image: svcAirway,
    heroImageDirection: "Digital growth analysis and child profile.",
    heroAlt: "Digital growth analysis and child profile",
    heroTitle: "Looking Beyond The Teeth",
    intro: [
      "Orthodontic planning should consider more than alignment alone.",
      "Growth, facial structure, and airway development are all part of the bigger picture when evaluating young patients.",
    ],
    primarySectionTitle: "Our Philosophy",
    primaryItems: [
      "We believe every patient deserves an evaluation that considers overall development rather than focusing only on straight teeth.",
    ],
    whyUs:
      "We believe every patient deserves an evaluation that considers overall development rather than focusing only on straight teeth.",
    faqs: [],
    related: ["phase-i-treatment", "marpe", "children-and-teens"],
    metaTitle: "Airway Friendly Orthodontics — Tsai Orthodontics Vancouver",
    metaDescription:
      "Airway friendly orthodontic planning in Vancouver that considers growth, facial structure, and developing bites.",
  },
  {
    slug: "marpe",
    name: "MARPE",
    short: "Miniscrew-assisted rapid palatal expansion for carefully selected cases.",
    ctaLabel: "Explore MARPE",
    image: svcMarpe,
    heroImageDirection: "Digital orthodontic planning model.",
    heroAlt: "Digital orthodontic planning model",
    heroTitle: "Advanced Expansion For Selected Cases",
    intro: [
      "MARPE (Miniscrew-Assisted Rapid Palatal Expansion) is an advanced technique used for carefully selected patients who require skeletal expansion.",
      "Not every patient is a candidate, which is why careful evaluation is essential.",
    ],
    primarySectionTitle: "Benefits",
    primaryItems: [
      "Skeletal expansion",
      "Improved arch development",
      "Reduced need for surgery in some cases",
      "Specialist planning",
    ],
    faqs: [],
    related: ["airway-friendly-orthodontics", "phase-i-treatment", "adults"],
    metaTitle: "MARPE Palatal Expansion — Tsai Orthodontics Vancouver",
    metaDescription:
      "MARPE in Vancouver for selected orthodontic expansion cases requiring careful specialist evaluation.",
  },
  {
    slug: "retainers",
    name: "Retainers",
    short: "Long-term retention care to help preserve orthodontic results.",
    ctaLabel: "Explore Retainers",
    image: svcRetainers,
    heroImageDirection: "Clear retainer in a patient's hand.",
    heroAlt: "Clear retainer in a patient's hand",
    heroTitle: "Keeping Your Smile Stable",
    intro: [
      "Orthodontic treatment does not end when appliances come off.",
      "Retainers help preserve the result you worked hard to achieve and reduce the natural tendency for teeth to shift over time.",
    ],
    primarySectionTitle: "Retention Care",
    primaryItems: [
      "Clear retainers",
      "Fixed retainers",
      "Replacement retainers",
      "Long-term maintenance",
    ],
    faqs: [],
    related: ["braces-and-fixed-appliances", "invisalign", "adults"],
    metaTitle: "Orthodontic Retainers — Tsai Orthodontics Vancouver",
    metaDescription:
      "Clear retainers, fixed retainers, replacement retainers, and long-term orthodontic retention care in Vancouver.",
  },
];

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
);