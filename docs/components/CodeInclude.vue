<script setup>
import { ref, watch, onMounted } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-hcl'

const props = defineProps({
  content: String
})

const isOpen = ref(false)
const copied = ref(false)

onMounted(() => {
  Prism.highlightAll()
})

watch(() => props.content, () => {
  Prism.highlightAll()
})

function copyCode() {
  navigator.clipboard.writeText(props.content || '').then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  })
}
</script>

<template>
  <div class="space-y-2">
    <button
        @click="isOpen = !isOpen"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
    >
      {{ isOpen ? '🔽 Hide code' : '▶️ Show code' }}
    </button>

    <transition name="fade-slide">
      <div
          v-show="isOpen"
          class="relative p-4 bg-gray-200 rounded shadow"
      >
        <span
            @click="copyCode"
            class="absolute right-2 top-2 text-xs text-white bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 hover-hand"
            title="Click to copy"
        >
          {{ copied ? '✔️ Copied' : '📋 Copy' }}
        </span>
        <pre><code class="lang-hcl">{{ content }}</code></pre>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.hover-hand {
  cursor: pointer;
}
</style>
