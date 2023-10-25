<!-- <template>
  <div class="h-100 d-flex align-center justify-space-between">
    //👉 Footer: left content
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Created by DrakkenTech
    </span>
    //👉 Footer: right content
  </div>
</template> -->

<template>
  <footer class="footer"
    style=" display: flex; justify-content: space-between; border: solid 2px black; margin-top: 0.5rem; background-color: #98142c;">
    <img src="/../riskfin-logo.png" alt="Riskfin Logo" style="width: 6%; margin: 0.5rem; background-color: white;" />
    <div>
      <div style=" padding-bottom: 2rem;text-align: center;">
        <button @click="applyForFuneralPlan"
          style=" padding: 5px 10px; border: none; border-radius: 5px; background-color: white; color: #98142c; cursor: pointer;">Privacy
          Policy</button>
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

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  /* Define your footer styles here */
  position: absolute;
  padding: 10px;
  background-color: #333;

  /* Adjust the background color */
  block-size: 50px;

  /* Adjust as needed */

  /* color: #fff; Adjust the text color */
  inset-block-end: 0;
  inset-inline: 0;
  text-align: center;
}
</style>
