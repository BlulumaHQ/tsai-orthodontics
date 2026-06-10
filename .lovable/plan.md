## Build Plan — Tsai Orthodontics

Premium boutique orthodontic site built on the chosen **Warm Gallery** direction. Locked palette (cream #FAF8F6, near-black #1A1A1A, terracotta #C7773A as accent only, peach #E8C4A0, warm gray #6B6560), Playfair Display serif + Inter body, full-bleed photography, zigzag pillar rows, horizontal-scroll patient journeys.

### Pages (TanStack Start file routes)
1. `/` — Home (hero, four pillars, four patient journeys, doctor teaser, differentiators, contact CTA)
2. `/about` — Practice story
3. `/doctors` — Meet Dr. Tsai + Extended Learning & Expertise timeline
4. `/what-sets-us-apart` — Quality comparison (never price)
5. `/services` — Index of all services
6. `/services/$slug` — Dynamic detail page for: Children & Teens, Adults, Braces, Invisalign, Phase I, Airway Friendly, MARPE, Retainers
7. `/new-patients` — 4-step journey, insurance, financing, forms, what to expect
8. `/faq` — Accordion FAQ (shadcn accordion) with FAQ JSON-LD
9. `/referral` — Dentist referral page (placeholder where the form will be embedded later)
10. `/contact` — Map, address, phone, large consultation form

### Design system
- Replace `src/styles.css` tokens verbatim with the chosen direction's palette + add semantic tokens for `primary`, `accent`, `muted`, `foreground`, `background`, `border`.
- Load Playfair Display + Inter via `<link>` in `__root.tsx` (never `@import` URL).
- Add `fade-up` and `scale-in` keyframes in styles.css.
- Soft rounded corners (rounded-2xl / rounded-3xl), generous whitespace.

### Shared components (`src/components/`)
- `SiteHeader` — sticky nav with mix-blend trick on hero, regular dark nav elsewhere; mobile sheet menu; language toggle (EN/繁中 scaffold, EN active).
- `SiteFooter` — Vancouver address, phone, email `info@tsaiorthodontics.ca`, ©2026 Tsai Orthodontics. All rights reserved. | Web Design by Bluluma
- `MobileStickyCTA` — fixed bottom "Book a Consultation" button (mobile only).
- `SectionHeader`, `PillarRow` (zigzag), `JourneyCard` (horizontal-scroll), `Accordion`, `ConsultationForm` (zod-validated).
- `LanguageContext` — minimal i18n scaffold (`en` / `zh-Hant` keys), all copy keyed but only EN populated.

### Imagery
- Generate all hero/portrait/journey images via `imagegen--generate_image` (warm natural light, candid editorial style, no clinical tropes). Save under `src/assets/`. ~10–14 images total.
- Doctor portrait, hero family shot, 4 journey portraits (parent, kid, teen, adult), 4 pillar atmosphere shots, 2 service hero shots.

### SEO
- Per-route `head()` with unique title, description, og:title, og:description, og:url (relative).
- Canonical only on leaves.
- Root `__root.tsx`: site-wide JSON-LD `Dentist`/`MedicalBusiness` Organization schema with address, phone, geo.
- `/faq` carries `FAQPage` JSON-LD.
- Service pages carry `MedicalProcedure` JSON-LD.
- `public/robots.txt` (allow all) and `src/routes/sitemap[.]xml.ts` server route listing all routes.

### Contact form
- Client-side zod validation (name, email, phone, message). Submit handler logs + shows success toast. (No backend wired — user can add Lovable Cloud later.)

### Mobile + a11y
- Mobile-first responsive (test at 375 + 768 + 1440).
- Sticky CTA, hamburger menu, single-column layouts.
- Semantic HTML, alt text on every image, focus states preserved.

### Out of scope (per user)
- Jotform embed (user will plug in their own form later — referral page ships with a clean placeholder).
- Traditional Chinese copy (architecture only — language toggle present, copy table ready, 繁中 strings empty).
- Backend / Lovable Cloud (no DB or auth needed now).

### Files to create/modify
- `src/styles.css` — palette + fonts + keyframes
- `src/routes/__root.tsx` — fonts link, JSON-LD, header/footer/sticky CTA wiring
- `src/routes/index.tsx` — new home (replaces placeholder)
- `src/routes/about.tsx`, `doctors.tsx`, `what-sets-us-apart.tsx`, `services.tsx`, `services.$slug.tsx`, `new-patients.tsx`, `faq.tsx`, `referral.tsx`, `contact.tsx`
- `src/routes/sitemap[.]xml.ts`
- `public/robots.txt`
- `src/components/site/*` and `src/components/sections/*`
- `src/lib/i18n.ts` (lightweight context)
- `src/lib/services-data.ts`, `src/lib/faq-data.ts`
- `src/assets/*.jpg` (generated)

Ready to build on approval.