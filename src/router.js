import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from './DashboardLayout.vue';
import PlainLayout from './PlainLayout.vue';
import { useDataStore } from './stores/store'

const router = createRouter({
   history: createWebHistory(),
   routes: [
      {
         path: '/',
         component: PlainLayout,
         children: [
           {
             path: '',
             component: () => import('./pages/Login.vue')
           }
         ]
      },
      {
         path: '/login',
         component: PlainLayout,
         children: [
           {
             path: '',
             component: () => import('./pages/Login.vue')
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
               component: () => import('./pages/Notifications.vue'),
               // meta: { requiresAuth: true }
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
               component: () => import('./pages/Products.vue'),
               // meta: { requiresAuth: true }
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
               component: () => import('./pages/userManagement/MobileAppUsers.vue'),
               // meta: { requiresAuth: true }
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
               component: () => import('./pages/userManagement/AdminPortalUsers.vue'),
               // meta: { requiresAuth: true }
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
               component: () => import('./pages/News.vue'),
               // meta: { requiresAuth: true }
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
               component: () => import('./pages/PaymentAccount.vue'),
               // meta: { requiresAuth: true }
            },
         ]
      },
   ]
});


// router.beforeEach((to, from, next) => {
//    const userStore = useDataStore()
//    const userIsLoggedIn = userStore.userData ? true : false
 
//    if (to.path === '/login' && userIsLoggedIn) {
//      next('/notifications');
//    } else if (to.path !== '/login' && !userIsLoggedIn) {
//      next('/login');
//    } else {
//      next();
//    }
//  });

export default router;