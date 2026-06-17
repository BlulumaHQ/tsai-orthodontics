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
import type { Lang } from "@/lib/i18n";

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
  qZh?: string;
  aZh?: string;
}

export interface Service {
  slug: string;
  name: string;
  nameZh: string;
  short: string;
  shortZh: string;
  ctaLabel: string;
  ctaLabelZh: string;
  image: string;
  heroImageDirection: string;
  heroAlt: string;
  heroTitle: string;
  heroTitleZh: string;
  intro: string[];
  introZh: string[];
  primarySectionTitle: string;
  primarySectionTitleZh: string;
  primaryItems: string[];
  primaryItemsZh: string[];
  expectTitle?: string;
  expectTitleZh?: string;
  expectItems?: string[];
  expectItemsZh?: string[];
  whyUs?: string;
  whyUsZh?: string;
  mostEffective: string;
  mostEffectiveZh: string;
  faqs: ServiceFAQ[];
  related: string[];
  metaTitle: string;
  metaDescription: string;
  gallery?: { src: string; alt: string }[];
}

// Only photos that actually match the service. Number of photos varies by service —
// we don't force every page to have the same count.
// Each service only uses photos that were uploaded specifically for that service —
// no cross-pollination, no filler.
export const SERVICE_GALLERIES: Record<string, { src: string; alt: string }[]> = {
  "children-and-teens": [
    { src: "/images/services/kids.webp", alt: "Young patient at Tsai Orthodontics" },
    { src: "/images/services/kids-2.webp", alt: "Child smiling during an orthodontic visit" },
    { src: "/images/services/phase-1.webp", alt: "Friendly orthodontic visit for a young child" },
    { src: "/images/services/phase-1-2.webp", alt: "Early orthodontic guidance for a young patient" },
  ],
  adults: [
    { src: "/images/services/adults.webp", alt: "Adult patient at Tsai Orthodontics" },
    { src: "/images/services/adults-2.webp", alt: "Adult patient consultation with Dr. Tsai" },
  ],
  "braces-and-fixed-appliances": [
    { src: "/images/services/braces.webp", alt: "Modern braces close-up" },
    { src: "/images/services/braces-2.webp", alt: "Patient with fixed braces at Tsai Orthodontics" },
  ],
  invisalign: [
    { src: "/images/services/invisalign.webp", alt: "Invisalign clear aligner" },
    { src: "/images/services/invisalign-alt.webp", alt: "Patient holding an Invisalign aligner" },
    { src: "/images/services/invisalign-2.webp", alt: "Invisalign treatment planning" },
    { src: "/images/services/invisalign-3.webp", alt: "Invisalign aligner detail" },
  ],
  "phase-i-treatment": [
    { src: "/images/services/phase-1.webp", alt: "Young child during an early orthodontic visit" },
    { src: "/images/services/phase-1-2.webp", alt: "Phase I treatment for a young patient" },
    { src: "/images/services/kids.webp", alt: "Child meeting Dr. Tsai for a Phase I consultation" },
  ],
  "airway-friendly-orthodontics": [
    { src: "/images/services/airway.webp", alt: "Airway-friendly orthodontic analysis" },
  ],
  marpe: [
    { src: "/images/services/marpe.webp", alt: "MARPE treatment planning" },
  ],
  retainers: [
    { src: "/images/services/retainer.webp", alt: "Clear retainer" },
    { src: "/images/services/retainer-2.webp", alt: "Retainer fitting and care" },
  ],
};

export const SERVICES: Service[] = [
  {
    slug: "children-and-teens",
    name: "Children & Teens",
    nameZh: "兒童與青少年",
    short: "Orthodontic care timed around a child or teen's natural growth.",
    shortZh: "依照孩子的自然成長階段，量身規劃的齒顎矯正照護。",
    ctaLabel: "Explore Children's Orthodontics",
    ctaLabelZh: "了解兒童矯正",
    image: journeyKids,
    heroImageDirection: "A child or teenager talking comfortably with Dr. Tsai and a parent.",
    heroAlt: "A child or teenager talking comfortably with Dr. Tsai and a parent",
    heroTitle: "Orthodontic Care That Grows With Your Child",
    heroTitleZh: "陪伴孩子成長的矯正照護",
    intro: [
      "Children and teenagers develop at different rates. Some benefit from early guidance, while others simply need careful monitoring until the right time.",
      "At Tsai Orthodontics, treatment is timed around natural growth rather than rushing into unnecessary appliances. The goal is to create healthy function, balanced development, and a smile that will last.",
    ],
    introZh: [
      "每個孩子與青少年的發育速度都不一樣。有些孩子能從早期介入中受益，有些則只需要在適當時機前持續觀察。",
      "在 Tsai Orthodontics，我們依照孩子的自然成長安排治療時機，不會匆促裝上不必要的矯正裝置。目標是建立健康的咬合功能、均衡的發育，以及能長期維持的笑容。",
    ],
    primarySectionTitle: "When Treatment May Help",
    primarySectionTitleZh: "什麼情況下適合矯正",
    primaryItems: [
      "Crowded teeth",
      "Bite problems",
      "Teeth erupting in unusual positions",
      "Jaw growth concerns",
      "Monitoring developing smiles",
    ],
    primaryItemsZh: [
      "牙齒擁擠",
      "咬合異常",
      "牙齒長在不正常的位置",
      "顎骨發育問題",
      "持續觀察孩子的牙齒發育",
    ],
    expectTitle: "What Families Can Expect",
    expectTitleZh: "家長可以期待的內容",
    expectItems: [
      "Careful evaluation",
      "Clear explanation",
      "Growth monitoring when appropriate",
      "Treatment only when beneficial",
    ],
    expectItemsZh: [
      "仔細評估",
      "清楚說明",
      "必要時持續追蹤發育情形",
      "只有真正有幫助時才會建議治療",
    ],
    whyUs:
      "Parents should leave understanding exactly what is happening and why. Some children need treatment now. Others simply need time.",
    whyUsZh:
      "家長離開診所時，應該清楚知道孩子目前的狀況以及原因。有些孩子需要現在開始治療；有些則只是需要再等等。",
    mostEffective: "[Dr. Tsai to confirm the most effective option]",
    mostEffectiveZh: "[由醫師補充最有效的選項]",
    faqs: [
      {
        q: "Does every child need braces?",
        qZh: "每個孩子都需要做矯正嗎？",
        a: "No. Many children only require observation.",
        aZh: "不一定。許多孩子只需要定期觀察追蹤即可。",
      },
      {
        q: "When should my child first visit?",
        qZh: "孩子幾歲適合第一次來看矯正？",
        a: "Around age seven is often recommended.",
        aZh: "我們通常建議孩子在七歲左右進行第一次矯正評估。",
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
    nameZh: "成人矯正",
    short: "Discreet, considered orthodontic treatment planned around real life.",
    shortZh: "低調、細膩、貼近生活步調的成人矯正療程。",
    ctaLabel: "Explore Adult Treatment",
    ctaLabelZh: "了解成人矯正",
    image: journeyAdults,
    heroImageDirection: "Professional adult smiling naturally.",
    heroAlt: "Professional adult smiling naturally",
    heroTitle: "Orthodontic Treatment That Fits Real Life",
    heroTitleZh: "貼近成人生活的矯正療程",
    intro: [
      "Many adults missed orthodontic treatment when they were younger. Others notice their teeth have shifted over time.",
      "Modern orthodontics allows adults to improve both appearance and function while balancing work, family, and everyday commitments.",
    ],
    introZh: [
      "許多成人在小時候沒有機會做矯正，也有不少人發現牙齒會隨著時間慢慢移位。",
      "現代矯正技術讓成人能在兼顧工作、家庭與日常生活的同時，改善外觀與咬合功能。",
    ],
    primarySectionTitle: "Common Reasons Adults Seek Treatment",
    primarySectionTitleZh: "成人尋求矯正的常見原因",
    primaryItems: [
      "Crowding",
      "Relapse after childhood braces",
      "Bite discomfort",
      "Cosmetic concerns",
      "Preparation for dental work",
    ],
    primaryItemsZh: [
      "牙齒擁擠",
      "小時候做完矯正後又移位",
      "咬合不適",
      "美觀考量",
      "為其他牙科治療做準備",
    ],
    whyUs:
      "Adult patients often have different priorities. Treatment should feel practical, comfortable, and clearly planned.",
    whyUsZh:
      "成人病患的考量與孩子不同。療程應該務實、舒適，並且每一步都規劃清楚。",
    mostEffective: "[Dr. Tsai to confirm the most effective option]",
    mostEffectiveZh: "[由醫師補充最有效的選項]",
    faqs: [],
    related: ["invisalign", "braces-and-fixed-appliances", "retainers"],
    metaTitle: "Adult Orthodontics — Tsai Orthodontics Vancouver",
    metaDescription:
      "Adult orthodontic treatment in Vancouver with clear options, practical planning, and specialist-level guidance.",
  },
  {
    slug: "braces-and-fixed-appliances",
    name: "Braces & Fixed Appliances",
    nameZh: "Braces 與固定式矯正器",
    short: "Precise, dependable tooth movement with modern fixed appliances.",
    shortZh: "以現代化的固定式矯正器，達成精準且穩定的牙齒移動。",
    ctaLabel: "Explore Braces",
    ctaLabelZh: "了解 Braces",
    image: svcBraces,
    heroImageDirection: "Modern braces with close-up smile photography.",
    heroAlt: "Modern braces with close-up smile photography",
    heroTitle: "Reliable Solutions With Proven Results",
    heroTitleZh: "穩定可靠、成果可期的矯正方式",
    intro: [
      "Fixed appliances remain one of the most effective ways to guide tooth movement with precision.",
      "Today's braces are smaller and more comfortable while allowing excellent control over complex orthodontic treatment.",
    ],
    introZh: [
      "固定式矯正器至今仍是引導牙齒精準移動最有效的方式之一。",
      "現今的 Braces 體積更小、配戴更舒適，同時依然能精準掌握較複雜的矯正療程。",
    ],
    primarySectionTitle: "Suitable For",
    primarySectionTitleZh: "適合的情況",
    primaryItems: [
      "Crowding",
      "Spacing",
      "Overbite",
      "Underbite",
      "Crossbite",
      "Complex alignment",
    ],
    primaryItemsZh: [
      "牙齒擁擠",
      "牙齒縫隙過大",
      "深咬（暴牙）",
      "戽斗",
      "錯咬",
      "較複雜的齒列排列",
    ],
    mostEffective: "Modern fixed metal braces — the most precise and reliable option for complex tooth movement and bite correction.",
    mostEffectiveZh: "現代化的固定式金屬 Braces——處理複雜牙齒移動與咬合矯正時，最精準也最穩定的選擇。",
    faqs: [],
    related: ["children-and-teens", "adults", "retainers"],
    metaTitle: "Braces & Fixed Appliances — Tsai Orthodontics Vancouver",
    metaDescription:
      "Modern braces and fixed orthodontic appliances in Vancouver for precise, specialist-planned tooth movement.",
  },
  {
    slug: "invisalign",
    name: "Invisalign",
    nameZh: "Invisalign 隱形牙套",
    short: "Clear aligner treatment that is digitally planned and carefully monitored.",
    shortZh: "以數位化方式規劃、由專科醫師細心追蹤的隱形牙套療程。",
    ctaLabel: "Explore Invisalign",
    ctaLabelZh: "了解 Invisalign",
    image: svcInvisalign,
    heroImageDirection: "Adult patient with subtle clear aligners.",
    heroAlt: "Adult patient with subtle clear aligners",
    heroTitle: "A Clear Approach To Orthodontic Care",
    heroTitleZh: "更低調、更清晰的矯正選擇",
    intro: [
      "For many patients, clear aligners provide a discreet way to straighten teeth without traditional braces.",
      "Treatment is digitally planned and carefully monitored to achieve predictable results.",
    ],
    introZh: [
      "對許多人而言，隱形牙套是一種不需要傳統矯正器、相對低調的牙齒矯正方式。",
      "療程由數位化方式規劃，並由專科醫師細心追蹤，讓矯正結果更具預測性。",
    ],
    primarySectionTitle: "Benefits",
    primarySectionTitleZh: "Invisalign 的優點",
    primaryItems: [
      "Nearly invisible",
      "Removable",
      "Comfortable",
      "Easier daily hygiene",
    ],
    primaryItemsZh: [
      "幾乎看不見",
      "可自行取下",
      "配戴舒適",
      "日常清潔更方便",
    ],
    mostEffective: "A full-arch Invisalign clear aligner plan with carefully placed attachments and planned refinements for predictable results.",
    mostEffectiveZh: "完整齒列的 Invisalign 隱形牙套療程，搭配精心配置的附件與後續微調，達成可預期的矯正成果。",
    faqs: [],
    related: ["adults", "children-and-teens", "retainers"],
    metaTitle: "Invisalign Clear Aligners — Tsai Orthodontics Vancouver",
    metaDescription:
      "Invisalign clear aligner treatment in Vancouver, digitally planned and carefully monitored by Tsai Orthodontics.",
  },
  {
    slug: "phase-i-treatment",
    name: "Phase I Treatment",
    nameZh: "Phase I Treatment 兒童早期矯正",
    short: "Early guidance for selected children when timing truly matters.",
    shortZh: "在發育關鍵期，為特定孩子提供的早期矯正引導。",
    ctaLabel: "Explore Phase I Treatment",
    ctaLabelZh: "了解 Phase I Treatment",
    image: journeyParents,
    heroImageDirection: "Young child with parent.",
    heroAlt: "Young child with parent",
    heroTitle: "Early Guidance When It Truly Makes A Difference",
    heroTitleZh: "在真正關鍵的時刻，給予早期引導",
    intro: [
      "Phase I treatment is not recommended for every child.",
      "When growth patterns suggest future problems, early intervention may help guide development and simplify later treatment.",
    ],
    introZh: [
      "Phase I Treatment 並不是每個孩子都需要。",
      "當孩子的發育模式顯示未來可能出現問題時，早期介入有機會引導顎骨發育，並讓日後的治療更為單純。",
    ],
    primarySectionTitle: "Goals",
    primarySectionTitleZh: "治療目標",
    primaryItems: [
      "Guide jaw growth",
      "Create space",
      "Reduce future complexity",
      "Improve developing bite",
    ],
    primaryItemsZh: [
      "引導顎骨發育",
      "為恆牙騰出空間",
      "降低未來治療的複雜度",
      "改善發育中的咬合",
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
    nameZh: "Airway Friendly Orthodontics 呼吸道友善矯正",
    short: "Orthodontic planning that considers growth, facial structure, and airway development.",
    shortZh: "將孩子的成長、臉型結構與呼吸道發育一併納入考量的矯正規劃。",
    ctaLabel: "Explore Airway Friendly Care",
    ctaLabelZh: "了解呼吸道友善矯正",
    image: svcAirway,
    heroImageDirection: "Digital growth analysis and child profile.",
    heroAlt: "Digital growth analysis and child profile",
    heroTitle: "Looking Beyond The Teeth",
    heroTitleZh: "不只是看牙齒",
    intro: [
      "Orthodontic planning should consider more than alignment alone.",
      "Growth, facial structure, and airway development are all part of the bigger picture when evaluating young patients.",
    ],
    introZh: [
      "矯正治療不應該只看牙齒排列。",
      "在評估孩子時，成長、臉型結構與呼吸道發育，都是整體規劃中不可忽略的一部分。",
    ],
    primarySectionTitle: "Our Philosophy",
    primarySectionTitleZh: "我們的理念",
    primaryItems: [
      "We believe every patient deserves an evaluation that considers overall development rather than focusing only on straight teeth.",
    ],
    primaryItemsZh: [
      "我們相信，每位病患都值得一份不只看牙齒排列、而是顧及整體發育的完整評估。",
    ],
    whyUs:
      "We believe every patient deserves an evaluation that considers overall development rather than focusing only on straight teeth.",
    whyUsZh:
      "我們相信，每位病患都值得一份不只看牙齒排列、而是顧及整體發育的完整評估。",
    faqs: [],
    related: ["phase-i-treatment", "marpe", "children-and-teens"],
    metaTitle: "Airway Friendly Orthodontics — Tsai Orthodontics Vancouver",
    metaDescription:
      "Airway friendly orthodontic planning in Vancouver that considers growth, facial structure, and developing bites.",
  },
  {
    slug: "marpe",
    name: "MARPE",
    nameZh: "MARPE 上顎骨擴張",
    short: "Miniscrew-assisted rapid palatal expansion for carefully selected cases.",
    shortZh: "結合骨釘的上顎快速擴張，適用於經過審慎評估的個案。",
    ctaLabel: "Explore MARPE",
    ctaLabelZh: "了解 MARPE",
    image: svcMarpe,
    heroImageDirection: "Digital orthodontic planning model.",
    heroAlt: "Digital orthodontic planning model",
    heroTitle: "Advanced Expansion For Selected Cases",
    heroTitleZh: "為特定個案設計的進階擴張治療",
    intro: [
      "MARPE (Miniscrew-Assisted Rapid Palatal Expansion) is an advanced technique used for carefully selected patients who require skeletal expansion.",
      "Not every patient is a candidate, which is why careful evaluation is essential.",
    ],
    introZh: [
      "MARPE（Miniscrew-Assisted Rapid Palatal Expansion）是一種進階的上顎骨擴張技術，適用於經過審慎評估、確實需要骨骼層級擴張的病患。",
      "並非每位病患都適合，因此事前的完整評估非常重要。",
    ],
    primarySectionTitle: "Benefits",
    primarySectionTitleZh: "MARPE 的優點",
    primaryItems: [
      "Skeletal expansion",
      "Improved arch development",
      "Reduced need for surgery in some cases",
      "Specialist planning",
    ],
    primaryItemsZh: [
      "達成骨骼層級的擴張",
      "改善牙弓發育",
      "在部分個案中可降低手術需求",
      "由專科醫師完整規劃",
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
    nameZh: "Retainers 維持器",
    short: "Long-term retention care to help preserve orthodontic results.",
    shortZh: "長期的維持器照護，協助穩定維持矯正成果。",
    ctaLabel: "Explore Retainers",
    ctaLabelZh: "了解 Retainers",
    image: svcRetainers,
    heroImageDirection: "Clear retainer in a patient's hand.",
    heroAlt: "Clear retainer in a patient's hand",
    heroTitle: "Keeping Your Smile Stable",
    heroTitleZh: "讓你的笑容長期穩定",
    intro: [
      "Orthodontic treatment does not end when appliances come off.",
      "Retainers help preserve the result you worked hard to achieve and reduce the natural tendency for teeth to shift over time.",
    ],
    introZh: [
      "矯正療程並不會在拆下矯正器的那一刻就結束。",
      "Retainers 維持器能協助維持得來不易的矯正成果，降低牙齒隨時間自然移位的傾向。",
    ],
    primarySectionTitle: "Retention Care",
    primarySectionTitleZh: "維持器照護",
    primaryItems: [
      "Clear retainers",
      "Fixed retainers",
      "Replacement retainers",
      "Long-term maintenance",
    ],
    primaryItemsZh: [
      "透明活動式維持器",
      "固定式維持器",
      "維持器補製",
      "長期穩定維護",
    ],
    mostEffective: "A combination of bonded fixed retainers behind the front teeth with clear removable retainers worn at night — the most reliable way to keep teeth stable long-term.",
    mostEffectiveZh: "前牙背面黏著的固定式維持器，搭配夜間配戴的透明活動式維持器——長期維持牙齒穩定最可靠的做法。",
    faqs: [],
    related: ["braces-and-fixed-appliances", "invisalign", "adults"],
    metaTitle: "Orthodontic Retainers — Tsai Orthodontics Vancouver",
    metaDescription:
      "Clear retainers, fixed retainers, replacement retainers, and long-term orthodontic retention care in Vancouver.",
  },
].map((s) => {
  const raw = SERVICE_GALLERIES[s.slug] ?? [];
  // Drop any gallery photo that matches the hero image or repeats another entry.
  const seen = new Set<string>([s.image]);
  const gallery = raw.filter((g) => {
    if (seen.has(g.src)) return false;
    seen.add(g.src);
    return true;
  });
  return { ...s, gallery };
});

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
);

/**
 * Returns a service whose translatable strings are swapped to the given language.
 * Keeps the same shape so all existing route code continues to work.
 */
export function localizedService(s: Service, lang: Lang): Service {
  if (lang !== "zh") return s;
  return {
    ...s,
    name: s.nameZh || s.name,
    short: s.shortZh || s.short,
    ctaLabel: s.ctaLabelZh || s.ctaLabel,
    heroTitle: s.heroTitleZh || s.heroTitle,
    intro: s.introZh && s.introZh.length ? s.introZh : s.intro,
    primarySectionTitle: s.primarySectionTitleZh || s.primarySectionTitle,
    primaryItems:
      s.primaryItemsZh && s.primaryItemsZh.length ? s.primaryItemsZh : s.primaryItems,
    expectTitle: s.expectTitleZh ?? s.expectTitle,
    expectItems:
      s.expectItemsZh && s.expectItemsZh.length ? s.expectItemsZh : s.expectItems,
    whyUs: s.whyUsZh ?? s.whyUs,
    faqs: s.faqs.map((f) => ({
      ...f,
      q: f.qZh || f.q,
      a: f.aZh || f.a,
    })),
  };
}
