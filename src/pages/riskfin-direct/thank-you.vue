<template>
  <v-main>
    <v-container>
      <div style="max-width: 90%; margin: 2rem;">
        <h1>Thank you {{ userData.name }}</h1><br>
        <p>An email was sent to the email address provided by you. Kindly open the email and click on the link contained
          in that email to proceed with the application for a new policy.</p>
        <p>- Riskfin Direct</p>
      </div>

      <div style="max-width: 95%; padding-bottom: 2rem; text-align: end;">
        <v-btn @click="submit" color="#98142c"
          style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;">Continue</v-btn>
        <v-btn @click="resendEmail" color="#98142c"
          style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;">Resend</v-btn>
        <v-btn @click="goToHome" color="#98142c"
          style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Back
          to Home</v-btn>
      </div>
      <div style="max-width: 95%; padding-bottom: 2rem; font-size: 80%; text-align: end;">
        <a href="#" @click="openModal" style="color: black;">Need Help ?</a>
      </div>

      <!-- Use the reusable modal component -->
      <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal">
        <!-- Content of the modal goes here -->
        <p>To proceed with the application for a funeral policy, please check your email. We have sent you an email which
          contains a link to the next step in the application process.</p>

        <p>If you do not receive an email from us within the next 5 to 10 minutes, please click the resend button so that
          we may resend the confirmation email to the address provided by you.</p>
        <p>- Riskfin Direct</p>
      </modal>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex';
import Modal from './help-modal.vue';

export default {
  computed: {
    ...mapGetters(['getUserData']),
  },
  components: {
    Modal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    submit() {
      this.$router.push({ name: 'build-funeral-policy' });
    },
    resendEmail() {
      // Logic to resend the email
    },
    goToHome() {
      this.$router.push({ name: 'home' });
    },
    // Method to open the modal
    openModal() {
      this.isModalOpen = true;
    },
    // Method to close the modal
    closeModal() {
      this.isModalOpen = false;
    },
  },
  created() {
    this.userData = this.getUserData;
  },
};
</script>
