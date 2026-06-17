<!--
  Title slide. Two-column grid: text on the left (default slot),
  hero image on the right (::hero:: slot).

  Usage in markdown:
    ---
    layout: cover
    ---
    <Eyebrow>Conference Talk · 2026</Eyebrow>

    # Vector Search at <span class="gradient-text">Planet Scale.</span>

    <p class="subtitle">One-sentence description of the talk.</p>

    <Presenter name="Your Name" role="YOUR_ROLE · LANCEDB" />

    ::hero::
    <img src="/hero.png" alt="" />
-->
<template>
  <div class="slidev-layout lance-cover">
    <div class="left">
      <slot />
    </div>
    <div class="right">
      <slot name="hero" />
    </div>
  </div>
</template>

<style scoped>
.lance-cover {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  padding: 0 96px;
  height: 100%;
}
.left { display: flex; flex-direction: column; gap: 26px; }
.left :deep(h1) {
  font-size: 64px;
  line-height: 1.02;
  letter-spacing: -0.025em;
  font-weight: 600;
}
.left :deep(.subtitle) { max-width: 480px; }
.right { position: relative; display: flex; align-items: center; justify-content: center; }
.right :deep(img) {
  width: 105%;
  max-width: 600px;
  filter: drop-shadow(0 24px 80px rgba(233, 120, 82, 0.18));
}
</style>
