import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from '../DashboardLayout.vue';
import PlainLayout from '../PlainLayout.vue';

const router = createRouter({
   history: createWebHistory(),
   routes: [
      {
         path: '/',
         component: PlainLayout,
         children: [
           {
             path: '',
             component: () => import('../pages/login.vue')
           }
         ]
      },
      {
         path: '/login',
         component: PlainLayout,
         children: [
           {
             path: '',
             component: () => import('../pages/login.vue')
           }
         ]
      },
      {
         path: '/notifications',
         component: DashboardLayout,
         children: [
            {
               path: '/notifications',
               name: 'notifications',
               component: () => import('../pages/notifications.vue'),
            },
         ]
      },
      {
         path: '/mobile-app-users',
         component: DashboardLayout,
         children: [
            {
               path: '',
               name: 'mobile-app-users',
               component: () => import('../pages/mobileAppUsers.vue'),
            },
         ]
      },
      {
         path: '/payment-account',
         component: DashboardLayout,
         children: [
            {
               path: '',
               name: 'payment-account',
               component: () => import('../pages/paymentAccount'),
            },
         ]
      },
   ]
});

export default router;