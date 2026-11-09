// HaatSetu API client (live mode). The address is saved by the Android shell; in a desktop browser, in localStorage.
window.Api = (function () {
  const N = window.HaatSetuNative;
  const store = {
    get(k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } },
    set(k, v) { try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch (e) { /* private mode */ } },
  };

  function server() {
    const saved = N ? N.getServer() : store.get("hs.server");
    return (saved || (window.HS_CONFIG && HS_CONFIG.defaultServer) || "").replace(/\/+$/, "");
  }

  function setServer(url) {
    const u = (url || "").trim().replace(/\/+$/, "");
    if (N) return N.setServer(u);
    if (u && !/^https?:\/\/[^/]+/.test(u)) return "Use an https:// address";
    store.set("hs.server", u);
    return "";
  }

  // Accept either the bare host or the full ".../api/v1" form.
  function base() {
    const s = server();
    return s ? (/\/api\/v1$/.test(s) ? s : s + "/api/v1") : "";
  }

  const token = () => store.get("hs.token");
  const setToken = (t) => store.set("hs.token", t);

  async function call(path, { method = "GET", json, form, timeout = 60000 } = {}) {
    if (!base()) throw new Error("no-server");
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), timeout);
    const headers = {};
    if (token()) headers.Authorization = "Bearer " + token();
    let body;
    if (json) { headers["Content-Type"] = "application/json"; body = JSON.stringify(json); }
    if (form) body = form;
    try {
      const r = await fetch(base() + path, { method, headers, body, signal: ctl.signal });
      const text = await r.text();
      let data = null;
      try { data = text ? JSON.parse(text) : null; } catch (e) { data = { detail: text }; }
      if (!r.ok) {
        const d = data && data.detail;
        throw new Error(typeof d === "string" ? d : (d && d.message) || ("HTTP " + r.status));
      }
      return data;
    } finally {
      clearTimeout(timer);
    }
  }

  const dataUrlToBlob = async (u) => (await fetch(u)).blob();

  return {
    server, setServer, base, token, setToken,
    health: () => call("/health", { timeout: 70000 }),         // a free Render service can take ~50 s to wake
    requestOtp: (phone) => call("/auth/otp/request", { method: "POST", json: { phone } }),
    verifyOtp: (phone, code) => call("/auth/otp/verify", { method: "POST", json: { phone, code } }),
    me: () => call("/auth/me"),
    generateListing(wav, language) {
      const f = new FormData();
      f.append("audio", wav, "voice.wav");
      if (language) f.append("language", language);
      return call("/listings/generate", { method: "POST", form: f, timeout: 90000 });
    },
    saveProduct: (p) => call("/products", { method: "POST", json: p }),
    updateProduct: (id, p) => call("/products/" + id, { method: "PATCH", json: p }),
    async enhance(dataUrl, label, productId) {
      const f = new FormData();
      f.append("image", await dataUrlToBlob(dataUrl), "photo.jpg");
      f.append("label", label || "");
      if (productId) f.append("product_id", productId);
      return call("/images/enhance", { method: "POST", form: f, timeout: 120000 });
    },
    suggestPrice: (body) => call("/pricing/suggest", { method: "POST", json: body, timeout: 45000 }),
    issuePassport: (id) => call("/passports/" + id + "/issue", { method: "POST" }),
  };
})();
