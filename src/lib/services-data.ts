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
  /** Optional CSS object-position for feature-image crops (portrait sources). */
  imagePosition?: string;
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
    { src: "/images/services/airway-2.webp", alt: "Airway analysis shown on the operatory monitor" },
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

export const SERVICES: Service[] = ([
  {
    slug: "children-and-teens",
    name: "Children & Teens",
    nameZh: "兒童與青少年",
    short: "Orthodontic care timed around a child or teen's natural growth.",
    shortZh: "依照孩子的自然成長階段，量身規劃的齒顎矯正照護。",
    ctaLabel: "Explore Children's Orthodontics",
    ctaLabelZh: "了解兒童矯正",
    image: "/images/services/children-teens-feature.webp",
    imagePosition: "50% 22%",
    heroImageDirection: "A child or teenager talking comfortably with Dr. Tsai and a parent.",
    heroAlt: "A child or teenager talking comfortably with Dr. Tsai and a parent",
    heroTitle: "Orthodontic Care That Grows With Your Child",
    heroTitleZh: "陪伴孩子成長的矯正照護",
    body: [
      {
        kind: "p",
        en: "The most useful thing you can do for your child's smile is simple: bring them in for an evaluation. From there, the timing is our job. No two children develop on the same schedule, and the hard part for parents isn't finding someone willing to put braces on, it's finding someone who will tell them honestly whether, and when, their child needs anything at all. We'll watch your child over time and let you know the right moment to begin. For many, that first visit ends with: everything's developing well, see you in a year.",
        zh: "為孩子的笑容，你能做最有用的一件事其實很簡單：帶他來做一次評估。接下來的時機判斷，就交給我們。沒有兩個孩子的發育時程是一樣的，而對家長來說，難的從來不是找到一個願意幫孩子裝矯正器的人，而是找到一個會誠實告訴你「孩子到底需不需要、什麼時候才需要」的人。我們會持續追蹤孩子的狀況，在最適當的時機通知你開始。對許多孩子來說，第一次看診的結論往往是：一切發育良好，我們一年後見。",
      },
      { kind: "subhead", en: "Two windows when treatment usually begins", zh: "矯正通常開始的兩個時機" },
      {
        kind: "p",
        en: "Orthodontic care for children tends to start at one of two points. The first is early intervention, or Phase I treatment, a focused, limited treatment while a child still has baby teeth, used only when a specific problem is better addressed sooner than later. The second, and far more common, is comprehensive treatment once all the baby teeth have fallen out and the adult teeth are in. Most children only ever need this second stage; the value of starting evaluations early is knowing which path is yours and not missing the window if early treatment is genuinely warranted.",
        zh: "兒童矯正通常會在兩個時間點之一開始。第一個是早期介入，也就是 Phase I 治療，在孩子仍有乳牙時進行、聚焦且範圍有限的治療，只有在某個特定問題「早處理比晚處理好」時才會採用。第二個、也是更常見的，是等乳牙全部換完、恆牙長齊後的全口矯正。大多數孩子其實只需要第二階段；提早開始評估的價值，在於弄清楚你的孩子屬於哪一條路，並在真正需要早期治療時，不錯過那個時機窗口。",
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
        zh: "你會得到仔細的檢查，以及用白話、清楚的說明。正確判讀一個還在發育的孩子，正是齒顎矯正專科訓練存在的意義，這也是為什麼許多家庭牙醫會把他們的小病患轉介給我們。我們的目標不只是把牙齒排整齊，而是健康的口腔功能與能長久維持的均衡發育。",
      },
    ],
    ctaLead: {
      en: "Bring your child in: we'll tell you when the time is right.",
      zh: "帶孩子來吧，對的時機，我們會告訴你。",
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
        en: "Plenty of adults assume the window for straightening their teeth is closed after high school. It didn't. Teeth respond to treatment at virtually any age, and a large share of our patients are adults: some who never had the chance as children, some whose teeth have drifted over the years, and others preparing for other dental work. If you've been quietly bothered by your smile for a decade, you have more options than you think.",
        zh: "許多成人以為，把牙齒矯正整齊的機會在高中畢業後就關上了。其實沒有。牙齒幾乎在任何年齡都能對治療產生反應，而我們有很大一部分的病患都是成人：有些人小時候沒有機會、有些人的牙齒多年來逐漸位移，也有些人是在為其他牙科治療做準備。如果你已經默默為自己的笑容困擾了十年，你的選擇其實比你想的多。",
      },
      {
        kind: "p",
        en: "Adult treatment today is faster, more comfortable, and far more discreet than the braces you remember. Clear aligners are nearly invisible; modern braces are smaller and gentler. The right choice depends on your bite, your goals, and how the appliance fits into your work and social life: not on a one-size-fits-all default.",
        zh: "今天的成人矯正，比你印象中的矯正器更快、更舒適，也更不顯眼。清晰隱形牙套幾乎看不出來；現代的矯正器也更小、更溫和。怎麼選，取決於你的咬合、你的目標，以及這個矯正裝置如何融入你的工作與社交生活，而不是套用一個「一體適用」的預設答案。",
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
        zh: "我們會從一次以你的需求為核心的諮詢開始。成人提出的問題往往比青少年更具體：要多久、明不明顯、對日常生活干擾多大，你會得到直接的答案，包括實際的時程與清楚的費用概念。治療採數位化規劃，讓你在開始前就能看見方向，回診時間也會配合你的工作行程。",
      },
      { kind: "subhead", en: "Why this is specialist work for adults", zh: "為什麼成人矯正是專科的工作" },
      {
        kind: "p",
        en: "Adult cases carry considerations children cases don't: gum health, existing dental work, prior wear. We plan around all of it and coordinate with your dentist when restorative work is involved. Many adults worry about looking like they're \"back in braces\", but most end up surprised how little anyone notices a clear aligner across a meeting table. We'll walk you through every option so the choice is genuinely yours.",
        zh: "成人病例有著兒童病例沒有的考量：牙周健康、既有的牙科治療、過往的磨耗。我們會把這些全部納入規劃，並在涉及補綴治療時與你的牙醫協調。許多成人擔心自己看起來像「又戴回牙套」，但大多數人最後都驚訝地發現，在會議桌對面，幾乎沒人會注意到那副清晰隱形牙套。我們會帶你了解每一個選項，讓這個決定真正屬於你。",
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
        en: "Braces, or fixed appliances, remain one of the most effective and dependable ways to move teeth, and for some cases, they're simply the better instrument. When a bite is complex, or teeth need to be rotated or moved in ways aligners struggle with, fixed appliances give the orthodontist a degree of control that's hard to match. The braces themselves have come a long way: smaller, smoother, and more comfortable than the ones you may remember.",
        zh: "矯正器（固定式矯正裝置）至今仍是移動牙齒最有效、最可靠的方式之一，而在某些病例裡，它就是更好的那把工具。當咬合複雜、或牙齒需要旋轉、需要以隱形牙套較難達成的方式移動時，固定式矯正器能給醫師難以取代的控制力。矯正器本身也進步了許多：比你印象中的更小、更平滑、也更舒適。",
      },
      {
        kind: "p",
        en: "As braces are bonded to your teeth throughout treatment, they deliver steady, predictable force exactly where it's needed. For certain cases involving a skeletal discrepancy, where the issue is the jaws themselves, not just the teeth, we may add functional appliances or expanders to influence skeletal growth, particularly in patients who are still developing. That's a level of correction simple alignment can't achieve on its own.",
        zh: "由於矯正器在整個治療期間都黏著在牙齒上，它能在需要的位置施加穩定、可預期的力量。對於某些涉及骨骼差異的病例，問題出在顎骨本身、而不只是牙齒，我們可能會加上功能性裝置或擴張器來影響骨骼生長，尤其是在仍處於發育期的病患身上。那是單純排列牙齒無法單獨達成的矯正層級。",
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
        en: "The braces are bonded in a single comfortable visit, no needles, and no drilling, followed by short periodic adjustments as your teeth move into place. There's a few days of adjustment after placement; over-the-counter relief and soft foods handle it easily. For our braces patients, we do have guidelines as to what foods to watch out for. Dislodging brackets does happen, and excessive breakage could increase your treatment time. Moreover, keeping everything clean is one of the biggest factors in maintaining your oral health throughout treatment and finishing on time with a healthy and beautiful result.",
        zh: "矯正器會在單次、舒適的看診中黏著完成，不打針、也不鑽牙，之後再依牙齒移動的進度做幾次簡短的定期調整。黏著後會有幾天的適應期，用市售止痛藥與軟質食物就能輕鬆度過。對於我們的矯正器病患，我們會提供需要留意的飲食指引。托槽脫落是會發生的，而過度損壞可能拉長你的療程。此外，把一切清潔乾淨，是在整個療程中維持口腔健康、並如期以健康又美麗的成果完成治療的最關鍵因素之一。",
      },
      { kind: "subhead", en: "Braces or aligners — how we decide", zh: "矯正器還是隱形牙套，我們怎麼決定" },
      {
        kind: "p",
        en: "It depends on your case, not on what's trendy. Some bites are handled beautifully either way, and then it comes down to preference. Others genuinely call for one approach, and we'll tell you which and why rather than letting you choose blind. Bonding brackets is the easy part, knowing where to place each one and how to sequence the movements is the craft, and that planning is what orthodontic specialty training exists to do.",
        zh: "這取決於你的病例，而不是哪個比較流行。有些咬合用兩種方式都能處理得很漂亮，那就看你的偏好；有些則確實只適合其中一種，我們會告訴你是哪一種、以及為什麼，而不是讓你盲選。黏上托槽是容易的部分，知道每一顆該黏在哪裡、移動該以什麼順序進行，才是真正的工藝，而那份規劃，正是齒顎矯正專科訓練存在的目的。",
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
    image: "/images/services/invisalign-feature.webp",
    heroImageDirection: "Adult patient with subtle clear aligners.",
    heroAlt: "Adult patient with subtle clear aligners",
    heroTitle: "Straighten Your Teeth Without Anyone Noticing",
    heroTitleZh: "不著痕跡地，把牙齒變整齊",
    body: [
      {
        kind: "p",
        en: "For a lot of people, the appeal of Invisalign is simple: straight teeth without a mouth full of metal. The aligners are clear, removable, and discreet enough that most people won't know you're wearing them. But the part that matters most happens before any aligner goes in: the planning. Clear aligners are only as good as the diagnosis and treatment design behind them, which is exactly where seeing an orthodontist makes the difference.",
        zh: "對許多人來說，Invisalign 的吸引力很簡單：把牙齒變整齊，又不必滿口金屬。隱形牙套透明、可拆卸，低調到大多數人不會發現你正戴著它。但真正最關鍵的部分，發生在任何一副牙套戴進嘴裡之前，也就是規劃。清晰隱形牙套的成效，完全取決於背後的診斷與治療設計，而這正是「找齒顎矯正專科醫師」會帶來差別的地方。",
      },
      {
        kind: "p",
        en: "Invisalign uses a series of custom aligners, and we give you multiple sets to switch at a pre-set interval, usually one a week. Every set shifts your teeth a small, planned amount, and you can often preview your projected result at the consultation. You wear them around 22 hours a day, removing them to eat, brush and drink. For aligner patients, compliance with the wear schedule is key to achieving our goals for your smile as quickly and as efficiently as possible.",
        zh: "Invisalign 使用一系列客製化的牙套，我們會一次給你多副，依預定的間隔更換，通常一週一副。每一副都會讓牙齒做一小段、經過規劃的移動，而你往往在諮詢時就能預覽預計的結果。你每天大約配戴 22 小時，吃東西、刷牙、喝飲料時取下。對隱形牙套的病患來說，配合配戴時程，是達成我們為你的笑容設定的目標、並盡可能快速有效率的關鍵。",
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
        en: "No — and that's worth saying plainly, because a lot of marketing implies otherwise. Clear aligners handle many cases beautifully and some complex ones less reliably than braces. We'll tell you honestly which camp your case falls into. And unlike a mail-order kit, your treatment here is planned and supervised start to finish by a board-certified orthodontist who's examined your bite, roots, and gums, the oversight that protects your teeth from real, lasting harm.",
        zh: "不，這點值得直說，因為很多行銷暗示的剛好相反。清晰隱形牙套能把許多病例處理得很漂亮，但有些複雜病例，它的可靠度不如矯正器。你的病例屬於哪一類，我們會誠實告訴你。而且，跟郵購牙套組不同，你在這裡的療程，是由一位檢查過你咬合、牙根與牙齦的認證齒顎矯正專科醫師，從頭到尾規劃並監督，正是這份把關，保護你的牙齒免於真正、長久的傷害。",
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
    heroTitle: "Early Treatment: When Timing Genuinely Changes the Outcome",
    heroTitleZh: "在真正關鍵的時刻，給予早期引導",
    body: [
      {
        kind: "p",
        en: "Phase I Treatment is early orthodontic treatment for children who still have most of their baby teeth, usually between ages eight and eleven. It exists for a specific reason: a small number of developing problems are far easier to correct while a child is still growing, and waiting until all the adult teeth arrive can mean a harder, longer, more invasive fix later. Phase I is not for every child, and we'd rather talk a family out of unnecessary early treatment than into it.",
        zh: "Phase I Treatment 是給仍有大部分乳牙的孩子的早期矯正治療，通常在八到十一歲之間。它的存在有一個特定理由：少數幾種發育中的問題，趁孩子仍在成長時處理會容易得多，等到所有恆牙都長出來才做，往往意味著更困難、更漫長、更具侵入性的治療。Phase I 並不適合每一個孩子，我們寧願勸退一個不必要的早期治療，也不會硬把家長說進來。",
      },
      {
        kind: "p",
        en: "In the right case, treating early takes advantage of growth you can't get back: guiding the jaw as it develops, making room for adult teeth, and correcting issues that would only entrench with time. The aim is to steer development toward a better outcome, not to do all the orthodontics now.",
        zh: "在對的病例上，早期治療能善用一去不復返的生長力：在顎骨發育時加以引導、為恆牙騰出空間、修正若不處理只會越來越根深柢固的問題。目的是把發育導向更好的結果，而不是把所有的矯正都在現在做完。",
      },
      {
        kind: "bullets",
        en: "Phase I may help when a child has:",
        zh: "當孩子有以下情況時，Phase I 可能會有幫助：",
        items: [
          { en: "A crossbite, especially one causing the jaw to shift to one side", zh: "錯咬，特別是造成顎骨往單側偏移的情況" },
          { en: "A significantly narrow upper jaw", zh: "明顯狹窄的上顎" },
          { en: "Severe crowding with no room for adult teeth to come in", zh: "嚴重擁擠、恆牙沒有空間萌發" },
          { en: "Protruding upper front teeth at higher risk of injury", zh: "前突的上顎門牙，較容易受傷" },
          { en: "Persistent thumb-sucking affecting the bite, or an early underbite", zh: "持續吸手指影響咬合，或早期戽斗" },
        ],
      },
      {
        kind: "p",
        en: "When a child is a candidate, Phase I usually involves a focused course with a specific appliance , an expander, partial braces, a habit appliance, or some combination of the above. Treatment typically runs for about a year. Once it's complete, your child enters the supervision phase: we monitor growth and the eruption of the adult teeth at regular six-month to one-year intervals, with no active appliances, until the timing is right for the next stage.",
        zh: "當孩子是合適人選時，Phase I 通常會用特定的矯正裝置進行一段聚焦的療程 ，擴張器、局部矯正器、習慣矯治器，或以上的組合。療程通常約進行一年。療程結束後，孩子會進入觀察期：我們會以六個月到一年為間隔，定期追蹤孩子的成長與恆牙萌發，這段期間不會使用任何主動的矯正裝置，直到下一階段的時機成熟。",
      },
      { kind: "subhead", en: "Phase I sets up Phase II. It doesn't replace it", zh: "Phase I 是為 Phase II 鋪路，而不是取代它" },
      {
        kind: "p",
        en: "This is the part worth being clear about: most Phase I cases still require Phase II, the comprehensive treatment that aligns the full set of adult teeth once they're all in. Phase I isn't meant to finish the job. Its goal is narrower and more important, to address jaw discrepancies or critical issues at the moment they can actually be influenced, and in doing so to lower the chance of longer treatment, extractions, or more invasive procedures later in life. Done at the right time, it makes the treatment that follows shorter and simpler.",
        zh: "這一點值得說清楚：大多數 Phase I 的病例，之後仍需要 Phase II，也就是等所有恆牙長齊後，對整口牙齒進行全面矯正。Phase I 從來不是要一次做完所有事。它的目標更聚焦、也更重要，就是在真正能被影響的時機，處理顎骨的差異或關鍵問題，並藉此降低日後需要更長療程、拔牙或更具侵入性治療的機會。時機抓對，能讓後續的治療更短、更單純。",
      },
    ],
    ctaLead: {
      en: "Wondering whether early treatment is right for your child?",
      zh: "在想早期治療是否適合你的孩子？",
    },
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
    image: "/images/services/airway-feature.webp",
    heroImageDirection: "Digital growth analysis and child profile.",
    heroAlt: "Digital growth analysis and child profile",
    heroTitle: "Looking Beyond the Teeth",
    heroTitleZh: "不只是看牙齒",
    body: [
      {
        kind: "p",
        en: "Straight teeth are the visible result of orthodontics, but they aren't the whole story. How a child's jaws grow, how the face develops, and how well a child breathes are all connected, and easy to overlook if you're only looking at alignment. Airway-friendly orthodontics means evaluating that bigger picture: not just where the teeth sit today, but how the structures around them are developing and whether breathing is part of the conversation.",
        zh: "整齊的牙齒是矯正看得見的結果，但那不是故事的全部。孩子的顎骨怎麼長、臉部如何發育、呼吸得好不好，這些事其實彼此相連，如果你只看牙齒排列，很容易忽略。呼吸道友善矯正的意思，是評估這幅更大的圖像：不只看牙齒現在的位置，還看牙齒周圍的結構如何發育、以及呼吸是否也該一起被討論。",
      },
      {
        kind: "p",
        en: "The shape of the jaws and palate directly affects the space available for the airway. A narrow upper jaw, a high palate, or a recessed lower jaw can be linked to mouth breathing, disrupted sleep, and snoring in children, and the same growth we work with to align teeth shapes those structures. At Tsai Orthodontics, we believe that orthodontists play a valuable role on the team that could help catch these problems early.",
        zh: "顎骨與上顎的形狀，會直接影響呼吸道可用的空間。狹窄的上顎、高拱的上顎、後縮的下顎，都可能和孩子的口呼吸、睡眠中斷與打鼾有關；而我們用來排列牙齒所依賴的那股生長力，同樣塑造著這些結構。在 Tsai Orthodontics，我們相信齒顎矯正醫師在及早發現這些問題的團隊裡，扮演著有價值的角色。",
      },
      {
        kind: "bullets",
        en: "Signs worth mentioning at a consultation:",
        zh: "值得在諮詢時提出的徵象：",
        items: [
          { en: "Habitual mouth breathing, day or night", zh: "白天或夜間習慣性用嘴呼吸" },
          { en: "Snoring, restless sleep, frequent bedwetting, or frequent night waking in children", zh: "打鼾、睡眠不安穩、頻繁尿床，或孩子夜間頻繁醒來" },
          { en: "A narrow or high-arched palate", zh: "狹窄或高拱的上顎" },
          { en: "Crowding paired with a small or recessed lower jaw", zh: "牙齒擁擠合併偏小或後縮的下顎" },
          { en: "Chronic congestion, enlarged tonsils, or daytime tiredness", zh: "長期鼻塞、扁桃腺肥大，或白天容易疲倦" },
        ],
      },
      {
        kind: "p",
        en: "We evaluate facial growth alongside the teeth, using 3D imaging where warranted. If we see signs pointing toward airway concerns, we'll talk through what we're observing and, when appropriate, coordinate with your physician, an ENT, or a sleep specialist. For qualifying cases, adult expansion using mini-screw assisted expanders may be a part of your overall treatment plan.",
        zh: "我們會在評估牙齒的同時，一起看臉部的生長，必要時會使用 3D 影像。若我們看到指向呼吸道問題的徵象，我們會和你討論觀察到什麼，並在適當時與你的家醫、耳鼻喉科醫師或睡眠科醫師合作。對於符合條件的病例，使用骨釘輔助的成人擴張器，可能會是整體治療計畫的一部分。",
      },
      { kind: "subhead", en: "An honest word on scope", zh: "關於範圍的一點誠實話" },
      {
        kind: "p",
        en: "Airway is a topic with a lot of strong claims attached, some better supported than others. We approach it evidence-first: we'll tell you what orthodontic treatment can realistically influence, what it can't, and when a concern is better handled by another specialist. We won't overpromise that straightening teeth fixes sleep problems, the relationship is real but more nuanced than that, and you deserve a measured assessment rather than a sales pitch.",
        zh: "呼吸道是個充滿強烈主張的話題，有些主張證據較充足，有些則不然。我們的態度是以證據為先：我們會告訴你矯正治療實際上能影響什麼、不能影響什麼，以及什麼時候該交給另一位專科醫師處理。我們不會過度承諾說「把牙齒排整齊就能解決睡眠問題」，兩者之間的關係是真實存在，但比那句話更細膩，而你值得的是一份謹慎的評估，而不是一段推銷話術。",
      },
    ],
    ctaLead: {
      en: "Want an evaluation that looks at the whole picture?",
      zh: "想要一份看見整體的評估嗎？",
    },
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
    heroTitle: "Skeletal Anchorage to Accomplish Difficult Movements",
    heroTitleZh: "以骨性錨定，完成困難的牙齒移動",
    body: [
      {
        kind: "p",
        en: "For years, adults and older teens with a narrow upper jaw were told their only option for true widening was surgery. MARPE has changed that for many of them. It's a skeletally anchored expander that can expand the upper jaw by using a small expander anchored directly into the palate. It isn't right for everyone, and that's the point of a proper evaluation. TADs, or temporary anchorage devices, are used in cases that have difficult movements that conventional braces and aligners struggle with. Dr. Tsai will mention at the start of treatment if TADs may be a likely possibility in your case. Done well, on the right patient, it can correct problems that braces and aligners alone simply can't reach.",
        zh: "多年以來，上顎狹窄的成人與青少年後期病患，都被告知想要真正的擴張只能靠手術。MARPE 為許多人改變了這件事。它是一種骨性錨定的擴張器，透過直接錨定在上顎的一個小型擴張裝置，來擴張上顎。它不是每個人都適合，這正是完整評估的意義。TADs（暫時性錨定裝置）則用於那些傳統矯正器與隱形牙套較難處理的困難移動個案。Tsai 醫師會在療程一開始就告訴你，你的個案是否可能需要用到 TADs。做得好、用在對的病患身上，MARPE 能矯正單靠矯正器與隱形牙套碰不到的問題。",
      },
      { kind: "subhead", en: "What MARPE actually is", zh: "MARPE 究竟是什麼" },
      {
        kind: "p",
        en: "MARPE stands for Miniscrew-Assisted Rapid Palatal Expansion. A custom expander is secured to the roof of the mouth using TADs — Temporary Anchorage Devices, small titanium screws that hold the appliance firmly against bone rather than teeth. That anchorage is what lets the expansion work on the jaw itself. Because the force is directed into the bone, MARPE can widen the upper jaw in patients whose growth plates have largely fused, in the cases where a traditional childhood expander would no longer work.",
        zh: "MARPE 代表 Miniscrew-Assisted Rapid Palatal Expansion（微型骨釘輔助的上顎快速擴張）。一組客製化擴張器會透過 TADs（暫時性錨定裝置，也就是小型鈦合金骨釘）固定於上顎，把裝置穩穩靠在骨頭上，而不是靠在牙齒上。正是這份錨定，讓擴張真的作用在顎骨本身。因為力量直接被導向骨頭，MARPE 可以在生長板大致融合的病患身上擴張上顎，也就是那些傳統兒童期擴張器已不再有效的病例。",
      },
      {
        kind: "bullets",
        en: "You may be a candidate if you have:",
        zh: "若你符合以下情況，你可能是合適人選：",
        items: [
          { en: "A narrow upper jaw or a crossbite that has persisted into the teen or adult years", zh: "上顎狹窄或錯咬，並且延續到青少年或成年" },
          { en: "Crowding that would otherwise require removing healthy teeth or jaw surgery to resolve", zh: "若不擴張，就得靠拔除健康牙齒或顎骨手術才能解決的擁擠" },
          { en: "A history of mouth breathing, a high or narrow palate, or related airway concerns", zh: "有口呼吸病史、高拱或狹窄的上顎，或相關呼吸道疑慮" },
          { en: "An expansion case that a previous appliance didn't fully correct", zh: "先前擴張裝置沒有完全處理好的擴張個案" },
          { en: "Been told that surgical expansion was your only option, and want to know if it truly is", zh: "曾被告知手術擴張是你唯一的選項，但想確認是否真的是" },
        ],
      },
      {
        kind: "p",
        en: "The only way to know is a clinical exam with proper imaging. Some patients who assume they need surgery don't; some who hope to avoid it still do. We'll tell you straight either way.",
        zh: "唯一確認的方法，是搭配適當影像的臨床檢查。有些以為自己需要手術的病患，其實不用；有些希望避開手術的，仍然得走那條路。無論結論是哪一種，我們都會直說。",
      },
      {
        kind: "steps",
        en: "What to expect",
        zh: "療程會經歷什麼",
        items: [
          { en: "Evaluation — a consultation with records and 3D imaging to assess your palate, airway, and whether your case suits skeletal expansion.", zh: "評估 — 一次搭配影像紀錄與 3D 影像的諮詢，評估你的上顎、呼吸道，以及你的個案是否適合骨性擴張。" },
          { en: "Placing the appliance — the expander and TADs are fitted in a single visit. This step involves local anesthesia.", zh: "裝設裝置 — 擴張器與 TADs 會在單次看診中完成安裝，這個步驟會使用局部麻醉。" },
          { en: "Expansion — you'll turn the expander a small, set amount each day at home over a few weeks. Mild pressure is normal; and we stay reachable throughout.", zh: "擴張 — 你會在家中每天以固定的小幅度旋轉擴張器，持續數週。輕微的壓迫感是正常的，過程中我們都能隨時聯絡上。" },
          { en: "Stabilizing — once we reach the target width, the expander stays in place for several months while new bone fills and sets the result.", zh: "穩定 — 一旦達到目標寬度，擴張器會繼續留在原位數個月，讓新的骨頭生長、把結果穩固下來。" },
          { en: "Next steps — with the jaw widened, the rest of your treatment (braces or aligners) can do its job properly.", zh: "後續 — 上顎擴張到位後，接下來的矯正（矯正器或隱形牙套）就能正常發揮作用。" },
        ],
      },
      { kind: "subhead", en: "Does it hurt? Is it surgery?", zh: "會痛嗎？是不是手術？" },
      {
        kind: "p",
        en: "No, MARPE is not jaw surgery, that's the most common worry we hear, and it's worth saying plainly. Placing the TADs is a brief, in-office procedure done under local anesthetic. Most patients describe pressure and a few days of adjustment rather than pain, and manage comfortably with over-the-counter relief. The screws are removed easily once treatment is complete.",
        zh: "不是，MARPE 不是顎骨手術，這是我們最常聽到的擔心，值得直說。裝設 TADs 是在診間進行、時間短暫的處置，會使用局部麻醉。大多數病患形容的是壓迫感與幾天的適應期，而不是疼痛，用市售止痛藥就能舒適度過。療程結束後，這些骨釘可以輕鬆取下。",
      },
      { kind: "subhead", en: "Why this is specialist work", zh: "為什麼這是專科的工作" },
      {
        kind: "p",
        en: "MARPE rewards precise diagnosis and careful placement. We evaluate whether you're truly a candidate before recommending it, and we'll say so honestly when you're not, including when surgery remains the better path. That judgment is the whole value of seeing a specialist for this.",
        zh: "MARPE 回報的是精準的診斷與細心的裝設。我們會在建議之前，先評估你是否真的是合適人選；如果你不是，我們會誠實地說，包括手術仍是較好選項的情況。那份判斷力，正是這件事之所以要找專科醫師的全部價值。",
      },
    ],
    ctaLead: {
      en: "Curious whether MARPE is right for you?",
      zh: "想知道 MARPE 是否適合你？",
    },
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
    heroTitle: "The Part of Treatment That Protects Everything Else",
    heroTitleZh: "守護所有努力的最後一段療程",
    body: [
      {
        kind: "p",
        en: "Most people don't hear this clearly enough at the start: orthodontic treatment doesn't end when the braces come off or the last aligner goes in. Teeth have a lifelong tendency to drift back toward where they started, and the only thing that reliably prevents it is a retainer, worn as directed. Retention isn't an afterthought or an upsell, it's the step that protects the result you spent months or years achieving.",
        zh: "大多數人一開始沒有被清楚告知這一點：矯正治療不會在拆下矯正器、或戴上最後一副隱形牙套時就結束。牙齒終其一生都有回到原本位置的傾向，唯一能可靠防止這件事發生的，就是依指示配戴的維持器。維持並不是事後補上的東西，也不是加購項目，它是守護你花了數月甚至數年才達成成果的那一步。",
      },
      {
        kind: "p",
        en: "Teeth keep moving subtly throughout life; it happens to everyone, treated or not. A retainer holds your corrected alignment while everything stabilizes, then maintains it for the long haul.",
        zh: "牙齒一生都會有細微的移動，這件事在每個人身上都會發生，不管有沒有做過矯正。維持器會在一切逐漸穩定下來的期間，穩住你的矯正結果，之後也繼續長期地維持它。",
      },
      {
        kind: "bullets",
        en: "The options we offer:",
        zh: "我們提供的選項：",
        items: [
          { en: "Clear retainers — removable and nearly invisible. Compliance is key.", zh: "透明活動式維持器 — 可拆卸、幾乎看不見；持續配戴是關鍵。" },
          { en: "Bonded retainers — a thin wire bonded behind the lower front teeth", zh: "固定式維持器 — 一條細鋼線黏著在下顎前牙的背面" },
          { en: "Replacement retainers — fast, straightforward remakes when one is lost, broken, or worn out. We always recommend that you have a backup pair handy.", zh: "維持器補製 — 弄丟、損壞或使用磨損時，快速、簡單地重製一副。我們一律建議手邊備有一副備用。" },
        ],
      },
      { kind: "subhead", en: "Lost or broken one — even from years ago?", zh: "弄丟或壞掉了，甚至是很多年前的？" },
      {
        kind: "p",
        en: "You don't need to have been our patient to come in for a replacement. If your old retainer no longer fits because your teeth have already moved, we'll assess where things stand and talk through options. For simple relapse cases, or sometimes when just one tooth ends up out of place, we also offer Invisalign Touch-Up treatment to correct minor movements in under 6 months or less.",
        zh: "你不需要是我們原本的病患，也可以來補製維持器。如果你原本的維持器因為牙齒已經移位而戴不上去，我們會評估目前的情況，再和你一起討論選項。對於單純的復發，或有時只是一顆牙齒跑掉的情況，我們也提供 Invisalign Touch-Up 療程，能在 6 個月或更短的時間內修正細微移位。",
      },
    ],
    ctaLead: {
      en: "Need a retainer, a replacement, or a check on an old one?",
      zh: "需要維持器、補製一副，或想檢查一下舊的？",
    },
    faqs: [],
    related: ["braces-and-fixed-appliances", "invisalign", "adults"],
    metaTitle: "Orthodontic Retainers — Tsai Orthodontics Vancouver",
    metaDescription:
      "Clear retainers, fixed retainers, replacement retainers, and long-term orthodontic retention care in Vancouver.",
  },
] as Omit<Service, "gallery">[]).map((s) => {
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
