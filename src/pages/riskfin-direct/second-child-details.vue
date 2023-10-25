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

  <div style="max-width: 90%; margin: 0 10%;">
    <h1 style="margin-top: 2rem; margin-bottom: 10px; color: #262626; text-align: center;"> Child - 2 Details</h1>
    <form @submit.prevent="sendEmailAndGoToThankYou" action="./main-member-details" method="POST">
      <fieldset>

        <div class="form-group">
          <div class="row" style="padding-right: 10%;padding-left: 5%;">

            <div class="col-lg-6">

              <div class="row">
                <div class="col-lg-4">
                  <label for="First Names">First Names </label>
                </div>
                <div class="col-lg-8">
                  <input tabindex="1" type="text" id="FirstName" class="form-control" name="FirstName" value="">
                  <div class="star"
                    style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    id="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>

                <div class="col-lg-4">
                  <label for="Type of Identity Document">Type of Identity Document </label>
                </div>
                <div class="col-lg-8">
                  <select class="form-control" id="TOD" name="TOD">
                    <option value="-1">Type Of Doc</option>
                    <option selected="" value="0">RSA</option>
                    <option value="1">Passport</option>
                    <option value="2">Other</option>
                  </select>
                  <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    class="star" id="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>

                <div style="clear: both;" class="col-lg-4">
                  <label for="ID">Identity Number </label>
                </div>
                <div class="col-lg-8">
                  <input type="text" id="ID" class="form-control" name="ID" value="">
                  <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    class="star" id="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>


              </div>
              <div class="row">
                <div class="col-lg-6">

                </div>
                <div class="col-lg-2">
                  <label for="OR">OR</label>
                </div>
              </div>




              <div class="row">
                <div class="col-lg-4">
                  <label for="BirthDate">Date of Birth </label>
                </div>
                <div class="col-lg-8">
                  <input type="hidden" id="BirthDate" class="form-control" name="BirthDate" value="">
                  <input style="width: 70px;margin-right: 10px;" type="text" id="Year" class="form-control" name="Year"
                    value="YYYY"> <input style="width: 50px;margin-right: 10px;" type="text" id="Month"
                    class="form-control" name="Month" value="MM"> <input style="width: 50px;" type="text" id="Date"
                    class="form-control" name="Date" value="DD">
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>

                <div class="col-lg-4">
                  <label for="Age">Age </label>
                </div>
                <div class="col-lg-8">
                  <input type="text" id="Age" class="form-control" name="Age" value="">
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>

              </div>

            </div>


            <div class="col-lg-6">
              <div class="row">
                <div class="col-lg-4">
                  <label for="Surname">Surname</label>
                </div>
                <div class="col-lg-8">
                  <input tabindex="2" type="text" id="Surname" class="form-control" name="Surname" value="April">
                  <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    class="star" id="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>
              </div>

              <div class="row">

                <div class="col-lg-12">
                  <label for="notes">Notes</label>
                  <div rows="4" style="overflow: scroll;width: 120%;height: 200px;" id="notes" class="form-control"
                    name="notes"><span style="background-color: #ff0;"><strong>IMPORTANT</strong></span>: <strong>Child
                      Benefit Schedule:</strong><br>
                    <table style="width: 365px; height: 125px;" border="0">
                      <tbody>
                        <tr>
                          <td style="width: 140px;">Age 14 - 21</td>
                          <td>100% of the main policy cover</td>
                        </tr>
                        <tr>
                          <td>Age 6 - 13</td>
                          <td>50% of the main policy cover</td>
                        </tr>
                        <tr>
                          <td>Age 1 - 5</td>
                          <td>25% of the main policy cover</td>
                        </tr>
                        <tr>
                          <td>Age 0 - 11 months</td>
                          <td>25% of the main policy cover</td>
                        </tr>
                        <tr>
                          <td>Stillborn</td>
                          <td>25% of the main policy cover</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>
              </div>





              <div class="row" style="padding-right: 10%;padding-left: 5%;">

                <div class="col-lg-12">
                  <br>
                  <p id="ErrSurname" style="padding-top: 10px;color: red;"> * Indicates Mandatory fields</p>
                  <p id="ErrFirstName" class="text-danger"></p>
                  <p id="ErrSurname" class="text-danger"></p>
                  <p id="ErrEMail" class="text-danger"></p>
                  <p id="ErrID" class="text-danger"></p>
                  <p id="ErrBirthDate" class="text-danger"></p>
                  <p id="ErrAge" class="text-danger"></p>
                  <p id="ErrH_Adr1" class="text-danger"></p>
                  <p id="ErrH_Adr2" class="text-danger"></p>
                  <p id="ErrH_Adr3" class="text-danger"></p>
                  <p id="ErrP_Adr1" class="text-danger"></p>
                  <p id="ErrTel_H" class="text-danger"></p>
                  <p> </p>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger"> </p>

                </div>
                <div class="col-lg-6">
                </div>

                <div class="col-lg-12">




                  <br><br>
                  <input type="submit" style="background-color: #90162a;color: white;" id="btn_newRegInfoContinue"
                    name="btn_newRegInfoContinue" class="btn btn-default" value="Continue" data-toggle="modal"
                    data-target=".bs-example-modal-sm">

                  <input type="submit" style="background-color: #90162a;color: white;" id="btnSkipChild"
                    name="btnSkipChild" class="btn btn-default" value="Skip">
                  <input type="button" id="btnCancel" name="btnCancel" class="btn btn-default" value="Back"
                    onclick="goBack();">


                </div>

              </div>


            </div>
          </div>
          <input type="hidden" id="hdn_newRegInfo" name="hdn_newRegInfo" value="">
        </div>
      </fieldset>
    </form>
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

input {
  padding: 5px;
  border: 0.2px solid #ccc;
  border-radius: 4px;

  /* inline-size: 100%; */
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
  