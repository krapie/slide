# Slide

Personal presentation slides — clean HTML/CSS decks, version-controlled as code. **Live:** [slide.kevinprk.com](https://slide.kevinprk.com)

## Features

| Feature | Description |
|---------|-------------|
| **Slide gallery** | Browse all decks as a card grid |
| **Full-screen viewer** | View any slide in an iframe or open the raw HTML directly |
| **Code-based slides** | Slides are standalone HTML files — no database, no CMS, no editor |
| **Design system** | All slides use the kevinprk design system (`--kp-*` tokens, Inter + JetBrains Mono) |
| **`/new-slide`** | Claude Code slash command to generate a new slide from a title |

## Getting Started

```bash
npm install
npm run dev   # http://localhost:5173
```

To add a slide, open in Claude Code and run `/new-slide <title>`, or add a `.html` file to `public/slides/` and register it in `public/slides/manifest.json`.
