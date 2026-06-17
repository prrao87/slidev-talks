---
# KGC 2026 — run with:  npx slidev talks/2026-kgc/slides.md --open
theme: seriph
# Pull in the shared LanceDB brand (palette, footer, layouts, components).
# Linked as a local package in the root package.json, so any deck anywhere
# in the repo references it the same way — by name, not by relative path.
addons:
  - slidev-addon-lancedb
title: Vector Search at Planet Scale
info: KGC 2026 talk, styled with the LanceDB brand addon.
# The template is designed at 1280×720, so match that canvas for 1:1 sizing.
canvasWidth: 1280
aspectRatio: 16/9
fonts:
  sans: Hanken Grotesk
  mono: JetBrains Mono
  weights: '300,400,500,600,700,800'
transition: slide-left
# The headmatter is also slide 1's frontmatter, so slide 1 is the cover.
layout: cover
---

<Eyebrow>Conference Talk · 2026</Eyebrow>

# Vector Search at <span class="gradient-text">Planet Scale.</span>

<p class="subtitle">
A placeholder subtitle that explains, in one or two sentences,
what the talk is about and why the audience should care.
</p>

<Presenter name="Your Name" role="YOUR_ROLE · LANCEDB" />

::hero::

![Vector computer illustration](./assets/hero.png)

<!--
Opening (30s). Welcome the audience, thank the organizers by name.
Frame the talk in one sentence. Pause after the title — Nice!
-->

---
layout: statement
---

<Eyebrow>The Problem</Eyebrow>

## Your data is scattered across five systems that <span class="gradient-text">don't talk.</span>

<p class="lede">
Use this layout for opening hooks, section dividers, or any moment
where one bold sentence does more work than a paragraph.
</p>

<!--
Deliver the headline slowly, then pause ~3 seconds before continuing.
-->

---

# A content slide

<p class="lede">The default layout, themed. Use the helper classes for bullets and callouts.</p>

<div class="columns" style="display:grid; grid-template-columns:1.1fr 1fr; gap:56px; align-items:start; margin-top:24px;">
<div>

<ul class="bullet-list">
  <li><strong>Square accent bullets</strong> via <code>.bullet-list</code></li>
  <li>Muted body text by default</li>
  <li>Highlight key terms with <strong>bold</strong></li>
</ul>

</div>
<div>

<div class="callout">
  Wrap an important takeaway in <strong>.callout</strong> for an
  orange-bordered emphasis block.
</div>

</div>
</div>

---

# Themed code

<p class="lede">Fenced code blocks pick up the dark deep surface and JetBrains Mono automatically.</p>

```python
import lancedb

db = lancedb.connect("./data")               # connect to a local dataset
tbl = db.create_table("docs", data=rows)      # create + ingest
results = tbl.search(query_vector).limit(10).to_pandas()
```

---

# By the numbers

<div class="stat-grid" style="margin-top:32px;">
  <Stat num="10B+" label="vectors indexed in a single table" />
  <Stat num="<10ms" label="p99 query latency at scale" />
  <Stat num="100×" label="cheaper than in-memory indexes" />
</div>

---
layout: closing
---

## Thanks.

<p class="lede">Questions welcome — come find me after.</p>

<div class="links">
  <span><span class="at">@</span>yourhandle</span>
  <span>lancedb.com</span>
</div>
