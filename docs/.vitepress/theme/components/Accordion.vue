<template>
  <details class="accordion" :open="open">
    <summary>{{ title }}</summary>
    <div class="content">
      <slot />
    </div>
  </details>
</template>

<script setup>
defineProps({
  title: String,
  open: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.accordion {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.75em;
  margin-bottom: 1em;
  background-color: var(--vp-c-bg-soft);
  transition: background-color 0.3s ease;
}

.accordion summary {
  cursor: pointer;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.accordion[open] {
  background-color: var(--vp-c-bg);
}
</style>