export const SITE = {
  name: "Tsai Orthodontics",
  shortName: "Tsai Ortho",
  domain: "tsaiorthodontics.ca",
  email: "smile@tsaiorthodontics.ca",
  phone: "604-708-8138",
  phoneHref: "tel:+16047088138",
  address: {
    street: "3431 Main Street",
    city: "Vancouver",
    region: "BC",
    postal: "V5V 3M9",
    country: "CA",
  },
  hours: [
    { day: "Monday – Thursday", dayZh: "週一至週四", time: "9:00am – 5:00pm", timeZh: "上午9:00 – 下午5:00" },
    { day: "Friday", dayZh: "週五", time: "By appointment", timeZh: "預約制" },
    { day: "Saturday – Sunday", dayZh: "週六至週日", time: "Closed", timeZh: "休診" },
  ],
};

// Top-level navigation (grouped, with optional dropdowns)
export type NavItem = {
  label: string;
  labelZh: string;
  to: string;
  children?: { label: string; labelZh: string; to: string }[];
};

export const NAV: NavItem[] = [
  { label: "Home", labelZh: "首頁", to: "/" },
  {
    label: "About",
    labelZh: "關於我們",
    to: "/about-the-doctors",
    children: [
      { label: "About the Doctors", labelZh: "認識醫師", to: "/about-the-doctors" },
      { label: "Dr. Andrew Tsai", labelZh: "Dr. Andrew Tsai", to: "/about-the-doctors/dr-andrew-tsai" },
      { label: "Dr. Marjorie Tsai", labelZh: "Dr. Marjorie Tsai", to: "/about-the-doctors/dr-marjorie-tsai" },
      { label: "What Sets Us Apart", labelZh: "我們的不同之處", to: "/what-sets-us-apart" },
    ],
  },
  {
    label: "Services",
    labelZh: "矯正服務",
    to: "/services",
    children: [
      { label: "Children & Teens", labelZh: "兒童與青少年", to: "/services/children-and-teens" },
      { label: "Adults", labelZh: "成人矯正", to: "/services/adults" },
      { label: "Braces & Fixed Appliances", labelZh: "Braces 與固定式矯正器", to: "/services/braces-and-fixed-appliances" },
      { label: "Invisalign", labelZh: "Invisalign", to: "/services/invisalign" },
      { label: "Phase I Treatment", labelZh: "Phase I Treatment", to: "/services/phase-i-treatment" },
      { label: "Airway Friendly Orthodontics", labelZh: "Airway Friendly Orthodontics", to: "/services/airway-friendly-orthodontics" },
      { label: "MARPE", labelZh: "MARPE", to: "/services/marpe" },
      { label: "Retainers", labelZh: "Retainers", to: "/services/retainers" },
    ],
  },
  { label: "New Patients", labelZh: "初診須知", to: "/new-patients" },
  { label: "Referral", labelZh: "牙醫轉診", to: "/dentist-referral" },
  { label: "FAQ", labelZh: "常見問題", to: "/faq" },
  { label: "Contact", labelZh: "聯絡我們", to: "/contact" },
];

export const FOOTER_NAV = [
  { label: "Home", labelZh: "首頁", to: "/" },
  { label: "About the Doctors", labelZh: "認識醫師", to: "/about-the-doctors" },
  { label: "What Sets Us Apart", labelZh: "我們的不同之處", to: "/what-sets-us-apart" },
  { label: "New Patients", labelZh: "初診須知", to: "/new-patients" },
  { label: "FAQ", labelZh: "常見問題", to: "/faq" },
  { label: "Dentist Referral", labelZh: "牙醫轉診", to: "/dentist-referral" },
  { label: "Contact", labelZh: "聯絡我們", to: "/contact" },
];

export const FOOTER_SERVICES = [
  { label: "Children & Teens", labelZh: "兒童與青少年", to: "/services/children-and-teens" },
  { label: "Adults", labelZh: "成人矯正", to: "/services/adults" },
  { label: "Braces & Fixed Appliances", labelZh: "Braces 與固定式矯正器", to: "/services/braces-and-fixed-appliances" },
  { label: "Invisalign", labelZh: "Invisalign", to: "/services/invisalign" },
  { label: "Phase I Treatment", labelZh: "Phase I Treatment", to: "/services/phase-i-treatment" },
  { label: "Airway Friendly Orthodontics", labelZh: "Airway Friendly Orthodontics", to: "/services/airway-friendly-orthodontics" },
  { label: "MARPE", labelZh: "MARPE", to: "/services/marpe" },
  { label: "Retainers", labelZh: "Retainers", to: "/services/retainers" },
];
