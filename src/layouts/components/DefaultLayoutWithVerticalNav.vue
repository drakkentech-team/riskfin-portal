<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import upgradeBannerDark from '@images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@images/pro/upgrade-banner-light.png'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { useTheme } from 'vuetify'
import { useUserStore } from '../../store/user';
import { useRouter } from 'vue-router';
const router = useRouter()
// Components
import Footer from '@/layouts/components/Footer.vue'

const vuetifyTheme = useTheme()
const userStore = useUserStore()
onMounted(() => {
    const userStore = useUserStore()
    if (!userStore.userData){
      return router.push({ path: '/login' })
    }
  });

const handleItemClick = (item) => {
      if (item.title === 'Logout') {
        userStore.clearUserData();
        return router.push({ path: '/login' })
      }
    }

</script>

<template>
  <VerticalNavLayout >
    <!-- 👉 navbar -->


    <template #vertical-nav-content >
      <!-- <VerticalNavLink
        :item="{
          title: 'Dashboard',
          icon: 'bx-home',
          to: '/dashboard',
        }"
      /> -->
      <!--<VerticalNavLink
        :item="{
          title: 'Account Settings',
          icon: 'mdi-account-cog-outline',
          to: '/account-settings',
        }"
      />-->

      <VerticalNavLink class="pt-5"
        :item="{
          title: 'Notifications',
          icon: 'bx-bell',
          to: '/notifications',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Policies',
          icon: 'bx-book-content',
          to: '/product_management',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'News',
          icon: 'bx-news',
          to: '/news',
        }"
      />
      <VerticalNavLink
        v-if="userStore.userData && userStore.userData[0][1] === 1"
        :item="{
          title: 'User Management',
          icon: 'mdi-account-cog-outline',
          to: '/user-management',
        }"
      />  
      <VerticalNavLink
        @item-click="handleItemClick"
        :item="{
          title: 'Logout',
          icon: 'bx-log-in',
          to: '/login',
        }"
      />
      <!--<VerticalNavLink
        :item="{
          title: 'Login',
          icon: 'bx-log-in',
          to: '/login',
        }"
      />-->
      <!--<VerticalNavLink
        :item="{
          title: 'Register',
          icon: 'bx-user-plus',
          to: '/register',
        }"
      />-->
      <!--<VerticalNavLink
        :item="{
          title: 'Product Management',
          icon: 'carbon:product',
          to: '/product_management',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Error',
          icon: 'bx-info-circle',
          to: '/no-existence',
        }"
      />-->

      <!-- 👉 User Interface -->
      <!--<VerticalNavSectionTitle
        :item="{
          heading: 'User Interface',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Typography',
          icon: 'mdi-alpha-t-box-outline',
          to: '/typography',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Icons',
          icon: 'bx-show',
          to: '/icons',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Cards',
          icon: 'bx-credit-card',
          to: '/cards',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Tables',
          icon: 'bx-table',
          to: '/tables',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Form Layouts',
          icon: 'mdi-form-select',
          to: '/form-layouts',
        }"
      />-->
    </template>

    <template #after-vertical-nav-items>
      <!-- 👉 illustration -->
      <a
        href="https://themeselection.com/item/sneat-vuetify-vuejs-admin-template"
        target="_blank"
        rel="noopener noreferrer"
        style="margin-left: 7px;"
      >
        
      </a>
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
