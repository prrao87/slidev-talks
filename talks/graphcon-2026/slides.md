---
theme: seriph
addons:
  - slidev-addon-lancedb
title: Multimodal Knowledge Graphs for Agents
info: GraphCon 2026 talk on fuzzy associations, graph facts, and multimodal
  evidence for agents.
canvasWidth: 1280
aspectRatio: 16/9
fonts:
  sans: Geist
  mono: Geist Mono
  weights: '300,400,500,600,700,800'
transition: slide-left
layout: cover
---

<Eyebrow>GraphCon · Seattle · July 25, 2026</Eyebrow>

# Multimodal Knowledge<br /><span class="gradient-text">Graphs for Agents.</span>

<p class="subtitle cover-subtitle">
Let your agents move between fuzzy associations, graph facts, and multimodal evidence.
</p>

<GraphConPresenter />

::hero::

  <div class="cover-visual">
    <img src="./assets/seattle-wireframe.svg" alt="Orange wire-frame illustration of the Seattle skyline and Mount Rainier" />
    <div class="cover-shade"></div>
    <GraphVectorInterchange mode="cover" class="cover-network" />
  </div>

<!--
Hi, and welcome to the world of multimodal knowledge graphs! Quick show of hands - how many of you have worked with graph databases and property graphs before?

And how many of you deal with multimodal data (images, video, audio, sensor traces, or anything that's not standard tabular data)?

Nice. Hopefully this talk is interesting. I'm Prashanth, I work as an AI Engineer at LanceDB. And this talk serves as a sequel to David Hughes' excellent talk from this morning. It blends the worlds of property graphs, which no doubt, lots of us here are familiar with, and hyperdimensional computing, which David talked about in the morning. Let's get started!
-->

---
layout: default
class: association-slide
---

<div class="association-content">
  <Eyebrow>How humans search</Eyebrow>
  <h1>
    We don't just look for exact matches.<br />
    <span class="gradient-text">We associate</span>, based on how things are connected.
  </h1>
  <p class="association-lede">
    The answers often depend on a relationship that was never recorded in the data.
  </p>
  <div class="association-flow">
    <div class="cue-grid">
      <div class="cue-card cue-photo">
        <img src="./assets/seattle.jpg" alt="Seattle skyline" />
        <span class="cue-label">IMAGE</span>
        <span class="cue-caption">a skyline</span>
      </div>
      <div class="cue-card cue-map">
        <span class="cue-label">PLACE</span>
        <svg viewBox="0 0 180 150" aria-label="Abstract map of coast and mountains">
          <path class="map-water" d="M0 0 H52 C78 20 42 43 67 65 C89 84 46 108 72 150 H0 Z" />
          <path class="map-road" d="M70 10 C118 38 92 82 158 132" />
          <path class="map-road secondary" d="M52 108 C88 92 116 94 171 55" />
          <path class="map-range" d="M73 62 L94 36 L109 55 L128 24 L157 63" />
          <circle class="map-pin-ring" cx="111" cy="89" r="11" />
          <circle class="map-pin" cx="111" cy="89" r="4" />
        </svg>
        <span class="cue-caption">coast + mountains</span>
      </div>
      <div class="cue-card cue-phrase">
        <span class="cue-label">LANGUAGE</span>
        <div class="phrase-stack">
          <span>Pacific coast</span>
          <span>mountains nearby</span>
          <span>people who visited</span>
        </div>
        <span class="cue-caption">fuzzy intent</span>
      </div>
    </div>
    <div class="flow-arrow" aria-hidden="true">
      <span></span>
      <i></i>
    </div>
    <div class="association-board">
      <span class="board-label">ASSOCIATION</span>
      <svg class="board-lines" viewBox="0 0 310 190" aria-hidden="true">
        <g fill="none" stroke="#ff734a" stroke-opacity="0.52" stroke-width="1.6">
          <path d="M58 51 L153 90 L250 48" />
          <path d="M58 51 L83 148 L153 90 L238 146" />
          <path d="M250 48 L238 146 L153 90" />
        </g>
      </svg>
      <span class="board-node node-photo">skyline</span>
      <span class="board-node node-coast">Pacific</span>
      <span class="board-node node-city">Seattle</span>
      <span class="board-node node-mountain">mountains</span>
      <span class="board-node node-person">people</span>
      <span class="board-result">relationships our<br />minds <i>intuitively</i> inferred</span>
    </div>
  </div>
  <p class="association-question"><em>“Persons who visited cities on the Pacific coast with mountains nearby.”</em></p>
</div>

<style>
.slidev-layout .lede,
.slidev-layout .association-lede {
  font-size: 20px;
}

.lance-cover .left {
  gap: 22px;
}

.lance-cover .left h1 {
  max-width: 560px;
  font-size: 58px !important;
  line-height: 1.02 !important;
}

.cover-subtitle {
  max-width: 520px !important;
}

.cover-hero-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 560px;
}

.cover-visual {
  position: relative;
  width: 560px;
  height: 330px;
  overflow: hidden;
  border: 1px solid rgba(240, 231, 220, 0.14);
  border-radius: 22px;
  background: #0f0d0b;
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.45), 0 0 80px rgba(255, 115, 74, 0.10);
}

.cover-visual > img {
  width: 100% !important;
  height: 100%;
  max-width: none !important;
  object-fit: cover;
  filter: saturate(0.75) contrast(1.08) brightness(0.76);
  transform: scale(1.04);
}

.cover-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(15, 13, 11, 0.10), rgba(15, 13, 11, 0.44)),
    linear-gradient(90deg, rgba(15, 13, 11, 0.38), transparent 48%);
}

.cover-network {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.cover-caption {
  position: absolute;
  left: 22px;
  right: 22px;
  bottom: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 16px;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: rgba(240, 231, 220, 0.64);
}

.cover-caption-place {
  color: #ff9e80;
  font-weight: 600;
}

.slidev-layout.association-slide {
  padding: 92px 84px 54px;
}

.association-content {
  height: 100%;
}

.association-content h1 {
  margin: 12px 0 8px;
  max-width: 1000px;
  font-size: 42px;
  line-height: 1.12;
  letter-spacing: -0.025em;
  font-weight: 550;
}

.association-lede {
  margin: 0;
  line-height: 1.45;
}

.association-question {
  margin: 16px auto 0;
  max-width: 820px;
  color: rgba(240, 231, 220, 0.96);
  font-size: 22px;
  font-weight: 500;
  line-height: 1.4;
  text-align: center;
}

.association-flow {
  display: grid;
  grid-template-columns: minmax(0, 1.65fr) 52px minmax(285px, 0.8fr);
  gap: 20px;
  align-items: stretch;
  height: 222px;
  margin-top: 28px;
}

.cue-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.cue-card,
.association-board {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-strong);
  border-radius: 14px;
  background: rgba(15, 13, 11, 0.72);
}

.cue-card::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: inset 0 -62px 58px rgba(15, 13, 11, 0.85);
  pointer-events: none;
}

.cue-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.72) contrast(1.08);
}

.cue-label,
.board-label {
  position: absolute;
  z-index: 3;
  top: 13px;
  left: 14px;
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.16em;
  color: var(--accent-soft);
}

.cue-caption {
  position: absolute;
  z-index: 3;
  left: 14px;
  bottom: 13px;
  font-size: 16px;
  font-weight: 500;
  color: var(--fg);
}

.cue-map {
  background: linear-gradient(145deg, #181a22, #111015 72%);
}

.cue-map svg {
  position: absolute;
  inset: 24px 4px 30px;
  width: calc(100% - 8px);
  height: calc(100% - 54px);
}

.map-water { fill: rgba(67, 117, 152, 0.28); }
.map-road { fill: none; stroke: rgba(240, 231, 220, 0.30); stroke-width: 2; }
.map-road.secondary { stroke-width: 1.2; stroke-dasharray: 4 4; }
.map-range { fill: none; stroke: rgba(255, 158, 128, 0.55); stroke-width: 1.7; }
.map-pin-ring { fill: rgba(255, 115, 74, 0.12); stroke: #ff734a; stroke-width: 1.5; }
.map-pin { fill: #ff734a; }

.cue-phrase {
  padding: 44px 14px 34px;
  background: linear-gradient(145deg, rgba(42, 36, 30, 0.9), rgba(15, 13, 11, 0.9));
}

.phrase-stack {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
}

.phrase-stack span {
  border: 1px solid rgba(255, 115, 74, 0.23);
  border-radius: 999px;
  padding: 5px 9px;
  background: rgba(255, 115, 74, 0.08);
  color: var(--fg);
  font-size: 13px;
  white-space: nowrap;
}

.flow-arrow {
  position: relative;
  display: flex;
  align-items: center;
}

.flow-arrow span {
  width: 34px;
  height: 1px;
  margin-left: 3px;
  background: linear-gradient(90deg, rgba(255, 115, 74, 0.18), #ff734a);
}

.flow-arrow i {
  width: 9px;
  height: 9px;
  margin-left: -6px;
  border-top: 1px solid #ff734a;
  border-right: 1px solid #ff734a;
  transform: rotate(45deg);
}

.association-board {
  background:
    linear-gradient(rgba(240, 231, 220, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(240, 231, 220, 0.025) 1px, transparent 1px),
    linear-gradient(145deg, rgba(32, 27, 22, 0.92), rgba(15, 13, 11, 0.96));
  background-size: 28px 28px, 28px 28px, 100% 100%;
}

.board-lines {
  position: absolute;
  left: 4px;
  right: 4px;
  bottom: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 32px);
}

.board-node {
  position: absolute;
  z-index: 2;
  padding: 5px 9px;
  border: 1px solid rgba(240, 231, 220, 0.15);
  border-radius: 7px;
  background: rgba(15, 13, 11, 0.92);
  color: var(--fg-muted);
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 11.5px;
}

.node-photo { left: 18px; top: 48px; }
.node-coast { right: 17px; top: 46px; }
.node-city {
  left: 50%;
  top: 86px;
  transform: translateX(-50%);
  border-color: rgba(255, 115, 74, 0.52);
  color: var(--accent-soft);
}
.node-mountain { left: 25px; bottom: 21px; }
.node-person { right: 24px; bottom: 21px; }

.board-result {
  position: absolute;
  z-index: 3;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  width: 96px;
  text-align: center;
  color: var(--fg);
  font-size: 12.5px;
  line-height: 1.25;
}
</style>

<!--
Before we talk about graphs, vectors, or HDC, I want to start with something we, as humans, do almost automatically: we associate.

Say I ask you the question "which persons visited cities on the pacific coast with mountains nearby?". To answer this, your mind begins joining those pieces together. You don't approach it like a database, in terms of schemas.

You use partial signals from an image, likely a memory of the place, and the language in the query, and you form a useful assoiation between all the connected entities.

So let's keep this example in mind: “Persons who visited cities on the Pacific coast
with mountains nearby.” It sounds simple, but it's a query that combines
visual evidence, geographic meaning, and one factual graph relationship.
-->

---
layout: default
class: city-choice-slide
---

<div class="city-choice-content">
  <Eyebrow>A fuzzy question</Eyebrow>
  <h1>Which city fits this query?</h1>
  <p class="city-query"><em>"Cities on the Pacific coast with mountains nearby.”</em></p>
  <div class="city-image-grid">
    <div class="city-image-card">
      <img src="./assets/seattle.jpg" alt="Seattle skyline and Mount Rainier" />
      <span class="candidate-label">CANDIDATE 01</span>
      <span class="city-helper">Seattle, WA</span>
    </div>
    <div class="city-image-card">
      <img src="./assets/salt-lake-city.jpg" alt="Salt Lake City skyline and mountains" />
      <span class="candidate-label">CANDIDATE 02</span>
      <span class="city-helper">Salt Lake City, UT</span>
    </div>
    <div class="city-image-card">
      <img src="./assets/nyc.jpg" alt="New York City skyline" />
      <span class="candidate-label">CANDIDATE 03</span>
      <span class="city-helper">New York City, NY</span>
    </div>
  </div>
  <div v-click class="city-reveal-grid">
    <div class="city-reveal">
      <div class="feature-chips"><span>mountains</span><span>waterfront</span><span>pacific coast</span></div>
    </div>
    <div class="city-reveal">
      <div class="feature-chips"><span>mountains</span><span>nature access</span><span>inland</span></div>
    </div>
    <div class="city-reveal">
      <div class="feature-chips"><span>dense skyline</span><span>riverfront</span><span>urban energy</span></div>
    </div>
  </div>
  <p class="city-prompt">What evidence did your mind combine before you chose?</p>
</div>

<style>
.slidev-layout.city-choice-slide {
  padding: 88px 84px 46px;
}

.city-choice-content h1 {
  margin: 10px 0 5px;
  font-size: 40px;
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.city-query {
  margin: 0;
  color: rgba(240, 231, 220, 0.86);
  font-size: 19px;
  line-height: 1.4;
}

.city-image-grid,
.city-reveal-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.city-image-grid {
  height: 236px;
  margin-top: 20px;
}

.city-image-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-strong);
  border-radius: 14px;
  background: var(--bg-deep);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.24);
}

.city-image-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 13, 11, 0.05), rgba(15, 13, 11, 0.30));
  pointer-events: none;
}

.city-image-card img {
  width: 100%;
  height: calc(100% - 34px);
  object-fit: cover;
  filter: saturate(0.82) contrast(1.04);
}

.city-helper {
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 13px;
  border-top: 1px solid var(--border);
  background: rgba(15, 13, 11, 0.96);
  color: rgba(240, 231, 220, 0.88);
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 16px;
  letter-spacing: 0.04em;
}

.candidate-label {
  position: absolute;
  z-index: 2;
  top: 13px;
  left: 14px;
  border: 1px solid rgba(255, 115, 74, 0.30);
  border-radius: 999px;
  padding: 5px 9px;
  background: rgba(15, 13, 11, 0.78);
  color: var(--accent-soft);
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.13em;
}

.city-reveal-grid {
  margin-top: 10px;
}

.city-reveal {
  min-height: 50px;
  border: 1px solid var(--border);
  border-radius: 11px;
  padding: 8px 12px;
  background: rgba(32, 27, 22, 0.70);
}

.feature-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 0;
}

.feature-chips span {
  border-radius: 999px;
  padding: 3px 7px;
  background: rgba(255, 115, 74, 0.09);
  color: rgba(240, 231, 220, 0.72);
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 14px;
}

.city-prompt {
  margin: 16px 0 0;
  color: rgba(240, 231, 220, 0.96);
  font-size: 24px;
  font-weight: 550;
  text-align: center;
}
</style>

<!--
Let's extend that a bit more: We have three cities, Seattle, Salt Lake City, and New York. We're looking to retrieve on the following: “Cities on the Pacific coast with mountains nearby.”

It shouldn't take more than a second to come up with the answer, between these three options.

Hopefully, most of us chose Seattle. But notice what happened in your head before
you answered. Your mind combined multiple kinds of evidence. You probably didn't match one exact phrase against one stored
field. We intuitively know that Seattle has mountains nearby, it has a waterfront, and it is on the Pacific coast. Even if we didn't have those facts memorized, we can observe that from the image evidence. Eac of these signals reinforce, or compliment one another.

In this example, Salt Lake City is an interesting addition, because it't not random noise. It does strongly matches mountains and access to nature, but it is inland. New York has a dense
skyline and plenty of waterfront, but it does not fit the Pacific-and-mountains combination. So there are degrees of association here.

This distinction will matter later. If we had a dataset of these three cities, we fully expect Seattle to rank highly, but we'd also want the representation we stored, to preserve why Salt Lake City is a plausible partial match.

We looked at this from a human perspective, but nowadays, it's agents doing this kind of search and retrieval for us on a daily basis. Just like humans, it can be very powerful if we enable agents to construct the answer from several individually weak but compatible signals.

Next, let's look at the small graph and multimodal dataset we will use to reproduce that behavior and introduce the idea of associative search.
-->

---
layout: default
class: dataset-schema-slide
---

<div class="dataset-schema-content">
  <Eyebrow>The dataset</Eyebrow>
  <h1>A simple graph, made <span>multimodal.</span></h1>
  <p class="lede">Four people, three cities, one relationship table, with a skyline image of every city.</p>
  <div class="dataset-schema-grid">
    <div class="dataset-summary">
      <div class="summary-heading"><span>IN THIS DEMO</span></div>
      <div class="dataset-stats">
        <div><strong>4</strong><span>Person<br/>(nodes)</span></div>
        <div><strong>3</strong><span>Location<br/>(nodes)</span></div>
        <div><strong>4</strong><span>VISITED<br/>(edges)</span></div>
      </div>
      <div class="dataset-rows">
        <div><b>Maya · Robby</b><i>-[:VISITED]-&gt;</i><strong>Seattle</strong></div>
        <div><b>Elena</b><i>-[:VISITED]-&gt;</i><strong>Salt Lake City</strong></div>
        <div><b>Andre</b><i>-[:VISITED]-&gt;</i><strong>New York</strong></div>
      </div>
      <div class="mini-lance-table">
        <div class="mini-table-head"><span>IMAGE_PATH</span><span>NAME</span><span>DESCRIPTION</span></div>
        <div class="mini-table-row">
          <div class="mini-asset"><img src="./assets/seattle.jpg" alt="Seattle skyline"/><small>img/seattle.jpg</small></div>
          <strong>Seattle</strong>
          <p class="mini-description">Pacific Northwest city on Puget Sound with Cascade and Olympic mountain views.</p>
        </div>
      </div>
    </div>
    <div class="schema-card">
      <div class="schema-heading"><span>PROPERTY-GRAPH CONTEXT</span><small>gray = plausible larger schema, not present in this dataset</small></div>
      <svg viewBox="0 0 660 350" role="img" aria-label="Graph schema highlighting Person VISITED Location with grayed Company and Country context">
        <defs>
          <marker id="active-schema-arrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M0,0 L0,8 L9,4 z" fill="#ff734a"/></marker>
          <marker id="ghost-schema-arrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M0,0 L0,8 L9,4 z" fill="#81766d"/></marker>
        </defs>
        <g class="ghost-schema">
          <path d="M145 143 C195 106 242 86 275 80" marker-end="url(#ghost-schema-arrow)"/>
          <path d="M490 213 C524 226 541 240 552 251" marker-end="url(#ghost-schema-arrow)"/>
          <text x="218" y="96">WORKS_AT</text>
          <text x="531" y="224">LOCATED_IN</text>
          <g transform="translate(275 23)">
            <circle cx="55" cy="55" r="55"/>
            <text x="55" y="60" class="node-type">Company</text>
          </g>
          <g transform="translate(548 205)">
            <circle cx="55" cy="55" r="55"/>
            <text x="55" y="60" class="node-type">Country</text>
          </g>
        </g>
        <g class="active-schema">
          <path d="M170 190 C240 190 312 190 385 190" marker-end="url(#active-schema-arrow)"/>
          <rect x="214" y="165" width="128" height="31" rx="7" class="edge-chip"/>
          <text x="278" y="185" class="edge-text">VISITED</text>
          <text x="278" y="217" class="edge-helper">conceptually: has visited</text>
          <g transform="translate(33 130)">
            <circle cx="82" cy="60" r="55"/>
            <text x="82" y="67" class="active-type">Person</text>
          </g>
          <g transform="translate(358 130)">
            <circle cx="82" cy="60" r="55"/>
            <text x="82" y="58" class="active-type">Location</text>
            <text x="82" y="80" class="active-subtype">(city)</text>
          </g>
        </g>
        <g class="schema-legend" transform="translate(42 328)">
          <line x1="0" y1="0" x2="34" y2="0" class="active-line"/>
          <text x="44" y="5">loaded demo path</text>
          <line x1="205" y1="0" x2="239" y2="0" class="ghost-line"/>
          <text x="249" y="5">larger graph context</text>
        </g>
      </svg>
    </div>
  </div>
  <p class="dataset-takeaway">This is the complete data we will encode: <strong>people, city locations, one relationship type, and multimodal evidence.</strong></p>
</div>

<style>
.slidev-layout.dataset-schema-slide{padding:88px 84px 44px}
.dataset-schema-content h1{margin:10px 0 6px;font-size:40px;line-height:1.1;letter-spacing:-.025em}
.dataset-schema-content h1>span{color:var(--accent-soft)}
.dataset-schema-content>.lede{margin:0;color:rgba(240,231,220,.88);font-size:21px}
.dataset-schema-grid{display:grid;grid-template-columns:430px 1fr;gap:22px;height:400px;margin-top:23px}
.dataset-summary,.schema-card{border:1px solid var(--border-strong);border-radius:15px;background:rgba(15,13,11,.76);overflow:hidden}
.summary-heading,.schema-heading{display:flex;justify-content:space-between;align-items:center;height:57px;padding:0 17px;border-bottom:1px solid var(--border)}
.summary-heading span,.schema-heading span{color:var(--accent-soft);font-size:12px;font-weight:750;letter-spacing:.09em}
.summary-heading strong{color:rgba(240,231,220,.75);font-size:13px}
.schema-heading small{color:rgba(240,231,220,.56);font-size:12px}
.dataset-stats{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid var(--border)}
.dataset-stats>div{padding:6px 8px;text-align:center}
.dataset-stats>div+div{border-left:1px solid var(--border)}
.dataset-stats strong{display:block;color:var(--accent-soft);font-size:23px}
.dataset-stats span{display:block;margin-top:2px;color:rgba(240,231,220,.66);font:11px 'Geist Mono',ui-monospace,monospace}
.dataset-rows{padding:4px 17px}
.dataset-rows>div{display:grid;grid-template-columns:1fr 144px 1fr;align-items:center;padding:4px 0}
.dataset-rows>div+div{border-top:1px solid var(--border)}
.dataset-rows b,.dataset-rows strong{font-size:13px}
.dataset-rows b{color:rgba(240,231,220,.78)}
.dataset-rows strong{color:var(--fg)}
.dataset-rows i{color:var(--accent-soft);font:12px 'Geist Mono',ui-monospace,monospace;font-style:normal;text-align:center}
.mini-lance-table{margin:4px 12px 10px;border:1px solid rgba(255,115,74,.5);border-radius:9px;overflow:hidden;background:rgba(25,18,15,.72)}
.mini-table-head,.mini-table-row{display:grid;grid-template-columns:138px 76px minmax(0,1fr)}
.mini-table-head{min-height:23px;border-bottom:1px dashed var(--border)}
.mini-table-head span{display:flex;align-items:center;min-width:0;padding:6px 10px;box-sizing:border-box;color:rgba(240,231,220,.42);font:10px 'Geist Mono',ui-monospace,monospace;letter-spacing:.07em}
.mini-table-head span+span,.mini-table-row>*+*{border-left:1px dashed var(--border)}
.mini-table-row>*{min-width:0;box-sizing:border-box}
.mini-table-row{height:90px}
.mini-table-row>strong{display:flex;align-items:center;padding:10px;color:var(--fg);font-size:14px}
.mini-asset{display:grid;grid-template-columns:62px 1fr;align-items:center;gap:7px;padding:10px}
.mini-asset img{width:58px;height:58px;border:1px solid var(--border-strong);border-radius:6px;object-fit:cover}
.mini-asset small{color:rgba(240,231,220,.58);font:9px/1.3 'Geist Mono',ui-monospace,monospace;overflow-wrap:anywhere}
.mini-description{display:flex;align-items:center;margin:0;padding:10px;color:rgba(240,231,220,.72);font-size:10px;line-height:1.35}
.schema-card svg{display:block;width:100%;height:343px}
.ghost-schema path{fill:none;stroke:#81766d;stroke-width:1.7;stroke-dasharray:6 6;opacity:.42}
.ghost-schema circle{fill:rgba(129,118,109,.055);stroke:#81766d;stroke-width:1.5;stroke-dasharray:5 5;opacity:.52}
.ghost-schema>text{fill:#81766d;font:12px 'Geist Mono',ui-monospace,monospace;text-anchor:middle;opacity:.58}
.node-type{fill:rgba(240,231,220,.48);font:600 14px 'Geist',sans-serif;text-anchor:middle}
.node-state{fill:#81766d;font:11px 'Geist Mono',ui-monospace,monospace;text-anchor:middle}
.active-schema>path{fill:none;stroke:#ff734a;stroke-width:3}
.active-schema circle{fill:rgba(255,115,74,.08);stroke:#ff8b68;stroke-width:2}
.edge-chip{fill:#241914;stroke:rgba(255,115,74,.52)}
.edge-text{fill:#ff9e80;font:700 12px 'Geist Mono',ui-monospace,monospace;text-anchor:middle}
.edge-helper{fill:rgba(240,231,220,.58);font:12px 'Geist',sans-serif;text-anchor:middle}
.active-type{fill:#f0e7dc;font:700 21px 'Geist',sans-serif;text-anchor:middle}
.active-subtype{fill:#ff9e80;font:13px 'Geist Mono',ui-monospace,monospace;text-anchor:middle}
.active-samples{fill:rgba(240,231,220,.68);font:11px 'Geist',sans-serif;text-anchor:middle}
.schema-legend text{fill:rgba(240,231,220,.58);font:12px 'Geist',sans-serif}
.active-line{stroke:#ff734a;stroke-width:3}
.ghost-line{stroke:#81766d;stroke-width:2;stroke-dasharray:5 5;opacity:.55}
.dataset-takeaway{margin:19px 0 0;color:rgba(240,231,220,.96);font-size:24px;font-weight:500;text-align:center}
.dataset-takeaway strong{color:var(--accent-soft)}
</style>

<!--
The data we're looking at is deliberately small, mainly because the focus is on the methodology. We have four persons, three city locations, and four
recorded visits of those persons to those locations. Maya and Robby visited Seattle, Elena visited Salt Lake City, and Andre visited New York. Keeping the graph this small means we can trace every transformation without hiding the important ideas behind the complexity.

The property graph on the right should look quite familiar:
a Person connected to a Location by a Visited relationship. The gray Company
and Country nodes are there just to show how this is how such a subgraph could sit inside a larger, more realistic property graph. We won’t need them for this example, so we'll just focus on the person -> visited -> Location relationship.

The multimodal aspect of this dataset is in the Location data. Each city has the usual structured fields, but it also carries an image and a natural-language description, which we'll look at more in the upcoming slides.
So the visual evidence is part of the same location entity that's in the graph.

This gives us a useful separation. The Visited relationship records a fact:
Person visited a Location. The image and other metadata contain additional features of what a location is like: for example, Seattle comes with a coastline, mountains, waterfront, and so on.

The next question is whether storing this kind of data can help answer the fuzzy query we just asked.
-->

---
layout: default
class: schema-gap-slide
---

<div class="schema-gap-content">
  <Eyebrow>Retrieving facts when the question is fuzzy</Eyebrow>
  <h1>A knowledge graph doesn't have the answer (yet)</h1>
  <p class="lede">"Open world problem": The graph is never <i>truly</i> complete (relationships are missing).</p>
  <div class="schema-gap-grid">
    <div class="schema-card">
      <div class="card-heading"><span>Location</span><small>structured graph fields · simplified</small></div>
      <div class="schema-row"><code>name</code><span>Seattle</span></div>
      <div class="schema-row"><code>region</code><span>pacific_northwest</span></div>
      <div class="schema-row schema-present"><code>timezone</code><span>pacific</span></div>
      <div class="ghost-row"><code>pacific_coast</code><span>NOT MODELED</span></div>
      <div class="ghost-row"><code>mountains</code><span>NOT MODELED</span></div>
    </div>
    <div class="cypher-card">
      <div class="card-heading"><span>Exact Cypher attempt</span><small>valid pattern · missing predicates</small></div>
      <pre class="cypher-code"><span class="cy-kw">MATCH</span> (p:<span class="cy-type">Person</span>)-[:<span class="cy-rel">VISITED</span>]-&gt;(loc:<span class="cy-type">Location</span>)
<span class="cy-kw">WHERE</span> loc.<span class="cy-missing">pacific_coast</span> = true
  <span class="cy-kw">AND</span> loc.<span class="cy-missing">mountains</span> = true
<span class="cy-kw">RETURN</span> p.name, loc.name</pre>
      <div class="empty-result"><span class="empty-icon">∅</span><div><strong>0 rows</strong><small>Both properties evaluate as missing.</small></div></div>
    </div>
  </div>
  <p class="bottom-takeaway">The evidence exists, <strong> but the schema never named the relationship.</strong></p>
</div>

<style>
.slidev-layout.schema-gap-slide,
.slidev-layout.two-spaces-slide {
  padding: 88px 84px 48px;
}

.schema-gap-content h1,
.two-spaces-content h1 {
  margin: 10px 0 6px;
  font-size: 40px;
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.schema-gap-content > .lede,
.two-spaces-content > .lede {
  margin: 0;
  color: rgba(240, 231, 220, 0.88);
  font-size: 21px;
}

.schema-gap-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 22px;
  height: 322px;
  margin-top: 25px;
}

.schema-card,
.cypher-card {
  overflow: hidden;
  border: 1px solid var(--border-strong);
  border-radius: 14px;
  background: rgba(15, 13, 11, 0.76);
}

.card-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 56px;
  padding: 0 18px;
  border-bottom: 1px solid var(--border);
  background: rgba(42, 36, 30, 0.55);
}

.card-heading > span {
  color: var(--fg);
  font-size: 19px;
  font-weight: 600;
}

.card-heading small {
  color: rgba(240, 231, 220, 0.66);
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 13px;
}

.schema-row,
.ghost-row {
  display: grid;
  grid-template-columns: 0.9fr 1.35fr;
  align-items: center;
  min-height: 50px;
  padding: 0 18px;
  border-bottom: 1px solid var(--border);
}

.schema-row code,
.ghost-row code {
  justify-self: start;
  width: fit-content;
  color: rgba(240, 231, 220, 0.82);
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 16px;
}

.schema-row > span {
  color: rgba(240, 231, 220, 0.76);
  font-size: 17px;
}

.schema-present {
  background: rgba(137, 170, 121, 0.06);
}

.schema-present > span {
  color: #b9cfac;
}

.ghost-row {
  margin: 7px 12px 0;
  min-height: 42px;
  padding: 0 10px;
  border: 1px dashed rgba(255, 115, 74, 0.42);
  border-radius: 8px;
  background: rgba(255, 115, 74, 0.055);
}

.ghost-row + .ghost-row {
  margin-top: 7px;
}

.ghost-row code {
  color: var(--accent-soft);
}

.ghost-row span {
  justify-self: end;
  color: rgba(255, 158, 128, 0.82);
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 13px;
  letter-spacing: 0.08em;
}

.cypher-code {
  margin: 17px 18px 12px !important;
  padding: 17px 18px !important;
  border-radius: 10px !important;
  color: rgba(240, 231, 220, 0.88);
  font-size: 17px !important;
  line-height: 1.65 !important;
}

.cy-kw { color: #ff9e80; }
.cy-type { color: #c5b78f; }
.cy-rel { color: #a9c69a; }
.cy-missing {
  color: #ff9e80;
  text-decoration: none;
}

.empty-result {
  display: flex;
  align-items: center;
  gap: 13px;
  margin: 0 18px;
  color: var(--fg);
}

.empty-icon {
  color: var(--accent);
  font-size: 34px;
  line-height: 1;
}

.empty-result strong {
  display: block;
  color: var(--fg);
  font-size: 18px;
}

.empty-result small {
  display: block;
  margin-top: 2px;
  color: rgba(240, 231, 220, 0.70);
  font-size: 14px;
}

.bottom-takeaway {
  margin: 22px 0 0;
  color: rgba(240, 231, 220, 0.96);
  font-size: 24px;
  font-weight: 500;
  text-align: center;
}

.bottom-takeaway strong {
  color: var(--accent-soft);
}
</style>

<!--
Let’s try to answer the question using the graph alone.

Every knowledge graph suffers from the open world problem. The graph can only capture facts that the human designer chose to model. And a graph is never, really, "complete". There's always stuff missing.

The Cypher query on the right shows how we can start with a Person, follow
a Visited relationship, match on features, and arrive at a Location. The traversal isn’t the problem. In this case, nobody decided to store the features "pacific coase" or "mountains"  when the graph was designed. So if Seattle isn't named, we don't get a match.

We could keep adding more properties every time a new question appears. But
that becomes brittle very quickly, especially when the evidence is already
sitting in images and descriptions and users can phrase the same intent in many different ways. The queries we ask in the real world rarely tend to follow a pattern.

It's not that graphs + vector search over the properties can’t help answer fuzzy questions. But even with vector search, we can only go so far as capturing the semantics of features in text or image properties that already exist. Essentially, the GraphRAG pattern we've all gotten so familiar with.

Alright! We're now ready to explore a different way of doing search using associative candidates from the evidence we already have, while preserving the graph as the source of factual relationships.
-->

---
layout: default
class: spaces-are-graphs-slide
---

<div class="spaces-are-graphs-content">
  <Eyebrow>The bridge</Eyebrow>
  <h1>Really high-dimensional spaces <span>are like graphs.</span></h1>
  <p class="lede">The goal: blend the intuition of vectors with the facts of graphs.</p>
  <GraphVectorInterchange class="spaces-interchange-animation" />
  <div class="spaces-graphs-meanings">
    <p class="vector-meaning"><strong>High-dimensional vector space:</strong><span>What the model <em>feels</em> <small>(probabilistic/intuitive)</small></span></p>
    <p class="graph-meaning"><strong>Graphs:</strong><span>What we <em>know</em> from data <small>(deterministic/factual)</small></span></p>
  </div>
</div>

<style>
.slidev-layout.spaces-are-graphs-slide,.slidev-layout.hdc-overview-slide{padding:88px 84px 44px}
.spaces-are-graphs-content h1,.hdc-overview-content h1{margin:10px 0 6px;font-size:40px;line-height:1.1;letter-spacing:-.025em}
.spaces-are-graphs-content h1 span,.hdc-overview-content h1 span{color:var(--accent-soft);font-style:italic}
.spaces-are-graphs-content>.lede,.hdc-overview-content>.lede{margin:0;color:rgba(240,231,220,.88);font-size:21px}
.spaces-interchange-animation{margin-top:22px}
.spaces-graphs-meanings{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin:16px 34px 0}
.spaces-graphs-meanings p{margin:0;text-align:center;line-height:1.22}
.spaces-graphs-meanings strong{display:block;margin-bottom:4px;font:650 14px/1.1 'Geist Mono',ui-monospace,monospace;letter-spacing:.035em}
.spaces-graphs-meanings span{display:block;color:rgba(240,231,220,.96);font-size:20px;font-weight:500;white-space:nowrap}
.spaces-graphs-meanings em{font-style:italic}
.spaces-graphs-meanings small{color:rgba(240,231,220,.62);font-size:15px;font-weight:450}
.vector-meaning strong{color:#72ddff}.graph-meaning strong{color:#ff956f}
.hdc-overview-takeaway{margin:18px 0 0;color:rgba(240,231,220,.96);font-size:24px;font-weight:500;text-align:center}.hdc-overview-takeaway strong{color:var(--accent-soft)}
</style>

<!--
To build that bridge, I want to start with a useful mental model: a graph is a
discrete representation of something we can also express in a continuous, very
high-dimensional space.

On the right, we have the familiar graph: a finite set of nodes and edges. On
the left, the mesh is a three-dimensional projection of a space that might
actually have ten thousand dimensions or more. And importantly, this isn’t just
an embedding space produced from the text properties on those nodes. This is a
hypervector space, which we’ll define more rigorously in the next few slides.

As the two representations move together, the graph isn’t being placed inside
the space as a discrete graph that stays intact. The information in the graph is being
re-encoded. A node, a relationship, or a larger piece of graph structure can
all be represented as hypervectors and then composed using algebra.

Consider two nodes from our graph that represent very different concepts: a Person and a
Location. In the animation, those nodes move to a common origin and become two
arrows. The direction of each arrow carries its identity. The Person
hypervector points in one direction, while the Location hypervector points in
a very different, nearly orthogonal direction. That separation is what lets us
distinguish unrelated concepts, even when thousands of them share the same
space.

When we weight and combine hypervectors, the size of a concept’s contribution
can express how strongly it’s present relative to other concepts. But the
atomic hypervectors themselves are typically given the same norm, so it’s
primarily their direction, rather than their raw length, that tells us what
they represent.

The edges aren’t lost either. We can encode relationships and roles, and we can
combine many of them into a single distributed representation while retaining
enough structure to compare or recover what was encoded. We’ll see the actual
operations that make that possible shortly.

So the graph and this projected manifold are modeling the same underlying data
in two different ways. One is discrete and explicit. The other is continuous
and distributed. The graph is very good at stating what we know as fact, while
the high-dimensional representation gives us a way to work with softer,
associative evidence.

That connection brings us to the fascinating topic at the center of this talk:
hyperdimensional computing, or HDC.
-->

---
layout: default
class: hdc-overview-slide
---

<div class="hdc-overview-content">
  <Eyebrow>Introducing Hyper-Dimensional Computing (HDC)</Eyebrow>
  <h1>HDC represents concepts as <span>very wide vectors.</span></h1>
  <p class="lede">A <strong>hypervector</strong> is simply a high-dimensional vector (10K+ or more dimensions), generated by an <i>encoder</i></p>
  <div class="hdc-simple-layout">
    <div class="hypervector-explainer">
      <span>ONE CONCEPT</span>
      <strong>Seattle</strong>
      <div class="simple-hv-strip" aria-label="A long distributed hypervector pattern"></div>
      <p><b>often 10,000 values</b><br/>working together as one representation</p>
    </div>
    <ul class="hdc-simple-steps">
      <li><b>Encode.</b> Give each concept, such as <code>Person</code>, <code>Seattle</code>, or <code>VISITED</code>, its own long, reproducible hypervector.</li>
      <li><b>Compose.</b> Use simple algebraic operations to combine them, producing new hypervectors that can represent a fact or a set of facts.</li>
      <li><b>Retrieve.</b> Compare hypervectors by similarity. The closest ones point toward related concepts and the most relevant candidate answers.</li>
    </ul>
  </div>
  <p class="hdc-overview-takeaway">HDC turns symbolic structure into <strong>geometry we can search, using algebra.</strong></p>
  <div class="hdc-overview-sources" aria-label="Further reading">
    <a href="https://redwood.berkeley.edu/wp-content/uploads/2018/01/kanerva2009hyperdimensional.pdf" target="_blank" rel="noopener"><b>FOUNDATION</b><span>Kanerva · “Hyperdimensional Computing” · Cognitive Computation, 2009</span></a>
    <a href="https://arxiv.org/abs/2106.05268" target="_blank" rel="noopener"><b>PRACTITIONER LENS</b><span>Kleyko et al. · “Vector Symbolic Architectures as a Computing Framework for Emerging Hardware” · Proc. IEEE, 2022</span></a>
  </div>
</div>

<style>
.hdc-overview-content>.lede strong{color:var(--accent-soft)}
.hdc-simple-layout{display:grid;grid-template-columns:340px 1fr;gap:42px;align-items:center;height:350px;margin-top:22px}
.hypervector-explainer{display:flex;flex-direction:column;justify-content:center;height:292px;padding:28px;border:1px solid var(--border-strong);border-radius:15px;background:linear-gradient(145deg,rgba(13,38,53,.88),rgba(15,13,11,.82))}
.hypervector-explainer>span{color:#7bd8ff;font-size:13px;font-weight:750;letter-spacing:.1em}
.hypervector-explainer>strong{margin-top:12px;color:var(--fg);font-size:30px}
.simple-hv-strip{height:72px;margin-top:24px;border-radius:8px;background-size:52px 72px;background-image:linear-gradient(90deg,#76c8dc 0 12%,#294e63 12% 25%,#a7d4c0 25% 39%,#6a79a6 39% 52%,#d6b6cd 52% 67%,#5cb5ca 67% 81%,#8d9bca 81%);box-shadow:0 0 28px rgba(61,190,230,.13)}
.hypervector-explainer p{margin:22px 0 0;color:rgba(240,231,220,.68);font-size:17px;line-height:1.35;text-align:center}.hypervector-explainer p b{color:var(--accent-soft);font-size:19px}
.hdc-simple-steps{display:flex;flex-direction:column;gap:23px;margin:0;padding:0;list-style:none;counter-reset:hdc-step}
.hdc-simple-steps li{position:relative;margin:0;padding-left:52px;color:rgba(240,231,220,.84);font-size:20px;line-height:1.38;counter-increment:hdc-step}
.hdc-simple-steps li::before{content:counter(hdc-step);position:absolute;left:0;top:1px;display:grid;place-items:center;width:32px;height:32px;border:1px solid rgba(255,115,74,.58);border-radius:50%;color:var(--accent-soft);font:700 15px 'Geist Mono',ui-monospace,monospace}
.hdc-simple-steps li b{color:var(--fg)}.hdc-simple-steps code{color:#8bdcff;background:rgba(55,168,215,.09);font-size:16px}
.hdc-overview-takeaway{margin-top:9px}
.hdc-overview-sources{display:flex;flex-direction:column;align-items:flex-start;gap:4px;margin-top:10px}
.hdc-overview-sources a{display:flex;align-items:baseline;gap:9px;color:rgba(240,231,220,.58);font:10.5px/1.25 'Geist Mono',ui-monospace,monospace;text-decoration:none;border-bottom:1px solid rgba(255,115,74,.28)}
.hdc-overview-sources a:hover{border-bottom-color:var(--accent)}
.hdc-overview-sources a:hover span{color:var(--accent-soft)}
.hdc-overview-sources b{min-width:116px;color:rgba(255,158,128,.8);font-size:9px;letter-spacing:.08em;text-align:left}
.hdc-overview-sources span{transition:color .15s ease}
</style>

<!--
So what exactly is hyperdimensional computing?

At the simplest level, HDC represents and manipulates information using very
wide vectors: around ten thousand dimensions here, and sometimes more. We call
one of these objects a hypervector.

The strip on the left is a compressed illustration of one hypervector for
Seattle. Seattle isn’t stored in one coordinate or one small section. Its
identity is distributed across the entire pattern, so no individual dimension
has to carry the meaning by itself.

An encoder turns a concept or a piece of data into one of these vectors. There
are several kinds of encoders. In the simple construction we’ll use, Person,
Seattle, and Visited each receive a long, reproducible hypervector. We don’t
train a deep network to discover those initial directions. A seeded process can
generate them once and recreate them whenever we need them.

From there, HDC gives us the three-part loop on the right.

First, we represent: each concept gets its own hypervector.

Then, we compose. We can combine Person, Visited, and Seattle to encode a richer
fact, such as a person visiting Seattle. The result is still a hypervector of
the same width; it doesn’t grow as we add structure.

Finally, we retrieve. We compare a query with stored hypervectors, usually using
cosine similarity, and the closest representations point toward related concepts
or candidate answers.

This isn’t simply a conventional text embedding. The geometry reflects the
symbols, roles, relationships, and combinations we chose to encode. The graph’s
structure has been translated into vector algebra, not discarded.

If this is new to you, I strongly recommend the two papers at the bottom.
Pentti Kanerva’s 2009 paper, “Hyperdimensional Computing,” is the foundational
introduction. Kleyko and colleagues’ “Vector Symbolic Architectures as a
Computing Framework for Emerging Hardware” gives a broader, more modern view.

That’s the basic loop: represent, compose, and retrieve. Now let’s see where the
initial hypervectors come from by building a codebook for our domain vocabulary.
-->

---
layout: default
class: hypervector-slide
---

<div class="hypervector-content">
  <Eyebrow>How are hypervectors generated?</Eyebrow>
  <h1>Simplest way: <span>Build a codebook from domain vocabulary</span></h1>
  <p class="lede">At setup time, a seeded random generator creates one 10,000-D vector per unique feature and stores it in a codebook. Encoding later is lookup + combine.</p>
  <div class="hv-story">
    <section class="hv-story-card atomic-card">
      <div class="hv-step-heading"><b>1</b><div><span>INITIALIZE ONCE</span><strong>Generate one random vector per feature.</strong></div></div>
      <div class="codebook-build">
        <div class="feature-vocab">
          <small>UNIQUE FEATURES · V</small>
          <span>mountains</span><span>waterfront</span><span>pacific_coast</span>
        </div>
        <div class="rng-step"><small>SEEDED<br/>RNG</small><b>→</b></div>
        <div class="codebook-rows">
          <small>STORED CODEBOOK · R</small>
          <div><code>M</code><i class="seed-strip seed-a"></i></div>
          <div><code>W</code><i class="seed-strip seed-b"></i></div>
          <div><code>P</code><i class="seed-strip seed-c"></i></div>
        </div>
      </div>
      <div class="atomic-math">
        <code>R ∈ {−1,+1}<sup>|V| × 10,000</sup></code>
        <strong>rows are ≈ orthogonal</strong>
      </div>
      <p class="atomic-caveat"><b>Random once at initialization.</b> Deterministic after that.</p>
    </section>
    <div class="hv-story-arrow" aria-hidden="true"><span>reuse</span><b>→</b></div>
    <section class="hv-story-card composition-card">
      <div class="hv-step-heading"><b>2</b><div><span>ENCODE EACH RECORD</span><strong>Look up stored rows, then bundle them.</strong></div></div>
      <div class="city-encodings">
        <div class="city-encoding">
          <span>Seattle</span>
          <div><i>M</i><i>W</i><i>P</i><i class="unique">skyline</i></div>
          <code>h₁ = norm(M + W + P + S)</code>
        </div>
        <div class="city-encoding">
          <span>another coastal city</span>
          <div><i>M</i><i>W</i><i>P</i><i class="unique alt">harbor</i></div>
          <code>h₂ = norm(M + W + P + H)</code>
        </div>
      </div>
      <div class="overlap-math">
        <span>3 shared ingredients</span>
        <strong>cos(h₁,h₂) ≈ 3 / √(4·4) = <b>0.75</b></strong>
      </div>
    </section>
  </div>
  <p class="hv-takeaway">More sophisticated, custom encoders are used in practice.<br/>Initially, it makes sense to build a sparse feature set using a codebook to understand the concepts.</p>
</div>

<!--
The important turn: unlike a learned text embedding, the atomic HDC vector is a
lookup from a codebook. We build that codebook by enumerating the unique features
extracted from the data, then assigning each feature a seeded random row. A model
may help extract "mountains" from an image, but it does not predict the mountains
hypervector. We create meaning by reusing those rows inside composite records.
If two four-part bundles share three approximately orthogonal parts, their expected
cosine is about 3 / sqrt(4*4) = 0.75. The seed only makes the codebook reproducible.
Next: show why 10,000 dimensions make accidental similarity so unlikely.

Likely audience question: why not caption/OCR the images and search text embeddings?
- Honest answer: for ordinary semantic image search, embeddings may be cheaper and better.
- HDC does not replace perception; production features should come automatically from
  VLMs, OCR, detectors, metadata, or existing embedding pipelines rather than manual labeling.
- The codebook scales with unique features |V|, not dataset rows n; many records reuse
  the same feature vectors. Record-vector storage still scales with n. This demo persists
  completed vectors as float16: 20 KB rather than 40 KB per 10,000-D vector, while keeping
  TorchHD computation in float32.
- At scale, derive each feature vector independently from seed + token hash so adding a
  feature does not rebuild the codebook or invalidate existing vectors.
- Strongest framing: learned models extract semantics, HDC composes explicit evidence,
  and the graph validates candidates. Benchmark embedding-only, HDC, and hybrid systems.
-->

<style>
.slidev-layout.hypervector-slide{padding:88px 84px 38px}
.hypervector-content h1{margin:10px 0 5px;font-size:40px;line-height:1.08;letter-spacing:-.025em}
.hypervector-content h1 span{color:var(--accent-soft);font-style:italic}
.hypervector-content>.lede{margin:0;color:rgba(240,231,220,.86);font-size:20px}
.hv-story{display:grid;grid-template-columns:.88fr 54px 1.12fr;gap:12px;height:305px;margin-top:18px}
.hv-story-card{border:1px solid var(--border-strong);border-radius:15px;background:rgba(15,13,11,.78);padding:17px 19px}
.hv-step-heading{display:flex;align-items:center;gap:11px;padding-bottom:12px;border-bottom:1px solid var(--border)}
.hv-step-heading>b{display:grid;place-items:center;width:30px;height:30px;border:1px solid rgba(255,115,74,.6);border-radius:50%;color:var(--accent-soft);font:700 14px 'Geist Mono',ui-monospace,monospace}
.hv-step-heading div{display:flex;flex-direction:column;gap:2px}.hv-step-heading span{color:var(--accent-soft);font:700 10px 'Geist Mono',ui-monospace,monospace;letter-spacing:.1em}.hv-step-heading strong{color:var(--fg);font-size:16px}
.codebook-build{display:grid;grid-template-columns:128px 44px 1fr;align-items:center;gap:7px;margin-top:12px}.rng-step{display:flex;flex-direction:column;align-items:center;gap:2px}.rng-step small{color:rgba(240,231,220,.48);font:8px/1.2 'Geist Mono',ui-monospace,monospace;text-align:center}.rng-step b{color:var(--accent);font-size:22px}.feature-vocab,.codebook-rows{display:flex;flex-direction:column;gap:5px}.feature-vocab small,.codebook-rows small{margin-bottom:1px;color:rgba(240,231,220,.48);font:9px 'Geist Mono',ui-monospace,monospace;letter-spacing:.07em}.feature-vocab span{padding:4px 6px;border:1px solid rgba(123,216,255,.22);border-radius:5px;background:rgba(55,168,215,.06);color:#8bdcff;font:10px 'Geist Mono',ui-monospace,monospace}.codebook-rows>div{display:grid;grid-template-columns:17px 1fr;align-items:center;gap:5px}.codebook-rows code{color:var(--accent-soft);font:700 10px 'Geist Mono',ui-monospace,monospace}.seed-strip{display:block;height:18px;border-radius:4px;background-size:27px 18px}.seed-a{background-image:linear-gradient(90deg,#ff9e80 0 17%,#5d554d 17% 32%,#ff9e80 32% 49%,#5d554d 49% 67%,#ff9e80 67% 82%,#5d554d 82%)}.seed-b{background-image:linear-gradient(90deg,#5d554d 0 12%,#ff9e80 12% 29%,#5d554d 29% 45%,#ff9e80 45% 63%,#5d554d 63% 76%,#ff9e80 76%)}.seed-c{background-image:linear-gradient(90deg,#ff9e80 0 9%,#5d554d 9% 26%,#ff9e80 26% 41%,#5d554d 41% 61%,#ff9e80 61% 88%,#5d554d 88%)}
.atomic-math{display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding:11px 12px;border-radius:9px;background:rgba(55,168,215,.07);border:1px solid rgba(55,168,215,.18)}.atomic-math code{color:#8bdcff;font:13px 'Geist Mono',ui-monospace,monospace}.atomic-math sup{font-size:9px}.atomic-math strong{color:rgba(240,231,220,.82);font:12px 'Geist Mono',ui-monospace,monospace}.atomic-caveat{margin:11px 0 0;color:rgba(240,231,220,.62);font-size:13px;text-align:center}.atomic-caveat b{color:var(--accent-soft)}
.hv-story-arrow{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;color:var(--accent)}.hv-story-arrow span{color:rgba(240,231,220,.52);font:10px 'Geist Mono',ui-monospace,monospace;text-transform:uppercase;transform:rotate(-90deg);margin-bottom:14px}.hv-story-arrow b{font-size:34px}
.city-encodings{display:flex;flex-direction:column;gap:9px;margin-top:12px}.city-encoding{display:grid;grid-template-columns:139px 1fr;align-items:center;gap:6px 10px;padding:9px 11px;border:1px solid var(--border);border-radius:9px;background:rgba(240,231,220,.025)}.city-encoding>span{grid-row:1/3;color:var(--fg);font-size:14px;font-weight:650}.city-encoding>div{display:flex;gap:5px}.city-encoding i{padding:3px 7px;border:1px solid rgba(255,115,74,.42);border-radius:6px;background:rgba(255,115,74,.1);color:var(--accent-soft);font:700 11px 'Geist Mono',ui-monospace,monospace;font-style:normal}.city-encoding i.unique{border-color:rgba(123,216,255,.28);background:rgba(55,168,215,.08);color:#8bdcff}.city-encoding i.alt{border-color:rgba(176,92,255,.3);background:rgba(176,92,255,.08);color:#c7a3ff}.city-encoding code{color:rgba(240,231,220,.65);font:11px 'Geist Mono',ui-monospace,monospace}
.overlap-math{display:flex;justify-content:space-between;align-items:center;margin-top:11px;padding:10px 12px;border:1px solid rgba(255,115,74,.34);border-radius:9px;background:rgba(255,115,74,.06)}.overlap-math span{color:rgba(240,231,220,.63);font-size:12px}.overlap-math strong{color:var(--fg);font:14px 'Geist Mono',ui-monospace,monospace}.overlap-math strong b{color:var(--accent-soft);font-size:20px}
.hv-takeaway{margin:34px 0 0;color:rgba(240,231,220,.96);font-size:22px;font-weight:500;text-align:center}.hv-takeaway strong{color:var(--accent-soft)}
.kanerva-link{display:block;width:max-content;margin:14px auto 0;color:rgba(240,231,220,.52);font:11px 'Geist Mono',ui-monospace,monospace;text-decoration:none;border-bottom:1px solid rgba(255,115,74,.28)}.kanerva-link:hover{color:var(--accent-soft);border-bottom-color:var(--accent)}
</style>
---
layout: default
class: orthogonality-slide
---

<div class="orthogonality-content">
  <Eyebrow>Why the dimensions matter</Eyebrow>
  <h1>Random hypervectors barely collide.</h1>
  <p class="lede">In 10,000 dimensions, unrelated bipolar vectors concentrate tightly around cosine similarity zero.</p>
  <div class="ortho-layout">
    <div class="histogram-card">
      <div class="histogram-heading"><span>2,000 random vector pairs</span><small>seed 13 · d = 10,000</small></div>
      <div class="histogram">
        <div class="sigma-line sigma-neg"><span>−σ</span></div><div class="zero-line"><span>0</span></div><div class="sigma-line sigma-pos"><span>+σ</span></div>
        <i style="--bar:1%"></i><i style="--bar:1%"></i><i style="--bar:2%"></i><i style="--bar:9%"></i><i style="--bar:25%"></i><i style="--bar:49%"></i><i style="--bar:84%"></i><i style="--bar:99%"></i><i style="--bar:100%"></i><i style="--bar:83%"></i><i style="--bar:43%"></i><i style="--bar:24%"></i><i style="--bar:11%"></i><i style="--bar:2%"></i><i style="--bar:1%"></i><i style="--bar:1%"></i>
      </div>
      <div class="histogram-axis"><span>−0.04</span><span>−0.02</span><span>cosine similarity</span><span>+0.02</span><span>+0.04</span></div>
    </div>
    <div class="ortho-stats">
      <div class="ortho-stat"><span>mean</span><strong>−0.0001</strong><small>essentially zero</small></div>
      <div class="ortho-stat"><span>observed σ</span><strong>0.0101</strong><small>2,000 pairs</small></div>
      <div class="ortho-stat formula-stat"><span>expected scale</span><strong>1 / √d ≈ 0.01</strong><small>for d = 10,000</small></div>
    </div>
  </div>
  <p class="ortho-takeaway">The encoder defines the geometry.<br/><strong>High dimensionality protects it from accidental hypervector similarity.</strong></p>
  <a class="kanerva-link" href="https://redwood.berkeley.edu/wp-content/uploads/2018/01/kanerva2009hyperdimensional.pdf" target="_blank" rel="noopener">↗ Pentti Kanerva · “Hyperdimensional Computing” · Cognitive Computation, 2009</a>
</div>

<!--
This histogram is generated from 2,000 deterministic random bipolar vector pairs.
The observed standard deviation is 0.01006, matching the 1/sqrt(d) intuition.
The point is not that collisions are impossible; it is that random symbols start
with a predictable, extremely low similarity baseline.
-->

<style>
.slidev-layout.orthogonality-slide {
  padding: 88px 84px 46px;
}

.orthogonality-content h1 {
  margin: 10px 0 6px;
  font-size: 40px;
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.orthogonality-content > .lede {
  margin: 0;
  color: rgba(240, 231, 220, 0.88);
  font-size: 21px;
}

.ortho-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 22px;
  height: 346px;
  margin-top: 21px;
}

.histogram-card,
.ortho-stat {
  border: 1px solid var(--border-strong);
  border-radius: 14px;
  background: rgba(15, 13, 11, 0.76);
}

.histogram-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  padding: 0 18px;
  border-bottom: 1px solid var(--border);
}

.histogram-heading span { color: var(--fg); font-size: 18px; font-weight: 600; }
.histogram-heading small { color: rgba(240, 231, 220, 0.64); font-family: 'Geist Mono', ui-monospace, monospace; font-size: 13px; }

.histogram {
  position: relative;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  align-items: end;
  gap: 6px;
  height: 188px;
  margin: 13px 26px 0;
  border-bottom: 1px solid rgba(240, 231, 220, 0.22);
}

.histogram > i {
  z-index: 2;
  height: var(--bar);
  min-height: 2px;
  border-radius: 5px 5px 0 0;
  background: linear-gradient(180deg, #ff9e80, #e8593c);
  opacity: 0.9;
}

.zero-line,
.sigma-line {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(240, 231, 220, 0.25);
}

.zero-line { left: 50%; background: rgba(240, 231, 220, 0.50); }
.sigma-neg { left: 37.5%; }
.sigma-pos { left: 62.5%; }

.zero-line span,
.sigma-line span {
  position: absolute;
  top: 3px;
  left: 5px;
  color: rgba(240, 231, 220, 0.66);
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 13px;
}

.histogram-axis {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 8px 22px 0;
  color: rgba(240, 231, 220, 0.62);
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 13px;
}

.histogram-axis span { text-align: center; }

.ortho-stats {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.ortho-stat {
  flex: 1;
  padding: 15px 17px;
}

.ortho-stat span { display: block; color: rgba(240, 231, 220, 0.65); font-family: 'Geist Mono', ui-monospace, monospace; font-size: 13px; }
.ortho-stat strong { display: block; margin-top: 5px; color: var(--accent-soft); font-size: 26px; line-height: 1; }
.ortho-stat small { display: block; margin-top: 6px; color: rgba(240, 231, 220, 0.70); font-size: 14px; }
.formula-stat strong { font-size: 21px; }

.ortho-takeaway {
  margin: 18px 0 0;
  color: rgba(240, 231, 220, 0.96);
  font-size: 24px;
  font-weight: 500;
  text-align: center;
}

.ortho-takeaway strong { color: var(--accent-soft); }

.orthogonality-slide .kanerva-link {
  display: block;
  width: max-content;
  margin: 14px auto 0;
  color: rgba(240, 231, 220, 0.52);
  font: 11px 'Geist Mono', ui-monospace, monospace;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 115, 74, 0.28);
}

.orthogonality-slide .kanerva-link:hover {
  color: var(--accent-soft);
  border-bottom-color: var(--accent);
}
</style>

---
layout: default
class: binding-slide
---

<div class="operation-content">
  <Eyebrow>HDC operation 1 · binding (association)</Eyebrow>
  <h1>Binding connects a concept to its features and types.</h1>
  <p class="lede">A "feature" is the role, it's value is a <i>bound association</i> to the <code>Location</code> node type.</p>
  <div class="bind-association-grid">
    <div class="association-list">
      <div class="association-row mountains-association">
        <div class="association-token"><small>ROLE</small><strong>key:feature</strong><i class="association-vector seattle-vector"></i></div>
        <b class="association-symbol">⊗</b>
        <div class="association-token"><small>VALUE</small><strong>value:mountains</strong><i class="association-vector mountains-vector"></i></div>
        <b class="association-arrow">→</b>
        <div class="association-result"><small>ASSOCIATION</small><strong>feature → mountains</strong><i class="association-vector bound-mountains-vector"></i></div>
      </div>
      <div class="association-row coast-association">
        <div class="association-token"><small>ROLE</small><strong>key:feature</strong><i class="association-vector seattle-vector"></i></div>
        <b class="association-symbol">⊗</b>
        <div class="association-token"><small>VALUE</small><strong>value:pacific_coast</strong><i class="association-vector coast-vector"></i></div>
        <b class="association-arrow">→</b>
        <div class="association-result"><small>ASSOCIATION</small><strong>feature → pacific_coast</strong><i class="association-vector bound-coast-vector"></i></div>
      </div>
      <div class="association-row location-association">
        <div class="association-token"><small>NODE TYPE</small><strong>type:Location</strong><i class="association-vector location-vector"></i></div>
        <b class="association-symbol">⊗</b>
        <div class="association-token"><small>FEATURE ASSOCIATION</small><strong>A<sub>mountains</sub></strong><i class="association-vector bound-mountains-vector"></i></div>
        <b class="association-arrow">→</b>
        <div class="association-result location-result"><small>LOCATION FEATURE</small><strong>Location → feature:mountains</strong><i class="association-vector location-mountains-vector"></i></div>
      </div>
    </div>
    <div class="pointer-card">
      <small>TWO REVERSIBLE BINDINGS</small>
      <strong>Unbind the node type,<br />then the feature role.</strong>
      <code>L<sub>mountains</sub> ⊗ T<sub>Location</sub> = A<sub>mountains</sub><br />A<sub>mountains</sub> ⊗ R<sub>feature</sub> = <b>V<sub>mountains</sub></b></code>
      <p>One layer says what kind of node; the next recovers the feature value.</p>
      <div class="notation-key" aria-label="Notation key">
        <small>KEY</small>
        <span><b>L</b> → Location</span>
        <span><b>T</b> → Type</span>
        <span><b>R</b> → Role</span>
        <span><b>A</b> → Association</span>
      </div>
    </div>
  </div>
  <div class="operation-equation"><code>L<sub>mountains</sub> = T<sub>Location</sub> <b>⊗</b> (R<sub>feature</sub> <b>⊗</b> V<sub>mountains</sub>)</code><small>type → role → value = association</small></div>
  <p class="operation-takeaway"><strong>Binding can store both meaning and scope:</strong> “mountains is a feature of a Location.”</p>
</div>

<!--
Speaker notes:
- The first two rows use the familiar role–value operation: bind the deterministic codebook row for `key:feature` to `value:mountains` or `value:pacific_coast`.
- The third row adds a schema-type factor, `type:Location`, so the association now means “this feature belongs to a Location.” Repeat this type binding for every feature before bundling.
- Seattle is deliberately absent from the binding factors. `Location:Seattle` is the graph row that stores the final bundle; the vector itself uses the generic Location type so a query can discover Seattle without naming it.
- MAP binding is self-inverse for bipolar factors. Unbinding `T_Location` recovers the reusable feature association; unbinding `R_feature` then recovers the feature value.
- Applying the same `T_Location` factor to stored vectors and queries preserves their relative cosine similarity while preventing a Location-feature query from being confused with another typed representation.
-->

<style>
.slidev-layout.binding-slide,.slidev-layout.bundling-slide,.slidev-layout.feature-query-slide{padding:88px 84px 44px}.operation-content h1{margin:10px 0 6px;font-size:40px;line-height:1.1;letter-spacing:-.025em}.operation-content>.lede{margin:0;color:rgba(240,231,220,.88);font-size:21px}.operation-content>.lede code{font-size:.86em}.bind-association-grid{display:grid;grid-template-columns:1fr 310px;gap:20px;height:300px;margin-top:21px}.association-list{display:flex;flex-direction:column;gap:8px}.association-row{display:grid;grid-template-columns:1fr 25px 1fr 25px 1.28fr;align-items:center;gap:6px;flex:1;padding:8px;border:1px solid var(--border-strong);border-radius:12px;background:rgba(15,13,11,.76)}.association-token,.association-result{min-width:0}.association-token small,.association-result small,.pointer-card>small{display:block;margin-bottom:3px;color:var(--accent-soft);font-size:8px;font-weight:750;letter-spacing:.1em}.association-token strong,.association-result strong{display:block;min-height:27px;color:var(--fg);font:10.5px/1.3 'Geist Mono',ui-monospace,monospace}.association-vector{display:block;height:16px;margin-top:5px;border-radius:3px}.seattle-vector{background-image:linear-gradient(90deg,#41b6ff 0 16%,#6a645f 16% 31%,#41b6ff 31% 48%,#6a645f 48% 67%,#41b6ff 67% 86%,#6a645f 86%)}.mountains-vector{background-image:linear-gradient(90deg,#ff9e80 0 12%,#6a645f 12% 27%,#ff9e80 27% 53%,#6a645f 53% 71%,#ff9e80 71% 89%,#6a645f 89%)}.coast-vector{background-image:linear-gradient(90deg,#6a645f 0 14%,#ff9e80 14% 36%,#6a645f 36% 49%,#ff9e80 49% 68%,#6a645f 68% 82%,#ff9e80 82%)}.bound-mountains-vector{background-image:linear-gradient(90deg,#a28cff 0 11%,#6a645f 11% 29%,#a28cff 29% 44%,#6a645f 44% 61%,#a28cff 61% 84%,#6a645f 84%)}.bound-coast-vector{background-image:linear-gradient(90deg,#6a645f 0 18%,#a28cff 18% 35%,#6a645f 35% 51%,#a28cff 51% 73%,#6a645f 73% 88%,#a28cff 88%)}.location-vector{background-image:linear-gradient(90deg,#72ddff 0 15%,#6a645f 15% 29%,#72ddff 29% 47%,#6a645f 47% 64%,#72ddff 64% 84%,#6a645f 84%)}.location-mountains-vector{background-image:linear-gradient(90deg,#72ddff 0 10%,#a28cff 10% 27%,#6a645f 27% 42%,#72ddff 42% 58%,#a28cff 58% 77%,#6a645f 77% 89%,#72ddff 89%)}.location-coast-vector{background-image:linear-gradient(90deg,#6a645f 0 12%,#72ddff 12% 28%,#a28cff 28% 44%,#6a645f 44% 60%,#72ddff 60% 73%,#a28cff 73% 91%,#6a645f 91%)}.association-result{padding:6px 8px;border:1px solid rgba(162,140,255,.35);border-radius:7px;background:rgba(162,140,255,.055)}.association-result small{color:#b8aaff}.location-result{border-color:rgba(114,221,255,.36);background:rgba(114,221,255,.05)}.location-result small{color:#72ddff}.association-symbol,.association-arrow{color:var(--accent);font-size:19px;text-align:center}.association-arrow{color:rgba(240,231,220,.48)}.pointer-card{display:flex;flex-direction:column;justify-content:center;padding:16px 18px;border:1px solid rgba(255,115,74,.45);border-radius:14px;background:rgba(255,115,74,.045)}.pointer-card>small{color:var(--accent-soft);font-size:9px}.pointer-card>strong{color:var(--fg);font-size:18px;line-height:1.3}.pointer-card code{display:block;margin-top:12px;padding:9px 8px;border-radius:8px;background:rgba(0,0,0,.22);color:rgba(240,231,220,.8);font:13px/1.58 'Geist Mono',ui-monospace,monospace;text-align:center}.pointer-card code b{color:var(--accent-soft)}.pointer-card p{margin:9px 0 0;color:rgba(240,231,220,.66);font-size:12px;line-height:1.32}.notation-key{display:grid;grid-template-columns:28px 1fr 1fr;gap:5px 10px;align-items:center;margin-top:10px;padding-top:9px;border-top:1px solid rgba(240,231,220,.14);color:rgba(240,231,220,.72);font:10px/1.2 'Geist Mono',ui-monospace,monospace}.notation-key small{grid-row:1 / 3;color:var(--accent-soft);font-size:8px;font-weight:750;letter-spacing:.1em}.notation-key span{white-space:nowrap}.notation-key b{color:var(--fg);font-size:11px}.operation-equation{display:flex;align-items:baseline;justify-content:center;gap:17px;padding-top:22px}.operation-equation code{padding:5px 8px;border-radius:5px;background:rgba(15,13,11,.88);color:var(--fg);font:17px/1.2 'Geist Mono',ui-monospace,monospace}.operation-equation code b{color:var(--accent-soft);font-size:21px}.operation-equation small{color:rgba(240,231,220,.58);font:12px 'Geist Mono',ui-monospace,monospace}.operation-takeaway{margin:14px 0 0;color:rgba(240,231,220,.96);font-size:24px;font-weight:500;text-align:center}.operation-takeaway strong{color:var(--accent-soft)}
</style>

---
layout: default
class: bundling-slide
---

<div class="operation-content">
  <Eyebrow>HDC operation 2 · bundling (superposition)</Eyebrow>
  <h1>Bundling combines many representations into one.</h1>
  <p class="lede">Bundle the Location-scoped feature vectors into one hypervector while preserving each feature's contribution.</p>
  <div class="node-bundle-flow">
    <div class="bound-inputs">
      <div><small>LOCATION FEATURE L₁</small><strong>Location → feature:mountains</strong><code>T<sub>Location</sub> ⊗ A<sub>mountains</sub></code><i class="association-vector location-mountains-vector"></i></div>
      <div><small>LOCATION FEATURE L₂</small><strong>Location → feature:pacific_coast</strong><code>T<sub>Location</sub> ⊗ A<sub>pacific_coast</sub></code><i class="association-vector location-coast-vector"></i></div>
    </div>
    <div class="bundle-node"><strong>⊕</strong><span>BUNDLE</span><small>superpose the associations</small></div>
    <div class="node-vector-output">
      <small>LOCATION:SEATTLE · vibe_hv COLUMN</small>
      <strong>The "Seattle hypervector"</strong>
      <i class="node-vector-stripe"></i>
      <div><span>mountains ✓</span><span>pacific_coast ✓</span></div>
      <p>This column stores the bundled features used for similarity search.</p>
    </div>
  </div>
  <div class="bundle-math-row">
    <code>S<sub>Seattle</sub> = L<sub>mountains</sub> <b>⊕</b> L<sub>pacific_coast</sub> ⊕ …</code>
    <small>superposition of Location features</small>
  </div>
  <div class="feature-memory-row">
    <span><b>REMOVE</b> S<sub>Seattle</sub> − L<sub>mountains</sub> = the remaining Location features</span>
    <span><b>RESTORE</b> remaining features ⊕ L<sub>mountains</sub> = S<sub>Seattle</sub></span>
  </div>
  <p class="operation-takeaway"><strong>From a graph perspective, bundling is what produces the "Location node" for Seattle: </strong> one hypervector that captures all its features</p>
</div>

<!--
Speaker notes:
- Stage two adds the Location-scoped feature vectors from the prior slide into the `vibe_hv` column of the `Location:Seattle` row.
- `L_mountains = T_Location ⊗ A_mountains`; the same Location type factor is applied to every stored feature and every query feature.
- The repository uses `torchhd.multiset` for bundling and does not normalize at this stage.
- The slide uses `⊕` as TorchHD's abstract bundling symbol. For MAP tensors this is element-wise addition, not bitwise XOR; XOR is the binding operation in Binary Spatter Codes.
- That preserves feature weighting and makes the bundling inverse exact: adding the negative of one association removes it; adding the association restores it.
- The result remains similar to its member Location-feature vectors, so a partial Location-feature query can still match the whole stored node.
- Normalization appears later, only if this composite node becomes a factor in an S–P–O binding.
-->

<style>
.node-bundle-flow{display:grid;grid-template-columns:1fr 132px 1fr;gap:19px;height:265px;margin-top:22px}.bound-inputs{display:flex;flex-direction:column;gap:12px}.bound-inputs>div,.bundle-node,.node-vector-output{border:1px solid var(--border-strong);border-radius:14px;background:rgba(15,13,11,.76)}.bound-inputs>div{flex:1;padding:13px 16px}.bound-inputs small,.node-vector-output>small{display:block;color:var(--accent-soft);font-size:9px;font-weight:750;letter-spacing:.11em}.bound-inputs strong{display:block;margin-top:5px;color:var(--fg);font-size:15px}.bound-inputs code{display:block;margin-top:5px!important;padding:0!important;border-radius:0!important;background:transparent!important;color:rgba(240,231,220,.66)!important;font:11px 'Geist Mono',ui-monospace,monospace}.bound-inputs .association-vector{height:20px;margin-top:9px}.bundle-node{display:grid;place-content:center;text-align:center}.bundle-node>strong{color:var(--accent-soft);font-size:55px;line-height:.85}.bundle-node>span{margin-top:14px;color:var(--fg);font-size:16px;font-weight:750;letter-spacing:.11em}.bundle-node>small{margin-top:7px;color:rgba(240,231,220,.58);font:11px 'Geist Mono',ui-monospace,monospace}.node-vector-output{display:flex;flex-direction:column;justify-content:center;padding:24px}.node-vector-output>strong{margin-top:7px;color:var(--fg);font-size:21px}.node-vector-stripe{display:block;height:42px;margin-top:20px;border-radius:5px;background-image:linear-gradient(90deg,#ff9e80 0 12%,#716b66 12% 28%,#a28cff 28% 45%,#716b66 45% 59%,#ff9e80 59% 77%,#716b66 77% 89%,#a28cff 89%)}.node-vector-output>div{display:flex;gap:8px;margin-top:17px}.node-vector-output>div span{padding:7px 9px;border:1px solid rgba(255,115,74,.28);border-radius:7px;color:rgba(240,231,220,.84);font:11px 'Geist Mono',ui-monospace,monospace}.node-vector-output p{margin:13px 0 0;color:rgba(240,231,220,.6);font-size:14px}.bundle-math-row{display:flex;align-items:baseline;justify-content:center;gap:17px;padding-top:24px}.bundle-math-row code{padding:5px 8px;border-radius:5px;background:rgba(15,13,11,.88);color:var(--fg);font:18px/1.2 'Geist Mono',ui-monospace,monospace}.bundle-math-row code b{color:var(--accent-soft);font-size:22px}.bundle-math-row small{color:rgba(240,231,220,.58);font:12px 'Geist Mono',ui-monospace,monospace}.feature-memory-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:13px}.feature-memory-row span{padding:9px 12px;border-left:2px solid rgba(162,140,255,.55);background:rgba(162,140,255,.035);color:rgba(240,231,220,.7);font-size:13px;text-align:center}.feature-memory-row b{color:#b8aaff}.bundling-slide .operation-takeaway{margin-top:14px}
</style>

<style>
.bundling-slide .bound-inputs .association-vector{display:block;border-radius:4px}.bundling-slide .location-mountains-vector{background-image:linear-gradient(90deg,#72ddff 0 10%,#a28cff 10% 27%,#6a645f 27% 42%,#72ddff 42% 58%,#a28cff 58% 77%,#6a645f 77% 89%,#72ddff 89%)}.bundling-slide .location-coast-vector{background-image:linear-gradient(90deg,#6a645f 0 12%,#72ddff 12% 28%,#a28cff 28% 44%,#6a645f 44% 60%,#72ddff 60% 73%,#a28cff 73% 91%,#6a645f 91%)}
</style>

---
layout: default
class: feature-query-slide
---

<div class="operation-content">
  <Eyebrow>Why binding and bundling belong together</Eyebrow>
  <h1>Can a query find Seattle without naming it?</h1>
  <div class="query-construction" aria-label="Constructing the HDC query from natural language">
    <div class="query-language">
      <small>USER QUERY</small>
      <strong>“Cities on the Pacific coast with mountains nearby”</strong>
    </div>
    <b class="query-step-arrow">→</b>
    <div class="query-extractor">
      <small>EXTRACT “VIBES”</small>
      <strong>Rule-based engine <span>in this demo</span></strong>
      <p>or a small local LLM</p>
    </div>
    <b class="query-step-arrow">→</b>
    <div class="query-vibes">
      <small>NORMALIZED FEATURE STRINGS</small>
      <div><code>pacific_coast</code><code>mountains</code><code>nature_access</code><code>waterfront</code></div>
      <span>All four are encoded; two are expanded below.</span>
    </div>
  </div>
  <div class="feature-query-layout">
    <div class="stored-node-card">
      <small>STORED NODE HYPERVECTOR</small>
      <strong>Location:Seattle</strong>
      <code>S<sub>Seattle</sub> = L<sub>mountains</sub> ⊕ L<sub>pacific_coast</sub> ⊕ …</code>
      <i class="node-vector-stripe"></i>
      <div><span>L<sub>mountains</sub></span><span>L<sub>pacific_coast</sub></span></div>
    </div>
    <div class="cosine-bridge"><span>cosine</span><b>↔</b><small>compare</small></div>
    <div class="feature-query-list">
      <div class="feature-query hit"><span>QUERY</span><code>T<sub>Location</sub> ⊗ A<sub>mountains</sub></code><strong>L<sub>mountains</sub></strong></div>
      <div class="feature-query hit"><span>QUERY</span><code>T<sub>Location</sub> ⊗ A<sub>pacific_coast</sub></code><strong>L<sub>pacific_coast</sub></strong></div>
      <div class="feature-query query-sum"><span>BUNDLE</span><code>Q = L<sub>mountains</sub> ⊕ L<sub>pacific_coast</sub> ⊕ …</code><strong>Location query</strong></div>
    </div>
  </div>
  <div class="meaning-split">
    <div><small>QUERY ASKS</small><strong>Which Location hypervectors best match this bundle of features?</strong></div>
    <div><small>HDC FINDS THE ANSWER!</small><strong>A location may be returned even if it matches only part of the query</strong></div>
  </div>
  <p class="operation-takeaway"><strong>Binding scopes each feature to the <code>Location</code> type;</strong> bundling represents the whole <code>Location:Seattle</code> record.</p>
</div>

<!--
Speaker notes:
- The visible query deliberately repeats the phrase from the opening: “Cities on the Pacific coast with mountains nearby.”
- Query construction happens before HDC. The demo's hand-written rule maps this phrase to four vocabulary-aligned strings: `pacific_coast`, `mountains`, `nature_access`, and `waterfront`.
- The rule-based extractor is intentionally replaceable. A small local LLM could perform the same constrained task: return a short list of normalized feature strings without generating the answer or traversing the graph.
- A query must use the same codebook and the same two-layer binding convention as the stored node vector: value to feature role, then feature association to Location type.
- For legibility, only two of the four query associations are shown here: `feature -> mountains` and `feature -> pacific_coast`. The query does not contain Seattle or any other location identity.
- The visible query contains the generic `Location` type and the requested features, but never the identity `Seattle`; the matching table row supplies that identity after retrieval.
- An implementation must apply the same `T_Location` factor to stored `vibe_hv` vectors and query vectors. The common bipolar factor preserves relative cosine similarity.
- LanceDB ranks stored `Location.vibe_hv` vectors by cosine similarity, reported as `score = 1 - cosine_distance`; it does not test whether every requested feature is present.
- The query hypervector is built in float32. Persisted `hv` and `vibe_hv` columns are fixed-size float16; any stored vector that re-enters TorchHD algebra must first be promoted back to float32.
- This three-row demo creates no vector index, so LanceDB performs an exact flat scan and keeps the top results. At production scale, evaluate an `IVF_RQ` RaBitQ index for compressed ANN retrieval; 10,000 dimensions satisfies its divisible-by-8 requirement, but recall must be measured on the real workload.
- Seattle scores highly because it shares all four query features. Salt Lake City can also pass the similarity threshold because it shares `mountains` and `nature_access`, confirming that partial matches can return.
- After vector search, the code runs exact Cypher from each matched Location to people connected by `VISITED` relationships.
-->

<style>
.feature-query-slide .node-vector-stripe{display:block;height:42px;margin-top:20px;border-radius:5px;background-image:linear-gradient(90deg,#ff9e80 0 12%,#716b66 12% 28%,#a28cff 28% 45%,#716b66 45% 59%,#ff9e80 59% 77%,#716b66 77% 89%,#a28cff 89%)}
.feature-query-slide .operation-content>.lede{display:flex;align-items:center;gap:12px}.feature-query-slide .operation-content>.lede b{padding:5px 8px;border:1px solid rgba(255,115,74,.38);border-radius:5px;background:rgba(255,115,74,.07);color:var(--accent-soft);font:700 10px 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em}.feature-query-slide .operation-content>.lede span{color:rgba(240,231,220,.92)}
.feature-query-layout{display:grid;grid-template-columns:1fr 94px 1.08fr;gap:17px;height:282px;margin-top:22px}.stored-node-card,.feature-query-list{border:1px solid var(--border-strong);border-radius:14px;background:rgba(15,13,11,.76)}.stored-node-card{display:flex;flex-direction:column;justify-content:center;padding:25px}.stored-node-card>small{color:var(--accent-soft);font-size:10px;font-weight:750;letter-spacing:.11em}.stored-node-card>strong{margin-top:7px;color:var(--fg);font-size:22px}.stored-node-card>code,.feature-query code{padding:0!important;border-radius:0!important;background:transparent!important}.stored-node-card>code{margin-top:14px;color:rgba(240,231,220,.7)!important;font:14px 'Geist Mono',ui-monospace,monospace}.stored-node-card .node-vector-stripe{margin-top:20px}.stored-node-card>div{display:flex;gap:9px;margin-top:18px}.stored-node-card>div span{padding:7px 10px;border:1px solid rgba(162,140,255,.35);border-radius:7px;color:#c2b7ff;font:12px 'Geist Mono',ui-monospace,monospace}.cosine-bridge{display:flex;flex-direction:column;align-items:center;justify-content:center}.cosine-bridge span{color:rgba(240,231,220,.54);font:12px 'Geist Mono',ui-monospace,monospace}.cosine-bridge b{margin:8px 0;color:var(--accent);font-size:32px}.cosine-bridge small{color:rgba(240,231,220,.45);font-size:12px}.feature-query-list{display:flex;flex-direction:column;padding:9px 19px}.feature-query{display:grid;grid-template-columns:55px 1fr 126px;align-items:center;gap:10px;flex:1}.feature-query+.feature-query{border-top:1px solid var(--border)}.feature-query>span{color:rgba(240,231,220,.44);font-size:10px;font-weight:750;letter-spacing:.1em}.feature-query code{color:var(--fg)!important;font:13px 'Geist Mono',ui-monospace,monospace}.feature-query strong{font-size:13px;text-align:right}.feature-query.hit strong{color:var(--accent-soft)}.feature-query.miss strong{color:rgba(240,231,220,.48)}.meaning-split{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px}.meaning-split>div{display:flex;align-items:center;gap:14px;padding:12px 16px;border-left:2px solid var(--accent);background:rgba(255,115,74,.04)}.meaning-split>div:last-child{border-left-color:#a28cff;background:rgba(162,140,255,.04)}.meaning-split small{color:var(--accent-soft);font-size:10px;font-weight:750;letter-spacing:.1em}.meaning-split>div:last-child small{color:#b8aaff}.meaning-split strong{color:rgba(240,231,220,.84);font-size:15px}.feature-query-slide .operation-takeaway{margin-top:17px}
</style>

<style>
.query-construction{display:grid;grid-template-columns:1.25fr 28px .72fr 28px 1.38fr;align-items:center;gap:9px;height:78px;margin-top:12px;padding:10px 14px;border:1px solid var(--border-strong);border-radius:11px;background:rgba(15,13,11,.7)}.query-construction small{display:block;color:var(--accent-soft);font-size:8px;font-weight:750;letter-spacing:.1em}.query-language strong{display:block;margin-top:4px;color:rgba(240,231,220,.9);font-size:13px;line-height:1.25}.query-step-arrow{color:rgba(255,115,74,.72);font-size:20px;text-align:center}.query-extractor{padding-left:2px}.query-extractor strong{display:block;margin-top:4px;color:var(--fg);font-size:13px}.query-extractor strong span{color:rgba(240,231,220,.5);font-size:10px;font-weight:500}.query-extractor p{margin:2px 0 0;color:rgba(240,231,220,.6);font-size:11px}.query-vibes>div{display:grid;grid-template-columns:1fr 1fr;gap:3px 6px;margin-top:4px}.query-vibes code{padding:0!important;border-radius:0!important;background:transparent!important;color:#b8aaff!important;font:10.5px/1.15 'Geist Mono',ui-monospace,monospace}.query-vibes>span{display:block;margin-top:3px;color:rgba(240,231,220,.5);font-size:9px}.feature-query-slide .feature-query-layout{height:240px;margin-top:13px}.feature-query-slide .stored-node-card{padding:20px}.feature-query-slide .stored-node-card>code{margin-top:11px}.feature-query-slide .stored-node-card .node-vector-stripe{height:34px;margin-top:14px}.feature-query-slide .stored-node-card>div{margin-top:12px}.feature-query-slide .meaning-split{margin-top:12px}.feature-query-slide .meaning-split>div{padding:10px 14px}.feature-query-slide .operation-takeaway{margin-top:13px}
</style>

---
layout: default
class: spo-slide
---

<div class="spo-content">
  <Eyebrow>From paths + properties to S–P–O hypervectors</Eyebrow>
  <h1><code>Person</code> → <code>VISITED</code> → <code>Location</code> becomes one hypervector.</h1>
  <p class="lede"><code>Person</code> and <code>Location</code> supply node sums; <code>VISITED</code> supplies the relationship type and stores the bound triple.</p>
  <div class="spo-grid">
    <div class="spo-panel spo-subject">
      <div class="spo-head"><small>1 · PERSON TABLE</small><strong>SUBJECT · Maya Chen</strong></div>
      <div class="spo-pairs">
        <div><span>key:name</span><b>⊗</b><span>value:Maya Chen</span></div>
        <div><span>key:role</span><b>⊗</b><span>value:designer</span></div>
      </div>
      <div class="spo-operation"><b>⊕</b><span>bundle · Person table</span></div>
      <div class="spo-result"><i class="spo-vector subject-vector"></i><strong>S = bundle(Maya properties)</strong></div>
    </div>
    <div class="spo-panel spo-predicate">
      <div class="spo-head"><small>2 · <code>VISITED</code> TABLE</small><strong>PREDICATE</strong></div>
      <div class="predicate-token">type: VISITED</div>
      <i class="spo-vector predicate-vector"></i>
      <div class="spo-result predicate-result"><strong>P = hv(VISITED)</strong></div>
    </div>
    <div class="spo-panel spo-object">
      <div class="spo-head"><small>3 · LOCATION TABLE</small><strong>OBJECT · Seattle</strong></div>
      <div class="spo-pairs">
        <div><span>key:name</span><b>⊗</b><span>value:Seattle</span></div>
        <div><span>key:region</span><b>⊗</b><span>value:pacific_northwest</span></div>
      </div>
      <div class="spo-operation"><b>⊕</b><span>bundle · Location table</span></div>
      <div class="spo-result"><i class="spo-vector object-vector"></i><strong>O = bundle(Seattle properties)</strong></div>
    </div>
    <div class="spo-panel spo-bind">
      <div class="spo-head"><small>4 · <code>VISITED</code> TABLE</small><strong>Final S·P·O hypervector</strong></div>
      <div class="spo-bind-inputs"><span>S</span><b>⊗</b><span>P</span><b>⊗</b><span>O</span></div>
      <div class="bind-arrow">↓</div>
      <i class="spo-vector final-vector"></i>
      <div class="final-label">hv(Maya, VISITED, Seattle)</div>
    </div>
  </div>
  <p class="spo-takeaway"><strong>Encode an entire path as a hypervector</strong>, using the same bind and bundle operators.</p>
</div>

<!--
Speaker notes:
- This is the repository's actual factual relationship encoding, shown with representative properties for legibility.
- `encode_properties` binds every key to its value, then stores the bundle of those bound pairs in each node row. Maya and Seattle have more properties than the two shown here.
- The predicate comes from the relationship table name `VISITED` and is encoded deterministically as `predicate:VISITED`; it is not fetched from a separate table row.
- `encode_triple` calls `normalize_for_binding` on the composite subject and object only at this boundary, then binds S*, P, and O* into `VISITED.hv`.
- This distinction is visible in the rebuilt LanceDB tables: node rows contain full-precision bundles (for example Location.hv spans −10…10), while VISITED.hv contains only −1/+1.
- Bipolar factors preserve MAP's self-inverse binding: known subject and predicate factors recover the stored object factor exactly.
- MAP binding is commutative, so the relationship row's `person_id` and `location_id` columns preserve edge direction; the bound vector alone does not.
- `Location.vibe_hv`, used in the later retrieval slides, is the separate bundled vector for fuzzy multimodal evidence.
-->

<style>
.slidev-layout.spo-slide{padding:88px 72px 40px}.spo-content h1{margin:10px 0 6px;font-size:40px;line-height:1.1;letter-spacing:-.025em}.spo-content>.lede{margin:0;color:rgba(240,231,220,.88);font-size:20px}.spo-grid{display:grid;grid-template-columns:1.08fr .68fr 1.08fr .88fr;gap:12px;height:330px;margin-top:22px}.spo-panel{display:flex;flex-direction:column;overflow:hidden;border:1px solid var(--border-strong);border-radius:12px;background:rgba(15,13,11,.76)}.spo-head{padding:12px 14px;border-bottom:1px solid currentColor;background:rgba(240,231,220,.025);text-align:center}.spo-head small{display:block;font-size:10px;font-weight:700;letter-spacing:.1em}.spo-head strong{display:block;margin-top:4px;color:var(--fg);font-size:17px}.spo-subject{color:#41b6ff;border-color:rgba(65,182,255,.6)}.spo-predicate{color:#68d97a;border-color:rgba(104,217,122,.58)}.spo-object{color:#a28cff;border-color:rgba(162,140,255,.62)}.spo-bind{color:var(--accent-soft);border-color:rgba(255,115,74,.68)}.spo-pairs{display:flex;flex-direction:column;gap:11px;padding:17px 13px 12px}.spo-pairs>div{display:grid;grid-template-columns:1fr 20px 1.25fr;align-items:center;gap:5px}.spo-pairs span{padding:8px 6px;border:1px solid rgba(240,231,220,.16);border-radius:6px;background:rgba(240,231,220,.035);color:rgba(240,231,220,.86);font:10px/1.2 'Geist Mono',ui-monospace,monospace;text-align:center}.spo-pairs b{color:currentColor;font-size:17px;text-align:center}.spo-operation{display:flex;align-items:center;justify-content:center;gap:8px;margin:4px 13px 0;padding-top:12px;border-top:1px dashed rgba(240,231,220,.18)}.spo-operation b{color:currentColor;font-size:21px}.spo-operation span{color:rgba(240,231,220,.58);font:10px 'Geist Mono',ui-monospace,monospace}.spo-result{display:flex;flex-direction:column;gap:9px;margin-top:auto;padding:13px;border-top:1px solid rgba(240,231,220,.12);background:rgba(240,231,220,.025)}.spo-result strong{color:var(--fg);font:12px 'Geist Mono',ui-monospace,monospace;text-align:center}.spo-vector{display:block;height:31px;border-radius:5px;background-size:100% 100%}.subject-vector{background-image:linear-gradient(90deg,#41b6ff 0 12%,#716b66 12% 25%,#41b6ff 25% 39%,#716b66 39% 54%,#41b6ff 54% 77%,#716b66 77% 88%,#41b6ff 88%)}.predicate-vector{margin:31px 18px 0;background-image:linear-gradient(90deg,#68d97a 0 15%,#77716a 15% 31%,#68d97a 31% 48%,#77716a 48% 64%,#68d97a 64% 83%,#77716a 83%)}.object-vector{background-image:linear-gradient(90deg,#a28cff 0 18%,#716b66 18% 31%,#a28cff 31% 44%,#716b66 44% 62%,#a28cff 62% 81%,#716b66 81%)}.final-vector{margin:0 18px;background-image:linear-gradient(90deg,#ff9e80 0 11%,#665e58 11% 25%,#ff9e80 25% 43%,#665e58 43% 57%,#ff9e80 57% 72%,#665e58 72% 88%,#ff9e80 88%)}.predicate-token{margin:36px 14px 0;color:rgba(240,231,220,.58);font:11px 'Geist Mono',ui-monospace,monospace;text-align:center}.predicate-result{margin-top:auto}.spo-bind-inputs{display:flex;align-items:center;justify-content:center;gap:9px;margin:42px 12px 0}.spo-bind-inputs span{display:grid;place-items:center;width:38px;height:38px;border:1px solid rgba(255,115,74,.55);border-radius:7px;background:rgba(255,115,74,.08);color:var(--fg);font:700 16px 'Geist Mono',ui-monospace,monospace}.spo-bind-inputs b{color:var(--accent);font-size:19px}.bind-arrow{margin:11px 0;color:rgba(240,231,220,.55);font-size:22px;text-align:center}.final-label{margin:11px 10px 0;color:var(--fg);font:10px/1.35 'Geist Mono',ui-monospace,monospace;text-align:center}.spo-storage{display:flex;align-items:center;justify-content:center;margin-top:14px;border:1px solid var(--border-strong);border-radius:9px;overflow:hidden;background:rgba(15,13,11,.8)}.spo-storage>*{padding:11px 15px}.spo-storage>*+*{border-left:1px solid var(--border)}.spo-storage strong{color:var(--accent-soft);font-size:14px}.spo-storage span{color:rgba(240,231,220,.7);font:11px 'Geist Mono',ui-monospace,monospace}.spo-storage b{color:var(--fg);font:12px 'Geist Mono',ui-monospace,monospace}.spo-takeaway{margin:15px 0 0;color:rgba(240,231,220,.96);font-size:23px;font-weight:500;text-align:center}.spo-takeaway strong{color:var(--accent-soft)}
</style>

<style>
.spo-content>.lede code{color:var(--accent-soft);font-family:'Geist Mono',ui-monospace,monospace}
</style>

---
layout: default
class: permutation-slide
---

<div class="permutation-content">
  <Eyebrow>HDC operation 3 · permutation (ordered sequence)</Eyebrow>
  <h1>Permutation preserves the order of events.</h1>
  <div class="permutation-intro-row">
    <p class="lede">Bundling is more like superposition (loses the order of events)</p>
    <div class="mini-permutation" aria-label="A fixed permutation reorders the entries of a hypervector">
      <div><span>F</span><i class="mini-vector-stripe mini-vector-before"></i></div>
      <b>ρ →</b>
      <div><span>ρ(F)</span><i class="mini-vector-stripe mini-vector-after"></i></div>
      <small>same entries · fixed new positions · reversible with ρ⁻¹</small>
    </div>
  </div>
  <div class="permutation-layout path-order-layout">
    <div class="permutation-mechanism">
      <small>BUNDLING: TWO VISITS, NO ORDER PRESERVED</small>
      <div class="hop-facts visit-facts">
        <div><b>F<sub>1</sub></b><span>Maya — VISITED → Space Needle</span></div>
        <div><b>F<sub>2</sub></b><span>Maya — VISITED → Pike Place Market</span></div>
      </div>
      <div class="order-loss">
        <code>H<sub>bundle</sub> = F<sub>1</sub> ⊕ F<sub>2</sub></code>
        <strong>Same vector whichever visit came first.</strong>
      </div>
      <p class="order-question"><span>Cannot answer:</span> Which landmark did Maya visit first?</p>
    </div>
    <div class="permutation-path">
      <small>PERMUTATION: ENCODE EACH VISIT VIA AN ORDERED TRANSFORM</small>
      <div class="positioned-hops">
        <div><span>VISIT 1</span><strong>ρ⁰(F<sub>1</sub>)</strong><small>Space Needle</small></div>
        <b>then</b>
        <div class="second"><span>VISIT 2</span><strong>ρ¹(F<sub>2</sub>)</strong><small>Pike Place Market</small></div>
      </div>
      <div class="sequence-equation"><span>ORDERED EPISODE</span><code>H = ρ⁰(F<sub>1</sub>) ⊕ ρ¹(F<sub>2</sub>)</code></div>
      <div class="sequence-reverse"><code>H<sub>reverse</sub> = ρ⁰(F<sub>2</sub>) ⊕ ρ¹(F<sub>1</sub>)</code><strong>reverse order → different vector</strong></div>
    </div>
  </div>
  <div class="permutation-repo-note"><strong>Now we can ask:</strong> Which landmark did Maya visit first? <b>Space Needle.</b></div>
  <p class="permutation-takeaway">Binding captures features. Bundling combines them into a "visit".<br/> <strong>Permutation preserves their order.</strong></p>
</div>

<!--
Speaker notes:
- Permutation is the third common HDC operation, alongside bundling and binding.
- In the HDC/VSA literature, a fixed permutation is a bijective coordinate reordering. A nonzero power usually makes an event vector nearly orthogonal to its unpermuted form, while the inverse permutation recovers that event vector exactly.
- This example reuses the core VISITED relationship, now applied to several ordered visits by one person to explain sequence.
- Binding first creates two fact hypervectors: F1 encodes Maya visiting the Space Needle; F2 encodes Maya visiting Pike Place Market.
- Bundling alone is commutative: F1 ⊕ F2 = F2 ⊕ F1. It remembers that both visits occurred but cannot answer which one came first.
- A permutation is a fixed, reversible coordinate reordering. The encoder defines ρ⁰ as visit position 1 and ρ¹ as visit position 2. The operation itself is not a clock; the positional convention gives it temporal meaning here.
- The ordered episode is H = ρ⁰(F1) ⊕ ρ¹(F2). Reversing the visits assigns the coordinate arrangements to different facts, producing H_reverse = ρ⁰(F2) ⊕ ρ¹(F1), a different hypervector.
- To recover visit 1, compare H with the visit-fact codebook because ρ⁰ is the identity. To recover visit 2, apply ρ⁻¹ to H and compare again; F2 realigns while the transformed first visit contributes noise.
- The value is one compact vector that preserves both which visits occurred and their order, allowing the application to answer “Which landmark did Maya visit first?”
- The permutation operation itself is exactly invertible. Recovering one event from a bundled sequence is approximate because the other bundled events act as noise; a codebook or cleanup memory resolves the closest known event.
- Fully random permutations distinguish assigned positions rather than making nearby positions similar. They encode a chosen structural arrangement, not elapsed time or temporal distance.
- The current repository contains no permutation call. This is a literature-grounded extension for event or path histories, not a claim about the present demo implementation.
- Sources: Kanerva, “Hyperdimensional Computing,” §6.6 (2009); Kleyko et al., “A Survey on Hyperdimensional Computing aka Vector Symbolic Architectures, Part I,” §3.3 (2022).
-->

<style>
.slidev-layout.permutation-slide{padding:88px 84px 44px}.permutation-content h1{margin:10px 0 6px;font-size:40px;line-height:1.1;letter-spacing:-.025em}.permutation-intro-row{display:grid;grid-template-columns:minmax(0,1fr) 440px;align-items:center;gap:24px;margin-top:1px}.permutation-intro-row>.lede{margin:0;color:rgba(240,231,220,.88);font-size:18px;line-height:1.35}.mini-permutation{display:grid;grid-template-columns:1fr 42px 1fr;align-items:center;gap:5px 9px;padding:8px 11px;border:1px solid rgba(255,115,74,.28);border-radius:9px;background:rgba(255,115,74,.04)}.mini-permutation>div{display:grid;grid-template-columns:36px 1fr;align-items:center;gap:6px}.mini-permutation>div span{color:var(--fg);font:700 12px 'Geist Mono',ui-monospace,monospace}.mini-permutation>b{color:var(--accent-soft);font:700 13px 'Geist Mono',ui-monospace,monospace;text-align:center}.mini-permutation>small{grid-column:1/-1;color:rgba(240,231,220,.53);font:9px 'Geist Mono',ui-monospace,monospace;letter-spacing:.02em;text-align:center}.mini-vector-stripe{display:block;height:18px;border-radius:4px}.mini-vector-before{background-image:linear-gradient(90deg,#ff9e80 0 18%,#6a645f 18% 34%,#41b6ff 34% 51%,#a28cff 51% 67%,#6a645f 67% 82%,#ff9e80 82%)}.mini-vector-after{background-image:linear-gradient(90deg,#a28cff 0 16%,#ff9e80 16% 34%,#6a645f 34% 49%,#ff9e80 49% 67%,#41b6ff 67% 84%,#6a645f 84%)}.permutation-layout{display:grid;grid-template-columns:.9fr 1.1fr;gap:22px;height:294px;margin-top:14px}.permutation-mechanism,.permutation-path{border:1px solid var(--border-strong);border-radius:14px;background:rgba(15,13,11,.76);padding:20px 22px}.permutation-mechanism>small,.permutation-path>small{color:var(--accent-soft);font-size:12px;font-weight:700;letter-spacing:.1em}.permutation-bars{display:grid;grid-template-columns:1fr 54px 1fr;align-items:center;gap:12px;margin-top:26px}.permutation-bars>div span{display:block;margin-bottom:8px;color:var(--fg);font:15px 'Geist Mono',ui-monospace,monospace}.permutation-bars>b{color:var(--accent);font:19px 'Geist Mono',ui-monospace,monospace;text-align:center}.permutation-vector{display:block;height:39px;border-radius:6px;background-size:100% 100%}.permutation-vector.original{background-image:linear-gradient(90deg,#ff9e80 0 9%,#5d554d 9% 20%,#ff9e80 20% 37%,#5d554d 37% 48%,#ff9e80 48% 57%,#5d554d 57% 76%,#ff9e80 76% 92%,#5d554d 92%)}.permutation-vector.shifted{background-image:linear-gradient(90deg,#5d554d 0 11%,#ff9e80 11% 28%,#5d554d 28% 39%,#ff9e80 39% 48%,#5d554d 48% 67%,#ff9e80 67% 83%,#5d554d 83% 91%,#ff9e80 91%)}.permutation-facts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:28px}.permutation-facts>div{padding:12px;border:1px solid var(--border);border-radius:8px;background:rgba(240,231,220,.035)}.permutation-facts span{display:block;color:rgba(240,231,220,.55);font-size:12px}.permutation-facts strong{display:block;margin-top:7px;color:var(--fg);font:13px 'Geist Mono',ui-monospace,monospace}.role-equation{display:flex;align-items:center;justify-content:center;gap:9px;margin-top:21px}.role-equation span{padding:10px 11px;border:1px solid rgba(255,115,74,.27);border-radius:8px;background:rgba(255,115,74,.07);color:var(--fg);font:12px 'Geist Mono',ui-monospace,monospace}.role-equation b{color:var(--accent);font-size:20px}.direction-change{margin:15px 0 -6px;color:rgba(240,231,220,.55);font:12px 'Geist Mono',ui-monospace,monospace;text-align:center}.direction-score{display:grid;grid-template-columns:1fr auto;align-items:center;margin-top:20px;padding:11px 13px;border-radius:8px;background:rgba(240,231,220,.055)}.direction-score span{color:rgba(240,231,220,.68);font:13px 'Geist Mono',ui-monospace,monospace}.direction-score strong{color:var(--accent-soft);font-size:20px}.direction-score em{grid-column:1/-1;margin-top:3px;color:rgba(240,231,220,.52);font-size:12px;font-style:normal}.permutation-repo-note{margin-top:12px;padding:13px 16px;border:1px solid rgba(255,115,74,.3);border-radius:10px;background:rgba(255,115,74,.055);color:rgba(240,231,220,.78);font-size:16px;text-align:center}.permutation-repo-note strong{color:var(--accent-soft)}.permutation-takeaway{margin:12px 0 0;color:rgba(240,231,220,.96);font-size:24px;font-weight:500;text-align:center}.permutation-takeaway strong{color:var(--accent-soft)}
</style>

<style>
.permutation-content>.lede em{color:var(--fg);font-style:normal}.event-sequence{display:grid;grid-template-columns:1fr 46px 1.12fr;align-items:center;gap:8px;margin-top:17px}.event-card{display:flex;align-items:center;gap:11px;min-width:0;padding:11px;border:1px solid rgba(255,115,74,.3);border-radius:9px;background:rgba(255,115,74,.055)}.event-card>span{display:grid;place-items:center;flex:0 0 31px;width:31px;height:31px;border:1px solid rgba(255,115,74,.5);border-radius:50%;color:var(--accent-soft);font:700 13px 'Geist Mono',ui-monospace,monospace}.event-card>div{min-width:0}.event-card strong{display:block;color:var(--fg);font-size:13px;line-height:1.25}.event-card code{display:block;margin-top:4px;padding:0!important;background:transparent!important;color:rgba(240,231,220,.56)!important;font:11px 'Geist Mono',ui-monospace,monospace}.event-card.second{border-color:rgba(162,140,255,.42);background:rgba(162,140,255,.05)}.event-card.second>span{border-color:rgba(162,140,255,.55);color:#b8aaff}.event-then{color:rgba(240,231,220,.5);font:11px/1.35 'Geist Mono',ui-monospace,monospace;text-align:center}.sequence-equation{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:18px;padding:12px 13px;border:1px solid var(--border-strong);border-radius:8px;background:rgba(240,231,220,.04)}.sequence-equation span{color:var(--accent-soft);font-size:10px;font-weight:750;letter-spacing:.1em}.sequence-equation code{padding:0!important;background:transparent!important;color:var(--fg)!important;font:15px 'Geist Mono',ui-monospace,monospace}.sequence-reverse{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:9px;padding:8px 11px;border-left:2px solid rgba(162,140,255,.65);background:rgba(162,140,255,.04)}.sequence-reverse code{padding:0!important;background:transparent!important;color:rgba(240,231,220,.64)!important;font:12px 'Geist Mono',ui-monospace,monospace}.sequence-reverse strong{color:#b8aaff;font-size:12px;text-align:right}
.path-order-layout{grid-template-columns:1fr 1fr}.permutation-content>.lede code{font-size:19px}.mini-graph-path{display:grid;grid-template-columns:auto auto 1.15fr auto auto;align-items:center;gap:7px;margin-top:18px}.mini-graph-path span{padding:8px 10px;border:1px solid rgba(255,115,74,.3);border-radius:7px;background:rgba(255,115,74,.055);color:var(--fg);font-size:12px;font-weight:700;text-align:center}.mini-graph-path span:nth-of-type(2){border-color:rgba(162,140,255,.42);background:rgba(162,140,255,.05)}.mini-graph-path i{color:rgba(240,231,220,.55);font:10px 'Geist Mono',ui-monospace,monospace;text-align:center}.hop-facts{display:grid;gap:7px;margin-top:14px}.hop-facts>div{display:grid;grid-template-columns:31px 1fr;align-items:center;gap:9px;padding:8px 10px;border:1px solid var(--border);border-radius:7px;background:rgba(240,231,220,.03)}.hop-facts b{color:var(--accent-soft);font:700 12px 'Geist Mono',ui-monospace,monospace}.hop-facts span{color:rgba(240,231,220,.74);font:11px 'Geist Mono',ui-monospace,monospace}.order-loss{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;padding:10px 11px;border-left:2px solid rgba(255,115,74,.65);background:rgba(255,115,74,.045)}.order-loss code{padding:0!important;background:transparent!important;color:var(--fg)!important;font:12px 'Geist Mono',ui-monospace,monospace}.order-loss strong{max-width:155px;color:var(--accent-soft);font-size:11px;text-align:right}.positioned-hops{display:grid;grid-template-columns:1fr 42px 1fr;align-items:center;gap:9px;margin-top:20px}.positioned-hops>div{padding:13px;border:1px solid rgba(255,115,74,.32);border-radius:9px;background:rgba(255,115,74,.055);text-align:center}.positioned-hops>div.second{border-color:rgba(162,140,255,.45);background:rgba(162,140,255,.05)}.positioned-hops span,.positioned-hops small{display:block}.positioned-hops span{color:var(--accent-soft);font-size:10px;font-weight:750;letter-spacing:.1em}.positioned-hops strong{display:block;margin:5px 0;color:var(--fg);font:18px 'Geist Mono',ui-monospace,monospace}.positioned-hops small{color:rgba(240,231,220,.55);font-size:11px}.positioned-hops>b{color:rgba(240,231,220,.5);font:11px 'Geist Mono',ui-monospace,monospace;text-align:center}.path-order-layout .sequence-equation{margin-top:16px}.path-order-layout .sequence-reverse{margin-top:10px}.permutation-repo-note{margin-top:18px}.permutation-takeaway{margin-top:18px}.visit-facts{margin-top:24px}.visit-facts>div{grid-template-columns:58px 1fr;padding:11px 10px}.order-question{margin:14px 0 0;padding:10px 11px;border:1px solid rgba(162,140,255,.24);border-radius:7px;background:rgba(162,140,255,.035);color:rgba(240,231,220,.78);font-size:13px}.order-question span{color:#b8aaff;font-weight:700}.path-order-layout .sequence-reverse{display:grid;grid-template-columns:1fr;gap:4px}.path-order-layout .sequence-reverse code{font-size:10px}.path-order-layout .sequence-reverse strong{text-align:left}.permutation-repo-note b{color:var(--fg)}
</style>

---
layout: default
class: lance-stack-slide
---

<div class="lance-stack-content">
  <Eyebrow>The storage and retrieval stack</Eyebrow>
  <h1>One dataset for graph traversal and HDC</h1>
  <p class="lede">LanceDB (and Lance format) manage the tables; <code>lance-graph</code> adds a graph engine</p>
  <div class="lance-stack-layout">
    <div class="lance-stack-copy">
      <div class="stack-point"><b>Lance format</b><p>Arrow-native, columnar, and versioned. Structured properties, fixed-size float16 hypervectors, and image bytes stay in one dataset built for fast scans and random access.</p></div>
      <div class="stack-point"><b>LanceDB</b><p>Creates the graph tables, evolves them with <code>hv</code> and <code>vibe_hv</code>, then runs one cosine search over <code>Location.vibe_hv</code> to rank matching cities.</p></div>
      <div class="stack-point"><b><code>lance-graph</code></b><p>Maps the same Lance datasets into node labels and directed relationships, then runs exact Cypher patterns without copying the rows into another graph store.</p></div>
      <div class="stack-point why"><b>Why agents care</b><p>LanceDB retrieves the multimodal bytes + metadata;<br/><code>lance-graph</code> traverses the paths as a property graph. Both use the same underlying rows (no copying data).</p></div>
    </div>
    <div class="lance-stack-visual" aria-label="Application over LanceDB and lance-graph, backed by shared Lance datasets">
      <div class="stack-app">
        <small>AGENT LAYER</small>
        <strong>fuzzy candidates <i>+</i> factual validation</strong>
        <span>LanceDB cosine search · lance-graph Cypher traversal</span>
      </div>
      <div class="stack-down">↓</div>
      <div class="stack-engines">
        <div class="stack-engine lancedb-engine">
          <small>DATA MANAGEMENT + SEARCH INTERFACE</small>
          <strong class="product-brand"><img src="./assets/lancedb-icon-gray.svg" alt="" aria-hidden="true"/><span>LanceDB</span></strong>
          <span>table lifecycle</span><span>schema + vector columns</span><span>cosine search + filters</span>
        </div>
        <div class="stack-engine graph-engine">
          <small>GRAPH QUERY ENGINE</small>
          <strong>lance-graph</strong>
          <span>GraphConfig</span><span>Cypher patterns</span><span>directed traversal</span>
        </div>
      </div>
      <div class="stack-down compact">↓ same dataset ↓</div>
      <div class="lance-format-layer">
        <div class="format-heading"><small>SHARED STORAGE LAYER</small><strong class="format-brand"><img src="./assets/lance-logo-gray.svg" alt="" aria-hidden="true"/><span>Lance format</span></strong></div>
        <div class="dataset-row"><span>Person.lance</span><span>Location.lance</span><span>VISITED.lance</span></div>
        <div class="column-row"><span>properties</span><span>hv + vibe_hv · f16</span><span>image (blob)</span></div>
        <div class="format-traits">columnar <b>·</b> versioned <b>·</b> fast scans & random-access</div>
      </div>
    </div>
  </div>
  <p class="lance-stack-takeaway">Store the evidence once. <strong>Let graph and vector search tools read different views of the same data.</strong></p>
</div>

<!--
Speaker notes:
- This is the architectural center of the demo: one `person-location/` directory contains three Lance datasets: Person, Location, and VISITED.
- Lance is the shared columnar table/file format. It provides versioned datasets, schema evolution, and fast scans/random access for scalar, vector, and multimodal columns.
- LanceDB is the data-management and vector-search interface: `graph_ingest.py` creates tables from Polars, `hdc_encode.py` adds fixed-size vector columns, and `hdc_retrieve.py` runs cosine search over `Location.vibe_hv`.
- The precision boundary is deliberate: TorchHD performs encoding and algebra in float32; completed vectors are downcast once and persisted in Lance as fixed-size float16 lists. A stored vector is explicitly upcast before it re-enters TorchHD.
- `lance-graph` opens those underlying `.lance` datasets directly, applies `GraphConfig`, and executes exact Cypher from each matched Location to connected Person nodes.
- TorchHD still constructs the query hypervector; LanceDB now performs the nearest-neighbor comparison and returns cosine distance (`similarity = 1 - distance`).
- The payoff is operational as well as conceptual: fuzzy candidates and exact graph validation cannot drift because they read the same rows instead of separately synchronized stores.
- Sources: https://docs.lancedb.com/lance · https://docs.lancedb.com/tables · https://github.com/prrao87/hdc-lancedb/pull/5 · repository `src/graph_ingest.py`, `src/hdc_encode.py`, and `src/graph_retrieve.py`.
-->

<style>
.slidev-layout.lance-stack-slide{padding:88px 84px 40px}.lance-stack-content h1{margin:10px 0 6px;font-size:40px;line-height:1.1;letter-spacing:-.025em}.lance-stack-content>.lede{margin:0;color:rgba(240,231,220,.88);font-size:20px}.lance-stack-content>.lede code{color:var(--accent-soft);font-family:'Geist Mono',ui-monospace,monospace}.lance-stack-layout{display:grid;grid-template-columns:.93fr 1.07fr;gap:28px;height:420px;margin-top:22px}.lance-stack-copy{display:flex;flex-direction:column;justify-content:space-between;padding:4px 0}.stack-point{position:relative;padding-left:22px}.stack-point:before{content:'•';position:absolute;left:0;top:-2px;color:var(--fg);font-size:21px}.stack-point b{color:var(--accent);font-size:17px}.stack-point b code{color:inherit;font-family:'Geist Mono',ui-monospace,monospace}.stack-point p{margin:4px 0 0;color:rgba(240,231,220,.84);font-size:15px;line-height:1.35}.stack-point p code{color:rgba(240,231,220,.96);font:13px 'Geist Mono',ui-monospace,monospace}.stack-point.why{padding:12px 14px 12px 22px;border-left:2px solid var(--accent);background:rgba(255,115,74,.055)}.stack-point.why:before{display:none}.lance-stack-visual{display:flex;flex-direction:column;height:100%;padding:14px;border:1px solid var(--border);border-radius:14px;background:rgba(15,13,11,.72)}.stack-app{padding:12px 16px;border:1px solid rgba(255,115,74,.5);border-radius:9px;background:rgba(255,115,74,.055);text-align:center}.stack-app small,.stack-engine small,.format-heading small{display:block;color:var(--accent-soft);font-size:9px;font-weight:700;letter-spacing:.16em}.stack-app strong{display:block;margin-top:5px;color:var(--fg);font-size:16px}.stack-app strong i{color:var(--accent);font-style:normal}.stack-app span{display:block;margin-top:3px;color:rgba(240,231,220,.56);font:11px 'Geist Mono',ui-monospace,monospace}.stack-down{height:20px;color:rgba(240,231,220,.43);font:16px/20px 'Geist Mono',ui-monospace,monospace;text-align:center}.stack-engines{display:grid;grid-template-columns:1fr 1fr;gap:10px;height:116px}.stack-engine{padding:12px 14px;border:1px solid var(--border-strong);border-radius:9px;background:rgba(240,231,220,.025)}.stack-engine strong{display:block;margin:7px 0;color:var(--fg);font-size:17px}.stack-engine strong.product-brand{display:flex;align-items:center;gap:8px}.product-brand img{display:block;width:20px;height:20px;object-fit:contain}.stack-engine span{display:block;color:rgba(240,231,220,.63);font-size:11px;line-height:1.45}.graph-engine{border-color:rgba(255,115,74,.48);background:rgba(255,115,74,.04)}.graph-engine strong{color:var(--accent-soft);font-family:'Geist Mono',ui-monospace,monospace}.stack-down.compact{box-sizing:border-box;height:30px;padding:7px 0;font-size:10px;line-height:24px}.lance-format-layer{flex:1;padding:11px 14px;border:1px solid rgba(130,117,255,.45);border-radius:9px;background:linear-gradient(135deg,rgba(85,75,170,.11),rgba(255,115,74,.035))}.format-heading{display:flex;align-items:center;justify-content:space-between}.format-heading small{color:#9f92ff}.format-heading strong{color:var(--fg);font-size:16px}.format-heading strong.format-brand{display:flex;align-items:center;gap:8px}.format-brand img{display:block;width:22px;height:22px;object-fit:contain}.dataset-row,.column-row{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px}.dataset-row span{padding:6px;border-radius:5px;background:rgba(240,231,220,.06);color:rgba(240,231,220,.9);font:10px 'Geist Mono',ui-monospace,monospace;text-align:center}.column-row span{padding:5px;border:1px solid rgba(240,231,220,.08);border-radius:5px;color:rgba(240,231,220,.55);font:9px 'Geist Mono',ui-monospace,monospace;text-align:center}.format-traits{margin-top:8px;color:rgba(240,231,220,.66);font:10px 'Geist Mono',ui-monospace,monospace;text-align:center}.format-traits b{color:#9f92ff}.lance-stack-takeaway{margin:16px 0 0;color:rgba(240,231,220,.96);font-size:23px;font-weight:500;text-align:center}.lance-stack-takeaway strong{color:var(--accent-soft)}.slidev-layout.encoding-slide{padding:88px 84px 44px}.encoding-content h1{margin:10px 0 6px;font-size:40px;line-height:1.1;letter-spacing:-.025em}.encoding-content>.lede{margin:0;color:rgba(240,231,220,.88);font-size:21px}.encoding-takeaway{margin:19px 0 0;color:rgba(240,231,220,.96);font-size:24px;font-weight:500;text-align:center}.encoding-takeaway strong{color:var(--accent-soft)}
</style>

---
layout: default
class: results-slide
---

<div class="results-content">
  <Eyebrow>Example result</Eyebrow>
  <h1>SQL, Cypher, or hypervector similarity search</h1>
  <p class="lede"><code>lance-graph</code> expands paths between entities either in Cypher or SQL. LanceDB does vector search</p>
  <div class="score-chart">
    <div class="score-axis"><span>0.0</span><span>0.2</span><span>0.4</span><span>0.6</span><span>0.8</span></div>
    <div class="threshold-line"><span>threshold 0.20</span></div>
    <div class="score-row seattle"><div class="score-label"><strong>Seattle</strong><small>Maya Chen · Robby Jo</small></div><div class="score-track"><i></i><b></b><em>0.742</em></div><div class="score-features"><span>mountains</span><span>pacific_coast</span><span>scenic_urban</span></div></div>
    <div class="score-row slc"><div class="score-label"><strong>Salt Lake City</strong><small>Elena Park</small></div><div class="score-track"><i></i><b></b><em>0.444</em></div><div class="score-features"><span>mountains</span><span>nature_access</span><span>mountain_west</span></div></div>
  </div>
  <div class="result-caption"><span>Retrieved context:</span><b>score ∆ 0.298</b><strong>Difference: <code>pacific-coast</code> evidence</strong></div>
  <p class="results-takeaway">Both results are plausible. <strong>The agent can reason over ranked context.</strong></p>
</div>

<style>
.slidev-layout.results-slide,.slidev-layout.near-miss-slide{padding:88px 84px 44px}.results-content h1,.near-miss-content h1{margin:10px 0 6px;font-size:40px;line-height:1.1;letter-spacing:-.025em}.results-content>.lede,.near-miss-content>.lede{margin:0;color:rgba(240,231,220,.88);font-size:21px}.results-content>.lede code{color:var(--accent-soft);font-family:'Geist Mono',ui-monospace,monospace}.score-chart{position:relative;margin-top:25px;padding:50px 24px 20px;border:1px solid var(--border-strong);border-radius:14px;background:rgba(15,13,11,.76)}.score-axis{position:absolute;left:227px;right:259px;top:16px;display:flex;justify-content:space-between;color:rgba(240,231,220,.48);font:12px 'Geist Mono',ui-monospace,monospace}.threshold-line{position:absolute;left:calc(227px + (100% - 486px)*.25);top:42px;bottom:19px;border-left:1px dashed var(--accent)}.threshold-line span{position:absolute;top:-20px;left:6px;width:110px;color:var(--accent-soft);font:12px 'Geist Mono',ui-monospace,monospace}.score-row{display:grid;grid-template-columns:180px 1fr 235px;align-items:center;gap:18px;min-height:118px}.score-row+.score-row{border-top:1px solid var(--border)}.score-label strong{display:block;color:var(--fg);font-size:22px}.score-label small{display:block;margin-top:6px;color:rgba(240,231,220,.6);font-size:14px}.score-track{position:relative;height:25px;border-radius:999px;background:rgba(240,231,220,.09)}.score-track i{position:absolute;left:0;top:0;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--accent),var(--accent-soft))}.seattle .score-track i{width:92.75%}.slc .score-track i{width:55.5%;background:linear-gradient(90deg,#8c766d,#d78a72)}.score-track b{position:absolute;top:50%;width:18px;height:18px;transform:translate(-50%,-50%);border:3px solid var(--bg-deep);border-radius:50%;background:var(--accent-soft)}.seattle .score-track b{left:92.75%}.slc .score-track b{left:55.5%;background:#d78a72}.score-track em{position:absolute;top:-31px;transform:translateX(-50%);color:var(--accent-soft);font-size:22px;font-style:normal;font-weight:750}.seattle .score-track em{left:92.75%}.slc .score-track em{left:55.5%;color:#d78a72}.score-features{display:flex;flex-wrap:wrap;gap:7px}.score-features span{padding:7px 8px;border:1px solid var(--border-strong);border-radius:7px;color:rgba(240,231,220,.74);font:12px 'Geist Mono',ui-monospace,monospace}.result-caption{display:flex;justify-content:center;align-items:center;gap:25px;margin-top:17px;padding:12px;border:1px solid var(--border-strong);border-radius:10px;background:rgba(15,13,11,.78)}.result-caption span{color:rgba(240,231,220,.58);font:13px 'Geist Mono',ui-monospace,monospace}.result-caption b{color:var(--accent-soft);font-size:18px}.result-caption strong{color:rgba(240,231,220,.88);font-size:16px}.results-takeaway,.near-miss-takeaway{margin:19px 0 0;color:rgba(240,231,220,.96);font-size:24px;font-weight:500;text-align:center}.results-takeaway strong,.near-miss-takeaway strong{color:var(--accent-soft)}
</style>

---
layout: default
class: near-miss-slide
---

<div class="near-miss-content">
  <Eyebrow>Graph vs. HDC search</Eyebrow>
  <h1>Degrade gracefully, rather than fall off a cliff</h1>
  <p class="lede" style="font-size:21px;color:rgba(240,231,220,.88)">Salt Lake City shares meaningful evidence (mountains) with the query; yet, it's got some differences.</p>
  <div class="city-evidence-compare">
    <div class="evidence-city seattle-city">
      <div class="evidence-photo"><img src="./assets/seattle.jpg" alt="Seattle skyline"/><strong>0.742</strong><span>Seattle, WA</span></div>
      <div class="aligned-features"><span class="yes">✓ mountains</span><span class="yes">✓ nature_access</span><span class="yes emph">✓ pacific_coast</span><span class="yes">✓ waterfront</span></div>
    </div>
    <div class="shared-column"><span>shared</span><i></i><b>mountains</b><b>nature</b><i></i><strong>difference</strong></div>
    <div class="evidence-city slc-city">
      <div class="evidence-photo"><img src="./assets/salt-lake-city.jpg" alt="Salt Lake City skyline"/><strong>0.444</strong><span>Salt Lake City, UT</span></div>
      <div class="aligned-features"><span class="yes">✓ mountains</span><span class="yes">✓ nature_access</span><span class="no">✕ pacific_coast</span><span class="no">✕ waterfront</span></div>
    </div>
  </div>
  <div class="binary-vs-ranked"><div><small>GRAPH: EXACT FILTER</small><strong>match / no match</strong></div><b>→</b><div><small>HDC: ASSOCIATIVE RANKING</small><strong>0.742 &gt; 0.444 &gt; threshold</strong></div></div>
  <p class="near-miss-takeaway" style="font-size:24px"><center><strong> In a graph, everything depends on reaching the right entry point. HDC is more forgiving.</strong></center></p>
</div>

<style>
.city-evidence-compare{display:grid;grid-template-columns:1fr 150px 1fr;gap:20px;height:318px;margin-top:24px}.evidence-city{display:grid;grid-template-columns:1.12fr .88fr;border:1px solid var(--border-strong);border-radius:14px;overflow:hidden;background:rgba(15,13,11,.76)}.evidence-photo{position:relative}.evidence-photo img{width:100%;height:100%;object-fit:cover;filter:saturate(.75) contrast(1.04)}.evidence-photo strong{position:absolute;right:12px;top:12px;padding:8px 10px;border-radius:8px;background:rgba(10,8,7,.84);color:var(--accent-soft);font-size:26px}.evidence-photo span{position:absolute;left:12px;bottom:12px;padding:7px 9px;border-radius:6px;background:rgba(10,8,7,.84);color:var(--fg);font-size:15px;font-weight:650}.aligned-features{display:flex;flex-direction:column;justify-content:center;gap:12px;padding:18px}.aligned-features span{padding:10px 11px;border-radius:8px;font:13px 'Geist Mono',ui-monospace,monospace}.aligned-features .yes{color:rgba(240,231,220,.85);background:rgba(240,231,220,.055)}.aligned-features .emph{color:var(--accent-soft);border:1px solid rgba(255,115,74,.32);background:rgba(255,115,74,.08)}.aligned-features .no{color:rgba(240,231,220,.42);border:1px dashed rgba(240,231,220,.2)}.shared-column{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.shared-column span,.shared-column strong{color:rgba(240,231,220,.54);font:12px 'Geist Mono',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.08em}.shared-column b{margin:6px 0;color:var(--fg);font-size:15px}.shared-column i{display:block;width:1px;height:35px;background:var(--border-strong)}.shared-column strong{margin-top:12px;color:var(--accent-soft)}.binary-vs-ranked{display:flex;align-items:center;justify-content:center;gap:25px;margin-top:17px}.binary-vs-ranked>div{display:flex;align-items:center;gap:14px;padding:11px 18px;border:1px solid var(--border-strong);border-radius:9px;background:rgba(15,13,11,.76)}.binary-vs-ranked small{color:rgba(240,231,220,.52);font-size:11px;letter-spacing:.08em}.binary-vs-ranked strong{color:var(--fg);font-size:16px}.binary-vs-ranked>b{color:var(--accent);font-size:22px}.near-miss-takeaway{margin-top:18px}
</style>

---
layout: default
class: validation-slide
---

<div class="validation-content">
  <Eyebrow>The hybrid approach</Eyebrow>
  <h1><i>Could</i> be true vs. "<i>known</i> to be true"</h1>
  <p class="lede">Association ranks semantic relevance; the graph remains the source of facts for validation.</p>
  <div class="validation-pipeline">
    <div class="candidate-stage">
      <div class="stage-title"><span>HDC CANDIDATES</span><strong>could be related</strong></div>
      <div class="candidate-row"><b>0.742</b><span>Maya</span><i>VISITED</i><span>Seattle</span></div>
      <div class="candidate-row"><b>0.742</b><span>Robby</span><i>VISITED</i><span>Seattle</span></div>
      <div class="candidate-row"><b>0.444</b><span>Elena</span><i>VISITED</i><span>Salt Lake City</span></div>
      <small>LanceDB retrieves entities and features; lance-graph expands the paths around them</small>
    </div>
    <div class="validation-arrow">→</div>
    <div class="cypher-gate">
      <div class="gate-label">CYPHER VALIDATION GATE</div>
<pre><code>MATCH (p:Person)
 -[:VISITED]->
 (loc:Location)
RETURN p.name AS person,
       loc.name AS city
ORDER BY p.name</code></pre>
      <span>Cypher over the same tables that run SQL, vector search & FTS</span>
    </div>
    <div class="validation-arrow">→</div>
    <div class="known-stage">
      <div class="stage-title"><span>KNOWN PATH SET (4)</span><strong>known to be true</strong></div>
      <div class="validated-row"><b>✓</b><span>Andre → New York</span><small>outside fuzzy result set</small></div>
      <div class="validated-row"><b>✓</b><span>Maya → Seattle</span><small>image fetched on demand</small></div>
      <div class="validated-row"><b>✓</b><span>Robby → Seattle</span><small>image fetched on demand</small></div>
      <div class="validated-row"><b>✓</b><span>Elena → Salt Lake City</span><small>image fetched on demand</small></div>
      <small>candidate ∩ known paths = 3 ranked results</small>
    </div>
  </div>
  <div class="validation-guardrail"><span>"Persons from cities in the Pacific coast": </span>Get candidates from HDC, then get facts + images from the same Lance table</div>
  <p class="validation-takeaway"><strong>HDC proposes candidates.</strong> The graph confirms what we know is true.</p>
</div>

<style>
.slidev-layout.validation-slide,.slidev-layout.receipt-slide{padding:88px 84px 44px}.validation-content h1,.receipt-content h1{margin:10px 0 6px;font-size:40px;line-height:1.1;letter-spacing:-.025em}.validation-content>.lede,.receipt-content>.lede{margin:0;color:rgba(240,231,220,.88);font-size:21px}.validation-pipeline{display:grid;grid-template-columns:1fr 38px 300px 38px 1fr;align-items:center;gap:12px;height:326px;margin-top:24px}.candidate-stage,.cypher-gate,.known-stage{height:100%;border:1px solid var(--border-strong);border-radius:14px;background:rgba(15,13,11,.76);padding:17px}.stage-title{display:flex;justify-content:space-between;align-items:center;padding-bottom:13px;border-bottom:1px solid var(--border)}.stage-title span,.gate-label{color:var(--accent-soft);font-size:12px;font-weight:700;letter-spacing:.09em}.stage-title strong{color:rgba(240,231,220,.74);font-size:14px}.candidate-row{display:grid;grid-template-columns:55px 1fr 100px 1.2fr;align-items:center;gap:7px;padding:13px 0;border-bottom:1px solid var(--border)}.candidate-row b{color:var(--accent-soft);font-size:18px}.candidate-row span{color:var(--fg);font-size:14px}.candidate-row i{color:rgba(240,231,220,.52);font:11px 'Geist Mono',ui-monospace,monospace;font-style:normal}.candidate-stage>small,.known-stage>small{display:block;margin-top:13px;color:rgba(240,231,220,.5);font-size:12px;line-height:1.35}.validation-arrow{color:var(--accent);font-size:31px;text-align:center}.cypher-gate{border-color:rgba(255,115,74,.42);box-shadow:0 0 35px rgba(255,115,74,.07)}.cypher-gate pre{margin:17px 0 13px;padding:14px;border-radius:9px;background:rgba(0,0,0,.22);font:15px/1.45 'Geist Mono',ui-monospace,monospace}.cypher-gate code{color:var(--fg)}.cypher-gate>span{color:rgba(240,231,220,.56);font-size:13px}.validated-row{display:grid;grid-template-columns:30px 1fr;align-items:center;padding:13px 0;border-bottom:1px solid var(--border)}.validated-row b{grid-row:1/3;color:#7fc7a0;font-size:20px}.validated-row span{color:var(--fg);font-size:15px;font-weight:650}.validated-row small{margin-top:3px;color:rgba(240,231,220,.5);font-size:12px}.validation-guardrail{display:flex;justify-content:center;gap:14px;margin-top:16px;padding:12px 17px;border:1px solid var(--border-strong);border-radius:9px;background:rgba(15,13,11,.78);font-size:15px}.validation-guardrail b{color:var(--accent-soft)}.validation-guardrail span{color:rgba(240,231,220,.75)}.validation-takeaway,.receipt-takeaway{margin:18px 0 0;color:rgba(240,231,220,.96);font-size:24px;font-weight:500;text-align:center}.validation-takeaway strong,.receipt-takeaway strong{color:var(--accent-soft)}
</style>

<style>
.known-stage .validated-row{padding:8px 0}
.known-stage .validated-row span{font-size:14px}
.known-stage .validated-row small{font-size:11px}
.known-stage>small{margin-top:5px}
</style>

---
layout: default
class: receipt-slide
---

<div class="receipt-content">
  <Eyebrow>Why multimodal knowledge graphs matter</Eyebrow>
  <h1>Keep the data's source modality.<br>Derive the representation each task needs.</h1>
  <p class="lede">Medical scans, satellite imagery, maps, and sensor streams contain details that structured properties cannot fully capture.</p>
  <div class="receipt-enrichment">
    <div class="media-source-card">
      <small>MULTIMODAL SOURCE</small>
      <div class="media-source-image"><img src="./assets/seattle.jpg" alt="Seattle skyline"/><span>img/seattle.jpg</span></div>
      <div class="media-signal-list"><b>mountains</b><b>waterfront</b><b>pacific coast</b></div>
    </div>
    <div class="enrichment-arrow"><span>encode</span><b>→</b></div>
    <div class="enriched-row-card">
      <small>LOCATION TABLE · location-seattle</small>
      <strong>One graph record, now evidence-bearing</strong>
      <div class="row-field"><span>properties</span><code>name · region</code></div>
      <div class="row-field feature-list-field"><span>features</span><code>mountains · waterfront · pacific coast</code></div>
      <div class="row-field vector-field"><span>vibe_hv</span><i></i></div>
      <div class="row-field"><span>image</span><code>binary blob · raw JPEG bytes</code></div>
    </div>
    <div class="row-outcomes">
      <div class="row-outcome retrieval-outcome">
        <small>THIS DEMO</small>
        <strong>Associative search with vibe_hv</strong>
        <div><b>0.742</b><span>mountains + waterfront</span></div>
      </div>
      <div class="row-outcome evidence-outcome">
        <small>ALSO POSSIBLE</small>
        <strong>Semantic search with image embeddings</strong>
        <div><b>↗</b><span>image_embedding → similar images</span></div>
      </div>
    </div>
  </div>
  <div class="receipt-captions">
    <p>LanceDB stores source details that a traditional property graph leaves out.</p>
    <p><code>vibe_hv</code> is built by binding each image-derived feature to its role, then bundling the associations.</p>
    <p>An image embedding could add semantic image search later.</p>
  </div>
  <p class="receipt-takeaway">Agents benefit from <strong>rich context.</strong></p>
</div>

<!--
Speaker notes:
- Evidence and multiple retrieval modes are not two unrelated benefits; they both follow from the same underlying problem: important domain knowledge often exists in forms that structured properties cannot fully represent.
- A medical scan cannot be reduced permanently to diagnosis, size, and location. Satellite imagery cannot be reduced to a few land-use labels.
- Those columns are useful, but they are selective interpretations created for today's task.
- Keep the source modality as the durable record. Features, HDC encodings, and embeddings are derived representations that can change as the task changes.
-->

<style>
.receipt-content>h1{font-size:36px}.receipt-content>.lede code{padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;color:var(--accent-soft);font-family:'Geist Mono',ui-monospace,monospace}.receipt-enrichment{display:grid;grid-template-columns:250px 48px 390px 1fr;gap:16px;align-items:stretch;height:260px;margin-top:14px}.media-source-card,.enriched-row-card,.row-outcome{border:1px solid var(--border-strong);border-radius:13px;background:rgba(15,13,11,.8)}.media-source-card{padding:12px}.media-source-card>small,.enriched-row-card>small,.row-outcome>small{display:block;color:var(--accent-soft);font-size:10px;font-weight:750;letter-spacing:.1em}.media-source-image{position:relative;height:100px;margin-top:8px;border-radius:8px;overflow:hidden}.media-source-image img{width:100%;height:100%;object-fit:cover;filter:saturate(.72) contrast(1.05)}.media-source-image span{position:absolute;left:8px;bottom:7px;padding:4px 6px;border-radius:5px;background:rgba(10,8,7,.82);color:var(--fg);font:9px 'Geist Mono',ui-monospace,monospace}.media-signal-list{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px}.media-signal-list b{padding:4px 5px;border:1px solid rgba(255,115,74,.28);border-radius:6px;color:rgba(240,231,220,.84);font:8px 'Geist Mono',ui-monospace,monospace}.media-source-card>p{margin:7px 0 0;color:rgba(240,231,220,.58);font-size:10px;line-height:1.3}.enrichment-arrow{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px}.enrichment-arrow span{color:rgba(240,231,220,.48);font:10px 'Geist Mono',ui-monospace,monospace;text-transform:uppercase}.enrichment-arrow b{color:var(--accent);font-size:29px}.enriched-row-card{padding:15px;border-color:rgba(255,115,74,.48);background:linear-gradient(180deg,rgba(255,115,74,.07),rgba(15,13,11,.82))}.enriched-row-card>strong{display:block;margin:6px 0 8px;color:var(--fg);font-size:18px}.row-field{display:grid;grid-template-columns:90px 1fr;align-items:center;gap:10px;padding:8px 10px;border-top:1px solid var(--border)}.row-field>span{color:var(--accent-soft);font:11px 'Geist Mono',ui-monospace,monospace}.row-field>code{display:block;padding:4px 7px!important;border:0!important;border-radius:5px;background:rgba(0,0,0,.22)!important;box-shadow:none!important;color:rgba(240,231,220,.82);font:12px 'Geist Mono',ui-monospace,monospace}.vector-field>i{display:block;height:22px;border-radius:5px;background-image:linear-gradient(90deg,#ff9e80 0 12%,#716b66 12% 28%,#a28cff 28% 45%,#716b66 45% 59%,#ff9e80 59% 77%,#716b66 77% 89%,#a28cff 89%)}.enriched-row-card>p{margin:7px 0 0;color:rgba(240,231,220,.54);font:10px 'Geist Mono',ui-monospace,monospace;text-align:center}.row-outcomes{display:grid;grid-template-rows:1fr 1fr;gap:10px}.row-outcome{padding:12px}.row-outcome>strong{display:block;margin-top:4px;color:var(--fg);font-size:15px}.row-outcome>div{display:flex;align-items:center;gap:9px;margin-top:7px;padding:6px 8px;border-radius:7px;background:rgba(240,231,220,.045)}.row-outcome>div b{color:var(--accent-soft);font-size:18px}.row-outcome>div span{color:rgba(240,231,220,.78);font:10px 'Geist Mono',ui-monospace,monospace}.row-outcome>p{margin:6px 0 0;color:rgba(240,231,220,.58);font-size:10px;line-height:1.3}.evidence-outcome{border-color:rgba(162,140,255,.38)}.evidence-outcome>small,.evidence-outcome>div b{color:#b8aaff}.receipt-bullets{display:grid;grid-template-columns:250px 454px 1fr;gap:16px;margin:12px 0 0;padding:0;list-style:none}.receipt-bullets li{position:relative;margin:0;padding-left:15px;color:rgba(240,231,220,.9);font-size:12px;line-height:1.3}.receipt-bullets li::before{content:'•';position:absolute;left:0;color:var(--accent)}.receipt-bullets code{color:var(--accent-soft);font:11px 'Geist Mono',ui-monospace,monospace}
.receipt-enrichment{height:242px}.media-source-image{height:112px}.feature-list-field{grid-template-columns:72px 1fr}.feature-list-field>code{font-size:9.5px;white-space:nowrap}.receipt-captions{display:grid;grid-template-columns:250px 48px 390px 1fr;gap:16px;margin:0;padding-top:17px}.receipt-captions p{margin:0;color:rgba(240,231,220,.92);font-size:14px;line-height:1.35}.receipt-captions p:nth-child(1){grid-column:1}.receipt-captions p:nth-child(2){grid-column:3}.receipt-captions p:nth-child(3){grid-column:4}.receipt-captions code{padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;color:var(--accent-soft);font:13px 'Geist Mono',ui-monospace,monospace}.receipt-takeaway{margin:18px 0 0;color:rgba(240,231,220,.96);font-size:20px;font-weight:550;text-align:center}.receipt-takeaway strong{color:var(--accent-soft)}
</style>

<style>
.receipt-loop{position:relative;width:760px;height:330px;margin:22px auto 0}.loop-step{position:absolute;border:1px solid var(--border-strong);border-radius:13px;background:rgba(15,13,11,.82);overflow:hidden}.loop-step>span{display:block;color:var(--accent-soft);font-size:12px;font-weight:700;letter-spacing:.08em}.image-step{left:0;top:0;width:235px;height:140px}.image-step img{width:100%;height:100%;object-fit:cover;filter:saturate(.7)}.image-step span{position:absolute;left:10px;top:10px;padding:5px 7px;border-radius:5px;background:rgba(10,8,7,.8)}.image-step strong{position:absolute;left:10px;bottom:9px;padding:5px 7px;border-radius:5px;background:rgba(10,8,7,.8);color:var(--fg);font:12px 'Geist Mono',ui-monospace,monospace}.evidence-step{right:0;top:0;width:260px;height:140px;padding:17px}.evidence-step>div{display:flex;flex-wrap:wrap;gap:8px;margin-top:17px}.evidence-step b{padding:8px;border:1px solid rgba(255,115,74,.27);border-radius:7px;color:var(--fg);font:12px 'Geist Mono',ui-monospace,monospace}.validation-step{right:0;bottom:0;width:260px;height:125px;padding:17px}.candidate-loop-step{left:0;bottom:0;width:235px;height:125px;padding:17px}.validation-step strong,.candidate-loop-step strong{display:block;margin-top:17px;color:var(--fg);font-size:20px}.candidate-loop-step strong{color:var(--accent-soft);font-size:31px}.validation-step small,.candidate-loop-step small{display:block;margin-top:6px;color:rgba(240,231,220,.54);font-size:13px}.loop-arrow{position:absolute;color:var(--accent);font-size:28px}.loop-arrow.top{left:355px;top:46px}.loop-arrow.right{right:117px;top:145px}.loop-arrow.bottom{left:355px;bottom:43px}.loop-arrow.left{left:106px;top:145px}.loop-center{position:absolute;left:274px;top:103px;width:212px;height:124px;display:flex;flex-direction:column;justify-content:center;border:1px solid rgba(255,115,74,.4);border-radius:50%;background:radial-gradient(circle,rgba(255,115,74,.12),rgba(15,13,11,.9));text-align:center}.loop-center strong{color:var(--fg);font-size:19px}.loop-center span{margin-top:6px;color:var(--accent-soft);font-size:13px}.loop-center small{margin-top:5px;color:rgba(240,231,220,.52);font-size:12px}.receipt-result{position:absolute;right:84px;top:245px;width:285px;height:145px;display:none}.receipt-result img{width:100px;object-fit:cover}.receipt-takeaway{margin-top:17px}
</style>

---
layout: default
class: architecture-slide
---

<div class="architecture-content">
  <Eyebrow>Why the storage layer matters</Eyebrow>
  <h1>One dataset, multiple views.</h1>
  <p class="lede">Graph topology, structured facts, HDC vectors, and raw image bytes stay co-located and co-versioned.</p>
  <div class="architecture-map" style="height:335px">
    <div class="arch-consumer similarity"><span>HYPERVECTORS + VECTORS</span><strong>cosine over <code>vibe_hv</code></strong><small>associative search</small></div>
    <div class="arch-arrow a1">↖</div>
    <div class="arch-consumer traversal"><span>GRAPH</span><strong><code>lance-graph</code></strong><small>exact topology</small></div>
    <div class="arch-arrow a2">↑</div>
    <div class="arch-consumer assets"><span>BLOBS (IMAGE BYTES)</span><strong>Image retrieval</strong><small>binary/nested assets · on demand</small></div>
    <div class="arch-arrow a3">↗</div>
    <div class="lancedb-core" style="height:215px">
      <div class="core-brand"><img src="./assets/lancedb-icon-gray.svg" alt="" aria-hidden="true"/><strong>LanceDB</strong><span>Vector search · Cypher · SQL · Raw bytes</span></div>
      <div class="table-stack">
        <div><b>Person</b><span>properties</span><span>hv · f16</span></div>
        <div><b>VISITED</b><span>person_id · location_id</span><span>vibe_hv · f16</span></div>
        <div><b>Location</b><span>properties · image (blob)</span><span>hv · vibe_hv · f16</span></div>
      </div>
      <div class="format-note" style="display:none"><span>Lance format layer</span><b>fixed-size float16 vector columns</b></div>
    </div>
  </div>
  <div class="architecture-boundary" style="display:none"><b>Boundary:</b><span>LanceDB is the implementation used here, but it is not a prerequisite for HDC as a concept.</span></div>
  <p class="architecture-takeaway">Hypervectors complement, not replace, graphs. <strong>Both are views that operate over the same data.</strong></p>
</div>

<style>
.slidev-layout.architecture-slide{padding:88px 84px 44px}.architecture-content h1{margin:10px 0 6px;font-size:40px;line-height:1.1;letter-spacing:-.025em}.architecture-content>.lede{margin:0;color:rgba(240,231,220,.88);font-size:21px}.architecture-map{position:relative;height:362px;margin-top:20px}.arch-consumer{position:absolute;top:0;width:295px;height:115px;padding:17px 19px;border:1px solid var(--border-strong);border-radius:13px;background:rgba(15,13,11,.78);text-align:center}.arch-consumer.similarity{left:40px}.arch-consumer.traversal{left:408px}.arch-consumer.assets{right:40px}.arch-consumer span{display:block;color:var(--accent-soft);font-size:12px;font-weight:700;letter-spacing:.09em}.arch-consumer strong{display:block;margin-top:10px;color:var(--fg);font-size:18px}.arch-consumer code{color:inherit;font-family:'Geist Mono',ui-monospace,monospace}.arch-consumer small{display:block;margin-top:6px;color:rgba(240,231,220,.54);font-size:13px}.arch-arrow{position:absolute;top:108px;color:var(--accent);font-size:31px}.arch-arrow.a1{left:328px}.arch-arrow.a2{left:548px}.arch-arrow.a3{right:328px}.lancedb-core{position:absolute;left:180px;right:180px;bottom:0;height:221px;border:1px solid rgba(255,115,74,.45);border-radius:18px;background:radial-gradient(circle at 50% 0,rgba(255,115,74,.12),rgba(15,13,11,.9) 62%);box-shadow:0 0 45px rgba(255,115,74,.06);padding:18px 22px}.core-brand{display:flex;align-items:center;justify-content:center;gap:11px}.core-brand img{display:block;width:26px;height:26px;object-fit:contain}.core-brand strong{color:var(--fg);font-size:27px}.core-brand span{padding-left:13px;border-left:1px solid var(--border-strong);color:rgba(240,231,220,.58);font-size:14px}.table-stack{display:flex;flex-direction:column;gap:7px;margin-top:16px}.table-stack>div{display:grid;grid-template-columns:150px 1fr 190px;align-items:center;padding:9px 13px;border:1px solid var(--border);border-radius:8px;background:rgba(0,0,0,.12)}.table-stack b{color:var(--accent-soft);font:14px 'Geist Mono',ui-monospace,monospace}.table-stack span{color:rgba(240,231,220,.74);font-size:14px}.table-stack span:last-child{color:var(--fg);font-family:'Geist Mono',ui-monospace,monospace}.format-note{display:flex;justify-content:center;gap:15px;margin-top:12px;font-size:13px}.format-note span{color:rgba(240,231,220,.52)}.format-note b{color:rgba(240,231,220,.82)}.architecture-boundary{display:flex;justify-content:center;gap:12px;margin-top:5px;color:rgba(240,231,220,.72);font-size:15px}.architecture-boundary b{color:var(--accent-soft)}.architecture-takeaway{margin:17px 0 0;color:rgba(240,231,220,.96);font-size:24px;font-weight:500;text-align:center}.architecture-takeaway strong{color:var(--accent-soft)}
</style>

<style>
.architecture-map{height:335px}
.lancedb-core{height:200px}
.table-stack>div{padding:7px 13px}
.format-note{display:none}
.architecture-boundary{margin-top:9px}
.architecture-takeaway{margin-top:17px}
</style>

---
layout: default
class: precision-slide
---

<div class="precision-content">
  <div class="precision-badge">START WITH THE DEFAULTS · SCALE-OUT WITH COMPRESSION</div>
  <h1>Compute in f32. Persist in f16. Index with RaBitQ at scale.</h1>
  <p class="lede">Precision (compute) and compression (storage) are controlled at different boundaries.</p>
  <div class="precision-flow">
    <section class="precision-stage compute-stage">
      <small>1 · HDC (COMPUTE)</small>
      <strong>TorchHD · <code>float32</code></strong>
      <i class="precision-vector compute-vector"></i>
      <code>10,000 × 4 B = 40 KB</code>
      <p>bind · bundle · permute · update prototypes</p>
      <em>Keep the algebra in f32.</em>
    </section>
    <div class="precision-arrow"><span>encoding complete</span><b>→</b><small>downcast once</small></div>
    <section class="precision-stage persist-stage">
      <small>2 · LANCEDB (STORAGE) · COMPRESSION</small>
      <strong>FixedSizeList&lt;float16&gt;[10,000]</strong>
      <i class="precision-vector persist-vector"></i>
      <code>10,000 × 2 B = 20 KB</code>
      <p>half the raw payload of f32</p>
      <em>Upcast before returning to TorchHD.</em>
    </section>
    <div class="precision-arrow"><span>large <i>n</i></span><b>→</b><small>build ANN index</small></div>
    <section class="precision-stage index-stage">
      <small>3 · LANCEDB (RETRIEVAL) · INDEX</small>
      <strong><code>IVF_RQ</code> · RaBitQ</strong>
      <i class="precision-vector bit-vector"></i>
      <code>1 bit / dimension</code>
      <p>≈ 1.25 KB code + correction values</p>
      <em>Compressed index; the base f16 column remains.</em>
    </section>
  </div>
  <div class="precision-guardrails">
    <span><b>THIS DEMO</b> exact kNN</span>
    <span><b>AT SCALE</b> always measure <code>IVF_RQ</code> recall vs. <code>IVF_FLAT</code> search, then tune</span>
    <span><b>CONVENIENT</b> d = 10,000 is divisible by 8</span>
  </div>
  <p class="precision-takeaway"><strong>Use compression for persistence and indexing.</strong> Get precision on HDC operations.</p>
</div>

<!--
Speaker notes:
- PR #5 makes the precision boundary concrete. TorchHD still creates and manipulates MAP hypervectors in float32; only completed vectors are downcast at the Arrow/Lance storage boundary.
- A 10,000-dimensional vector occupies about 40 KB as float32 and 20 KB as float16, before index overhead. With two stored vectors per row, one million rows would therefore be roughly 80 GB versus 40 GB of raw coordinate payload.
- The demo's MAP coordinates are small integers and are represented exactly in float16, so the tested Seattle and Salt Lake City ranking and scores do not change. Production workloads with wider numeric ranges must validate this precision choice.
- TorchHD does not officially support MAP operations in float16. Any stored vector used in further binding, bundling, permutation, or prototype updates must first be promoted back to float32.
- The demo still uses an exact flat scan because it has only three Location rows. For large tables, recommend evaluating LanceDB's `IVF_RQ` index, which uses RaBitQ quantization for compressed approximate retrieval.
- Standard RaBitQ stores a 1-bit code per dimension plus small corrective values. For 10,000 dimensions, the bit code itself is 10,000 / 8 = 1,250 bytes. That is index representation, not a replacement for the persisted float16 vector column.
- `IVF_RQ` requires a dimension divisible by 8; 10,000 qualifies. Tune partitions and validate recall against a sampled exact flat-search ground truth before adopting it.
- Sources: https://github.com/prrao87/hdc-lancedb/pull/5 · https://docs.lancedb.com/indexing/quantization · https://docs.lancedb.com/indexing/vector-index
-->

<style>
.slidev-layout.precision-slide{padding:88px 84px 40px}.precision-badge{display:inline-block;padding:7px 10px;border:1px solid rgba(255,115,74,.36);border-radius:7px;background:rgba(255,115,74,.07);color:var(--accent-soft);font-size:12px;font-weight:750;letter-spacing:.09em}.precision-content h1{margin:10px 0 6px;font-size:40px;line-height:1.08;letter-spacing:-.025em}.precision-content>.lede{margin:0;color:rgba(240,231,220,.86);font-size:21px}.precision-flow{display:grid;grid-template-columns:1fr 78px 1fr 78px 1fr;gap:11px;height:280px;margin-top:21px}.precision-stage{display:flex;flex-direction:column;justify-content:center;padding:20px 18px;border-top:2px solid var(--accent);border-bottom:1px solid var(--border-strong);background:linear-gradient(180deg,rgba(255,115,74,.055),rgba(15,13,11,.7))}.precision-stage>small{color:var(--accent-soft);font-size:9px;font-weight:750;letter-spacing:.1em}.precision-stage>strong{margin-top:9px;color:var(--fg);font-size:20px;line-height:1.2}.precision-stage>code{display:block;margin-top:15px;padding:6px 7px!important;border-radius:6px;background:rgba(0,0,0,.24)!important;color:var(--fg)!important;font:15px 'Geist Mono',ui-monospace,monospace;text-align:center}.precision-stage>p{margin:12px 0 0;color:rgba(240,231,220,.68);font-size:14px;line-height:1.35;text-align:center}.precision-stage>em{margin-top:11px;color:rgba(240,231,220,.88);font-size:13px;font-style:normal;text-align:center}.precision-vector{display:block;height:37px;margin-top:17px;border-radius:5px}.compute-vector{background-image:linear-gradient(90deg,#ff9e80 0 12%,#6b645e 12% 27%,#a28cff 27% 44%,#6b645e 44% 59%,#41b6ff 59% 76%,#6b645e 76% 88%,#ff9e80 88%)}.persist-stage{border-top-color:#a28cff;background:linear-gradient(180deg,rgba(162,140,255,.055),rgba(15,13,11,.7))}.persist-stage>small{color:#b8aaff}.persist-stage>strong{font:17px/1.25 'Geist Mono',ui-monospace,monospace}.persist-vector{background-image:linear-gradient(90deg,#a28cff 0 18%,#625d58 18% 33%,#41b6ff 33% 52%,#625d58 52% 67%,#ff9e80 67% 84%,#625d58 84%)}.index-stage{border-top-color:#41b6ff;background:linear-gradient(180deg,rgba(65,182,255,.05),rgba(15,13,11,.7))}.index-stage>small{color:#7bd8ff}.bit-vector{background-size:16px 37px;background-image:linear-gradient(90deg,#41b6ff 0 48%,#263943 48%)}.precision-arrow{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.precision-arrow>span{color:rgba(240,231,220,.56);font:10px/1.3 'Geist Mono',ui-monospace,monospace}.precision-arrow>span i{color:var(--fg);font-style:normal}.precision-arrow>b{margin:8px 0;color:var(--accent);font-size:29px}.precision-arrow>small{color:rgba(240,231,220,.43);font-size:10px;line-height:1.25}.precision-guardrails{display:grid;grid-template-columns:.8fr 1.45fr 1fr;gap:11px;margin-top:14px}.precision-guardrails span{padding:10px 12px;border-left:2px solid rgba(162,140,255,.62);background:rgba(162,140,255,.035);color:rgba(240,231,220,.76);font-size:13px;text-align:center}.precision-guardrails b{margin-right:7px;color:#b8aaff;font-size:10px;letter-spacing:.08em}.precision-takeaway{margin:17px 0 0;color:rgba(240,231,220,.95);font-size:24px;font-weight:500;text-align:center}.precision-takeaway strong{color:var(--accent-soft)}
</style>

---
layout: default
class: csr-slide
---

<div class="csr-content">
  <div class="future-badge">FUTURE WORK · PROMISING DIRECTION</div>
  <h1>If we materialize similarity edges, keep only the top-k.</h1>
  <p class="lede">A CSR neighbor graph gives agents explicit traversal without storing every possible pair.</p>
  <div class="csr-comparison">
    <div class="network-panel dense-network">
      <span>DENSE / ALL-PAIRS</span>
      <svg viewBox="0 0 300 210" aria-hidden="true">
        <g stroke="rgba(240,231,220,.16)" stroke-width="1"><path d="M45 35L150 25L255 42L275 118L220 183L105 185L28 120Z"/><path d="M45 35L255 42M45 35L275 118M45 35L220 183M45 35L105 185M150 25L275 118M150 25L220 183M150 25L105 185M150 25L28 120M255 42L220 183M255 42L105 185M255 42L28 120M275 118L105 185M275 118L28 120M220 183L28 120"/></g>
        <g fill="#ff8b68"><circle cx="45" cy="35" r="8"/><circle cx="150" cy="25" r="8"/><circle cx="255" cy="42" r="8"/><circle cx="275" cy="118" r="8"/><circle cx="220" cy="183" r="8"/><circle cx="105" cy="185" r="8"/><circle cx="28" cy="120" r="8"/></g>
      </svg>
      <strong>O(n²) edges</strong><small>every pair materialized</small>
    </div>
    <div class="csr-transform"><b>→</b><span>retain <i>k</i> nearest<br/>neighbors / node</span><small>k ≪ n</small><b>→</b></div>
    <div class="network-panel sparse-network">
      <span>TOP-k NEIGHBOR GRAPH</span>
      <svg viewBox="0 0 300 210" aria-hidden="true">
        <g stroke="#df7658" stroke-width="2"><path d="M45 35L150 25L255 42L275 118L220 183L105 185L28 120L45 35"/><path d="M150 25L220 183M255 42L105 185"/></g>
        <g fill="#ff9e80"><circle cx="45" cy="35" r="8"/><circle cx="150" cy="25" r="8"/><circle cx="255" cy="42" r="8"/><circle cx="275" cy="118" r="8"/><circle cx="220" cy="183" r="8"/><circle cx="105" cy="185" r="8"/><circle cx="28" cy="120" r="8"/></g>
      </svg>
      <strong>O(nk) edges</strong><small>bounded adjacency per node</small>
    </div>
    <div class="storage-panel">
      <div class="storage-brand"><img src="./assets/lancedb-icon-gray.svg" alt="" aria-hidden="true"/><strong>LanceDB / Lance</strong></div>
      <div class="storage-row"><span>Base HDC columns</span><b>FixedSizeList&lt;float16&gt;[d]</b></div>
      <div class="storage-row csr-arrays"><span>Derived CSR adjacency</span><b>indptr</b><b>indices</b><b>scores?</b></div>
      <div class="storage-caveat"><strong>Different jobs</strong><span>IVF_RQ searches · CSR traverses</span></div>
    </div>
  </div>
  <div class="csr-distinction"><b>RaBitQ</b><span>compresses candidate search</span><i>→</i><b>top-k CSR</b><span>materializes selected relationships</span></div>
  <p class="csr-takeaway">If <i>k</i> stays fixed, edge storage becomes <strong>linear in the number of nodes.</strong></p>
</div>

<!--
Speaker notes:
- This slide is a separate future direction from the preceding RaBitQ slide. RaBitQ is an ANN index used to retrieve neighbors; CSR is an optional graph representation used to persist and traverse selected neighbor relationships.
- Here, `k` is the maximum number of nearest neighbors retained per node. With `n` nodes, a directed top-k graph stores at most `n × k` adjacency entries.
- If `k` remains a small constant as `n` grows, `O(nk)` reduces to `O(n)` edge storage. An undirected or symmetrized construction changes constant factors, not the asymptotic bound.
- The dense comparison is `n(n−1)` directed edges or `n(n−1)/2` undirected edges, both `O(n²)`.
- A plausible production path is: use `IVF_RQ` to generate candidate neighbors, keep only the useful top-k results per node, then write that adjacency in CSR-style arrays for graph traversal.
- This CSR materialization is not implemented or benchmarked in the repository. The float16 storage boundary is shipped; this derived graph remains a research direction.
-->

<style>
.slidev-layout.csr-slide{padding:88px 84px 38px}.future-badge{display:inline-block;padding:7px 10px;border:1px solid rgba(255,115,74,.36);border-radius:7px;background:rgba(255,115,74,.07);color:var(--accent-soft);font-size:12px;font-weight:750;letter-spacing:.09em}.csr-content h1{margin:10px 0 6px;font-size:40px;line-height:1.08;letter-spacing:-.025em}.csr-content>.lede{margin:0;color:rgba(240,231,220,.86);font-size:20px}.csr-comparison{display:grid;grid-template-columns:250px 96px 250px 1fr;gap:15px;height:290px;margin-top:18px}.network-panel,.storage-panel{min-height:0;border:1px solid var(--border-strong);border-radius:14px;background:rgba(15,13,11,.76);padding:14px;text-align:center}.network-panel>span{color:var(--accent-soft);font-size:11px;font-weight:700;letter-spacing:.08em}.network-panel svg{display:block;width:100%;height:170px;margin-top:2px}.network-panel strong{display:block;color:var(--fg);font:20px 'Geist Mono',ui-monospace,monospace}.network-panel small{display:block;margin-top:5px;color:rgba(240,231,220,.52);font-size:12px}.csr-transform{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.csr-transform>b{color:var(--accent);font-size:27px}.csr-transform span{margin:8px 0 4px;color:rgba(240,231,220,.68);font-size:13px;line-height:1.35}.csr-transform span i{color:var(--accent-soft);font:700 15px 'Geist Mono',ui-monospace,monospace}.csr-transform small{margin-bottom:7px;color:#b8aaff;font:11px 'Geist Mono',ui-monospace,monospace}.storage-panel{text-align:left;padding:15px 16px}.storage-brand{display:flex;align-items:center;gap:9px;padding-bottom:10px;border-bottom:1px solid var(--border)}.storage-brand img{display:block;width:20px;height:20px;object-fit:contain}.storage-brand strong{color:var(--fg);font-size:18px}.storage-row{margin-top:10px;padding:10px;border:1px solid var(--border);border-radius:8px;background:rgba(0,0,0,.12)}.storage-row span{display:block;color:var(--accent-soft);font-size:12px;font-weight:650}.storage-row b{display:block;margin-top:6px;color:rgba(240,231,220,.75);font:12px 'Geist Mono',ui-monospace,monospace}.storage-row.csr-arrays{display:grid;grid-template-columns:1fr 1fr 1fr}.storage-row.csr-arrays span{grid-column:1/-1}.storage-row.csr-arrays b{margin-right:5px;padding:5px;border-radius:5px;background:rgba(255,115,74,.07);text-align:center}.storage-caveat{margin-top:10px;padding:8px 10px;border-left:3px solid var(--accent);background:rgba(255,115,74,.055)}.storage-caveat strong,.storage-caveat span{display:block;font-size:12px}.storage-caveat strong{color:var(--accent-soft)}.storage-caveat span{margin-top:4px;color:rgba(240,231,220,.72)}.csr-distinction{display:grid;grid-template-columns:auto 1fr 34px auto 1fr;align-items:center;gap:10px;margin-top:13px;padding:10px 16px;border-top:1px solid var(--border-strong);border-bottom:1px solid var(--border-strong);color:rgba(240,231,220,.65);font-size:13px;text-align:center}.csr-distinction b{color:var(--accent-soft);font:700 13px 'Geist Mono',ui-monospace,monospace}.csr-distinction i{color:rgba(240,231,220,.4);font-style:normal}.csr-takeaway{margin:14px 0 0;color:rgba(240,231,220,.95);font-size:23px;font-weight:500;text-align:center}.csr-takeaway strong{color:var(--accent-soft)}.csr-takeaway i{color:#b8aaff;font-family:'Geist Mono',ui-monospace,monospace}
</style>

---
layout: default
class: next-edge-slide
---

<div class="next-edge-content">
  <Eyebrow>Beyond retrieval: HDC for Machine Learning</Eyebrow>
  <h1>From associative search to associative <i>memory</i></h1>
  <p class="lede">Treat each possible destination as a class prototype; bundle the graph contexts that preceded it.</p>
  <div class="next-edge-visual" role="img" aria-label="Maya's ordered VISITED edges are encoded as a hypervector, compared with destination prototypes in Associative Memory, and used to predict her next VISITED edge">
    <div class="graph-context-panel">
      <small>GRAPH CONTEXT AT TIME <i>t</i></small>
      <svg viewBox="0 0 310 105" aria-hidden="true">
        <defs><marker id="next-edge-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#ff8b68"/></marker></defs>
        <path d="M82 38 C113 38 142 38 176 38" fill="none" stroke="#ff8b68" stroke-width="2" marker-end="url(#next-edge-arrow)"/>
        <circle cx="52" cy="38" r="28" fill="rgba(65,182,255,.08)" stroke="#58c4ff" stroke-width="2"/>
        <text x="52" y="35" class="next-node-type">Person</text><text x="52" y="51" class="next-node-name">Maya</text>
        <rect x="184" y="13" width="111" height="50" rx="11" fill="rgba(255,115,74,.07)" stroke="#ff8b68" stroke-width="2"/>
        <text x="239.5" y="34" class="next-node-type">Location</text><text x="239.5" y="51" class="next-node-name">Pike Place</text>
        <rect x="97" y="25" width="78" height="20" rx="5" fill="#1d1713" stroke="rgba(255,115,74,.36)"/>
        <text x="136" y="38" class="next-edge-label">VISITED @ t</text>
        <text x="239.5" y="85" class="next-evidence-label">E(Lt): multimodal evidence</text>
      </svg>
      <div class="recent-visits">
        <span><small><i>t</i>−1</small><b>Space Needle</b></span><i>→</i><span><small><i>t</i></small><b>Pike Place</b></span>
      </div>
    </div>
    <div class="story-arrow"><span>encode</span><b>→</b></div>
    <div class="context-hv-panel">
      <small>FIXED ENCODER <i>φ</i></small>
      <strong>h<sub>i,t</sub></strong>
      <div class="context-hv-stripe"></div>
      <div class="operation-tags"><span>bind</span><span>bundle</span><span>permute</span></div>
      <p>one vector for the graph context</p>
    </div>
    <div class="story-arrow"><span>query</span><b>→</b></div>
    <div class="associative-memory-panel">
      <div class="memory-heading"><span>ASSOCIATIVE MEMORY</span><small>destination class prototypes</small></div>
      <div class="prototype-row"><code>M<sub>ℓ₁</sub></code><i class="prototype-stripe p1"></i><span>Space Needle</span></div>
      <div class="prototype-row"><code>M<sub>ℓ₂</sub></code><i class="prototype-stripe p2"></i><span>Pike Place</span></div>
      <div class="prototype-row"><code>M<sub>ℓ₃</sub></code><i class="prototype-stripe p3"></i><span>another candidate</span></div>
      <div class="predicted-edge"><span>P<sub>i</sub></span><b>—[ VISITED<sub>next</sub> ]→</b><strong>ℓ̂<sub>i,t+1</sub></strong></div>
    </div>
  </div>
  <div class="next-edge-math">
    <div class="context-math-block">
      <small>1 · ENCODE THE PERSON'S GRAPH CONTEXT</small>
      <code>F<sub>i,t−j</sub> = P<sub>i</sub> × R<sub>VISITED</sub> × L<sub>t−j</sub></code>
      <code>h<sub>i,t</sub> = E(L<sub>t</sub>) + Σ<sub>j=0</sub><sup>k−1</sup> ρ<sup>j</sup>(F<sub>i,t−j</sub>)</code>
    </div>
    <div class="memory-math-block">
      <small>2 · BUILD, QUERY, AND CORRECT THE PROTOTYPES</small>
      <code>M<sub>ℓ</sub> = Σ<sub>(i,t): y<sub>i,t+1</sub>=ℓ</sub> h<sub>i,t</sub></code>
      <code>ℓ̂<sub>i,t+1</sub> = arg max<sub>ℓ∈C<sub>G</sub>(i,t)</sub> cos(h<sub>i,t</sub>, M<sub>ℓ</sub>)</code>
      <code class="correction-rule">ℓ̂ ≠ y : &nbsp; M<sub>y</sub> ← M<sub>y</sub> + ηh &nbsp;;&nbsp; M<sub>ℓ̂</sub> ← M<sub>ℓ̂</sub> − ηh</code>
    </div>
  </div>
  <p class="next-edge-takeaway"><strong>The graph defines C<sub>G</sub>, the possible next visits.<br/></strong> Associative Memory updates M<sub>ℓ</sub> and ranks the next edge, without backpropagating through <i>φ</i>.</p>
</div>

<!--
Speaker notes:
- This is a thought experiment and is not implemented in the repository.
- Training requires observed VISITED edges with timestamps or ordinal positions, potentially across many people.
- The prediction task is graph-constrained multiclass classification: the graph supplies the eligible destination set C_G(i,t), and HDC ranks those candidates.
- F_(i,t-j) binds person, VISITED role, and a previously visited location into one fact hypervector. Permutation rho^j assigns that fact a position in the recent visit sequence.
- h_(i,t) bundles the current location's multimodal evidence E(L_t) and the ordered recent VISITED facts. The encoder phi stays fixed in this prototype-style formulation.
- Associative Memory is the standard HDC component that stores class prototypes. Here, every possible next destination l is a class, and M_l is the bundled memory of graph contexts that were followed by that destination.
- Inference chooses the destination prototype with maximum cosine similarity, restricted to graph-valid candidates.
- The final line shows an optional error-driven retraining rule used by HDC classifiers: add the context to the true destination memory and subtract it from the incorrectly predicted memory.
- The contrast with typical end-to-end deep learning is where adaptation happens: gradient descent changes encoder parameters theta; this formulation maintains distributed class memories M_l while phi remains fixed.
- Paper connection: Colonnese et al., “Hyperdimensional Computing for ADHD Classification using EEG Signals,” arXiv:2501.05186v1, Section IV-D. Their classes are ADHD and Control; this slide makes the next location the class instead.
- Notation: × is binding, + is bundling, rho is a fixed positional permutation, E(L_t) is multimodal location evidence, and C_G is the graph-constrained candidate set.
-->

<style>
.slidev-layout.next-edge-slide{padding:88px 84px 38px}.next-edge-content h1{margin:10px 0 5px;font-size:40px;line-height:1.08;letter-spacing:-.025em}.next-edge-content>.lede{margin:0;color:rgba(240,231,220,.86);font-size:20px}.next-edge-visual{display:grid;grid-template-columns:300px 43px 205px 43px 1fr;gap:11px;align-items:stretch;height:224px;margin-top:17px}.graph-context-panel,.context-hv-panel,.associative-memory-panel{border:1px solid var(--border-strong);border-radius:14px;background:rgba(15,13,11,.78)}.graph-context-panel{padding:13px 14px}.graph-context-panel>small,.context-hv-panel>small{display:block;color:var(--accent-soft);font-size:10px;font-weight:750;letter-spacing:.1em}.graph-context-panel>small i,.context-hv-panel>small i{font-family:'Geist Mono',ui-monospace,monospace}.graph-context-panel svg{display:block;width:100%;height:112px;margin-top:1px}.next-node-type{fill:rgba(240,231,220,.58);font:9px 'Geist Mono',ui-monospace,monospace;text-anchor:middle}.next-node-name{fill:#f0e7dc;font:700 12px 'Geist',sans-serif;text-anchor:middle}.next-edge-label{fill:#ff9e80;font:700 7px 'Geist Mono',ui-monospace,monospace;text-anchor:middle}.next-evidence-label{fill:rgba(240,231,220,.52);font:9px 'Geist Mono',ui-monospace,monospace;text-anchor:middle}.recent-visits{display:grid;grid-template-columns:1fr 20px 1fr;align-items:center;gap:7px;margin-top:2px}.recent-visits>span{padding:7px 8px;border:1px solid rgba(162,140,255,.28);border-radius:7px;background:rgba(162,140,255,.04)}.recent-visits small,.recent-visits b{display:block}.recent-visits small{color:#b8aaff;font:9px 'Geist Mono',ui-monospace,monospace}.recent-visits b{margin-top:3px;color:rgba(240,231,220,.8);font-size:11px}.recent-visits>i{color:rgba(240,231,220,.4);font-style:normal;text-align:center}.story-arrow{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}.story-arrow span{color:rgba(240,231,220,.48);font:9px 'Geist Mono',ui-monospace,monospace;text-transform:uppercase}.story-arrow b{color:var(--accent);font-size:28px}.context-hv-panel{display:flex;flex-direction:column;justify-content:center;padding:17px 18px;text-align:center;border-color:rgba(255,115,74,.42);background:radial-gradient(circle at 50% 45%,rgba(255,115,74,.1),rgba(15,13,11,.82) 65%)}.context-hv-panel>strong{margin-top:8px;color:var(--fg);font:700 29px 'Geist Mono',ui-monospace,monospace}.context-hv-stripe{height:34px;margin-top:12px;border-radius:5px;background-image:linear-gradient(90deg,#ff9e80 0 11%,#625d58 11% 27%,#a28cff 27% 42%,#625d58 42% 58%,#41b6ff 58% 73%,#625d58 73% 87%,#ff9e80 87%)}.operation-tags{display:flex;justify-content:center;gap:5px;margin-top:11px}.operation-tags span{padding:4px 5px;border:1px solid rgba(255,115,74,.24);border-radius:5px;color:rgba(240,231,220,.68);font:8px 'Geist Mono',ui-monospace,monospace}.context-hv-panel p{margin:9px 0 0;color:rgba(240,231,220,.5);font-size:10px}.associative-memory-panel{padding:13px 15px;border-color:rgba(162,140,255,.38);background:linear-gradient(180deg,rgba(162,140,255,.055),rgba(15,13,11,.8))}.memory-heading{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding-bottom:8px;border-bottom:1px solid var(--border)}.memory-heading span{color:#b8aaff;font-size:10px;font-weight:750;letter-spacing:.1em}.memory-heading small{color:rgba(240,231,220,.5);font-size:9px}.prototype-row{display:grid;grid-template-columns:39px 1fr 105px;align-items:center;gap:9px;padding:8px 0;border-bottom:1px solid rgba(240,231,220,.06)}.next-edge-slide code{padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important}.prototype-row code{color:#c2b7ff!important;font:700 13px 'Geist Mono',ui-monospace,monospace}.prototype-row>span{color:rgba(240,231,220,.65);font-size:10px;text-align:right}.prototype-stripe{display:block;height:18px;border-radius:4px}.prototype-stripe.p1{background-image:linear-gradient(90deg,#a28cff 0 15%,#5f5a56 15% 35%,#ff9e80 35% 51%,#5f5a56 51% 73%,#41b6ff 73% 89%,#5f5a56 89%)}.prototype-stripe.p2{background-image:linear-gradient(90deg,#5f5a56 0 13%,#41b6ff 13% 31%,#5f5a56 31% 47%,#a28cff 47% 67%,#5f5a56 67% 84%,#ff9e80 84%)}.prototype-stripe.p3{background-image:linear-gradient(90deg,#ff9e80 0 17%,#5f5a56 17% 29%,#a28cff 29% 48%,#5f5a56 48% 66%,#41b6ff 66% 78%,#5f5a56 78%)}.predicted-edge{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:9px;margin-top:9px;padding:9px 11px;border:1px solid rgba(255,115,74,.32);border-radius:8px;background:rgba(255,115,74,.055);font-family:'Geist Mono',ui-monospace,monospace}.predicted-edge span,.predicted-edge strong{color:var(--fg);font-size:13px}.predicted-edge b{color:var(--accent-soft);font-size:10px;text-align:center}.predicted-edge strong{color:var(--accent-soft);font-size:17px}.next-edge-math{display:grid;grid-template-columns:1fr 1fr;gap:14px;height:148px;margin-top:18px}.context-math-block,.memory-math-block{display:flex;flex-direction:column;justify-content:center;padding:14px 16px;border-left:2px solid var(--accent);background:rgba(255,115,74,.035)}.memory-math-block{border-left-color:#a28cff;background:rgba(162,140,255,.035)}.next-edge-math small{margin-bottom:7px;color:var(--accent-soft);font-size:10px;font-weight:750;letter-spacing:.1em}.memory-math-block small{color:#b8aaff}.next-edge-math code{display:block;color:rgba(240,231,220,.88)!important;font:15px/1.5 'Geist Mono',ui-monospace,monospace;white-space:nowrap}.context-math-block code:last-child{font-size:14px}.memory-math-block code{font-size:14px}.memory-math-block .correction-rule{margin-top:5px;color:#c2b7ff!important;font-size:12.5px}.next-edge-math sub,.next-edge-math sup,.predicted-edge sub,.context-hv-panel sub,.prototype-row sub,.next-edge-takeaway sub{font-size:.7em}.next-edge-takeaway{margin:18px 0 0;color:rgba(240,231,220,.9);font-size:18px;font-weight:500;text-align:center}.next-edge-takeaway strong{color:var(--accent-soft)}.next-edge-takeaway i{color:#b8aaff;font-family:'Geist Mono',ui-monospace,monospace}
</style>

---
layout: default
class: reproduce-slide
---

<div class="reproduce-content">
  <Eyebrow>Build your own open-source implementation</Eyebrow>
  <h1>Take the demo with you.</h1>
  <p class="lede">The complete implementation, from graph traversal to image & vector retrieval is available in the repo below.</p>

  <div class="run-pipeline-full" aria-label="Demo pipeline from graph ingest to image evidence">
    <div class="pipeline-stage"><b>01</b><span>Store multimodal + graph data</span></div>
    <i>→</i>
    <div class="pipeline-stage"><b>02</b><span>Encode hypervectors</span></div>
    <i>→</i>
    <div class="pipeline-stage"><b>03</b><span>Search/rank candidates</span></div>
    <i>→</i>
    <div class="pipeline-stage"><b>04</b><span>Graph validation</span></div>
    <i>→</i>
    <div class="pipeline-stage"><b>05</b><span>Image evidence</span></div>
  </div>

  <div class="closing-links">
    <a class="repo-link" href="https://github.com/prrao87/hdc-lancedb">
      <carbon-logo-github class="repo-icon" aria-hidden="true" />
      <span>
        <small>PUBLIC REPOSITORY</small>
        <strong>github.com/prrao87/hdc-lancedb</strong>
        <em>Code, setup, and the complete demo</em>
      </span>
    </a>
    <div class="follow-block">
      <small>FOLLOW LANCEDB</small>
      <div class="social-row">
        <a class="social-link" href="https://www.linkedin.com/company/lancedb/" aria-label="LanceDB on LinkedIn">
          <carbon-logo-linkedin class="social-icon linkedin-icon" aria-hidden="true" />
          <strong>@LanceDB</strong>
        </a>
        <a class="social-link" href="https://x.com/lancedb" aria-label="LanceDB on X">
          <svg class="social-icon x-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <strong>@lancedb</strong>
        </a>
      </div>
      <p>Follow along to learn about new features, case studies, and community updates.</p>
    </div>
  </div>

  <p class="closing-note">Questions? Come find us after the talk!</p>
</div>

<!--
Speaker notes:
- Keep this closing slide light: the full-width pipeline recaps the implementation without repeating path results already shown earlier.
- Point the audience to the public repository for code, setup, and the complete demo.
- Invite the audience to follow LanceDB using the two icon-led social links.
-->

<style>
.slidev-layout.reproduce-slide{padding:88px 84px 44px}.reproduce-content h1{margin:10px 0 6px;font-size:44px;line-height:1.08;letter-spacing:-.025em}.reproduce-content>.lede{margin:0;color:rgba(240,231,220,.88);font-size:21px}.run-pipeline-full{display:grid;grid-template-columns:1fr 42px 1fr 42px 1fr 42px 1fr 42px 1fr;align-items:stretch;width:100%;height:144px;margin-top:30px;padding:16px 20px;border-top:1px solid var(--border-strong);border-bottom:1px solid var(--border-strong);background:linear-gradient(90deg,rgba(255,115,74,.025),rgba(255,115,74,.07),rgba(255,115,74,.025))}.run-pipeline-full>i{display:grid;place-items:center;color:var(--accent);font-size:30px;font-style:normal}.pipeline-stage{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}.pipeline-stage b{display:grid;place-items:center;width:39px;height:39px;border:1px solid rgba(255,115,74,.38);border-radius:50%;background:rgba(255,115,74,.09);color:var(--accent-soft);font:700 13px 'Geist Mono',ui-monospace,monospace}.pipeline-stage span{margin-top:13px;color:var(--fg);font-size:17px;font-weight:650}.closing-links{display:grid;grid-template-columns:1.2fr .8fr;gap:46px;align-items:center;margin-top:42px}.repo-link{display:flex;align-items:center;gap:22px;min-width:0;padding:8px 0;color:inherit;text-decoration:none!important}.repo-icon{flex:0 0 auto;width:62px;height:62px;color:var(--accent-soft)}.repo-link>span{display:flex;flex-direction:column;min-width:0}.repo-link small,.follow-block>small{color:rgba(240,231,220,.5);font-size:11px;font-weight:750;letter-spacing:.11em}.repo-link strong{margin-top:8px;color:var(--fg);font:21px 'Geist Mono',ui-monospace,monospace}.repo-link em{margin-top:8px;color:rgba(240,231,220,.62);font-size:14px;font-style:normal}.follow-block{padding-left:40px;border-left:1px solid var(--border-strong)}.social-row{display:flex;align-items:center;gap:18px;margin-top:14px}.social-link{display:flex;align-items:center;gap:10px;padding:9px 12px;border:1px solid var(--border-strong);border-radius:8px;background:rgba(15,13,11,.72);color:var(--fg);text-decoration:none!important}.social-icon{width:25px;height:25px}.linkedin-icon{color:#0a66c2}.x-icon{color:var(--fg)}.social-link strong{font:16px 'Geist Mono',ui-monospace,monospace}.follow-block p{margin:13px 0 0;color:rgba(240,231,220,.62);font-size:14px;line-height:1.4}.closing-note{margin:38px 0 0;color:rgba(240,231,220,.92);font-size:22px;font-weight:550;text-align:center}
</style>

<!-- DECK_EOF -->
