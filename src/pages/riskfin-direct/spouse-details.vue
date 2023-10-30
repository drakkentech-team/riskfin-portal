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
    <h1 style="margin-top: 2rem; margin-bottom: 10px; color: #262626; text-align: center;"> Spouse Details</h1>
    <form @submit.prevent="nextPage" action="./first-child-details" method="POST">
      <fieldset>

        <div class="form-group">
          <div class="row" style="padding-right: 10%;padding-left: 5%;">

            <div class="col-lg-6">

              <div class="row align-items-center">
                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style="padding-right: 5rem;">
                    <label for="First Names">First Names</label>
                  </div>
                  <input tabindex="1" type="text" id="FirstName" class="form-control" name="FirstName"
                    v-model="storedData.FirstName" required>
                  <div style="margin-left: 10px; color: red; font-size: 20px;" class="star" id="star" name="star"><b>*</b>
                  </div>
                </div>

                <!-- <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style="padding-right: 5rem;">
                    <label for="Type of Identity Document">Type of Identity <br> Document </label>
                  </div>
                  <select class="form-control" id="type_of_identity_document" name="type_of_identity_document" required v-model="storedData.type_of_identity_document">
                    <option value="">Type Of Doc</option>
                    <option selected="" value="RSA">RSA</option>
                    <option value="Passport">Passport</option>
                    <option value="Other">Other</option>
                  </select>
                  <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    id="star" class="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div> -->

                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style="padding-right: 3.6rem;">
                    <label for="type_of_identity_document">Type of Identity <br> Document</label>
                  </div>
                  <select class="form-control" id="type_of_identity_document" name="type_of_identity_document" required
                    v-model="storedData.type_of_identity_document">
                    <option value="">Select Type Of Document</option>
                    <option value="RSA">RSA</option>
                    <option value="Passport">Passport</option>
                    <option value="Other">Other</option>
                  </select>
                  <div style="padding-left: 10px; margin-left: 5px; color: red; float: inline-start; font-size: 20px;"
                    id="star" class="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"></p>
                  <p class=".bg-danger"></p>
                </div>

                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div style=" padding-right: 3.3rem;clear: both;" class="col-lg-4">
                    <label for="ID">Identity Number </label>
                  </div>
                  <input type="text" id="ID" class="form-control" name="ID" v-model="storedData.ID" required>
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
                <div class="col-lg-2" style="padding-left: 10rem; margin-top: 0.5rem;">
                  <label for="OR">OR</label>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style=" padding-right: 4.5rem;">
                    <label for="BirthDate">Date of Birth </label>
                  </div>
                  <!-- <div class="col-lg-8"> -->
                  <!-- <input type="hidden" id="BirthDate" class="form-control" name="BirthDate" value="">
                  <input style="width: 70px;margin-right: 10px;" type="text" id="Year" class="form-control" name="Year"
                    value="YYYY"> <input style="width: 50px;margin-right: 10px;" type="text" id="Month"
                    class="form-control" name="Month" value="MM"> <input style="width: 50px;" type="text" id="Date"
                    class="form-control" name="Date" value="DD">
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p> -->
                  <input type="hidden" id="date_of_birth" class="form-control" name="date_of_birth"
                    v-model="storedData.date_of_birth">

                  <input style="width: 70px; margin-right: 10px;" type="text" id="Year" class="form-control" name="Year"
                    v-model="storedData.year" placeholder="YYYY">
                  <input style="width: 50px; margin-right: 10px;" type="text" id="Month" class="form-control" name="Month"
                    v-model="storedData.month" placeholder="MM">
                  <input style="width: 50px;" type="text" id="Date" class="form-control" name="Date"
                    v-model="storedData.date" placeholder="DD">

                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>

                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.7rem;">
                  <div class="col-lg-4" style=" padding-right: 8rem;">
                    <label for="Age">Age </label>
                  </div>
                  <!-- <div class="col-lg-8"> -->
                  <input type="text" id="Age" class="form-control" name="Age" v-model="storedData.Age">
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>
              </div>



            </div>


            <div class="col-lg-6 float-right" style="margin-top: -16.2rem;">
              <div class="row">
                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style=" padding-right: 7rem;">
                    <label for="Surname">Surname</label>
                  </div>
                  <input tabindex="2" type="text" id="Surname" class="form-control" name="Surname"
                    v-model="storedData.Surname" required @blur="nextPage">
                  <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    class="star" id="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>
              </div>



            </div>
          </div>





          <div class="row" style="padding-right: 10%;padding-left: 5%;">

            <div class="col-lg-6">

              <p id="ErrSurname" style="padding-top: 10px;padding-left: 150px;color: red;"> * Indicates Mandatory fields
              </p>
            </div>
            <div class="col-lg-6" style="margin-inline-start: 50%;">
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
              <br>
              <input type="submit" style="background-color: #90162a;color: white;" id="btn_newRegInfoContinue"
                name="btn_newRegInfoContinue" class="btn btn-default" value="Continue">
              <input type="button" style="background-color: #90162a;color: white;" id="btnSkipSpouse" name="btnSkipSpouse"
                class="btn btn-default" value="Skip" @click="skip">
              <input type="button" style="background-color: #90162a;color: white;" id="btnCancel" name="btnCancel"
                class="btn btn-default" value="Back" @click="goBack">

            </div>
          </div>



          <input type="hidden" id="hdn_newRegInfo" name="hdn_newRegInfo" value="">
        </div>
      </fieldset>
    </form>
  </div>
</template>
  
<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";

export default {
  computed: {
    ...mapGetters(['getUserData']),
    ...mapActions(['updateSpouseData']),
  },
  data() {
    return {
      currentStep: 3, // Change this to control the current step
      steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
      storedData: {
        FirstName: '',
        Surname: '',
        ID: '',
        type_of_identity_document: '',
        date_of_birth: '',
        year: '',
        month: '',
        date: '',
        Age: '',

      },
    };
  },
  methods: {
    // async nextPage() {
    //   try {
    //     const spouseData = {
    //       relationship: 'Spouse',
    //       name: this.storedData.FirstName,
    //       surname: this.storedData.Surname,
    //       idNumber: this.storedData.ID,
    //     };

    //     // Dispatch an action to update the Vuex store with the spouse data
    //     this.$store.dispatch('updateSpouseData', spouseData);
    //     console.log(spouseData)
    //     // Send a POST request to your backend API to save the spouse data in the database
    //     const response = await fetch('http://localhost:9000/riskfin_direct_family_spouse', {
    //       method: 'POST',
    //       headers: {
    //         'Authorization': `Bearer ${bearerToken}`,
    //         'Content-Type': 'application/json',
    //       },
    //       // body: JSON.stringify(spouseData),
    //       body: JSON.stringify({
    //         first_name: this.storedData.FirstName,
    //         type_of_identity_document: "RSA",
    //         surname: this.storedData.Surname,
    //         id: this.storedData.ID,
    //         riskfin_direct_user_fk: "1",
    //       }),
    //     });

    //     console.log(spouseData);

    //     // Handle the response as needed
    //     if (response.status === 200) {
    //       // Data saved successfully
    //       const responseData = await response.json();
    //       console.log('Spouse data saved successfully:', responseData);
    //       // Redirect to the next page
    //       this.$router.push('./first-child-details');
    //     } else {
    //       // Handle errors or show error messages to the user
    //       console.error('Failed to save spouse data:', response.data);
    //     }
    //   } catch (error) {
    //     console.error('Error while saving spouse data:', error);
    //   }
    // },



    // ...

    updateDateOfBirth() {
      this.storedData.date_of_birth = `${this.storedData.year}-${this.storedData.month}-${this.storedData.date}`;
    },

    async nextPage() {
      this.updateDateOfBirth();
      try {
        const spouseData = {
          relationship: 'Spouse',
          name: this.storedData.FirstName,
          surname: this.storedData.Surname,
          idNumber: this.storedData.ID,
          type_of_identity_document: this.storedData.type_of_identity_document,
          riskfin_direct_user_fk: "1",
          date_of_birth: this.storedData.date_of_birth,
          age: this.storedData.Age,
        };

        // Dispatch an action to update the Vuex store with the spouse data
        // this.$store.dispatch('updateSpouseData', spouseData);

        const postData = {
          first_name: this.storedData.FirstName,
          type_of_identity_document: this.storedData.type_of_identity_document,
          surname: this.storedData.Surname,
          id: this.storedData.ID,
          riskfin_direct_user_fk: "1",
          date_of_birth: this.storedData.date_of_birth,
          age: this.storedData.Age,
        };

        // Send a POST request using Axios
        const response = await axios.post('http://localhost:9000/riskfin_direct_family_spouse', postData, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        });

        console.log(postData);

        // Handle the response as needed
        if (response.status === 201) {
          // Data saved successfully
          console.log('Spouse data saved successfully:', response.data);
          this.$store.dispatch('updateSpouseData', spouseData);
          // Redirect to the next page
          this.$router.push('./first-child-details');
        } else {
          // Handle errors or show error messages to the user
          console.error('Failed to save spouse data:', response.data);
        }
      } catch (error) {
        console.error('Error while saving spouse data:', error);
      }
    },

    skip() {
      this.$router.push('./first-child-details');
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    // this.userData = this.getUserData;
    if (this.getUserData) {
      this.storedData.Surname = this.getUserData.surname || '';
    }
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

input,
select {
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
  