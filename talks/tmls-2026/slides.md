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

<style>
.lance-cover h1 { font-size: 52px; line-height: 1.12; }
</style>

::hero::

![Multimodal data illustration](./assets/hero.png)

<!--
Opening (30s). Welcome the room, thank TMLS. Frame in one sentence:
this 25 min is the WHY; the next 3 hours of the workshop are the HOW.
Pause after the title.
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
Deliver the headline slowly. The enemy in this talk is the STACK, not any one
format. Don't mention Lance or Parquet yet — establish the pain first. ~90s.
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
Walk left→center→right: petabytes of multimodal data, six systems to serve it,
GPUs idle. Then the three failures along the bottom. ~2 min. Land:
"You didn't buy a slow GPU. You built a data stack that can't keep it fed."
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
Pivot to the positive. Introduce Lance directly, on its OWN merits — no Parquet
contrast yet. "We're building Lance, it's open source, and here's what it does
for you." Name the layering honestly: Lance = the format (pylance SDK);
LanceDB = the multimodal retrieval library on top.
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
The "what is LanceDB" architecture slide. Bottom-up: Lance OSS format is the
substrate (Layer 01); managed tables (02) and the feature platform / Geneva (03)
write back to the SAME tables. Same bytes, three audiences. ~1.5 min, then zoom
into the format's properties on the next slide.
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
~2 min. Touch each card. The "50–100× vs Parquet" stat is the ONE soft contrast
we allow here (decided) — the full head-to-head lands in the benchmarks. Keep
the tone "here's what it gives you," not "vs them."
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
The heavyweight (~2.5 min). The 2D-growth diagram is the anchor: rows are routine
everywhere; columns are where other formats rewrite. Lance writes only the new
column as a fragment + version; compaction handles fragment size. Land the
PB-table / few-MB-write point — it's the one that makes people lean in.
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
2-min bridge. The demo uses LANCEDB (not pylance): lancedb + the Permutation API,
shuffle via the standard DataLoader. The point to land: image bytes + precomputed
vision features + labels live in ONE table, so a shuffled training batch and a
full-column scan (for curation/eval) read the same source — no feature store, no
join by id. Built on the TextVQA notebook. Then pivot to proof. ~2 min.
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
The money chart. ~2.5 min. Citation is on-slide: github.com/lancedb/training.

WHAT MFU MEANS — Model FLOPs Utilization: the fraction of the GPU's theoretical
peak compute (FLOPs/sec) the training run actually achieves. The standard way to
measure how efficiently a run uses the hardware. Higher = less idle silicon.

WHAT "DATA LOADING" IS — everything needed to hand the GPU its next batch:
reading bytes from storage (disk or S3), DECODING them (e.g. JPEG → pixels),
transforms/augmentation, collating into a tensor, copying to the GPU. Much of
this is CPU-bound — decode especially. While the CPU does that work, the GPU waits.

WHY THE CEILING IS ONLY ~41% (people will be surprised it's that low) — the top
bar uses synthetic data already in memory: no reads, no decode. So it isolates
the model + hardware limit. Even then you can't approach 100%, because peak FLOPs
is a theoretical number you never hit in practice: memory-bandwidth limits,
attention / softmax / normalization and other non-matmul ops, kernel-launch and
communication overhead. ~40% MFU on a big ViT is actually healthy. So 41% is THIS
workload's realistic ceiling, not 100%.

THE POINT — every bar below the ceiling is lower ONLY because of the data path:
the GPU sitting idle waiting on reads + decode. Lance gets within ~5% of the
ceiling; Parquet and raw S3 via boto fall far short. With a multi-GPU training
setup and a video training job, these differences become even larger.
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
The 9.1 samples/sec number is what matters ~2 min.

IF ASKED ABOUT "CACHED" — it's an in-memory cache of specific columns (a
keys_to_cache arg on the dataset), held in RAM and served from there each step.
Not OS page cache, not a local download. The point cuts FOR Lance:
  • HDF5 on S3 NEEDS the cache to be usable: 9.1 → 756 samples/s (still ~4× slower
    than Lance) — reading HDF5 over object storage is many tiny network reads.
  • Lance gains ~nothing from caching: S3 3,184 → 3,253 (flat); local 4,815 → 4,431
    (slightly slower — the RAM copy is just overhead for an already-efficient reader).
So Lance reads straight from S3 fast enough that you don't pre-stage data in RAM;
HDF5 only becomes viable on S3 if you do. The bars show Lance's plain no-cache
number vs HDF5's best-case cached number.
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
Proves evolution + one-file + indexes (no benchmark number — it's an agility story).
Speed keeps the GPU fed; evolution + search keep the iteration loop fast. ~2.5 min.
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
The editions slide (OSS-vs-managed axis — a different question than slide 5's
architecture). Three columns: Lance the format, LanceDB OSS the library (the
on-ramp, and what the workshop uses), Enterprise the managed platform that
separates storage from compute and distributes search/indexing/feature-eng
(Geneva is one slice). Factual, capability-first — not a pitch. ~1.5 min.
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
Workshop ramp 1/3 — task + why fine-tune, merged. The image carries the Q&A
examples (twa, domino), so no separate text rows. Two-stage model (image encoder
→ language model) introduced here for the next (efficiency) slide. ~2 min.
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
Workshop ramp 3/4 — the efficiency trick, no "cache" wording. Be explicit: the
image-encoder output is WRITTEN AS A COLUMN IN THE LANCE TABLE (on disk/object
store) and READ BACK from the table each pass. Bridge to the cheap-column-write
property (slide 7): a new column is an append, not a rewrite — unlike
Parquet/Iceberg — which is exactly why this is a no-brainer. ~1.5 min.
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
Segue 2 of 2. The hands-on runtime loop as 5 steps, plus a nod to walking the
prep pipeline. Then straight into the close. ~1 min.
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
Close on momentum, not "questions?". Recap in one breath: six-system stack →
one open format that keeps GPUs fed and lets teams evolve data without rewrites.
Then open the 5-min Q&A.
-->
