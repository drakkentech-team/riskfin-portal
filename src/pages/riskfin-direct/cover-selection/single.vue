<template>
  <div class="progress-bar">
    <div class="step" v-for="(step, index) in steps" :key="index">
      {{ step }}
      <div class="step-indicator" :class="{ done: index < currentStep }"></div>
    </div>
  </div>

  <div>
    <form @submit.prevent="nextPage" action="../main-member-details" method="POST">
      <h1 class="text-center mt-4 mb-4" style="color: #262626;">Cover Selection - Single</h1>

      <div class="container-fluid"
        style="width: 90%; max-height: 375px; border: 2px solid black; margin-left: 4rem; overflow-y: auto;">
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
              <td class="td-inner-data"><input type="radio" :value="policy.value" id="policyCover" name="policyCover">
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
        <button @click="nextPage" class="btn btn-primary mr-2"
          style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Continue</button>
        <button @click="goBack" class="btn btn-primary"
          style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    ...mapActions(['updateSelectedPremium', 'updateSelectedCover']),
  },
  data() {
    return {
      currentStep: 1,
      steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
      policies: [
        {
          value: "1",
          cover: "R 5,000",
          underwriter: "Safrican",
          premium: "R 66.50",
          maxAge: "64"
        },
        {
          value: "14",
          cover: "R 10,000",
          underwriter: "Safrican",
          premium: "R 85.00",
          maxAge: "64"
        },
        {
          value: "21",
          cover: "R 15,000",
          underwriter: "Safrican",
          premium: "R 99.00",
          maxAge: "64"
        },
        {
          value: "26",
          cover: "R 20,000",
          underwriter: "Safrican",
          premium: "R 115.00",
          maxAge: "64"
        },
        {
          value: "94",
          cover: "R 25,000",
          underwriter: "Safrican",
          premium: "R 131.00",
          maxAge: "64"
        },
        {
          value: "31",
          cover: "R 30,000",
          underwriter: "Safrican",
          premium: "R 148.00",
          maxAge: "64"
        }
      ]
    };
  },


  methods: {

    nextPage() {
      // const store = useStore();

      // store.dispatch('updateSelectedPremium', selectedPolicy.value.premium);
      // store.dispatch('updateSelectedCover', selectedPolicy.value.cover);
      this.$router.push('../main-member-details');
    },
    goBack() {
      this.$router.go(-1);
    },

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
  inline-size: 80%;
}

.table-header {
  /* background-color: #90162a;
  color: white; */
  font-weight: bold;
}

.td-inner-data {
  background-color: #90162a;
  color: white;
  font-weight: bold;
  text-align: center;
}
</style>
