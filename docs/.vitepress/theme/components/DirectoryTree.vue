<script setup>
import { ref, onMounted } from 'vue'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const props = defineProps({
  path: {
    type: String,
    required: true
  }
})

const tree = ref([])

async function fetchDirectory(path, base = '') {
  const res = await fetch(`${path}/index.json`)
  const data = await res.json()
  return data
}

async function buildTree(path) {
  const res = await fetch(path)
  const text = await res.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(text, 'text/html')
  const links = [...doc.querySelectorAll('a')].map(a => a.getAttribute('href')).filter(h => h && h !== '../')

  const items = []
  for (const link of links) {
    const fullPath = path + '/' + link
    if (link.endsWith('/')) {
      const children = await buildTree(fullPath)
      items.push({ name: link.replace(/\/$/, ''), type: 'dir', children, path: fullPath })
    } else {
      items.push({ name: link, type: 'file', path: fullPath })
    }
  }
  return items
}

onMounted(async () => {
  tree.value = await buildTree(props.path)
})

function renderTree(nodes) {
  return nodes.map(node => {
    if (node.type === 'dir') {
      return (
          <li>
            📁 {node.name}
            <ul>{renderTree(node.children)}</ul>
          </li>
      )
    } else {
      return <li>📄 {node.name}</li>
    }
  })
}

async function downloadZip() {
  const zip = new JSZip()
  async function addFiles(nodes, base = '') {
    for (const node of nodes) {
      if (node.type === 'dir') {
        await addFiles(node.children, `${base}${node.name}/`)
      } else {
        const res = await fetch(node.path)
        const blob = await res.blob()
        zip.file(`${base}${node.name}`, blob)
      }
    }
  }

  await addFiles(tree.value)
  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'download.zip')
}
</script>

<template>
  <div>
    <h3>📂 Directory Tree</h3>
    <ul v-if="tree.length">
      <li v-for="node in tree" :key="node.path">
        <template v-if="node.type === 'dir'">
          📁 {{ node.name }}
          <ul>
            <li v-for="child in node.children" :key="child.path">
              <span v-if="child.type === 'dir'">📁 {{ child.name }}</span>
              <span v-else>📄 {{ child.name }}</span>
            </li>
          </ul>
        </template>
        <template v-else>
          📄 {{ node.name }}
        </template>
      </li>
    </ul>
    <button @click="downloadZip" style="margin-top: 1rem;">⬇️ Download as ZIP</button>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding-left: 1em;
}
</style>
