# Redesign review notes (branch `redesign/deck-theme`)

Everything in this branch restyles HaatSetu on the idea-submission deck's theme and
cleans up the parts that felt unfinished. Nothing in `api/` changed.

The design system is written up in [DESIGN.md](DESIGN.md).

## What changed

### 1. New landing page (`web/`, route `/`)

Built section by section from the deck: hero ("Her craft. Her voice. Her price.") with
the haat illustration in an arch, the problem in numbers, the idea (app → agents →
storefront), the six-tap cycle, the six offline states, the agent system with
guardrails, the marketplace, and the roadmap. English and Hindi (`/?lang=hi`); the
language switch is in the header.

The hero illustration was cropped from the deck itself
(`web/public/img/haat-illustration.webp`); the bag photos are the app's existing
showcase images.

### 2. Console (`web/`, now under `/console`)

- One shared layout instead of every page mounting its own sidebar.
- **Phone menu added.** The sidebar was hidden below 1024px with no other way to move
  between pages.
- The "unlocked for navigation / see Overview" placeholder pages are now real pages:
  Beneficiaries, Clusters, Passports. Catalogue and Reports had no data or backend
  behind them, so they are gone (their URLs redirect to the overview).
- Search, Export and the period picker did nothing, so they are removed. A clear
  "Sample data" label sits in the header instead.
- Verification: if the API fails, the page now says so. Before, it showed an
  invented profile (with a Wikipedia Aadhaar image) and claimed "Action Required"
  had been saved even when the request failed.
- Bigger type, 40px+ buttons, a visible focus ring, screen-reader labels on icon
  buttons and trend arrows.

### 3. Artisan app (`mobile_app/`)

The app is a WebView around `mobile_app/assets/` (HTML/CSS/JS), so the UI changes are
all in those files and can be previewed in any browser.

- Deck palette and outlined cards; 17px body text, 56–68px main buttons.
- **Listen button on every step.** Reads the step aloud in the chosen language.
- Stepper shows an icon **and** a word per step (Speak, Photo, Price, Publish).
- Welcome screen: big language buttons, "Your craft. Your voice. Your price."
- The language picker is built from `i18n.js`. Adding Tamil, say, means adding one
  dictionary with `_name: "தமிழ்"` and `_speech: "ta-IN"`.
- Error messages that were hard-coded in English are now translated.
- Whole channel rows toggle (not just the small switch); product rows are real buttons.
- New logo and launcher icon. Version bumped to 1.4 (versionCode 5).

Native changes in `MainActivity.java` and `AndroidManifest.xml`:

- **Text-to-speech bridge** (`canSpeak`, `speak`, `stopSpeaking`) using Android's
  built-in `TextToSpeech`. Android WebView has no `speechSynthesis`, so without this
  the Listen button would do nothing on a phone.
- `<queries>` entry for the TTS service (needed on Android 11+ to find the engine).
- The WebView now follows the phone's font-size setting (capped at 130%) instead of
  forcing 100%.
- Status bar and background colours updated.

## How to review on the PC with the Android SDK

```powershell
git fetch origin
git checkout redesign/deck-theme
```

**Web**

```powershell
cd web
npm install
npm run dev
```

Open http://localhost:3000 (landing), http://localhost:3000/?lang=hi (Hindi) and
http://localhost:3000/console.

**App in a browser (fast check, no SDK)**

```powershell
python -m http.server 5500 --directory mobile_app/assets
```

Open http://localhost:5500, switch the browser to a phone-sized view, and go through
Try the demo → New product → sample voice → sample photo → price → publish.

**APK**

```powershell
python mobile_app/build_apk.py --sdk <android-sdk> --server https://haatsetu-api.onrender.com
```

## Please check on a real phone

These could not be tested on this machine (no Android SDK, by request):

1. **The APK compiles.** `MainActivity.java` gained a `TextToSpeech` field, three
   `@JavascriptInterface` methods and `onDestroy`. If `javac` complains, it will be in
   those additions.
2. **Listen speaks Hindi.** Tap Listen on the welcome screen with Hindi selected. If the
   phone has no Hindi voice, Android falls back to its default voice; installing
   "Speech Services by Google" with Hindi fixes that.
3. **Large font setting.** Set the phone's font size to the largest and check that the
   welcome screen and price step still fit.
4. **Status bar colour** is indigo and the content does not slide under it.

## Verified here

- `web`: `tsc --noEmit`, `eslint` and `next build` all pass.
- Landing page and console checked at desktop and phone widths, English and Hindi.
- App: full demo flow (welcome → home → four steps → passport) in a phone-sized
  browser with no console errors.
- All text/background colour pairs meet WCAG AA (table in DESIGN.md).
