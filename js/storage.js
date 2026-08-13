const prefix = "web-arcade:";
export const storage = {
  get(key, fallback) {
    try { const value = localStorage.getItem(prefix + key); return value === null ? fallback : JSON.parse(value); }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(prefix + key, JSON.stringify(value)); } catch { /* storage can be disabled */ }
  },
  get mute() { return this.get("mute", false); },
  set mute(value) { this.set("mute", value); },
  get crt() { return this.get("crt", true); },
  set crt(value) { this.set("crt", value); }
};
