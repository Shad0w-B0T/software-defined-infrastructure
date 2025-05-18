<template>
  <a :href="url" target="_blank" rel="noopener noreferrer" class="vp-button">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.vp-button {
  display: inline-block;
  padding: 0.4em 1em;
  font-weight: 500;
  font-size: 1rem;
  color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-muted);
  border: 1px solid var(--vp-c-brand);
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
  cursor: pointer;
}
.vp-button:hover,
.vp-button:focus {
  background-color: var(--vp-c-brand);
  color: white;
  outline: none;
}
</style>
