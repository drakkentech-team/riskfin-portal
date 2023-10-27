<script setup>
// import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue';

    // Components
        

    // const vuetifyTheme = useTheme()

    // const upgradeBanner = computed(() => {
    //     return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
    // })
</script>

<template>
  <div>
  <header style="display: flex; justify-content: space-between; background-color: #98142c;">
      <h1>Riskfin Direct</h1>
      <img src="/../riskfin-logo.png" alt="description" style="width: 10%; background-color: white;">
    </header>

    
    <!-- <VerticalNavLayout>        -->
        <slot />
    </div>
        <!-- 👉 Footer -->
        <!-- <template #footer>
            <Footer />
        </template> -->
    <!-- </VerticalNavLayout> -->
    <!-- position: absolute; right: 0; bottom: 0; left: 0; -->
    <footer style=" display: flex; justify-content: space-between; border: solid 2px black; margin-top: 0.5rem; background-color: #98142c; position: absolute; right: 0; bottom: 0; left: 0; ">
      <img src="/../riskfin-logo.png" alt="Riskfin Logo" style="width: 6%; margin-top: 0.5rem; background-color: white;" />
      <div>
        <div style=" padding-bottom: 2rem;text-align: center;">
          <button @click="applyForFuneralPlan" style=" padding: 5px 10px; border: none; border-radius: 5px; background-color: white; color: #98142c; cursor: pointer;">Privacy Policy</button>
        </div>
        <p>Policy administered by Riskfin Funeral Administrators, a Registered Financial Service Provider</p>

      </div>
      <div>
      <img src="@/assets/assist-cloud-logo.png" alt="Assist Cloud Logo" />
      <p>Powered by Riskfin Digital Systems</p>
      <img src="@/assets/assist-logo.png" alt="Assist Logo" />
      <p>Version 2.1.0</p>
    </div>
    </footer>
</template>

<style lang="scss" scoped>

</style>
