<script setup lang="ts">
import { addMenuItems } from '@/config/menu'
</script>

<template>
  <main>
    <TotalSpent />
    <GridMenu :items='addMenuItems' />
  </main>
</template>

<style>
.food-block {
  background-color: #4CAF50;
}

.food-block:hover {
  background-color: #388E3C;
}

.transport-block {
  background-color: #03A9F4;
}

.transport-block:hover {
  background-color: #0288D1;
}

.shopping-block {
  background-color: #9C27B0;
}

.shopping-block:hover {
  background-color: #7B1FA2;
}

.entertainment-block {
  background-color: #FF9800;
}

.entertainment-block:hover {
  background-color: #F57C00;
}
</style>
