import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home.vue";
import AddView from "@/views/Add.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/add",
      name: "add",
      component: AddView,
    },
    {
      path: "/add/:type",
      name: "add-type",
      component: () => import("@/views/AddType.vue"),
    },
  ],
});

export default router;
