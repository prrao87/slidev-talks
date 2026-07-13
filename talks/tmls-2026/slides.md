---
# TMLS 2026 — run with:  npx slidev talks/tmls-2026/slides.md --open
theme: seriph
# Pull in the shared LanceDB brand (palette, footer, layouts, components).
# Linked as a local package in the root package.json, so any deck anywhere
# in the repo references it the same way — by name, not by relative path.
addons:
  - slidev-addon-lancedb
title: Enhancing training data pipelines with Lance and the multimodal lakehouse
info: TMLS 2026 workshop primer, styled with the LanceDB brand addon.
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

<Eyebrow>TMLS 2026 · Workshop Primer</Eyebrow>

# Enhancing training data pipelines with <span class="gradient-text">Lance and the multimodal lakehouse</span>

<Presenter name="Prashanth Rao" role="AI ENGINEER · LANCEDB" avatar="/prashanth.jpg" />
<Presenter name="Sarwar Bhuiyan" role="SOLUTIONS ENGINEER · LANCEDB" avatar="/sarwar.jpg" />

<div class="repo-cta">Clone &amp; follow along → <a href="https://github.com/lancedb/tmls-2026-demo">github.com/lancedb/tmls-2026-demo</a></div>

<style>
.lance-cover h1 { font-size: 52px; line-height: 1.12; }
.repo-cta { margin-top: 18px; font-family: var(--font-mono,'JetBrains Mono'); font-size: 14px; color: var(--accent-soft); }
.repo-cta a { color: var(--accent-soft); text-decoration: none; border-bottom: 1px solid var(--accent); }
</style>

::hero::

![Multimodal data illustration](./assets/hero.png)

<!--
Good afternoon, everyone — thanks for being here, and thank you to the TMLS team
for having us.

I'm Prashanth, AI engineer at LanceDB, and I'm here with my colleague Sarwar,
who's a solutions engineer on our team.

Rather than just jumping into code, I think a quick primer on what Lance is, would be useful.
So here's how we'll break down the next couple hours:
we'll begin with a talk — the next twenty-five minutes or so — it's the WHY and the WHAT.
Why training data pipelines look the way they do today, why that's a problem, and
what we think a better foundation looks like. After that is the hands-on
portion — the HOW. We'll run the code on a free Colab instance and walk through it.

If you see something in the next few slides you want to try, hold onto it — you'll get your hands on it shortly. 

The slides and notebook are on the repo on screen — github.com/lancedb/tmls-2026-demo (also shared beforehand) — so feel free to clone it now and have them open.

So: Our topic today is enhancing training data pipelines with Lance and the multimodal lakehouse.
-->

---
layout: statement
---

<Eyebrow>The Challenge</Eyebrow>

## Research velocity is bottlenecked on <span class="gradient-text">data, not compute.</span>

<style>
.slidev-page-2 h2 { font-size: 62px; line-height: 1.1; }
</style>

<p class="lede">
The AI model training stack today — six systems glued together, rebuilt weekly,
feeding GPUs that spend most of their cycles lying unused, waiting for data...
</p>

<!--
Here's the claim I want to start with, and it's one that surprises people: for
many teams training models today, the thing slowing down research isn't compute.
It's data.

We tend to assume the bottleneck is GPUs — that if we just had more H100s, or a bigger cluster, we'd move faster. But talk to the people actually building these pipelines (hopefully some of you are in this room today), and you hear a different story. The expensive hardware is sitting there, underused, while the team spends its time wrangling data into a shape the GPU can consume efficiently.

The reason isn't any single tool being slow. It's the overall stack. The way we feed GPUs and built training data pipelines today is a pile of systems bolted together — six systems, on a good day — and that whole assembly gets torn down and rebuilt almost every week as the data changes. The GPUs spend most of their cycles waiting on data.

So before we talk about any solution, I want to sit with that problem for a
minute, because it's one of the key things LanceDB is trying to fix.
-->

---
class: flex flex-col justify-center
---

# The typical stack: held together with glue

<div style="display:grid; grid-template-columns: 0.85fr 1.9fr 0.85fr; gap:24px; align-items:start; margin-top:8px;">

<div>
  <div style="font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; letter-spacing:.14em; color:var(--fg-dim); text-transform:uppercase; margin-bottom:10px;">Multimodal data</div>
  <div class="dt"><span>Video</span><b>PB</b></div>
  <div class="dt"><span>Audio</span><b>PB</b></div>
  <div class="dt"><span>Frames</span><b>100B+</b></div>
  <div class="dt"><span>Captions</span><b>10B+</b></div>
  <div class="dt"><span>Embeddings</span><b>100B+</b></div>
  <div class="dt"><span>Latents</span><b>TB</b></div>
</div>

<div>
  <div style="font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; letter-spacing:.14em; color:var(--accent); text-transform:uppercase; margin-bottom:10px; text-align:center;">Today's stack · 6 systems · rebuilt weekly</div>
  <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
    <div class="sys"><b>S3</b><span>blob store</span></div>
    <div class="sys"><b>Parquet</b><span>tabular</span></div>
    <div class="sys"><b>lerobot</b><span>episodes</span></div>
    <div class="sys"><b>Vector DB</b><span>ANN index</span></div>
    <div class="sys"><b>Feature Store</b><span>metadata</span></div>
    <div class="sys"><b>Custom Python</b><span>glue</span></div>
  </div>
  <div style="margin-top:12px; border:1px solid var(--accent); border-radius:10px; padding:10px; text-align:center; font-family:var(--font-mono,'JetBrains Mono'); font-size:13px; color:var(--accent-soft);">
    re-shard ~ re-embed ~ re-index ~ re-join by timestamp
  </div>
</div>

<div>
  <div style="font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; letter-spacing:.14em; color:var(--fg-dim); text-transform:uppercase; margin-bottom:10px;">GPU fleet</div>
  <div style="border:1px solid var(--accent); border-radius:12px; padding:16px;">
    <div style="font-size:15px;"><span style="color:var(--accent);">●</span> H100 × N</div>
    <div style="font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; letter-spacing:.12em; color:var(--accent); text-transform:uppercase; margin-top:14px;">Status</div>
    <div style="font-size:44px; font-weight:800; color:var(--accent-soft); line-height:1.1;">Idle</div>
    <div style="font-size:12px; color:var(--fg-muted); margin-top:8px;">Waiting on the dataloader. The bottleneck is storage, not compute.</div>
  </div>
</div>

</div>

<div class="columns" style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:18px; margin-top:22px;">
  <div class="callout"><strong>↻ Weekly churn.</strong> Every new filter rewrites the dataset — new caption model, re-shard, re-embed, retrain on a moving target.</div>
  <div class="callout"><strong>✕ No atomicity.</strong> Blobs in S3, metadata in Parquet, vectors elsewhere. No single commit ties them together.</div>
  <div class="callout"><strong>⚠ Not reproducible.</strong> Datasets are folders with dates. Reproducing last quarter's checkpoint is archaeology.</div>
</div>

<style>
.dt{display:flex; justify-content:space-between; align-items:center; background:var(--bg-elev); border:1px solid var(--border); border-radius:8px; padding:7px 12px; margin-bottom:7px; font-size:14px;}
.dt b{font-family:var(--font-mono,'JetBrains Mono'); color:var(--accent-soft); font-size:12px;}
.sys{background:var(--bg-elev); border:1px solid var(--border); border-radius:10px; padding:12px; text-align:center;}
.sys b{display:block; font-size:16px;}
.sys span{font-family:var(--font-mono,'JetBrains Mono'); font-size:10px; letter-spacing:.1em; color:var(--fg-dim); text-transform:uppercase;}
</style>

<!--
So this is what that stack actually looks like. Let's walk across it,
left to right.

On the left is the data itself — and notice the scale. Petabytes of video and
audio, hundreds of billions of frames and embeddings, captions, latents. This is
multimodal data, and it's enormous.

In the middle is everything you stand up to serve that data to a model. For multimodal data,
the raw bytes — the images and video — sit in blob storage like S3. The tabular metadata
goes into Parquet. Robotics or episodic data lands in something like lerobot. Your
embeddings live in a vector database so you can do similarity search. A traditional database
or feature store tracks the derived metadata. And then — holding all of it together — is a
pile of custom Python glue that nobody really owns. That's six systems, and the
data is constantly moving between them: re-sharded, re-embedded, re-indexed, and
re-joined by timestamp every time something changes.

And on the right is the GPU fleet — the most expensive part of the setup — sitting
idle. Waiting on the dataloader to assemble the next batch out of all those
systems.

The result is the three failures along the bottom. First, weekly churn: change one
filter — say you swap in a new caption model — you rewrite the whole dataset and
retrain on a moving target. Second, there's no atomicity: your blobs, your metadata, and
your vectors live in different places, so there's no single commit that ties a
dataset together. And third, it's not easily reproducible: your datasets are just folders
with dates on them, and reproducing last quarter's checkpoint becomes like archaeology.

So the main point here is: you GPU's aren't slow. Your larger data stack likely can't keep it fed.
-->

---
layout: statement
---

<Eyebrow>The Foundation</Eyebrow>

## <span class="gradient-text">Lance</span> — an open lakehouse format for AI.

<p class="lede">
Open source. Columnar. One table serves curation, feature engineering, search and training —
the same bytes, different read patterns. The six boxes collapse into one.
</p>

<!--
So that's the problem. Now let's come to the solution, that the Lance community has landed on.

Lance is an open lakehouse format built specifically for AI
data. It's fully open source with an Apache 2 license.

The core idea is simple: instead of six systems, you have one. The same table serves
all the things that were spread across the traditional stack — curating data,
engineering features on it, searching it, and training on it. It's the same dataset and raw bytes
underneath; the difference is just how it's stored on disk, and the read pattern you ask for.
Curation scans
whole columns; training reads individual samples. Same data, one place. The six
boxes collapse into one.
-->

---
class: flex flex-col justify-center
---

<Eyebrow>Multimodal Lakehouse</Eyebrow>

# Three layers, <span class="gradient-text">one source of truth.</span>

<p class="lede" style="margin-bottom:18px;">A single system, composed of three layers — each writes back to the same tables. No copies, no joins by timestamp.</p>

<div class="layer">
  <div class="lhead">
    <div class="llabel">Layer 03 · Pipelines</div>
    <div class="ltitle">Managed Feature Platform</div>
    <div class="lsub">enrich · writes back to same tables</div>
  </div>
  <div class="lbody">
    <div class="tags">captioning · embedding · filtering · aesthetic scoring · deduplication</div>
    <div class="take">→ Iterate on data the way you iterate on model code — no shard rebuilds.</div>
  </div>
  <div class="lfor"><span>For</span><b>Research & Experimentation</b><i>Try a new caption model in hours, not days.</i></div>
</div>

<div class="layer">
  <div class="lhead">
    <div class="llabel">Layer 02 · Tables</div>
    <div class="ltitle">LanceDB Managed Tables</div>
    <div class="lsub">indexed · versioned · served</div>
  </div>
  <div class="lbody">
    <div class="tags">vector ANN · full-text · scalar filters · multi-writer · compaction · SOC 2 · VPC</div>
    <div class="take">→ One engine for vector + FTS + scalar — 100s of concurrent writers, GPU-tuned dataloader.</div>
  </div>
  <div class="lfor"><span>For</span><b>Data Management & Compute</b><i>Saturate the GPU fleet without owning the index.</i></div>
</div>

<div class="layer">
  <div class="lhead">
    <div class="llabel">Layer 01 · Format</div>
    <div class="ltitle">Lance OSS Format</div>
    <div class="lsub">open source · object-store native</div>
  </div>
  <div class="lbody">
    <div class="tags">multimodal columnar · random access · versioned · blobs + tensors + scalars</div>
    <div class="take">→ Reads from Pandas, PyTorch, Ray, Spark, DuckDB — runs on S3 / GCS / Azure.</div>
  </div>
  <div class="lfor"><span>For</span><b>Storage & Indexing</b><i>Own the substrate; no lock-in.</i></div>
</div>

<div style="text-align:center; margin-top:16px; font-weight:700; color:var(--accent-soft); letter-spacing:.01em;">Same bytes. &nbsp;·&nbsp; Same table. &nbsp;·&nbsp; Consolidated stack.</div>

<style>
.layer{display:grid; grid-template-columns:1.15fr 2.1fr 1.05fr; gap:22px; align-items:center;
  background:var(--bg-elev); border:1px solid var(--border); border-left:3px solid var(--accent);
  border-radius:10px; padding:12px 18px; margin-bottom:10px;}
.llabel{font-family:var(--font-mono,'JetBrains Mono'); font-size:10px; letter-spacing:.12em; color:var(--accent); text-transform:uppercase;}
.ltitle{font-size:18px; font-weight:700; margin-top:3px; line-height:1.15;}
.lsub{font-family:var(--font-mono,'JetBrains Mono'); font-size:10.5px; color:var(--fg-dim); margin-top:3px;}
.tags{font-family:var(--font-mono,'JetBrains Mono'); font-size:12px; color:var(--fg-muted);}
.take{font-size:13px; color:var(--fg); margin-top:7px;}
.lfor{border:1px solid var(--accent); border-radius:8px; padding:8px 12px;}
.lfor span{display:block; font-family:var(--font-mono,'JetBrains Mono'); font-size:9.5px; letter-spacing:.12em; color:var(--accent); text-transform:uppercase;}
.lfor b{display:block; font-size:14px; margin:1px 0 2px;}
.lfor i{font-style:normal; font-size:11.5px; color:var(--fg-muted); line-height:1.3;}
</style>

<!--
First, a bit of naming, since you'll hear both terms today. Lance is the format —
the open file and table format you use through a Python SDK. LanceDB is the
open-source retrieval library on top of it, giving you the APIs for search,
indexing, and data management.

These three layers are how they fit together — let me build it from the bottom up.

At the bottom, Layer 1, is the Lance format itself. This is the open-source
storage layer: a multimodal columnar format that stores blobs, vectors, nested fields and scalars
together. It's versioned, and runs natively on object storage — S3, GCS, Azure. And
it's readable from the tools you already use: Pandas, PyTorch, Ray, Spark, DuckDB.
This layer is about owning your storage with no lock-in.

Layer 2 is LanceDB managed tables. This is where the data management convenience features live:
vector search, full-text search, scalar filters — all in one engine — plus simple ways to
do dataset branching, versioning, cleanup, and access a fast, native PyTorch dataloader.

And Layer 3 on top is the full-fledged distributed data platform that LanceDB, the company builds
This layer contains advanced utilities that separate storage from compute, distribute querying and indexing
across many workers, and make feature engineering scalable yet simple. We won't cover
that layer today, but it's definitely worth knowing about.

The crucial thing is that every one of these layers operates on the same tables. When
you compute a new caption or a new embedding, it lands as a column on the Lance table that's
already there. So it's the same bytes underneath, just serving three different audiences — Lance format
is typically used by platform teams building out their own data lakes,
LanceDB is widely used by AI engineers or reearchers for data management, and research.

The third layer is LanceDB Enterprise, which is what we call the multimodal lakehouse, used by teams who
want to scale LanceDB to petabytes of data.

Now let's zoom into what makes the Lance format capable of immense scale and performance.
-->

---
class: flex flex-col justify-center
---

<Eyebrow>The Format</Eyebrow>

# The multimodal lakehouse is enabled by the features of <span class="gradient-text">Lance</span>

<p class="lede">LanceDB is built on three properties of Lance that don't co-exist in other open formats.</p>

<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px; margin-top:24px;">

<div style="border:1px solid var(--accent); border-radius:14px; padding:22px;">
  <div style="font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; letter-spacing:.12em; color:var(--accent); text-transform:uppercase;">Fast random access + scans</div>
  <div style="font-size:40px; font-weight:800;" class="gradient-text">50–100×</div>
  <div style="font-family:var(--font-mono,'JetBrains Mono'); font-size:12px; color:var(--fg-dim); margin-bottom:10px;">random access vs Parquet · same scan throughput</div>
  <div style="font-size:14px; color:var(--fg-muted);">The training loop reads a <strong>frame</strong>, not a row group — 1–2 IOPs per sample across 100M+ records. And still scans whole columns fast for curation and feat eng.</div>
</div>

<div style="border:1px solid var(--accent); border-radius:14px; padding:22px;">
  <div style="font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; letter-spacing:.12em; color:var(--accent); text-transform:uppercase;">Data evolution</div>
  <div style="font-size:40px; font-weight:800;" class="gradient-text">Zero-copy</div>
  <div style="font-family:var(--font-mono,'JetBrains Mono'); font-size:12px; color:var(--fg-dim); margin-bottom:10px;">add a column · existing bytes untouched</div>
  <div style="font-size:14px; color:var(--fg-muted);">Re-captioning, re-scoring, or adding a modality is an <strong>append</strong>, not a rewrite. Tables evolve smoothly in two dimensions. Multiple teams, multiple feature columns − no table locking.</div>
</div>

<div style="border:1px solid var(--accent); border-radius:14px; padding:22px;">
  <div style="font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; letter-spacing:.12em; color:var(--accent); text-transform:uppercase;">One table, every type</div>
  <div style="font-size:40px; font-weight:800;" class="gradient-text">Multimodal</div>
  <div style="font-family:var(--font-mono,'JetBrains Mono'); font-size:12px; color:var(--fg-dim); margin-bottom:10px;">blobs + tensors + scalars + embeddings</div>
  <div style="font-size:14px; color:var(--fg-muted);">No sidecar files to track metadata or manage indexes. Search across the full picture of a record in one engine — <strong>vector + FTS + scalar</strong> indexes update alongside the raw assets.</div>
</div>

</div>

<!--
It all comes down to three properties of the
Lance format — and the interesting part is that no other open format has all
three at once.

The first is fast random access, without giving up full column scan performance.
A training data pipeline doesn't always need a a whole row group — it may need just one
frame, one sample, at a time, but shuffled. That's a mixed workload. Parquet wasn't
built for this.

Lance gives you 50 to 100 times faster random access than
Parquet, in at most 1-2 IOPS. And, crucially, you keep the fast full-column scans you may
need for curation and feature engineering. You don't pick one or the other; you get both.

The second aspect is data evolution. It's more than just schema evolution: Adding a column
— a new caption, a new score, a new embedding — is a zero-copy operation that writes only new
data. The existing bytes are never rewritten. So
re-captioning your dataset, or adding a small new column of integers, doesn't mean copying
the table; it's just a new column written next to what's already there.

The third is that multimodal data is truly a first-class citizen — one table manages the blobs,
tensors, vectors, nested fields and scalars. No sidecar files to keep them in
sync, and no separate indexing system to plug into. And the vector, full-text, and scalar
indexes live right alongside the raw assets, so you can search across the whole
record in a single engine with a consistent API.
-->

---
class: flex flex-col justify-center
---

<Eyebrow>Data Evolution</Eyebrow>

# More than schema evolution — it's <span class="gradient-text">data evolution</span>

<div class="columns" style="display:grid; grid-template-columns:1.02fr 1fr; gap:42px; align-items:center; margin-top:6px;">
<div>

<img :src="'/2d-evolution.png'" alt="A Lance table grows in two dimensions — new rows for observations, new columns for features" style="width:100%; border-radius:12px; border:1px solid var(--border);" />

</div>
<div>

<p class="lede" style="margin-top:0;">Most formats grow one way — <strong>append rows</strong>. Feature engineering grows the other way — <strong>add columns</strong>. In Parquet's row groups, a new column can rewrite the whole table.</p>

<ul class="bullet-list" style="margin-top:14px;">
  <li><strong>Lance grows in 2D</strong> — rows for new observations, columns for new features, written alongside the data already there.</li>
  <li><strong>Adding a column writes only that column.</strong> Existing blobs, embeddings, metadata, and indexes stay untouched. Each write is a new <strong>fragment</strong> + a new table <strong>version</strong>; <strong>compaction</strong> later keeps fragment counts in check.</li>
  <li>Backfill a few-MB feature on a <strong>PB-scale</strong> table → you write a few MB, not TB.</li>
</ul>

<div class="callout" style="margin-top:14px;">
  Same familiar LanceDB read API — no read-vs-write trade-off decisions, no schema migrations.
</div>

</div>
</div>

<!--
Let's spend a minute unpacking what we mean by data evolution - it's a bigger idea
than schema evolution, and it's one of the biggest enabling features of Lance for petabyte scale
AI data.

Think about the two ways a dataset grows. One is vertically — you collect more
observations, more images, more episodes, and add more rows. Every format like Parquet and Iceberg
handle that fine; you just add more rows.

The other direction is horizontally — adding columns. That's what feature engineering
is all about. You compute a new image caption, a new aesthetic score, a new embedding, and
you want to attach it to every row. New records grow vertically, new features
grow horizontally. The table is evolving in both directions.

Here's the catch: that horizontal direction is exactly where the other file formats
struggle. In Parquet, adding one populated column means rewriting the whole table —
even the columns you didn't touch. We call that write amplification: the cost scales
with the size of the entire table, not the feature you're adding. So on a large
dataset, attaching a small feature can mean rewriting terabytes.

Lance doesn't work that way. Each column lives in its own data file, so adding a
column just writes new files for that one column and points a new version of the
table at them — nothing else is rewritten.

And here's the point to take away: backfill a a small feature colum of a few megabytes onto a
petabyte-scale table, and you *only* write a few megabytes — the existing table that's a
petabyte in size remains untouched. That's the
difference between a new caption model being an afternoon experiment versus a
multi-day data rebuild. Multiple people from multiple teams can independently run experiments
that write to a given table without table locks, which matters at scale.

---
ADDENDUM — the "why" behind Parquet's write amplification, if asked:

You'd think adding a column would be cheap in a columnar format. The subtle part:
Parquet IS columnar, but only within a row group. Each file packs its columns into
row groups, and the file's footer records the schema plus the exact byte offset of
every column's chunk in every row group. Two things follow. First, the file is
immutable — there's no way to splice a new column's chunks into the middle of each
row group, because that shifts every downstream offset and invalidates the footer.
Second, those bytes are sealed once written. So to add one populated column, the
engine reads back every existing column and writes out a whole new set of files.

To be fair to table formats like Iceberg: they make adding a column to the SCHEMA
cheap — but that column reads back as null. The moment you backfill real values —
the whole point of feature engineering — you're back to rewriting the data files.

Lance mechanism: a fragment is a group of rows; within it, each column is a separate
data file. Adding a column appends new data files for just that column and writes a
new manifest/version; a background compaction step keeps file counts in check, but
you never manage it.
-->

---
class: flex flex-col justify-center
---

# You don't rewrite your training code

<p class="lede">Point your DataLoader at the same Lance table: the image, the Q&amp;A, and precomputed features, side by side.</p>

<div class="onetable">
  <div class="oth">image<span>jpeg bytes</span></div>
  <div class="oth">question<span>text</span></div>
  <div class="oth">answer<span>label</span></div>
  <div class="oth">vision_features<span>precomputed vector</span></div>
  <div class="otc">b'\xff\xd8\xff…'</div>
  <div class="otc">"What does the sign say?"</div>
  <div class="otc">"STOP"</div>
  <div class="otc">[0.12, -0.41, …]</div>
</div>

```python
import lancedb, torch
from lancedb.permutation import Permutation

# One TextVQA table — image, Q&A, and precomputed vision features. No joins, no sidecars.
tbl = lancedb.connect("s3://bucket/textvqa").open_table("train")

# Shuffle rows and read only the columns you need — image + features arrive together
perm = Permutation.identity(tbl).select_columns(["image", "vision_features", "labels"])
loader = torch.utils.data.DataLoader(perm, batch_size=350, shuffle=True, num_workers=8)
```

<div class="callout" style="margin-top:16px;">
  Same table, two access patterns — <strong>shuffled batches</strong> for training,
  <strong>full column scans</strong> for curation &amp; eval.
  <span style="display:block; margin-top:6px; font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; color:var(--fg-dim);">
    Docs: <a href="https://docs.lancedb.com/training/torch" target="_blank" style="color:var(--accent-soft); text-decoration:none; border-bottom:1px solid var(--accent);">docs.lancedb.com/training/torch ↗</a> &nbsp;·&nbsp; the workshop builds the <a href="https://github.com/lancedb/training/blob/vlm-textvqa/examples/vlm-textvqa/notebooks/colab_textvqa_lance.ipynb" target="_blank" style="color:var(--accent-soft); text-decoration:none; border-bottom:1px solid var(--accent);">TextVQA notebook ↗</a>
  </span>
</div>

<p style="margin-top:16px; font-size:19px; font-weight:600; color:var(--fg);">Main question: <span class="gradient-text">Does it keep the GPU fed?</span></p>

<style>
.onetable{display:grid; grid-template-columns:0.95fr 1.5fr 0.65fr 1.25fr; border:1px solid var(--border); border-radius:10px; overflow:hidden; margin:14px 0 18px;}
.onetable > div{padding:8px 12px; font-family:var(--font-mono,'JetBrains Mono'); font-size:12px;}
.onetable .oth{background:var(--bg-elev); color:var(--accent-soft); border-bottom:1px solid var(--border); border-right:1px solid var(--border);}
.onetable .oth span{display:block; font-size:9px; color:var(--fg-dim); text-transform:uppercase; letter-spacing:.08em; margin-top:2px;}
.onetable .otc{color:var(--fg-muted); border-right:1px solid var(--border);}
.onetable .oth:nth-child(4), .onetable .otc:last-child{border-right:none;}
</style>

<!--
When thinking about a new format, the natural worry is: does taking
advantage of all this mean rewriting all of my training code? The answer is no — you
simply point your existing PyTorch DataLoader at a Lance table, and that's basically it.

Look at the table at the top. This is a sample from the example we'll build in the
workshop — TextVQA. In a single row you've got the raw image bytes, the question,
the answer, and a precomputed vision embedding — all side by side. No separate
blob store for the image, no feature store for the vector, no joining them back
together by ID. They're just columns in the same table.

And the code is regular PyTorch. You connect to the table, you wrap it in what we call
Permutation API in LanceDB — that's the piece that handles shuffling and lets you select only
the columns that this run needs — and you hand it to a standard torch DataLoader.

Also worth noting here: the same table serves two completely different access
patterns. Training reads small shuffled batches; but upstream (curation) and downstream (evaluation)
tend to scan full columns. This is what the storage layout of Lance enables.

This brings us to the question that actually matters for training — when you read
off this Lance table, does it keep the GPU fed? Let's look at the numbers.
-->

---
class: flex flex-col justify-center
---

<Eyebrow>The Proof · head to head</Eyebrow>

# Feeding an H200: GPU utilization (MFU)

<p class="lede">Each bar shows how much of a single H200's compute actually does useful work while training a Vision Transformer (ViT). Higher is better — more of the the GPU being paid for is kept busy.</p>

<div style="margin-top:22px;">
  <div class="bar"><span class="bl">Pure GPU · no data loading</span><div class="bt"><div class="bf" style="width:100%; background:var(--fg-dim);"></div></div><span class="bv">40.97%</span></div>
  <div class="bar"><span class="bl">LanceDB Enterprise</span><div class="bt"><div class="bf" style="width:94.7%;"></div></div><span class="bv">38.80%</span></div>
  <div class="bar"><span class="bl">LanceDB OSS</span><div class="bt"><div class="bf" style="width:91.1%;"></div></div><span class="bv">37.32%</span></div>
  <div class="bar"><span class="bl">S3 Parquet</span><div class="bt"><div class="bf" style="width:51.3%; background:var(--accent-deep);"></div></div><span class="bv">21.03%</span></div>
  <div class="bar"><span class="bl">Boto3 S3 (raw)</span><div class="bt"><div class="bf" style="width:31.6%; background:var(--accent-deep);"></div></div><span class="bv">12.94%</span></div>
</div>

<div style="margin-top:12px; font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; color:var(--fg-dim);">
  Metric: Model FLOPs Utilization (MFU) · ViT-H/14 · batch 350 · single H200 — benchmark code at <a href="https://github.com/lancedb/training/tree/main/examples/ViT" target="_blank" style="color:var(--accent-soft); text-decoration:none; border-bottom:1px solid var(--accent);">github.com/lancedb/training ↗</a>
</div>

<div class="callout" style="margin-top:16px;">
  The top bar is the ceiling: data already in memory, no loading at all. Lance lands within <strong>~5% of it</strong>, and roughly <strong>2× Parquet, 3× raw files on S3</strong>.
</div>

<style>
.bar{display:flex; align-items:center; gap:16px; margin-bottom:11px;}
.bl{flex:0 0 210px; font-size:14px; text-align:right; color:var(--fg-muted);}
.bt{flex:1; background:var(--bg-elev); border-radius:6px; overflow:hidden; height:26px;}
.bf{height:100%; background:var(--accent); border-radius:6px;}
.bv{flex:0 0 70px; font-family:var(--font-mono,'JetBrains Mono'); font-size:14px; color:var(--accent-soft);}
</style>

<!--
We trained the same Vision
Transformer on a single H200 GPU, changing only one thing each time: where the data
comes from and how it's read. The metric is MFU — Model FLOPs Utilization — which
is just how much of that expensive GPU's compute is actually doing useful work.
Higher is better; a lower bar means the GPU is sitting idle waiting on data.

Start with the top bar — that's the ceiling. It's a run with no data loading at
all, data already sitting in GPU memory. And it's still only about 41%. That surprises people, so
it's worth unpacking: 41% is the realistic ceiling for this synthetic workload, not 100%
— you never hit a GPU's theoretical peak in practice, because of memory-bandwidth limits,
non-matmul ops (attention, softmax, normalization).

One thing to be clear about, because it makes this fair: every one of these bars is
reading from the same S3 bucket — open-source LanceDB reads straight from an s3://
URI, just like the Parquet and the raw-files runs do. Nobody got a local-disk
advantage. The only bar not reading from storage is the top one, the in-memory
ceiling.

Both open-source LanceDB and LanceDB Enterprise sit right up
against that ceiling, within about 5%. Parquet on S3 is at roughly half of that
number — about 21%. And raw files pulled from S3 with boto3 into the GPU is down
around 13%. So loading data from Lance is roughly 2x Parquet and 3x raw files on
S3, and it gets you within touching distance of a GPU that has nothing to wait for.

And remember, this is a single GPU on images. Scale to a multi-GPU job, or to video
where every sample is far heavier to load, and this gap widens — the data path is
the thing that breaks first. We're going to be releasing more such benchmarks
on this linked repo, if you're interested.

---
ADDENDUM — definitions, if asked:

MFU (Model FLOPs Utilization): the fraction of the GPU's theoretical peak compute
(FLOPs/sec) the run actually achieves. Standard way to measure how efficiently a run
uses the hardware.

"Data loading" = everything needed to hand the GPU its next batch: reading bytes
from storage, DECODING them (JPEG → pixels), transforms/augmentation, collating into
a tensor, copying to the GPU. Much of this is CPU-bound — decode especially — and
while the CPU does it, the GPU waits.

Why the ceiling is only ~41%: even with data in memory you can't approach 100% — peak
FLOPs is theoretical. Memory-bandwidth limits, non-matmul ops (attention, softmax,
normalization), and kernel-launch/communication overhead all eat into it. ~40% MFU on
a big ViT is healthy.

Setup: ViT-H/14, batch 350, single H200. Code: github.com/lancedb/training.

Read sources (from bench.py, if pressed on fairness): LanceDB OSS reads
s3://{bucket}/training/; Parquet reads an s3:// .parquet via PyArrow S3FileSystem;
boto3 reads loose JPEGs from the same bucket. All three hit S3. LanceDB Enterprise
uses the managed db:// endpoint — object-store-backed, not local disk. Only the
"Pure GPU" ceiling is in-memory synthetic data.
-->

---
class: flex flex-col justify-center
---

# Training off object storage

<p class="lede">World models train on streams of environment frames (PushT, shown). Data-loading throughput, reading from local disk and from object storage (S3).</p>

<div class="columns" style="display:grid; grid-template-columns:0.92fr 1.08fr; gap:36px; align-items:center; margin-top:12px;">
<div>
  <img :src="'/stable-wm.png'" alt="World-model environments from the stable-worldmodel benchmark" style="width:100%; border-radius:12px; border:1px solid var(--border);" />
  <div style="margin-top:9px; font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; color:var(--fg-dim);">
    Benchmarked on <a href="https://www.lancedb.com/blog/stable-worldmodel-a-high-performance-platform-for-reproducible-world-model-research" target="_blank" style="color:var(--accent-soft); text-decoration:none; border-bottom:1px solid var(--accent);">stable-worldmodel ↗</a>
  </div>
</div>
<div>
  <div style="font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; letter-spacing:.12em; color:var(--fg-dim); text-transform:uppercase; margin-bottom:10px;">Local disk · samples/sec</div>
  <div class="bar2"><span class="bl2">Lance</span><div class="bt2"><div class="bf2" style="width:100%;"></div></div><span class="bv2">4,815</span></div>
  <div class="bar2"><span class="bl2">HDF5</span><div class="bt2"><div class="bf2" style="width:29.4%; background:var(--accent-deep);"></div></div><span class="bv2">1,416</span></div>
  <div class="bar2"><span class="bl2">Video</span><div class="bt2"><div class="bf2" style="width:27.6%; background:var(--accent-deep);"></div></div><span class="bv2">1,331</span></div>
  <div style="font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; letter-spacing:.12em; color:var(--accent); text-transform:uppercase; margin:16px 0 10px;">On S3 · samples/sec</div>
  <div class="bar2"><span class="bl2">Lance</span><div class="bt2"><div class="bf2" style="width:100%;"></div></div><span class="bv2">3,184</span></div>
  <div class="bar2"><span class="bl2">HDF5 (cached)</span><div class="bt2"><div class="bf2" style="width:23.8%; background:var(--accent-deep);"></div></div><span class="bv2">756</span></div>
  <div class="bar2"><span class="bl2">HDF5</span><div class="bt2"><div class="bf2" style="width:0.4%; background:var(--accent-deep);"></div></div><span class="bv2">9.1</span></div>
  <div style="margin-top:8px; font-size:11px; color:var(--fg-dim);"><strong style="color:var(--fg-muted);">HDF5 (cached)</strong> is its best case — columns held in RAM. Lance reads straight from S3, uncached.</div>
</div>
</div>

<div class="callout" style="margin-top:18px;">
  Lance sustains the highest throughput whether the data is local or on S3 —
  <strong>3,184 samples/sec straight from object storage</strong>, in <strong>13.3 GB on disk</strong>.
</div>

<style>
.bar2{display:flex; align-items:center; gap:12px; margin-bottom:11px;}
.bl2{flex:0 0 120px; font-size:14px; text-align:right; color:var(--fg-muted);}
.bt2{flex:1; background:var(--bg-elev); border-radius:6px; overflow:hidden; height:24px;}
.bf2{height:100%; background:var(--accent); border-radius:6px;}
.bv2{flex:0 0 56px; font-family:var(--font-mono,'JetBrains Mono'); font-size:13px; color:var(--accent-soft);}
</style>

<!--
That last chart was a synthetic workload on vision transformers.
This one is a different and a much harder workload — world
models, which train on long streams of environment frames. The pictures on the left
are from PushT, one of the environments in the stable-worldmodel benchmark. Same
question as before: how many samples per second can we feed the model, reading from
local disk and then from S3.

Look at local disk first, the top group. Lance is at about 4,800 samples a second —
roughly 3x the alternatives, HDF5 and reading straight from video. So even on local
disk, Lance is well ahead.

But the row I really to focus on is the bottom one — HDF5 reading from S3,
uncached: 9.1 samples per second. That's the number you'd hit if
you naively pointed a legacy HDF5 pipeline at object storage, because HDF5 over S3 turns
into a storm of tiny network reads. At 9 samples a second, that training job pretty much doesn't run.

The middle bar in the S3 table shows "HDF5 cached" at 756 samples/sec. That's HDF5's best
case: you hold its columns in RAM and serve from there. It's way faster than the naive
scan from S3, but you've had to fit the data in memory to get it that quickly, which
is definitely not cheap as you scale up.

Now compare Lance on the same S3 bucket: it shows 3,100 samples a second, reading straight from
object storage with no special setup. Basically, Lance is fast enough off of
S3 (not that much slower than off of local disk) that you don't need to pre-stage anything.

The comparison on the slide is aiming to be generous to HDF5, which was the pre-existing standard
format in this domain, and this was run by the authors of the stable-worldmodel framework,
who work in Yann Lecun's research group. Lance's plain, uncached performance is 4x faster than
cached HDF5, and the whole thing is on disk in just 13 GB.

The takeaway: Lance lets you train directly off object storage, at rapid speed, without elaborate
staging mechanisms.

---
ADDENDUM — what "cached" means, if asked:

It's an in-memory cache of specific columns (a keys_to_cache arg on the dataset),
held in RAM and served from there each step — NOT OS page cache, not a local
download. The detail cuts FOR Lance:
  • HDF5 on S3 NEEDS the cache to be usable: 9.1 → 756 samples/s (still ~4x slower
    than Lance).
  • Lance gains ~nothing from caching: S3 3,184 → 3,253 (flat); local 4,815 → 4,431
    (slightly slower — the RAM copy is pure overhead for an already-efficient reader).
So Lance is efficient enough that caching doesn't help it; HDF5 is only viable on S3
if you cache.
-->

---
class: flex flex-col justify-center
---

# Speed feeds the GPU. Evolution feeds the loop.

<p class="lede">Object detection on BDD100K — curate, enrich, and version without rewriting a thing.</p>

<img :src="'/object-detection.avif'" alt="Object-detection frames from BDD100K with bounding boxes across day, night, and rain" style="width:100%; border-radius:12px; border:1px solid var(--border); margin-top:10px;" />
<div style="margin-top:8px; font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; color:var(--fg-dim);">From <a href="https://www.lancedb.com/blog/unifying-the-av-ml-stack-lancedb" target="_blank" style="color:var(--accent-soft); text-decoration:none; border-bottom:1px solid var(--accent);">Unifying the AV / ML stack with LanceDB ↗</a></div>

<div class="columns" style="display:grid; grid-template-columns:1.05fr 1fr; gap:44px; align-items:start; margin-top:14px;">
<div>

<ul class="bullet-list">
  <li>Images + annotations + embeddings in <strong>one governed table</strong></li>
  <li>Curate failure slices by <strong>search</strong> — "every nighttime-pedestrian frame"</li>
  <li>Dedupe: <strong>16.7%</strong> of frames flagged, no rewrite</li>
  <li>Add derived features as <strong>new columns</strong>, fine-tune the slice</li>
</ul>

</div>
<div>

<div style="font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; letter-spacing:.12em; color:var(--accent); text-transform:uppercase; margin-bottom:14px;">mAP@0.5 after fine-tuning curated slices</div>
  <div class="map"><span>Nighttime pedestrian</span><b>0.40 → 0.52</b><i>+29%</i></div>
  <div class="map"><span>Distant pedestrian</span><b>0.47 → 0.58</b><i>+22%</i></div>
  <div class="map"><span>Rider</span><b>0.56 → 0.67</b><i>+20%</i></div>

</div>
</div>

<style>
.map{display:flex; align-items:center; gap:14px; background:var(--bg-elev); border:1px solid var(--border); border-radius:10px; padding:12px 16px; margin-bottom:10px;}
.map span{flex:1; font-size:14px;}
.map b{font-family:var(--font-mono,'JetBrains Mono'); font-size:14px; color:var(--fg-muted);}
.map i{font-style:normal; font-family:var(--font-mono,'JetBrains Mono'); font-size:14px; color:var(--accent-soft); font-weight:700;}
</style>

<!--
So far I've been showing you speed — keeping the GPU fed. But speed is only half the
story. Speed feeds the GPU; data evolution feeds the research loop. This slide is
about that second half.

This is a real autonomous-driving example — object detection on BDD100K, which is
dashcam footage dataset across day, night, and rain settings.

It starts with one Lance table: the images, the bounding-box annotations, and
embeddings all live together — not an image store plus an annotation database plus a
vector index, just one table, that's governed and versioned within Lance.

Because the embeddings are right there, you can curate by search. Instead of
eyeballing frames, you ask the table for the slice you care about via vector search — "every
nighttime-pedestrian frame" — and that becomes your training subset. You can also
dedupe the same way: here, using Lance's search features flagged about 17% of
frames as near-duplicates, which was easily done on terabytes of data.

Then you enrich the data. Any derived feature you compute — a difficulty score, a weather
tag — gets added as a new column, which, remember, is a cheap append, not a full table
rewrite. So you curate a hard slice, fine-tune on it, and measure. Rinse, repeat and iterate faster.

The numbers on the right show the pay-off. Fine-tuning on these curated slices improves object
detection accuracy meaningfully on exactly the hard cases that matter for
safety — detecting nighttime pedestrians is up about 29%, distant pedestrians 22%, riders 20%.
That's the full training loop: search to find the failure modes, add columns to enrich the data with features,
version it, retrain. As a researcher or engineer, your focus is on training, not wrangling with
infrastructure bottlenecks.
-->

---
class: flex flex-col justify-center
---

<Eyebrow>Solutions</Eyebrow>

# Open format, open library, managed scale

<p class="lede">The same open Lance format underneath — you choose how much to run yourself.</p>

<div class="etable">
  <div class="rlabel"></div>
  <div class="hcell"><div class="hname">Lance</div><div class="hsub">the format</div></div>
  <div class="hcell oss"><div class="hname">LanceDB OSS</div><div class="hsub">the library · <span style="color:var(--accent-soft);">today's demo</span></div></div>
  <div class="hcell"><div class="hname">LanceDB Enterprise</div><div class="hsub">managed</div></div>

  <div class="rlabel">Role</div>
  <div>Open columnar file &amp; table format</div>
  <div class="oss">Retrieval library + API over Lance</div>
  <div>Managed platform on the same format</div>

  <div class="rlabel">Runs on</div>
  <div>Any object store or local disk</div>
  <div class="oss">Your own infra · embedded</div>
  <div>Fully managed · <strong>storage separated from compute</strong></div>

  <div class="rlabel">Scale</div>
  <div>The open foundation everything reads</div>
  <div class="oss">Single-node; plenty for smaller datasets</div>
  <div>Distributed search, indexing &amp; feature engineering</div>

  <div class="rlabel">Reach for it when</div>
  <div>You want an open, portable substrate</div>
  <div class="oss">You're starting out or running everyday workloads</div>
  <div>You hit massive multimodal scale, across teams</div>

  <div class="rlabel">License</div>
  <div>Open source</div>
  <div class="oss">Open source</div>
  <div>Commercial · managed</div>
</div>

<div style="margin-top:14px; font-size:13px; color:var(--fg-muted);">
  Today's workshop runs entirely on the open-source <strong>LanceDB</strong> which works well for most workloads short of massive scale.
</div>

<style>
.etable{display:grid; grid-template-columns:0.78fr 1fr 1.04fr 1.18fr; border:1px solid var(--border); border-radius:12px; overflow:hidden; margin-top:16px;}
.etable > div{padding:10px 14px; border-top:1px solid var(--border); font-size:13px; color:var(--fg-muted); line-height:1.32;}
.etable > div:nth-child(-n+4){border-top:none;}
.etable .rlabel{font-family:var(--font-mono,'JetBrains Mono'); font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--fg-dim); display:flex; align-items:center;}
.etable .hcell{padding-top:14px; padding-bottom:14px;}
.etable .hname{font-size:16px; font-weight:700; color:var(--fg);}
.etable .hsub{font-family:var(--font-mono,'JetBrains Mono'); font-size:10px; letter-spacing:.06em; text-transform:uppercase; color:var(--fg-dim); margin-top:2px;}
.etable .oss{background:rgba(233,120,82,0.06);}
</style>

<!--
Before we get hands-on, let me reiterate how this is packaged, because there
are three names and people tend to get them confused. They're all the same open Lance format
underneath — the difference is just how much you run by yourself.

On the left is Lance — the format. The open columnar file and table format. Stores the
data and manages the indexes on any object store or local disk.
This is the foundation that we build on. Think of Lance as an alternative to Parquet + Iceberg,
with an open, portable substrate with no vendor lock-in.

In the middle, and highlighted here, is LanceDB open-source — the retrieval library and
APIs on top of the format. It runs embedded, on your own infrastructure, single
node. And this is what today's workshop uses. For most workloads short of massive
scale, this is all you need.

On the right is LanceDB Enterprise — the managed platform on that same format. The
key difference is that it separates storage from compute, so search, indexing, and
feature engineering run distributed rather than on one node. You'd reach for it when
you hit massive scale, terabytes and beyond.

The thing to take away: it's one format, three levels of "run it yourself." You
start on the open-source library — which is what we're about to do — and the path to
managed scale doesn't change your data or your format. And you can always leverage all the well-known
open source compute engines you know and love, like Polars, DuckDB, Spark, and more, on top of Lance.
-->

---
class: flex flex-col justify-center
---

<Eyebrow>The workshop</Eyebrow>

# The task: read the image, then <span class="gradient-text">fine-tune on it</span>

<div class="columns" style="display:grid; grid-template-columns:1fr 1.08fr; gap:40px; align-items:center; margin-top:6px;">
<div>
  <img :src="'/textvqa-diff.png'" alt="TextVQA examples on a TWA sugar packet — questions and the answers read from the image" style="width:100%; border-radius:12px; border:1px solid var(--border);" />
  <div style="margin-top:9px; font-size:12px; color:var(--fg-dim);">Each example: an image + a question + the answer + the OCR text read off it. Answers come straight from the packet's print.<br>Dataset: <a href="https://textvqa.org/" target="_blank" style="color:var(--accent-soft); text-decoration:none; border-bottom:1px solid var(--accent);">textvqa.org ↗</a></div>
</div>
<div>
  <p style="font-size:16px; color:var(--fg-muted); line-height:1.55; margin-top:0;">
  <strong>TextVQA</strong> — answer a question whose answer is text written <em>in</em> the image; the model has to read the picture, not just recognize objects. It answers in two stages: an <strong>image encoder</strong> converts the image into visual embeddings, then a <strong>language model</strong> reads those embeddings + the question and writes the answer.
  </p>
  <ul class="bullet-list" style="margin-top:14px;">
    <li>A general base model is broad — but misses domain specifics, like reading the small <strong>"Domino"</strong> print to name the brand.</li>
    <li><strong>Supervised fine-tuning (SFT)</strong> shows it many (image, question, answer) examples, grounding it to answer <em>our</em> questions better.</li>
  </ul>
</div>
</div>

<!--
Okay — that's the why and the what. Now let me set up the actual task we'll work
on in the hands-on part, so the notebook makes sense when you open it.

The task is called TextVQA — visual question answering, where the answer is text
written inside the image. Look at the examples: you're not asking "is there a cat" —
you're asking the model to actually reason over the image. What does the sugar packet
say? What brand is this? The answer is printed right there in the image, and the
model has to reason about what's in it, not just recognize objects.

Mechanically, the model works in two stages, and this matters for the next slide.
First, an image encoder turns the image into a set of vision embeddings — basically, a
numerical representation of what's in the image. Then a language model takes those
embeddings plus the question, and writes the answer. Image in, embeddings, then text
out.

So why fine-tune the model at all? A general base model is broad but shallow on specifics. It
might see the packet and not pick out the small "Domino" print that tells you the
brand. Supervised fine-tuning just means showing it many examples of the image, the
question, and the correct answer — so it gets grounded in answering the kind of questions we
actually care about in that domain. That's our task: read the dataset via LanceDB, then fine-tune a base model to do it better.
-->


---
class: flex flex-col justify-center
---

<Eyebrow>The workshop</Eyebrow>

# Precompute the embeddings once, <span class="gradient-text">store them as a column</span>

<p class="lede">The image encoder is frozen, so its embeddings never change across epochs. Compute them once instead of re-encoding every pass — that alone is <strong>~2× faster steps</strong>. The real question is where you put them.</p>

<div class="columns" style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:16px;">
  <div class="vt">
    <div class="vth">Without Lance</div>
    <div class="vtb">Re-encode every epoch (wasted GPU), or precompute into <strong>sidecar files</strong> (.npy / HDF5) you keep aligned by hand — and adding a column to Parquet / Iceberg rewrites the table.<br><span class="vtn">a second artifact to manage, or a full rewrite</span></div>
  </div>
  <div class="vt vton">
    <div class="vth" style="color:var(--accent-soft);">With Lance</div>
    <div class="vtb">Precompute once and add them as a <strong>column on the same table</strong> — a cheap append, no rewrite. The loader reads them straight from the table.<br><span class="vtn">one table, no sidecars, nothing to keep in sync</span></div>
  </div>
</div>

<div class="callout" style="margin-top:16px;">
  Precomputing is the speedup; <strong>Lance makes it painless</strong> — a cheap column add, not a table rewrite (the 2-D evolution from earlier) and no sidecar files. <strong>~2× faster steps, −1.3 GB GPU memory.</strong>
</div>

<style>
.vt{border:1px solid var(--border); border-radius:12px; padding:18px 20px; background:var(--bg-elev);}
.vt.vton{border-color:var(--accent);}
.vth{font-family:var(--font-mono,'JetBrains Mono'); font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--fg-dim); margin-bottom:8px;}
.vtb{font-size:15px; color:var(--fg-muted); line-height:1.5;}
.vtn{display:inline-block; margin-top:6px; font-size:12.5px; color:var(--fg-dim);}
</style>

<!--
This slide is one specific efficiency trick — precomputing the image embeddings.
(It's separate from QLoRA, which is HOW we fine-tune the language model cheaply —
that comes up on the next slide. This one is purely about the image encoder.)

Remember the image encoder is the first stage. In this workshop we freeze it — we're
fine-tuning the language model on top, not the encoder. And here's the key
observation: if the encoder never changes, then the embeddings it produces for a
given image never change either. They're identical on epoch one, epoch five, epoch fifty. So
re-running the encoder on every image every epoch is pure wasted GPU — you're
recomputing the same numbers over and over.

So instead you compute the embeddings once, up front, and store them. That alone
roughly doubles your training step speed, and it frees up about 1.3 GB of GPU memory
because you're no longer holding the encoder on the device during training.

The real question — and this is where Lance comes in — is where you put those
embeddings. The usual options are both painful. You either re-encode every epoch,
which wastes the GPU, or you precompute into sidecar files — .npy or HDF5 — that you
now have to keep aligned with your data by hand. And if you tried to add them as a
column to Parquet or Iceberg, you'd rewrite the whole table, exactly the write
amplification problem from earlier.

With Lance you just add the embeddings as a new column on the same table. It's
written to the table on disk — or object storage — and the dataloader reads it back
each pass, right alongside the image and the labels. So, no sidecar files, nothing to
keep in sync. The precompute technique here helps speedup the data loading, and Lance
makes it painless.
-->

---
class: flex flex-col justify-center
---

<Eyebrow>Up next · The workshop</Eyebrow>

# What we'll be walking through in code

<p class="lede">Training data preparation loop on a free Colab instance. One Lance table, going from raw bytes to a tuned adapter.</p>

<div class="wfrow">
  <div class="wf"><div class="wn">01</div><b>Download</b><span>curated Lance subset from HF</span></div>
  <div class="wf"><div class="wn">02</div><b>Explore</b><span>LanceDB — distributions + vector search</span></div>
  <div class="wf"><div class="wn">03</div><b>Benchmark</b><span>Lance vs Parquet reads</span></div>
  <div class="wf"><div class="wn">04</div><b>Fine-tune</b><span>QLoRA from precomputed columns</span></div>
  <div class="wf"><div class="wn">05</div><b>Evaluate</b><span>before / after accuracy</span></div>
</div>

<div class="callout" style="margin-top:22px;">
  We'll walk the <strong>prep pipeline</strong> that built it — ingest raw → curate the text-dense slice → backfill features → push to HF Hub.
</div>

<style>
.wfrow{display:grid; grid-template-columns:repeat(5,1fr); gap:14px; margin-top:22px;}
.wf{background:var(--bg-elev); border:1px solid var(--border); border-radius:12px; padding:16px 14px;}
.wf .wn{font-family:var(--font-mono,'JetBrains Mono'); font-size:12px; color:var(--accent);}
.wf b{display:block; font-size:16px; margin:6px 0 4px;}
.wf span{font-size:12.5px; color:var(--fg-muted); line-height:1.35;}
</style>

<!--
Here's the whole hands-on in five steps, all on one Lance table on free Colab:
download a curated subset from Hugging Face, explore it in LanceDB, benchmark Lance
against Parquet, fine-tune with QLoRA — that's 4-bit base weights plus small
trainable adapters — reading from the precomputed columns, and evaluate before
versus after.

And we'll also walk the prep pipeline that built the dataset: raw ingest, curate
the text-dense slice, backfill features, push to the Hub.

That's everything from the talk, in code. Let's get into it.
-->

---
layout: closing
---

## One open format, a multimodal lakehouse — <span class="gradient-text">to go from raw bytes to a trained model.</span>

<style>
.lance-closing h2 { font-size: 48px; line-height: 1.14; }
</style>

<p class="lede">
Let's open the notebook, and take any questions as they come along!
</p>

<div class="links">
  <span><span class="at">@</span>lancedb</span>
  <span>lancedb.com</span>
  <span>github.com/lancedb/lance</span>
</div>

<!--
So that's the whole idea in one line: instead of six systems glued together, one
open format that keeps the GPU fed and lets you evolve data without rewrites — raw
bytes to trained model.

Let's open the notebook. We can take questions on any specific concepts as we go alongm.
-->
