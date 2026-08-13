export const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
export function fitCanvas(canvas) {
  const ratio = devicePixelRatio || 1, rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * ratio); canvas.height = Math.round(rect.height * ratio);
  return { w:canvas.width, h:canvas.height, dpr:ratio };
}
export function shake(amount, duration = .18) {
  return reducedMotion ? { x:0,y:0,t:0 } : { amount, t:duration, max:duration, x:0, y:0 };
}
export function updateShake(s, dt) {
  if (!s?.t) return { x:0,y:0,t:0 }; s.t -= dt;
  const a = s.amount * Math.max(0,s.t / s.max); s.x = (Math.random()-.5)*a; s.y=(Math.random()-.5)*a; return s;
}
export function particleBurst(list, x, y, color, count = 12, speed = 140) {
  for (let i=0;i<count;i++) { const a=Math.random()*Math.PI*2, v=speed*(.35+Math.random()*.65); list.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:.35+Math.random()*.35,max:.7,color}); }
}
export function updateParticles(list, dt, draw) {
  for(let i=list.length-1;i>=0;i--){ const p=list[i];p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.96;p.vy*=.96;if(p.life<=0)list.splice(i,1);else draw(p,p.life/p.max); }
}
export function rounded(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
