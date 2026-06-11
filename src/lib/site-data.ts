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
    { day: "Monday – Thursday", time: "9:00am – 5:00pm" },
    { day: "Friday", time: "By appointment" },
    { day: "Saturday – Sunday", time: "Closed" },
  ],
};

// Top-level navigation (grouped, with optional dropdowns)
export type NavItem = {
  label: string;
  to: string;
  children?: { label: string; to: string }[];
};

export const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About",
    to: "/about-the-doctors",
    children: [
      { label: "About the Doctors", to: "/about-the-doctors" },
      { label: "Dr. Andrew Tsai", to: "/about-the-doctors/dr-andrew-tsai" },
      { label: "Dr. Marjorie Tsai", to: "/about-the-doctors/dr-marjorie-tsai" },
      { label: "What Sets Us Apart", to: "/what-sets-us-apart" },
    ],
  },
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "Children & Teens", to: "/services/children-and-teens" },
      { label: "Adults", to: "/services/adults" },
      { label: "Braces & Fixed Appliances", to: "/services/braces-and-fixed-appliances" },
      { label: "Invisalign", to: "/services/invisalign" },
      { label: "Phase I Treatment", to: "/services/phase-i-treatment" },
      { label: "Airway Friendly Orthodontics", to: "/services/airway-friendly-orthodontics" },
      { label: "MARPE", to: "/services/marpe" },
      { label: "Retainers", to: "/services/retainers" },
    ],
  },
  { label: "New Patients", to: "/new-patients" },
  { label: "Referral", to: "/dentist-referral" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_NAV = [
  { label: "Home", to: "/" },
  { label: "About the Doctors", to: "/about-the-doctors" },
  { label: "What Sets Us Apart", to: "/what-sets-us-apart" },
  { label: "New Patients", to: "/new-patients" },
  { label: "FAQ", to: "/faq" },
  { label: "Dentist Referral", to: "/dentist-referral" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_SERVICES = [
  { label: "Children & Teens", to: "/services/children-and-teens" },
  { label: "Adults", to: "/services/adults" },
  { label: "Braces & Fixed Appliances", to: "/services/braces-and-fixed-appliances" },
  { label: "Invisalign", to: "/services/invisalign" },
  { label: "Phase I Treatment", to: "/services/phase-i-treatment" },
  { label: "Airway Friendly Orthodontics", to: "/services/airway-friendly-orthodontics" },
  { label: "MARPE", to: "/services/marpe" },
  { label: "Retainers", to: "/services/retainers" },
];
