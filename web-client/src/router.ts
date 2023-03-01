import { createRouter, createWebHistory } from "vue-router";
import CallbackVue from "./components/common/Callback.vue";
import HomeVue from "./views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeVue },
    { path: "/callback", component: CallbackVue },
  ],
});

export default router;
