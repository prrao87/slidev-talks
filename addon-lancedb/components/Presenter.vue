<!--
  Presenter row for the cover slide: gradient avatar + name + role.
  <Presenter name="Your Name" role="YOUR_ROLE · LANCEDB" />
  Pass an avatar image with the `avatar` prop, or leave it for the gradient blob.
-->
<script setup lang="ts">
defineProps<{ name: string; role?: string; avatar?: string }>()
</script>

<template>
  <div class="presenter">
    <img v-if="avatar" class="avatar img" :src="avatar" :alt="name" />
    <div v-else class="avatar" />
    <div class="meta">
      <span class="name">{{ name }}</span>
      <span v-if="role" class="role">{{ role }}</span>
    </div>
  </div>
</template>

<style scoped>
.presenter {
  margin-top: 18px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  display: flex; align-items: center; gap: 14px;
}
.avatar {
  width: 42px; height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-soft), var(--accent-deep));
  flex-shrink: 0;
}
.avatar.img { object-fit: cover; }
.meta { display: flex; flex-direction: column; gap: 2px; }
.name { font-size: 16px; font-weight: 500; color: var(--fg); }
.role {
  font-size: 12.5px; color: var(--fg-dim);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: 0.04em;
}
</style>
