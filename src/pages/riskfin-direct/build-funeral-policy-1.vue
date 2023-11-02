<template>
  <div class="funeral-plan-registration">

    <section class="content">
      <h2 style="margin-top: 1rem; color: #262626;text-align: center;">
        <b>Build your own Funeral Policy:</b>
      </h2>
      <br>
      <div style="margin: 0 6rem;">
        <p>Before we begin, please provide us with the age of the main member for which you are applying for a
          policy so that we can provide you with an apropriate set of policies for the main member's age group.</p>

        <p>Please enter the age for the main member here:</p>

        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="ageOfMainMember" style=" padding-right: 18px; margin-left: 25%;">Age of Main Member : </label>
            <input class="form-control" v-model="ageOfMainMember" type="tel" id="ageOfMainMember"
              style="border: 1px solid #ccc;" /><br><br>
            <span v-if="formSubmitted && !isValidAge(ageOfMainMember)"
              style="margin-left: 42%; color: #a5223a;font-size: small;">Enter a
              valid Age between
              18-84.</span>
          </div>
          <div style=" padding-bottom: 2rem; margin-top: 4rem;text-align: center;">
            <button @click="submitForm"
              style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;">Continue</button>
            <button @click="cancel"
              style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Cancel</button>

          </div>
        </form>
      </div>
    </section>
  </div>
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
form {
  display: block;
  margin-block-start: 0;
  padding-inline-start: 50px;
}

.form-input {
  padding: 10px;
  border: 0.2px solid #ccc;
  border-radius: 4px;

  /* inline-size: 100%; */
}

.form-group {
  margin: 20px;
}

.form-control {
  /* display: block; */
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  background-image: none;
  block-size: 34px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 7.5%);
  color: #555;
  font-size: 14px;
  inline-size: 40%;
  padding-block: 0;
  padding-inline: 10px;
}
</style>

