# GraphCon Slidev deck guardrails

## Audience-first writing

- Write for a technically capable person encountering the idea for the first
  time, not for someone who already knows the deck's internal vocabulary.
- Do not introduce compressed labels or abstract noun phrases in titles and
  takeaways unless the slide has already taught them. Avoid phrases such as
  "comparable evidence signatures," "distinct vector signatures," and similar
  noun stacks that sound precise but require the audience to invent a meaning.
- Prefer familiar nouns already visible on the slide—such as node, relationship,
  feature, vector, query, and direction—and connect them with a concrete verb.
- Prefer the field's standard operation name when a colloquial substitute is
  overloaded for an ML audience. Define the standard term plainly instead of
  inventing a near-synonym; for example, say "permute" and "fixed coordinate
  reordering," not "shuffle," which suggests randomized data-loader order.
- State the transformation and its value plainly: what goes in, what changes,
  and what the audience can now do or understand.
- Give the "why" equal weight with the "what." Every conceptual slide must make
  the audience's gain explicit: show the concrete failure or limitation before
  the technique, then the new query, distinction, or capability it enables.
- Do not force an operation onto an example that works just as well without it.
  If removing the operation does not create a meaningful loss, choose a better
  example. The example should make the operation necessary, not merely possible.
- Prefer a before/after test the audience can evaluate: "without this, these two
  cases collapse; with it, we can distinguish or retrieve them." Put that value
  in the main visual or title, not only in speaker notes or a closing slogan.
- Use a human paraphrase test: a first-time audience member should be able to
  repeat the line in ordinary language without needing the presenter to define
  any new term.
- Read titles and takeaways aloud. If they sound like taxonomy, architecture
  shorthand, or a research-paper abstraction, rewrite them as a direct sentence.
- Parallel wording across slides is useful only when both lines remain natural;
  never sacrifice clarity to make two slides grammatically symmetrical.

## Layout and spacing QA

- Treat a user-provided screenshot and its viewport dimensions as the canonical
  reproduction target for the issue being discussed.
- Do not declare a spacing or overlap issue fixed from source inspection or a
  single glance at a differently sized render.
- For adjacent blocks, verify the visible painted boxes—not only their parent
  line boxes. Inline `code`, math, borders, backgrounds, shadows, and transforms
  can paint outside the space that appears correct in CSS.
- Prefer structural separation: a dedicated layout row with explicit padding,
  controlled line-height, and controlled element padding/background. Do not rely
  on repeatedly increasing `margin-top` when painted content can escape its box.
- After each spacing fix:
  1. Build with `npm run build -- talks/graphcon-2026/slides.md`.
  2. Render the affected slide at the user's viewport size when known; otherwise
     test both the normal presentation viewport and a shorter viewport.
  3. Inspect the full-resolution render. When browser inspection is available,
     compare `getBoundingClientRect()` values for the two elements as well.
  4. Require a clearly visible gap (target at least 16 CSS px) between painted
     boxes before reporting the issue resolved.
- If the verification image still looks even slightly ambiguous, increase the
  structural gap and re-render. Do not ask the user to validate an uncertain fix.
- Stop temporary preview servers after QA.
