<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useTheme } from 'vuetify';

const { global } = useTheme()
const showAlert = ref(false)
const dialog = ref(false)

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
})

const handleSaveNotification = async () => {
  try {
    const response = await axios.post(`${process.env.RISKFIN_PORTAL_API}/message`, {
      title: form.title,
      message: form.message,
      user_id: form.user_id,
    })
    
    
    if (response && response.status === 200) {
      showAlert.value = true
      setTimeout(() => {
        showAlert.value = false;
      }, 5000);
    } 
  } 
  catch (error) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = 'This user does not exist'
    }
    else if (error.response && error.response.status === 401) {
      errorMessage.value = 'Your password is incorrect'
    }
  } 
}
</script>


<template>
  <v-row>
    <h1> Register for a funeral plan</h1>
  </v-row>
  <v-row>
    <v-col>
      <v-text-field
        label="First Name:"
        v-model="form.firstName"
      />
    </v-col>
    <v-col>
      <v-text-field
        label="Last Name:"
        v-model="form.lastName"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-text-field
      label="Email:"
      v-model="form.email"
    />
  </v-row>
  <v-row>
    <v-text-field
      label="Contact Number:"
      v-model="form.contactNumber"
    />
  </v-row>
</template>
