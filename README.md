# Slide

Personal presentation slides — clean HTML/CSS decks, version-controlled as code.

**Live:** https://slide.kevinprk.com

## What it is

A minimal slide service with two parts:

- **List** — browse all slides as a card grid
- **Viewer** — view any slide full-screen in an iframe, or open the raw HTML directly

Slides are standalone HTML files committed to this repo. No database, no CMS, no runtime editor — just static files served by Nginx.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Vite + React + TypeScript |
| Serving | Nginx (static) |
| Slides | Self-contained HTML/CSS files |
| Deploy | Docker + Kubernetes (ArgoCD) |
| CI | GitHub Actions |

## Project Structure

```
slide/
├── public/
│   └── slides/
│       ├── manifest.json       # slide index (title, slug, description, date)
│       └── *.html              # individual slide files
├── src/
│   ├── pages/
│   │   ├── SlideList.tsx       # card grid, reads manifest.json
│   │   └── SlideViewer.tsx     # full-screen iframe viewer
│   ├── App.tsx
│   ├── index.css               # --kp-* design tokens
│   └── types.ts
├── .claude/
│   └── commands/
│       └── new-slide.md        # /new-slide slash command
├── nginx.conf
└── Dockerfile
```

## Creating a New Slide

Open this repo in Claude Code and run:

```
/new-slide <title>
```

Claude will:
1. Generate `public/slides/<slug>.html` — a self-contained HTML/CSS file following the [kevinprk design system](https://github.com/krapie/homeserver/tree/main/design)
2. Prepend an entry to `public/slides/manifest.json`

Then commit and push to deploy.

## Slide Format

Each slide is a single `.html` file with:

- Embedded CSS using `--kp-*` design tokens (Inter + JetBrains Mono, pure neutral palette)
- Dark mode via `@media (prefers-color-scheme: dark)`
- π mark in header and footer
- Optional multi-page navigation via JavaScript (arrow keys + click)

See [`public/slides/hello-world.html`](public/slides/hello-world.html) as the reference example.

## Local Setup

```bash
npm install
npm run dev        # dev server at localhost:5173
```

Or run with Docker:

```bash
docker build -t slide .
docker run -p 8080:80 slide
# open http://localhost:8080
```

## CI/CD

Push to `main` → GitHub Actions builds `krapi0314/slide:<sha>` and pushes to Docker Hub → updates `k8s/slide/deployment.yaml` in [krapie/homeserver](https://github.com/krapie/homeserver) → ArgoCD syncs to the cluster.
