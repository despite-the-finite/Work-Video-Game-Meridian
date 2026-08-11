// A tiny original boom-bap style beat (kick/snare/hihat/bass), synthesized
// live with the Web Audio API — no audio file, in keeping with everything
// else in this game being generated at runtime. Browsers block audio
// before a user gesture, so MUSIC.start() is called from the same
// keydown/pointerdown that advances the title screen, and MUSIC.stop() is
// called when leaving the intro for the game proper.

const MUSIC = {
  ctx: null,
  playing: false,
  timerId: null,
  step: 0,

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
  },

  kick(time) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);
    gain.gain.setValueAtTime(0.9, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);
    osc.connect(gain).connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.18);
  },

  noiseBurst(time, duration, filterFreq, gainLevel) {
    const ctx = this.ctx;
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = filterFreq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(gainLevel, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(time);
    noise.stop(time + duration);
  },

  snare(time) {
    this.noiseBurst(time, 0.13, 1000, 0.5);
  },

  hihat(time) {
    this.noiseBurst(time, 0.045, 7000, 0.15);
  },

  bass(time, freq) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, time);
    filter.type = "lowpass";
    filter.frequency.value = 400;
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.22, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.25);
  },

  start() {
    if (this.playing) return;
    this.ensureContext();
    this.playing = true;
    this.step = 0;
    const stepSeconds = 0.19;
    const pattern = {
      kick: [1, 0, 0, 0, 0, 0, 1, 0],
      snare: [0, 0, 1, 0, 0, 0, 0, 1],
      hihat: [1, 1, 1, 1, 1, 1, 1, 1],
      bass: [98, 0, 0, 73, 0, 0, 98, 0],
    };
    const scheduleStep = () => {
      if (!this.playing) return;
      const time = this.ctx.currentTime + 0.02;
      const i = this.step % pattern.kick.length;
      if (pattern.kick[i]) this.kick(time);
      if (pattern.snare[i]) this.snare(time);
      if (pattern.hihat[i]) this.hihat(time);
      if (pattern.bass[i]) this.bass(time, pattern.bass[i]);
      this.step++;
      this.timerId = setTimeout(scheduleStep, stepSeconds * 1000);
    };
    scheduleStep();
  },

  stop() {
    this.playing = false;
    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = null;
  },
};
