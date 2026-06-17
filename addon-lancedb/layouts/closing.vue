<!--
  Closing slide — centered, oversized headline + links.

  Usage:
    ---
    layout: closing
    ---
    ## Thanks.

    <p class="lede">Questions welcome.</p>

    <div class="links">
      <span><span class="at">@</span>yourhandle</span>
      <span>lancedb.com</span>
    </div>
-->
<template>
  <div class="slidev-layout lance-closing">
    <slot />
  </div>
</template>

<style scoped>
.lance-closing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 120px;
  gap: 28px;
  height: 100%;
}
.lance-closing :deep(h2) {
  font-size: 124px;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.95;
}
.lance-closing :deep(.lede) { max-width: 600px; }
.lance-closing :deep(.links) {
  display: flex; gap: 36px;
  margin-top: 16px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 14px;
  color: var(--fg-muted);
  letter-spacing: 0.02em;
}
.lance-closing :deep(.links span) { color: var(--fg); }
.lance-closing :deep(.links .at) { color: var(--accent); margin-right: 8px; }
</style>
