<template>
  <!-- <div id="progress-status-indicators" class="row" style=" display: block; padding-top: 20px; padding-left: 12%;margin: 0 auto;">

<div class="col-sm-12">
<div id="step-1" style="position: relative;z-index: 7;" class="btn-progresss btn-progresss-followers ">Step 1</div>
<div id="step-2" style="position: relative;z-index: 6;" class="btn-progresss btn-progresss-followers">Step 2</div>
<div id="step-3" style="position: relative;z-index: 5;" class="btn-progresss btn-progresss-followers">Step 3</div>
<div id="step-4" style="position: relative;z-index: 4;" class="btn-progresss btn-progresss-followers">Step 4</div>
<div id="step-5" style="position: relative;z-index: 3;" class="btn-progresss btn-progresss-followers">Step 5</div>
// <div id="step-6" style="z-index: 2;position: relative;" class="btn-progresss btn-progresss-followers">Step 6</div> 
<div id="done" style="position: relative;z-index: 1;" class="btn-progresss btn-progresss-followers">Done</div>
</div></div> -->
  <div style="max-width: fit-content; max-height: fit-content;">
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


    <!-- <center>
<div id="FormPolicySelection">
// <form method="post" action="/ApplyNew.php?New=342b625cbf4b3591d5253a48a754103b&amp;RefID=SB650054&amp;TimeSent=1694520425&amp;UsrAge=34&amp;MainUsrAge=34&amp;msg%20=%20SCS" id="FrmPolicyList" name="FrmPolicyList"> 
// <h2 style="color: #262626;text-align: center;"> Policy Selection</h2> 
           <div class="container-fluid" style="width: 90%;height: 375px; border: 2px solid black; overflow-y: scroll;">



                    <fieldset>


                        <div class="form-group">

                         <p class="text-danger"> </p><p class=".bg-danger">  </p><div class="row"><div class="col-sm-12" style=" overflow: inherit;width: 95%;height: 280px;"><table class="table table-condensed table-responsive">  <tbody><tr><td>
          <div class="radio">
            <label><input type="radio" value="24" id="policyList" name="policyList">Family
            </label>
            </div></td>

    <td>
<p style="text-align: justify;"></p><p>This policy consist of cover or you the main member , your spouse , upto 5 of your own children.&nbsp;<span style="color: #000;">You can add additional 5 extended family members at an additional cost for each family member.</span></p><p></p></td> </tr> <tr><td>
          <div class="radio">
            <label><input type="radio" value="25" id="policyList" name="policyList">Single
            </label>
            </div></td>

    <td>
<p style="text-align: justify;"></p><p>This policy is for a single member. You can add extended family members for an additional cost for each family member.</p><p></p></td> </tr> <tr><td>
          <div class="radio">
            <label><input type="radio" value="26" id="policyList" name="policyList">Member plus 5
            </label>
            </div></td>

    <td>
<p style="text-align: justify;"></p><p>This policy consists of cover for you the main member&nbsp;and&nbsp;upto 5 of your extended family members. You can add additional 4 extended family members at an additional cost for each family member.</p><p></p></td> </tr> <tr><td>
          <div class="radio">
            <label><input type="radio" value="27" id="policyList" name="policyList">Member plus 9
            </label>
            </div></td>

    <td>
<p style="text-align: justify;"></p><p>This policy consists of cover for you the main member&nbsp;and&nbsp;upto&nbsp;9 of your extended family members. You can add additional 4 extended family members at an additional cost for each family member.</p><p></p></td> </tr> <tr><td>
          <div class="radio">
            <label><input type="radio" value="28" id="policyList" name="policyList">Member Plus 13
            </label>
            </div></td>

    <td>
<p style="text-align: justify;"></p><p><span>This policy consists of cover for you the main member&nbsp;and&nbsp;upto 13 of your extended family members. You can add additional 4 extended family members at an additional cost for each family member.</span></p><p></p></td> </tr>  </tbody></table></div></div> <p class="text-danger"> </p><p class=".bg-danger"> 


                         </p></div>
                        </fieldset>


                    </div>  
               </form> 
                </div>
                <div class="row" style="margin-top: 1%;">

                          <div class="col-lg-8">

                          <span id="ErrSpan"></span>
                        <h4 style="color: #90162a;text-align: center;"> Select one of the above mentioned options</h4>
                        </div>
                        <div class="col-lg-4">

                         <input type="hidden" id="hdn_FrmPolicyList" name="hdn_FrmPolicyList" value="">
                          <input type="submit" id="btn_Form1Next" name="btn_Form1Next" class="btn btn-default" value="Continue" data-toggle="modal" data-target=".bs-example-modal-sm">
                           <input type="button" id="btnCancel" name="btnCancel" class="btn btn-default" value="Back" onclick="goBack();">
                           </div></div>

              <div class="row" name="FormPolicySelectionShowConfirmBOX" id="FormPolicySelectionShowConfirmBOX">  </div>

                          </center> -->

    <!-- <div>

  </div> -->

    <h1 style="margin-top: 2rem; margin-bottom: 10px; color: #262626; text-align: center;">Policy Selection</h1>
    <form @submit.prevent="nextPage" action="./cover-selection-family" method="POST">
      <div class="container-fluid" style="width: 90%;height: 375px; border: 2px solid black;">
        <fieldset>


          <div class="form-group">

            <p class="text-danger"> </p>
            <p class=".bg-danger"> </p>
            <div class="row">
              <div class="col-sm-12" style=" overflow: inherit;width: 95%;height: 280px;">
                <table class="table table-condensed table-responsive">
                  <tbody>
                    <tr>
                      <td>
                        <div class="radio">
                          <label><input type="radio" value="24" id="policyList" name="policyList">Family
                          </label>
                        </div>
                      </td>

                      <td>
                        <p style="text-align: justify;"></p>
                        <p>This policy consist of cover or you the main member , your spouse , upto 5 of your own
                          children.&nbsp;<span style="color: #000;">You can add additional 5 extended family members at an
                            additional cost for each family member.</span></p>
                        <p></p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="radio">
                          <label><input type="radio" value="25" id="policyList" name="policyList">Single
                          </label>
                        </div>
                      </td>

                      <td>
                        <p style="text-align: justify;"></p>
                        <p>This policy is for a single member. You can add extended family members for an additional cost
                          for each family member.</p>
                        <p></p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="radio">
                          <label><input type="radio" value="26" id="policyList" name="policyList">Member plus 5
                          </label>
                        </div>
                      </td>

                      <td>
                        <p style="text-align: justify;"></p>
                        <p>This policy consists of cover for you the main member&nbsp;and&nbsp;upto 5 of your extended
                          family members. You can add additional 4 extended family members at an additional cost for each
                          family member.</p>
                        <p></p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="radio">
                          <label><input type="radio" value="27" id="policyList" name="policyList">Member plus 9
                          </label>
                        </div>
                      </td>

                      <td>
                        <p style="text-align: justify;"></p>
                        <p>This policy consists of cover for you the main member&nbsp;and&nbsp;upto&nbsp;9 of your
                          extended family members. You can add additional 4 extended family members at an additional cost
                          for each family member.</p>
                        <p></p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="radio">
                          <label><input type="radio" value="28" id="policyList" name="policyList">Member Plus 13
                          </label>
                        </div>
                      </td>

                      <td>
                        <p style="text-align: justify;"></p>
                        <p><span>This policy consists of cover for you the main member&nbsp;and&nbsp;upto 13 of your
                            extended family members. You can add additional 4 extended family members at an additional
                            cost for each family member.</span></p>
                        <p></p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p class="text-danger"> </p>
            <p class=".bg-danger">


            </p>
          </div>
        </fieldset>
      </div>

    </form>
    <div style="margin: 3rem;">
      <p style="color: #90162a; font-size: 18px;text-align: center;">Select one of the above mentioned options
        <button @click="nextPage"
          style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;">Continue</button>
        <button @click="goBack"
          style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Back</button>
      </p>
    </div>
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
      this.$router.push('./cover-selection-family'); // Assuming you're using Vue Router
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
  background-color: transparent;

  /* Set the background to transparent */
  color: #28a745;

  /* Change the text color for completed steps */
}
</style>
