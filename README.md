# Slide

Personal presentation slides managed as code — each deck is a standalone HTML file styled with the kevinprk design system and version-controlled in git. The gallery app browses and previews all decks without any CMS or editor. **Live:** [slide.kevinprk.com](https://slide.kevinprk.com)

## Getting Started

```bash
npm install
npm run dev   # http://localhost:5173
```

To add a new slide deck, open the repo in Claude Code and run `/new-slide <title>`, or manually add a `.html` file to `public/slides/` and register it in `public/slides/manifest.json`.

## Features

- **Slide gallery** — browse all decks as a card grid showing title, date, and a thumbnail preview
- **Full-screen viewer** — view any slide in a full-screen iframe, or open the raw HTML directly in a new tab for presenting
- **Code-based slides** — decks are plain HTML files with inline CSS; no database, no editor, no runtime dependencies
- **Design system** — all slides use `--kp-*` CSS custom properties (Inter + JetBrains Mono) for a consistent look across every deck
- **`/new-slide` command** — Claude Code slash command that scaffolds a new slide file from a title and adds it to the manifest automatically
