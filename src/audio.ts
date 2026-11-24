// Web Audio API procedural sound synthesizer for tactile typographic interactions
class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    // Audio is muted by default to respect user preference until enabled
    const saved = localStorage.getItem('ks_sound_enabled');
    if (saved === 'true') {
      this.enabled = true;
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    localStorage.setItem('ks_sound_enabled', String(this.enabled));
    if (this.enabled) {
      this.initContext();
      this.playChirp(600, 0.05, 'triangle');
    }
    return this.enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public playClick(freq = 800, volume = 0.03) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.0015);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {
      // Ignore audio glitches safely
    }
  }

  public playHover(freq = 700, volume = 0.015) {
    if (!this.enabled) return;
    this.playClick(freq, volume);
  }

  public playTypewriter(charFreq = 440) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const f = 200 + (charFreq % 500);
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch {
      // ignore
    }
  }

  public playChirp(freq = 520, duration = 0.08, type: OscillatorType = 'sine') {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration + 0.01);
    } catch {
      // ignore
    }
  }

  public playSuccess() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChirp(freq, 0.12, 'sine');
      }, idx * 60);
    });
  }

  public playPaperTear() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      // Synthesize realistic physical paper rip using filtered noise bursts
      const duration = 0.28;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // White noise with micro-crackle modulation simulating tearing paper fibers
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        const crackle = Math.random() > 0.88 ? (Math.random() * 2 - 1) * 1.6 : 0;
        data[i] = white * 0.65 + crackle;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter to isolate paper friction frequencies (~900Hz to 2800Hz)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + duration);
      filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + duration);
    } catch {
      // fallback
      this.playClick(920, 0.05);
    }
  }

  public playBusHorn() {
    this.initContext();
    if (!this.ctx) return;

    try {
      // Dual-tone pneumatic air horn: 370 Hz + 440 Hz
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(370, t);
      osc2.frequency.setValueAtTime(440, t);

      // Lowpass filter to give warm automotive horn character
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, t);

      // Two quick honks
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.03);
      gain.gain.setValueAtTime(0.12, t + 0.14);
      gain.gain.linearRampToValueAtTime(0.0001, t + 0.17);

      gain.gain.setValueAtTime(0.0001, t + 0.22);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.25);
      gain.gain.setValueAtTime(0.14, t + 0.42);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.48);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.5);
      osc2.stop(t + 0.5);
    } catch {
      this.playClick(400, 0.08);
    }
  }

  public playMetroChime() {
    this.initContext();
    if (!this.ctx) return;

    try {
      // Pune Metro ascending 3-note chime: C5 (523Hz), E5 (659Hz), G5 (784Hz)
      const notes = [523.25, 659.25, 783.99];
      const startT = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const noteT = startT + idx * 0.14;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteT);

        gain.gain.setValueAtTime(0.0001, noteT);
        gain.gain.linearRampToValueAtTime(0.09, noteT + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteT + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteT);
        osc.stop(noteT + 0.36);
      });
    } catch {
      this.playChirp(700, 0.15);
    }
  }
}

export const sound = new SoundManager();
