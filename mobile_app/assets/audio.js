// Voice note recorder: microphone -> 16 kHz mono 16-bit WAV, the format the listing API expects.
window.Recorder = (function () {
  let ctx, stream, source, proc, chunks = [], rate = 48000, onLevel = null;

  async function start(levelCb) {
    onLevel = levelCb;
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    rate = ctx.sampleRate;
    source = ctx.createMediaStreamSource(stream);
    proc = ctx.createScriptProcessor(4096, 1, 1);
    chunks = [];
    proc.onaudioprocess = (e) => {
      const d = e.inputBuffer.getChannelData(0);
      chunks.push(new Float32Array(d));
      if (onLevel) {
        let sum = 0;
        for (let i = 0; i < d.length; i += 8) sum += d[i] * d[i];
        onLevel(Math.min(1, Math.sqrt(sum / (d.length / 8)) * 4));
      }
    };
    source.connect(proc);
    proc.connect(ctx.destination);
  }

  function stop() {
    try { proc && proc.disconnect(); source && source.disconnect(); } catch (e) { /* already stopped */ }
    if (stream) stream.getTracks().forEach((t) => t.stop());
    if (ctx) ctx.close();
    const total = chunks.reduce((n, c) => n + c.length, 0);
    const all = new Float32Array(total);
    let o = 0;
    for (const c of chunks) { all.set(c, o); o += c.length; }
    chunks = [];
    return encodeWav(downsample(all, rate, 16000), 16000);
  }

  function downsample(buf, from, to) {
    if (from === to) return buf;
    const ratio = from / to, out = new Float32Array(Math.floor(buf.length / ratio));
    for (let i = 0; i < out.length; i++) {
      const s = Math.floor(i * ratio), e = Math.min(buf.length, Math.floor((i + 1) * ratio));
      let sum = 0;
      for (let j = s; j < e; j++) sum += buf[j];
      out[i] = sum / Math.max(1, e - s);
    }
    return out;
  }

  function encodeWav(samples, sr) {
    const b = new ArrayBuffer(44 + samples.length * 2), v = new DataView(b);
    const str = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    str(0, "RIFF"); v.setUint32(4, 36 + samples.length * 2, true); str(8, "WAVE");
    str(12, "fmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    str(36, "data"); v.setUint32(40, samples.length * 2, true);
    for (let i = 0; i < samples.length; i++) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      v.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return new Blob([b], { type: "audio/wav" });
  }

  const supported = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  return { start, stop, supported };
})();
