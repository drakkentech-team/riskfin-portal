<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

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
  form.isLoading = true
  try {
    const response = await axios.post('https://5615-13-244-186-12.ngrok-free.app/web_login', {
      email: form.email,
      password: form.password,
    })

    if (response && response.status === 200) {
      await router.push({ name: 'dashboard' })
    } 
  } 
  catch (error) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = 'This user does not exist'
    }
    else if (error.response && error.response.status === 401) {
      errorMessage.value = 'Your password is incorrect'
    }
  } finally {
    form.isLoading = false
  }
}
</script>




<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
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

        <VCardTitle class="text-2xl font-weight-bold">
          Riskfin
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Welcome to Riskfin Portal!
        </h5>
        <p class="mb-0">
          Please sign-in to your account
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="$router.push('/')">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                autofocus
                placeholder="johndoe@email.com"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <RouterLink
                  class="text-primary ms-2 mb-1"
                  to="javascript:void(0)"
                >
                  Forgot Password?
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn
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
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
