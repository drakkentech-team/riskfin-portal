<template>
  <!-- v-model="isOpen" -->
  <!-- <v-dialog v-model="isOpen" max-width="500"> -->
  <v-dialog :modelValue="isOpen" @update:modelValue="isOpen = $event" max-width="500">
    <v-card>
      <v-card-title class="text-h2 text-center">Main Member Details</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="saveData">
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="modalUserData.first_name" label="First Names" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="modalUserData.known_as" label="Known As" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select v-model="modalUserData.type_of_identity_document" label="Type of Identity Document"
                :items="['RSA', 'Passport', 'Other']" required></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="modalUserData.id" label="Identity Number" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="4">
                  <v-text-field v-model="modalUserData.year" label="Year" placeholder="YYYY"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="modalUserData.month" label="Month" placeholder="MM"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="modalUserData.date" label="Date" placeholder="DD"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="modalUserData.age" label="Age"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="modalUserData.mobile_number" label="Contact Phone Number" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="modalUserData.email" label="Email Address" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="modalUserData.surname" label="Surname" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="modalUserData.address_line_1" label="Address"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="modalUserData.address_line_2" label="Address Line 2"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="modalUserData.address_line_3" label="Address Line 3"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="modalUserData.city" label="City" required></v-text-field>
            </v-col>
          </v-row>
          <p class="text-red">* Indicates Mandatory fields</p>
          <v-row>
            <v-col cols="12" class="text-center">
              <v-btn color="red" dark @click="startEditing" v-if="!isEditing">
                Edit
              </v-btn>
              <v-btn color="red" dark @click="saveData" :disabled="!isEditing">
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getUserData']),
    ...mapActions(['updateUserData']),
  },
  data() {
    return {
      isEditing: false,
      modalUserData: {},
    };
  },
  props: {
    isOpen: Boolean,
  },
  methods: {
    async startEditing() {
      this.isEditing = true;
      // Fetch the user data and populate modalUserData here
    },
    async saveData() {
      // Save the modalUserData to the server
      // Update this.modalUserData after a successful save
      // Set this.isEditing = false
    },
  },
};
</script>
  

<style lang="scss">
input {
  inline-size: 5vw;
}

select {
  inline-size: 10vw;
}

.scrollable-content {
  max-block-size: 500px;

  /* Adjust the height as needed */
  overflow-y: auto;
}
</style>
