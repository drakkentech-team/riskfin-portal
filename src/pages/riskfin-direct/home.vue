<!-- 
<template>
  <div class="funeral-plan">

    <section class="content">
      <div >
        <h1 style=" margin: 3rem 0;color: #39f; text-align: center;">
          <strong>Why&nbsp;do you need a Funeral Plan ?</strong>
        </h1>
      
      <div style="margin: 0 1.5rem;">
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
      <div style="font-size: 80%;text-align: end;">
        <a href="#" @click="openModal" style="color: black;">Need Help ?</a>
      </div>
      </div>
      
    </div>

    <div style=" padding-bottom: 2rem;text-align: center;">
      <button @click="goToDashboard" style=" padding: 8px 20px; border: none; border-radius: 5px; background-color: #98142c; color: #fff; cursor: pointer;">Apply for funeral plan</button>
    </div>

   <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal">
      -- Content of the modal goes here --
      <p>Please click on "Apply For Funeral Plan" button to continue</p><br>
      <p>- Riskfin Direct</p>
    </modal>
    
    </section>
  </div>

</template> -->



<template>
  <div class="auth-wrapper d-flex align-center justify-center centered-wrapper">
    <!-- <v-app> -->
    <!-- Header (optional) -->
    <!-- <v-app-bar app color="#98142c" dark>
      <v-app-bar-title> Riskfin Direct</v-app-bar-title>
      <v-img src="/../riskfin-logo.png" alt="description" max-width="40" max-height="40"></v-img>
    </v-app-bar> -->

    <v-main>
      <v-container>
        <v-row>
          <v-col cols=" 12">
            <h3 class="text-h3 mt-6 text-center" style="color: #39f;">
              <strong>Why do you need a Funeral Plan?</strong>
            </h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <div class="text-left mb-6 mx-3">
              <v-text>
                Nothing is as unexpected and life-changing as the loss of a loved one. Death is an unpleasant subject
                for
                all of us, yet we have to deal with the loss of a loved one at some time.
              </v-text>
            </div>

            <div class="text-left mb-6 mx-3">
              <v-text>
                A funeral plan affords you the opportunity to bury your loved one with dignity and respect while easing
                the financial burden on those who are left behind. We offer a funeral plan to anyone under the age of
                85.
              </v-text>
            </div>

            <div class="text-left mx-3">
              <v-text>
                The funds from a funeral plan are paid within 48 hours from the time that ALL the relevant documentation
                has been submitted for a valid claim.
              </v-text>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="text-right">
            <a href="#" @click="openModal" style=" color: #4c5e70; font-size: 13px; text-decoration: none;">Need
              Help ?</a>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn @click="goToDashboard" color="#98142c"
              style=" padding: 8px 20px; border: none; border-radius: 5px; margin-bottom: 3rem; color: #fff; cursor: pointer;">
              Apply for funeral plan
            </v-btn>
          </v-col>
        </v-row>

        <!-- Use the reusable modal component -->
        <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal">
          <!-- Content of the modal goes here -->
          <div class="text-left mb-6 mx-3">
            <v-text>
              Please click on "Apply For Funeral Plan" button to continue
            </v-text>
          </div>
          <div>
            <v-text class="text-left mx-3">
              - Riskfin Direct
            </v-text>
          </div>
        </modal>
      </v-container>
    </v-main>
    <!-- </v-app> -->
  </div>
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


<!-- <script>
import { useRouter } from 'vue-router';
import Modal from './help-modal.vue';

const router = useRouter()
export default {
  components: {
    Modal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    goToDashboard() {
      this.$router.push({ name: 'register' });
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
  
  }
</script> -->




<script>
import { useRouter } from 'vue-router';
import Modal from './help-modal.vue';

export default {
  components: {
    Modal,
  },
  setup() {
    const router = useRouter();

    // Define your component's reactive properties and logic here
    const isModalOpen = ref(false);

    const goToDashboard = () => {
      router.push({ name: 'register' });
    };

    // Method to open the modal
    const openModal = () => {
      isModalOpen.value = true;
    };

    // Method to close the modal
    const closeModal = () => {
      isModalOpen.value = false;
    };

    // Return any properties or methods that your component needs
    return {
      isModalOpen,
      goToDashboard,
      openModal,
      closeModal,
    };
  },
};
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
