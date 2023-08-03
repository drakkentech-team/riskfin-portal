<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useTheme } from 'vuetify';

const { global } = useTheme()
const showAlert = ref(false)
const dialog = ref(false)

const form = reactive({
  title: '',
  message: '',
  user_id: [{"user_id": 1}],
})

const handleSaveNotification = async () => {
  try {
    const response = await axios.post('https://ed13-13-246-23-177.ngrok-free.app/message', {
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
  <VCard class="text-center text-sm-start">
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="8"
        order="2"
        order-sm="1"
      >
        <VCardItem class="d-flex align-center">
          <VCardTitle class="text-md-h5 text-primary flex-grow-1">
            Notifications 
          </VCardTitle>
          <v-btn color="primary" @click="dialog=true">
            Add <VIcon icon="bx-message-add" />
          </v-btn>
        </VCardItem>
      </VCol>
    </VRow>
    

    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="1024"
    >


      <v-card>
        <v-card-title>
          <span class="text-h5">New Notification</span>
        </v-card-title>
        <v-card-text>
          
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Title* "
                  required
                  v-model="form.title"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12"
                sm="6"
                md="4">
                <v-text-field
                  v-model="form.message"
                  label="Message*"
                  required
                ></v-text-field>
              </v-col>
            
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['shane.vanniekerk@drakkentech.co.za  ']"
                  label="Users*"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-alert
                type="success"
                title="Success"
                text="Your notification has been successfully sent!"
                v-model="showAlert"
              ></v-alert>  
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="handleSaveNotification"
          >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </VCard>
</template>

<style lang="scss" scoped>
</style>
