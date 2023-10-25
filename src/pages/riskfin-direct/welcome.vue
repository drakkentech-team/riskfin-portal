<template>
  <v-main>
    <v-container>
      <div style="max-width: 90%; margin: 2rem;">
        <h1>Welcome {{ $route.query.firstNames }}</h1><br>
        <p>Thank you for your interest. <br>
          Please confirm your contact details below and click Next to continue or Back to change it.</p>
      </div>
      <div style="margin-bottom: 1rem; margin-left: 35%;">
        <p>First Names </p>
        <p class="right">: {{ $route.query.firstNames }}</p>
        <p>Surname </p>
        <p class="right">: {{ $route.query.surname }}</p>
        <p>Identity Number </p>
        <p class="right">: {{ $route.query.idNumber }}</p>
        <p>Email </p>
        <p class="right">: {{ $route.query.email }}</p>
        <p>Contact Phone Number </p>
        <p class="right">: {{ $route.query.contactPhoneNumber }}</p>

        <div style="padding-bottom: 2rem; margin-left: 50%;">
          <v-btn @click="sendEmailAndGoToThankYou" color="#98142c"
            style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;">Next</v-btn>
          <v-btn @click="goToRegistration" color="#98142c"
            style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Back</v-btn>
        </div>
        <div style="max-width: 95%; padding-bottom: 0.5rem; font-size: 80%; text-align: end;">
          <a href="#" @click="openModal" style="color: black;">Need Help ?</a>
        </div>
      </div>

      <!-- Use the reusable modal component -->
      <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal">
        <!-- Content of the modal goes here -->
        <p>Click the "Continue" button to proceed with the application process or click the "Back" button to return to
          edit
          the details displayed.</p>
        <p>- Riskfin Direct</p>
      </modal>
    </v-container>
  </v-main>
</template>

<script>
import Modal from './help-modal.vue';

const bearerToken = '1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      storedData: {
        firstNames: '',
        surname: '',
        email: '',
        contactPhoneNumber: '',
        idNumber: '',
      },
      isModalOpen: false,
    };
  },
  methods: {
    goToRegistration() {
      this.$router.go(-1);
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async sendEmail(userData) {
      try {
        const response = await fetch('http://localhost:9000/riskfin_direct_user', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          return true;
        } else {
          const responseBody = await response.text();
          console.error(`Email sending failed. Status: ${response.status}, Response: ${responseBody}`);
          return false;
        }
      } catch (error) {
        console.error(`Failed to send email: ${error.message}`);
        return false;
      }
    },
    async sendEmailAndGoToThankYou() {
      const userData = {
        name: this.storedData.firstNames,
        surname: this.storedData.surname,
        email: this.storedData.email,
        mobile_number: this.storedData.contactPhoneNumber,
        idNumber: this.storedData.idNumber,
      };

      const emailSent = await this.sendEmail(userData);

      if (emailSent) {
        this.$store.dispatch('updateUserData', userData);
        this.$router.push({ name: 'thank-you' });
      } else {
        console.error('Email sending failed. Please try again.');
      }
    },
  },
  created() {
    this.storedData.firstNames = this.$route.query.firstNames || '';
    this.storedData.surname = this.$route.query.surname || '';
    this.storedData.email = this.$route.query.email || '';
    this.storedData.contactPhoneNumber = this.$route.query.contactPhoneNumber || '';
    this.storedData.idNumber = this.$route.query.idNumber || '';
  },
};
</script>

<style lang="scss">
.right {
  margin-block-start: -2.5rem;
  margin-inline-start: 15rem;
}
</style>
