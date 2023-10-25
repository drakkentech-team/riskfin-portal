<template>
  <v-main>
    <v-container>
      <section class="funeral-plan-registration">
        <h2 class="title">Build your own Funeral Policy:</h2>
        <p>
          Before we begin, please provide us with the age of the main member for which you are applying for a policy so
          that we can provide you with an appropriate set of policies for the main member's age group.
        </p>
        <p>Please enter the age for the main member here:</p>

        <form @submit.prevent="submitForm">
          <v-text-field v-model="ageOfMainMember" label="Age of Main Member" type="number" outlined dense
            :error="formSubmitted && !isValidAge(ageOfMainMember)"></v-text-field>
          <span v-if="formSubmitted && !isValidAge(ageOfMainMember)" class="error-message">
            Enter a valid Age between 18-84.
          </span>

          <div class="actions">
            <v-btn @click="submitForm" color="#98142c"
              style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;">Continue</v-btn>
            <v-btn @click="cancel" color="#98142c"
              style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Cancel</v-btn>
          </div>
        </form>
      </section>
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
.funeral-plan-registration {
  margin-block: 0;
  margin-inline: 6rem;
}

.title {
  color: #262626;
  margin-block-start: 1rem;
  text-align: center;
}

.error-message {
  color: #a5223a;
  font-size: small;
  margin-inline-start: 25%;
}

.actions {
  margin-block-start: 4rem;
  padding-block-end: 2rem;
  text-align: center;
}
</style>
