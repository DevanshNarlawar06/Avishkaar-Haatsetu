// HaatSetu artisan app: welcome -> (sign in) -> home -> speak -> photo -> price -> publish -> passport.
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const N = window.HaatSetuNative;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rupee = (n) => "₹" + Math.round(n || 0).toLocaleString("en-IN");

  const ICON = {
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    stop: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
    cam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    rupee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12M6 9h12M14 20 6 13h3a4.5 4.5 0 0 0 0-9"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    tick: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',
  };

  // ---------------------------------------------------------------- state
  const KEY = "hs.state.v1";
  let S = { lang: "hi", mode: "demo", user: null, products: null };
  try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { /* first run */ }
  if (!S.products) S.products = DEMO.seedProducts();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage full: keep in memory */ } };
  const t = (k) => (I18N[S.lang] && I18N[S.lang][k]) || I18N.en[k] || k;
  const live = () => S.mode === "live";

  let draft = null;
  let history = [];
  let sampleIdx = 0;

  function toast(msg) {
    const el = $("#toast"); el.textContent = msg; el.classList.add("on");
    clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("on"), 2600);
  }

  function show(id, push = true) {
    const cur = document.querySelector(".view.on");
    if (push && cur && cur.id !== id) history.push(cur.id);
    document.querySelectorAll(".view").forEach((v) => v.classList.toggle("on", v.id === id));
    (RENDER[id] || (() => {}))();
    window.scrollTo(0, 0);
  }

  window.hsBack = function () {
    if (rec) { stopRecording(true); return true; }
    const cur = document.querySelector(".view.on");
    if (!cur || cur.id === "home" || cur.id === "welcome") return false;
    if (cur.id === "passport") { history = []; show("home", false); return true; }
    const prev = history.pop();
    if (!prev) return false;
    show(prev, false);
    return true;
  };

  const bar = (title, extra = "") =>
    `<div class="bar"><button class="icon-btn" data-back aria-label="${t("back")}">${ICON.back}</button><h1>${esc(title)}</h1>${extra}</div>`;
  const modeBadge = () => live() ? `<span class="badge live dot">${t("live")}</span>` : `<span class="badge demo dot">${t("demo")}</span>`;
  const steps = (n) =>
    `<div class="steps">${[1, 2, 3, 4].map((i) => `<div class="${i < n ? "done" : i === n ? "now" : ""}"></div>`).join("")}</div>
     <div class="step-label">${t("step")} ${n} ${S.lang === "hi" ? t("of") + " 4" : t("of") + " 4"} · ${t("s" + n)}</div>`;

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-back]")) window.hsBack();
  });

  // ---------------------------------------------------------------- views
  const RENDER = {};

  RENDER.welcome = function () {
    $("#welcome").innerHTML = `
      <div>
        <div class="row between">
          <span class="badge hero-badge">AVISHKAAR · Theme 1</span>
          <div class="lang-switch"><button data-lang="hi" class="${S.lang === "hi" ? "on" : ""}">हिंदी</button><button data-lang="en" class="${S.lang === "en" ? "on" : ""}">English</button></div>
        </div>
        <img class="welcome-mark" src="logo.svg" alt="">
        <h1 class="welcome-title">Haat<span>Setu</span></h1>
        <p class="welcome-tag">${S.lang === "hi" ? "गाँव के हाट से हर बाज़ार तक" : "From the village haat to every market"}</p>
        <p class="small" style="color:rgba(255,255,255,.7);margin:6px 0 0">${t("forWho")}</p>
        <ul class="welcome-points">
          <li><i>${ICON.mic}</i>${t("p1")}</li>
          <li><i>${ICON.cam}</i>${t("p2")}</li>
          <li><i>${ICON.rupee}</i>${t("p3")}</li>
          <li><i>${ICON.shield}</i>${t("p4")}</li>
        </ul>
      </div>
      <div class="stack" style="margin-top:28px">
        <button class="btn accent big" id="go-demo">${t("tryDemo")}</button>
        <button class="btn ghost" id="go-live">${t("signIn")}</button>
        <p class="small" style="text-align:center;color:rgba(255,255,255,.6);margin:6px 0 0">${t("demoNote")}</p>
      </div>`;
    $("#welcome").querySelectorAll("[data-lang]").forEach((b) => b.onclick = () => { S.lang = b.dataset.lang; save(); RENDER.welcome(); });
    $("#go-demo").onclick = () => { S.mode = "demo"; S.user = null; save(); history = []; show("home", false); };
    $("#go-live").onclick = () => show("login");
  };

  RENDER.login = function () {
    $("#login").innerHTML = `${bar(t("signIn"), `<button class="icon-btn" id="login-gear">${ICON.gear}</button>`)}
      <div class="pad stack">
        <div id="login-srv"></div>
        <label class="field"><span>${t("phone")}</span><input class="input" id="phone" inputmode="numeric" maxlength="10" placeholder="98XXXXXXXX"></label>
        <button class="btn primary" id="send-otp">${t("sendOtp")}</button>
        <div id="otp-box" style="display:none" class="stack">
          <label class="field"><span>${t("otp")}</span><input class="input" id="otp" inputmode="numeric" maxlength="6" placeholder="••••••"></label>
          <div class="hint">${t("otpHint")}</div>
          <button class="btn accent" id="verify-otp">${t("verify")}</button>
        </div>
        <div class="error" id="login-err"></div>
      </div>`;
    $("#login-gear").onclick = () => show("settings");
    $("#login-srv").innerHTML = Api.server()
      ? `<div class="note ok small">API: ${esc(Api.server())}</div>`
      : `<div class="note bad small">${t("noServer")}</div>`;
    const err = (m) => { $("#login-err").textContent = m || ""; };
    $("#send-otp").onclick = async () => {
      const phone = $("#phone").value.replace(/\D/g, "");
      if (phone.length !== 10) return err(t("phone") + "?");
      if (!Api.server()) return err(t("noServer"));
      err(""); $("#send-otp").disabled = true; $("#send-otp").textContent = t("testing");
      try { await Api.requestOtp(phone); $("#otp-box").style.display = ""; $("#otp").focus(); }
      catch (e) { err(t("failed") + ": " + e.message); }
      finally { $("#send-otp").disabled = false; $("#send-otp").textContent = t("sendOtp"); }
    };
    $("#verify-otp").onclick = async () => {
      const phone = $("#phone").value.replace(/\D/g, ""), code = $("#otp").value.trim();
      $("#verify-otp").disabled = true;
      try {
        const tok = await Api.verifyOtp(phone, code);
        Api.setToken(tok.access_token);
        S.mode = "live"; S.user = { id: tok.user_id, name: tok.name, phone };
        save(); history = []; show("home", false);
      } catch (e) { err(e.message); }
      finally { $("#verify-otp").disabled = false; }
    };
  };

  RENDER.home = function () {
    const a = DEMO.artisan;
    const name = live() ? (S.user && S.user.name && S.user.name !== "New artisan" ? S.user.name : (S.lang === "hi" ? "कारीगर" : "Artisan")) : (S.lang === "hi" ? a.nameHi : a.name);
    const place = live() ? (S.user ? "+91 " + S.user.phone : "") : (S.lang === "hi" ? a.placeHi : a.place);
    const mine = S.products.filter((p) => live() ? p.live : !p.live);
    const earned = mine.reduce((n, p) => n + (p.sold || 0) * p.price, 0);
    const above = mine.length ? Math.round(100 * mine.filter((p) => p.price >= p.floor).length / mine.length) : 100;
    $("#home").innerHTML = `
      <div class="hero">
        <div class="hero-top">
          <div class="brand grow"><img src="logo.svg" alt=""><b>Haat<span>Setu</span></b></div>
          ${modeBadge()}
          <button class="icon-btn" id="home-gear" aria-label="${t("settings")}">${ICON.gear}</button>
        </div>
        <div class="hello">${t("namaste")}, ${esc(name)} 🙏</div>
        <div class="sub">${esc(place)}</div>
        <div style="height:16px"></div>
      </div>
      <div class="stats">
        <div class="stat"><b>${mine.length}</b><span>${t("listed")}</span></div>
        <div class="stat"><b>${rupee(earned)}</b><span>${t("earned")}</span></div>
        <div class="stat"><b>${above}%</b><span>${t("aboveFloor")}</span></div>
      </div>
      <div class="pad stack">
        <button class="btn accent big" id="new-product">${ICON.mic} ${t("newProduct")}</button>
        <h2>${t("myProducts")}</h2>
        <div id="plist" class="stack"></div>
      </div>`;
    $("#home-gear").onclick = () => show("settings");
    $("#new-product").onclick = startDraft;
    const list = $("#plist");
    if (!mine.length) { list.innerHTML = `<div class="card empty">${t("noProducts")}</div>`; return; }
    mine.sort((x, y) => y.created - x.created).forEach((p) => {
      const el = document.createElement("div");
      el.className = "card product";
      const img = p.thumb || DEMO.cleanPhoto(p.kind);
      const title = S.lang === "hi" ? p.listing.title_hi : p.listing.title_en;
      el.innerHTML = `<img src="${img}" alt="">
        <div class="grow">
          <h3>${esc(title)}</h3>
          <div class="row between" style="margin-top:6px"><span class="price">${rupee(p.price)}</span>
          <span class="small muted">${p.sold ? p.sold + " " + t("sold") : ""}</span></div>
          <div class="chips" style="margin-top:6px">${(p.channels || []).map((c) => `<span class="chip on">${chName(c)}</span>`).join("")}</div>
        </div>`;
      el.onclick = () => { draft = productToDraft(p); show("passport"); };
      list.appendChild(el);
    });
  };

  const chName = (c) => ({ store: "HaatSetu", ondc: "ONDC", wa: "WhatsApp", b2b: "B2B" }[c] || c);

  // ---------------------------------------------------------------- step 1: speak
  let rec = null;

  function startDraft() {
    draft = {
      client_id: "c-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      listing: null, photo: null, studio: null, hours: null, material_cost: null, pricing: null,
      price: null, channels: ["store", "ondc", "wa"], productId: null, passport: null, notes: [],
    };
    show("speak");
  }

  RENDER.speak = function () {
    const d = draft;
    $("#speak").innerHTML = `${bar(t("newProduct"), modeBadge())}${steps(1)}
      <h2 class="step-title">${t("s1t")}</h2><p class="step-sub">${t("s1s")}</p>
      <div class="pad stack" id="speak-body"></div>
      <div class="foot"><button class="btn primary" id="speak-next" ${d.listing ? "" : "disabled"}>${t("next")}</button></div>`;
    $("#speak-next").onclick = () => show("photo");
    if (d.listing) return renderHeard();
    $("#speak-body").innerHTML = `
      <div class="card"><ul class="prompt-list"><li>${t("say1")}</li><li>${t("say2")}</li><li>${t("say3")}</li></ul></div>
      <div class="mic-wrap">
        <button class="mic" id="mic" aria-label="${t("tapToSpeak")}">${ICON.mic}</button>
        <div class="mic-time" id="mic-time">${t("tapToSpeak")}</div>
        <div class="levels" id="levels">${"<i></i>".repeat(16)}</div>
      </div>
      <button class="btn link" id="use-sample">${t("sample")}</button>
      <div class="error" id="speak-err"></div>`;
    $("#mic").onclick = () => rec ? stopRecording(false) : startRecording();
    $("#use-sample").onclick = () => makeListing(null);
  };

  async function startRecording() {
    const err = $("#speak-err");
    if (!Recorder.supported()) { err.textContent = "Microphone not available here. Use the sample voice note."; return; }
    try {
      const bars = [...document.querySelectorAll("#levels i")];
      let k = 0;
      await Recorder.start((lv) => { const b = bars[k++ % bars.length]; if (b) b.style.height = (6 + lv * 34) + "px"; });
      rec = { t0: Date.now() };
      $("#mic").classList.add("rec"); $("#mic").innerHTML = ICON.stop;
      rec.timer = setInterval(() => {
        const s = Math.floor((Date.now() - rec.t0) / 1000);
        $("#mic-time").textContent = `0:${String(s).padStart(2, "0")} · ${t("tapToStop")}`;
        if (s >= 90) stopRecording(false);
      }, 250);
    } catch (e) {
      rec = null;
      err.textContent = "Microphone permission was not given. You can use the sample voice note.";
    }
  }

  function stopRecording(cancel) {
    if (!rec) return;
    clearInterval(rec.timer);
    const secs = (Date.now() - rec.t0) / 1000;
    rec = null;
    const wav = Recorder.stop();
    if (cancel) return;
    if (secs < 1.5) { RENDER.speak(); return; }
    makeListing(wav);
  }

  async function makeListing(wav) {
    $("#speak-body").innerHTML = `<div class="busy"><div class="spinner"></div><p>${t("listening")}</p></div>`;
    const sample = DEMO.listings[sampleIdx++ % DEMO.listings.length];
    let listing = null;
    if (live() && wav) {
      try {
        const r = await Api.generateListing(wav, S.lang);
        listing = Object.assign({ kind: kindOf(r.listing.category) }, r.listing);
        draft.provider = r.provider;
      } catch (e) {
        draft.notes.push(t("liveFailed") + " (" + e.message + ")");
      }
    } else {
      await new Promise((ok) => setTimeout(ok, 1800));
    }
    draft.listing = listing || Object.assign({}, sample);
    draft.kind = draft.listing.kind || kindOf(draft.listing.category);
    draft.hours = draft.listing.estimated_hours || 8;
    draft.material_cost = draft.listing.material_cost || 200;
    draft.recorded = !!wav;
    RENDER.speak();
  }

  const kindOf = (cat) => ({ painting: "painting", pottery: "pottery", bamboo_cane: "basket", food_products: "jar", forest_produce: "jar", agri_produce: "jar" }[cat] || "painting");

  function renderHeard() {
    const l = draft.listing;
    $("#speak-body").innerHTML = `
      ${draft.notes.length ? `<div class="note small">${esc(draft.notes[draft.notes.length - 1])}</div>` : ""}
      <div class="card stack">
        <div class="small muted">${t("heard")}${l.detected_language ? " · " + esc(l.detected_language.toUpperCase()) : ""}</div>
        <div class="transcript">“${esc(l.transcript)}”</div>
      </div>
      <div class="card stack">
        <h3>${esc(l.title_en)}</h3>
        <div style="font-weight:600">${esc(l.title_hi)}</div>
        <div class="chips">${(l.tags || []).map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div>
        <div class="small muted">${esc(l.technique)} · ${esc((l.materials || []).join(", "))}</div>
      </div>
      <button class="btn ghost" id="again">${ICON.mic} ${t("again")}</button>`;
    $("#again").onclick = () => { draft.listing = null; draft.notes = []; RENDER.speak(); };
    $("#speak-next").disabled = false;
  }

  // ---------------------------------------------------------------- step 2: photo
  RENDER.photo = function () {
    $("#photo").innerHTML = `${bar(t("newProduct"), modeBadge())}${steps(2)}
      <h2 class="step-title">${t("s2t")}</h2><p class="step-sub">${t("s2s")}</p>
      <div class="pad stack" id="photo-body"></div>
      <div class="foot"><button class="btn primary" id="photo-next" ${draft.studio ? "" : "disabled"}>${t("next")}</button></div>`;
    $("#photo-next").onclick = () => show("price");
    if (draft.studio) return renderCompare();
    $("#photo-body").innerHTML = `
      <div class="photo-pick">${ICON.cam}<p class="muted" style="margin:8px 0 14px">${t("s2s")}</p>
        <button class="btn primary" id="pick">${t("takePhoto")}</button></div>
      <button class="btn link" id="sample-photo">${t("samplePhoto")}</button>
      <div class="error" id="photo-err"></div>`;
    $("#pick").onclick = () => { const f = $("#file"); f.value = ""; f.click(); };
    $("#sample-photo").onclick = () => runStudio(DEMO.samplePhoto(draft.kind));
  };

  $("#file").addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => runStudio(r.result);
    r.readAsDataURL(file);
  });

  async function runStudio(src) {
    $("#photo-body").innerHTML = `<div class="busy"><div class="spinner"></div><p>${t("studioWorking")}</p></div>`;
    draft.photo = await Studio.shrink(src);
    draft.before = await Studio.before(draft.photo);
    let out = null;
    if (live()) {
      try {
        await ensureProduct();
        const r = await Api.enhance(draft.before, draft.listing.title_en, draft.productId);
        out = r.enhanced_url || r.original_url;
        draft.studioMethod = r.method;
      } catch (e) {
        draft.notes.push(t("liveFailed") + " (" + e.message + ")");
      }
    } else {
      await new Promise((ok) => setTimeout(ok, 900));
    }
    draft.studio = out || await Studio.enhance(draft.photo);
    draft.studioMethod = draft.studioMethod || "on-device";
    RENDER.photo();
  }

  function renderCompare() {
    $("#photo-body").innerHTML = `
      ${draft.notes.length && live() ? `<div class="note small">${esc(draft.notes[draft.notes.length - 1])}</div>` : ""}
      <div class="compare" id="cmp">
        <img src="${draft.before || draft.photo}" alt="">
        <img class="after" id="after" src="${esc(draft.studio)}" alt="">
        <div class="handle" id="handle"></div>
        <span class="tag l">${t("before")}</span><span class="tag r">${t("after")}</span>
        <input type="range" min="0" max="100" value="50" id="cmp-range" aria-label="${t("dragCompare")}">
      </div>
      <div class="row between small muted"><span>${t("dragCompare")}</span><span>${esc({ generative: "AI studio", cutout: "Background removed", auto: "Auto-enhance", "on-device": "On-device enhance" }[draft.studioMethod] || draft.studioMethod)}</span></div>
      <button class="btn ghost" id="retake">${ICON.cam} ${t("retake")}</button>`;
    $("#cmp-range").oninput = (e) => {
      const v = e.target.value;
      $("#after").style.clipPath = `inset(0 0 0 ${v}%)`;
      $("#handle").style.left = v + "%";
    };
    $("#retake").onclick = () => { draft.studio = null; draft.photo = null; RENDER.photo(); };
  }

  // Live mode: the product row exists before its photo, so the enhanced image is attached to it.
  async function ensureProduct() {
    if (draft.productId) return draft.productId;
    const l = draft.listing;
    const p = await Api.saveProduct({
      client_id: draft.client_id, title_en: l.title_en, title_hi: l.title_hi,
      description_en: l.description_en, description_hi: l.description_hi,
      category: l.category, material: (l.materials || [])[0] || null, technique: l.technique || null,
      hours_of_work: draft.hours, material_cost: draft.material_cost,
    });
    draft.productId = p.id;
    return p.id;
  }

  // ---------------------------------------------------------------- step 3: price
  RENDER.price = function () {
    $("#price").innerHTML = `${bar(t("newProduct"), modeBadge())}${steps(3)}
      <h2 class="step-title">${t("s3t")}</h2><p class="step-sub">${t("s3s")}</p>
      <div class="pad stack">
        <div class="card stack">
          <label class="field"><span>${t("hours")}</span>
            <div class="num-row"><button data-d="-1">−</button><input class="input" id="hours" inputmode="decimal" value="${draft.hours}"><button data-d="1">+</button></div></label>
          <label class="field"><span>${t("materials")}</span><input class="input" id="mat" inputmode="numeric" value="${draft.material_cost}"></label>
        </div>
        <div class="card" id="floor-card"></div>
        <div class="card stack" id="band-card"></div>
      </div>
      <div class="foot"><button class="btn primary" id="price-next">${t("next")}</button></div>`;
    document.querySelectorAll("#price .num-row button").forEach((b) => b.onclick = () => {
      const h = $("#hours"); h.value = Math.max(0, (parseFloat(h.value) || 0) + Number(b.dataset.d)); recompute();
    });
    $("#hours").oninput = recompute;
    $("#mat").oninput = recompute;
    $("#price-next").onclick = () => { if (draft.price >= draft.pricing.floor) show("review"); };
    recompute(true);
  };

  let priceTimer;
  function recompute(first) {
    draft.hours = Math.max(0, parseFloat($("#hours").value) || 0);
    draft.material_cost = Math.max(0, parseInt($("#mat").value, 10) || 0);
    const local = DEMO.priceOf(draft.listing.category, draft.hours, draft.material_cost);
    applyPricing(local, first);
    if (live()) {
      clearTimeout(priceTimer);
      priceTimer = setTimeout(async () => {
        const l = draft.listing;
        try {
          const r = await Api.suggestPrice({
            category: l.category || "other", material: (l.materials || [])[0] || "unknown", technique: l.technique || "unknown",
            state_code: "unknown", hours_of_work: draft.hours, material_cost: draft.material_cost,
            title: l.title_en || "", description: l.description_en || "",
          });
          if ($("#price").classList.contains("on")) applyPricing(r, false);
        } catch (e) { /* keep the on-device floor; the rule is the same */ }
      }, first ? 0 : 600);
    }
  }

  function applyPricing(p, resetPick) {
    draft.pricing = p;
    if (resetPick || draft.price == null || draft.price < p.floor) draft.price = Math.max(p.p50, p.floor);
    const b = p.breakdown;
    $("#floor-card").innerHTML = `<h3 style="margin-bottom:8px">${t("floorTitle")}</h3>
      <table class="breakdown">
        <tr><td>${t("mat")}</td><td>${rupee(b.material_cost)}</td></tr>
        <tr><td>${t("labour")} (${b.hours} h × ${rupee(b.wage_per_hour)}${t("perHour")})</td><td>${rupee(b.labour_cost)}</td></tr>
        <tr><td>${t("overhead")}</td><td>${rupee(b.overhead)}</td></tr>
        <tr class="total"><td>${t("floor")}</td><td>${rupee(p.floor)}</td></tr>
      </table>`;
    renderBand();
  }

  function renderBand() {
    const p = draft.pricing;
    const lo = Math.min(p.p10, p.floor) * 0.8, hi = Math.max(p.p90, draft.price) * 1.1;
    const pos = (v) => Math.max(0, Math.min(100, (v - lo) / (hi - lo) * 100));
    const max = Math.max(p.p90 * 1.3, p.floor * 2);
    $("#band-card").innerHTML = `
      <div class="row between"><h3>${t("band")}</h3><span class="small muted">${p.model_used ? "LightGBM" : "rule + market"}</span></div>
      <div class="band">
        <div class="track"></div>
        <div class="range" style="left:${pos(p.p10)}%;right:${100 - pos(p.p90)}%"></div>
        <div class="floor" style="left:${pos(p.floor)}%"></div>
        <div class="pick" style="left:${pos(draft.price)}%"></div>
        <span class="lbl" style="left:${pos(p.p10)}%">P10 ${rupee(p.p10)}</span>
        <span class="lbl" style="left:${pos(p.p90)}%">P90 ${rupee(p.p90)}</span>
      </div>
      <div class="small" style="color:var(--chili);font-weight:700">▍${t("floor")} ${rupee(p.floor)}</div>
      <div class="small muted" style="margin-top:6px">${t("yourPrice")}</div>
      <div class="price-big" id="price-val">${rupee(draft.price)}</div>
      <input type="range" class="slider" id="price-slider" min="${Math.round(p.floor * 0.7 / 10) * 10}" max="${Math.round(max / 10) * 10}" step="10" value="${draft.price}">
      <div id="floor-warn"></div>`;
    $("#price-slider").oninput = (e) => {
      draft.price = Number(e.target.value);
      $("#price-val").textContent = rupee(draft.price);
      $("#band-card .pick").style.left = pos(draft.price) + "%";
      const below = draft.price < p.floor;
      $("#floor-warn").innerHTML = below ? `<div class="note bad small">${t("belowFloor")}</div>` : "";
      $("#price-next").disabled = below;
    };
  }

  // ---------------------------------------------------------------- step 4: review + publish
  let reviewLang = "en";
  RENDER.review = function () {
    const l = draft.listing;
    const chs = [["store", t("chStore"), "#1D4B39", "HS"], ["ondc", t("chOndc"), "#4253A6", "ON"], ["wa", t("chWa"), "#2F8552", "WA"], ["b2b", t("chB2b"), "#E08A1E", "B2B"]];
    $("#review").innerHTML = `${bar(t("newProduct"), modeBadge())}${steps(4)}
      <h2 class="step-title">${t("s4t")}</h2><p class="step-sub">${t("s4s")}</p>
      <div class="pad stack">
        <div class="card product"><img src="${esc(draft.studio)}" alt=""><div class="grow"><div class="price">${rupee(draft.price)}</div><div class="small muted">${t("floor")} ${rupee(draft.pricing.floor)}</div></div></div>
        <div class="tabs"><button data-rl="en" class="${reviewLang === "en" ? "on" : ""}">English</button><button data-rl="hi" class="${reviewLang === "hi" ? "on" : ""}">हिंदी</button></div>
        <label class="field"><span>${t("title")}</span><input class="input" id="r-title" value="${esc(l["title_" + reviewLang])}"></label>
        <label class="field"><span>${t("desc")}</span><textarea class="input" id="r-desc">${esc(l["description_" + reviewLang])}</textarea></label>
        <div class="card"><h3 style="margin-bottom:4px">${t("channels")}</h3>
          ${chs.map(([k, name, col, ab]) => `<div class="channel"><i style="background:${col}">${ab}</i><div class="grow">${name}</div>
            <label class="switch"><input type="checkbox" data-ch="${k}" ${draft.channels.includes(k) ? "checked" : ""}><span></span></label></div>`).join("")}
        </div>
        <div class="error" id="pub-err"></div>
      </div>
      <div class="foot"><button class="btn accent" id="publish">${ICON.shield} ${t("publish")}</button></div>`;
    $("#r-title").oninput = (e) => { l["title_" + reviewLang] = e.target.value; };
    $("#r-desc").oninput = (e) => { l["description_" + reviewLang] = e.target.value; };
    document.querySelectorAll("[data-rl]").forEach((b) => b.onclick = () => { reviewLang = b.dataset.rl; RENDER.review(); });
    document.querySelectorAll("[data-ch]").forEach((c) => c.onchange = () => {
      draft.channels = [...document.querySelectorAll("[data-ch]:checked")].map((x) => x.dataset.ch);
      $("#publish").disabled = !draft.channels.length;
    });
    $("#publish").onclick = publish;
  };

  async function publish() {
    const btn = $("#publish");
    btn.disabled = true; btn.innerHTML = `<span class="spinner" style="width:20px;height:20px;border-width:3px;margin:0"></span> ${t("publishing")}`;
    const l = draft.listing;
    let passport = null;
    if (live()) {
      try {
        await ensureProduct();
        await Api.saveProduct({
          client_id: draft.client_id, title_en: l.title_en, title_hi: l.title_hi,
          description_en: l.description_en, description_hi: l.description_hi, category: l.category,
          material: (l.materials || [])[0] || null, technique: l.technique || null,
          hours_of_work: draft.hours, material_cost: draft.material_cost, price: draft.price,
        });
        await Api.updateProduct(draft.productId, { status: "published", price: draft.price });
        const pp = await Api.issuePassport(draft.productId);
        passport = { qr: pp.qr_content, signed: true, id: String(draft.productId).slice(0, 8).toUpperCase(), key: pp.public_key_hex };
      } catch (e) {
        $("#pub-err").textContent = t("liveFailed") + " (" + e.message + ")";
      }
    } else {
      await new Promise((ok) => setTimeout(ok, 1400));
    }
    draft.passport = passport || await demoPassport();

    const thumb = await thumbOf(draft.studio);
    S.products.push({
      id: draft.productId || draft.client_id, live: live() && !!draft.productId, created: Date.now(), kind: draft.kind,
      listing: l, hours: draft.hours, material_cost: draft.material_cost, price: draft.price, floor: draft.pricing.floor,
      channels: draft.channels, status: "published", sold: 0, thumb, passport: draft.passport,
    });
    save();
    draft.justPublished = true;
    history = [];
    show("passport", false);
  }

  async function demoPassport() {
    const a = DEMO.artisan, l = draft.listing;
    const payload = { v: 1, a: a.id, c: l.technique, s: a.state, h: draft.hours, p: draft.client_id, t: new Date().toISOString().slice(0, 10) };
    const json = JSON.stringify(payload);
    let id = draft.client_id.slice(-8).toUpperCase();
    try {
      const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(json));
      id = [...new Uint8Array(h)].slice(0, 4).map((x) => x.toString(16).padStart(2, "0")).join("").toUpperCase();
    } catch (e) { /* no WebCrypto: keep the client id */ }
    const b64 = btoa(unescape(encodeURIComponent(json))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return { qr: "HAATSETU-PASSPORT-DEMO:" + b64, signed: false, id: "HS-" + a.state + "-" + id };
  }

  async function thumbOf(src) {
    try {
      const img = await Studio.load(src);
      const c = document.createElement("canvas"); c.width = c.height = 220;
      const s = Math.min(img.width, img.height);
      c.getContext("2d").drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, 220, 220);
      return c.toDataURL("image/jpeg", .8);
    } catch (e) { return src; }                       // a remote image without CORS: keep the URL
  }

  function productToDraft(p) {
    return {
      listing: p.listing, kind: p.kind, hours: p.hours, price: p.price, pricing: { floor: p.floor }, channels: p.channels,
      studio: p.thumb || DEMO.cleanPhoto(p.kind), passport: p.passport || null, client_id: p.id, live: p.live,
    };
  }

  // ---------------------------------------------------------------- passport
  RENDER.passport = async function () {
    const d = draft, l = d.listing, a = DEMO.artisan;
    if (!d.passport) d.passport = await demoPassport();
    const pp = d.passport;
    let qrSvg = "";
    try { const q = qrcode(0, "M"); q.addData(pp.qr); q.make(); qrSvg = q.createSvgTag({ cellSize: 4, margin: 0, scalable: true }); } catch (e) { qrSvg = ""; }
    const maker = live() && S.user ? (S.user.name || "Artisan") : (S.lang === "hi" ? a.nameHi : a.name);
    const region = live() ? "—" : (S.lang === "hi" ? a.placeHi : a.place);
    $("#passport").innerHTML = `${bar(t("passport"))}
      <div class="pad stack">
        ${d.justPublished ? `<div class="success-head"><div class="tick">${ICON.tick}</div><h2 style="font-size:22px;margin:0">${t("published")}</h2><p class="muted" style="margin:4px 0 0">${t("publishedSub")}</p></div>` : ""}
        <div class="passport">
          <div class="row between"><b style="font-size:17px">${t("passport")}</b>
            <span class="seal ${pp.signed ? "signed" : ""}">${ICON.shield.replace("<svg", '<svg width="14" height="14"')} ${pp.signed ? t("signedLive") : t("signedDemo")}</span></div>
          <div class="small" style="color:rgba(255,255,255,.75);margin-top:4px">${t("passportSub")}</div>
          <div class="qr">${qrSvg}</div>
          <dl>
            <dt>${t("maker")}</dt><dd>${esc(maker)}</dd>
            <dt>${t("craft")}</dt><dd>${esc(l.technique)}</dd>
            <dt>${t("region")}</dt><dd>${esc(region)}</dd>
            <dt>${t("time")}</dt><dd>${esc(d.hours)} h</dd>
            <dt>${t("id")}</dt><dd>${esc(pp.id)}</dd>
          </dl>
        </div>
        ${pp.signed ? "" : `<div class="note small">${t("demoSignNote")}</div>`}
        <div class="card product"><img src="${esc(d.studio)}" alt=""><div class="grow"><h3>${esc(S.lang === "hi" ? l.title_hi : l.title_en)}</h3>
          <div class="price" style="margin-top:4px">${rupee(d.price)}</div>
          <div class="chips" style="margin-top:6px">${(d.channels || []).map((c) => `<span class="chip on">${chName(c)}</span>`).join("")}</div></div></div>
        <button class="btn primary" id="share">${ICON.share} ${t("share")}</button>
        <button class="btn ghost" id="go-home">${t("home")}</button>
      </div>`;
    $("#share").onclick = () => {
      const text = `${l.title_en}\n${l.title_hi}\n\n${l.description_en}\n\n${rupee(d.price)} · HaatSetu\n${t("passport")}: ${pp.id}`;
      if (N) N.share(text);
      else if (navigator.share) navigator.share({ text }).catch(() => {});
      else { navigator.clipboard && navigator.clipboard.writeText(text); toast("Copied"); }
    };
    $("#go-home").onclick = () => { draft = null; history = []; show("home", false); };
  };

  // ---------------------------------------------------------------- settings
  RENDER.settings = function () {
    $("#settings").innerHTML = `${bar(t("settings"))}
      <div class="pad stack">
        <div class="card stack">
          <label class="field"><span>${t("server")}</span><input class="input" id="srv" inputmode="url" autocapitalize="off" value="${esc(Api.server())}" placeholder="https://haatsetu-api.onrender.com"></label>
          <div class="hint">${t("serverHint")}</div>
          <div class="row"><button class="btn primary" id="srv-save">${t("save")}</button><button class="btn ghost" id="srv-test">${t("test")}</button></div>
          <div id="srv-msg"></div>
        </div>
        <div class="card stack">
          <div class="row between"><b>${t("language")}</b>
            <div class="tabs" style="width:180px"><button data-l="hi" class="${S.lang === "hi" ? "on" : ""}">हिंदी</button><button data-l="en" class="${S.lang === "en" ? "on" : ""}">English</button></div></div>
          <div class="row between"><b>${t("mode")}</b>${modeBadge()}</div>
        </div>
        <button class="btn ghost" id="reset">${t("reset")}</button>
        <button class="btn ghost" id="signout" style="color:var(--chili)">${t("signOut")}</button>
        <p class="small muted" style="text-align:center">HaatSetu 1.2 · AVISHKAAR Season 4</p>
      </div>`;
    const msg = (cls, m) => { $("#srv-msg").innerHTML = m ? `<div class="note ${cls} small">${esc(m)}</div>` : ""; };
    $("#srv-save").onclick = () => {
      const why = Api.setServer($("#srv").value);
      why ? msg("bad", why) : msg("ok", t("saved"));
    };
    $("#srv-test").onclick = async () => {
      const why = Api.setServer($("#srv").value);
      if (why) return msg("bad", why);
      msg("", t("testing"));
      try {
        const h = await Api.health();
        msg("ok", "OK · " + Object.entries(h || {}).map(([k, v]) => k + ": " + (typeof v === "object" ? JSON.stringify(v) : v)).join(" · "));
      } catch (e) { msg("bad", t("failed") + ": " + e.message); }
    };
    document.querySelectorAll("[data-l]").forEach((b) => b.onclick = () => { S.lang = b.dataset.l; save(); RENDER.settings(); });
    $("#reset").onclick = () => { S.products = DEMO.seedProducts().concat(S.products.filter((p) => p.live)); save(); toast(t("saved")); };
    $("#signout").onclick = () => { Api.setToken(""); S.user = null; S.mode = "demo"; save(); history = []; show("welcome", false); };
  };

  // ---------------------------------------------------------------- start
  show(S.mode === "live" && Api.token() ? "home" : (S.started ? "home" : "welcome"), false);
  S.started = true; save();
})();
