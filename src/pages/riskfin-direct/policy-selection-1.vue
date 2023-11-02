<!-- <template>
  <div class="progress-bar">
    <div class="step" v-for="(step, index) in steps" :key="index">
      {{ step }}
      <div class="step-indicator" :class="{ done: index < currentStep }"></div>
    </div>
  </div>

  <div>

    <form @submit.prevent="submitForm">
      <h1 style="margin-top: 1rem; margin-bottom: 10px; color: #262626; text-align: center;">Policy Selection</h1>

      <div class="container-fluid" style="width: 90%; border: 2px solid black;max-heightt: 375px;">
        <label v-for="(policy, index) in policies" :key="index">
          <input type="radio" :value="policy.name" v-model="selectedPolicy">
          {{ policy.name }}<br>
          {{ policy.description }}
        </label><br>

        <input type="submit" value="Submit">
      </div>
    </form>
  </div>
</template> -->

<template>
  <div class="container">

    <section class="content">
      <div class="progress-bar">
        <div class="step" v-for="(step, index) in steps" :key="index">
          {{ step }}
          <div class="step-indicator" :class="{ done: index < currentStep }"></div>
        </div>
      </div>

      <div style="margin-bottom: 1rem;">
        <form @submit.prevent="submitForm">
          <h1 style="margin-top: 1rem; margin-bottom: 10px; color: #262626; text-align: center;">Policy Selection</h1>
          <!-- font-size: 10px; -->
          <div class="container-fluid" style="max-height: 375px; border: 2px solid black;  overflow-y: auto;">
            <table style="padding-top: 1rem;">
              <tbody>
                <tr v-for="(policy, index) in policies" :key="index">
                  <td>
                    <input type="radio" :value="policy.path" v-model="selectedPolicy">
                  </td>
                  <td>{{ policy.name }}</td>
                  <td>{{ policy.description }}</td>
                </tr>
              </tbody>
            </table>
            <span v-if="validationError && !selectedPolicy"
              style=" margin-left: 45%; color: #a5223a;font-size: small;">You must select a
              Policy to continue!</span>
            <div style="margin: 1rem;">

              <p style="color: #90162a; font-size: 18px;text-align: center;">Select one of the above mentioned options
                <button @click="submitForm"
                  style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;">Continue</button>
                <button @click="goBack"
                  style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Back</button>
              </p>
            </div>
            <!-- <input type="submit" value="Submit"> -->
          </div>
        </form>

      </div>
    </section>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      currentStep: 1, // Change this to control the current step
      steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
      // selectedPolicy: null,
      policies: [
        {
          name: "Family",
          description: "This policy consists of cover for you, the main member, your spouse, up to 5 of your own children. You can add additional 5 extended family members at an additional cost for each family member.",
          path: "Family"
        },
        {
          name: "Single",
          description: "This policy is for a single member. You can add extended family members for an additional cost for each family member.",
          path: "Single"
        },
        {
          name: "Member Plus 5",
          description: "This policy consists of cover for you, the main member, and up to 5 of your extended family members. You can add an additional 4 extended family members at an additional cost for each family member.",
          path: "Member-Plus-5"
        },
        {
          name: "Member Plus 9",
          description: "This policy consists of cover for you, the main member, and up to 9 of your extended family members. You can add an additional 4 extended family members at an additional cost for each family member.",
          path: "Member-Plus-9"
        },
        {
          name: "Member Plus 13",
          description: "This policy consists of cover for you, the main member, and up to 13 of your extended family members. You can add an additional 4 extended family members at an additional cost for each family member.",
          path: "Member-Plus-13"
        }
      ]
    };
  },

  setup() {
    const validationError = ref(false);
    const selectedPolicy = ref(null);
    const router = useRouter();

    const submitForm = () => {
      if (selectedPolicy.value) {
        router.push(`./cover-selection/${selectedPolicy.value}`);
      } else {
        validationError.value = true;
      }
    };

    return {
      validationError,
      selectedPolicy,
      submitForm,
    };
  },

  methods: {

    // submitForm() {
    //   const formSubmitted = ref(false);

    //   if (this.selectedPolicy) {
    //     this.$router.push(`./cover-selection/${this.selectedPolicy}`);
    //     // alert(`You selected: ${this.selectedPolicy}`);
    //   } else {
    //     formSubmitted.value = true;
    //   }
    // },
    goBack() {
      router.go(-1);
    }
  }
};
</script>

<style scoped>
form {
  display: block;
  margin-block-start: 0;
  padding-inline-start: 50px;
}

.container {
  margin-block: 0;
  margin-inline: 5rem;
}

.progress-bar {
  display: flex;
  overflow: hidden;

  /* Hide overflowing rounded corners */
  align-items: center;
  justify-content: space-between;
  border: 1px solid #007bff;
  border-radius: 20px;

  /* Rounded border */
  background-color: #f0f0f0;

  /* Background color of the progress bar */
  inline-size: 80%;
  margin-block: 0;
  margin-block-start: 1rem;
  margin-inline: auto;
  padding-block: 10px;
  padding-inline: 0;
}

.step {
  position: relative;
  flex: 1;
  padding-block: 10px;
  padding-inline: 0;
  text-align: center;
}

.step:not(:last-child)::after {
  position: absolute;
  background-color: #007bff;

  /* Color of the separator line */
  content: "";
  inline-size: 2px;

  /* Adjust the width of the separator as needed */
  inset-block-start: 50%;
  inset-inline-end: -1px;

  /* Adjust the position of the separator */
  transform: translateY(-50%);
}

.step-indicator {
  position: absolute;
  border-radius: 50%;
  block-size: 20px;
  inline-size: 20px;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  margin-block: 0;
  margin-inline: auto;
  transform: translate(-50%, -50%);
  transition: background-color 0.3s;
}

.step-indicator.done {
  background-color: transparent;

  /* Set the background to transparent */
  color: #28a745;

  /* Change the text color for completed steps */
}

.table-container {
  max-block-size: 375px;
  overflow-y: auto;
}
</style>
