const keys = new Set();
const blocked = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "]);
window.addEventListener("keydown", e => { if (blocked.has(e.key)) e.preventDefault(); keys.add(e.key.toLowerCase()); });
window.addEventListener("keyup", e => keys.delete(e.key.toLowerCase()));

export const input = {
  down(...names) { return names.some(name => keys.has(name.toLowerCase())); },
  consume(name) { name = name.toLowerCase(); if (!keys.has(name)) return false; keys.delete(name); return true; },
  clear() { keys.clear(); },
  bindSwipe(element, callback) {
    let start;
    const begin = e => { const p = e.touches ? e.touches[0] : e; start = { x:p.clientX, y:p.clientY }; };
    const end = e => { if (!start) return; const p = e.changedTouches ? e.changedTouches[0] : e, dx=p.clientX-start.x, dy=p.clientY-start.y; start=null; if (Math.max(Math.abs(dx),Math.abs(dy)) > 20) callback(Math.abs(dx)>Math.abs(dy) ? (dx>0?"right":"left") : (dy>0?"down":"up")); };
    element.addEventListener("touchstart", begin, { passive:true }); element.addEventListener("touchend", end, { passive:true });
  },
  bindDrag(element, callback) {
    const move = e => { const p = e.touches ? e.touches[0] : e; callback(p.clientX, p.clientY); };
    element.addEventListener("pointerdown", e => { element.setPointerCapture?.(e.pointerId); move(e); });
    element.addEventListener("pointermove", e => { if (e.buttons || e.pointerType === "touch") move(e); });
  }
};
