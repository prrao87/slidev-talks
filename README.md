# slidev-talks

Slidev workspace for talk slides. This repo contains the raw content for slide decks, shared LanceDB styling/components, and static assets needed to reproduce the talk slides as finalized artifacts (PDF, PPTX, etc.) on another machine.

## Why Slidev

[Slidev](https://sli.dev/) is a presentation framework where slides are written as Markdown and rendered as a web app. It supports Vue components, custom layouts, themes, code highlighting, presenter mode, and exports, so a deck can be treated like normal source code instead of a manually edited binary file.

That makes it useful for technical talks and for AI-assisted authoring. Tools like Claude Code and Codex can edit the Markdown, components, styles, and asset references directly, which makes it practical to create polished decks from prompts without manually positioning every image and text box in a slide editor. The result is easier to review in Git, easier to reuse across talks, and easier to reproduce on another machine.

## Prerequisites

- Node.js 20 or newer
- npm

## Get Started

Clone the repo and install dependencies:

```bash
git clone git@github.com:prrao87/slidev-talks.git
cd slidev-talks
npm install
```

Run a deck locally with the repo-local Slidev dependency:

```bash
npm run dev -- talks/sample-template/slides.md
```

Open the local URL that Slidev prints, usually <http://localhost:3030>.

To run the current TMLS deck with the repo-local dependency:

```bash
npm run dev -- talks/tmls-2026/slides.md
```

## Slidev CLI

You can also install the Slidev CLI and run decks directly:

```bash
npm install -g @slidev/cli
slidev talks/sample-template/slides.md --open
```

This is useful if you already keep a local Slidev CLI up to date and want to use it across multiple repos. The CLI can also build hosted slides, format slide Markdown, export files, export speaker notes, and run theme-related commands.

Useful references:

- Slidev docs: <https://sli.dev/>
- Slidev CLI reference: <https://sli.dev/builtin/cli>
- Slidev exporting guide: <https://sli.dev/guide/exporting>

## Start a New Talk

Copy the sample deck into a new folder:

```bash
cp -R talks/sample-template talks/my-new-talk
npm run dev -- talks/my-new-talk/slides.md
```

Then edit the new `slides.md`.

Use these asset locations:

- Put deck-specific images that are referenced with relative paths in `assets/`.
- Put deck-specific public assets that should be served from `/` in `public/`.
- Keep shared LanceDB theme assets in the addon package.

## PDF Exports

Rendered decks are local artifacts and should not be committed.

For an interactive export, start the deck and open the export UI:

```bash
npm run dev -- talks/my-new-talk/slides.md
```

Then use the Export option in the browser, or go directly to <http://localhost:3030/export>.

For command-line PDF export, install Slidev's browser renderer dependency if needed:

```bash
npm install -D playwright-chromium
```

Then export with the repo-local command:

```bash
npm run export -- talks/my-new-talk/slides.md
```

Or export with a globally installed Slidev CLI:

```bash
slidev export talks/my-new-talk/slides.md
```

Common export options:

```bash
slidev export talks/my-new-talk/slides.md --output my-new-talk.pdf
slidev export talks/my-new-talk/slides.md --with-clicks
slidev export talks/my-new-talk/slides.md --range 1,4-8,12
```

## Repo Hygiene

Commit source material needed to rebuild a talk: Markdown slides, theme/addon code, and static source assets. Do not commit dependencies, generated Slidev state, rendered decks, exports, recordings, scratch notes, or local environment files.
