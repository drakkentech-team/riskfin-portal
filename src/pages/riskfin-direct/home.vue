
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
          <v-col cols="12" class="text-center">
            <v-btn @click="goToDashboard" color="#98142c"
              style=" padding: 8px 20px; border: none; border-radius: 5px; margin-bottom: 3rem; margin-top: 3rem; color: #fff; cursor: pointer;">
              Apply for funeral plan
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="text-right">
            <a href="#" @click="openModal" style=" color: #4c5e70; font-size: 13px; text-decoration: none;">Need
              Help ?</a>
          </v-col>
        </v-row>

        <!--Help modal component -->
        <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal">

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



<script>
import { useRouter } from 'vue-router';
import Modal from './help-modal.vue';

export default {
  components: {
    Modal,
  },
  setup() {
    const router = useRouter();

    const isModalOpen = ref(false);

    const goToDashboard = () => {
      router.push({ name: 'register' });
    };

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    return {
      isModalOpen,
      goToDashboard,
      openModal,
      closeModal,
    };
  },
};
</script>
