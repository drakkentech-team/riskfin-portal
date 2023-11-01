import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from '../store/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: "/",
      component: () => import("../layouts/default.vue"),
      children: [
        {
          path: "notifications",
          component: () => import("../pages/notifications.vue"),
        },

        {
          path: 'user-management',
          component: () => import('../pages/user-management.vue'),
        },
        {
          path: 'product_management',
          component: () => import('../pages/product_management.vue'),
        },
        {
          path: 'news',
          component: () => import('../pages/news.vue'),
        },
      ],
    },
    {
      path: "/",
      component: () => import("../layouts/blank.vue"),
      children: [
        {
          path: "login",
          component: () => import("../pages/login.vue"),
        },
        {
          path: "register",
          component: () => import("../pages/register.vue"),
        },
        {
          path: "/:pathMatch(.*)*",
          component: () => import("../pages/[...all].vue"),
        },
      ],
    },
    {
      path: "/riskfin-direct",
      component: () => import("../pages/riskfin-direct/home.vue"),
      children: [
        {
          path: "register",
          name: "register",
          component: () => import("../pages/riskfin-direct/register.vue"),
        },
        {
          path: "register",
          component: () => import("../pages/register.vue"),
        },
        {
          path: "/:pathMatch(.*)*",
          component: () => import("../pages/[...all].vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const userIsLoggedIn = userStore.userData ? true : false

  if (to.path === '/login' && userIsLoggedIn) {
    next('/notifications');
  } else if (to.path !== '/login' && !userIsLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
