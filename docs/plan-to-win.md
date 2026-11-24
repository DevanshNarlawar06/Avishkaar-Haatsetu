# HaatSetu: Plan to Win

Nov 25, 2026 · Owner: Devansh · Live version: https://claude.ai/artifact/26eRbE3VXBpw5jLRPwXMYQ

## Verdict

HaatSetu loses today on substance, not style: it is entered as Agentic AI but has no agent, and it has no real user. The design, the wage floor and the signed passport are already better than most rivals; what is missing is the thing the track rewards and the proof judges trust.

The three moves that matter most, all owned by Devansh:

1. **Build the supervisor agent and show its trace live** (items 1–2 below).
2. **Meet the artisan on WhatsApp** instead of an app install (item 3).
3. **Run a one-week field pilot** and lead the pitch with its numbers (item 4).

Everything else in this plan makes the win bigger; these three make it possible.

## Where HaatSetu stands today

The pieces a judge can touch are real and well made, but the thing the pitch is named after, the agent system, does not exist in the code. HaatSetu is entered under problem 7.1, Agentic AI, and its deck promises "a supervisor routes six specialists" behind an approval gate. A search of `api/app` finds no supervisor, no agent loop, no tool-calling and no orchestration. The app calls each endpoint in a fixed order: transcribe, enhance, price, publish.

| Area | State in the repo | What a judge will see |
| --- | --- | --- |
| Voice note to bilingual listing | Built (Gemini, with model fallback) | Works live, strong demo moment |
| Photo studio, before/after | Built (background removal, enhance, generative) | Works, visually convincing |
| Wage-floor price + slider | Built; market band is LLM reasoning, not a trained model | Works; "how do you know the band?" is an open question |
| Signed Origin Passport + QR | Built (Ed25519) | Works; the most defensible tech in the project |
| Backend | FastAPI on Render, Supabase, 70 tests | Credible engineering |
| Programme console | Built on sample data; verification queue is live | Looks good, but every number is invented |
| Supervisor + six agents | Not built | The headline claim of the track entry |
| Negotiation agent | Designed only | Shown in the deck as if it works |
| Channel publishing (WhatsApp, Instagram, ONDC) | Designed only | "One listing on every channel" is not yet true |
| Offline queue and sync | Designed only; demo mode fakes it | "Offline first" is a slogan, not a feature |
| Buyer storefront | Designed only | Buyers never appear in the demo |
| Field validation | None | No artisan has used it |

Three identity problems also blur the pitch:

- **Two competitions in one repo.** Parts of the code and docs still say SIH 2026, problem 26090, "ministry dashboard". The deck says AVISHKAAR Season 4, problem 7.1.
- **Two audiences.** The deck's story is one woman artisan ("Her craft"). The problem statement and console pitch a platform for every rural producer and a ministry. Judges remember one story, not a platform.
- **Two products.** An artisan app and a government console, with no buyer anywhere. The money in the deck's business model comes from buyers, who are never shown.

## What winning projects in this space did

HaatSetu's core idea is no longer rare: at least three other teams pitch "photo + voice note becomes a priced listing for artisans". The winners stand out on reach (any phone, no app), real agents doing real work, and proof that someone used it.

| Project | Result | What it does | What made it stand out |
| --- | --- | --- | --- |
| [MEGHA](https://www.freepressjournal.in/india/ai-solution-for-india-wins-top-spot-at-harvards-hackathon) | 1st, Kennedy AI for Good Hackathon, Harvard, Apr 2025 | Toll-free, voice-first assistant for government schemes | Works on any basic phone; answers grounded in official documents; team included serving IAS/IRS/IPS officers |
| [MumbaiHacks 2025 winners](https://www.tribuneindia.com/news/business/mumbaihacks-2025-crowns-indias-next-gen-ai-innovators-with-inr-1-crore-cash-and-rewards-marking-the-worlds-largest-agentic-ai-hackathon) (MoneyMitra, CardioSense AI, Padhai Check) | Track winners, Dec 2025, 3,500+ entrants | Agentic assistants for money, health, study | Each agent does one job end to end; local language (Hinglish); low-bandwidth runner-up Nirogya |
| [KalaSetu](https://builder.aws.com/content/3Jb3iMyDaFgC9Uhw1Zc6T0TBya9/building-kalasetu-an-ai-powered-platform-for-traditional-artisans) | Hackathon prototype, Sep 2026, no award stated | Photo + voice description → catalogue → fair price → market linkage | Almost the same flow as HaatSetu, plus direct orders and B2B inquiries |
| [HunarSetu](https://www.devdiscourse.com/article/technology/3678786-hunarsetu-bridging-the-gap-between-indias-traditional-artisans-and-the-digital-economy) | Funded startup, 4 years old | Vernacular artisan marketplace | Claims 12,000 artisans and 50,000 products; sells over WhatsApp and SMS; UPI payouts, micro-credit |
| [Gram Sootra voice module](https://www.asme.org/Topics-Resources/Content/Voice-AI-App-Helps-Rural-Women-Silk-Artisans) (Resham Sutra) | Field deployment, Nov 2026 | Talk-and-listen listing for women silk producers | Fully offline, about 40 MB, Whisper.cpp + Android text-to-speech, regional language first (Khasi) |

Five patterns repeat across them:

1. **Reach the person where they already are.** A toll-free number, WhatsApp or an offline module beats a new app to install.
2. **Agents that act, shown acting.** Agentic winners show the agent deciding and doing on stage, not a diagram of it.
3. **Proof from the field.** The strongest entries name real users, a partner organisation or a pilot. Nobody wins on sample data.
4. **One person, one job.** Each winner solves a single painful task for one named user, not a platform for everyone.
5. **Trust built in.** Answers grounded in official sources, a human approval, a verifiable record.

Open question: AVISHKAAR Season 4's published judging rubric could not be found online. Devansh should get it from the organisers and weight this plan against it.

## What is holding HaatSetu back

The biggest gap is not design or polish: it is that the Agentic AI claim is unbuilt and nothing has touched a real artisan. Ranked by how much each costs us in front of judges:

| Rank | Gap | Type | Why it costs us |
| --- | --- | --- | --- |
| 1 | No agent system in the code | Features | We are in the Agentic AI track. One question ("show me the supervisor") ends the demo. |
| 2 | Zero field proof | Proof | Every rival with traction claims real users. Our console runs on made-up numbers, which reads as theatre. |
| 3 | The artisan must install an app | Positioning | Winners meet users on WhatsApp or a phone call. An APK is the hardest door for a first-time smartphone user. |
| 4 | "One listing, every channel" is not true yet | Features | Nothing is published anywhere. The outcome the artisan cares about, a sale, never happens in the demo. |
| 5 | Too many stories | Pitch | Artisan app, ministry console, marketplace, six agents, Sathi jobs, four revenue lines. Judges leave remembering none. |
| 6 | No buyer in the demo | Pitch | The business model depends on buyers; the storefront is "designed". |
| 7 | Crowded idea | Positioning | KalaSetu and HunarSetu pitch the same flow. Our edge (wage floor, signed passport, approval gate) is buried. |
| 8 | Offline is a slogan | Features | Demo mode fakes sync. A judge who turns off Wi-Fi breaks it. |
| 9 | Leftover SIH branding | Polish | "Ministry", "SIH 2026" and "PS 26090" in code and docs tell judges this is a recycled entry. |

What is already a strength, and should stay at the centre:

- **The wage floor.** "Price never drops below her wage" is a rule no competitor states. It is simple, moral and demonstrable.
- **The signed passport.** Real cryptography a judge can verify with a phone camera.
- **The approval gate.** "Nothing happens without her yes" is the right answer to "is agentic AI safe for vulnerable users?"
- **The design.** After the `redesign/deck-theme` work, the look matches the deck and is accessible. Design is no longer the gap.

## Implementation plan for Devansh

Devansh owns all twelve items; P0 items decide whether HaatSetu can win, P1 makes it memorable, P2 removes reasons to mark it down. Efforts are estimates in working days for one developer. Work top to bottom: each P0 item is demoable on its own.

| # | Priority | Feature | Why it matters | Done when | Effort (days, est.) | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | P0 | **Real supervisor agent** in `api/app/services/agents/`: a Gemini function-calling loop whose tools are the existing services (listing, photo, price, passport) plus publish and negotiate | The entry is in the Agentic AI track and no agent exists today | One voice note starts a run; the supervisor picks tools, retries a failed step, and stops at an approval state before anything goes public | 4–5 | Not started |
| 2 | P0 | **Agent trace**: every run logs each step (tool, input summary, result, why) to an `agent_runs` table; shown live in the console and as plain spoken lines in the app | Judges must see the agent think and act, not a diagram | During the demo a panel fills step by step: "Heard Hindi → drafted listing → floor ₹1,180 → waiting for her yes" | 1–2 | Not started |
| 3 | P0 | **WhatsApp front door** (WhatsApp Cloud API test number): she sends a voice note and a photo, the agent replies with a listing card and "Reply 1 = yes, 2 = change" | No app install; every reach-focused winner met users on a channel they already use | A judge sends a voice note from their own phone and gets an approval card back within a minute | 3–4 | Not started |
| 4 | P0 | **Field pilot**: 10 artisans or SHG members in one cluster for one week, with a partner NGO or SHG federation | Every strong rival has real users; our console runs on invented numbers | One slide of real numbers (listings made, minutes per listing, her price vs the trader's) and a 30-second testimonial in her language | 7 calendar days | Not started |
| 5 | P1 | **Public product page** `/p/[id]` on the web: studio photo, her voice note, price breakdown, passport QR, "Order on WhatsApp" button | Puts the buyer in the demo and makes "one listing, every channel" true for at least one channel | Approving a listing produces a live URL that opens on a judge's phone | 2–3 | Not started |
| 6 | P1 | **Negotiation agent, minimal**: a buyer message ("50 bags in 6 weeks") → counter drafted from her floor and weekly capacity → sent only after her yes | It is the deck's best scene and the clearest proof of agents that ask | The Pune boutique scene from the deck runs live, end to end | 2 | Not started |
| 7 | P1 | **Real offline outbox** in `mobile_app/assets`: queue in local storage keyed by the existing `client_id`, retried on reconnect, six states shown as icon + word | "Offline first" is claimed but faked; a judge can switch off Wi-Fi | Airplane mode on → record and approve → airplane mode off → the listing appears in the console once, not twice | 2 | Not started |
| 8 | P1 | **Pilot data in the console**: a "Live pilot" panel fed by the real database; sample charts stay but are clearly labelled | Turns the console from a mock-up into evidence | The overview leads with real pilot counts | 1 | Not started |
| 9 | P2 | **Public passport check** `/verify/[id]`: scan the QR, see "Signature valid — made by Kamla Devi, Madhubani" | Lets a judge verify our strongest tech in five seconds | A phone camera scan of the printed QR opens a green "valid" page | 1 | Not started |
| 10 | P2 | **Third language** in the app and listing agent, chosen to match the pilot cluster (for example Marathi or Bengali), with its read-aloud voice | Shows the language design really scales | The full demo runs in that language, including Listen | 1–2 | Not started |
| 11 | P2 | **Honest price band**: show where the band comes from (comparable listings) or label it "estimate" | "How do you know the market price?" is a predictable judge question | The price step names its source or says estimate | 1 | Not started |
| 12 | P2 | **Remove SIH leftovers**: "SIH 2026", "26090", "ministry" wording in code and docs | Recycled branding signals a recycled entry | A repo-wide search for SIH, 26090 and ministry finds nothing user-facing | 0.5 | Not started |

What not to build before the finals: a trained LightGBM price model, Instagram or Facebook Shops posting, ONDC integration, the Sathi programme, micro-credit. Each takes weeks and none changes the demo.

## Pitch and demo rewrite

The new pitch is one artisan, one sale, one agent you can watch: cut everything a judge cannot see working. Positioning line: **"HaatSetu is an agent that works for the artisan, not the platform: it lists, prices and negotiates for her, and never goes below her wage or acts without her yes."** That sentence separates us from KalaSetu and HunarSetu, which are catalogue tools and marketplaces.

Story arc, 5 minutes:

1. **0:00 – 0:40 · One woman, one number.** Open on a pilot artisan's photo and her real trader price vs what the same bag sells for. Her voice, her words, subtitled.
2. **0:40 – 2:30 · Live demo, on WhatsApp.** A teammate sends her voice note and photo to the HaatSetu number. The agent trace fills on screen. The approval card arrives; she taps 1. The product page goes live; a judge opens it on their phone.
3. **2:30 – 3:20 · The agent negotiates.** Send the boutique's "50 bags in 6 weeks" message. The agent explains to her privately why 6 weeks is too tight, drafts ₹1,320 in 9 weeks, waits for her yes.
4. **3:20 – 3:50 · Trust.** A judge scans the passport QR: signature valid.
5. **3:50 – 4:30 · Proof.** Pilot numbers: artisans, listings, minutes per listing, price lift. One partner logo.
6. **4:30 – 5:00 · Scale and ask.** SHG federations as the distribution channel, commission only after she is paid, and what we need next.

Cut from the main pitch, keep in the appendix: the ministry console (show it only if asked about government adoption), the six-agent grid, offline state diagrams, four revenue lines, the Sathi jobs programme, the tech-stack slide.

Demo safety rules:

- Record a backup video of the full live demo the night before.
- Keep demo mode one tap away if Render or Gemini is slow; say so honestly if you switch.
- Use a pre-warmed API (hit `/health` 5 minutes before going on).

## Timeline and checklist

Three build weeks, each ending at a gate that must pass before the next starts; the last days go to the pitch. Numbers in brackets are plan items. If the finals are sooner, keep weeks 1 and 2 and cut week 3 to items 5 and 6.

| Phase | Work | Gate at the end |
| --- | --- | --- |
| Week 1 · Agent core | Supervisor agent (1), agent trace (2), remove SIH text (12), book pilot partner | Agent stops at her yes |
| Week 2 · Reach, proof | WhatsApp door (3), pilot with 10 artisans (4), passport check (9) | 10 real listings live |
| Week 3 · Buyer, deal | Product page (5), negotiation agent (6), offline outbox (7), pilot panel (8), language and price (10, 11) | **Full demo works on a judge's phone** |
| Final days · Pitch | New 5-minute story, backup demo video, five full rehearsals | — |

The week 3 gate is the one that matters: if the full demo does not run from a judge's phone, fall back to the recorded video and say so.

- [ ] Get AVISHKAAR Season 4's judging rubric and finals date from the organisers
- [ ] Confirm a pilot partner (SHG federation or craft NGO) by the end of week 1
- [ ] Get a WhatsApp Cloud API test number and verify it
- [ ] Rewrite the deck around the new 5-minute arc
- [ ] Record the backup demo video
- [ ] Rehearse five times with a timer

## Sources

- [MEGHA wins Kennedy AI for Good Hackathon](https://www.freepressjournal.in/india/ai-solution-for-india-wins-top-spot-at-harvards-hackathon), Free Press Journal, Apr 2025
- [MumbaiHacks 2025 winners](https://www.tribuneindia.com/news/business/mumbaihacks-2025-crowns-indias-next-gen-ai-innovators-with-inr-1-crore-cash-and-rewards-marking-the-worlds-largest-agentic-ai-hackathon), Tribune India, Dec 2025
- [Building KalaSetu](https://builder.aws.com/content/3Jb3iMyDaFgC9Uhw1Zc6T0TBya9/building-kalasetu-an-ai-powered-platform-for-traditional-artisans), AWS Builder Center, Sep 2026
- [HunarSetu](https://www.devdiscourse.com/article/technology/3678786-hunarsetu-bridging-the-gap-between-indias-traditional-artisans-and-the-digital-economy), Devdiscourse (PTI), Oct 2025
- [Voice AI app for rural women silk artisans](https://www.asme.org/Topics-Resources/Content/Voice-AI-App-Helps-Rural-Women-Silk-Artisans), ASME, Nov 2026
- HaatSetu repository, branch `redesign/deck-theme`, and the idea-submission deck

Traction figures for HunarSetu and Resham Sutra are the companies' own claims as reported. Two further pages (AI for Bharat winners, Weavehand) blocked automated reading and are not used.
