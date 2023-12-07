<template>
  <div class="progress-bar">
    <div class="step" v-for="(step, index) in steps" :key="index">
      {{ step }}
      <div class="step-indicator" :class="{ done: index < currentStep }"></div>
    </div>
  </div>

  <div>
    <form @submit.prevent="submitForm" action="../main-member-details" method="POST">
      <h1 class="text-center mt-4 mb-4" style="color: #262626;">Cover Selection - Family</h1>

      <div class="container-fluid"
        style="width: 80%; max-height: 375px; border: 2px solid black; margin-left: 8rem; overflow-y: auto;">
        <table class="table table-condensed table-responsive">
          <tbody>
            <tr class="table-header">
              <td></td>
              <td>Cover</td>
              <td>Underwriter</td>
              <td>Premium</td>
              <td>Max. Entry Age</td>
            </tr>
            <tr v-for="(policy, index) in policies" :key="index">
              <td class="td-inner-data">
                <input type="radio" :value="policy" id="policyCover" name="policyCover" v-model="selectedPolicy">
              </td>
              <td class="td-inner-data">{{ policy.cover }}</td>
              <td class="td-inner-data">{{ policy.underwriter }}</td>
              <td class="td-inner-data">{{ policy.premium }}</td>
              <td class="td-inner-data">{{ policy.maxAge }}</td>
            </tr>
          </tbody>
        </table>

      </div>

      <div class="text-center mt-4">
        <p style="color: #90162a; font-size: 18px;">Select one of the above mentioned options</p>
        <span v-if="validationError && !selectedPolicy" style=" color: #a5223a;font-size: small;">You must select an
          Option to continue!</span><br>
        <button @click="submitForm" class="btn btn-primary mr-2"
          style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Continue</button>
        <button @click="goBack" class="btn btn-primary"
          style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { mapActions, mapGetters, useStore } from 'vuex';

export default {
  computed: {
    ...mapActions(['updateSelectedPremium', 'updateSelectedCover']),
    ...mapGetters([' getSelectedPolicy']),
  },
  data() {
    return {
      currentStep: 1,
      steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
      selectedPolicy: null,
      policies: [
        // this.selectedPolicy.cover_details,
        // {
        //   // value: "6",
        //   cover: this.selectedPolicy.cover,
        //   underwriter: this.selectedPolicy.underwriter,
        //   premium: this.selectedPolicy.premium,
        //   maxAge: this.selectedPolicy.max_entry_age
        // },

      ]
    };
  },

  setup() {
    const store = useStore();
    const validationError = ref(false);
    const router = useRouter();
    const selectedPolicy = store.getters.getSelectedPolicy;
    // console.log('this plo', this.policies);
    console.log('this ', selectedPolicy);
    console.log('this ', selectedPolicy.cover_details);

    const submitForm = () => {
      console.log("in here");
      if (selectedPolicy) {
        console.log("in here2");
        store.dispatch('updateSelectedPremium', selectedPolicy.premium);
        store.dispatch('updateSelectedCover', selectedPolicy.cover);
        router.push('../main-member-details');
      } else {
        validationError.value = true;
        console.log("not happening");
      }
    };

    return {
      validationError,
      selectedPolicy,
      submitForm,
    };
  },

  methods: {
    // nextPage() {
    //   if (this.selectedPolicy) {
    //     // Save the selected premium and cover amount to your Vuex store
    //     this.$store.dispatch('updateSelectedPremium', this.selectedPolicy.premium);
    //     this.$store.dispatch('updateSelectedCover', this.selectedPolicy.cover);
    //     // Redirect to the next page (page two)
    //     this.$router.push('../main-member-details');
    //   } else {
    //     // Handle the case where no policy is selected
    //     alert('Please select a policy before continuing.');
    //   }
    // },

    goBack() {
      this.$router.go(-1);
    },
    created() {
      this.selectedPolicy = this.getSelectedPolicy;
    }
  }
};
</script>

<style scoped>
.progress-bar {
  display: flex;
  justify-content: space-between;
  border: 1px solid #007bff;
  border-radius: 20px;
  background-color: #f0f0f0;
  inline-size: 80%;
  margin-block: 1rem 0;
  margin-inline: auto;
  padding-block: 5px;
  padding-inline: 0;
}

.step {
  position: relative;
  flex: 1;
  padding-block: 5px;
  padding-inline: 0;
  text-align: center;
}

.step-indicator {
  position: absolute;
  border-radius: 50%;
  block-size: 20px;
  inline-size: 20px;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  transform: translate(-50%, -50%);
  transition: background-color 0.3s;
}

.step-indicator.done {
  background-color: #28a745;
  color: #28a745;
}

table {
  inline-size: 100%;
}

.table-header {
  /* background-color: #90162a;
  color: white; */
  font-weight: bold;
  text-align: center;
}

.td-inner-data {
  background-color: #90162a;
  color: white;
  font-weight: bold;
  text-align: center;
}
</style>
