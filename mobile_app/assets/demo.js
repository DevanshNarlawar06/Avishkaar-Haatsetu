// Sample data for demo mode. Everything here is illustrative, not real sales.
window.DEMO = (function () {
  const artisan = {
    name: "Kamla Devi",
    nameHi: "कमला देवी",
    place: "Mithila Mahila SHG · Madhubani, Bihar",
    placeHi: "मिथिला महिला स्वयं सहायता समूह · मधुबनी, बिहार",
    state: "BR",
    id: "ART-BR-0427",
  };

  // What the model returns for three sample voice notes (same shape as the API's GeneratedListing).
  const listings = [
    {
      kind: "painting",
      transcript: "यह मधुबनी पेंटिंग है, हाथ से बने काग़ज़ पर। इसमें दो मछलियाँ और कमल हैं, प्राकृतिक रंगों से बनाई है। बनाने में चार दिन लगे, रोज़ करीब छह घंटे।",
      detected_language: "hi",
      title_en: "Madhubani Fish Pair Painting on Handmade Paper",
      title_hi: "हस्तनिर्मित काग़ज़ पर मधुबनी मछली जोड़ी पेंटिंग",
      description_en: "A hand-painted Madhubani artwork showing a pair of fish among lotus flowers, a traditional symbol of good fortune and harmony. Painted with natural colours on handmade paper by an artisan from Madhubani, Bihar. Each line is drawn freehand, so every piece is one of a kind.",
      description_hi: "कमल के फूलों के बीच मछलियों की जोड़ी वाली हाथ से बनी मधुबनी पेंटिंग, जो सौभाग्य और सामंजस्य का पारंपरिक प्रतीक है। मधुबनी, बिहार की कारीगर ने हस्तनिर्मित काग़ज़ पर प्राकृतिक रंगों से बनाई है। हर रेखा हाथ से खींची गई है, इसलिए हर पेंटिंग अनोखी है।",
      tags: ["madhubani", "mithila art", "fish motif", "natural colours", "wall art", "gi tagged"],
      materials: ["handmade paper", "natural colours"],
      technique: "Madhubani (Mithila) painting",
      category: "painting",
      estimated_hours: 24,
      material_cost: 350,
    },
    {
      kind: "pottery",
      transcript: "This is a blue pottery vase from Jaipur. Quartz powder, no clay. Hand painted flowers in cobalt blue. It took about three days including firing.",
      detected_language: "en",
      title_en: "Jaipur Blue Pottery Floral Vase, Hand Painted",
      title_hi: "जयपुर ब्लू पॉटरी फूलदान, हाथ से पेंट किया",
      description_en: "A Jaipur blue pottery vase made from quartz-based dough rather than clay, hand-painted with cobalt blue floral motifs and glazed for a glassy finish. Shaped, painted and fired by hand over three days.",
      description_hi: "मिट्टी के बजाय क्वार्ट्ज़ से बना जयपुर ब्लू पॉटरी फूलदान, जिस पर कोबाल्ट नीले रंग से फूलों की डिज़ाइन हाथ से बनाई गई है और चमकदार ग्लेज़ किया गया है। तीन दिनों में हाथ से आकार, रंग और पकाई की गई।",
      tags: ["blue pottery", "jaipur", "vase", "hand painted", "home decor"],
      materials: ["quartz powder", "cobalt oxide", "glaze"],
      technique: "Jaipur blue pottery",
      category: "pottery",
      estimated_hours: 18,
      material_cost: 420,
    },
    {
      kind: "basket",
      transcript: "এটা বাঁশের ঝুড়ি, হাতে বোনা। Bamboo and cane, natural colour. Two days to make.",
      detected_language: "bn",
      title_en: "Handwoven Assam Bamboo and Cane Basket",
      title_hi: "हाथ से बुनी असम की बाँस और बेंत की टोकरी",
      description_en: "A sturdy basket handwoven from bamboo and cane in Assam's traditional style, left in its natural colour. Strong enough for daily use and light enough to carry. Woven by hand over two days.",
      description_hi: "असम की पारंपरिक शैली में बाँस और बेंत से हाथ से बुनी मज़बूत टोकरी, प्राकृतिक रंग में। रोज़ के इस्तेमाल के लिए मज़बूत और उठाने में हल्की। दो दिनों में हाथ से बुनी गई।",
      tags: ["bamboo", "cane", "assam", "basket", "eco friendly"],
      materials: ["bamboo", "cane"],
      technique: "Bamboo and cane weaving",
      category: "bamboo_cane",
      estimated_hours: 12,
      material_cost: 120,
    },
    {
      kind: "jar",
      transcript: "हमारे समूह ने कच्चे आम का अचार बनाया है, सरसों के तेल में, घर के मसालों से। कोई केमिकल नहीं। 500 ग्राम का जार है। पूरे बैच में दो दिन लगे, एक जार पर करीब दो घंटे।",
      detected_language: "hi",
      title_en: "Homemade Raw Mango Pickle in Mustard Oil, 500 g",
      title_hi: "सरसों के तेल में घर का बना कच्चे आम का अचार, 500 ग्राम",
      description_en: "Raw mango pickle made in small batches by a women's self-help group in Madhubani, using cold-pressed mustard oil and spices ground at home. No preservatives or added colour. Packed in a 500 g glass jar.",
      description_hi: "मधुबनी की महिला स्वयं सहायता समूह द्वारा छोटे बैच में बनाया गया कच्चे आम का अचार, कच्ची घानी सरसों के तेल और घर में पिसे मसालों के साथ। कोई प्रिज़र्वेटिव या रंग नहीं। 500 ग्राम काँच के जार में।",
      tags: ["mango pickle", "aam ka achar", "homemade", "mustard oil", "shg product", "no preservatives"],
      materials: ["raw mango", "mustard oil", "spices"],
      technique: "Sun-cured pickling (SHG batch)",
      category: "food_products",
      estimated_hours: 2,
      material_cost: 110,
    },
  ];

  // ---- sample "phone photos": a product on a cluttered table in dim light ----
  function table(ctx, w, h) {
    const wall = ctx.createLinearGradient(0, 0, 0, h * .45);
    wall.addColorStop(0, "#6f6a5e"); wall.addColorStop(1, "#8a826f");
    ctx.fillStyle = wall; ctx.fillRect(0, 0, w, h * .45);
    const wood = ctx.createLinearGradient(0, h * .45, 0, h);
    wood.addColorStop(0, "#7a5536"); wood.addColorStop(1, "#4d321d");
    ctx.fillStyle = wood; ctx.fillRect(0, h * .45, w, h * .55);
    ctx.strokeStyle = "rgba(30,15,5,.25)"; ctx.lineWidth = 2;
    for (let y = h * .47; y < h; y += 18) { ctx.beginPath(); ctx.moveTo(0, y); ctx.bezierCurveTo(w * .3, y + 6, w * .6, y - 6, w, y + 3); ctx.stroke(); }
    // clutter: a steel tumbler, a cloth and a plastic box
    ctx.fillStyle = "#9aa1a6"; ctx.fillRect(w * .05, h * .38, w * .1, h * .18);
    ctx.fillStyle = "#b7bdc1"; ctx.fillRect(w * .05, h * .38, w * .1, h * .02);
    ctx.fillStyle = "#a33b3b"; ctx.beginPath(); ctx.ellipse(w * .86, h * .78, w * .16, h * .07, -.3, 0, 7); ctx.fill();
    ctx.fillStyle = "rgba(60,140,190,.75)"; ctx.fillRect(w * .78, h * .36, w * .18, h * .14);
  }

  function painting(ctx, w, h) {
    const x = w * .2, y = h * .14, pw = w * .6, ph = h * .7;
    ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.fillRect(x + 8, y + 10, pw, ph);
    ctx.fillStyle = "#efe0bf"; ctx.fillRect(x, y, pw, ph);
    ctx.strokeStyle = "#b5322b"; ctx.lineWidth = 10; ctx.strokeRect(x + 12, y + 12, pw - 24, ph - 24);
    ctx.strokeStyle = "#1d1d1d"; ctx.lineWidth = 3; ctx.strokeRect(x + 24, y + 24, pw - 48, ph - 48);
    for (let i = 0; i < 14; i++) { ctx.fillStyle = i % 2 ? "#e0a21b" : "#2f6b3a"; ctx.beginPath(); ctx.arc(x + 30 + i * (pw - 60) / 13, y + 18, 4, 0, 7); ctx.fill(); }
    const fish = (cx, cy, s, flip, col) => {
      ctx.save(); ctx.translate(cx, cy); ctx.scale(flip ? -s : s, s);
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.quadraticCurveTo(0, -38, 50, 0); ctx.quadraticCurveTo(0, 38, -60, 0); ctx.fill();
      ctx.beginPath(); ctx.moveTo(48, 0); ctx.lineTo(78, -22); ctx.lineTo(78, 22); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#1d1d1d"; ctx.lineWidth = 2;
      for (let k = -30; k < 40; k += 12) { ctx.beginPath(); ctx.arc(k, 0, 9, -1.2, 1.2); ctx.stroke(); }
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(-40, -6, 7, 0, 7); ctx.fill();
      ctx.fillStyle = "#111"; ctx.beginPath(); ctx.arc(-40, -6, 3, 0, 7); ctx.fill();
      ctx.restore();
    };
    fish(w * .5, y + ph * .36, 1.1, false, "#d9462f");
    fish(w * .5, y + ph * .64, 1.1, true, "#2f5fa8");
    for (const [fx, fy] of [[.3, .2], [.7, .2], [.3, .8], [.7, .8], [.5, .5]]) {
      ctx.save(); ctx.translate(x + pw * fx, y + ph * fy);
      for (let p = 0; p < 8; p++) { ctx.rotate(Math.PI / 4); ctx.fillStyle = p % 2 ? "#e48aa8" : "#e0a21b"; ctx.beginPath(); ctx.ellipse(0, 12, 6, 13, 0, 0, 7); ctx.fill(); }
      ctx.fillStyle = "#2f6b3a"; ctx.beginPath(); ctx.arc(0, 0, 6, 0, 7); ctx.fill(); ctx.restore();
    }
  }

  function pottery(ctx, w, h) {
    const cx = w * .5, base = h * .82;
    ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.beginPath(); ctx.ellipse(cx + 10, base + 6, w * .2, h * .03, 0, 0, 7); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx - w * .08, h * .18); ctx.lineTo(cx + w * .08, h * .18);
    ctx.bezierCurveTo(cx + w * .07, h * .32, cx + w * .26, h * .42, cx + w * .22, h * .62);
    ctx.bezierCurveTo(cx + w * .2, h * .74, cx + w * .12, base, cx + w * .1, base);
    ctx.lineTo(cx - w * .1, base);
    ctx.bezierCurveTo(cx - w * .12, base, cx - w * .2, h * .74, cx - w * .22, h * .62);
    ctx.bezierCurveTo(cx - w * .26, h * .42, cx - w * .07, h * .32, cx - w * .08, h * .18);
    const g = ctx.createLinearGradient(cx - w * .25, 0, cx + w * .25, 0);
    g.addColorStop(0, "#1b3f8f"); g.addColorStop(.45, "#5f8fe0"); g.addColorStop(1, "#163170");
    ctx.fillStyle = g; ctx.fill();
    ctx.save(); ctx.clip();
    ctx.fillStyle = "#f3f6fb"; ctx.fillRect(0, h * .45, w, h * .14);
    for (let i = 0; i < 7; i++) {
      ctx.save(); ctx.translate(cx - w * .24 + i * w * .08, h * .52);
      for (let p = 0; p < 6; p++) { ctx.rotate(Math.PI / 3); ctx.fillStyle = "#1f4fae"; ctx.beginPath(); ctx.ellipse(0, 8, 4, 9, 0, 0, 7); ctx.fill(); }
      ctx.restore();
    }
    ctx.strokeStyle = "#9fd0e8"; ctx.lineWidth = 3;
    for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(cx - w * .15 + i * w * .06, h * .7, 10, 0, Math.PI); ctx.stroke(); }
    ctx.fillStyle = "rgba(255,255,255,.25)"; ctx.fillRect(cx - w * .14, h * .2, w * .03, h * .6);
    ctx.restore();
    ctx.fillStyle = "#24479b"; ctx.beginPath(); ctx.ellipse(cx, h * .18, w * .09, h * .02, 0, 0, 7); ctx.fill();
  }

  function basket(ctx, w, h) {
    const cx = w * .5, top = h * .4, base = h * .82;
    ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.beginPath(); ctx.ellipse(cx + 10, base + 6, w * .3, h * .035, 0, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx - w * .34, top); ctx.lineTo(cx + w * .34, top); ctx.lineTo(cx + w * .25, base); ctx.lineTo(cx - w * .25, base); ctx.closePath();
    ctx.fillStyle = "#c9a15e"; ctx.fill();
    ctx.save(); ctx.clip();
    for (let y = top; y < base; y += 14) { ctx.fillStyle = (y / 14) % 2 < 1 ? "#b88d48" : "#d8b46f"; ctx.fillRect(0, y, w, 7); }
    ctx.strokeStyle = "#8a6430"; ctx.lineWidth = 3;
    for (let x = cx - w * .4; x < cx + w * .4; x += 16) { ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(cx + (x - cx) * .74, base); ctx.stroke(); }
    ctx.restore();
    ctx.strokeStyle = "#7a5526"; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(cx, top, w * .34, h * .035, 0, 0, 7); ctx.stroke();
    ctx.lineWidth = 9; ctx.beginPath(); ctx.ellipse(cx, top, w * .22, h * .22, 0, Math.PI, 0); ctx.stroke();
  }

  function jar(ctx, w, h) {
    const cx = w * .5, top = h * .3, base = h * .82, jw = w * .3;
    ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.beginPath(); ctx.ellipse(cx + 10, base + 6, jw * .9, h * .03, 0, 0, 7); ctx.fill();
    ctx.fillStyle = "rgba(220,235,240,.55)"; ctx.fillRect(cx - jw / 2, top, jw, base - top);
    ctx.fillStyle = "#c8641b"; ctx.fillRect(cx - jw / 2 + 8, top + (base - top) * .18, jw - 16, (base - top) * .8);
    ctx.fillStyle = "#e9a43a";
    for (let i = 0; i < 26; i++) { const x = cx - jw / 2 + 16 + (i * 37) % (jw - 32), y = top + (base - top) * .25 + ((i * 53) % ((base - top) * .68)); ctx.beginPath(); ctx.ellipse(x, y, 14, 9, i, 0, 7); ctx.fill(); }
    ctx.fillStyle = "rgba(255,255,255,.35)"; ctx.fillRect(cx - jw / 2 + 12, top + 10, 12, base - top - 20);
    ctx.fillStyle = "#b5322b"; ctx.beginPath(); ctx.moveTo(cx - jw / 2 - 18, top + 10); ctx.lineTo(cx + jw / 2 + 18, top + 10); ctx.lineTo(cx + jw / 2 + 6, top - 40); ctx.lineTo(cx - jw / 2 - 6, top - 40); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#e0a21b"; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx - jw / 2 - 10, top); ctx.lineTo(cx + jw / 2 + 10, top); ctx.stroke();
    ctx.fillStyle = "#f6edd8"; ctx.fillRect(cx - jw * .32, top + (base - top) * .42, jw * .64, (base - top) * .22);
    ctx.fillStyle = "#1D4B39"; ctx.font = "bold 30px sans-serif"; ctx.textAlign = "center"; ctx.fillText("आम अचार", cx, top + (base - top) * .55);
  }

  const painters = { painting, pottery, basket, jar };

  /** A dim, slightly blue, off-centre phone photo of the product, as a JPEG data URL. */
  function samplePhoto(kind) {
    const c = document.createElement("canvas"); c.width = 900; c.height = 1200;
    const ctx = c.getContext("2d");
    table(ctx, c.width, c.height);
    ctx.save(); ctx.translate(c.width * .2 + 40, c.height * .2); ctx.scale(.6, .6); (painters[kind] || painting)(ctx, c.width, c.height); ctx.restore();
    ctx.fillStyle = "rgba(20,30,60,.28)"; ctx.fillRect(0, 0, c.width, c.height);      // dim, cold light
    const v = ctx.createRadialGradient(c.width / 2, c.height / 2, 200, c.width / 2, c.height / 2, 800);
    v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(0,0,0,.45)");
    ctx.fillStyle = v; ctx.fillRect(0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", .85);
  }

  /** A clean catalogue image of the product (used for the seeded products' thumbnails). */
  function cleanPhoto(kind) {
    const c = document.createElement("canvas"); c.width = 600; c.height = 600;
    const ctx = c.getContext("2d");
    const bg = ctx.createRadialGradient(300, 260, 40, 300, 300, 420);
    bg.addColorStop(0, "#fffaf0"); bg.addColorStop(1, "#efe7d6");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 600, 600);
    ctx.save(); ctx.translate(0, 10); ctx.scale(600 / 900, 600 / 1000); ctx.translate(0, -60);
    (painters[kind] || painting)(ctx, 900, 1100); ctx.restore();
    return c.toDataURL("image/jpeg", .85);
  }

  function seedProducts() {
    const now = Date.now();
    return [
      {
        id: "demo-1", created: now - 86400000 * 6, kind: "pottery",
        listing: listings[1], hours: 18, material_cost: 420, price: 1650, floor: 1680, channels: ["store", "ondc", "wa"],
        status: "published", sold: 2,
      },
      {
        id: "demo-2", created: now - 86400000 * 12, kind: "basket",
        listing: listings[2], hours: 12, material_cost: 120, price: 1150, floor: 941, channels: ["store", "b2b"],
        status: "published", sold: 3,
      },
      {
        id: "demo-3", created: now - 86400000 * 3, kind: "jar",
        listing: listings[3], hours: 2, material_cost: 110, price: 290, floor: 0, channels: ["store", "ondc", "wa"],
        status: "published", sold: 14,
      },
    ].map((p) => (p.floor = floorOf(p.hours, p.material_cost).floor, p.price = Math.max(p.price, p.floor), p));
  }

  // Same rule as the API (app/services/pricing/floor.py): materials + hours x wage + 12% overhead.
  const WAGE = 60, OVERHEAD = 0.12;
  function floorOf(hours, material) {
    const labour = Math.round(hours * WAGE);
    const overhead = Math.round((material + labour) * OVERHEAD);
    return { material_cost: material, labour_cost: labour, overhead, floor: material + labour + overhead, wage_per_hour: WAGE, hours };
  }

  // Demo market band per category, as multiples of the floor (the live API uses its LightGBM model).
  const BAND = { painting: [1.05, 1.45, 2.1], pottery: [0.9, 1.25, 1.75], bamboo_cane: [0.95, 1.3, 1.8], food_products: [1.2, 1.5, 1.9], forest_produce: [1.1, 1.4, 1.8], other: [1, 1.3, 1.8] };
  function priceOf(category, hours, material) {
    const f = floorOf(hours, material);
    const m = BAND[category] || BAND.other;
    const r = (x) => Math.round(f.floor * x / 10) * 10;
    let [p10, p50, p90] = m.map(r);
    const lifted = p50 < f.floor;
    p50 = Math.max(p50, f.floor);
    p90 = Math.max(p90, p50);
    return { p10, p50, p90, floor: f.floor, breakdown: f, lifted_to_floor: lifted, model_used: false };
  }

  return { artisan, listings, samplePhoto, cleanPhoto, seedProducts, floorOf, priceOf, WAGE };
})();
