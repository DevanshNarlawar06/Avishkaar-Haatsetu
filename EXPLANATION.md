# HaatSetu: Complete Explanation

*From the village haat to every market.* (गाँव के हाट से हर बाज़ार तक)

**Theme:** AVISHKAAR Season 4, Theme 1: Digital Empowerment for Rural Communities
**Team:** Luminescence
**Live prototype:** programme console at https://haatsetu.vercel.app · API at https://haatsetu-api.onrender.com · Android app `submission/HaatSetu.apk`

This document follows the order of the pitch deck. Each heading matches a slide and explains it in full. It covers the problem, why it exists, what others have tried, what we built, how it works, who it helps, and how it grows from today's pilot (handicraft artisans) to every kind of rural producer.

---

## 0. HaatSetu in one paragraph

HaatSetu is a **voice-first selling platform for rural producers**. A producer speaks about the product in their own language and takes one phone photo. HaatSetu turns that into a finished product listing in English and Hindi, with an improved photo, a fair price that never falls below the producer's wage, and a signed **Origin Passport** (a QR code) that proves who made it and where. One tap publishes the listing to our storefront, ONDC, WhatsApp/social commerce and B2B or government buyers. A separate **programme console** lets government departments, NGOs and SHG federations verify producers, track scheme beneficiaries and measure whether incomes actually rise.

The name: a **haat** is the weekly village market where rural India has always sold its goods. **Setu** means bridge. HaatSetu is the bridge from that village haat to every market in the country.

---

## 1. Title: HaatSetu, a voice-first digital market bridge for rural producers

The title makes three claims, and the rest of this document backs each one:

- **Voice-first:** the main input is speech, not typing. That alone removes the biggest barrier for people who are comfortable talking but not typing English into forms.
- **Market bridge:** HaatSetu is not "yet another marketplace". It is the on-ramp that prepares a product and sends it to marketplaces that already exist.
- **Rural producers:** a deliberately broad term. It covers the artisan, the weaver, the women's self-help group making pickles, the farmer selling jaggery, the tribal family collecting forest honey, and the small village workshop making brass or wooden goods. The prototype starts with artisans; the design covers all of them.

---

## 2. Who we are: Team Luminescence

A same-college team of 2–4 members. *(Team names, roles and college are filled in on the slide.)*

What we bring to this problem:
- **Product and design:** a bilingual, low-literacy-first interface (big buttons, voice, icons, Hindi and English).
- **AI engineering:** speech-to-listing, image enhancement and pricing models, with fallbacks so the app keeps working when a provider fails.
- **Backend and security:** an API with automated tests, digitally signed passports, and a database shared by the app and the console.
- **Domain research:** sourced government and research statistics on rural producers, plus the validation plan in section 3.

---

## 3. The problem: rural producers can't reach the market on fair terms

### The one-line problem
> Rural producers make goods the market wants, but they cannot reach that market on fair terms, because selling online assumes literacy, English, photography, pricing knowledge and marketplace know-how that most of them do not have.

### What it looks like on the ground
A woman in a Madhubani village paints a fish-pair painting over four days. Her options:
1. Sell it at the weekly haat to a local buyer, at a low price.
2. Hand it to a trader who sells it in a city for many times what he paid her.
3. Wait for a government craft fair a few times a year.

She owns a smartphone. Her daughter uses WhatsApp. But listing the painting on Amazon or Flipkart means creating a seller account in English, typing a title and description, photographing it well, choosing a category and setting a price against products she has never seen. So she doesn't, and the trader keeps most of the value.

Replace "painting" with mango pickle, an ikat saree, forest honey or a brass lamp, and the story is the same. **That is the core insight: this is not a craft problem, it is a rural selling problem.**

### The numbers (sourced)
| Figure | What it means | Source |
| --- | --- | --- |
| **64.66 lakh** | handloom and handicraft artisans in India, about 64% of them women | Ministry of Textiles (PIB), Dec 2025 |
| **1.13 crore** | craft workers, by a broader estimate | IHD–Crafts Council of India study |
| **₹270 / day** | gross value added per craft worker, below prescribed minimum wages | IHD–Crafts Council of India |
| **1 : 10** | source-to-retail price ratio, described as "not at all rare" | Dilli Haat caselet |
| **548 million** | of India's 958 million active internet users are rural | IAMAI–Kantar, Internet in India 2025 |
| **10 crore women in 90 lakh+ SHGs** | self-help group members under DAY-NRLM, our next vertical | Ministry of Rural Development, 2025 |

The last two rows matter most for scale. Rural India is already online, and over 10 crore women are already organised into groups that make products. **The phones and the producers exist. The selling tool that fits them doesn't.**

---

## 4. Why it happens: four barriers, and they are not unique to crafts

| Barrier | The problem | How HaatSetu removes it |
| --- | --- | --- |
| **1. Access** | Sales depend on the local haat, seasonal fairs and middlemen who set the price. Income is irregular. | One listing is published to many year-round channels (storefront, ONDC, WhatsApp, B2B/GeM). |
| **2. Language and literacy** | Listing means typing English into forms. Most producers are comfortable speaking, not typing. | Speak in your own language; the AI writes the listing in English and Hindi. |
| **3. Presentation** | A cluttered, dim phone photo makes a fine product look cheap online. | The photo studio turns one phone photo into a clean product image. |
| **4. Price and trust** | Prices are set by guesswork, often below the cost of materials plus a fair wage. Buyers can't tell genuine handmade, GI or organic goods from factory copies. | A fair-price floor based on the producer's own hours and costs, plus a signed Origin Passport that buyers can verify. |

These four barriers apply to every rural producer: an SHG making papad, a weaver, a honey collector, a village carpentry unit. **That is why HaatSetu is designed as a general platform from day one**, even though the pilot starts with one vertical.

---

## 5. Existing solutions: every option is a place to sell, none creates the listing

| Existing option | What it offers | What's missing |
| --- | --- | --- |
| **Amazon Karigar, Flipkart Samarth** | Seller programmes on big marketplaces | The seller still does the photos, the English listing and the pricing |
| **iTokri, Jaypore and similar curated stores** | Curated handmade storefronts | Curator-driven and small intake; not a tool the producer controls |
| **TRIFED / Tribes India, GeM** | Government sales channels | One channel each; no help creating the listing |
| **ONDC seller apps** | Access to the open commerce network | Assume a digitally confident, literate seller |
| **Etsy and global platforms** | International handmade market | English-first, international payments, no India context |
| **Generic WhatsApp selling** | Easy, familiar | No pricing help, no trust signal, no reach beyond contacts |

**The common gap:** all of these are destinations. None of them turns a rural producer's voice and phone photo into a finished, fairly priced, verified listing. **HaatSetu does not compete with these channels. It feeds them.** The more channels exist (ONDC, GeM, social commerce), the more valuable a tool that prepares listings for all of them becomes.

---

## 6. Our solution: one voice note + one photo → a priced, verified listing

### The producer's journey (Android app)
1. **Speak.** Tap the microphone and describe the product: what it is, what it's made of, how it was made, how long it took. Any language: Hindi, Bengali, Tamil, Marathi and so on.
2. **Photo.** Take one photo on any background. The studio cleans it up and the producer compares before and after with a slider.
3. **Price.** The app shows the **fair-price floor** (materials + hours × fair wage + 12% overhead) and the **market band** (what similar products sell for). The producer picks a price and the app will not let it go below the floor.
4. **Publish.** Review and edit the listing in English and Hindi, choose channels (HaatSetu store, ONDC, WhatsApp catalogue, B2B/GeM leads) and publish.
5. **Origin Passport.** The server signs a passport (QR code) proving producer, region, method and hours. It can be printed on a tag or shared on WhatsApp.

From a dozen steps in English to **two inputs in their own voice**.

### The programme console (web)
Used by government departments, NGOs, SHG federations and cluster officers:
- **Producer verification:** a review queue for ID documents (Pehchan card for artisans, NRLM/SHG ID for SHG members, and others) before a seller goes live.
- **Beneficiaries by scheme:** coverage against target for each welfare category (SC, OBC, denotified tribes, persons with disabilities, senior citizens, DAY-NRLM SHG members).
- **Producer clusters:** performance by cluster across verticals (handicraft, handloom, SHG food, forest produce, micro-manufacturing).
- **Income lift:** median monthly income now against income at intake. This is the number ministries actually need, and rarely have.
- **Origin Passports:** how many passports were issued, scanned by buyers and verified.

### Design principles
- **Smartphone only:** no special hardware; built for low-end Android.
- **Works offline:** a full demo mode runs without internet, and drafts can be made in poor connectivity.
- **The producer stays in control:** they hear and edit every listing before it goes live. AI suggests; the producer decides.
- **Honest AI:** if the voice note is unclear, the AI returns nothing rather than inventing a product, because the listing is published under a real person's name.

---

## 7. Top 3 novel features: what no existing platform does

### 1. Speak, don't type
A voice note in the producer's own language becomes a complete bilingual listing: title, description, tags, materials, technique, category and estimated hours.
- One AI call goes from audio straight to a structured listing (Gemini), so there is no separate speech-to-text and translation step to lose meaning.
- English and Hindi are both written natively from the same description, not one machine-translated from the other.
- The categories cover every vertical: crafts (textiles, pottery, painting, woodwork, metalwork, bamboo and cane, jewellery, leather) and beyond (food products, farm produce, forest produce, personal care, home goods).
- Fallbacks: if one AI model is busy, the server automatically tries others. Bhashini (MeitY) and Sarvam are built in as alternative speech providers.

### 2. Fair-price floor
> Price floor = materials + (hours × fair wage per hour) + 12% overhead

- The default fair wage is ₹60/hour and can be configured per state or scheme.
- On top of the floor, a **market band** (P10–P90) shows what buyers pay for similar products, from AI market reasoning today and a LightGBM quantile model as data grows.
- **The system never suggests a price below the producer's wage, and the server enforces this rule.** No existing marketplace does this. They optimise for sales volume; HaatSetu also protects the seller's earnings.

### 3. Signed Origin Passport
- A QR code (or NFC tag) carrying an **Ed25519 digital signature** over producer, region, method, hours and product ID.
- Anyone can verify it. If even one character is changed, the signature fails. A buyer is not trusting a claim; they are checking a proof.
- It supports GI-tagged goods (Madhubani, Pochampally ikat, Kandhamal turmeric), organic or SHG-made claims, and fights factory copies.
- For the producer, the passport becomes a portable record of their work, useful for schemes, credit and loans later.

*(For handicrafts we call it the Craft Passport; for every other vertical it's the Origin Passport. Same technology, different name.)*

---

## 8. Technical approach and feasibility: built on proven, India-first technology

| Layer | Technology |
| --- | --- |
| **Producer app** | Android app (WebView shell + bundled app): voice recording, camera/gallery, bilingual UI, offline demo mode. A Flutter build is planned for production. |
| **AI** | Gemini for voice → listing, pricing reasoning and image studio; automatic fallback across models; Bhashini (MeitY) and Sarvam as alternative speech providers |
| **Pricing intelligence** | Rule-based wage floor + market band; LightGBM quantile model (P10/P50/P90) ready to train as listings grow; CLIP embeddings in pgvector for image and text search |
| **Trust and data** | FastAPI backend; PostgreSQL + pgvector on Supabase; Supabase Storage for photos (public) and ID documents (private); Ed25519-signed passports |
| **Programme console** | Next.js dashboard on Vercel: verification, schemes, clusters, income lift |
| **Hosting** | API on Render, console on Vercel, database and storage on Supabase |

### Why it's feasible
- **A working, deployed prototype exists.** The API is live and connected to its own database and storage. It handles sign-in, listing generation from voice, photo processing, pricing and signed passports. The console is live and reads from the same API. The APK installs on any Android 7+ phone.
- **70 automated backend tests pass**, covering pricing rules, passport tampering, image storage and fallback behaviour.
- **No special hardware.** A basic smartphone is enough.
- **All AI runs on the server.** A model can be swapped or upgraded without shipping a new app, and no API keys live on the phone.
- **Designed for failure:** if an AI model is busy, it falls back to another; if the image AI is unavailable, the photo still gets an automatic enhancement; if there's no internet, the demo mode still works.

---

## 9. Prototype: what's working today

### Producer app (Android, `HaatSetu.apk`)
- Bilingual (Hindi/English) welcome, sign-in by phone OTP (prototype code 123456), and a demo mode with sample data.
- The four-step flow: Speak → Photo → Price → Publish, then the Origin Passport with QR code and WhatsApp share.
- Sample products show the generality: a Madhubani painting, Jaipur blue pottery, an Assam bamboo basket, and a mango pickle from a women's SHG.

### Programme console (https://haatsetu.vercel.app)
- Programme overview: registered producers, active this month, median income against intake, value of goods sold.
- Producer verification queue and workspace.
- Beneficiaries by scheme, producer clusters across five verticals, catalogue, Origin Passports and reports.
- *Dashboard figures are sample data, labelled as such.*

### Backend (https://haatsetu-api.onrender.com)
- Live endpoints for authentication, products, voice-to-listing, image studio, pricing, passports (issue and verify), search and ministry dashboards.

---

## 10. Potential impact: better incomes, trusted products, visible impact

### For producers
- **Year-round market access** instead of seasonal fairs and middlemen.
- **From 10+ steps to one input:** speak and take a photo.
- **A fair-wage price floor:** their time is paid first.
- **Dignity and control:** their name, their story and their region travel with the product.
- **Women-led livelihoods:** about 64% of artisans and nearly all SHG members are women, so income gains go straight to women.

### For buyers
- **Verified authentic products:** a passport they can check, not a sticker they must trust.
- **The producer's story and region,** in their language.
- **Discovery by state, culture and product type,** from Pochampally ikat to Bastar honey.

### For government, NGOs and SHG federations
- **Income lift measured per beneficiary:** the outcome metric schemes are meant to deliver.
- **Plugs into existing infrastructure:** GeM, ONDC, Pehchan, DAY-NRLM, PM Vishwakarma, ODOP (One District One Product).
- **Cluster-level insight:** which clusters, products and channels are working.
- **Lower cost of support:** officers verify and monitor instead of building listings by hand.

### For society and culture
- **Digital preservation** of crafts, recipes and techniques, recorded in the producers' own voices.
- **Less distress migration:** more value stays in the village.
- **Rural entrepreneurship:** a producer becomes a seller with a brand, not a supplier to a trader.

---

## 11. Implementation plan: focused today, built to generalise

### How the prototype is "artisan-first" today
The pilot vertical is handicraft artisans, because:
- the gap between the product's value and the maker's income is widest,
- authenticity (GI tags, maker identity) matters most to buyers here, and
- the government infrastructure already exists (Pehchan cards, DC Handicrafts schemes, GeM, ONDC).

### How it generalises
Every core feature is producer-agnostic:

| Feature | For an artisan | For an SHG | For a farmer / forest collector | For a village workshop |
| --- | --- | --- | --- | --- |
| Speak, don't type | "Madhubani fish painting, natural colours, 4 days" | "Raw mango pickle in mustard oil, 500 g" | "Wild forest honey, Bastar, 1 kg" | "Hand-finished brass diya, set of 4" |
| Photo studio | Painting on a cluttered table | Pickle jar in a dim kitchen | Honey jar outdoors | Brass item on a workbench |
| Fair-price floor | Hours of painting × wage | Batch hours ÷ jars, ingredients | Collection and processing time | Labour hours + raw metal |
| Origin Passport | Maker, GI region, technique | SHG name, village, "no preservatives" | Forest region, harvest date | Unit name, district (ODOP) |
| Console | Pehchan verification, craft clusters | NRLM/SHG ID, SHG federations | FPO / van dhan kendra clusters | MSME / ODOP clusters |

**Adding a vertical is a configuration change, not a rewrite:** new vocabulary, categories, price features (for example a per-batch cost for food, or a per-kg cost for produce) and ID types. The listing categories for food, farm, forest and personal-care products already exist in the system today.

### Roadmap
| Phase | Who | What |
| --- | --- | --- |
| **Phase 1: Pilot (now)** | One handicraft cluster | Voice listing, photo studio, fair price, Origin Passport; console for one district officer; measure income at intake vs after 3 months |
| **Phase 2: SHG food products** | DAY-NRLM SHGs: pickles, papad, millets, spices, honey | Batch pricing, shelf-life and FSSAI fields on the passport, SHG federation dashboards |
| **Phase 3: Handloom, forest produce, farm produce** | Weavers, tribal collectors (van dhan kendras), FPOs | Per-kg pricing, harvest/origin on the passport, scale across ONDC, GeM and B2B buyers |
| **Phase 4: Rural micro-manufacturing** | Small village units: brass, wood, leather, bamboo products, soaps | ODOP district dashboards, wholesale/B2B quotes, multi-member units |

---

## 12. Who uses HaatSetu: target market

### Primary users (producers)
| Segment | Size (approx.) | Example |
| --- | --- | --- |
| Handicraft and handloom artisans | 64.66 lakh registered; ~1.13 crore by broader estimates | Madhubani painter, Pochampally weaver |
| SHG members (DAY-NRLM) | 10 crore women in 90 lakh+ groups | Pickle, papad and spice makers |
| Forest-produce collectors | Tribal households across central and eastern India | Honey, mahua, lac, sal-leaf plates |
| Small farmers and FPOs selling direct | Producer organisations nationwide | Jaggery, organic rice, millets |
| Rural micro-manufacturers | Village units under ODOP and MSME schemes | Brassware, woodwork, leather goods |

### Institutional customers (who pays)
- **Central and state governments:** Ministry of Textiles (DC Handicrafts / Handlooms), MoRD (DAY-NRLM), Ministry of Tribal Affairs (TRIFED / van dhan), MSME and ODOP programmes, state rural livelihood missions.
- **NGOs and CSR programmes** running livelihood projects.
- **SHG federations, FPOs and producer companies** that sell on behalf of members.

### Buyers (demand side)
- Urban consumers who want authentic, traceable, regional products.
- Retailers, exporters and corporate gifting buyers (B2B).
- Government procurement through GeM.

### Business model (how it sustains itself)
- **Free for producers:** no fees at the point of listing, ever.
- **Programme licence (B2G):** governments and NGOs pay per district or programme for the console, verification and impact reporting.
- **Small commission on sales (B2C/B2B):** only on completed orders, from the buyer side or the channel.
- **Passport verification for B2B buyers:** bulk provenance checks for exporters and retailers.

---

## 13. How everyone is affected

| Stakeholder | Before HaatSetu | After HaatSetu |
| --- | --- | --- |
| **Producer** | Sells locally or through middlemen, prices by guesswork, invisible online | Sells year-round across channels, paid at least a fair wage, has a verified identity and story |
| **Middleman / trader** | Captures most of the margin | Can still play a logistics or aggregation role, but on transparent prices |
| **Buyer** | Can't tell genuine from copy; no link to the maker | Scans a passport and sees who made it, where and how |
| **Government officer** | Counts beneficiaries enrolled, not income earned | Sees verified producers, sales and income lift per beneficiary |
| **SHG federation / FPO / NGO** | Builds listings and catalogues by hand | Members list themselves; the federation monitors and supports |
| **Rural economy** | Value leaves the village with the trader | More value stays local; less pressure to migrate |

---

## 14. How it scales

1. **Product scale (more verticals):** the same pipeline, configured per vertical (section 11). No new app per sector.
2. **Language scale:** the voice model already understands major Indian languages. Adding UI languages beyond Hindi and English is a translation file, not new code.
3. **Channel scale:** every new channel (ONDC sellers, GeM, social commerce, export marketplaces) is an integration on the server. Every producer gets it at once.
4. **Geographic scale:** the console is organised by state, district, cluster and scheme, so it maps onto how rural programmes are already run.
5. **Technical scale:** cloud hosting, stateless API, managed Postgres and object storage. AI runs on the server, so costs scale with use and models can be swapped for cheaper or better ones (including government Bhashini models) without app updates.
6. **Data scale:** every listing improves the pricing model. With enough listings per category and region, the market band moves from AI reasoning to a trained LightGBM model, with prices that are local, fair and explainable.

---

## 15. Risks and how we handle them

| Risk | Mitigation |
| --- | --- |
| AI writes something the producer didn't say | The prompt forbids invented facts; empty results instead of guesses; the producer reviews and edits before publishing |
| AI provider down or busy | Automatic fallback across models; alternative speech providers; offline demo mode |
| Fake producers or fake passports | Officer verification of ID documents before going live; Ed25519 signatures make passports tamper-proof |
| Privacy of ID documents | Stored in a private bucket; officers see them only through short-lived signed links |
| Low digital confidence | Voice-first, icon-led, bilingual UI; one task per screen; SHG and NGO staff can onboard members |
| Underpricing pressure from buyers | The server enforces the fair-wage floor; the producer sees why the price is fair |

---

## 16. Closing

**HaatSetu: speak in your language, sell to all of India.**

India's rural producers don't lack skill, products or phones. They lack a selling tool built for them. HaatSetu turns a voice note and a photo into a fair, trusted, multi-channel listing. It starts with artisans and is built for every rural producer.

---

### Appendix: sources
1. Ministry of Textiles, PIB backgrounder on handloom and handicraft artisans, Dec 2025.
2. Institute for Human Development & Crafts Council of India, craft-sector workforce and earnings study, 2025.
3. IAMAI & Kantar, *Internet in India Report 2025* (Jan 2026).
4. Ministry of Rural Development, DAY-NRLM progress (10 crore women, 90 lakh+ SHGs), 2025.
5. Dilli Haat caselet on artisan pricing and middlemen.

*Console figures in the prototype are sample data and are labelled as such in the interface.*
