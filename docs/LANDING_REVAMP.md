# Landing page revamp (internal)

## Summary

The marketing home was restructured for clearer **visual hierarchy**, **section rhythm**, and **WhatsApp-first conversion**. Copy was shortened for scanability while preserving product meaning (fees, verification, Accra focus, landlord-first routing).

## Layout & flow (`Home.tsx`)

Order is now:

1. Hero → How it works → What you can find → Why Onukpa → Popular areas → Add-on services → Pricing → Stats → Testimonials → Landlords → Agents → FAQ → Save our number → Footer.

The old **Features** section was removed; its ideas appear as compact chips and bullets inside **Why Onukpa**.

## New / refactored components

| Piece | Role |
| --- | --- |
| `SectionIntro` | Shared eyebrow + `Fraunces` title + subtitle for consistent section headers. |
| `Hero` | Tighter headline, trust chips, clearer CTAs, layered “sample match” card + mockup. |
| `WhatsappMockup` | Mirrors bot copy from `onukpa-bot` (`greetingMessage` menu choice, apartment type prompt, match + listing template). User = green right; bot = white left. |
| `Navigation` | Cleaner sticky bar, Accra-oriented nav labels, primary “Find on WhatsApp”. |
| `Properties` | Image-height cards with gradient + grid texture (ready to swap for real photos). |
| `PopularAreas` | Featured area cards + secondary chip list + WhatsApp CTA strip. |
| `WhyOnukpa` | Shorter bullets + platform chips (verified, alerts, estimates, urgency). |
| `PricingTransparency` | Fee cards emphasise **5%** / **10%** numerals; white section. |
| `Stats` | Solid `stone-950` band; stat cells use `bg-white/[0.07]` + border for readability. |
| `Testimonials` | Slimmer carousel (3 quotes per audience), neutral tabs, no duplicate stat grids. |
| `SaveOurNumber` | Strong closing CTA with copy, call, and **copy-to-clipboard**. |
| `Footer` | Flat dark footer without heavy pattern overlays; updated link groups. |

## Visual strategy

- **Typography:** `Poppins` for UI/body; **Fraunces** for display headings (loaded in `index.html`).
- **Colour:** Kept **primary green** (`#41b344`). Tailwind **surface** tokens include `warm`, `muted`, `sage`, and `parchment` for section banding on a `stone-100` page shell.
- **Imagery:** No generic stock URLs. Hero relies on the **product mockup**; category and landlord/agent blocks use **gradient + texture** placeholders with stable aspect ratios — drop in `/public/landing/*.jpg` later by replacing the top `<div>` in those cards or adding `<img>`.

## Landing images (wired)

Paths are centralized in `src/constants/landingImages.ts` (files live in `public/landing/`).

| Asset | Where it’s used |
| --- | --- |
| `addon-moving-van.jpg`, `addon-cleaning.jpg`, `addon-electrician-painter.jpg` | Add-on services (Unsplash; replace anytime) |
| `campus.jpg` | How it works — banner above steps |
| `room.jpg`, `apartment.jpg`, `hostel.png`, `retail.jpg` | What you can find — category cards |
| `accra2.webp` | Popular areas — wide banner with gradient overlay |
| `keys-home.jpg` | Landlords card |
| `nelson.png` | For agents — portrait / team visual |

Swap filenames in `landingImages.ts` if you replace art.

## Recommended next assets

1. **OG / social:** Dedicated 1200×630 preview using `accra2` or hero art.
2. **Add-on stock photos:** Replace `addon-*.jpg` with your own shots or licensed assets when ready (current files are from Unsplash).

## FAQ content

Agent onboarding answer updated to match **WhatsApp-first** onboarding (`ForAgents`).

## Removed

- `src/components/Sections/Features.tsx` (content merged into Why Onukpa).
