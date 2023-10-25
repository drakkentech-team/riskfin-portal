<!-- <template>
  <div>

    <div class="container">
      <div class="left-side">
        
       <p>Nothing is as unexpected and life changing as the loss of a loved one. Death is an unpleasant subject for all of us, yet we have to deal with the loss of a loved one at some time.
 
 A funeral plan affords you the opportunity to bury your loved one with dignity and respect while easing the financial burden on those who are left behind. We offer a funeral plan to anyone under the age of 85.
 
 The funds from a funeral plan are paid within 48 hours from the time that ALL the relevant documentation has been submitted for a valid claim.</p>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="goToDashboard"
          >
            Apply for funeral plan
          </v-btn>
      </div>
      <div class="right-side">
        <img src="" alt="Description of image">
      </div>
    </div>
  </div>
  <div class="h-100 d-flex align-center justify-space-between">
     👉 Footer: left content 
    <span class="d-flex align-center">
      Privacy Policy
    </span>
  </div>
</template> -->

<template>
  <div class="funeral-plan" style="border: solid 1px black;">
    <!-- <header style="display: flex; justify-content: space-between; background-color: #98142c;">
      <h1>Riskfin Direct</h1>
      <img src="/../riskfin-logo.png" alt="description" style="width: 10%; background-color: white;">
    </header> -->
    <section class="content">
      <div>
        <h1 style=" margin: 3rem 0;color: #39f; text-align: center;">
          <strong>Why&nbsp;do you need a Funeral Plan ?</strong>
        </h1>

        <!-- <h2  style="margin: 3rem 0; color: #3298ff; font-size: large; text-align: center;">Why do you need a Funeral Plan ?</h2> -->
        <p>
          Nothing is as unexpected and life changing as the loss of a loved one.
          Death is an unpleasant subject for all of us, yet we have to deal with the
          loss of a loved one at some time.
        </p>
        <p>
          A funeral plan affords you the opportunity to bury your loved one with
          dignity and respect while easing the financial burden on those who are left behind.
          We offer a funeral plan to anyone under the age of 85.
        </p>
        <p>
          The funds from a funeral plan are paid within 48 hours from the time that ALL
          the relevant documentation has been submitted for a valid claim.
        </p>
        <div style="font-size: 70%;text-align: end;">
          <a href="your_link_here" style="color: black;">Need Help ?</a>
        </div>
      </div>

      <div style=" padding-bottom: 2rem;text-align: center;">
        <button @click="goToDashboard"
          style=" padding: 8px 20px; border: none; border-radius: 5px; background-color: #98142c; color: #fff; cursor: pointer;">Apply
          for funeral plan</button>
      </div>
      <!-- <a href="your_link_here"> -->
      <!-- <button>
          Apply for funeral plan
        </button> -->
      <!-- </a> -->

      <!-- <button src
      >
        Apply for funeral plan
      </button> -->

    </section>
  </div>
  <!-- <footer style=" display: flex; justify-content: space-between; border: solid 2px black; margin-top: 0.5rem; background-color: #98142c;">
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
    </footer> -->
</template>
<!-- 
<script>
export default {
  name: 'FuneralPlan',
};
</script> -->
<!-- 
<style scoped>
/* Add your styling here */
</style> -->


<script>
import { useRouter } from 'vue-router';

const router = useRouter()
export default {
  methods: {
    goToDashboard() {
      this.$router.push({ name: 'register' });
    }
  }
}
</script>
<!-- 
<style scoped>
.body-text {
  font-family: Montserrat, sans-serif;
}

.header {
  background-color: #90162a;
  color: #fff;
  inline-size: 100%;
  padding-block: 20px;
  padding-inline: 0;
  text-align: center;
}

.title {
  margin: 0;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  block-size: calc(100vh - 60px); /* Subtract the height of the header */
  color: #fff;
}

.left-side,
.right-side {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #030303;
  inline-size: 50%;
  text-align: center;
}

.right-side img {
  block-size: auto; /* Keep this to maintain aspect ratio */
  inline-size: 100%; /* Change this value to make the image bigger or smaller */
}
</style> -->
