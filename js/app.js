import { storage } from "./storage.js";
import { audio } from "./audio.js";
import { Snake } from "./snake.js";
import { Pong } from "./pong.js";

const $=s=>document.querySelector(s), hub=$("#hub"), shell=$("#game-shell"), canvas=$("#game-canvas"), overlay=$("#overlay");
let active;
function syncSettings(){document.body.classList.toggle("crt",storage.crt);$("#mute-toggle").setAttribute("aria-pressed",String(storage.mute));$("#mute-toggle").innerHTML=`SOUND <b>${storage.mute?"OFF":"ON"}</b>`;$("#crt-toggle").setAttribute("aria-pressed",String(storage.crt));$("#crt-toggle").innerHTML=`CRT <b>${storage.crt?"ON":"OFF"}</b>`;$("#game-mute").textContent=storage.mute?"SOUND OFF":"SOUND ON";$("#game-crt").textContent=storage.crt?"CRT OFF":"CRT ON";}
function toggleMute(){audio.toggle();syncSettings();}
function toggleCrt(){storage.crt=!storage.crt;syncSettings();}
const ui={
  hide(){overlay.classList.add("hidden");},
  show(title,copy,stats,actions){$("#overlay-kicker").textContent="RUN COMPLETE";$("#overlay-title").textContent=title;$("#overlay-copy").textContent=copy;$("#overlay-stats").textContent=stats;const target=$("#overlay-actions");target.innerHTML="";actions.forEach(([label,fn])=>{const b=document.createElement("button");b.textContent=label;b.onclick=fn;target.append(b);});overlay.classList.remove("hidden");target.querySelector("button")?.focus();},
  best(value){if(active instanceof Snake)$("#snake-best").textContent=value;else $("#pong-best").textContent=value;},
  back(){leave();},
  mute:toggleMute
};
function setControls(kind){$("#game-controls").textContent=kind==="snake"?"ARROWS / WASD TURN  •  SWIPE TO TURN  •  P PAUSE  •  R RESTART  •  M MUTE":active?.mode==="2p"?"P1 W/S  •  P2 ↑/↓  •  TOUCH LEFT/RIGHT HALVES  •  P PAUSE  •  R RESTART":"W/S OR ↑/↓  •  DRAG LEFT HALF  •  P PAUSE  •  R RESTART  •  M MUTE";}
function enterSnake(){enter();active=new Snake(canvas,ui);setControls("snake");active.start();}
function pongMenu(){enter();$("#overlay-kicker").textContent="CHOOSE YOUR FIGHT";$("#overlay-title").textContent="PING PONG";$("#overlay-copy").textContent="CPU has reaction delay, tracking limits, and imperfect reads. 2P runs on one screen.";$("#overlay-stats").textContent=`BEST RALLY ${storage.get("pong-best-rally",0)}  •  CPU STREAK ${storage.get("pong-streak",0)}`;const target=$("#overlay-actions");target.innerHTML="";[["CPU EASY",()=>launchPong("cpu","easy")],["CPU NORMAL",()=>launchPong("cpu","normal")],["CPU UNFAIR",()=>launchPong("cpu","unfair")],["LOCAL 2P",()=>launchPong("2p")]].forEach(([label,fn])=>{const b=document.createElement("button");b.textContent=label;b.onclick=fn;target.append(b);});overlay.classList.remove("hidden");target.querySelector("button").focus();}
function launchPong(mode,level){ui.hide();active?.stop();active=new Pong(canvas,ui);setControls("pong");active.start(mode,level);}
function enter(){hub.classList.add("hidden");shell.classList.remove("hidden");syncSettings();}
function leave(){active?.stop();active=null;overlay.classList.add("hidden");shell.classList.add("hidden");hub.classList.remove("hidden");$("#snake-best").textContent=storage.get("snake-best",0);$("#pong-best").textContent=storage.get("pong-best-rally",0);}
document.querySelectorAll("[data-game]").forEach(b=>b.addEventListener("click",()=>b.dataset.game==="snake"?enterSnake():pongMenu()));
$("#back-button").onclick=leave;$("#mute-toggle").onclick=toggleMute;$("#crt-toggle").onclick=toggleCrt;$("#game-mute").onclick=toggleMute;$("#game-crt").onclick=toggleCrt;
window.addEventListener("resize",()=>active?.draw());window.addEventListener("keydown",e=>{if(e.key==="m")syncSettings();});
$("#snake-best").textContent=storage.get("snake-best",0);$("#pong-best").textContent=storage.get("pong-best-rally",0);syncSettings();
