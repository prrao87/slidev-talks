# GraphCon 2026 Presentation Outline

**Status:** Implemented draft. The 25-slide main talk and appendix A1–A2 now live in [`slides.md`](./slides.md).

## Implementation state

- Main narrative: slides 1–25 implemented and projection-checked at the 1280×720 logical canvas.
- Q&A material: appendix A1–A2 implemented after the closing slide.
- Technical integrity choices: the deck accurately describes the current no-code-change demo—MAP triple binding is commutative, HDC ranks stored `VISITED` rows, and the runner’s Cypher query returns all four known paths.
- Remaining pre-event handoffs: publish and confirm the public demo repository URL/QR; add collaborator attribution and any measured CSR/Lance performance material when available.

## Talk contract

- **Slot:** 40 minutes total: approximately 35 minutes of content and 5 minutes of Q&A.
- **Audience:** GraphCon attendees who are likely more mathematical and hands-on than the KGC audience, while still needing a gentle introduction to HDC.
- **Dataset:** A tiny `Person -> VISITED -> Location` graph centered on Seattle, New York, and Salt Lake City.
- **Primary question:** “Persons who visited cities on the Pacific coast with mountains nearby.”
- **Format:** A code-led, reproducible walkthrough with real output. The longer slot makes one short, controlled live run feasible, but the narrative must still work from the captured slides alone.

## Slide design

- Use the `../sample-template/slides.md` to inform your background slide colors, LanceDB logo placement, etc. But use your judgment in deciding the right balance of prose and visual aids/tables/code snippets to illustrate the points to the audience. Sometimes, prose is still the most clear, but other times, figures can do more than words.
- **Text size needs both a ceiling and a floor.** Avoid oversized sparse-slide typography, but design for a 75-person room where the last row must read every important line on a projected screen.
- **Back-row minimums at the 1280×720 logical canvas:**
  - Slide titles: generally `38–58px`.
  - Body copy and ledes: at least `20px`; prefer `21–24px` when space permits.
  - Bottom-of-slide questions, conclusions, and takeaway lines: at least `22px`; prefer `24px` when they carry the slide's inference. Use near-white contrast and medium weight rather than muted gray.
  - Image helpers, chart labels, feature chips, and metadata that the audience must read: at least `14px`. Use `16px+` when the label carries primary meaning.
  - Code and table contents: at least `16px`, with `18px` preferred for lines discussed aloud.
- Do not hide essential meaning in `8–12px` labels. Tiny text is acceptable only for nonessential decoration; citations should still remain human-readable.
- **Projection QA:** inspect each slide at 1280×720 and at a 1920×1080-scaled viewport, then apply a “back-row test”: title, lede, bottom takeaway, chart labels, and code must be legible without zooming.

## Positional framing

> One fuzzy question that is not answerable with exact matches over the current graph schema, represented in two spaces: HDC proposes what could be true; the graph confirms what is known to be true.

The human premise is equally important:

> Humans—and increasingly useful agents—do not just read. We associate.

The Seattle query makes that premise local to the conference. A person can associate “Pacific coast,” “mountains,” and “city” with Seattle even when the graph contains no `pacific_coast` property or `NEAR_MOUNTAINS` edge.

### Precision guardrail

The claim is not that exact querying could never answer the question. A schema designer could explicitly model every relevant feature. The claim is that users routinely ask for relationships and concepts the current schema did not anticipate.

The differentiator is also not generic fuzziness; conventional embeddings already offer semantic similarity. The stronger HDC claim is **structured fuzziness**: binding and bundling deliberately compose entities, predicates, roles, and fuzzy evidence into comparable representations.

## Three exit outcomes

All three outcomes matter, but they use different proof modes within the 35-minute content budget.

| Outcome | What success looks like | Proof mode |
|---|---|---|
| Understand HDC mechanics | The audience can explain near-orthogonality, binding, and bundling, and predict their effect on cosine similarity. | Minimal algebra plus one tiny executable experiment. |
| Believe the hybrid architecture | The audience can explain why associative retrieval and exact graph traversal have complementary jobs. | One query carried end to end with real scores, graph validation, and image evidence. |
| Reproduce the example | The audience knows what data is used, what command to run, and where each transformation occurs. | Exact repository link/QR, compact pipeline diagram, and a final run command. |

The intended division is: **understand in the room, believe through evidence, reproduce immediately afterward.** The added time permits a slower mathematical explanation and a brief reproduction walkthrough, while keeping the format a talk rather than a workshop.

## Narrative design principles

1. **One question, one dataset, one running example.** Do not introduce the Chicago/KGC dataset or a second GraphRAG storyline.
2. **Concept before product.** LanceDB appears when the implementation becomes tangible, then becomes the earned architectural payoff near the end. HDC mechanics remain vendor-neutral.
3. **Gentle premise, then concrete proof.** Begin with the familiar human act of association, then use the Seattle question to let the room experience it before showing why the schema cannot.
4. **Math serves intuition.** Show only the algebra needed to make the observed behavior predictable.
5. **Every abstraction returns to the query.** New HDC terms should immediately change how the audience understands the Seattle example.
6. **Show, then qualify.** Use real scores and images, followed by explicit limitations and costs.
7. **Sparse slides, dense speaker narrative.** Mirror the KGC visual grammar without reproducing its text-heavy slides.
8. **Brand through function.** Show what LanceDB contributes at the storage, retrieval, and validation boundaries; do not insert product claims into slides where the logo has no explanatory job.

## Timing and act structure

| Act | Time | Purpose |
|---|---:|---|
| 1. The question the schema did not anticipate | 0:00–6:00 | Gentle association premise, local hook, audience participation, exact-match failure, two-space thesis. |
| 2. HDC mechanics without magic | 6:00–15:00 | Random hypervectors, near-orthogonality, binding, bundling, micro-experiment, and “why not embeddings?” |
| 3. Encode the same fact twice | 15:00–22:00 | Move carefully from graph rows and image evidence to property, vibe, and path vectors. |
| 4. Could-be-true meets known-true | 22:00–30:00 | Run the query, explain the score gap, validate topology, and return evidence. |
| 5. Architecture, costs, and reproduction | 30:00–35:00 | One-store payoff, honest scaling costs, a short run walkthrough, and the final mental model. |

Target approximately **22–25 slides**, including the cover and closing slide. The extra ten minutes should primarily buy comprehension, audience prediction, and code explanation—not ten additional content slides. Several opening and transition slides should still take only 15–30 seconds.

## Provisional slide map

### Act 1 — The question the schema did not anticipate

#### 1. Cover

- **Final title:** *Multimodal Knowledge Graphs for Agents* (the title submitted with the conference abstract).
- **Working subtitle:** *How agents move between fuzzy associations, graph facts, and multimodal evidence.*
- Keep HDC out of the cover description. Introduce it later as the mechanism that gives the associative side a compositional algebra, not as the entire subject of the talk.
- Reserve *Could Be True. Known to Be True.* for the Act 4 validation reveal, after the audience has seen HDC produce candidates and the graph confirm topology.
- **Visual:** Seattle skyline as the dominant image, with a very subtle graph-to-hypervector motif bridging the image and title. Keep the LanceDB logo small beside the presenter affiliation, not as the hero.

#### 2. We do not just search. We associate.

- Establish the human behavior before introducing the technical problem: we combine a photo, a place, a phrase, and prior context into a relationship that was never written down for us.
- Adapt the gentle cadence of the early KGC “We don’t just read. We associate.” slide.
- Suggested line: “We don’t just search for what matches. We associate what relates.”
- Keep this to approximately 30–45 seconds; it should open the door, not become a philosophical preamble.
- **Visual:** A left-to-right sequence inspired by the KGC investigation motif: a city photo, a map fragment, and a short phrase converge into a small connected evidence board. Keep the headline at a restrained size per the slide-design guidance, with the visual carrying most of the meaning.

#### 3. Which city fits this description?

- Keep the query visible: “Persons who visited cities on the Pacific coast with mountains nearby.”
- Show Seattle, Salt Lake City, and New York.
- Label the three cities from the start so the interaction tests associative reasoning rather than skyline recognition.
- Ask the audience to commit to an answer before revealing the feature cues.
- Ask what the room associated: coast, mountains, city, Pacific Northwest.
- After the reveal, ask what evidence their minds combined before choosing. This makes association an observed behavior rather than an asserted conclusion.
- Do not mention HDC yet.
- **Visual:** A three-image triptych beneath the italic query, with compact city/state helpers always visible below each image. Reveal at most three feature chips per city after the audience responds. The question should remain readable without competing with the images.

#### 4. The graph does not have that answer—yet

- Show the real location columns.
- `timezone = pacific` exists, but `pacific_coast` is not a column.
- `mountains` is derived from image evidence, not stored as a graph property.
- Avoid saying “graphs cannot answer fuzzy questions”; the current schema cannot answer this one exactly.
- **Visual:** A compact real schema table beside a 4–6 line Cypher query. Render `pacific_coast` and `mountains` as dashed “ghost columns” outside the table, ending in an empty-result symbol rather than a wall of error text.

#### 5. Dataset: a familiar graph, made multimodal

- Orient the audience to the executable data immediately before introducing HDC: four `Person` rows, three city-valued `Location` rows, and four `VISITED` relationships.
- Highlight the loaded `Person -[:VISITED]-> Location` path inside a plausible larger property-graph schema.
- Show `Person -[:WORKS_AT]-> Company` and `Location -[:LOCATED_IN]-> Country` in gray as surrounding schema context that is not present in the demo data.
- State that each `Location` row carries `image_path`, description, and multimodal vibe evidence.
- Preserve executable naming: `Location` represents a city and `VISITED` is conceptually the “has visited” edge.
- **Visual:** Match the prior Chicago-dataset orientation slide: compact dataset counts and real relationship rows on the left, followed by a screenshot-like Lance `Location` table row using actual columns—`image_path` first, rendered as a thumbnail, then `name` and `description`; place a large schema diagram on the right. Orange denotes the loaded path, while dashed gray denotes plausible but unloaded graph context. Keep every schema node the same size so emphasis comes only from color and line treatment.

#### 6. Really high-dimensional spaces are like graphs

- Rebuild the KGC vector/graph bridge around the exact schema introduced on slide 5.
- Vector side: nearby directions represent intuitive or probabilistic resemblance.
- Graph side: explicit edges preserve deterministic facts and topology.
- Introduce HDC as the mechanism that moves between geometry and symbolic structure, without explaining the operations yet.
- **Visual:** Blue high-dimensional mesh and similarity direction on the left; the equal-sized `Person`, `Location`, `Company`, and `Country` schema nodes on the right; crossing arrows and an HDC label in the middle.

#### 7. Hyperdimensional computing in one picture

- Name hyperdimensional computing and define a hypervector in plain language before beginning the detailed mechanics.
- Use three prose beats only: represent a concept with a wide pattern; compose patterns with simple algebra; retrieve related concepts by similarity.
- Defer randomness, orthogonality, robustness, bundling, and binding details to the subsequent mechanics slides.
- Land the intuition: HDC turns symbolic structure into geometry we can search.
- **Visual:** One large hypervector strip representing `Seattle`, beside three generously spaced numbered bullets. Avoid cards, equations, and vocabulary fragments on this introductory slide.

### Act 2 — HDC mechanics without magic

#### 8. A hypervector is large, random, and bipolar

- $x \in \{-1,+1\}^{10{,}000}$.
- One deterministic random vector per symbolic token.
- Avoid a broad history of VSA/HDC.
- **Visual:** Zoom from a dozen visible `-1/+1` cells into a long strip labeled `10,000 dimensions`, then show three unrelated token strips with visibly different random patterns. One equation, no prose paragraph.

#### 9. Why unrelated vectors are almost orthogonal

- In $d=10{,}000$, unrelated cosine similarities concentrate near zero.
- The characteristic scale is approximately $1/\sqrt{d} = 0.01$.
- This is the mathematical reason random symbols can coexist with little accidental similarity.
- **Visual:** A histogram of cosine similarities from many deterministic random-vector pairs, sharply centered at zero. Mark `0`, `±0.01`, and the observed spread; avoid a generic 3D vector-space illustration.

#### 10. Bundling preserves ingredients

- A normalized sum/superposition remains similar to its components.
- Intuition: “a set whose members are still recognizable.”
- Return immediately to `mountains + waterfront + pacific_coast`.
- **Visual:** Three labeled feature strips flow through a `BUNDLE (+)` operator into one strip. Pair the diagram with three small cosine meters showing that the result still resembles each ingredient.

#### 11. Binding creates an association

- MAP binding is elementwise multiplication.
- A bound vector is dissimilar to its individual inputs.
- For bipolar vectors, binding is self-inverse, which makes unbinding possible.
- Do not imply that plain commutative binding alone preserves order; see the technical integrity gate below.
- **Visual:** Two labeled strips flow through elementwise multiplication into a new strip, with near-zero similarity meters back to the inputs. Keep the reversible operation as a small one-line algebraic annotation rather than a second diagram.

#### 12. The eight-line experiment

- Construct two token vectors.
- Print `cos(bind(a, b), a)` and `cos(bundle(a, b), a)`.
- The audience should be able to predict the output before it appears.
- Use actual deterministic output captured from the repository environment.
- Spend enough time to connect the printed numbers back to the algebra; this is the mechanics outcome, not a decorative code slide.
- If a live run is used, make this the first possible live moment because it is tiny, deterministic, and easy to recover from.
- **Visual:** A 55/45 split: eight readable lines of code on the left; two large output dots or bars on the right for `bind` versus `bundle`. Reveal the outputs only after asking the audience to predict them.

#### 13. Fuzzy is not the interesting part

- Ordinary embeddings can make text semantically nearby.
- HDC lets us explicitly construct the representation being compared.
- Emphasize compositional, algebraic, inspectable structure rather than claiming universal superiority.
- Use the added speaking time to compare the two methods concretely: learned semantic proximity versus deterministic symbolic composition. Do not frame them as mutually exclusive.
- **Visual:** A compact two-column comparison table with no winner badges. Compare where geometry comes from, how composition happens, what is inspectable, and how the methods can be combined. Keep it to four rows.

### Act 3 — Encode the same fact twice

#### 14. Where the fuzzy evidence comes from

- Seattle image -> evidence text -> symbolic features.
- Example: “skyline image shows mountain range” -> `feature: mountains`.
- State clearly that the current captions are hand-authored stand-ins for a VLM.
- Mention LanceDB for the first time as the concrete implementation: the image pointer, factual properties, and vector columns coexist on the location row.
- **Visual:** Seattle image -> caption/evidence card -> three feature chips -> a simplified LanceDB `Location` row. Use a small “implemented in LanceDB” badge; keep the logo subordinate to the data flow.

#### 15. From properties to record and vibe vectors

- Bind each property key to its value, then bundle the pairs.
- Separately bundle the location’s multimodal vibe features.
- Keep graph facts and fuzzy evidence visually distinct.
- **Visual:** Two horizontal lanes. The top binds key/value pairs and bundles them into `hv`; the bottom bundles image-derived terms into `vibe_hv`. Both land as adjacent fixed-size vector columns in one simplified LanceDB table row.

#### 16. The money shot: one fact in two representations

- Graph: `(:Person {name: "Maya"})-[:VISITED]->(:Location {name: "Seattle"})`.
- HDC: an encoding of the person, predicate, and Seattle vibe representation.
- Use a two-panel diagram with the same Maya -> Seattle fact highlighted on both sides.
- Final algebra depends on the role-encoding decision in the technical integrity gate.
- **Visual:** Left panel: the property-graph edge. Right panel: the role-aware HDC construction. A thin shared-data ribbon underneath shows that both originate from the same LanceDB rows; do not place a second large logo here.

#### 17. Build the query representation

- Natural-language query -> selected symbolic vibe features -> bundled query vibe.
- Combine the query vibe with the path structure used for candidate comparison.
- Be explicit that the current query-to-feature mapper is deterministic and hand-written; HDC is not itself parsing English.
- **Visual:** A four-stage compilation trace: natural language -> explicit feature mapper -> bundled query vibe -> path query hypervector. Show the actual feature list and one compact code excerpt, not pseudocode plus prose.

### Act 4 — Could-be-true meets known-true

#### 18. The result in two numbers

- Seattle: `0.630`.
- Salt Lake City: `0.441`.
- Both exceed the current `0.20` threshold.
- The gap is explained by shared mountains/nature evidence versus the missing Pacific-coast evidence.
- **Visual:** A horizontal dot plot or bar chart with a visible `0.20` threshold line, Seattle at `0.630`, and Salt Lake City at `0.441`. Add a tiny “queried from LanceDB vectors” caption rather than a product callout.

#### 19. The near miss is a feature, not a failure

- Seattle image: mountains + water + Pacific context.
- Salt Lake City image: mountains, but inland.
- Exact matching is binary; associative ranking degrades gracefully.
- **Visual:** Seattle and Salt Lake City side by side with shared feature chips aligned between them; `pacific_coast` appears only on Seattle. Keep the two scores large and the prose to one sentence.

#### 20. HDC proposes; the graph confirms

- Present associative candidates as semantically plausible paths.
- Use Cypher to determine which candidate edges are actually present.
- This slide requires resolving whether the demo should generate candidates independently of the relationship table.
- Mention that `lance-graph` executes Cypher over the same LanceDB tables used for HDC retrieval.
- This is where the phrase *Could Be True. Known to Be True.* should land as the earned consequence of the two-stage workflow.
- **Visual:** Candidate rows flow through a narrow Cypher “validation gate”; graph-valid rows continue while absent edges stop. Show one short Cypher pattern above the gate and animate pass/fail state changes.

#### 21. The image is both signal and receipt

- The Seattle image helped seed the fuzzy representation.
- The validated location row returns the image pointer as evidence.
- Close the multimodal loop without a separate fetch from another system.
- **Visual:** A circular four-step loop: image -> symbolic evidence -> HDC candidate -> graph validation -> image. Place a small LanceDB table-row icon at the center to show that the loop does not fan out across stores.

### Act 5 — Architecture, costs, and reproduction

#### 22. One dataset, multiple views

- Graph topology, HDC vectors, structured columns, and asset pointers live in the same LanceDB dataset.
- `lance-graph` reads those same tables as a property graph.
- Product payoff: co-located and co-versioned representations, not “graphs replaced by vectors.”
- State the boundary precisely: LanceDB is the implementation used here, not a prerequisite for HDC as a concept.
- **Visual:** Make this the primary branded architecture slide. Place one central LanceDB dataset—with graph columns, fixed-size vector columns, and `image_path`—feeding HDC similarity, Cypher traversal, and asset retrieval. This is the one slide where a larger LanceDB logo is explanatory rather than decorative.

#### 23. The costs are real—and they are different costs

- **Encoding compute:** binding and bundling over $d=10{,}000$ components is real per-row tensor work.
- **Base-vector payload:** one 10,000-dimensional float32 vector is approximately 40 KB; two vectors for 1 million edges are approximately 80 GB before indexes and overhead.
- **Similarity-edge/index storage:** materializing all pairwise hypervector neighborhoods is a separate scaling problem from storing the vectors themselves.
- Distinguish the levers: lower precision/bipolar packing can shrink base vectors; top-k CSR can shrink a materialized similarity graph from $O(n^2)$ edges toward $O(nk)$; format/index optimizations affect scan and query efficiency.
- Mention that Lance stores fixed-size vector columns efficiently, but reserve quantitative “fast” claims for sourced measurements or the appendix material.
- **Visual:** Three large cost cards—`encode`, `base vectors`, `similarity edges/index`—with one formula and one concrete number each. A small arrow points to the future-work appendix; do not imply that CSR alone eliminates the 80 GB base-vector payload.

#### 24. Reproduce it

- Show the repository URL and QR code.
- Show the exact environment/setup command and one demo command.
- Show the pipeline in one line: ingest graph -> encode HDC -> fuzzy candidates -> Cypher validation -> image evidence.
- Keep the command visible while verbally recapping the three concepts.
- Reserve approximately three minutes for a controlled run or a line-by-line walkthrough of its captured output.
- If run live, show the expected output on the slide before switching contexts so the audience never loses the result.
- **Visual:** One terminal command and its three most important output lines on the left; a five-step pipeline and QR code on the right. Include the LanceDB and `lance-graph` project names in the pipeline, not as a row of sponsor logos.

#### 25. Closing

> The graph tells us what is known. HDC helps us search what could be related.

- Return to the original Seattle question.
- Reinforce that both are views over the same data, not competing stores or mutually exclusive methods.
- **Visual:** Reprise the two-space diagram from slide 5, now with the Seattle path resolved and its image attached as the receipt. Keep a small LanceDB affiliation/logo in the closing links area.

## Appendix / Q&A slides

These slides sit after the close and do not consume the planned 35-minute narrative unless the audience asks about scaling.

### A1. Which hypervector cost do you mean?

- Separate encoding compute, base-vector payload, similarity-edge/index storage, and query execution.
- Show the dominant variables for each: $n$ records, $d$ dimensions, $b$ bytes/component, and $k$ retained neighbors.
- Make clear which levers affect which cost; avoid presenting one optimization as a universal answer.
- **Visual:** A four-row diagnostic table: cost, baseline scaling, likely lever, and what remains unchanged. Highlight the row corresponding to the audience question before moving to A2.

### A2. Future work: top-k CSR hypervector edges in LanceDB

- Present the collaborator work explicitly as a promising research direction, not a shipped feature or completed benchmark.
- Contrast a dense/all-pairs similarity graph with a graph that retains only the top-$k$ nearest hypervector edges per node.
- Explain the storage shape: CSR `indptr`, `indices`, and optional similarity values reduce materialized neighbor edges from $O(n^2)$ toward $O(nk)$.
- Preserve the caveat: the base $n \times d$ hypervector column still exists unless this method is paired with quantization, bipolar packing, or another vector-payload compression technique.
- Show LanceDB as the store for the hypervector columns and compressed neighbor-edge representation. Attribute format-level fixed-size-list behavior to Lance, and database/query behavior to LanceDB.
- Add concrete performance or storage claims only after collaborator material, implementation details, and measurements are available.
- **Visual:** Left: an unreadable all-pairs hairball labeled `$O(n^2)$`. Center: the same nodes with only top-$k$ edges labeled `$O(nk)$`. Right: a simplified LanceDB/Lance storage slab showing a fixed-size hypervector column beside CSR arrays. Add a clear `Future work` badge and collaborator attribution.

## KGC material to adapt

Rebuild these ideas in the Slidev design system rather than inserting screenshots from the PDF.

| KGC slide | Idea to preserve | GraphCon adaptation |
|---:|---|---|
| 2 | “We don’t just read. We associate.” | Use after the Seattle audience reveal. |
| 4 | The unit of reasoning is split across stores. | Compress into the one-dataset payoff; do not lead with architecture. |
| 8 | Known graph facts versus nearby vector meaning. | Sharpen into exact schema versus structured HDC association. |
| 13 | High-dimensional spaces and graphs as two views. | Rebuild around the Maya -> Seattle fact. |
| 17 | HDC proposes; graph confirms. | Make it the end-to-end demo payoff, subject to the candidate-generation decision. |
| 22 | Cohesive multimodal/graph/vector stack. | Reduce to one closing architecture slide. |

Do not carry over the Chicago dataset, GraphRAG agent workflow, Robby/tower example, application screenshots, or long Lance/lance-graph introduction. They would create a second narrative and delay the main example.

## Visual system

- Use the existing `slidev-addon-lancedb` dark theme and orange emphasis.
- Reuse its `cover`, `statement`, and `closing` layouts plus `Eyebrow`, `Stat`, code, and callout styling.
- Create deck-local layouts only where the narrative needs them: two-space comparison, result progression, and image evidence.
- Give each slide one dominant visual grammar—diagram, image, chart, table, or code—and use prose only to label the inference the audience should make.
- Prefer real generated artifacts over decorative abstractions: actual cosine distributions, actual table schemas, actual code output, and actual city images.
- Use progressive reveal for transformations (`image -> evidence -> features`, `features -> bundle`, `candidate -> validated path`) so the audience never has to decode the final diagram all at once.
- Establish recurring states:
  - **Could-be-true:** warm associative/HDC accent.
  - **Known-true:** distinct confirmation accent.
- Favor progressive diagrams and sparse statement slides over bullet-heavy summaries.
- Keep mathematical notation large enough to read from the back of the room.

### LanceDB logo and mention strategy

- The small logo supplied by the LanceDB Slidev addon can remain as an affiliation watermark, matching the KGC deck. It should not grow, animate, or compete with conceptual visuals.
- Keep slides 2–11 concept-first and vendor-neutral apart from the subtle deck watermark.
- First name LanceDB in slide 12, when the implementation becomes concrete.
- Use small implementation labels on slides 12–19: “LanceDB row,” “LanceDB vector column,” or “Cypher via lance-graph.” These labels explain provenance rather than advertise.
- Make slide 20 the only main-talk slide where the LanceDB logo is structurally prominent, because the shared dataset is the subject of the diagram.
- Use project names and links—not repeated large logos—on the reproduction and closing slides.
- Distinguish the layers consistently:
  - **Lance:** the columnar format and physical representation.
  - **LanceDB:** table access, vector retrieval, and dataset operations.
  - **lance-graph:** Cypher/graph interpretation over the same Lance tables.
- Avoid unsupported superlatives. “Efficient,” “fast,” or “optimized” should point to a specific format mechanism, benchmark, or cited measurement.

## Available assets and sources

- Blog plan: [`BLOG_OUTLINE.md`](./BLOG_OUTLINE.md)
- Prior deck: [`Knowledge Graph Conference 2026.pdf`](./Knowledge%20Graph%20Conference%202026.pdf)
- Slidev base: [`../sample-template/slides.md`](../sample-template/slides.md)
- Demo repository: [`../../../hdc-research`](../../../hdc-research)
- City images:
  - [`../../../hdc-research/img/seattle.jpg`](../../../hdc-research/img/seattle.jpg)
  - [`../../../hdc-research/img/salt-lake-city.jpg`](../../../hdc-research/img/salt-lake-city.jpg)
  - [`../../../hdc-research/img/nyc.jpg`](../../../hdc-research/img/nyc.jpg)
- HDC encoder: [`../../../hdc-research/src/torchhd_encoder.py`](../../../hdc-research/src/torchhd_encoder.py)
- Retrieval code: [`../../../hdc-research/src/hdc_retrieve.py`](../../../hdc-research/src/hdc_retrieve.py)
- End-to-end runner: [`../../../hdc-research/src/run_person_location_demo.py`](../../../hdc-research/src/run_person_location_demo.py)
- CSR hybrid-compression design, collaborator attribution, and Lance fixed-size-list evidence: pending material from the presenter.

## Technical integrity gate

**Implemented-draft resolution:** use the no-code-change descriptions below. Any future role-aware encoding or independent candidate generator must trigger a rerun of the captured scores and a corresponding slide update.

### 1. Candidate generation currently starts from known edges

`hdc_fuzzy_paths` currently iterates over rows already present in the `VISITED` relationship table. This means the HDC stage ranks fuzzy relevance among known paths; it does not yet propose nonexistent Person/Location edges for the graph to accept or reject.

Two defensible directions:

- **Recommended:** Extend the demo so HDC proposes plausible Person/Location combinations independently, then let Cypher validate which edges exist. This makes the stated architecture literal.
- **No code change:** Revise the claim to “HDC ranks known paths by associative fit; the graph remains the authoritative exact representation.” This is still useful, but “proposes/validates” becomes weaker.

### 2. Current triple binding is commutative

`encode_triple` uses MAP `multibind(subject, predicate, object)`. Elementwise MAP binding is commutative, so swapping subject and object produces the same bound result. The current entity property bags include node kinds, but the algebra itself does not encode directed subject/object roles.

Two defensible directions:

- **Recommended:** Introduce explicit role/filler encoding, such as bundling `bind(role:subject, subject)`, `bind(role:predicate, predicate)`, and `bind(role:object, object)`, then rerun the demo.
- **No code change:** Describe the current value as a bag-like association of a known typed person, predicate, and typed location, not a generally ordered triple encoding.

Any encoding change will change the captured cosine scores, so the `0.630` and `0.441` values must be rerun and updated afterward.

### 3. Natural-language understanding is outside HDC

`query_vibe_features` is a small deterministic phrase-to-feature mapping. Present it as a transparent demo adapter. A production system could use a classifier, parser, LLM, or other model to emit symbolic features, but that is not what this demo proves.

### 4. Image captions are stand-ins

The evidence strings are hand-authored in the shape of VLM captions. Say this once, clearly, and do not imply that a vision model was executed in the current pipeline.

### 5. Scaling claims must answer the correct cost

Keep four questions separate:

1. How expensive is it to encode $n$ hypervectors of dimension $d$?
2. How large is the base $n \times d$ vector payload at a given precision?
3. How large is a materialized similarity graph or ANN index?
4. How quickly can a query scan or search the chosen representation?

The planned top-$k$ CSR method primarily addresses the third question by avoiding a dense/all-pairs similarity-edge representation. Do not imply that it automatically shrinks the base vector payload or encoding compute unless the eventual method and measurements demonstrate that.

Treat the following as evidence requirements before final slide copy:

- Define exactly what constitutes a “hypervector edge” and what is retained in CSR.
- State whether $k$ is fixed globally, adaptive, or threshold-based.
- Provide storage complexity and at least one concrete size comparison.
- Identify whether dense vectors, sparse vectors, or both are used at each stage.
- Cite or demonstrate the relevant Lance fixed-size-list layout behavior.
- Separate format scan efficiency from ANN/search algorithm performance.
- Label unimplemented or unbenchmarked work as future work.

## Preparation plan

1. **Resolve the technical integrity gate.** Decide whether the demo will be updated for independent candidate generation and explicit role encoding.
2. **Rerun and freeze evidence.** Capture the micro-experiment output, retrieval scores, graph validation results, and exact reproduction command.
3. **Lock the slide map.** Adjust slide count and speaker beats based on the resolved demo behavior.
4. **Collect assets.** Copy the three city images into the GraphCon deck, create the two-space diagram, and prepare code/output visuals.
5. **Collect scaling evidence.** Add collaborator material, CSR definitions, Lance format references, and any benchmark numbers used in the appendix.
6. **Scaffold Slidev.** Copy the sample template structure into `talks/graphcon-2026/` and replace placeholders with the approved outline.
7. **Render and rehearse.** Verify the exported deck visually and rehearse to a 33–34 minute target, leaving recovery time before Q&A.

## Open decisions

- Final title and subtitle.
- Whether the opening audience interaction uses three images or a single Seattle reveal.
- Whether to update the demo for truly independent candidate generation.
- Whether to add explicit subject/predicate/object role encoding.
- Public repository URL and QR destination for reproduction.
- Presenter/co-presenter details for the cover and closing slide.
- Whether to use one controlled live run for the bind/bundle experiment, the end-to-end demo, or neither. Do not plan on two separate terminal interludes.
- Whether the scaling appendix remains two slides or is compressed into one after the collaborator material arrives.
- Exact collaborator attribution and whether the CSR method has a working name.
- Which Lance fixed-size-list and dense/sparse vector claims can be supported with implementation references or measurements.
