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

  <!-- <div style="max-width: 90%; margin: 0 10%;"> -->
  <h1 style="margin-top: 3rem; margin-bottom: 10px; color: #90162a; text-align: center;"> Debit Order Details</h1>
  <form @submit.prevent="nextPage" action="./complete" method="POST">
    <fieldset>

      <div class="form-group">
        <div class="row" style="padding-right: 10%;padding-left: 5%;">

          <div class="col-lg-6">

            <div class="row align-items-center">
              <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                <div class="col-lg-4" style="padding-right: 3rem;">
                  <label for="Account Holder Initials">Account Holder <br> Initials</label>
                </div>
                <input tabindex="1" type="text" id="AccountHolderInitials" class="form-control"
                  name="AccountHolderInitials" v-model="storedData.AccountHolderInitials">
                <div style="margin-left: 10px; color: red; font-size: 20px;" class="star" id="star" name="star"><b>*</b>
                </div>
              </div>

              <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                <div class="col-lg-4" style="padding-right: 5rem;">
                  <label for="BankName">BankName </label>
                </div>
                <!-- <select class="form-control" id="BankName" name="BankName">
                  <option value="-1">Select One</option>
                  <option selected="" value="0">ABSA Bank</option>
                  <option value="1">Bank of Anthens</option>
                  <option value="2">Bidvest Bank</option>
                  <option value="3">Capitec Bank</option>
                  <option value="4">First National Bank (South Africa)</option>
                  <option value="5">Investec Private Bank</option>
                  <option value="6">Nedbank (South Africa)</option>
                  <option value="7">SA Post Bank (Post Office) - All Branches</option>
                  <option value="8">Standard Bank (South Africa) - All Branches</option>
                  <option value="8">Other</option>
                </select> -->
                <select class="form-control" id="BankName" name="BankName" v-model="storedData.BankName">
                  <option value="">Select One</option>
                  <option value="ABSA Bank">ABSA Bank</option>
                  <option value="Bank of Anthens">Bank of Anthens</option>
                  <option value="Bidvest Bank">Bidvest Bank</option>
                  <option value="Capitec Bank">Capitec Bank</option>
                  <option value="First National Bank (South Africa)">First National Bank (South Africa)</option>
                  <option value="Investec Private Bank">Investec Private Bank</option>
                  <option value="Nedbank (South Africa)">Nedbank (South Africa)</option>
                  <option value="SA Post Bank (Post Office) - All Branches">SA Post Bank (Post Office) - All Branches
                  </option>
                  <option value="Standard Bank (South Africa) - All Branches">Standard Bank (South Africa) - All Branches
                  </option>
                  <option value="Other">Other</option>
                </select>
                <div style=" padding-left: 5px; margin-left: -90px; color: red;float: inline-start; font-size: 20px;"
                  id="star" class="star" name="star"><b>*</b></div>
                <div style="clear: both;"></div>
                <p class="text-danger"> </p>
                <p class=".bg-danger">
                </p>
              </div>

              <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                <div class="col-lg-4" style="padding-right: 4rem;">
                  <label for="BranchName">BranchName </label>
                </div>
                <!-- <select class="form-control" id="BranchName" name="BranchName">
                  <option value="-1">Select One</option>
                  <option selected="" value="0">ABSA Bank - All Branches</option>
                  <option value="1">Bank of Anthens - All Branches</option>
                  <option value="2">Bidvest Bank - All Branches</option>
                  <option value="3">Capitec Bank - All Branches</option>
                  <option value="4">First National Bank (South Africa) - All Branches</option>
                  <option value="5">Investec Private Bank - All Branches</option>
                  <option value="6">Nedbank (South Africa) - All Branches</option>
                  <option value="7">SA Post Bank (Post Office) - All Branches</option>
                  <option value="8">Standard Bank (South Africa) - All Branches</option>
                  <option value="8">Other</option>
                </select> -->
                <select class="form-control" id="BranchName" name="BranchName" v-model="storedData.BranchName">
                  <option value="">Select One</option>
                  <option value="ABSA Bank - All Branches">ABSA Bank - All Branches</option>
                  <option value="Bank of Anthens - All Branches">Bank of Anthens - All Branches</option>
                  <option value="Bidvest Bank - All Branches">Bidvest Bank - All Branches</option>
                  <option value="Capitec Bank - All Branches">Capitec Bank - All Branches</option>
                  <option value="First National Bank (South Africa) - All Branches">First National Bank (South Africa) -
                    All Branches</option>
                  <option value="Investec Private Bank - All Branches">Investec Private Bank - All Branches</option>
                  <option value="Nedbank (South Africa) - All Branches">Nedbank (South Africa) - All Branches</option>
                  <option value="SA Post Bank (Post Office) - All Branches">SA Post Bank (Post Office) - All Branches
                  </option>
                  <option value="Standard Bank (South Africa) - All Branches">Standard Bank (South Africa) - All Branches
                  </option>
                  <option value="Other">Other</option>
                </select>
                <div style=" padding-left: 0; margin-left: -110px; color: red;float: inline-start; font-size: 20px;"
                  id="star" class="star" name="star"><b>*</b></div>
                <div style="clear: both;"></div>
                <p class="text-danger"> </p>
                <p class=".bg-danger">
                </p>
              </div>

              <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                <div style=" padding-right: 4rem;clear: both;" class="col-lg-4">
                  <label for="BranchCode">BranchCode </label>
                </div>
                <input type="text" id="BranchCode" class="form-control" name="BranchCode" v-model="storedData.BranchCode">
                <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                  class="star" id="star" name="star"><b>*</b></div>
                <div style="clear: both;"></div>
                <p class="text-danger"> </p>
                <p class=".bg-danger">
                </p>
              </div>
            </div>

            <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
              <div style=" padding-right: 4.6rem;clear: both;" class="col-lg-4">
                <label for="AccountNo">AccountNo </label>
              </div>
              <input type="text" id="AccountNo" class="form-control" name="AccountNo" v-model="storedData.AccountNo">
              <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                class="star" id="star" name="star"><b>*</b></div>
              <div style="clear: both;"></div>
              <p class="text-danger"> </p>
              <p class=".bg-danger">
              </p>
            </div>
          </div>

          <!-- <div class="row"> -->
          <!-- <div class="col-lg-6">

                </div>
                <div class="col-lg-2" style="padding-left: 10rem; margin-top: 0.5rem;">
                  <label for="OR">OR</label>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style=" padding-right: 4.5rem;">
                    <label for="BirthDate">Date of Birth </label>
                  </div>
                  -- <div class="col-lg-8"> --
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

                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.7rem;">
                  <div class="col-lg-4" style=" padding-right: 8rem;">
                    <label for="Age">Age </label>
                  </div>
                  // <div class="col-lg-8"> 
                  <input type="text" id="Age" class="form-control" name="Age" value="">
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>
              </div> -->


          <!-- </div> -->
          <div class="col-lg-6" style="margin-top: -13.5rem;">
            <div class="row float-right">
              <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                <div class="col-lg-4" style=" padding-right: 7rem;">
                  <label for="surname">Account Holder Surname</label>
                </div>
                <input tabindex="2" type="text" id="surname" class="form-control" name="surname"
                  v-model="storedData.surname">
                <!-- v-model="getUserData.surname"> -->
                <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                  class="star" id="star" name="star"><b>*</b></div>
                <div style="clear: both;"></div>
                <p class="text-danger"> </p>
                <p class=".bg-danger">
                </p>
              </div>
              <!-- </div> -->

              <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                <div class="col-lg-4" style="padding-right: 12rem;">
                  <label for="Type of Identity Document">Type Of Account </label>
                </div>
                <select class="form-control" id="TOD" name="TOD">
                  <option value="-1">Type Of Account</option>
                  <option selected="" value="0">Savings</option>
                  <option value="1">Cheque/Current</option>
                  <option value="2">Transmission</option>
                </select>
                <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                  id="star" class="star" name="star"><b>*</b></div>
                <div style="clear: both;"></div>
                <p class="text-danger"> </p>
                <p class=".bg-danger">
                </p>
              </div>

              <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                <div class="col-lg-4" style="padding-right: 13rem;">
                  <label for="Type of Identity Document">Deduction day </label>
                </div>
                <select class="form-control" id="TOD" name="TOD">
                  <option value="-1">1</option>
                  <option selected="" value="0">2</option>
                  <option value="1">3</option>
                  <option value="2">4</option>
                  <option value="3">5</option>
                  <option value="4">6</option>
                  <option value="5">7</option>
                  <option value="6">8</option>
                  <option value="7">9</option>
                  <option value="8">10</option>
                  <option value="9">11</option>
                  <option value="10">12</option>
                  <option value="11">13</option>
                  <option value="12">14</option>
                  <option value="13">15</option>
                  <option value="14">16</option>
                  <option value="15">17</option>
                  <option value="16">18</option>
                  <option value="17">19</option>
                  <option value="18">20</option>
                  <option value="19">21</option>
                  <option value="20">22</option>
                  <option value="21">23</option>
                  <option value="22">24</option>
                  <option value="23">25</option>
                  <option value="24">26</option>
                  <option value="25">27</option>
                  <option value="26">28</option>
                  <option value="27">29</option>
                  <option value="28">20</option>
                  <option value="29">21</option>
                  <option value="30">22</option>
                  <option value="31">23</option>
                  <option value="32">24</option>
                  <option value="33">25</option>
                  <option value="34">26</option>
                  <option value="35">27</option>
                  <option value="36">28</option>
                  <option value="37">29</option>
                  <option value="38">30</option>
                  <option value="39">31</option>
                </select>
                <div style=" padding-left: 10px; margin-left: 25px; color: red;float: inline-start; font-size: 20px;"
                  id="star" class="star" name="star"><b>*</b></div>
                <div style="clear: both;"></div>
                <p class="text-danger"> </p>
                <p class=".bg-danger">
                </p>
              </div>

              <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                <div class="col-lg-4" style="padding-right: 10rem;">
                  <label for="Type of Identity Document">Deduction Frequency </label>
                </div>
                <select class="form-control" id="TOD" name="TOD">
                  <option value="-1">Select One</option>
                  <option selected="" value="0">Monthly</option>
                </select>
                <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                  id="star" class="star" name="star"><b>*</b></div>
                <div style="clear: both;"></div>
                <p class="text-danger"> </p>
                <p class=".bg-danger">
                </p>
              </div>

              <!-- <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style="padding-right: 5rem;">
                    <label for="Type of Identity Document">Signature </label>
                  </div> -->
              <!-- <select class="form-control" id="TOD" name="TOD">
                    <option value="-1">Select One</option>
                    <option selected="" value="0">Monthly</option>
                  </select> -->
              <!-- <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    id="star" class="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div> -->

              <!-- <div class="col-lg-4" style="text-align: start;">
                <label for="Signature">Signature</label>
                <div class="radio" style="margin-left: -9rem;">
                  <label><input type="radio" class="opts_signature" value="create_auto" id="opts_signature1" checked=""
                      name="opts_signature">Create Signature</label>
                </div>
                <div class="radio" style="margin-left: -9rem;">
                  <label><input type="radio" data-toggle="modal" data-target="#signatureModal" value="create_new"
                      class="opts_signature" id="opts_signature2" name="opts_signature">Sign on screen</label>
                </div>
                <div class="radio" style="width: 20px;">
                  <input type="button" value="Clear Signature" class="opts_signature" id="clear_signature">
                </div>

              </div> -->

            </div>
          </div>

          <!-- <div class="row">



                <div class="col-lg-12" style="margin-top: 0.5rem;">
                  <label for="notes">Notes</label>
                  <div rows="4" style="width: 120%;height: 200px; border: 1px solid #ccc;" id="notes" class="form-control"
                    name="notes"><span style="background-color: #ff0;"><strong>IMPORTANT</strong></span>: <strong>Child
                      Benefit Schedule:</strong><br>
                    <table style="width: 365px; height: 125px;">
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
              </div> -->





          <div class="row" style="padding-right: 10%;padding-left: 5%;">

            <!-- <div class="col-lg-12">
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

                </div> -->
            <div class="col-lg-6">
            </div>

            <!-- <div class="col-lg-9" style="margin-top: 15rem; margin-left: -5rem;">
              <div class="checkbox">
                <label><input type="checkbox" name="singON" checked="" value="singON">
                  <p> I, <strong><span style="color: black;" id="AccHInitials">N</span> <span style="color: black;"
                        id="AccHName">April</span></strong> give consent that the amount of <strong>R 83
                    </strong> may be deducted from my bank account as indicated above on the following day of each month
                    <strong>
                      <span style="color: black;" id="DedDay">{{ storedData.day }}</span></strong>.

                  </p>
                </label>
              </div>
              <div class="col-lg-8" style="margin-left: -9.6rem;">
                <div class="radio">
                  <label><input type="radio" class="opts_callMe" checked="" value="0" id="opts_dontcallMe"
                      name="opts_callMe">Please do not call me. I understand and accept the policy details</label>
                </div>

                <div class="radio">
                  <label><input type="radio" class="opts_callMe" value="1" id="opts_callMe" name="opts_callMe">Please call
                    me. I want to discuss the policy details</label>
                </div>
              </div>
            </div> -->

            <div class="col-lg-12 float-right" style="margin-top: 15rem; margin-left: -5rem;">
              <br><br>
              <input type="submit" style="background-color: #90162a;color: white;" id="btn_newRegInfoContinue"
                name="btn_newRegInfoContinue" class="btn btn-default" value="Continue">
              <!-- 
                  <input type="submit" style="background-color: #90162a;color: white;" id="btnSkipChild"
                    name="btnSkipChild" class="btn btn-default" value="Skip"> -->
              <input type="button" style="background-color: #90162a;color: white;" id="btnCancel" name="btnCancel"
                class="btn btn-default" value="Back" @click="goBack">

              <div class="col-lg-12">
                <br>
                <p id="ErrSurname" style="padding-top: -25px; margin-left: -5rem; color: red;"> * Indicates Mandatory
                  fields</p>
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
            </div>

          </div>



        </div>
        <input type="hidden" id="hdn_newRegInfo" name="hdn_newRegInfo" value="">
      </div>
    </fieldset>
  </form>
  <!-- </div> -->
</template>
  
<script>



import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";

export default {
  computed: {
    ...mapGetters(['getUserData', 'getDebitOrderDetails']),
    ...mapActions(['updateDebitOrderDetails']),
  },
  data() {
    return {
      currentStep: 5,
      steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
      storedData: {
        Surname: '',
        AccountHolderInitials: '',
        BankName: '',
        BranchName: '',
        BranchCode: '',
        AccountNo: '',
        day: '',

      },
    };
  },
  methods: {
    async nextPage() {

      // const userDebitDetails = {
      //   AccountHolderInitials: this.storedData.AccountHolderInitials,
      //   BankName: BranchName.value,
      //   BranchName: BranchName.value,
      //   BranchCode: this.storedData.BranchCode,
      //   AccountNo: this.storedData.AccountNo,
      //   Surame: this.storedData.Surname,
      // };
      console.log(this.storedData);
      // console.log(userDebitDetails);

      try {
        const response = await axios.post('http://localhost:9000//riskfin_direct_user_encrypted_data', this.storedData, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        });
        // Handle the response, e.g., show a success message
        console.log(response.data.message);
        this.$router.push('./complete');
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error('Error:', error);
      }

      // this.$store.dispatch('updateDebitOrderDetails', userDebitDetails);
      // this.$router.push('./complete');
      // Now, you can submit this data to your server for secure storage
    },
  },
  created() {
    this.userData = this.getUserData;

  },
};

// export default {
//   computed: {
//     ...mapGetters(['getUserData']),
//     ...mapActions(['addChild']),
//   },
//   data() {
//     return {
//       currentStep: 5,
//       steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
//       storedData: {
//         FirstName: '',
//         Surname: '',
//         ID: '',
//       },
//     };
//   },
//   methods: {
//     nextPage() {

//       const childData = {
//         relationship: 'Child',
//         name: this.storedData.FirstName,
//         surname: this.storedData.Surname,
//         idNumber: this.storedData.ID,
//       };
//       console.log(childData);
//       this.$store.dispatch('addChild', childData);
//       this.$router.push('./complete');
//     },
//     goBack() {
//       this.$router.go(-1);
//     },
//   },
//   created() {
//     // this.userData = this.getUserData;
//     if (this.getUserData) {
//       this.storedData.Surname = this.getUserData.surname || '';
//     }
//   },
// };
</script>
  
<style lang="scss">
form {
  inline-size: 90%;
  margin-block: 1rem;
  margin-inline: 5%;
}

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
  padding: 4px;
  border: 0.2px solid #ccc;
  border-radius: 4px;
  inline-size: 16vw;

  /* inline-size: 100%; */
}

.container-fluid::after {
  clear: both;
}

.btn {
  inline-size: 6vw;
  margin-block-end: 1rem;
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
  