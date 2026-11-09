# HaatSetu — Problem Statement (AVISHKAAR Season 4)

**Theme:** Digital Empowerment for Rural Communities
**Product:** HaatSetu — *"From the village haat to every market"* (गाँव के हाट से हर बाज़ार तक)

---

## One-line problem statement

> Rural producers make goods the market wants, but cannot reach that market on fair terms, because selling online assumes literacy, English, photography, pricing knowledge and marketplace know-how that most of them do not have.

## The general problem (where HaatSetu goes long-term)

India's rural economy is full of **micro-producers**: handicraft artisans, handloom weavers, women's self-help groups (SHGs) making food products, and tribal collectors of forest produce. They share the same four barriers:

1. **Access:** They sell at the local haat, through middlemen, or at seasonal fairs. Income is irregular and the producer keeps a small share of the final price.
2. **Digital literacy and language:** Listing on a marketplace means typing English text, filling forms and managing an account. Most rural producers are comfortable speaking their own language, not typing English.
3. **Presentation:** Phone photos on a cluttered background look unprofessional online, and the product loses value before a buyer reads anything.
4. **Pricing and trust:** Producers do not know the market price, so they underprice. Buyers cannot tell a genuine handmade or GI product from a factory copy.

These barriers are **not specific to crafts**. Any rural producer selling a physical product hits all four. HaatSetu is built as a general rural market-linkage layer: the producer type (a "vertical") is configuration, not a rewrite.

## The focused problem (what we are building now)

> **Handicraft artisans** in India have a living craft and a willing national market, but no year-round digital route to it. Language barriers, poor product photos, guesswork pricing and no proof of authenticity mean their work is either never listed online or listed at a price below the value of their labour.

We start with artisans because:
- the gap between their craft's value and their income is widest,
- authenticity (GI tags, artisan identity) matters most to buyers here, and
- there is existing government infrastructure to plug into (artisan ID cards/Pehchan, GeM, ONDC, DC Handicrafts schemes).

## Pain points

| Pain point | What it looks like on the ground |
| --- | --- |
| Seasonal, middleman-led income | Sales cluster around fairs and festivals; traders set the price |
| Can't create a listing | Marketplace onboarding needs English, typing and forms |
| Product photos look poor | Cluttered background, bad light, so the product looks cheap online |
| No price knowledge | Price set by guesswork, often below cost of materials plus fair wage |
| No proof of authenticity | Buyers can't tell genuine handmade or GI from mass-produced copies |
| Schemes can't measure impact | Officers can't see whether beneficiary income actually rose |

## Statistics (sourced)

- **64.66 lakh handloom & handicraft artisans**, ~64% women (Ministry of Textiles, PIB, Dec 2025). An IHD–Crafts Council of India study estimates **1.13 crore** craft workers.
- **~₹270/day gross value added per craft worker**, below minimum wages (IHD–CCI study). This is value added, not take-home pay.
- **1:10 source-to-retail price ratio is "not at all rare"** in Indian craft markets (Dilli Haat caselet).
- **548 million of India's 958 million active internet users are rural** (IAMAI–Kantar, Internet in India 2025, released Jan 2026).
- **10 crore women in 90 lakh+ SHGs** under DAY-NRLM (MoRD, 2025). This is the next vertical.

## Problem validation (to do before submission)

- [ ] Talk to 5–10 artisans/SHG members (local haat, a craft mela, a village your college NSS unit works with). Record: how they sell, how they price, whether they've tried any app.
- [ ] One conversation with a cluster officer, NGO or DRDA/NRLM block staff on how scheme impact is tracked today.
- [ ] Put 2–3 quotes and one number from these conversations into the abstract.

## Existing solutions and their limits

| Existing | What it offers | What's missing |
| --- | --- | --- |
| Amazon Karigar, Flipkart Samarth | Big-marketplace seller programmes | Seller still has to do the photos, English listing and pricing |
| iTokri, Jaypore | Curated craft stores | Curator-driven, small intake, not a tool the artisan controls |
| Tribes India / TRIFED, GeM | Government channels | One channel each, no help creating the listing |
| ONDC seller apps | Open network access | Assume a digitally confident seller |
| Etsy | Global handmade market | English-first, international payments, no India context |

**Common gap:** every option is a **place to sell**. None of them turns a rural producer's voice and phone photo into a finished, fairly priced, verified listing.

## Our solution and what makes it different

**HaatSetu** is a voice-first companion app for the producer, plus a programme console for government and NGOs.

- **Speak, don't type:** The artisan describes the product in their own language in a voice note. AI generates a bilingual listing.
- **AI photo studio:** One phone photo becomes a clean, e-commerce-ready product image.
- **Fair-price floor:** Suggested price = materials + hours × fair wage + overhead, with a market price band (P10–P90). **The system will never suggest a price below the maker's wage.**
- **Signed Craft Passport:** A QR code/NFC tag with a cryptographic signature that proves the artisan's identity, region and technique. Buyers can verify it, not just read a claim.
- **List once, sell everywhere:** The same listing goes to the HaatSetu storefront, ONDC, social commerce and B2B leads.
- **Programme console:** Officers see verification queues, beneficiaries by scheme, cluster performance and income at intake against income now.

**Why it generalises:** voice → listing, photo studio, price floor and provenance work for any rural product. Only the vocabulary changes, e.g. "Craft Passport" becomes "Origin Passport" for SHG pickles or forest honey.

## Brief technical description and feasibility

- **App:** Flutter, built for low-end Android, offline drafts and sync.
- **Backend:** FastAPI + PostgreSQL (pgvector) on Supabase.
- **Language:** Gemini (audio straight to listing), with Bhashini (MeitY) and Sarvam as fallbacks.
- **Images:** Generative studio pass, with rembg (isnet, Apache-2.0) as fallback.
- **Pricing:** LightGBM quantile regression on top of a rule-based fair-wage floor.
- **Provenance:** Ed25519-signed QR/NFC passports.
- **Search:** CLIP embeddings in pgvector, so the same search works for text and images.
- **Console:** Next.js dashboard (this repo, `web/`).
