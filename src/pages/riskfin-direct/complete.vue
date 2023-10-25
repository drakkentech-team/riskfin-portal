<template>
  <div class="progress-bar">
    <div class="step" v-for="(step, index) in steps" :key="index">
      {{ step }}
      <div class="step-indicator" :class="{ done: index < currentStep }"></div>
    </div>
  </div>

  <div class="progress" id="progress" style=" display: none;width: 100%; border: 2px solid rgb(204, 204, 204);">
    <div class="progress-bar progress-bar-striped active" role="progressbar" id="progressBar" aria-valuenow="100"
      aria-valuemin="0" aria-valuemax="100" style=" display: none;width: 100%;">
      Loading ...
    </div>

  </div>


  <div>
    <div style="margin: 2rem auto;text-align: center;">
      <!-- <h1>Thank you {{ userData.name }}</h1><br> -->
      <!-- <p>An email was sent to the email address provided by you. Kindly open the email and click on the
        link contained in that email to proceed with the application for a new policy.</p>
      <p>- Riskfin Direct</p> -->

      <p style="width: 100%;padding: 20px;"><span
          style=" color: #98142c;font-family: arial, helvetica, sans-serif; font-size: large;">Thank you</span> for your
        application.
        Please see your e-mail for a copy of the terms and conditions as well as your draft policy document.<br>
        We look forward to serving you on the way forward. {{ debitOrderDetails.AccountHolder }}
      </p>

    </div>

    <div style="text-align: center;"><img title="Logo"
        src="https://riskfindirect.co.za/Administrator/images/uploads/1447243441.jpg" alt="Riskfin Logo" width="185"
        height="153">&nbsp;</div>
    <br>
    <div style="text-align: center;"><span style="color: #f00; font-size: large;"><strong>Take a minute to subscribe to
          our newsletter:</strong></span></div>
    <br>
    <br>
    <div style="text-align: center;"><a title="Newsletter" href="http://eepurl.com/bFJyx5"><img title="Newsletter"
          src="https://riskfindirect.co.za/Administrator/images/uploads/1447244326.png" alt="Newsletter" width="216"
          height="231"></a></div>
    <div style=" padding-bottom: 2rem;text-align: center;">
      <button @click="goToHome"
        style=" padding: 8px 20px; border: none; border-radius: 5px; background-color: #98142c; color: #fff; cursor: pointer;">Apply
        for another funeral plan</button>
    </div>
    <!-- <div style=" max-width: 95%;padding-bottom: 2rem;font-size: 80%;text-align: end;">
      <a href="#" @click="openModal" style="color: black;">Need Help ?</a>
    </div> -->

    <!-- Use the reusable modal component -->
    <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal">
      <!-- Content of the modal goes here -->
      <p>To proceed with the application for a funeral policy please check your email, we have sent you an email which
        contains a link to the next step in the application process.</p>

      <p>Should not receive an email from us within the next 5 to 10 minutes please click the resend button so that we may
        resend the confirmation email to the address provided by you.</p>
      <p>- Riskfin Direct</p>
    </modal>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { mapGetters } from 'vuex';
import Modal from './help-modal.vue';

const router = useRouter()

export default {
  computed: {
    ...mapGetters(['getUserData', 'getDebitOrderDetails']),
  },
  components: {
    Modal,
  },
  data() {
    return {
      currentStep: 6, // Change this to control the current step
      steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
      isModalOpen: false,
    };
  },
  methods: {
    submit() {
      this.$router.push({ name: 'build-funeral-policy' });
    },
    goToHome() {
      this.$router.push({ name: 'build-funeral-policy' });
    },
    goToRegister() {
      console.log(this.getDebitOrderDetails.AccountHolder);
      this.$router.push({ name: 'register' });

    },
    // Method to open the modal
    openModal() {
      this.isModalOpen = true;
      console.log(this.getDebitOrderDetails)
    },

    // Method to close the modal
    closeModal() {
      this.isModalOpen = false;
    },
  },
  created() {
    this.userData = this.getUserData;
    this.debitOrderDetails = this.getDebitOrderDetails;
  },

}
</script>

<style lang="scss">
.progress-bar {
  display: flex;
  overflow: hidden;

  /* Hide overflowing rounded corners */
  align-items: center;
  justify-content: space-between;
  border: 1px solid #007bff;
  border-radius: 20px;

  /* Rounded border */
  background-color: #f0f0f0;

  /* Background color of the progress bar */
  inline-size: 80%;
  margin-block: 0;
  margin-block-start: 1rem;
  margin-inline: auto;
  padding-block: 10px;
  padding-inline: 0;
}

.step {
  position: relative;
  flex: 1;
  padding-block: 10px;
  padding-inline: 0;
  text-align: center;
}

.step:not(:last-child)::after {
  position: absolute;
  background-color: #007bff;

  /* Color of the separator line */
  content: "";
  inline-size: 2px;

  /* Adjust the width of the separator as needed */
  inset-block-start: 50%;
  inset-inline-end: -1px;

  /* Adjust the position of the separator */
  transform: translateY(-50%);
}

.step-indicator {
  position: absolute;
  border-radius: 50%;

  // background-color: #007bff;
  block-size: 20px;
  inline-size: 20px;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  margin-block: 0;
  margin-inline: auto;
  transform: translate(-50%, -50%);
  transition: background-color 0.3s;
}

.step-indicator.done {
  background-color: #28a745;

  // background-color: transparent; /* Set the background to transparent */
  color: #28a745;

  /* Change the text color for completed steps */
}
</style>
