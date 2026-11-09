# HaatSetu — AVISHKAAR Season 4

*From the village haat to every market.* A voice-first digital market bridge for rural producers, starting with handicraft artisans.

**Theme:** Digital Empowerment for Rural Communities · **Team:** Luminescence

| Folder | What it is |
| --- | --- |
| `web/` | Next.js programme console (verification, beneficiaries, clusters, income lift) |
| `api/` | FastAPI backend: voice-to-listing, image studio, fair-price engine, signed Craft Passport |
| `mobile_app/` | Android artisan app (APK): speak, photo studio, fair price, Craft Passport; demo mode works offline |
| `docs/problem-statement.md` | Reframed problem statement with sourced statistics |
| `submission/` | Abstract (.docx/.pdf), pitch deck (.pptx/.pdf), figures |

## Run locally

```bash
cd web && npm install && npm run dev          # http://localhost:3000
cd api && python -m venv .venv && .venv/Scripts/pip install -e ".[dev]"
cp api/.env.example api/.env && cd api && .venv/Scripts/uvicorn app.main:app --port 8000
```

Build the APK (needs JDK 17+ and the Android SDK):

```bash
python mobile_app/build_apk.py --sdk <android-sdk> --server https://haatsetu-api.onrender.com
```

Deploying our own Supabase and API: `docs/deploy.md`. See `web/README.md` and `api/README.md` for details.
