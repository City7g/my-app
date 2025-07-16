<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const type = route.params.type
</script>

<template>
  <main>
    <h1>Add {{ type }}</h1>
  </main>
</template> 