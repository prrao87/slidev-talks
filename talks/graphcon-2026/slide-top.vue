<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, total } = useNav()

// Progress toward the end of the deck, shown as a small filling bar + numbers.
const pct = computed(() => Math.min(100, (currentPage.value / total.value) * 100))
const current = computed(() => String(currentPage.value).padStart(2, '0'))
</script>

<template>
  <div
    class="slide-progress"
    role="progressbar"
    :aria-valuenow="currentPage"
    :aria-valuemin="1"
    :aria-valuemax="total"
    :aria-label="`Slide ${currentPage} of ${total}`"
  >
    <span class="sp-count"><b>{{ current }}</b><i>/</i>{{ total }}</span>
    <span class="sp-track"><span class="sp-fill" :style="{ width: pct + '%' }"></span></span>
  </div>
</template>

<style>
.slidev-layout .lede,
.slidev-layout .association-lede {
  color: rgba(240, 231, 220, 0.96) !important;
  opacity: 1 !important;
}

.slide-progress {
  position: absolute;
  top: 22px;
  right: 28px;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: none;
}

.sp-count {
  font: 600 12px/1 'Geist Mono', ui-monospace, monospace;
  letter-spacing: 0.08em;
  color: rgba(240, 231, 220, 0.42);
}

.sp-count b {
  color: #ff9e80;
  font-weight: 700;
}

.sp-count i {
  margin: 0 2px;
  font-style: normal;
  color: rgba(240, 231, 220, 0.32);
}

.sp-track {
  width: 72px;
  height: 4px;
  border-radius: 999px;
  background: rgba(240, 231, 220, 0.12);
  overflow: hidden;
}

.sp-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ff734a, #ffcb69);
  box-shadow: 0 0 8px rgba(255, 115, 74, 0.45);
  transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
