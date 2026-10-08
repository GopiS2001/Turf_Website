# 90s Turf — Website

Customer website for **90s Turf**, a floodlit 5-a-side / 7-a-side football and box cricket turf in Salem, Tamil Nadu. Visitors can browse services, pricing and the gallery, check slot availability, and book an hourly slot online.

Built with **Next.js 16** (App Router), **React 19**, **TypeScript** and **Tailwind CSS v4**.

## Features

- Single-page site: Hero, Quick availability check, About, Services, Pricing, Gallery, Reviews, Booking, Contact
- Online slot booking with live price calculation (day/night rates) and a confirmation modal
- Enquiry form, click-to-call, WhatsApp and Google Maps directions
- Gallery lightbox and testimonial carousel
- Sticky header with scroll-spy and a mobile menu
- SEO metadata and JSON-LD structured data
- **Demo mode** — runs with no backend at all, using built-in sample data

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Configuration

Set these in `.env.local` (see `.env.example`):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Booking API base URL, e.g. `http://localhost:4000/api`. **Leave empty for demo mode.** |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, used for social preview links |

### Demo mode vs. live API

- **Demo mode** (`NEXT_PUBLIC_API_URL` empty): content comes from `src/lib/mock/data.ts`, and bookings are saved in the browser's `localStorage`.
- **Live mode**: the site calls a REST API that provides these endpoints:

  | Method | Endpoint | Used for |
  |---|---|---|
  | GET | `/public/services` | Services section |
  | GET | `/public/pricing` | Pricing plans |
  | GET | `/public/gallery` | Gallery images |
  | GET | `/public/reviews` | Testimonials |
  | GET | `/public/slots?date=YYYY-MM-DD` | Slot availability |
  | POST | `/public/bookings` | Create a booking |
  | POST | `/public/enquiries` | Send an enquiry |

  If the content endpoints can't be reached, the page falls back to the built-in content instead of failing.

## Customising

| What | File |
|---|---|
| Phone, WhatsApp, address, email, social links, map location | `src/lib/site.ts` |
| Services, pricing plans, gallery, reviews (demo data) | `src/lib/mock/data.ts` |
| Opening hours, night-rate start time, booking rules | `src/lib/pricing.ts` |
| Theme colours and fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |
| Images | `public/images/` |

## Project structure

```
src/
├── app/                  layout (fonts, SEO, JSON-LD), page (all sections), global styles
├── components/
│   ├── layout/           Header, Footer, FloatingActions
│   ├── sections/         Hero, QuickCheck, About, Services, Pricing, Gallery,
│   │                     Testimonials, Booking, BookingConfirmationModal, CtaBand, Contact
│   └── ui/               Logo, SectionTitle, SocialIcons
└── lib/
    ├── api.ts            API client with demo-mode switch
    ├── mock/             Demo data and local booking store
    ├── pricing.ts        Opening hours and price calculation
    ├── validation.ts     Form schemas (zod)
    ├── site.ts           Business details
    └── types.ts          Shared types
public/                   Icon and images
```

## Deployment

The site is a standard Next.js app and deploys as-is to Vercel or any Node.js host. Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL` in the host's environment settings. Leave the API URL empty to deploy in demo mode.
