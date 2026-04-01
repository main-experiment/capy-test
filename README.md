# Starlit Thorns & Sugar Dreams

A wholesome yuri visual novel playable directly in any modern web browser. No build tools, no frameworks — just open `index.html` and play.

## Features

- **10 scenes** of fully voiced (text) romantic storytelling (~30-60 min playtime)
- **3 endings** — True, Good, and Bad — determined by 5 choice points
- **12 character sprites** with multiple expressions (6 per character)
- **8 hand-crafted backgrounds** and **5 CG gallery scenes**
- **Typewriter text effect** with configurable speed
- **Save/Load system** with 6 manual slots + auto-save (localStorage)
- **CG Gallery** with unlock tracking and ending checklist
- **Skip and Auto-advance** modes
- **Dialogue backlog** — review past conversation
- **Smooth animations** powered by anime.js (sprite entrances, scene transitions, floating hearts, screen shake, CRT glitch effects)
- **Fully responsive** — works on desktop, tablet, and mobile
- **Zero server required** — runs from `file://` or any static host

## How to Run Locally

### Option 1: Direct file open
Simply double-click `index.html` or open it in your browser. Everything works from the filesystem.

### Option 2: Local server (recommended for best asset loading)
```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .

# Then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Under **Source**, select your branch (e.g., `main`) and root folder (`/`)
4. Click **Save**
5. Your VN will be live at `https://yourusername.github.io/your-repo/`

Alternatively, deploy to any static hosting: Netlify, Vercel, Cloudflare Pages, etc. Just point to the folder — no build step needed.

## Customizing Art Assets

All art lives in `assets/`. Replace any PNG with your own:

| Folder | Contents | Dimensions |
|--------|----------|------------|
| `assets/sprites/lunette/` | 6 expression PNGs (transparent bg) | ~1024×1536 recommended |
| `assets/sprites/sable/` | 6 expression PNGs (transparent bg) | ~1024×1536 recommended |
| `assets/backgrounds/` | 8 scene backgrounds | 1536×1024 (16:9 landscape) |
| `assets/gallery/` | 5 CG illustrations | 1536×1024 (16:9 landscape) |
| `assets/ui/` | title-bg, textbox, heart-icon | Various |

Keep the same filenames. See `PROMPTS.md` for AI image generation prompts to create new art in a consistent style.

## Modifying the Story

Edit `js/script.js`. The story is a collection of scene objects:

```javascript
scene_id: {
  id: 'scene_id',
  name: 'Scene Display Name',
  background: 'assets/backgrounds/filename.png',
  dialogue: [
    // Narration (no speaker)
    { speaker: null, text: "Narration text here." },

    // Character dialogue with sprite
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "Dialogue here!" },
    // speaker: 'lunette' or 'sable'
    // expression: 'neutral', 'happy', 'blush', 'shy', 'teasing', 'menhera-cry', 'denpa-smile'
    // position: 'left', 'center', 'right'

    // Change background mid-scene
    { speaker: null, text: "Text.", background: 'assets/backgrounds/new-bg.png' },

    // Effects: 'shake', 'hearts', 'glitch'
    { speaker: null, text: "Text.", effect: 'shake' },

    // Show CG image
    { speaker: null, text: "Text.", showCG: 'cg-id' },

    // Hide sprites
    { speaker: 'lunette', expression: 'shy', position: 'center', text: "Bye.", hide: true },

    // Choice point
    {
      speaker: null, text: "",
      choice: {
        prompt: "What do you do?",
        options: [
          { text: "Option A text", affection: 1, next: 'next_scene_id' },
          { text: "Option B text", affection: 0, next: 'other_scene_id' }
        ]
      }
    }
  ],
  next: 'next_scene_id'  // auto-advance to this scene when dialogue ends
}
```

### Ending routes
In `getEndingRoute()`: affection ≥ 4 → True, 2-3 → Good, ≤ 1 → Bad.

## Adding Music

1. Place audio files in `assets/audio/` (MP3 or OGG recommended)
2. Add a `bgm` property to any scene: `bgm: 'assets/audio/track.mp3'`
3. The audio manager handles looping and crossfading automatically
4. If audio files are missing, the game continues silently — no crashes

## Controls

| Input | Action |
|-------|--------|
| Click / Tap anywhere | Advance dialogue |
| Space / Enter | Advance dialogue |
| Escape | Open/close menu |
| AUTO button | Toggle auto-advance |
| SKIP button | Toggle fast-forward |
| LOG button | Open dialogue backlog |
| ⚙ button | Open game menu |

## Project Structure

```
├── index.html          # Entry point
├── css/style.css       # All styles
├── js/
│   ├── engine.js       # Core VN engine (anime.js animations)
│   ├── script.js       # Full story data (~10k words)
│   ├── save.js         # Save/load with localStorage
│   ├── gallery.js      # CG gallery and ending unlock tracking
│   └── audio.js        # Audio manager (graceful no-op if files missing)
├── assets/
│   ├── sprites/        # Character sprites (transparent PNG)
│   ├── backgrounds/    # Scene backgrounds
│   ├── gallery/        # CG illustrations
│   └── ui/             # UI elements (title bg, textbox, heart icon)
├── PROMPTS.md          # Image generation prompts for customization
└── README.md           # This file
```

## Tech Stack

- **Vanilla HTML/CSS/JS** — no build tools, no bundler, no framework
- **anime.js v4** (CDN) — all animations (sprite transitions, effects, UI)
- **localStorage** — save data and gallery unlocks
- **Google Fonts** — Kosugi Maru

## Credits

Created with love. Character art generated with AI.

## License

MIT License — use freely, modify freely, share freely.
