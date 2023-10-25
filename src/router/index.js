import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from '../store/user';

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
    { path: '/riskfin-direct', redirect: 'riskfin-direct/home' },
    {
      path: "/riskfin-direct",
      component: () => import("../layouts/riskfin-direct-default.vue"),
      children: [
        {
          path: "register",
          name: "register",
          component: () => import("../pages/riskfin-direct/register.vue"),
        },
        // {
        //   path: "funeral-policy",  
        //   component: () => import('../pages/riskfin-direct/funeral-policy.vue'),
        // },
        {
          path: "home", 
          name: 'home', 
          component: () => import('../pages/riskfin-direct/home.vue'),
        },
        {
          path: "welcome", 
          name: 'welcome', 
          component: () => import('../pages/riskfin-direct/welcome.vue'),
        },
        {
          path: "thank-you", 
          name: 'thank-you', 
          component: () => import('../pages/riskfin-direct/thank-you.vue'),
        },
        {
          path: "build-funeral-policy",
          name: 'build-funeral-policy', 
          component: () => import("../pages/riskfin-direct/build-funeral-policy.vue"),
        },
        {
          path: "policy-selection",
          name: 'policy-selection', 
          component: () => import("../pages/riskfin-direct/policy-selection.vue"),
        },
        {
          path: 'cover-selection/family',
          name: 'family',
          component: () => import('../pages/riskfin-direct/cover-selection/family.vue'),
        },
        {
          path: 'cover-selection/single',
          name: 'single',
          component: () => import('../pages/riskfin-direct/cover-selection/single.vue'),
        },
        {
          path: 'cover-selection/member-plus-5',
          name: 'member plus 5',
          component: () => import('../pages/riskfin-direct/cover-selection/member-plus-5.vue'),
        },
        {
          path: 'cover-selection/member-plus-9',
          name: 'member plus 9',
          component: () => import('../pages/riskfin-direct/cover-selection/member-plus-9.vue'),
        },
        {
          path: 'cover-selection/member-plus-13',
          name: 'member plus 13',
          component: () => import('../pages/riskfin-direct/cover-selection/member-plus-13.vue'),
        },
        {
        path: "main-member-details", 
        name: 'main-member-details',
        component: () => import('../pages/riskfin-direct/main-member-details.vue'),
      },
      {
        path: "spouse-details", 
        name: 'spouse-details',
        component: () => import('../pages/riskfin-direct/spouse-details.vue'),
      },
      {
        path: "first-child-details", 
        name: 'first-child-details',
        component: () => import('../pages/riskfin-direct/first-child-details.vue'),
      },
      {
        path: "second-child-details", 
        name: 'second-child-details',
        component: () => import('../pages/riskfin-direct/second-child-details.vue'),
      },
      {
        path: "first-extended-details", 
        name: 'first-extended-details',
        component: () => import('../pages/riskfin-direct/first-extended-details.vue'),
      },
      {
        path: "policy-details", 
        name: 'policy-details',
        component: () => import('../pages/riskfin-direct/policy-details.vue'),
      },
      {
        path: "debit-order-details", 
        name: 'debit-order-details',
        component: () => import('../pages/riskfin-direct/debit-order-details.vue'),
      },
      {
        path: "complete", 
        name: 'complete',
        component: () => import('../pages/riskfin-direct/complete.vue'),
      },
      {
        path: "form-modals/MainMemberDetailsModal", 
        name: 'MainMemberDetailsModal',
        component: () => import('../pages/riskfin-direct/form-modals/MainMemberDetailsModal.vue'),
      },
      {
        path: "form-modals/SpouseModal", 
        name: 'SpouseModal',
        component: () => import('../pages/riskfin-direct/form-modals/SpouseModal.vue'),
      },
      {
        path: "form-modals/ChildModal", 
        name: 'ChildModal',
        component: () => import('../pages/riskfin-direct/form-modals/ChildModal.vue'),
      },
      {
        path: "form-modals/ExtendedModal", 
        name: 'ExtendedModal',
        component: () => import('../pages/riskfin-direct/form-modals/ExtendedModal.vue'),
      },
      {
        path: 'form-modals/EditMainMemberDetails', 
        component: 'EditMainMemberDetails',
      },
      

      ],
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore();
//   const userIsLoggedIn = userStore.userData !== null;

//   if (to.path === '/riskfin-direct/build-funeral-policy') {
//     // Allow navigation to this specific route unconditionally
//     next();
//   } else if (to.path === '/login' && userIsLoggedIn) {
//     // Redirect to '/notifications' if user is logged in and trying to access '/login'
//     next('/notifications');
//   } else if (to.path !== '/login' && !userIsLoggedIn) {
//     // Redirect to '/login' if user is not logged in and trying to access any other route
//     next('/login');
//   } else {
//     // Allow navigation for all other cases
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // const userIsLoggedIn = userStore.userData ? true : false
  const userIsLoggedIn = userStore.userData !== null;

  
  if (to.path === '/riskfin-direct/build-funeral-policy') {
    next();
  } else {
    next();
  }
  if (to.path === '/login' && userIsLoggedIn) {
    next('/notifications');
  } else if (to.path !== '/login' && !userIsLoggedIn) {
    next('/login');
  } else {
    next();
  }

  // if (to.path === '/login' && userIsLoggedIn) {
  //   next('/notifications');
  // } else 
//   if (to.path !== '/login' && !userIsLoggedIn) {
//     next('/product_management');
//   } else {
//     next();
//   }
});

export default router;
