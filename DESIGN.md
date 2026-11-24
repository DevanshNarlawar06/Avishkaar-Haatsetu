# HaatSetu design system

One visual language for the landing page, the programme console (`web/`) and the
artisan app (`mobile_app/`). It is taken from the idea-submission deck: a night-blue
village sky, marigold saffron, brick-red clay and cream paper, with outlined cards
that cast a hard shadow.

The people we design for first are rural producers who may be new to smartphones,
read little English, and use a low-end Android phone on a weak signal. If a screen
works for them, it works for everyone else.

## Principles

1. **Icon and word, always.** No action is an icon alone, and no state is shown by
   colour alone. The app stepper shows a picture and a word for each step.
2. **Say it out loud.** Every app step has a *Listen* button that reads the title and
   instructions in the chosen language.
3. **Big and forgiving.** Body text 17px in the app, 16px+ on the web. Anything
   tappable is at least 48 × 48px; main actions are 56–68px high.
4. **One main action per screen.** The saffron or indigo button at the bottom is the
   next step. Everything else is visibly secondary.
5. **Honest by default.** Sample data is labelled as sample data. If the API fails we
   say so and change nothing; we never show invented records in its place.
6. **Language is data.** All copy lives in dictionaries (`web/src/content/landing.ts`,
   `mobile_app/assets/i18n.js`). Adding a language does not touch layout code.

## Colour

| Token | Hex | Role |
| --- | --- | --- |
| `indigo` | `#1E2A78` | Primary surface (hero, sidebar, passport), primary buttons |
| `ink` | `#15163F` | Text, outlines, hard shadows |
| `saffron` | `#F4A81E` | Accent, "do this next" buttons, current step |
| `brick` | `#B9362C` | Eyebrow labels, wage floor, recording, errors |
| `teal` | `#2F7A6B` | Done, live, success |
| `cream` | `#FFFAF0` | Card surface |
| `paper` | `#FAF3E1` | Page background |
| `peach` | `#F6D5C4` | Section background (offline) |
| `lavender` | `#DCE0FF` | Neutral state chips, Listen button |
| `muted` | `#4F5175` | Secondary text |

Contrast (WCAG 2.2, AA needs 4.5:1 for body text):

| Pair | Ratio |
| --- | --- |
| ink on paper / cream | 15.6 / 16.6 |
| muted on paper | 6.9 |
| cream on indigo | 12.2 |
| saffron on indigo | 6.3 |
| ink on saffron | 8.6 |
| white on teal | 5.1 |
| white on brick | 5.8 |
| brick on paper | 5.2 |

Do not put brick or muted text on saffron (it fails). Use ink.

## Type

| Use | Web | App |
| --- | --- | --- |
| Headings | Lexend 700–800 (designed for reading fluency) | System sans, 800–900 |
| Body | Noto Sans | System sans (Roboto / Noto on Android) |
| Devanagari | Mukta | Noto Sans Devanagari (ships with Android) |
| IDs, code | JetBrains Mono | — |

The app uses system fonts on purpose: nothing to download, and Android already has
Noto for every Indian script. The WebView follows the phone's font-size setting up
to 130%.

## Surfaces

- **Card:** cream fill, 2px ink border, 14–18px radius, `3px 3px 0 ink` shadow.
  On indigo, the shadow is saffron instead.
- **Pill:** fully rounded, bold 13–14px, used for tags and statuses.
- **Arch:** images sit in a tall arch (fully rounded top) with a thick outline, as in
  the deck.
- **Status colours:** built = teal, partly built = saffron, designed = peach.

## Focus and motion

- Focus ring: 3px saffron outline, 2px offset, on every interactive element.
- Pressed buttons shift 2px into their shadow.
- `prefers-reduced-motion` turns animation off everywhere.

## Where the tokens live

- Web: `web/src/app/globals.css` (`--hs-*` variables, also exposed as Tailwind colours
  `bg-indigo`, `text-saffron`, …)
- App: `mobile_app/assets/app.css` (`:root` variables)
- Logo: `web/public/logo.svg` = `mobile_app/assets/logo.svg`; launcher icon
  `mobile_app/res/mipmap-xxxhdpi/ic_launcher.png`

Keep the two stylesheets in step when a value changes.
