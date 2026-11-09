# HaatSetu Web

Ministry dashboard for HaatSetu, the market linkage and cataloguing platform for
government supported artisans. SIH 2026, problem statement 26090.

This repository is the ministry facing surface only. The artisan app and the
buyer storefront both come out of the Flutter repository, and the API is
separate again.

## Stack

Next.js 16 with the App Router, TypeScript, Tailwind v4, shadcn/ui on Radix,
Recharts for the charts, Lucide for icons.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

## Theme

The brand name and taglines live in `src/lib/brand.ts`, so a rename is a one-file change.
`src/app/globals.css` holds the palette.

| Token | Value | Used for |
| --- | --- | --- |
| `--background` | `#F6F4EC` | page ground, warm paper |
| `--primary` / `--brand-leaf` | `#1D4B39` | leaf green: buttons, hero, wordmark |
| `--ring` / `--chart-1` / `--brand-marigold` | `#E08A1E` | marigold, the accent |
| `--sidebar` | `#133429` | the one dark surface |
| `--brand-indigo` / `--chart-3` | `#4253A6` | targets |
| `--brand-success` | `#2F8552` | positive movement |

Type is Plus Jakarta Sans, with JetBrains Mono for code and Mukta for Devanagari.
Use the `.tabular` class on any number that sits in a column.

## Data

`src/lib/data.ts` stands in for the API. Every figure is fabricated for the
prototype, and the page says so at the foot. When the API lands, replace that
module with fetches and nothing above it moves.

## What is built

Only the Overview page. The other sidebar sections are marked as planned and
are deliberately inert rather than linking to routes that do not exist.

Overview covers the four headline measures, median artisan income against
income at intake, beneficiaries by scheme against target, listings against
orders fulfilled, sales by channel, cluster performance, and Craft Passport
issuance and verification.
