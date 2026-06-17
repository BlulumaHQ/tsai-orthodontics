export interface FaqItem {
  q: string;
  a: string;
  qZh: string;
  aZh: string;
}

export interface FaqGroup {
  title: string;
  titleZh: string;
  items: FaqItem[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Getting Started",
    titleZh: "開始矯正之前",
    items: [
      {
        q: "Do I need a referral to be seen?",
        qZh: "需要其他醫師轉診才能來看診嗎？",
        a: "No referral is required. You are welcome to book a complimentary consultation directly with our practice at any time.",
        aZh: "不需要轉診。您隨時都可以直接與診所預約免費的諮詢時段。",
      },
      {
        q: "What happens at the first visit?",
        qZh: "第一次看診會做什麼？",
        a: "Your first visit is an unhurried conversation. We discuss your concerns, take a careful clinical look, and — if helpful — capture a quick digital scan. You leave with a clear sense of whether treatment is needed and what the next step would be.",
        aZh: "第一次看診以放鬆的對話為主。我們會聆聽您的需求、進行仔細的臨床檢查，必要時做一次快速的口腔數位掃描。離開時，您會清楚知道是否需要矯正，以及下一步的建議。",
      },
      {
        q: "Is the first consultation really complimentary?",
        qZh: "第一次諮詢真的免費嗎？",
        a: "Yes. There is no fee and no obligation. We believe families should be able to ask questions before making any commitment.",
        aZh: "是的。第一次諮詢完全免費，也沒有任何義務。我們希望病患與家長都能先充分了解，再決定是否進一步治療。",
      },
    ],
  },
  {
    title: "Treatment & Care",
    titleZh: "治療與照護",
    items: [
      {
        q: "What is the difference between an orthodontist and a dentist?",
        qZh: "齒顎矯正專科醫師和一般牙醫有什麼不同？",
        a: "An orthodontist is a dentist who has completed an additional two to three years of full-time specialist training focused exclusively on tooth movement, bite, and facial development. Dr. Tsai is a certified specialist in orthodontics.",
        aZh: "齒顎矯正專科醫師是在完成牙醫學位之後，再接受兩到三年全職矯正專科訓練的牙科醫師，專注於牙齒移動、咬合與顏面發育。Dr. Tsai 為認證的齒顎矯正專科醫師。",
      },
      {
        q: "How often will I have appointments?",
        qZh: "多久要回診一次？",
        a: "Most patients are seen every six to eight weeks. Aligner patients often have longer intervals between visits.",
        aZh: "大多數病患約每六到八週回診一次。隱形牙套的病患回診間隔通常較長。",
      },
      {
        q: "Will treatment be uncomfortable?",
        qZh: "矯正治療會不會不舒服？",
        a: "Tenderness for a few days after placement or adjustments is normal. We design every plan to minimize discomfort and are always reachable if something does not feel right.",
        aZh: "裝置或調整後出現幾天的酸軟感是正常的。我們在設計療程時會盡量降低不適，若有任何狀況，也隨時可以聯繫我們。",
      },
    ],
  },
  {
    title: "Fees, Insurance & Financing",
    titleZh: "費用、保險與付款方式",
    items: [
      {
        q: "Do you accept dental insurance?",
        qZh: "你們有接受牙科保險嗎？",
        a: "We work with most major insurance plans and will help you understand your orthodontic benefits clearly. We submit claims on your behalf wherever possible.",
        aZh: "我們配合大多數的主流牙科保險，並協助您清楚了解自身的矯正保險給付。在條件允許時，也可以代為申報理賠。",
      },
      {
        q: "Do you offer payment plans?",
        qZh: "你們有提供分期付款嗎？",
        a: "Yes. We offer in-house monthly financing with no interest for the length of treatment. Plans are personalized to fit each family's situation.",
        aZh: "有的。我們提供診所內部的零利率月付方案，並會依每個家庭的狀況量身調整。",
      },
      {
        q: "Why are your fees not listed online?",
        qZh: "為什麼網站上沒有公布費用？",
        a: "Every patient's treatment is different, and quoting a flat price without understanding the case is rarely accurate. We provide clear, written fees at your consultation — with no pressure to decide on the spot.",
        aZh: "每位病患的治療都不一樣，在未了解狀況前就報出統一價格通常並不準確。我們會在諮詢時提供清楚、書面的費用說明，您也無需當下做決定。",
      },
    ],
  },
  {
    title: "Family & Bilingual Care",
    titleZh: "家庭與雙語服務",
    items: [
      {
        q: "Do you offer service in Mandarin or Cantonese?",
        qZh: "你們有提供中文（國語）或廣東話的服務嗎？",
        a: "Yes. We provide consultations and ongoing care in both English and Mandarin. Dr. Andrew and Dr. Marjorie are fluent in both languages, and our staff speak Cantonese as well.",
        aZh: "有的。我們以英文與中文（國語）提供諮詢與後續照護。Dr. Andrew 與 Dr. Marjorie 兩位醫師都能流利使用兩種語言，診所同仁也能以廣東話溝通。",
      },
      {
        q: "Can multiple family members be seen on the same day?",
        qZh: "家人可以同一天一起看診嗎？",
        a: "Absolutely. We are happy to coordinate appointments so siblings or parents and children can be seen together when possible.",
        aZh: "當然可以。我們很樂意協助安排，讓兄弟姊妹或親子能盡量在同一天就診。",
      },
    ],
  },
  {
    title: "After Treatment",
    titleZh: "矯正完成後",
    items: [
      {
        q: "What happens after my braces or aligners come off?",
        qZh: "Braces 或隱形牙套拆下後接下來呢？",
        a: "You begin the retention phase. We custom-design your retainer, walk you through a wear schedule, and continue to see you for follow-up visits for up to a year to make sure everything is holding beautifully.",
        aZh: "接著進入維持期。我們會為您客製化保持器、說明配戴時程，並在後續長達一年的回診中持續追蹤，確保成果穩定維持。",
      },
      {
        q: "Do you support patients who were treated elsewhere?",
        qZh: "在別處做完矯正，也可以來這裡嗎？",
        a: "Yes. We welcome new patients who simply need a retainer replacement, a check-in, or continuing care after a move.",
        aZh: "可以。我們歡迎只需重新製作維持器、定期檢查，或搬遷後需要延續照護的病患。",
      },
    ],
  },
];

export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items);
