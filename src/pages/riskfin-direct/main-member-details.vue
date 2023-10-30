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

  <div style="max-width: 90%; margin: 0 10% 2rem;">
    <h1 style="margin-top: 2rem; margin-bottom: 10px; color: #262626; text-align: center;">Please Enter Main Member
      Details</h1>
    <form @submit.prevent="nextPage" action="./spouse-details" method="POST">
      <fieldset>

        <div class="form-group">
          <div class="row" style="padding-right: 10%;padding-left: 5%;">

            <div class="col-lg-6">

              <!-- <div class="row"> -->
              <div class="row align-items-center">
                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style="padding-right: 5rem;">
                    <label for="first_name">First Names</label>
                  </div>
                  <!-- <input tabindex="1" type="text" id="FirstName" class="form-control" name="FirstName" value={{
                    $route.query.firstNames }}> -->
                  <input tabindex="1" type="text" id="first_name" class="form-control" name="first_name"
                    v-model="getUserData.name" required />
                  <div style="margin-left: 10px; color: red; font-size: 20px;" class="star" id="star" name="star"><b>*</b>
                  </div>
                </div>

                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style="padding-right: 6.2rem;">
                    <label for="known_as">KnownAs</label>
                  </div>
                  <!-- <div class="col-lg-8"> -->
                  <input tabindex="1" type="text" id="known_as" class="form-control" name="known_as"
                    v-model="storedData.known_as" required>
                  <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    class="star" id="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>

                <!-- <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style="padding-right: 5rem;">
                    <label for="type_of_identity_document">Type of Identity <br> Document </label>
                  </div>
                  -- <div class="col-lg-8"> --
                  <select class="form-control" id="type_of_identity_document" name="type_of_identity_document" required
                    v-model="storedData.type_of_identity_document">
                    <option value="">Type Of Doc</option>
                    <option value="RSA">RSA</option>
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
                    <label for="id">Identity Number </label>
                  </div>
                  <!-- <div class="col-lg-8"> -->
                  <input type="text" id="id" class="form-control" name="id" v-model="getUserData.idNumber" required>
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
                    <label for="date_of_birth">Date of Birth </label>
                  </div>
                  <!-- <div class="col-lg-8"> -->

                  <!-- <input type="hidden" id="date_of_birth" class="form-control" name="date_of_birth" value="">
                  <input style="width: 70px;margin-right: 10px;" type="text" id="Year" class="form-control" name="Year"
                    value="YYYY"> <input style="width: 50px;margin-right: 10px;" type="text" id="Month"
                    class="form-control" name="Month" value="MM"> <input style="width: 50px;" type="text" id="Date"
                    class="form-control" name="Date" value="DD"> -->
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
                    <label for="age">Age </label>
                  </div>
                  <!-- <div class="col-lg-8"> -->
                  <input type="text" id="age" class="form-control" name="age" v-model="storedData.age">
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>
              </div>

            </div>


            <div class="col-lg-6 float-right" style="margin-top: -18.8rem;">
              <div class="row">
                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style=" padding-right: 7rem;">
                    <label for="surname">Surname</label>
                  </div>
                  <!-- <div class="col-lg-8"> -->
                  <input tabindex="2" type="text" id="surname" class="form-control" name="surname"
                    v-model="getUserData.surname" required>
                  <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    class="star" id="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style=" padding-right: 4.5rem;">
                    <label for="address_line_1">Address Line 1</label>
                  </div>
                  <!-- <div class="col-lg-8"> -->
                  <input type="text" id="address_line_1" class="form-control" name="address_line_1"
                    v-model="storedData.address_line_1">
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">

                  </p>
                </div>

                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style=" padding-right: 4.5rem;">
                    <label for="address_line_2">Address Line 2</label>
                  </div>
                  <!-- <div class="col-lg-8"> -->
                  <input type="text" id="address_line_2" class="form-control" name="address_line_2"
                    v-model="storedData.address_line_2">
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">

                  </p>
                </div>

                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style=" padding-right: 4.5rem;">
                    <label for="address_line_3">Address Line 3</label>
                  </div>
                  <!-- <div class="col-lg-8"> -->
                  <input type="text" id="address_line_3" class="form-control" name="address_line_3"
                    v-model="storedData.address_line_3">
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>


              </div>
              <div class="row">
                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style=" padding-right: 9.3rem;">
                    <label for="city">City </label>
                  </div>
                  <!-- <div class="col-lg-8"> -->
                  <input type="text" id="city" class="form-control" name="city" v-model="storedData.city" required>
                  <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    class="star" id="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style=" padding-right: 4.5rem;">
                    <label for="mobile_number">Contact Phone <br> Number </label>
                  </div>
                  <!-- <div class="col-lg-8"> -->
                  <input type="text" id="mobile_number" class="form-control" name="mobile_number"
                    v-model="getUserData.mobile_number" required>
                  <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    id="star" class="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style=" padding-right: 4.6rem;">
                    <label for="email"> Email Address </label>
                  </div>
                  <!-- <div class="col-lg-8"> -->
                  <input type="text" id="email" class="form-control" name="email" v-model="getUserData.email" required>
                  <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    id="star" class="star" name="star"><b>*</b></div>
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
              <p id="Errdate_of_birth" class="text-danger"></p>
              <p id="Errage" class="text-danger"></p>
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
              <input type="button" style="background-color: #90162a;color: white;" id="btnCancel" name="btnCancel"
                class="btn btn-default" value="Cancel" @click="goBack">
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
    ...mapActions(['updateUserData']),
  },
  data() {
    return {
      currentStep: 2,
      steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
      userData: {
        name: '',
        surname: '',
        email: '',
        mobile_number: '',
        idNumber: '',
      },
      storedData: {
        first_name: '',
        known_as: '',
        surname: '',
        type_of_identity_document: '',
        id: '',
        age: '',
        date_of_birth: '',
        year: '',
        month: '',
        date: '',
        address_line_1: '',
        address_line_2: '',
        address_line_3: '',
        city: '',
        mobile_number: '',
        email: '',
        riskfin_direct_user_fk: "1"
      },
    };
  },

  //  watch: {
  //   idNumber(newValue) {
  //     // Call a method to extract the date from the ID number
  //     const extractedDate = this.extractDateFromID(newValue);

  //     if (extractedDate) {
  //       // Split the date into year, month, and day
  //       const dateParts = extractedDate.split('-');

  //       // Update the date fields with the extracted values
  //       this.storedData.date_of_birth = extractedDate;
  //       this.storedData.year = dateParts[0];
  //       this.storedData.month = dateParts[1];
  //       this.storedData.date = dateParts[2];
  //     }
  //   }
  // },

  methods: {

    updateDateOfBirth() {
      this.storedData.date_of_birth = `${this.storedData.year}-${this.storedData.month}-${this.storedData.date}`;
    },

    // extractDateFromID(idNumber) {
    //   // Implement your logic to extract the date from the ID number
    //   // and return it in the 'YYYY-MM-DD' format.
    //   // Replace this with your actual extraction logic.
    //   return 'YYYY-MM-DD';
    // }
    // }

    async nextPage() {
      this.storedData.first_name = this.getUserData.name;
      this.storedData.surname = this.getUserData.surname;
      this.storedData.email = this.getUserData.email;
      this.storedData.mobile_number = this.getUserData.mobile_number;
      this.storedData.id = this.getUserData.idNumber;
      this.updateDateOfBirth();
      // this.userData.date_of_birth = this.storedData.date_of_birth;
      const userData = {
        // ...this.userData, // Use userData from computed property
        ...this.storedData,
        // id: this.storedData.id,
        // first_name: this.userData.name,
        // surname: this.userData.surname,
        // // known_as: '',
        // email: this.userData.email,
        // mobile_number: this.userData.mobile_number,
        // id: this.userData.idNumber,
        // date_of_birth: '',
        // age: '',
        // address_line_1: '',
        // address_line_2: '',
        // address_line_3: '',
        // city: '',
        // type_of_identity_document: '',

      };

      this.$store.dispatch('updateUserData', userData);

      console.log(this.storedData);
      console.log(userData);
      try {
        const response = await axios.post('http://localhost:9000/riskfin_direct_user_details', this.storedData, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        });
        // Handle the response, e.g., show a success message
        console.log(response.data.message);
        console.log(this.storedData);
        // this.updateUserData(userData);

        console.log(userData);
        this.$router.push('./spouse-details');
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error('Error:', error);
      }

      // this.$store.dispatch('updateDebitOrderDetails', userDebitDetails);
      // this.$router.push('./complete');
      // Now, you can submit this data to your server for secure storage
      // },
      // },
      // console.log(this.storedData);
      // this.updateUserData(userData);
      // this.$store.dispatch('updateUserData', userData);
      // console.log(userData);
      // this.$router.push('./spouse-details');
    },
    goBack() {
      this.$router.push('./home');
    },
    created() {

      this.userData = this.getUserData;

      // Retrieve the stored data from the query parameters
      // this.storedData.firstNames = this.$route.query.firstNames || '';
      // this.storedData.surname = this.$route.query.surname || '';
      // this.storedData.email = this.$route.query.email || '';
      // this.storedData.contactPhoneNumber = this.$route.query.contactPhoneNumber || '';
    },
  },

  // async saveUserDataToDatabase() {

  //   const userData = {
  //     ...this.userData, // Use userData from computed property
  //     // id: this.storedData.id,
  //     // "first_name": "Jonathan",
  //     // "known_as": "John",
  //     // "surname": "Doe",
  //     // "type_of_identity_document": "RSA",
  //     // "id": "0312345676890",
  //     // "age": "40",
  //     // "date_of_birth": "2003-12-03",
  //     // "address_line_1": "Unit 11",
  //     // "address_line_2": "Rose Avenue",
  //     // "address_line_3": "Athlone",
  //     // "city": "Cape Town",
  //     // "mobile_number": "0684393234",
  //     // "email": "jhndoe@mail.com"

  //   };

  //   // try {
  //   // Send a POST request to your server to save the data in the database
  //   // const response = await axios.post('http://localhost:9000/riskfin_direct_user_details',
  //   //   userData,
  //   //   {
  //   //     headers: {
  //   //       'Authorization': `Bearer ${bearerToken}`,
  //   //       'Content-Type': 'application/json'
  //   //     }
  //   //   });


  //   //   if (response.status === 200) {
  //   //     console.log('User data saved successfully in the database');

  //   //     // Update the user data in the Vuex store
  //   //     this.$store.dispatch('updateUserData', userData);
  //   //     this.$router.push('./spouse-details');

  //   //     // Handle success, e.g., show a success message to the user
  //   //   } else {
  //   //     console.error('Failed to save user data in the database:', response.data);
  //   //     // Handle error, e.g., show an error message to the user
  //   //   }
  //   // } catch (error) {
  //   //   console.error('Error while saving user data in the database:', error);
  //   //   // Handle error, e.g., show an error message to the user
  //   // }

  //   //   try {
  //   //     const response = await fetch('http://localhost:9000/riskfin_direct_user_details', {
  //   //       method: 'POST',
  //   //       headers: {
  //   //         'Authorization': `Bearer ${bearerToken}`,
  //   //         'Content-Type': 'application/json',
  //   //       },
  //   //       body: JSON.stringify(userData),
  //   //     });
  //   //     console.log('Authorization', `Bearer ${bearerToken}`);
  //   //     console.log(userData);

  //   //     if (response.ok) {
  //   //       console.log('Email sent successfully');
  //   //       return true;
  //   //     } else {
  //   //       const responseBody = await response.text();
  //   //       console.error(`Email sending failed. Status: ${response.status}, Response: ${responseBody}`);
  //   //       return false;
  //   //     }
  //   //   } catch (error) {
  //   //     console.error(`Failed to send email: ${error.message}`);
  //   //     return false;
  //   //   }
  //   // },

  //   //   goBack() {
  //   //     this.$router.push('./home');
  //   //   },
  //   // },
  //   // created() {

  //   //   this.userData = this.getUserData;

  //   //   // Retrieve the stored data from the query parameters
  //   //   // this.storedData.firstNames = this.$route.query.firstNames || '';
  //   //   // this.storedData.surname = this.$route.query.surname || '';
  //   //   // this.storedData.email = this.$route.query.email || '';
  //   //   // this.storedData.contactPhoneNumber = this.$route.query.contactPhoneNumber || '';
  //   // }
  // },

  // },

};
</script>
  

<!-- <script>
import { mapActions, mapGetters } from 'vuex';
const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";

export default {
  computed: {
    ...mapGetters(['getUserData']),
    ...mapActions(['updateUserData']),
  },
  data() {
    return {
      currentStep: 2,
      steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
      storedData: {
        firstNames: '',
        surname: '',
        email: '',
        contactPhoneNumber: '',
        id: '',
        // FirstName: '',
        // Surname: '',
        // EMail: '',
        // Tel_H: '',
        // ID: '',
      },
    };
  },
  methods: {

    // nextPage() {
    //   const userData = {
    //     // name: this.storedData.FirstName,
    //     // surname: this.storedData.Surname,
    //     // email: this.storedData.EMail,
    //     // mobile_number: this.storedData.Tel_H,
    //     // name: this.storedData.firstNames,
    //     // surname: this.storedData.surname,
    //     // email: this.storedData.email,
    //     // mobile_number: this.storedData.contactPhoneNumber,
    //     ...this.getUserData,
    //     idNumber: this.storedData.id,
    //   };

    //   // this.$store.dispatch('updateUserData', userData);
    //   this.updateUserData(userData);
    //   this.$router.push('./spouse-details');
    // },
    nextPage() {
      const userData = {
        // ...this.userData, // Use userData from computed property
        // id: this.storedData.id,
        // first_name: this.storedData.firstNames,
        // surname: this.storedData.surname,
        // known_as: '',
        // email: '',
        // mobile_number: '',
        // id: this.storedData.id,
        // date_of_birth: '',
        // age: '',
        // address_line_1: '',
        // address_line_2: '',
        // address_line_3: '',
        // city: '',
        // type_of_identity_document: '',

      };

      this.updateUserData(userData);
      this.$store.dispatch('updateUserData', userData);
      console.log(userData);
      this.$router.push('./spouse-details');
    },

    async saveUserDataToDatabase() {

      const userData = {
        ...this.userData, // Use userData from computed property
        // id: this.storedData.id,
        // "first_name": "Jonathan",
        // "known_as": "John",
        // "surname": "Doe",
        // "type_of_identity_document": "RSA",
        // "id": "0312345676890",
        // "age": "40",
        // "date_of_birth": "2003-12-03",
        // "address_line_1": "Unit 11",
        // "address_line_2": "Rose Avenue",
        // "address_line_3": "Athlone",
        // "city": "Cape Town",
        // "mobile_number": "0684393234",
        // "email": "jhndoe@mail.com"

      };

      // try {
      // Send a POST request to your server to save the data in the database
      // const response = await axios.post('http://localhost:9000/riskfin_direct_user_details',
      //   userData,
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${bearerToken}`,
      //       'Content-Type': 'application/json'
      //     }
      //   });


      //   if (response.status === 200) {
      //     console.log('User data saved successfully in the database');

      //     // Update the user data in the Vuex store
      //     this.$store.dispatch('updateUserData', userData);
      //     this.$router.push('./spouse-details');

      //     // Handle success, e.g., show a success message to the user
      //   } else {
      //     console.error('Failed to save user data in the database:', response.data);
      //     // Handle error, e.g., show an error message to the user
      //   }
      // } catch (error) {
      //   console.error('Error while saving user data in the database:', error);
      //   // Handle error, e.g., show an error message to the user
      // }

      //   try {
      //     const response = await fetch('http://localhost:9000/riskfin_direct_user_details', {
      //       method: 'POST',
      //       headers: {
      //         'Authorization': `Bearer ${bearerToken}`,
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify(userData),
      //     });
      //     console.log('Authorization', `Bearer ${bearerToken}`);
      //     console.log(userData);

      //     if (response.ok) {
      //       console.log('Email sent successfully');
      //       return true;
      //     } else {
      //       const responseBody = await response.text();
      //       console.error(`Email sending failed. Status: ${response.status}, Response: ${responseBody}`);
      //       return false;
      //     }
      //   } catch (error) {
      //     console.error(`Failed to send email: ${error.message}`);
      //     return false;
      //   }
      // },

      //   goBack() {
      //     this.$router.push('./home');
      //   },
      // },
      // created() {

      //   this.userData = this.getUserData;

      //   // Retrieve the stored data from the query parameters
      //   // this.storedData.firstNames = this.$route.query.firstNames || '';
      //   // this.storedData.surname = this.$route.query.surname || '';
      //   // this.storedData.email = this.$route.query.email || '';
      //   // this.storedData.contactPhoneNumber = this.$route.query.contactPhoneNumber || '';
      // }
    },
    created() {

      this.userData = this.getUserData;

      // Retrieve the stored data from the query parameters
      // this.storedData.firstNames = this.$route.query.firstNames || '';
      // this.storedData.surname = this.$route.query.surname || '';
      // this.storedData.email = this.$route.query.email || '';
      // this.storedData.contactPhoneNumber = this.$route.query.contactPhoneNumber || '';
    }
  },
}
</script>
   -->
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
  