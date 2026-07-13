<!--
  Rendered on top of EVERY slide in any deck using this addon.
  Reproduces the PPTX deck's repeated logo, anchored top-left (matching the
  slide master). The logo is imported as a bundled asset, so it works
  without relying on each deck's public/ folder. No slide number — the PPTX
  footer doesn't carry one, and it reads as clutter.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import logo from './assets/lancedb-logo.png'

const { currentSlideRoute } = useNav()
// The cover carries a larger logo in the title block, so skip the corner
// mark there to avoid doubling up.
const showLogo = computed(
  () => currentSlideRoute.value?.meta?.slide?.frontmatter?.layout !== 'cover',
)
</script>

<template>
  <img v-if="showLogo" class="brand-logo" :src="logo" alt="LanceDB" />
</template>

<style scoped>
.brand-logo {
  position: absolute;
  top: 28px;
  left: 50px;
  height: 24px;
  width: auto;
  opacity: 0.9;
  z-index: 10;
}
</style>
