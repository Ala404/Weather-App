import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      //use dynamic import
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/weather/:state/:city",
      name: "cityView",
      component: () => import("../views/CityView.vue"),
    },
  ],
});

export default router;
