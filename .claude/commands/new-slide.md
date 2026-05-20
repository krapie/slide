# /new-slide

Create a new HTML/CSS slide following the kevinprk design system.

## Usage

```
/new-slide <title>
```

Example: `/new-slide Kubernetes Networking Deep Dive`

## What this does

1. Convert `<title>` to a kebab-case slug (e.g. `kubernetes-networking-deep-dive`)
2. Create `public/slides/<slug>.html` — a self-contained HTML slide
3. Update `public/slides/manifest.json` — prepend a new entry

## Slide HTML rules

The generated HTML file must follow these rules exactly:

**Structure:**
- Full `<!DOCTYPE html>` document with embedded `<style>` — no external CSS files
- All `--kp-*` design tokens inlined in `:root` (copy from `src/index.css`)
- Dark mode via `@media (prefers-color-scheme: dark)` on `:root`
- `html, body` fill the full viewport (`width: 100%; height: 100%`)

**Design system:**
- Fonts: `@import` Inter (rsms.me CDN) + JetBrains Mono (Google Fonts) — both in `<style>`
- No Tailwind, no CSS frameworks, no external stylesheets
- Colors: `--kp-*` tokens only — pure neutral palette, no blue/indigo/purple accents
- π mark: `<div class="pi-mark">` (24×24 black square with π glyph) in header AND footer

**Layout:**
- `.slide` container: `width: 100%; height: 100%; display: flex; flex-direction: column; padding: 64px 72px`
- Three zones: `.slide-header` (top) → `.slide-content` (flex: 1, centered) → `.slide-footer` (bottom)
- `.slide-footer`: π on left, page number on right

**Typography:**
- Title: `clamp(40px, 6vw, 64px)`, `font-weight: 600`, `letter-spacing: -0.03em`
- Subtitle/body: `clamp(15px, 2vw, 20px)`, `color: var(--kp-fg-3)`
- Labels/tags: JetBrains Mono, `font-size: 11–12px`, `letter-spacing: 0.04–0.06em`

**Content:**
- Design the slide content to match the title's topic — make it look like a real presentation slide
- Use `.label` (mono uppercase) above the title for category/context
- Use `.meta-row` with `.tag` pills for metadata (topic tags, date, etc.)
- Multi-page decks: use JavaScript to navigate between `.page` sections (optional)
- **Always** end the `<script>` block with `document.body.tabIndex = -1; document.body.focus({ preventScroll: true });` so arrow-key navigation works on page load without requiring a click first

## manifest.json entry format

```json
{
  "slug": "kebab-case-slug",
  "title": "Original Title",
  "description": "One sentence describing the slide content.",
  "created_at": "YYYY-MM-DD"
}
```

Prepend the new entry to the existing array (newest first).

## Reference

See `public/slides/hello-world.html` as the canonical example.
