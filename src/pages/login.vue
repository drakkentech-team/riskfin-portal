<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  remember: false,
  isLoading: false,
})

const isPasswordVisible = ref(false)
const errorMessage = ref('') 

const handleLogin = async () => {
  const userStore = useUserStore()
  errorMessage.value = '';
  form.isLoading = true
  try {
    const response = await axios.post('http://127.0.0.1:9000/web_login', {
      email: form.email,
      password: form.password,
    })

    console.log('Response status:', response.status); // Add this line

    if (response && response.status === 200) {
      userStore.setUserData(response.data)
      console.log(userStore.userData)
      await router.push({ path: '/notifications' })
    } 
  } 
  catch (error) {
    if (error.response && error.response.status === 404 || error.response.status === 401) {
      errorMessage.value = 'Oops. Something went wrong. Please try again'
      return
    }
    else if (error.request && error.request.status === 0) {
      errorMessage.value = 'Could not connect to server. Please contact your server administrator.'
    }
  } finally {
    form.isLoading = false
  }
}
const submitForm = () => {
  console.log('Form:', form)
};
</script>




<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4 centered-wrapper">
    <v-card class="auth-card pa-4 pt-1" max-width="448">
      <v-card-item class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div class="d-flex text-primary">
              <img
                src="/riskfin-logo.png"
                alt="description"
                style="height: 100px;"
              >
            </div>
          </div>
        </template>
      </v-card-item>
      <v-card-text class="mt-n4">
        <h5 class="text-h5 mb-1 text-center">
          Welcome to Riskfin App Admin Portal!
        </h5>
        <p class="mb-0 pt-6">
          Please sign-in to your account
        </p>
      </v-card-text>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-row>
            <!-- email -->
            <v-col cols="12">
              <v-text-field
                v-model="form.email"
                autofocus
                placeholder="johndoe@email.com"
                label="Email"
                type="email"
                @focus="errorMessage = ''"
              />
            </v-col>
            <!-- password -->
            <v-col cols="12">
              <v-text-field
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                @focus="errorMessage = ''"
              />
              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <!--<v-checkbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <RouterLink
                  class="text-primary ms-2 mb-1"
                  to="javascript:void(0)"
                >
                  Forgot Password?
                </RouterLink>-->
              </div>

              <!-- login button -->
              <v-btn
                block
                type="submit"
                @click="handleLogin"
              >
                <VProgressCircular
                  v-if="form.isLoading"
                  indeterminate
                  color="white"
                  size="24"
                  width="2"
                />
                <span v-else>Log in</span>
              </v-btn>
              <div class="error-message">
                <v-card-text v-if="errorMessage">
                  <p class="text-error">{{ errorMessage }}</p>
                </v-card-text>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss">
.error-message {
  text-align: center;
}

.centered-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-block-size: 100vh; /* Ensure the container covers the whole viewport */
}
</style>
