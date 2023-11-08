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
         path: '/products',
         component: DashboardLayout,
         children: [
            {
               path: '/products',
               name: 'products',
               component: () => import('../pages/products.vue'),
            },
         ]
      },
      {
         path: '/mobile-app-users',
         component: DashboardLayout,
         children: [
            {
               path: '/mobile-app-users',
               name: 'mobile-app-users',
               component: () => import('../pages/userManagement/mobileAppUsers.vue'),
            },
         ]
      },
      {
         path: '/admin-portal-users',
         component: DashboardLayout,
         children: [
            {
               path: '/admin-portal-users',
               name: 'admin-portal-users',
               component: () => import('../pages/userManagement/adminPortalUsers.vue'),
            },
         ]
      },
      {
         path: '/news',
         component: DashboardLayout,
         children: [
            {
               path: '/news',
               name: 'news',
               component: () => import('../pages/news.vue'),
            },
         ]
      },
      {
         path: '/payment-account',
         component: DashboardLayout,
         children: [
            {
               path: '/payment-account',
               name: 'Payment Account',
               component: () => import('../pages/paymentAccount.vue'),
            },
         ]
      },
   ]
});

export default router;