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
  | "warm"        // family/kids — soft, parent-focused
  | "editorial"   // adults — discreet, magazine-style
  | "clinical"    // braces, MARPE — appliance/spec focus
  | "brand"       // invisalign — brand-treatment hero
  | "advisory"    // phase-i — short visit + pull quote forward
  | "considered"  // airway — careful framing
  | "longterm";   // retainers — retention/care

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceHighlight {
  label: string;
  value: string;
}

export interface Service {
  slug: string;
  name: string;
  short: string;
  hero: string;
  main: string;
  who: string[];
  how: string;
  pullQuote?: string;
  related: string[];
  image: string;
  variant: ServiceVariant;
  /** Small spec/data block — different per service */
  highlights: ServiceHighlight[];
  /** Unique per-service FAQs — no two services share an entry */
  faqs: ServiceFAQ[];
  /** Optional brand mark label (e.g. "Invisalign Provider") */
  brandMark?: string;
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
    variant: "warm",
    highlights: [
      { label: "First evaluation", value: "Age 7" },
      { label: "Consultation", value: "Complimentary" },
      { label: "Languages", value: "EN · 中文 · 廣東話" },
    ],
    faqs: [
      {
        q: "At what age should my child first see an orthodontist?",
        a: "The Canadian Association of Orthodontists recommends a first evaluation around age 7. Most children won't need treatment that early — the visit is about screening growth and catching issues that are easier to guide while a child is still developing.",
      },
      {
        q: "Will my child definitely need braces if we come in early?",
        a: "No. Most early visits end with a simple monitoring plan and a follow-up in 6–12 months. We only recommend treatment when there's a clear clinical reason.",
      },
      {
        q: "How long does treatment usually take for teens?",
        a: "Most comprehensive teen cases run 12–24 months, depending on complexity. We give a realistic estimate after the consultation, not a marketing number.",
      },
      {
        q: "Do you offer Invisalign for teens?",
        a: "Yes, when it's the right fit clinically. We won't recommend aligners over braces simply because a family prefers them — the decision is based on the case.",
      },
    ],
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
        a: "This is common — it usually means retainers weren't worn long enough. A limited treatment with aligners or a short course of braces, followed by lifetime retention, often resolves it.",
      },
      {
        q: "Do I need a referral from my dentist?",
        a: "No referral is needed to book a consultation. We do coordinate closely with your general dentist when treatment begins.",
      },
    ],
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
    hero: "Precise, dependable tooth movement — the original orthodontic technology, refined.",
    main: "Braces and fixed appliances remain one of the most effective ways to guide tooth movement. They may be recommended for children, teens, or adults depending on the complexity of the case and the level of control needed.",
    who: [
      "Patients who need precise tooth movement",
      "Children and teens starting comprehensive orthodontic treatment",
      "Adults whose cases may require fixed appliance control",
      "Patients who are not ideal candidates for clear aligners",
    ],
    how: "Braces are not outdated. They are still a powerful and reliable orthodontic tool when used with careful planning. At Tsai Orthodontics, fixed appliances are recommended when they are the right fit for the patient, not because one option is promoted over another.",
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
        a: "Ceramic brackets are tooth-coloured and far less visible. They function similarly to metal but require careful handling. We'll explain which is appropriate for your case.",
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
        a: "Not for everyone. We evaluate the bite, root anatomy, and the type of movement needed. If braces will give you a more predictable result, we'll say so.",
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
    variant: "advisory",
    highlights: [
      { label: "Typical age range", value: "7–10" },
      { label: "Visit length", value: "About 45 minutes" },
      { label: "Outcome", value: "Honest recommendation" },
    ],
    faqs: [
      {
        q: "What does Phase I treatment actually do?",
        a: "It addresses specific developing problems — crossbites, severe crowding, jaw growth imbalances, harmful habits — while a child is still growing. It doesn't replace full orthodontics later, but it can make Phase II simpler.",
      },
      {
        q: "Will my child still need braces later?",
        a: "Most likely, yes. Phase I makes the second phase shorter and more predictable; it rarely eliminates the need for it entirely. We'll be honest about that from the start.",
      },
      {
        q: "Are you going to pressure us into early treatment?",
        a: "No. We see many children whose best plan is to wait and monitor. If your child doesn't need Phase I, we'll say so plainly and book a follow-up to check in.",
      },
      {
        q: "How is Phase I different from regular orthodontic treatment?",
        a: "It's shorter, more targeted, and uses simpler appliances. The goal is to guide growth, not to finish a smile — that comes later when all the permanent teeth are in.",
      },
    ],
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
    variant: "considered",
    highlights: [
      { label: "Imaging", value: "3D & cephalometric" },
      { label: "Collaboration", value: "ENT · sleep · pediatrics" },
      { label: "Approach", value: "Evidence-based" },
    ],
    faqs: [
      {
        q: "Can orthodontics cure sleep apnea?",
        a: "No — and we won't claim it can. Sleep apnea is a medical diagnosis. Orthodontics can sometimes support breathing-related care by improving jaw and arch development, but that's a supporting role, not a cure.",
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
        a: "Depending on the case: your general dentist, an ENT, a sleep physician, a pediatrician, or a myofunctional therapist. We coordinate, we don't replace.",
      },
    ],
    related: ["phase-i-treatment", "marpe", "children-and-teens"],
    image: svcAirway,
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
        a: "Teeth gradually drift back toward their original positions. This is the most common reason adults return for retreatment, and it's avoidable.",
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
