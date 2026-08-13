import { storage } from "./storage.js";

let context;
function ctx() {
  if (!context) context = new AudioContext();
  if (context.state === "suspended") context.resume();
  return context;
}
export const audio = {
  get muted() { return storage.mute; },
  toggle() { storage.mute = !storage.mute; return storage.mute; },
  beep(freq = 440, duration = .06, type = "square", volume = .035, slide = 0) {
    if (storage.mute) return;
    const c = ctx(), t = c.currentTime, osc = c.createOscillator(), gain = c.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, t);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + duration);
    gain.gain.setValueAtTime(volume, t); gain.gain.exponentialRampToValueAtTime(.001, t + duration);
    osc.connect(gain).connect(c.destination); osc.start(t); osc.stop(t + duration);
  },
  eat(golden = false) { this.beep(golden ? 780 : 440, .09, "triangle", .05, golden ? 300 : 120); },
  hit(power = 1) { this.beep(150 + power * 75, .045, "sawtooth", .045, 80); },
  score() { this.beep(110, .14, "square", .06, -55); },
  fail() { this.beep(150, .28, "sawtooth", .06, -105); },
  count() { this.beep(620, .04, "square", .035); }
};
