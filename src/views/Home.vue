<script setup lang="ts">
import { menuItems } from '@/config/menu'
</script>

<template>
  <main>
    <TotalSpent />
    <GridMenu :items="menuItems" />
  </main>
</template>

<style>
main {
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.grid-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
