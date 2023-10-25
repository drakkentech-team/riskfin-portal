<template>
  <div class="progress-bar">
    <div class="step" v-for="(step, index) in steps" :key="index">
      {{ step }}
      <div class="step-indicator" :class="{ done: index < currentStep }"></div>
    </div>
  </div>

  <div class="progress" id="progress" style=" display: none;width: 100%; border: 2px solid rgb(204, 204, 204);">
    <div class="progress-bar progress-bar-striped active" role="progressbar" id="progressBar" aria-valuenow="100"
      aria-valuemin="0" aria-valuemax="100" style=" display: none;width: 100%;">
      Loading ...
    </div>

  </div>

  <h1 style="margin-top: 2rem; margin-bottom: 10px; color: #262626; text-align: center;">Cover Selection - Family</h1>
  <form @submit.prevent="sendEmailAndGoToThankYou" action="./main-member-details" method="POST">
    <div class="container-fluid" style="width: 90%;height: 375px; border: 2px solid black;">
      <fieldset>

        <div class="form-group">

          <p class="text-danger"> </p>
          <p class=".bg-danger"></p>
          <table class="table table-condensed table-responsive">
            <tbody>
              <tr style="color: #90162a;font-size: 20px;font-style: bold;">
                <td></td>
                <td> Cover </td>
                <td> Underwriter </td>
                <td> Premium </td>
                <td class="td-inner-data"> Max. Entry Age </td>
              </tr>
              <tr style="background-color: #90162a;color: white;font-style: bold;">
                <td><input type="radio" value="6" id="policyCover" name="policyCover"></td>
                <td class="td-inner-data"> R 5,000</td>
                <td class="td-inner-data"> Safrican</td>
                <td> R 73.00</td>
                <td>&nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  64</td>
              </tr>
              <tr style="background-color: #90162a;color: white;font-style: bold;">
                <td><input type="radio" value="16" id="policyCover" name="policyCover"></td>
                <td class="td-inner-data"> R 10,000</td>
                <td class="td-inner-data"> Safrican</td>
                <td> R 109.00</td>
                <td>&nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  64</td>
              </tr>
              <tr style="background-color: #90162a;color: white;font-style: bold;">
                <td><input type="radio" value="24" id="policyCover" name="policyCover"></td>
                <td class="td-inner-data"> R 15,000</td>
                <td class="td-inner-data"> Safrican</td>
                <td> R 120.00</td>
                <td>&nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  64</td>
              </tr>
              <tr style="background-color: #90162a;color: white;font-style: bold;">
                <td><input type="radio" value="28" id="policyCover" name="policyCover"></td>
                <td class="td-inner-data"> R 20,000</td>
                <td class="td-inner-data"> Safrican</td>
                <td> R 140.00</td>
                <td>&nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  64</td>
              </tr>
              <tr style="background-color: #90162a;color: white;font-style: bold;">
                <td><input type="radio" value="91" id="policyCover" name="policyCover"></td>
                <td class="td-inner-data"> R 25,000</td>
                <td class="td-inner-data"> Safrican</td>
                <td> R 165.00</td>
                <td>&nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  64</td>
              </tr>
              <tr style="background-color: #90162a;color: white;font-style: bold;">
                <td><input type="radio" value="29" id="policyCover" name="policyCover"></td>
                <td class="td-inner-data"> R 30,000</td>
                <td class="td-inner-data"> Safrican</td>
                <td> R 200.00</td>
                <td>&nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  64</td>
              </tr>
            </tbody>
          </table>
        </div>
      </fieldset>
    </div>


  </form>
  <div style="margin: 3rem;">
    <!-- <div style=" padding-bottom: 2rem; margin: 3rem;margin-left: 50%;"> -->
    <p style="color: #90162a; font-size: 18px;text-align: center;">Select one of the above mentioned options
      <button @click="nextPage"
        style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; margin-left: 10%; background-color: #98142c; color: #fff; cursor: pointer;">Continue</button>
      <button @click="goBack"
        style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">back</button>
    </p>

  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1, // Change this to control the current step
      steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
    };
  },
  methods: {
    nextPage() {
      // Perform form submission logic here (e.g., sending email)

      // Redirect to the next page (page two)
      this.$router.push('./main-member-details'); // Assuming you're using Vue Router
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.container-fluid {
  margin-inline: auto;
  padding-inline: 15px;
}

.container-fluid::after,
.container-fluid::before {
  display: table;
  content: " ";
}

.container-fluid::after {
  clear: both;
}

.fieldset {
  display: block;
  margin-inline-end: 2px;
  margin-inline-start: 2px;
  min-inline-size: min-content;
  padding-block-end: 0.625em;
  padding-block-start: 0.35em;
  padding-inline-end: 0.75em;
  padding-inline-start: 0.75em;
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

  // background-color: #007bff;
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
  background-color: #28a745;

  // background-color: transparent; /* Set the background to transparent */
  color: #28a745;
  /* Change the text color for completed steps */
}
</style>
