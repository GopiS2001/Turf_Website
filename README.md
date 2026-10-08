# 90s Turf — Website

Single-page customer website for 90s Turf (Next.js 16 App Router, TypeScript, Tailwind CSS v4).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Data source

Copy `.env.example` to `.env.local`.

- `NEXT_PUBLIC_API_URL` empty → **demo mode**: content comes from `src/lib/mock/data.ts`; bookings are saved in the browser's `localStorage`.
- `NEXT_PUBLIC_API_URL=http://localhost:4000/api` → uses the NestJS backend (`/public/*` endpoints, see `../PROJECT_PLAN.md`).

## Where to edit

| What | File |
|---|---|
| Phone, WhatsApp, address, email, socials, map pin (`map.lat`, `map.lng`, `map.placeUrl`) | `src/lib/site.ts` |
| Services, pricing plans, gallery, reviews (demo data) | `src/lib/mock/data.ts` |
| Opening hours, night-rate start, max booking length | `src/lib/pricing.ts` |
| Theme colors and fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |
| Images | `public/images/` (Unsplash photos — replace with real turf photos) |

## Structure

```
src/app/                 layout (fonts, SEO, JSON-LD), page (all sections)
src/components/layout/   Header (scroll-spy, mobile menu), Footer, FloatingActions
src/components/sections/ Hero, QuickCheck, About, Services, Pricing, Gallery,
                         Testimonials, Booking, BookingConfirmationModal, CtaBand, Contact
src/lib/                 api.ts (mock/API switch), pricing.ts, validation.ts (zod), site.ts, types.ts
```
