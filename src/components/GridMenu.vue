<script setup lang="ts">
import { animateStartBlocksHide, animateStartBlocksShow } from '@/animation/start'
import type { MenuItem } from '@/config/menu'

interface Props {
  items: MenuItem[]
}

defineProps<Props>()

onBeforeRouteLeave(async (to, from, next) => {
  await animateStartBlocksHide(document.querySelectorAll('.grid-menu-block'))
  next()
})

onMounted(async () => {
  await animateStartBlocksShow(document.querySelectorAll('.grid-menu-block'))
})
</script>

<template>
  <div class="grid-menu-container">
    <RouterLink 
      v-for="item in items" 
      :key="item.path"
      :to="item.path" 
      class="grid-menu-block"
      :class="item.class"
    >
      <SvgIcon :name="item.icon" class="grid-menu-block-icon" />
    </RouterLink>
  </div>
</template>

<style scoped>
.grid-menu-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  max-width: 400px;
  margin: 0 auto;
  padding: 32px;
  min-height: 80vh;
  place-content: center;
}

.grid-menu-block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: background-color 0.3s ease;
  will-change: transform;
}

.grid-menu-block:nth-child(1) {
  border-radius: 50% 8px 8px 8px;
}

.grid-menu-block:nth-child(2) {
  border-radius: 8px 50% 8px 8px;
}

.grid-menu-block:nth-child(3) {
  border-radius: 8px 8px 8px 50%;
}

.grid-menu-block:nth-child(4) {
  border-radius: 8px 8px 50% 8px;
}

.grid-menu-block-icon {
  color: #fff;
  width: 32px;
  height: 32px;
}

.profile-block {
  background-color: #FF3D00;
}

.profile-block:hover {
  background-color: #DD2C00;
}

.settings-block {
  background-color: #D500F9;
}

.settings-block:hover {
  background-color: #AA00FF;
}

.dashboard-block {
  background-color: #FF1744;
}

.dashboard-block:hover {
  background-color: #D50000;
}

.help-block {
  background-color: #2979FF;
}

.help-block:hover {
  background-color: #2962FF;
}

.grid-menu-block:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.grid-menu-block:hover .grid-menu-block-icon {
  opacity: 1;
}
</style> 