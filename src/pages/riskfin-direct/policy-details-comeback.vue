<template>
    <v-container>
      <!-- Progress Bar -->
      <div class="progress-bar">
        <div class="step" v-for="(step, index) in steps" :key="index">
          {{ step }}
          <div class="step-indicator" :class="{ done: index < currentStep }"></div>
        </div>
      </div>
  
      <!-- Loading Progress -->
      <div id="progress" style="width: 100%; border: 2px solid rgb(204, 204, 204); display: none;">
        <div class="progress-bar progress-bar-striped active" role="progressbar" id="progressBar" aria-valuenow="100"
             aria-valuemin="0" aria-valuemax="100" style="width: 100%; display: none;">
          Loading ...
        </div>
      </div>
  
      <!-- Policy Details Form -->
      <div style="max-width: 90%; margin: 0 10%;">
        <h1 style="margin-top: 2rem; margin-bottom: 10px; color: #262626; text-align: center;">Policy Details</h1>
        <form @submit.prevent="nextPage" action="./debit-order-details" method="POST">
          <!-- Form Content Goes Here -->
        </form>
      </div>
    </v-container>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import MainMemberDetailsModal from './form-modals/MainMemberDetailsModal.vue';
  import ChildDetailsModal from './form-modals/ChildModal.vue';
  import SpouseDetailsModal from './form-modals/SpouseModal.vue';
  
  export default {
    computed: {
      ...mapGetters(['getUserData', 'getSpouseData', 'getChildData', 'getSelectedPremium', 'getSelectedCover']),
      totalPremium() {
        const premiumValue = parseFloat(this.getSelectedPremium);
        const administrationValue = 10.00;
        const total = premiumValue + administrationValue;
        return total.toFixed(2);
      }
    },
    data() {
      return {
        currentStep: 4,
        steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
        isMainMemberDetailsModalOpen: false,
        isChildDetailsModalOpen: false,
        isSpouseDetailsModalOpen: false,
      };
    },
    methods: {
      nextPage() {
        this.$router.push('./debit-order-details');
      },
      goBack() {
        this.$router.go(-1);
      },
      openMainMemberDetailsModal() {
        this.isMainMemberDetailsModalOpen = true;
      },
      editMemberData(userData) {
        this.isMainMemberDetailsModalOpen = true;
      },
      openChildDetailsModal() {
        this.isChildDetailsModalOpen = true;
      },
      editChildData(child) {
        this.isChildDetailsModalOpen = true;
      },
      openSpouseDetailsModal() {
        this.isSpouseDetailsModalOpen = true;
      },
      editSpouseData(spouseData) {
        this.isSpouseDetailsModalOpen = true;
      },
      closeMainMemberDetailsModal() {
        this.isMainMemberDetailsModalOpen = false;
      },
      closeChildDetailsModal() {
        this.isChildDetailsModalOpen = false;
      },
      closeSpouseDetailsModal() {
        this.isSpouseDetailsModalOpen = false;
      },
    },
    components: {
      MainMemberDetailsModal,
      SpouseDetailsModal,
      ChildDetailsModal,
    },
    created() {
      this.userData = this.getUserData;
      this.spouseData = this.getSpouseData;
      this.childData = this.getChildData;
      this.selectedCover = this.getSelectedCover;
      this.selectedPremium = this.getSelectedPremium;
    },
  };
  </script>
  
  <style lang="scss">
  /* Your SCSS styles go here */
  </style>
  