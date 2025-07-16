<script setup lang="ts">
defineOptions({
  name: 'StartPage'
})

import { RouterLink, onBeforeRouteLeave } from 'vue-router'
import SvgIcon from './ui/SvgIcon.vue'
import { onMounted } from 'vue'
import gsap from 'gsap'

const menuItems = [
  { path: '/profile', icon: 'profile', class: 'profile-block' },
  { path: '/settings', icon: 'settings', class: 'settings-block' },
  { path: '/dashboard', icon: 'dashboard', class: 'dashboard-block' },
  { path: '/help', icon: 'help', class: 'help-block' }
]

onBeforeRouteLeave((to, from, next) => {
  const blocks = document.querySelectorAll('.start-block')
  
  blocks.forEach((block, index) => {
    const origins = ['right bottom', 'left bottom', 'right top', 'left top']
    gsap.set(block, { transformOrigin: origins[index] })
  })

  gsap.to('.start-block', {
    scale: 0,
    opacity: 0,
    duration: 0.3,
    stagger: 0.08,
    onComplete: () => next()
  })
})

onMounted(() => {
  const blocks = document.querySelectorAll('.start-block')
  
  blocks.forEach((block, index) => {
    const origins = ['right bottom', 'left bottom', 'right top', 'left top']
    gsap.set(block, { transformOrigin: origins[index] })
  })

  gsap.from('.start-block', {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    // ease: 'back.out(1.7)'
  })
})
</script>

<template>
  <div class="start-container">
    <RouterLink 
      v-for="item in menuItems" 
      :key="item.path"
      :to="item.path" 
      class="start-block"
      :class="item.class"
    >
      <SvgIcon :name="item.icon" class="start-block-icon" />
    </RouterLink>
  </div>
</template>

<style scoped>
.start-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  max-width: 400px;
  margin: 0 auto;
  padding: 32px;
  min-height: 80vh;
  place-content: center;
}

.start-block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: box-shadow 0.3s ease;
  will-change: transform;
}

.start-block:nth-child(1) {
  border-radius: 50% 8px 8px 8px;
}

.start-block:nth-child(2) {
  border-radius: 8px 50% 8px 8px;
}

.start-block:nth-child(3) {
  border-radius: 8px 8px 8px 50%;
}

.start-block:nth-child(4) {
  border-radius: 8px 8px 50% 8px;
}

.start-block-icon {
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

.start-block:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.start-block:hover .start-block-icon {
  opacity: 1;
}
</style>
