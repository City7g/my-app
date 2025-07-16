<template>
  <div class="svg-icon" v-html="svgContent"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  name: string
}>()

const svgContent = ref('')

onMounted(async () => {
  try {
    const svg = await import(`../../assets/icons/${props.name}.svg?raw`)
    svgContent.value = svg.default
  } catch (error) {
    console.error(`Failed to load SVG: ${props.name}`, error)
  }
})
</script>

<style scoped>
.svg-icon {
  display: inline-flex;
  width: 48px;
  height: 48px;
}

.svg-icon :deep(svg) {
  width: 100%;
  height: 100%;
}
</style> 