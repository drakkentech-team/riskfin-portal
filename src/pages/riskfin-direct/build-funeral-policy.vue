<template>
  <v-main>
    <v-container style="max-width:90%">
      <h2 class="text-center">
        <b>Build your own Funeral Policy:</b>
      </h2>
      <v-text>
        Before we begin, please provide us with the age of the main member for which you are applying for a
        policy so that we can provide you with an appropriate set of policies for the main member's age group.
      </v-text><br>
      <v-text>Please enter the age for the main member here:</v-text><br><br>

      <form @submit.prevent="submitForm">
        <div class="form-group" style="margin: 2rem 0 3rem 30%;">

          <v-row>
            <label for="ageOfMainMember" class="ml-5">Age of Main Member:</label>
            <v-col cols="12" md="6" style="margin-top:-2rem">
              <v-text-field v-model="ageOfMainMember" id="ageOfMainMember" class="mt-2" md="4"></v-text-field>
            </v-col>
          </v-row>
          <v-text v-if="formSubmitted && !isValidAge(ageOfMainMember)" class="ml-5 error--text"
            style="padding-left: 10rem;">Enter a valid
            Age between 18-84.</v-text>
        </div>
        <div class="text-center mt-8">
          <v-btn @click="submitForm" color="#98142c"
            style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; color: #fff; cursor: pointer;"
            class="mr-4">Continue</v-btn>
          <v-btn @click="cancel" color="#98142c"
            style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; color: #fff; cursor: pointer;">Cancel</v-btn>
        </div>
      </form>

    </v-container>
  </v-main>
</template>
  
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: 'FuneralPlanRegistration',
  setup() {
    const ageOfMainMember = ref('');
    const router = useRouter();
    const formSubmitted = ref(false);

    const isValidAge = (age) => {
      return !isNaN(age) && age >= 18 && age <= 84;
    };

    const submitForm = () => {
      formSubmitted.value = true;
      if (isValidAge(ageOfMainMember.value)) {
        router.push({
          name: 'policy-selection',
          query: {
            ageOfMainMember: ageOfMainMember.value,
          },
        });
      }
    };

    const cancel = () => {
      router.go(-1);
    };

    return {
      ageOfMainMember,
      submitForm,
      cancel,
      isValidAge,
      formSubmitted,
    };
  },
};
</script>
  
<style scoped>
h2 {
  margin: 1rem 0 2rem;
}

.form-group {
  margin: 20px;
}

.error--text {
  color: #a5223a;
  font-size: small;
}

.text-center {
  text-align: center;
}

.ml-5 {
  margin-left: 25%;
}

.mt-2 {

  margin-top: 4rem;
}

.mr-4 {
  margin-right: 10px;
}

.mt-8 {
  margin-top: 8rem;
}
</style>
  