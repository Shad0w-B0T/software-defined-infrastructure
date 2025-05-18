<template>
  <figure class="my-6 text-center">
    <img :src="src" :alt="alt" class="mx-auto rounded-md shadow" :style="{ maxWidth: width }" />
    <figcaption class="mt-2 text-sm text-gray-600 italic">
      <strong>Figure {{ number }}:</strong> {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup>
defineProps({
  src: String,
  alt: String,
  caption: String,
  number: Number,
  width: {
    type: String,
    default: '100%'
  }
})
</script>

<style scoped>
figure img {
  border: 1px solid #ddd;
}
</style>
