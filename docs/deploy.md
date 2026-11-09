# Deploying HaatSetu on our own accounts

The code we started from pointed at the original team's servers (their Supabase project and `bharatse-api.onrender.com`). Those links are gone from the code now. Everything reads from settings, so our own services only need to be created once and their keys put in the right place.

Keys never go into the code or the APK. They go in `api/.env` (local, gitignored) and in the Render dashboard.

## 1. Supabase (database + photo storage)

1. Create a free project at supabase.com. Pick the **Mumbai (ap-south-1)** region and save the database password.
2. **Project Settings → Database → Connection string → URI**, "Session pooler". Change the start to `postgresql+psycopg://`:
   ```
   DATABASE_URL=postgresql+psycopg://postgres.<ref>:<password>@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
   ```
3. **Settings → Data API** has the Project URL. **Settings → API Keys → Secret keys** has the server key (`sb_secret_…`; a legacy `service_role` key also works):
   ```
   SUPABASE_URL=https://<ref>.supabase.co
   SUPABASE_SERVICE_KEY=<sb_secret_... key>
   ```
   The service role key bypasses all security rules. It belongs only on the server, never in the app or the web console.
4. **Storage → New bucket**, create two buckets:
   - `product-assets`, **public**: product photos.
   - `verification-documents`, **private**: ID documents for verification.
5. Create the tables once, from this PC:
   ```bash
   cd api
   .venv/Scripts/alembic upgrade head
   ```
   This needs `DATABASE_URL` in `api/.env`. The first migration turns on the `vector` extension, which Supabase supports.

## 2. Other keys

| Setting | Where to get it |
| --- | --- |
| `GEMINI_API_KEY` | aistudio.google.com → Get API key |
| `GEMINI_LISTING_API_KEY` | Optional second key for voice-to-listing, so it can stay on the free tier |
| `PASSPORT_PRIVATE_KEY_HEX`, `PASSPORT_PUBLIC_KEY_HEX` | `cd api && .venv/Scripts/python scripts/generate_keys.py` |
| `SECRET_KEY` | Render generates it; for local use any long random string |
| `FIREBASE_PROJECT_ID` | Only if we use Firebase sign-in. Phone OTP works without it (prototype code `123456`) |

## 3. API on Render

1. Push this repo to GitHub (done: `Avishkaar-Haatsetu`) and give Render access to it.
2. Render → **New → Blueprint** → pick the repo. Render reads `api/render.yaml` and creates the `haatsetu-api` web service. If the blueprint is not detected, create a **Web Service** by hand: runtime Docker, root directory `api`, health check path `/api/v1/health`.
3. In the service's **Environment** tab, fill in every value marked "sync: false" in `render.yaml`: `DATABASE_URL`, `GEMINI_API_KEY`, `GEMINI_LISTING_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `PASSPORT_PRIVATE_KEY_HEX`, `PASSPORT_PUBLIC_KEY_HEX` (and `FIREBASE_PROJECT_ID` if used).
4. After it deploys, open `https://<service>.onrender.com/api/v1/health`. It should show `"status":"ok"` and the database as reachable.

The free plan sleeps after 15 minutes idle and takes about 50 seconds to wake. Open the health link a minute before a demo.

## 4. Point the app and the console at it

- **APK:** if the Render address is not `https://haatsetu-api.onrender.com`, either change it in the app (Settings → HaatSetu API address → Save → Test connection) or rebuild:
  ```bash
  python mobile_app/build_apk.py --sdk D:/CodeApex/_local/android --server https://<service>.onrender.com
  ```
- **Web console:** set `NEXT_PUBLIC_API_URL=https://<service>.onrender.com/api/v1` where the console is hosted (or in `web/.env.local`). Without it, the console uses `https://haatsetu-api.onrender.com/api/v1`.

## Demo without any of this

The APK's **Try the demo** button runs on sample data with no network. Voice, photo studio, fair price and passport all work on the phone itself. Live mode (phone sign-in) is what needs the deployed API.
