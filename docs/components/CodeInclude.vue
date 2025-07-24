<script setup>
import { onMounted, watch } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-hcl'

const props = defineProps({
  content: String
})

onMounted(() => {
  Prism.highlightAll()
})

watch(() => props.content, () => {
  Prism.highlightAll()
})
</script>

<template>
  <pre><code class="lang-hcl">{{ content }}</code></pre>
</template>
