<!--
  Rendered on top of EVERY slide in any deck using this addon.
  Reproduces the template's repeated logo (top-right) + slide number
  (bottom-left). The logo is imported as a bundled asset, so it works
  without relying on each deck's public/ folder.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import logo from './assets/lancedb-logo.png'

const { currentPage, total } = useNav()
const pad = (n: number) => String(n).padStart(2, '0')
const cur = computed(() => pad(currentPage.value))
const max = computed(() => pad(total.value))
</script>

<template>
  <img class="brand-logo" :src="logo" alt="LanceDB" />
  <div class="brand-number">
    {{ cur }}<span class="sep">/</span>{{ max }}
  </div>
</template>

<style scoped>
.brand-logo {
  position: absolute;
  top: 36px;
  right: 56px;
  height: 22px;
  width: auto;
  opacity: 0.85;
  z-index: 10;
}
.brand-number {
  position: absolute;
  bottom: 32px;
  left: 56px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--fg-dim);
  z-index: 10;
}
.brand-number .sep { color: var(--accent); margin: 0 6px; }
</style>
