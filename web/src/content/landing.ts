/**
 * Landing page copy, one dictionary per locale.
 *
 * To add a language: copy the `en` block, translate the strings, and add the
 * locale to LOCALES. Nothing else in the page changes. Keep sentences short
 * and concrete; this page is read by funders and by producers' families alike.
 */

export const LOCALES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

export type Status = "built" | "partial" | "designed";

export interface LandingCopy {
  nav: { how: string; agents: string; offline: string; market: string; console: string; menu: string };
  skip: string;
  hero: {
    lines: [string, string, string];
    body: string;
    primary: string;
    secondary: string;
    tags: string[];
    imageAlt: string;
  };
  ticker: string[];
  problem: {
    eyebrow: string;
    title: string;
    body: string;
    stats: { value: string; label: string }[];
    source: string;
  };
  idea: {
    eyebrow: string;
    title: string;
    cards: { tag: string; title: string; body: string; foot?: string }[];
    alsoTo: string;
    channels: string[];
  };
  cycle: {
    eyebrow: string;
    title: string;
    steps: { title: string; body: string }[];
  };
  offline: {
    eyebrow: string;
    title: string;
    states: string[];
    cards: { title: string; body: string }[];
  };
  agents: {
    eyebrow: string;
    title: string;
    list: { name: string; body: string; status: Status }[];
    guardrailsTitle: string;
    guardrails: string[];
    foot: string;
  };
  market: {
    eyebrow: string;
    title: string;
    rows: { title: string; body: string }[];
    imageAlt: string;
  };
  roadmap: {
    eyebrow: string;
    title: string;
    phases: { when: string; title: string; body: string }[];
  };
  cta: { title: string; body: string; primary: string; secondary: string };
  status: Record<Status, string>;
  footer: { note: string; code: string };
}

const en: LandingCopy = {
  nav: {
    how: "How it works",
    agents: "Agents",
    offline: "Offline",
    market: "Marketplace",
    console: "Open console",
    menu: "Menu",
  },
  skip: "Skip to content",
  hero: {
    lines: ["Her craft.", "Her voice.", "Her price."],
    body: "A voice-first agent system that turns a 30-second voice note into a verified, fairly priced listing on every channel. It never commits without the maker’s yes.",
    primary: "Get the Android app",
    secondary: "See the programme console",
    tags: ["Voice first", "Offline first", "Agents that ask"],
    imageAlt: "Illustration of a village haat: a potter at his wheel, a weaver at her loom, spices and clay pots.",
  },
  ticker: ["Voice first", "Offline first", "Agents that ask", "आवाज़ से बिक्री", "हाट से सेतु"],
  problem: {
    eyebrow: "The problem",
    title: "A village artisan earns about ₹270 a day. The buyer pays up to ten times the source price.",
    body: "She is a weaver, potter or bag-maker. She sells to a trader who sets the price, because she has no way to photograph, price or list her work for a buyer herself.",
    stats: [
      { value: "64.66 lakh", label: "registered artisans in India" },
      { value: "₹270", label: "value added per craft worker per day" },
      { value: "≈ 1 : 10", label: "source-to-retail price in one Dilli Haat case study" },
    ],
    source: "Sources are listed in docs/problem-statement.md.",
  },
  idea: {
    eyebrow: "The idea",
    title: "One voice note in. One approved listing out.",
    cards: [
      {
        tag: "Artisan app",
        title: "She speaks. She taps yes or no.",
        body: "Local language, icons and voice. Works offline. No typing, no English, no laptop.",
      },
      {
        tag: "Agent backbone",
        title: "A supervisor routes six specialists.",
        body: "Photo · Listing · Price · Passport · Channel · Negotiation",
        foot: "Approval gate: nothing goes live and nothing is agreed without her yes.",
      },
      {
        tag: "Storefront",
        title: "Buyers meet the maker.",
        body: "A story-first storefront on phone and laptop, with a price breakdown and an origin passport.",
      },
    ],
    alsoTo: "Also published to",
    channels: ["WhatsApp Business catalogue", "Instagram & Facebook Shops", "ONDC"],
  },
  cycle: {
    eyebrow: "The artisan cycle",
    title: "From voice note to live listing in six taps",
    steps: [
      { title: "Speak", body: "A 30-second voice note, in her language." },
      { title: "Understand", body: "The agent drafts a bilingual listing." },
      { title: "Check", body: "Before and after photo. Product unchanged." },
      { title: "Price", body: "A fair-price floor. She sets the final." },
      { title: "Publish", body: "Pick channels. One tap." },
      { title: "Prove", body: "A signed Origin Passport with a QR code." },
    ],
  },
  offline: {
    eyebrow: "Offline first",
    title: "Built for a village signal: save first, sync when it exists",
    states: ["Saved", "Waiting for signal", "Sent", "Being prepared", "Needs approval", "Live"],
    cards: [
      {
        title: "On the phone",
        body: "Photos shrink to a few hundred KB. Voice goes as small audio. Uploads resume after a dropped signal and never create a duplicate listing.",
      },
      {
        title: "What she sees",
        body: "One icon and one spoken word per state. The approval card is cached, so it opens offline and reads the story aloud.",
      },
      {
        title: "When it is ready",
        body: "A WhatsApp or push notice says an approval is waiting. Her yes or change is queued like everything else.",
      },
    ],
  },
  agents: {
    eyebrow: "The agent system",
    title: "A supervisor, six specialists, one approval gate",
    list: [
      { name: "Photo agent", body: "Studio-cleans the photo. Never alters the product.", status: "built" },
      { name: "Listing agent", body: "Voice note to a bilingual listing.", status: "built" },
      { name: "Price agent", body: "Wage floor first, then a market band with confidence.", status: "partial" },
      { name: "Passport agent", body: "Signs an Ed25519 origin passport with a QR code.", status: "built" },
      { name: "Channel agent", body: "Posts to WhatsApp, Instagram, Facebook Shops and ONDC.", status: "designed" },
      { name: "Negotiation agent", body: "Drafts counter-offers for bulk orders, with evidence.", status: "designed" },
    ],
    guardrailsTitle: "Guardrails",
    guardrails: [
      "Listings describe the product exactly.",
      "Price never drops below her wage floor.",
      "Every commitment returns to her for approval.",
      "She can say change or no, by voice, at any step.",
    ],
    foot: "The supervisor decides who runs next, retries failures, and always stops at the gate before anything goes public.",
  },
  market: {
    eyebrow: "HaatSetu marketplace",
    title: "Buyers don’t just buy a bag. They meet the maker.",
    rows: [
      { title: "Her story, in her voice", body: "Play her 30-second voice note beside the product, with her name and village." },
      { title: "A passport you can scan", body: "A signed Origin Passport proves who made it and where, in one scan." },
      { title: "Where your money goes", body: "Materials, her hours, overhead, platform fee and her margin, line by line." },
    ],
    imageAlt: "A customer wearing an olive leather backpack made by a HaatSetu artisan.",
  },
  roadmap: {
    eyebrow: "Roadmap",
    title: "From working prototype to first village",
    phases: [
      { when: "Now", title: "Prototype", body: "Voice to listing, wage-floor price, before/after photo, signed passport." },
      { when: "0–3 months", title: "Field test", body: "Offline queue, tested with a real cooperative." },
      { when: "3–6 months", title: "Sell", body: "Negotiation agent and storefront pilot." },
      { when: "6–12 months", title: "Scale", body: "Channel publishing, trained price model, first Sathi cluster." },
    ],
  },
  cta: {
    title: "Her craft. Her voice. Her price.",
    body: "Try the artisan app in demo mode — it runs on sample data and works without internet.",
    primary: "Download the APK",
    secondary: "View the source",
  },
  status: { built: "In prototype", partial: "Partly built", designed: "Designed" },
  footer: {
    note: "Prototype. Figures in the programme console are sample data.",
    code: "Source code",
  },
};

const hi: LandingCopy = {
  nav: {
    how: "कैसे काम करता है",
    agents: "एजेंट",
    offline: "ऑफ़लाइन",
    market: "बाज़ार",
    console: "कंसोल खोलें",
    menu: "मेनू",
  },
  skip: "सीधे सामग्री पर जाएँ",
  hero: {
    lines: ["उसका हुनर।", "उसकी आवाज़।", "उसका दाम।"],
    body: "आवाज़ से चलने वाला एजेंट सिस्टम, जो 30 सेकंड के वॉइस नोट को हर चैनल पर एक जाँची-परखी, सही दाम वाली लिस्टिंग में बदल देता है। कारीगर की ‘हाँ’ के बिना कुछ भी तय नहीं होता।",
    primary: "Android ऐप डाउनलोड करें",
    secondary: "प्रोग्राम कंसोल देखें",
    tags: ["आवाज़ पहले", "ऑफ़लाइन पहले", "एजेंट जो पूछते हैं"],
    imageAlt: "गाँव के हाट का चित्र: चाक पर कुम्हार, करघे पर बुनकर, मसाले और मिट्टी के बर्तन।",
  },
  ticker: ["आवाज़ से बिक्री", "हाट से सेतु", "Voice first", "Offline first", "Agents that ask"],
  problem: {
    eyebrow: "समस्या",
    title: "गाँव की कारीगर दिन में लगभग ₹270 कमाती है। ख़रीदार उससे दस गुना तक दाम चुकाता है।",
    body: "वह बुनकर, कुम्हार या थैले बनाने वाली है। वह व्यापारी को बेचती है जो दाम तय करता है, क्योंकि उसके पास अपने काम की फ़ोटो, दाम या लिस्टिंग ख़ुद बनाने का कोई तरीका नहीं है।",
    stats: [
      { value: "64.66 लाख", label: "भारत में पंजीकृत कारीगर" },
      { value: "₹270", label: "प्रति कारीगर प्रति दिन जोड़ा गया मूल्य" },
      { value: "≈ 1 : 10", label: "दिल्ली हाट के एक अध्ययन में स्रोत और खुदरा दाम का अनुपात" },
    ],
    source: "स्रोत docs/problem-statement.md में दिए गए हैं।",
  },
  idea: {
    eyebrow: "विचार",
    title: "एक वॉइस नोट अंदर। एक मंज़ूर लिस्टिंग बाहर।",
    cards: [
      {
        tag: "कारीगर ऐप",
        title: "वह बोलती है। हाँ या ना दबाती है।",
        body: "अपनी भाषा, चित्र और आवाज़। बिना इंटरनेट चलता है। न टाइपिंग, न अंग्रेज़ी, न लैपटॉप।",
      },
      {
        tag: "एजेंट ढाँचा",
        title: "एक सुपरवाइज़र छह विशेषज्ञ चलाता है।",
        body: "फ़ोटो · लिस्टिंग · दाम · पासपोर्ट · चैनल · मोलभाव",
        foot: "मंज़ूरी का दरवाज़ा: उसकी ‘हाँ’ के बिना न कुछ लाइव होता है, न कुछ तय होता है।",
      },
      {
        tag: "दुकान",
        title: "ख़रीदार बनाने वाले से मिलते हैं।",
        body: "फ़ोन और लैपटॉप पर कहानी वाली दुकान, दाम का पूरा हिसाब और मूल पासपोर्ट के साथ।",
      },
    ],
    alsoTo: "यहाँ भी प्रकाशित",
    channels: ["WhatsApp Business कैटलॉग", "Instagram और Facebook Shops", "ONDC"],
  },
  cycle: {
    eyebrow: "कारीगर का सफ़र",
    title: "वॉइस नोट से लाइव लिस्टिंग तक, छह टैप में",
    steps: [
      { title: "बोलें", body: "अपनी भाषा में 30 सेकंड का वॉइस नोट।" },
      { title: "समझें", body: "एजेंट दो भाषाओं में लिस्टिंग बनाता है।" },
      { title: "जाँचें", body: "पहले और बाद की फ़ोटो। सामान वैसा ही।" },
      { title: "दाम", body: "सही दाम की न्यूनतम सीमा। अंतिम दाम वह तय करती है।" },
      { title: "प्रकाशित करें", body: "चैनल चुनें। एक टैप।" },
      { title: "साबित करें", body: "QR कोड के साथ हस्ताक्षरित मूल पासपोर्ट।" },
    ],
  },
  offline: {
    eyebrow: "ऑफ़लाइन पहले",
    title: "गाँव के सिग्नल के लिए बना: पहले सेव, सिग्नल मिलते ही भेजें",
    states: ["सेव हुआ", "सिग्नल का इंतज़ार", "भेजा गया", "तैयार हो रहा है", "मंज़ूरी चाहिए", "लाइव"],
    cards: [
      {
        title: "फ़ोन पर",
        body: "फ़ोटो कुछ सौ KB की हो जाती है। आवाज़ छोटी फ़ाइल में जाती है। सिग्नल टूटने पर अपलोड वहीं से शुरू होता है और लिस्टिंग दोहराई नहीं जाती।",
      },
      {
        title: "उसे क्या दिखता है",
        body: "हर हालत के लिए एक चित्र और एक बोला गया शब्द। मंज़ूरी कार्ड बिना इंटरनेट खुलता है और कहानी पढ़कर सुनाता है।",
      },
      {
        title: "जब तैयार हो",
        body: "WhatsApp या सूचना बताती है कि मंज़ूरी बाक़ी है। उसकी ‘हाँ’ या बदलाव भी कतार में जुड़ जाता है।",
      },
    ],
  },
  agents: {
    eyebrow: "एजेंट सिस्टम",
    title: "एक सुपरवाइज़र, छह विशेषज्ञ, एक मंज़ूरी का दरवाज़ा",
    list: [
      { name: "फ़ोटो एजेंट", body: "फ़ोटो को स्टूडियो जैसा साफ़ करता है। सामान नहीं बदलता।", status: "built" },
      { name: "लिस्टिंग एजेंट", body: "वॉइस नोट से दो भाषाओं में लिस्टिंग।", status: "built" },
      { name: "दाम एजेंट", body: "पहले मज़दूरी की न्यूनतम सीमा, फिर बाज़ार का दायरा।", status: "partial" },
      { name: "पासपोर्ट एजेंट", body: "QR कोड के साथ Ed25519 से हस्ताक्षरित मूल पासपोर्ट।", status: "built" },
      { name: "चैनल एजेंट", body: "WhatsApp, Instagram, Facebook Shops और ONDC पर पोस्ट करता है।", status: "designed" },
      { name: "मोलभाव एजेंट", body: "थोक ऑर्डर के लिए सबूत के साथ जवाबी प्रस्ताव बनाता है।", status: "designed" },
    ],
    guardrailsTitle: "सुरक्षा नियम",
    guardrails: [
      "लिस्टिंग सामान का सही-सही वर्णन करती है।",
      "दाम कभी उसकी मज़दूरी की सीमा से नीचे नहीं जाता।",
      "हर वादा मंज़ूरी के लिए उसके पास लौटता है।",
      "वह किसी भी कदम पर आवाज़ से ‘बदलो’ या ‘ना’ कह सकती है।",
    ],
    foot: "सुपरवाइज़र तय करता है कि आगे कौन चलेगा, ग़लती पर दोबारा कोशिश करता है, और कुछ भी सार्वजनिक होने से पहले हमेशा दरवाज़े पर रुकता है।",
  },
  market: {
    eyebrow: "HaatSetu बाज़ार",
    title: "ख़रीदार सिर्फ़ थैला नहीं ख़रीदते। वे बनाने वाले से मिलते हैं।",
    rows: [
      { title: "उसकी कहानी, उसकी आवाज़ में", body: "सामान के पास उसका 30 सेकंड का वॉइस नोट, उसके नाम और गाँव के साथ।" },
      { title: "स्कैन करने वाला पासपोर्ट", body: "हस्ताक्षरित मूल पासपोर्ट एक स्कैन में बताता है किसने और कहाँ बनाया।" },
      { title: "आपका पैसा कहाँ जाता है", body: "सामग्री, उसके घंटे, ख़र्च, प्लेटफ़ॉर्म शुल्क और उसका मुनाफ़ा, एक-एक लाइन में।" },
    ],
    imageAlt: "HaatSetu कारीगर का बनाया जैतूनी चमड़े का बैग पहने एक ग्राहक।",
  },
  roadmap: {
    eyebrow: "आगे की योजना",
    title: "चालू प्रोटोटाइप से पहले गाँव तक",
    phases: [
      { when: "अभी", title: "प्रोटोटाइप", body: "आवाज़ से लिस्टिंग, मज़दूरी-आधारित दाम, पहले/बाद की फ़ोटो, हस्ताक्षरित पासपोर्ट।" },
      { when: "0–3 महीने", title: "फ़ील्ड टेस्ट", body: "ऑफ़लाइन कतार, एक असली सहकारी समिति के साथ जाँच।" },
      { when: "3–6 महीने", title: "बिक्री", body: "मोलभाव एजेंट और दुकान का पायलट।" },
      { when: "6–12 महीने", title: "विस्तार", body: "चैनल पर प्रकाशन, प्रशिक्षित दाम मॉडल, पहला साथी क्लस्टर।" },
    ],
  },
  cta: {
    title: "उसका हुनर। उसकी आवाज़। उसका दाम।",
    body: "कारीगर ऐप को डेमो मोड में आज़माएँ — यह नमूना डेटा पर चलता है और बिना इंटरनेट काम करता है।",
    primary: "APK डाउनलोड करें",
    secondary: "सोर्स कोड देखें",
  },
  status: { built: "प्रोटोटाइप में", partial: "आंशिक रूप से बना", designed: "डिज़ाइन किया गया" },
  footer: {
    note: "प्रोटोटाइप। प्रोग्राम कंसोल के आँकड़े नमूना डेटा हैं।",
    code: "सोर्स कोड",
  },
};

export const COPY: Record<Locale, LandingCopy> = { en, hi };

export function resolveLocale(value: string | string[] | undefined): Locale {
  const v = Array.isArray(value) ? value[0] : value;
  return LOCALES.some((l) => l.code === v) ? (v as Locale) : "en";
}
