# HaatSetu web

The public landing page and the programme console for HaatSetu.

| Route | What it is |
| --- | --- |
| `/` | Landing page, English and Hindi (`/?lang=hi`) |
| `/console` | Programme overview: headline figures, income, schemes, channels, clusters |
| `/console/verification` | Producer verification queue (live API) |
| `/console/verification/[id]` | Level 1 identity check for one producer (live API) |
| `/console/beneficiaries` | Onboarding against target, by welfare scheme |
| `/console/clusters` | Cluster performance, grouped by vertical |
| `/console/passports` | How origin passports are signed and checked |

Old URLs (`/producer-verification`, `/clusters`, …) redirect to their `/console` pages.

## Stack

Next.js 16 (App Router), TypeScript, Tailwind v4, shadcn/ui on Radix, Recharts, Lucide.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

`NEXT_PUBLIC_API_URL` points the verification pages at an API
(default `https://haatsetu-api.onrender.com/api/v1`).

## Where things live

- `src/content/landing.ts` – all landing copy, one dictionary per language.
  Add a language by adding a block and an entry in `LOCALES`.
- `src/lib/brand.ts` – product name, taglines, links.
- `src/app/globals.css` – design tokens. See `/DESIGN.md` for the full system.
- `src/components/shell/nav.ts` – console navigation (sidebar and phone menu).
- `src/lib/data.ts` – sample figures for the console. Every number is made up and
  each page says so.
- `src/lib/api.ts` – API client. Functions return `null` on failure so pages can
  say "could not reach the API" instead of showing placeholder data.
