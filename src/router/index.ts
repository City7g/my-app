import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('@/views/Add.vue'),
    },
    {
      path: '/add/:type',
      name: 'add-type',
      component: () => import('@/views/AddType.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
    },
    {
      path: '/storage',
      name: 'storage',
      component: () => import('@/components/LocalStorageViewer.vue'),
    },
  ],
})

export default router
