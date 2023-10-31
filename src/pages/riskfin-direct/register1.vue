<!-- <template>
  <v-main>
    <v-container>
      <v-form @submit.prevent="submitForm">
        <h2 class="text-center">Register For a Funeral Plan</h2>

        <v-row style="padding-top: 3rem;">
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

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="contactPhoneNumber" label="Contact Phone Number" required
              style="padding-bottom: 5rem;"></v-text-field>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-center" style="">
          <v-btn color="#98142c"
            style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; color: #fff; cursor: pointer;"
            @click="submitForm">Continue</v-btn>
          <v-btn color="#98142c"
            style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; color: #fff; cursor: pointer;"
            @click="cancel">Cancel</v-btn>
        </v-row> -->

        <!-- <v-btn color="primary" dark @click="openModal">Need Help?</v-btn> -->

        <!-- <v-row>
          <v-col cols="12" class="text-right">
            <a href="#" @click="openModal" style=" color: #4c5e70; font-size: 13px; text-decoration: none;">Need
              Help ?</a>
          </v-col>
        </v-row> -->

        <!-- Use the reusable modal component -->
        <!-- <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal"> -->
          <!-- Content of the modal goes here -->
          <!-- <div class="text-left mb-6 mx-3">
            <v-text>
              Please confirm your contact details below and click the "Continue" button to proceed with the
              application or click the "Cancel" button to quit.
            </v-text>
          </div>
          <div>
            <v-text class="text-left mx-3">
              - Riskfin Direct
            </v-text>
          </div>
        </modal>
      </v-form>
    </v-container>
  </v-main>
</template> -->


<template>
  <v-main>
    <v-container>
      <v-form @submit.prevent="submitForm">
        <h2 class="text-center">Register For a Funeral Plan</h2>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.firstNames" label="First Names" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.surname" label="Surname" required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.email" label="Email" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.idNumber" label="Identity Number" required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.contactPhoneNumber" label="Contact Phone Number" required></v-text-field>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-center">
          <v-btn color="#98142c" @click="submitForm">Continue</v-btn>
          <v-btn color="#98142c" @click="cancel">Cancel</v-btn>
        </v-row>

        <v-row>
          <v-col cols="12" class="text-right">
            <a href="#" @click="openModal" style="color: #4c5e70; font-size: 13px; text-decoration: none;">Need Help ?</a>
          </v-col>
        </v-row>

        <!-- Use the reusable modal component -->
        <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal">
          <!-- Content of the modal goes here -->
          <div class="text-left mb-6 mx-3">
            <v-text>
              Please confirm your contact details below and click the "Continue" button to proceed with the application or
              click the "Cancel" button to quit.
            </v-text>
          </div>
          <div>
            <v-text class="text-left mx-3">
              - Riskfin Direct
            </v-text>
          </div>
        </modal>
      </v-form>
    </v-container>
  </v-main>
</template>


<script>
import { provide, ref } from "vue";
import { useStore } from "vuex";
import Modal from './help-modal.vue';

export default {
  components: {
    Modal,
  },
  name: 'FuneralPlanRegistration',
  setup() {
    const store = useStore();

    const formData = {
      firstNames: ref(''),
      email: ref(''),
      contactPhoneNumber: ref(''),
      surname: ref(''),
      idNumber: ref(''),
    };

    const submitForm = () => {
      const userData = {
        firstNames: formData.firstNames.value,
        email: formData.email.value,
        contactPhoneNumber: formData.contactPhoneNumber.value,
        surname: formData.surname.value,
        idNumber: formData.idNumber.value,
      };

      // Commit a mutation to save the data to the store
      store.commit('user/setUserData', userData);

      // Navigate to the next page
      router.push({
        name: 'welcome',
      });
    };

    provide("formData", formData);

    return {
      formData,
      submitForm,
    };
  },
  setup() {
    const isModalOpen = ref(false);

    // Method to open the modal
    const openModal = () => {
      isModalOpen.value = true;
    };

    // Method to close the modal
    const closeModal = () => {
      isModalOpen.value = false;
    };

    return {
      isModalOpen,
      openModal,
      closeModal,
    };
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>


<!-- <script>
import { ref } from "vue";
import Modal from './help-modal.vue';

export default {
  components: {
    Modal,
  },
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
  setup() {
    const isModalOpen = ref(false);

    // Method to open the modal
    const openModal = () => {
      isModalOpen.value = true;
    };

    // Method to close the modal
    const closeModal = () => {
      isModalOpen.value = false;
    };

    return {
      isModalOpen,
      openModal,
      closeModal,
    };
  },
  // data() {
  //   return {
  //     isModalOpen: false,
  //   };
  // },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    // openModal() {
    //   this.isModalOpen = true;
    // },
    // closeModal() {
    //   this.isModalOpen = false;
    // },
  },
};
</script> -->
