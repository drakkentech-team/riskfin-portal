<script setup>
   import { ref } from 'vue';
   import { login } from '../api/login';
   import { useRouter } from 'vue-router';
   import { useStore } from '../stores/store';

   const router = useRouter()

   const email = ref("");
   const password = ref("");
   const isLoading  = ref(false);
   const message = ref("");

   const ERROR_MESSAGES = {
      401: 'Incorrect password. Please try again',
      404: 'Could not find your account',
      0: 'Could not connect to server. Please contact your server administrator.'
   };

   const handleLogin = async () => {
      isLoading .value = true;
      const user = useStore()
      try {
         const response = await login({
            email: email.value, 
            password: password.value
         });

         if (response && response.status === 200) {
            user.setUser(response.data)
            await router.push({ path: '/notifications' });
         }
      } catch (error) {
         const { status } = error.request || {};

         message.value = ERROR_MESSAGES[status] || 'An unexpected error occurred';
      } finally {
         isLoading .value = false;
      }
   };
</script>

<template>
   <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
      <div class="flex flex-column align-items-center justify-content-center">
         <div 
            style="border-radius: 56px; 
            padding: 0.3rem; 
            background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"
         >
            <div 
               class="w-full surface-card py-8 px-5 sm:px-8" 
               style="border-radius: 53px"
            >
               <div class="text-center mb-5">
                  <div class="text-900 text-3xl font-medium mb-3">
                     Welcome
                  </div>
                  <span class="text-600 font-medium">
                     Sign in to continue
                  </span>
               </div>
               <!-- Wrap input fields and button inside a form -->
               <form @submit.prevent="handleLogin">
                  <div>
                     <label 
                        for="email" 
                        class="block text-900 text-xl font-medium mb-2"
                     >
                        Email
                     </label>
                     <InputText 
                        id="email" 
                        type="text" 
                        placeholder="Email address" 
                        class="w-full md:w-30rem mb-5" 
                        style="padding: 1rem" 
                        v-model="email" 
                     />
                     <label 
                        for="password" 
                        class="block text-900 font-medium text-xl mb-2"
                     >
                        Password
                     </label>
                     <div>
                        <Password
                           v-model="password"
                           placeholder="Password"
                           toggleMask
                           class="w-full mb-3"
                           inputClass="w-full"
                           :inputStyle="{ padding: '1rem' }"
                           :feedback="false"
                        />
                     </div>
                     <Button 
                        label="Sign In" 
                        class="w-full p-3 text-xl mt-5" 
                        type="submit"
                     >
                        <ProgressSpinner
                           v-if="isLoading"
                           class=".p-progress-spinner-circle"
                           style="width: 2; 
                           height: 23px;" 
                           strokeWidth="5" 
                        />
                     </Button>
                  </div>
               </form>
               <div class="text-center mt-5">
                  <Message 
                     v-if="message"
                     severity="error"
                     :sticky=false
                     :closable="false"
                     :life="4000"
                  >
                     {{ message }}
                  </Message>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

