<!--
  Big-statement / section-divider slide. One bold sentence does the work.

  Usage:
    ---
    layout: statement
    ---
    <Eyebrow>The Problem</Eyebrow>

    ## Your data is scattered across five systems that <span class="gradient-text">don't talk.</span>

    <p class="lede">Optional supporting sentence.</p>
-->
<template>
  <div class="slidev-layout lance-statement">
    <slot />
  </div>
</template>

<style scoped>
.lance-statement {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 120px;
  height: 100%;
}
.lance-statement :deep(.eyebrow) { margin-bottom: 26px; }
.lance-statement :deep(h2) {
  font-size: 92px;
  line-height: 1.0;
  letter-spacing: -0.035em;
  font-weight: 600;
}
.lance-statement :deep(.lede) {
  margin-top: 32px;
  max-width: 720px;
}
</style>
