// On-device photo studio for demo mode: square crop, auto levels, warm white balance, soft vignette lift.
// Live mode sends the photo to the API instead (Gemini image pass, rembg cut-out as fallback).
window.Studio = (function () {
  function load(src) {
    return new Promise((ok, bad) => { const i = new Image(); i.onload = () => ok(i); i.onerror = bad; i.src = src; });
  }

  /** Downscale any photo to at most `max` px on the long side, as a JPEG data URL (keeps uploads small). */
  async function shrink(src, max = 1280) {
    const img = await load(src);
    const s = Math.min(1, max / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", .88);
  }

  /** The same centred square both "before" and "after" use, so the compare slider lines up. */
  async function crop(src, N = 900) {
    const img = await load(src);
    const side = Math.min(img.width, img.height) * .9;
    const sx = (img.width - side) / 2, sy = (img.height - side) / 2 + (img.height > img.width ? side * .04 : 0);
    const c = document.createElement("canvas"); c.width = c.height = N;
    c.getContext("2d").drawImage(img, sx, sy, side, side, 0, 0, N, N);
    return c;
  }

  async function before(src) { return (await crop(src)).toDataURL("image/jpeg", .88); }

  async function enhance(src) {
    const c = await crop(src), N = c.width;
    const ctx = c.getContext("2d");
    const data = ctx.getImageData(0, 0, N, N), d = data.data;
    // per-channel 1st/99th percentile stretch (auto levels + white balance in one go)
    const lo = [0, 0, 0], hi = [255, 255, 255];
    for (let ch = 0; ch < 3; ch++) {
      const hist = new Uint32Array(256);
      for (let i = ch; i < d.length; i += 16) hist[d[i]]++;
      const total = d.length / 16; let acc = 0;
      for (let v = 0; v < 256; v++) { acc += hist[v]; if (acc > total * .01) { lo[ch] = v; break; } }
      acc = 0;
      for (let v = 255; v >= 0; v--) { acc += hist[v]; if (acc > total * .005) { hi[ch] = v; break; } }
    }
    const warm = [1.04, 1.0, 0.95];
    for (let i = 0; i < d.length; i += 4) {
      const px = i / 4, x = px % N, y = (px / N) | 0;
      const dx = (x - N / 2) / (N / 2), dy = (y - N / 2) / (N / 2);
      const lift = 1 + .12 * Math.min(1, dx * dx + dy * dy);          // undo the corner darkening
      for (let ch = 0; ch < 3; ch++) {
        let v = (d[i + ch] - lo[ch]) * 255 / Math.max(1, hi[ch] - lo[ch]);
        v = 255 * Math.pow(Math.max(0, v) / 255, .96) * warm[ch] * lift;
        d[i + ch] = v;
      }
      // a little extra saturation
      const avg = (d[i] + d[i + 1] + d[i + 2]) / 3;
      for (let ch = 0; ch < 3; ch++) d[i + ch] = avg + (d[i + ch] - avg) * 1.18;
    }
    ctx.putImageData(data, 0, 0);

    return c.toDataURL("image/jpeg", .9);
  }

  return { enhance, before, shrink, load };
})();
