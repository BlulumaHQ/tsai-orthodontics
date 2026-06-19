import phaseOneFeature from "@/assets/phase-1-feature-001.webp.asset.json";
import invisalignFeature from "@/assets/invisalign_feature.webp.asset.json";
import marpeFeature from "@/assets/marpe-007.webp.asset.json";
import retainerFeature from "@/assets/retainer-009-feature.webp.asset.json";
import bracesFeature from "@/assets/brace-feature.webp.asset.json";
import airwayFeature from "@/assets/air-way-004.webp.asset.json";
import kidsFeature from "@/assets/005_1.webp.asset.json";
import adultsFeature from "@/assets/012.webp.asset.json";
import type { Lang } from "@/lib/i18n";

const svcBraces = bracesFeature.url;
const svcInvisalign = invisalignFeature.url;
const svcRetainers = retainerFeature.url;
const svcMarpe = marpeFeature.url;
const svcAirway = airwayFeature.url;
const journeyKids = kidsFeature.url;
const journeyAdults = adultsFeature.url;
const journeyParents = phaseOneFeature.url;

export interface ServiceFAQ {
  q: string;
  a: string;
  qZh?: string;
  aZh?: string;
}

export type ServiceBlock =
  | { kind: "p"; en: string; zh: string }
  | { kind: "subhead"; en: string; zh: string }
  | {
      kind: "bullets";
      en: string;
      zh: string;
      items: { en: string; zh: string }[];
    }
  | {
      kind: "steps";
      en: string;
      zh: string;
      items: { en: string; zh: string }[];
    };

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
  body: ServiceBlock[];
  ctaLead: { en: string; zh: string };
  // Kept for back-compat with legacy structured fields used by services not yet
  // rewritten under the new template. Intro/etc are no longer rendered.
  mostEffective?: string;
  mostEffectiveZh?: string;
  faqs: ServiceFAQ[];
  related: string[];
  metaTitle: string;
  metaDescription: string;
  gallery?: { src: string; alt: string }[];
}

// Only photos that actually match the service. Number of photos varies by service —
// we don't force every page to have the same count.
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

// Default CTA lead used by services not yet rewritten under the v4 template.
const DEFAULT_CTA_LEAD = {
  en: "Curious if this is right for you?",
  zh: "想知道是否適合你？",
};

const SERVICES_RAW: Omit<Service, "gallery">[] = [
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
    body: [
      {
        kind: "p",
        en: "The most useful thing you can do for your child's smile is simple: bring them in for an evaluation. From there, the timing is our job. No two children develop on the same schedule, and the hard part for parents isn't finding someone willing to put braces on — it's finding someone who will tell them honestly whether, and when, their child needs anything at all. We'll watch your child over time and let you know the right moment to begin. For many, that first visit ends with: everything's developing well, see you in a year.",
        zh: "為孩子的笑容，你能做最有用的一件事其實很簡單：帶他來做一次評估。接下來的時機判斷，就交給我們。沒有兩個孩子的發育時程是一樣的，而對家長來說，難的從來不是找到一個願意幫孩子裝矯正器的人，而是找到一個會誠實告訴你「孩子到底需不需要、什麼時候才需要」的人。我們會持續追蹤孩子的狀況，在最適當的時機通知你開始。對許多孩子來說，第一次看診的結論往往是：一切發育良好，我們一年後見。",
      },
      { kind: "subhead", en: "Two windows when treatment usually begins", zh: "矯正通常開始的兩個時機" },
      {
        kind: "p",
        en: "Orthodontic care for children tends to start at one of two points. The first is early intervention, or Phase I treatment — a focused, limited treatment while a child still has baby teeth, used only when a specific problem is better addressed sooner than later. The second, and far more common, is comprehensive treatment once all the baby teeth have fallen out and the adult teeth are in. Most children only ever need this second stage; the value of starting evaluations early is knowing which path is yours and not missing the window if early treatment is genuinely warranted.",
        zh: "兒童矯正通常會在兩個時間點之一開始。第一個是早期介入，也就是 Phase I 治療——在孩子仍有乳牙時進行、聚焦且範圍有限的治療，只有在某個特定問題「早處理比晚處理好」時才會採用。第二個、也是更常見的，是等乳牙全部換完、恆牙長齊後的全口矯正。大多數孩子其實只需要第二階段；提早開始評估的價值，在於弄清楚你的孩子屬於哪一條路，並在真正需要早期治療時，不錯過那個時機窗口。",
      },
      { kind: "subhead", en: "Why the teen years are the sweet spot", zh: "為什麼青少年時期是黃金期" },
      {
        kind: "p",
        en: "Treating teenagers is the most common scenario we see, and there's a real biological reason it works so well. While a teen is still growing, teeth move and align more readily, and we have far more ability to influence jaw growth than we do once development is complete. Working with that growth rather than against it often means a smoother, more efficient result (and one that you can enjoy for longer!) than waiting until adulthood.",
        zh: "治療青少年是我們最常遇到的情況，而它之所以效果好，有實在的生理原因。青少年仍在發育期間，牙齒移動與排列更為容易，我們也比發育完成後更有能力去影響顎骨生長。順著這股生長力、而非與之對抗，往往能帶來比成年後才治療更順暢、更有效率的結果（而且可以享受得更久！）。",
      },
      {
        kind: "bullets",
        en: "Worth booking an evaluation if you notice:",
        zh: "若你注意到以下情況，值得預約一次評估：",
        items: [
          { en: "Crowded, overlapping, or crooked teeth", zh: "牙齒擁擠、重疊或歪斜" },
          { en: "Difficulty chewing, or a bite that looks or feels off", zh: "咀嚼困難，或咬合看起來、感覺起來不對勁" },
          { en: "Baby teeth lost very early or very late", zh: "乳牙過早或過晚脫落" },
          { en: "Adult teeth coming in out of position or blocked from erupting", zh: "恆牙長歪，或被阻擋無法萌發" },
          { en: "Mouth breathing, snoring, or a narrow palate", zh: "用嘴呼吸、打鼾，或上顎狹窄" },
        ],
      },
      {
        kind: "p",
        en: "You'll get a careful exam and a clear explanation, in plain language. Reading a growing patient correctly is what orthodontic specialty training is for, which is why so many general dentists refer their young patients to us. The goal isn't only straight teeth; it's healthy function and balanced development that lasts.",
        zh: "你會得到仔細的檢查，以及用白話、清楚的說明。正確判讀一個還在發育的孩子，正是齒顎矯正專科訓練存在的意義——這也是為什麼許多家庭牙醫會把他們的小病患轉介給我們。我們的目標不只是把牙齒排整齊，而是健康的口腔功能與能長久維持的均衡發育。",
      },
    ],
    ctaLead: {
      en: "Bring your child in — we'll tell you when the time is right.",
      zh: "帶孩子來吧——對的時機，我們會告訴你。",
    },
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
    heroTitle: "Orthodontic Treatment That Fits Your Life",
    heroTitleZh: "貼合你生活的矯正治療",
    body: [
      {
        kind: "p",
        en: "Plenty of adults assume the window for straightening their teeth closed after high school. It didn't. Teeth respond to treatment at virtually any age, and a large share of our patients are adults: some who never had the chance as children, some whose teeth have drifted over the years, and others preparing for other dental work. If you've been quietly bothered by your smile for a decade, you have more options than you think.",
        zh: "許多成人以為，把牙齒矯正整齊的機會在高中畢業後就關上了。其實沒有。牙齒幾乎在任何年齡都能對治療產生反應，而我們有很大一部分的病患都是成人：有些人小時候沒有機會、有些人的牙齒多年來逐漸位移，也有些人是在為其他牙科治療做準備。如果你已經默默為自己的笑容困擾了十年，你的選擇其實比你想的多。",
      },
      {
        kind: "p",
        en: "Adult treatment today is faster, more comfortable, and far more discreet than the braces you remember. Clear aligners are nearly invisible; modern braces are smaller and gentler. The right choice depends on your bite, your goals, and how the appliance fits into your work and social life — not on a one-size-fits-all default.",
        zh: "今天的成人矯正，比你印象中的矯正器更快、更舒適，也更不顯眼。清晰隱形牙套幾乎看不出來；現代的矯正器也更小、更溫和。怎麼選，取決於你的咬合、你的目標，以及這個矯正裝置如何融入你的工作與社交生活——而不是套用一個「一體適用」的預設答案。",
      },
      {
        kind: "bullets",
        en: "Adults most often come to us for:",
        zh: "成人來找我們，最常見的原因是：",
        items: [
          { en: "Crowding or crookedness that's worsened with age", zh: "隨年齡加重的擁擠或歪斜" },
          { en: "Teeth that have relapsed since childhood braces", zh: "小時候矯正後又跑回去的牙齒" },
          { en: "A bite that causes discomfort, uneven wear, or jaw strain", zh: "造成不適、磨耗不均或顎部緊繃的咬合" },
          { en: "Cosmetic concerns ahead of a wedding, a career change, or a long-held wish", zh: "婚禮、轉職前的外觀考量，或放在心裡很久的願望" },
          { en: "Alignment needed before crowns, bridges, or implants", zh: "在做牙冠、牙橋或植牙前需要先排列整齊" },
        ],
      },
      {
        kind: "p",
        en: "We begin with a consultation built around your priorities. Adults arrive with sharper questions than teenagers: how long, how visible, how much it interferes with daily life — and you'll get direct answers, including a realistic timeline and a clear sense of cost. Treatment is planned digitally so you can see where we're headed before we begin, and appointments respect a working calendar.",
        zh: "我們會從一次以你的需求為核心的諮詢開始。成人提出的問題往往比青少年更具體：要多久、明不明顯、對日常生活干擾多大——你會得到直接的答案，包括實際的時程與清楚的費用概念。治療採數位化規劃，讓你在開始前就能看見方向，回診時間也會配合你的工作行程。",
      },
      { kind: "subhead", en: "Why this is specialist work for adults", zh: "為什麼成人矯正是專科的工作" },
      {
        kind: "p",
        en: "Adult cases carry considerations children's cases don't: gum health, existing dental work, prior wear. We plan around all of it and coordinate with your dentist when restorative work is involved. Many adults worry about looking like they're \"back in braces\", but most end up surprised how little anyone notices a clear aligner across a meeting table. We'll walk you through every option so the choice is genuinely yours.",
        zh: "成人病例有著兒童病例沒有的考量：牙周健康、既有的牙科治療、過往的磨耗。我們會把這些全部納入規劃，並在涉及補綴治療時與你的牙醫協調。許多成人擔心自己看起來像「又戴回牙套」，但大多數人最後都驚訝地發現——在會議桌對面，幾乎沒人會注意到那副清晰隱形牙套。我們會帶你了解每一個選項，讓這個決定真正屬於你。",
      },
    ],
    ctaLead: {
      en: "Wondering what treatment would look like for you?",
      zh: "想知道矯正對你來說會是什麼樣子？",
    },
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
    heroTitle: "Proven, Precise, and Still the Right Tool for Many Cases",
    heroTitleZh: "成熟、精準，至今仍是許多病例的正解",
    body: [
      {
        kind: "p",
        en: "Braces, or fixed appliances, remain one of the most effective and dependable ways to move teeth — and for some cases, they're simply the better instrument. When a bite is complex, or teeth need to be rotated or moved in ways aligners struggle with, fixed appliances give the orthodontist a degree of control that's hard to match. The braces themselves have come a long way: smaller, smoother, and more comfortable than the ones you may remember.",
        zh: "矯正器（固定式矯正裝置）至今仍是移動牙齒最有效、最可靠的方式之一；而在某些病例裡，它就是更好的那把工具。當咬合複雜、或牙齒需要旋轉、需要以隱形牙套較難達成的方式移動時，固定式矯正器能給醫師難以取代的控制力。矯正器本身也進步了許多：比你印象中的更小、更平滑、也更舒適。",
      },
      {
        kind: "p",
        en: "Because braces are bonded to your teeth throughout treatment, they deliver steady, predictable force exactly where it's needed. For certain cases involving a skeletal discrepancy — where the issue is the jaws themselves, not just the teeth — we may add functional appliances or expanders to influence skeletal growth, particularly in patients who are still developing. That's a level of correction simple alignment can't achieve on its own.",
        zh: "由於矯正器在整個治療期間都黏著在牙齒上，它能在需要的位置施加穩定、可預期的力量。對於某些涉及骨骼差異的病例——問題出在顎骨本身、而不只是牙齒——我們可能會加上功能性裝置或擴張器來影響骨骼生長，尤其是在仍處於發育期的病患身上。那是單純排列牙齒無法單獨達成的矯正層級。",
      },
      {
        kind: "bullets",
        en: "Braces are often the right choice for:",
        zh: "在以下情況，矯正器往往是對的選擇：",
        items: [
          { en: "Crowding or spacing that needs substantial correction", zh: "需要大幅矯正的擁擠或縫隙" },
          { en: "Overbite, underbite, or crossbite", zh: "深咬、戽斗（下顎前突）或錯咬" },
          { en: "Teeth that are rotated or badly out of position", zh: "嚴重旋轉或位置偏差的牙齒" },
          { en: "Complex cases where predictability matters most", zh: "最看重可預期性的複雜病例" },
          { en: "Younger patients for whom remembering to wear aligners is a gamble", zh: "難以乖乖配戴隱形牙套的年輕病患" },
        ],
      },
      {
        kind: "p",
        en: "The braces are bonded in a single comfortable visit — no needles, no drilling — followed by short periodic adjustments as your teeth move into place. There's a few days of adjustment after placement; over-the-counter relief and soft foods handle it easily. For our braces patients, we provide guidelines on which foods to watch out for. Dislodged brackets do happen, and excessive breakage could increase your treatment time. Keeping everything clean is one of the biggest factors in protecting your oral health throughout treatment and finishing on time with a healthy, beautiful result.",
        zh: "矯正器會在單次、舒適的看診中黏著完成，不用打針、也不需鑽牙，之後再依牙齒移動的進度做幾次簡短的定期調整。黏著後會有幾天的適應期，用市售止痛藥與軟質食物就能輕鬆度過。對於我們的矯正器病患，我們會提供需要留意的飲食指引。托槽（bracket）脫落是會發生的，而過度損壞可能拉長你的療程。把一切清潔乾淨，是在整個療程中守護口腔健康、並如期以健康又美麗的成果完成治療的最關鍵因素之一。",
      },
      { kind: "subhead", en: "Braces or aligners — how we decide", zh: "矯正器還是隱形牙套——我們怎麼決定" },
      {
        kind: "p",
        en: "It depends on your case, not on what's trendy. Some bites are handled beautifully either way, and then it comes down to preference. Others genuinely call for one approach, and we'll tell you which and why rather than letting you choose blind. Bonding brackets is the easy part; knowing where to place each one and how to sequence the movements is the craft — and that planning is what orthodontic specialty training exists to do.",
        zh: "這取決於你的病例，而不是哪個比較流行。有些咬合用兩種方式都能處理得很漂亮，那就看你的偏好；有些則確實只適合其中一種，我們會告訴你是哪一種、以及為什麼，而不是讓你盲選。黏上托槽是容易的部分；知道每一顆該黏在哪裡、移動該以什麼順序進行，才是真正的工藝——而那份規劃，正是齒顎矯正專科訓練存在的目的。",
      },
    ],
    ctaLead: {
      en: "Want to know if braces are right for your case?",
      zh: "想知道矯正器適不適合你的病例？",
    },
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
    heroTitle: "Straighten Your Teeth Without Anyone Noticing",
    heroTitleZh: "不著痕跡地，把牙齒變整齊",
    body: [
      {
        kind: "p",
        en: "For a lot of people, the appeal of Invisalign is simple: straight teeth without a mouth full of metal. The aligners are clear, removable, and discreet enough that most people won't know you're wearing them. But the part that matters most happens before any aligner goes in: the planning. Clear aligners are only as good as the diagnosis and treatment design behind them — which is exactly where seeing an orthodontist makes the difference.",
        zh: "對許多人來說，Invisalign 的吸引力很簡單：把牙齒變整齊，又不必滿口金屬。隱形牙套透明、可拆卸，低調到大多數人不會發現你正戴著它。但真正最關鍵的部分，發生在任何一副牙套戴進嘴裡之前——也就是規劃。清晰隱形牙套的成效，完全取決於背後的診斷與治療設計，而這正是「找齒顎矯正專科醫師」會帶來差別的地方。",
      },
      {
        kind: "p",
        en: "Invisalign uses a series of custom aligners, and we give you multiple sets to switch at a pre-set interval, usually one a week. Every set shifts your teeth a small, planned amount, and you can often preview your projected result at the consultation. You wear them around 22 hours a day, removing them to eat, brush, and drink. For aligner patients, sticking to the wear schedule is key to reaching your smile goals as quickly and efficiently as possible.",
        zh: "Invisalign 使用一系列客製化的牙套，我們會一次給你多副，依預定的間隔更換，通常一週一副。每一副都會讓牙齒做一小段、經過規劃的移動，而你往往在諮詢時就能預覽預計的結果。你每天大約配戴 22 小時，吃東西、刷牙、喝飲料時取下。對隱形牙套的病患來說，遵守配戴時程，是讓我們盡可能快速、有效率地達成笑容目標的關鍵。",
      },
      {
        kind: "bullets",
        en: "The advantages patients value most:",
        zh: "病患最看重的優點：",
        items: [
          { en: "Nearly invisible, comfortable in professional and social settings", zh: "幾乎看不見，在職場與社交場合都自在" },
          { en: "Removable, so you eat what you like and clean your teeth normally", zh: "可拆卸，想吃什麼都行，也能正常清潔牙齒" },
          { en: "No brackets or wires to irritate cheeks and gums", zh: "沒有托槽或鋼線去刺激臉頰與牙齦" },
          { en: "A clear, planned sense of where treatment is heading", zh: "清楚、有規劃地掌握治療的走向" },
        ],
      },
      {
        kind: "p",
        en: "We start with a digital scan and design your treatment from there, checking in periodically to confirm your teeth are tracking to plan. The honest catch is discipline: aligners only work when they're in your mouth. Patients who wear them as directed tend to be delighted; those who leave them in a drawer don't get the result.",
        zh: "我們會從數位口掃開始，並以此設計你的療程，再定期回診確認牙齒按計畫在移動。老實說，唯一的門檻是自律：隱形牙套只有在你的嘴裡時才有用。乖乖按指示配戴的病患通常都很滿意；把它丟在抽屜裡的，就得不到效果。",
      },
      { kind: "subhead", en: "Is Invisalign right for everyone?", zh: "Invisalign 適合每個人嗎？" },
      {
        kind: "p",
        en: "No — and that's worth saying plainly, because a lot of marketing implies otherwise. Clear aligners handle many cases beautifully, and some complex ones less reliably than braces. We'll tell you honestly which camp your case falls into. And unlike a mail-order kit, your treatment here is planned and supervised start to finish by a board-certified orthodontist who has examined your bite, roots, and gums — the oversight that protects your teeth from real, lasting harm.",
        zh: "不——這點值得直說，因為很多行銷暗示的剛好相反。清晰隱形牙套能把許多病例處理得很漂亮，但有些複雜病例，它的可靠度不如矯正器。你的病例屬於哪一類，我們會誠實告訴你。而且，跟郵購牙套組不同，你在這裡的療程，是由一位檢查過你咬合、牙根與牙齦的認證齒顎矯正專科醫師，從頭到尾規劃並監督——正是這份把關，保護你的牙齒免於真正、長久的傷害。",
      },
    ],
    ctaLead: {
      en: "Curious whether you're a candidate?",
      zh: "想知道自己是不是適合的人選？",
    },
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
    body: [
      {
        kind: "p",
        en: "Phase I treatment is not recommended for every child. When growth patterns suggest future problems, early intervention may help guide development and simplify later treatment.",
        zh: "Phase I Treatment 並不是每個孩子都需要。當孩子的發育模式顯示未來可能出現問題時，早期介入有機會引導顎骨發育，並讓日後的治療更為單純。",
      },
      {
        kind: "bullets",
        en: "Goals:",
        zh: "治療目標：",
        items: [
          { en: "Guide jaw growth", zh: "引導顎骨發育" },
          { en: "Create space", zh: "為恆牙騰出空間" },
          { en: "Reduce future complexity", zh: "降低未來治療的複雜度" },
          { en: "Improve developing bite", zh: "改善發育中的咬合" },
        ],
      },
    ],
    ctaLead: DEFAULT_CTA_LEAD,
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
    body: [
      {
        kind: "p",
        en: "Orthodontic planning should consider more than alignment alone. Growth, facial structure, and airway development are all part of the bigger picture when evaluating young patients.",
        zh: "矯正治療不應該只看牙齒排列。在評估孩子時，成長、臉型結構與呼吸道發育，都是整體規劃中不可忽略的一部分。",
      },
      {
        kind: "p",
        en: "We believe every patient deserves an evaluation that considers overall development rather than focusing only on straight teeth.",
        zh: "我們相信，每位病患都值得一份不只看牙齒排列、而是顧及整體發育的完整評估。",
      },
    ],
    ctaLead: DEFAULT_CTA_LEAD,
    faqs: [],
    related: ["phase-i-treatment", "marpe", "children-and-teens"],
    metaTitle: "Airway Friendly Orthodontics — Tsai Orthodontics Vancouver",
    metaDescription:
      "Airway friendly orthodontic planning in Vancouver that considers growth, facial structure, and developing bites.",
  },
  {
    slug: "marpe",
    name: "MARPE / TADs",
    nameZh: "MARPE / TADs 上顎骨擴張與骨釘",
    short: "Miniscrew-assisted rapid palatal expansion, supported by TADs, for carefully selected cases.",
    shortZh: "結合骨釘（TADs）的上顎快速擴張，適用於經過審慎評估的個案。",
    ctaLabel: "Explore MARPE / TADs",
    ctaLabelZh: "了解 MARPE / TADs",
    image: svcMarpe,
    heroImageDirection: "Digital orthodontic planning model.",
    heroAlt: "Digital orthodontic planning model",
    heroTitle: "Advanced Expansion For Selected Cases",
    heroTitleZh: "為特定個案設計的進階擴張治療",
    body: [
      {
        kind: "p",
        en: "MARPE (Miniscrew-Assisted Rapid Palatal Expansion) is an advanced technique used for carefully selected patients who require skeletal expansion.",
        zh: "MARPE（Miniscrew-Assisted Rapid Palatal Expansion）是一種進階的上顎骨擴張技術，適用於經過審慎評估、確實需要骨骼層級擴張的病患。",
      },
      {
        kind: "p",
        en: "TADs (Temporary Anchorage Devices, or 骨釘) are small titanium mini-screws used alongside MARPE in selected cases to provide precise, stable anchorage and guide difficult tooth movements that braces or aligners alone cannot achieve. Not every patient is a candidate, which is why careful evaluation is essential.",
        zh: "TADs（Temporary Anchorage Devices，骨釘）是極小的鈦合金骨釘，在特定個案中會與 MARPE 搭配使用，提供精準穩定的支撐點，協助完成單靠 Braces 或隱形牙套較難達成的牙齒移動。並非每位病患都適合，因此事前的完整評估非常重要。",
      },
      {
        kind: "bullets",
        en: "Benefits:",
        zh: "MARPE 的優點：",
        items: [
          { en: "Skeletal expansion", zh: "達成骨骼層級的擴張" },
          { en: "Improved arch development", zh: "改善牙弓發育" },
          { en: "Reduced need for surgery in some cases", zh: "在部分個案中可降低手術需求" },
          { en: "Specialist planning", zh: "由專科醫師完整規劃" },
        ],
      },
    ],
    ctaLead: DEFAULT_CTA_LEAD,
    faqs: [],
    related: ["airway-friendly-orthodontics", "phase-i-treatment", "adults"],
    metaTitle: "MARPE / TADs Palatal Expansion — Tsai Orthodontics Vancouver",
    metaDescription:
      "MARPE and TADs in Vancouver for selected orthodontic expansion cases requiring careful specialist evaluation.",
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
    body: [
      {
        kind: "p",
        en: "Orthodontic treatment does not end when appliances come off. Retainers help preserve the result you worked hard to achieve and reduce the natural tendency for teeth to shift over time.",
        zh: "矯正療程並不會在拆下矯正器的那一刻就結束。Retainers 維持器能協助維持得來不易的矯正成果，降低牙齒隨時間自然移位的傾向。",
      },
      {
        kind: "bullets",
        en: "Retention care:",
        zh: "維持器照護：",
        items: [
          { en: "Clear retainers", zh: "透明活動式維持器" },
          { en: "Fixed retainers", zh: "固定式維持器" },
          { en: "Replacement retainers", zh: "維持器補製" },
          { en: "Long-term maintenance", zh: "長期穩定維護" },
        ],
      },
    ],
    ctaLead: DEFAULT_CTA_LEAD,
    faqs: [],
    related: ["braces-and-fixed-appliances", "invisalign", "adults"],
    metaTitle: "Orthodontic Retainers — Tsai Orthodontics Vancouver",
    metaDescription:
      "Clear retainers, fixed retainers, replacement retainers, and long-term orthodontic retention care in Vancouver.",
  },
].map((s) => {
  const raw = SERVICE_GALLERIES[s.slug] ?? [];
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
 * body and ctaLead are inline-bilingual and read directly in the component.
 */
export function localizedService(s: Service, lang: Lang): Service {
  if (lang !== "zh") return s;
  return {
    ...s,
    name: s.nameZh || s.name,
    short: s.shortZh || s.short,
    ctaLabel: s.ctaLabelZh || s.ctaLabel,
    heroTitle: s.heroTitleZh || s.heroTitle,
    faqs: s.faqs.map((f) => ({
      ...f,
      q: f.qZh || f.q,
      a: f.aZh || f.a,
    })),
  };
}
