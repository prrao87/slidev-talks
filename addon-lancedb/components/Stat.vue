<!--
  Big-number stat card. Wrap several in <div class="stat-grid">…</div>.
  <Stat num="10B+" label="vectors indexed in a single table" />
-->
<script setup lang="ts">
defineProps<{ num: string; label?: string }>()
</script>

<template>
  <div class="stat">
    <div class="num gradient-text">{{ num }}</div>
    <div class="label"><slot>{{ label }}</slot></div>
  </div>
</template>
