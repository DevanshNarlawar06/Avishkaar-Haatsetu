# HaatSetu — AVISHKAAR Season 4

*From the village haat to every market.* A voice-first digital market bridge for rural producers, starting with handicraft artisans.

**Theme:** Digital Empowerment for Rural Communities · **Team:** Luminescence

| Folder | What it is |
| --- | --- |
| `web/` | Next.js programme console (verification, beneficiaries, clusters, income lift) |
| `api/` | FastAPI backend: voice-to-listing, image studio, fair-price engine, signed Craft Passport |
| `docs/problem-statement.md` | Reframed problem statement with sourced statistics |
| `submission/` | Abstract (.docx/.pdf), pitch deck (.pptx/.pdf), figures |

## Run locally

```bash
cd web && npm install && npm run dev          # http://localhost:3000
cd api && python -m venv .venv && .venv/Scripts/pip install -e ".[dev]"
cp api/.env.example api/.env && cd api && .venv/Scripts/uvicorn app.main:app --port 8000
```

See `web/README.md` and `api/README.md` for details.
