<template>
  <modal :is-open="isOpen" title="View" @close="closeModal" style="font-size: small;">
    <div class="scrollable-content">
      <h2 style="margin: 1rem; color: #90162a; text-align: center;"> Main Member Details </h2>

      <!-- Content of the modal goes here -->
      <!-- <form @submit.prevent="submitForm"> -->
      <!-- Populate form fields with userData -->
      <!-- <fieldset>

        <div class="form-group">
          <div class="row" style="padding-right: 10%;padding-left: 5%;">

            <div class="col-lg-6"> -->

      <!-- <div class="row"> -->
      <!-- <div class="row align-items-center">
                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style="padding-right: 5rem;">
                    <label for="First Names">First Names</label>
                  </div> -->
      <!-- <input tabindex="1" type="text" id="FirstName" class="form-control" name="FirstName" value={{
                    $route.query.firstNames }}> -->
      <!-- <input tabindex="1" type="text" id="firstNames" class="form-control" name="firstNames"
                    v-model="getUserData.name" />
                  <div style="margin-left: 10px; color: red; font-size: 20px;" class="star" id="star" name="star"><b>*</b>
                  </div>
                </div>

                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style="padding-right: 6.2rem;">
                    <label for="Known As">KnownAs</label>
                  </div> -->
      <!-- <div class="col-lg-8"> -->
      <!-- <input tabindex="1" type="text" id="KnownAs" class="form-control" name="KnownAs" value="">
                  <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    class="star" id="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </div>

                <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                  <div class="col-lg-4" style="padding-right: 5rem;">
                    <label for="Type of Identity Document">Type of Identity <br> Document </label>
                  </div> -->
      <!-- <div class="col-lg-8"> -->
      <!-- <select class="form-control" id="TOD" name="TOD">
                    <option value="-1">Type Of Doc</option>
                    <option selected="" value="0">RSA</option>
                    <option value="1">Passport</option>
                    <option value="2">Other</option>
                  </select>
                  <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                    id="star" class="star" name="star"><b>*</b></div>
                  <div style="clear: both;"></div>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger">
                  </p>
                </di  -->
      <div style="max-width: 100%; margin: 0 5% 1rem;">
        <!-- <h1 style="margin-top: 2rem; margin-bottom: 10px; color: #262626; text-align: center;">Please Enter Main Member
      Details</h1> -->
        <form @submit.prevent="" action="" method="POST">
          <fieldset>

            <div class="form-group">
              <div class="row" style="padding-right: 10%;padding-left: 5%;">

                <div class="col-lg-6">

                  <!-- <div class="row"> -->
                  <div class="row align-items-center">
                    <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                      <div class="col-lg-4" style="padding-right: 3rem;">
                        <label for="First Names">First <br> Names</label>
                      </div>
                      <!-- <input tabindex="1" type="text" id="FirstName" class="form-control" name="FirstName" value={{
                    $route.query.firstNames }}> -->
                      <input tabindex="1" type="text" id="firstNames" class="form-control" name="firstNames"
                        v-model="modalUserData.first_name" />
                      <div style="margin-left: 10px; color: red; font-size: 20px;" class="star" id="star" name="star">
                        <b>*</b>
                      </div>
                    </div>

                    <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                      <div class="col-lg-4" style="padding-right: 2.2rem;">
                        <label for="Known As">KnownAs</label>
                      </div>
                      <!-- <div class="col-lg-8"> -->
                      <input tabindex="1" type="text" id="KnownAs" class="form-control" name="KnownAs"
                        v-model="modalUserData.known_as">
                      <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                        class="star" id="star" name="star"><b>*</b></div>
                      <div style="clear: both;"></div>
                      <p class="text-danger"> </p>
                      <p class=".bg-danger">
                      </p>
                    </div>

                    <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                      <div class="col-lg-4" style="padding-right: 5rem;">
                        <label for="Type of Identity Document">Type of Identity <br> Document </label>
                      </div>
                      <!-- <div class="col-lg-8"> -->
                      <select class="form-control" id="TOD" name="TOD">
                        <option value="-1">Type Of Doc</option>
                        <option selected="" value="0">RSA</option>
                        <option value="1">Passport</option>
                        <option value="2">Other</option>
                      </select>
                      <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                        id="star" class="star" name="star"><b>*</b></div>
                      <div style="clear: both;"></div>
                      <p class="text-danger"> </p>
                      <p class=".bg-danger">
                      </p>
                    </div>

                    <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                      <div style=" padding-right: 3rem;clear: both;" class="col-lg-4">
                        <label for="id">Identity <br> Number </label>
                      </div>
                      <!-- <div class="col-lg-8"> -->
                      <input type="text" id="id" class="form-control" name="id" v-model="modalUserData.id">
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
                      <div class="col-lg-4" style=" padding-right: 3.3rem;">
                        <label for="BirthDate">Date of<br> Birth </label>
                      </div>
                      <!-- <div class="col-lg-8"> -->
                      <input type="hidden" id="BirthDate" class="form-control" name="BirthDate"
                        v-model="modalUserData.date_of_birth">
                      <!-- <input style="width: 70px;margin-right: 10px;" type="text" id="Year" class="form-control"
                        name="Year" value="YYYY"> <input style="width: 50px;margin-right: 10px;" type="text" id="Month"
                        class="form-control" name="Month" value="MM"> <input style="width: 50px;" type="text" id="Date"
                        class="form-control" name="Date" value="DD">
                      <div style="clear: both;"></div>
                      <p class="text-danger"> </p>
                      <p class=".bg-danger">
                      </p> -->
                      <input type="hidden" id="date_of_birth" class="form-control" name="date_of_birth"
                        v-model="storedData.date_of_birth">

                      <input style="width: 70px; margin-right: 10px;" type="text" id="Year" class="form-control"
                        name="Year" v-model="storedData.year" placeholder="YYYY">
                      <input style="width: 50px; margin-right: 10px;" type="text" id="Month" class="form-control"
                        name="Month" v-model="storedData.month" placeholder="MM">
                      <input style="width: 50px;" type="text" id="Date" class="form-control" name="Date"
                        v-model="storedData.date" placeholder="DD">

                      <div style="clear: both;"></div>
                      <p class="text-danger"> </p>
                      <p class=".bg-danger">
                      </p>
                    </div>

                    <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.7rem;">
                      <div class="col-lg-4" style=" padding-right: 4.5rem;">
                        <label for="Age">Age </label>
                      </div>
                      <!-- <div class="col-lg-8"> -->
                      <input type="text" id="Age" class="form-control" name="Age" v-model="modalUserData.age">
                      <div style="clear: both;"></div>
                      <p class="text-danger"> </p>
                      <p class=".bg-danger">
                      </p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                      <div class="col-lg-4" style=" padding-right: 3.2rem;">
                        <label for="contactPhoneNumber">Contact<br> Phone <br> Number </label>
                      </div>
                      <!-- <div class="col-lg-8"> -->
                      <input type="text" id="contactPhoneNumber" class="form-control" name="contactPhoneNumber"
                        v-model="modalUserData.mobile_number">
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
                      <div class="col-lg-4" style=" padding-right: 3.3rem;">
                        <label for="email"> Email<br> Address </label>
                      </div>
                      <!-- <div class="col-lg-8"> -->
                      <input type="text" id="email" class="form-control" name="email" v-model="modalUserData.email">
                      <div style=" padding-left: 10px; margin-left: 5px; color: red;float: inline-start; font-size: 20px;"
                        id="star" class="star" name="star"><b>*</b></div>
                      <div style="clear: both;"></div>
                      <p class="text-danger"> </p>
                      <p class=".bg-danger">
                      </p>
                    </div>
                  </div>

                </div>


                <div class="col-lg-6 float-right" style="margin-top: -25.6rem; margin-right: -3rem; text-align: end;">
                  <div class="row">
                    <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                      <div class="col-lg-4" style=" padding-right: 1rem;">
                        <label for="surname">Surname</label>
                      </div>
                      <!-- <div class="col-lg-8"> -->
                      <input tabindex="2" type="text" id="surname" class="form-control" name="surname"
                        v-model="modalUserData.surname">
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
                      <div class="col-lg-4" style=" padding-right: 1.5rem;">
                        <label for="address_line_1">Address</label>
                      </div>
                      <!-- <div class="col-lg-8"> -->
                      <input type="text" id="address_line_1" class="form-control" name="address_line_1"
                        v-model="modalUserData.address_line_1">
                      <div style="clear: both;"></div>
                      <p class="text-danger"> </p>
                      <p class=".bg-danger">

                      </p>
                    </div>

                    <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                      <div class="col-lg-4" style=" padding-right: 4.5rem;">
                        <!-- <label for="H_Adr1">Address Line 2</label> -->
                      </div>
                      <!-- <div class="col-lg-8"> -->
                      <input type="text" id="address_line_2" class="form-control" name="address_line_2"
                        v-model="modalUserData.address_line_2">
                      <div style="clear: both;"></div>
                      <p class="text-danger"> </p>
                      <p class=".bg-danger">

                      </p>
                    </div>

                    <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                      <div class="col-lg-4" style=" padding-right: 4.5rem;">
                        <!-- <label for="H_Adr1">Address Line 3</label> -->
                      </div>
                      <!-- <div class="col-lg-8"> -->
                      <input type="text" id="address_line_3" class="form-control" name="address_line_3"
                        v-model="modalUserData.address_line_3">
                      <div style="clear: both;"></div>
                      <p class="text-danger"> </p>
                      <p class=".bg-danger">
                      </p>
                    </div>


                  </div>
                  <div class="row">
                    <div class="col-lg-8 d-flex align-items-center" style="margin-top: 0.5rem;">
                      <div class="col-lg-4" style=" padding-right: 3.3rem;">
                        <label for="city">City </label>
                      </div>
                      <!-- <div class="col-lg-8"> -->
                      <input type="text" id="city" class="form-control" name="city" v-model="modalUserData.city">
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

                  <p id="ErrSurname" style="padding-top: 10px;padding-left: 150px;color: red;"> * Indicates Mandatory
                    fields
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
                  <input type="button" style="background-color: #90162a;color: white;" id="btn_newRegInfoContinue"
                    name="btn_newRegInfoContinue" class="btn btn-default" @click="toggleEditMode" :disabled="!editMode"
                    value="Edit">
                  <input type="button" style="background-color: #90162a;color: white;" id="btnCancel" name="btnCancel"
                    class="btn btn-default" :disabled="!editMode" value="Save" @click="closeModal">
                </div>
              </div>
              <input type="hidden" id="hdn_newRegInfo" name="hdn_newRegInfo" value="">
            </div>
          </fieldset>
        </form>
      </div>
      <!-- <button type="submit" class="btn btn-primary">Save</button>
    </form> -->
    </div>
  </modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Modal from './EditMainMemberDetails.vue';


export default {
  computed: {
    ...mapGetters(['getUserData']),
    ...mapActions(['updateUserData']),
  },
  data() {
    return {
      modalUserData: {},
      editMode: false,
    };
  },
  props: {
    // userData: Object, // Accept userData as a prop
    isOpen: Boolean, // Control whether the modal is open or not
  },
  methods: {
    closeModal() {
      this.$emit('close'); // Emit a custom event to close the modal
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    nextPage() {
      // Handle form submission logic here, e.g., updating userData
      // this.updateUserData(this.modalUserData); // Update user data using Vuex action
      // this.closeModal(); // Close the modal after form submission
    }
  },
  components: {
    Modal,
  },
  created() {
    // Assign the prop value to modalUserData in the created hook
    this.modalUserData = { ...this.getUserData };
  },
};
</script>

<style lang="scss">
input {
  inline-size: 11vw;
}

.scrollable-content {
  max-block-size: 500px;

  /* Adjust the height as needed */
  overflow-y: auto;
}
</style>
