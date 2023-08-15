
<template>
  <div>

    <div class="container">
      <div class="left-side">
        
       <p>Nothing is as unexpected and life changing as the loss of a loved one. Death is an unpleasant subject for all of us, yet we have to deal with the loss of a loved one at some time.
 
 A funeral plan affords you the opportunity to bury your loved one with dignity and respect while easing the financial burden on those who are left behind. We offer a funeral plan to anyone under the age of 85.
 
 The funds from a funeral plan are paid within 48 hours from the time that ALL the relevant documentation has been submitted for a valid claim.</p>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="goToDashboard"
          >
            Apply for funeral plan
          </v-btn>
      </div>
      <div class="right-side">
        <img src="" alt="Description of image">
      </div>
    </div>
  </div>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      Privacy Policy
    </span>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

const router = useRouter()
export default {
  methods: {
    goToDashboard() {
      this.$router.push({ name: 'register' });
    }
  }
}
</script>

<style scoped>

.body-text {
  font-family: 'Montserrat', sans-serif;
}
.header {
  width: 100%;
  background-color: #90162a;
  padding: 20px 0;
  color: #ffffff;
  text-align: center;
}

.title {
  margin: 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(100vh - 60px); /* Subtract the height of the header */
  color: #ffffff;
}

.left-side, .right-side {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #030303;
}

.right-side img {
  width: 100%; /* Change this value to make the image bigger or smaller */
  height: auto; /* Keep this to maintain aspect ratio */
}
</style>
