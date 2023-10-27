<template>
  <modal :is-open="isOpen" title="View" @close="closeModal" style="font-size: small;">
    <div class="scrollable-content">
      <h2 style="margin: 1rem; color: #90162a; text-align: center;"> Spouse Details </h2>


      <div style="max-width: 90%; margin: 0 10% 1rem;">
        <form @submit.prevent="nextPage" action="./spouse-details" method="POST">
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
                        v-model="modalSpouseData.first_name" />
                      <div style="margin-left: 10px; color: red; font-size: 20px;" class="star" id="star" name="star">
                        <b>*</b>
                      </div>
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
                      <input type="text" id="id" class="form-control" name="id" v-model="modalSpouseData.id">
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
                        v-model="modalSpouseData.date_of_birth">
                      <input style="width: 70px;margin-right: 10px;" type="text" id="Year" class="form-control"
                        name="Year" value="YYYY"> <input style="width: 50px;margin-right: 10px;" type="text" id="Month"
                        class="form-control" name="Month" value="MM"> <input style="width: 50px;" type="text" id="Date"
                        class="form-control" name="Date" value="DD">
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
                      <input type="text" id="Age" class="form-control" name="Age" v-model="modalSpouseData.age">
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
                        v-model="modalSpouseData.surname">
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
                  <p id="ErrID" class="text-danger"></p>
                  <p id="ErrBirthDate" class="text-danger"></p>
                  <p id="ErrAge" class="text-danger"></p>
                  <p> </p>
                  <p class="text-danger"> </p>
                  <p class=".bg-danger"> </p>
                  <br>
                  <input type="submit" style="background-color: #90162a;color: white;" id="btn_newRegInfoContinue"
                    name="btn_newRegInfoContinue" class="btn btn-default" value="Edit">
                  <input type="button" style="background-color: #90162a;color: white;" id="btnCancel" name="btnCancel"
                    class="btn btn-default" value="Save" @click="goBack">
                  <input type="button" style="background-color: #90162a;color: white;" id="btnCancel" name="btnCancel"
                    class="btn btn-default" value="Delete" @click="goBack">
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
import Modal from '../help-modal.vue';


export default {
  computed: {
    ...mapGetters(['getSpouseData']),
    ...mapActions(['updateSpouseData']),
  },
  data() {
    return {
      modalSpouseData: {},  // Initialize with the prop value
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
    submitForm() {
      // Handle form submission logic here, e.g., updating userData
      // After saving, you can emit another event to close the modal
      // this.$emit('close');
    },
  },
  components: {
    Modal,
  },
  created() {
    // Assign the prop value to modalUserData in the created hook
    this.modalSpouseData = { ...this.getSpouseData };
  },
};
</script>

<style lang="scss">
input {
  inline-size: 12vw;
}

.scrollable-content {
  max-block-size: 500px;

  /* Adjust the height as needed */
  overflow-y: auto;
}
</style>
