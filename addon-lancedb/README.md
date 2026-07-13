# slidev-addon-lancedb

Shared LanceDB brand for Slidev talks — aligned with the LanceDB PPTX deck.
Drop it into any deck and you get the palette, Geist fonts, the top-left logo,
branded layouts, and reusable components.

## Use it in a deck

```yaml
---
theme: seriph
addons:
  - ../../addon-lancedb   # path relative to your slides.md
canvasWidth: 1280         # template is designed at 1280×720
aspectRatio: 16/9
fonts:
  sans: Geist
  mono: Geist Mono
---
```

## What you get

**Layouts** (`layout: <name>` in slide frontmatter)
- `cover` — title slide; text in the default slot, hero image in the `::hero::` slot
- `statement` — oversized one-sentence section divider
- `closing` — centered closing slide with `.links`

**Components** (auto-imported, no import needed)
- `<Eyebrow>…</Eyebrow>` — uppercase accent label
- `<Presenter name="…" role="…" :avatar="…" />` — cover presenter row
- `<Stat num="10B+" label="…" />` — big-number card (wrap in `<div class="stat-grid">`)

**CSS helper classes** (use in markdown/HTML)
- `.gradient-text`, `.subtitle`, `.lede`, `.eyebrow`
- `.badge` (+ `.dot`), `.callout`, `.code-block`, `.bullet-list`, `.stat` / `.stat-grid`

**Global** — `global-bottom.vue` paints the LanceDB logo (top-left) on every
content slide automatically (skipped on the `cover`, which has its own logo).

## Brand tokens

Defined as CSS variables on `:root` in `styles/index.css`:
`--bg`, `--bg-elev`, `--bg-elev-2`, `--bg-deep`, `--fg`, `--fg-muted`,
`--fg-dim`, `--accent`, `--accent-soft`, `--accent-deep`, `--border`,
`--border-strong`.
