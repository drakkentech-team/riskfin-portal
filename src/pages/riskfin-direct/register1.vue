<template>
  <v-main>
    <v-container>
      <v-form @submit.prevent="submitForm">
        <h2 class="text-center">Register For a Funeral Plan</h2>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="firstNames" label="First Names" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="surname" label="Surname" required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="email" label="Email" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="idNumber" label="Identity Number" required></v-text-field>
          </v-col>
        </v-row>

        <v-text-field v-model="contactPhoneNumber" label="Contact Phone Number" required></v-text-field>

        <v-row class="d-flex justify-center">
          <v-btn color="red" dark @click="submitForm">Continue</v-btn>
          <v-btn color="red" dark @click="cancel">Cancel</v-btn>
        </v-row>

        <div class="text-end mt-3">
          <v-dialog v-model="isModalOpen" max-width="500">
            <v-card>
              <v-card-title>What to do next?</v-card-title>
              <v-card-text>
                <p>Please confirm your contact details below and click the "Continue" button to proceed with the
                  application or click the "Cancel" button to quit.</p>
                <p>- Riskfin Direct</p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="red" dark @click="closeModal">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn color="primary" dark @click="openModal">Need Help?</v-btn>
        </div>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>
import { ref } from "vue";
import Modal from './help-modal.vue';

export default {
  name: 'FuneralPlanRegistration',
  setup() {
    const firstNames = ref('');
    const email = ref('');
    const contactPhoneNumber = ref('');
    const surname = ref('');
    const idNumber = ref('');
    const router = useRouter();


    const submitForm = () => {
      router.push({
        name: 'welcome',
        query: {
          firstNames: firstNames.value,
          email: email.value,
          contactPhoneNumber: contactPhoneNumber.value,
          surname: surname.value,
          idNumber: idNumber.value,

        },
      });
      console.log("query: " + query)
    };

    provide("formData", {
      firstNames,
      email,
      contactPhoneNumber,
      surname,
      idNumber,
      submitForm,
    });

    return {
      firstNames,
      email,
      contactPhoneNumber,
      surname,
      idNumber,
      submitForm,
    };
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
    cancel() {
      this.$router.go(-1);
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
