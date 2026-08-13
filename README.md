# AFTERIMAGE ARCADE

A tiny, static browser arcade with two original neon-cabinet games: **Snake** and
**Ping Pong**. It is vanilla HTML, CSS, and ES modules—no build step, account,
analytics, external assets, or CDN required.

## Run locally

Clone the repository and serve its root with any static server:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>. ES modules need a web server; opening
`index.html` directly from the filesystem is not supported by every browser.

## Play

Open the hub and select a card. The game fills the viewport; use **← ARCADE**
to return.

### Snake

- **Arrow keys** or **WASD**: turn
- **Swipe**: turn on touch screens
- **P** or **Esc**: pause
- **R**: restart
- **M**: mute

The board is 24×24 and walls are lethal. Normal food gives 1 point and one
segment. Golden food gives 5 points and two segments. Cyan slow-mo pellets
slow movement for two seconds. Eat again inside 1.2 seconds to build a score
combo. Every five eats increases the base speed.

### Ping Pong

- **1P CPU**: **W/S** or **↑/↓**, or drag in the left half of the screen
- **2P local**: Player 1 **W/S**, Player 2 **↑/↓**; drag left/right halves on touch
- **P** or **Esc**: pause; **R**: restart; **M**: mute

Choose Easy, Normal, or Unfair CPU from the mode menu. First to 7 wins, with a
two-point lead required. Contact away from paddle centre applies visible
english to the ball. Rallies accelerate to a readable cap.

## Settings and persistence

All data is local to the browser with the `web-arcade:*` namespace:

- `web-arcade:snake-best`
- `web-arcade:pong-best-rally`
- `web-arcade:pong-streak`
- `web-arcade:mute`
- `web-arcade:crt`

The hub and in-game top bar expose sound and CRT controls. CRT defaults on.
When the OS requests reduced motion, shake and match-point slow-motion are
disabled.

## Architecture

```
index.html        hub and accessible overlays
style.css         responsive neon/CRT presentation
js/app.js         scene transitions and shared UI
js/input.js       keyboard, swipe, and drag input
js/audio.js       tiny original Web Audio synthesis
js/storage.js     namespaced localStorage access
js/fx.js          particles, canvas helpers, reduced-motion and shake
js/snake.js       independent Snake update/render loop
js/pong.js        independent Ping Pong update/render loop
```

Both games use `requestAnimationFrame` and delta time. They share the input,
audio, storage, and effects modules while retaining independent game state.

## GitHub Pages

The included workflow deploys the repository root to GitHub Pages on each push
to `main`. In the repository settings, open **Pages** and set **Build and
deployment** to **GitHub Actions** once. The site then appears at the
repository's GitHub Pages URL.

## Focus Lock

A standalone mobile Focus Lock prototype is available at [`/focus.html`](./focus.html).
Open it locally in a browser or serve the repository root with a static file server.
Vercel is not wired for this prototype.
