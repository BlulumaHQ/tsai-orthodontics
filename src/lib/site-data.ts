export const SITE = {
  name: "Tsai Orthodontics",
  shortName: "Tsai Ortho",
  domain: "tsaiorthodontics.ca",
  email: "info@tsaiorthodontics.ca",
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
  social: {
    instagram: "#",
  },
};

export const NAV = [
  { label: "About", to: "/about" as const },
  { label: "Doctors", to: "/doctors" as const },
  { label: "What Sets Us Apart", to: "/what-sets-us-apart" as const },
  { label: "Services", to: "/services" as const },
  { label: "New Patients", to: "/new-patients" as const },
  { label: "FAQ", to: "/faq" as const },
  { label: "Contact", to: "/contact" as const },
];

export const FOOTER_LINKS = [
  ...NAV,
  { label: "Dentist Referral", to: "/referral" as const },
];
