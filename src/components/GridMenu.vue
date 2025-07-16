<script setup lang="ts">
import { animateStartBlocksHide, animateStartBlocksShow } from '@/animation/start'
import type { MenuItem } from '@/config/menu'

interface Props {
  items: MenuItem[]
}

defineProps<Props>()

onBeforeRouteLeave(async (to, from, next) => {
  await animateStartBlocksHide(
    document.querySelectorAll('.grid-menu-block'),
    document.querySelector('.home-button')!
  )
  next()
})

onMounted(async () => {
  await animateStartBlocksShow(
    document.querySelectorAll('.grid-menu-block'),
    document.querySelector('.home-button')!
  )
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
    <RouterLink 
      to="/"
      class="home-button"
    >
      <div class="home-button-inner">
        <SvgIcon name="home" class="grid-menu-block-icon" />
      </div>
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
  position: relative;
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

.home-button {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  text-decoration: none;
  z-index: 1;
  background-color: #FFD600;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.home-button:hover {
  background-color: #FFC400;
}

.home-button-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
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