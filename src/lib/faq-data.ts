export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Getting Started",
    items: [
      { q: "Do I need a referral to be seen?", a: "No referral is required. You are welcome to book a complimentary consultation directly with our practice at any time." },
      { q: "What happens at the first visit?", a: "Your first visit is an unhurried conversation. We discuss your concerns, take a careful clinical look, and — if helpful — capture a quick digital scan. You leave with a clear sense of whether treatment is needed and what the next step would be." },
      { q: "Is the first consultation really complimentary?", a: "Yes. There is no fee and no obligation. We believe families should be able to ask questions before making any commitment." },
    ],
  },
  {
    title: "Treatment & Care",
    items: [
      { q: "What is the difference between an orthodontist and a dentist?", a: "An orthodontist is a dentist who has completed an additional two to three years of full-time specialist training focused exclusively on tooth movement, bite, and facial development. Dr. Tsai is a certified specialist in orthodontics." },
      { q: "How often will I have appointments?", a: "Most patients are seen every six to ten weeks. Aligner patients often have longer intervals between visits." },
      { q: "Will treatment be uncomfortable?", a: "Tenderness for a few days after placement or adjustments is normal. We design every plan to minimize discomfort and are always reachable if something does not feel right." },
    ],
  },
  {
    title: "Fees, Insurance & Financing",
    items: [
      { q: "Do you accept dental insurance?", a: "We work with most major insurance plans and will help you understand your orthodontic benefits clearly. We submit claims on your behalf wherever possible." },
      { q: "Do you offer payment plans?", a: "Yes. We offer in-house monthly financing with no interest for the length of treatment. Plans are personalized to fit each family's situation." },
      { q: "Why are your fees not listed online?", a: "Every patient's treatment is different, and quoting a flat price without understanding the case is rarely accurate. We provide clear, written fees at your consultation — with no pressure to decide on the spot." },
    ],
  },
  {
    title: "Family & Bilingual Care",
    items: [
      { q: "Do you offer service in Mandarin?", a: "Yes. We provide consultations and ongoing care in both English and Mandarin." },
      { q: "Can multiple family members be seen on the same day?", a: "Absolutely. We are happy to coordinate appointments so siblings or parents and children can be seen together when possible." },
    ],
  },
  {
    title: "After Treatment",
    items: [
      { q: "What happens after my braces or aligners come off?", a: "You begin the retention phase. We custom-design your retainer, walk you through a wear schedule, and continue to see you for follow-up visits to make sure everything is holding beautifully." },
      { q: "Do you support patients who were treated elsewhere?", a: "Yes. We welcome new patients who simply need a retainer replacement, a check-in, or continuing care after a move." },
    ],
  },
];

export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items);
