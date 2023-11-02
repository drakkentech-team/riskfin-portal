<!-- <template>
  <div class="funeral-plan-registration">
    <header>
      <h1>Riskfin Direct</h1>
      <img src="@/assets/your-logo.png" alt="Your Logo" />
    </header>
    <section class="content">
      <h2>Register For a Funeral Plan</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="firstNames">First Names:</label>
          <input v-model="firstNames" type="text" id="firstNames" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="contactPhoneNumber">Contact Phone Number:</label>
          <input v-model="contactPhoneNumber" type="tel" id="contactPhoneNumber" required />
        </div>
        <div class="form-group">
          <label for="surname">Surname:</label>
          <input v-model="surname" type="text" id="surname" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
 ... Footer content ... 
  </div>
</template>

<script>
export default {
  name: 'FuneralPlanRegistration',
  data() {
    return {
      firstNames: '',
      email: '',
      contactPhoneNumber: '',
      surname: '',
    };
  },
  methods: {
    submitForm() {
      // You can implement form submission logic here
      // For example, sending data to a server or displaying a success message
    },
  },
};
</script>

<style scoped>
/* Add your styling here */
</style>
 -->


<template>
  <div class="funeral-plan-registration">
    <!-- <div>
    <header style="display: flex; justify-content: space-between; background-color: #98142c;">
      <h1>Riskfin Direct</h1>
      <img src="/../riskfin-logo.png" alt="description" style="width: 10%; background-color: white;">
    </header>
  </div> -->
    <section class="content">
      <h2 style="margin-top: 1rem; color: #262626;text-align: center;">
        <b>Register For a Funeral Plan</b>
      </h2>
      <br>

      <!-- <fieldset>

<div class="form-group">
<div class="row" style="padding-right: 10%;padding-left: 5%;">

<div class="col-lg-6">

        <div class="row">
                 <div class="col-lg-4">
                <label for="First Names">First Names : </label>
                </div>
                 <div class="col-lg-8">
                <input tabindex="1" type="text" id="FirstName" class="form-control" name="FirstName" value=""> <p class="text-danger"> </p><p class=".bg-danger"> 
                   </p></div>
                    <div class="col-lg-4">
                <label for="EMail">EMail</label>
                </div>
                  <div class="col-lg-8">
                <input type="hidden" id="prevEMail" class="form-control" name="prevEMail" value=""><input tabindex="3" type="text" id="EMail" class="form-control" name="EMail" value=""> <p class="text-danger"> </p><p class=".bg-danger"> 
                    </p></div>
                     <div class="col-lg-4">
                <label for="Phone">Contact Phone Number</label>
                </div>
                 <div class="col-lg-8">
                <input tabindex="4" type="text" id="Tel_H" class="form-control" name="Tel_H" value=""> <p class="text-danger"> </p><p class=".bg-danger"> 
                    </p></div>
       </div>
</div>
        <div class="col-lg-6">
        <div class="row">
                         <div class="col-lg-4">
        <label for="Surname">Surname</label>
        </div>
        <div class="col-lg-8">
        <input tabindex="2" type="text" id="Surname" class="form-control" name="Surname" value=""> <p class="text-danger"> </p><p class=".bg-danger"> 
      </p></div>
</div>
</div>


<div class="row" style="padding-right: 10%;padding-left: 5%;">
<div class="col-lg-6">
</div>
 <div class="col-lg-6"><br>
 <p id="ErrFirstName" class="text-danger"></p>
<p id="ErrSurname" class="text-danger"></p>
<p id="ErrEMail" class="text-danger"></p>
<p id="ErrTel_H" class="text-danger"></p>
<p> </p><p class="text-danger"> </p><p class=".bg-danger"> </p>
 <input type="submit" style="background-color: #90162a;color: white;" id="btn_newRegInfoContinue" name="btn_newRegInfoContinue" class="btn btn-default" value="Continue" data-toggle="modal" data-target=".bs-example-modal-sm">
 <input type="button" style="background-color: #90162a;color: white;" id="btnCancel" name="btnCancel" class="btn btn-default" value="Cancel" onclick="cancelThis('index.php');">
 </div>
 </div>
<input type="hidden" id="hdn_newRegInfo" name="hdn_newRegInfo" value="">
     </div>
</div></fieldset> -->

      <!-- <h2>Register For a Funeral Plan</h2>  -->
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="firstNames" style=" padding-right: 130px;">First Names:</label>
          <input class="form-control" v-model="firstNames" type="text" id="firstNames" style="border: 1px solid #ccc;"
            required />
          <!-- </div>
        <div class="form-group"> -->
          <label for="surname" style=" padding-right: 93px;margin-left: 10%;">Surname:</label>
          <input class="form-control" v-model="surname" type="text" id="surname" style="border: 1px solid #ccc;"
            required />
        </div>
        <div class="form-group">
          <label for="email" style=" padding-right: 177px;">Email:</label>
          <input class="form-control" v-model="email" type="email" id="email" style="border: 1px solid #ccc;" required />

          <label for="idNumber" style=" padding-right: 50px; margin-left: 10%;">Identity Number</label>
          <input class="form-control" v-model="idNumber" type="id" id="idNumber" style="border: 1px solid #ccc;"
            required />
        </div>
        <div class="form-group">
          <label for="contactPhoneNumber" style=" padding-right: 50px;">Contact Phone Number:</label>
          <input class="form-control" v-model="contactPhoneNumber" type="tel" id="contactPhoneNumber"
            style="border: 1px solid #ccc;" required />
        </div>
        <div style=" padding-bottom: 2rem; margin-top: 5rem;text-align: center;">
          <button type="submit"
            style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;">Continue</button>
          <button @click="cancel"
            style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Cancel</button>
          <div style=" max-width: 95%;font-size: 80%;text-align: end;">
            <a href="#" @click="openModal" style="color: black;">Need Help ?</a>
          </div>

          <!-- Use the reusable modal component -->
          <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal">
            <!-- Content of the modal goes here -->
            <p>Please confirm your contact details below and click the "Continue" button to proceed with the application
              or click the "Cancel" button to quit.</p>
            <p>- Riskfin Direct</p>
          </modal>

        </div>

      </form>
    </section>
  </div>
</template>


<script>
import { ref } from "vue";
import Modal from './help-modal.vue';

export default {
  name: 'FuneralPlanRegistration',
  setup() {
    const firstNames = ref('');
    const email = ref('');
    const contactPhoneNumber = ref('');
    const surname = ref('');
    const idNumber = ref('');
    const router = useRouter();


    const submitForm = () => {
      router.push({
        name: 'welcome',
        query: {
          firstNames: firstNames.value,
          email: email.value,
          contactPhoneNumber: contactPhoneNumber.value,
          surname: surname.value,
          idNumber: idNumber.value,

        },
      });
      console.log("query: " + query)
    };

    provide("formData", {
      firstNames,
      email,
      contactPhoneNumber,
      surname,
      idNumber,
      submitForm,
    });

    return {
      firstNames,
      email,
      contactPhoneNumber,
      surname,
      idNumber,
      submitForm,
    };
  },
  components: {
    Modal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style scoped>
form {
  display: block;
  margin-block-start: 0;
  padding-inline-start: 50px;
}

.form-input {
  padding: 10px;
  border: 0.2px solid #ccc;
  border-radius: 4px;

  /* inline-size: 100%; */
}

.form-group {
  margin: 20px;
}

.form-control {
  /* display: block; */
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  background-image: none;
  block-size: 34px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 7.5%);
  color: #555;
  font-size: 14px;
  inline-size: 25%;
  padding-inline: 10px;

  /* line-height: 1.42857143; */

  /* padding-block: 6px; */

  /* padding-inline: 12px; */

  /* transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; */
}

/* fieldset {
  display: block;
  padding: 0;
  border: 0;
  border-width: 2px;
  border-style: groove;
  border-color: rgb(192, 192, 192);
  margin: 0;
  border-image: initial;
  margin-inline-end: 2px;
  margin-inline-start: 2px;
  min-inline-size: 0;
  min-inline-size: min-content;
  padding-block-end: 0.625em;
  padding-block-start: 0.35em;
  padding-inline-end: 0.75em;
  padding-inline-start: 0.75em;
} */

/* Add your styling here */
</style>


<!-- 
--New vue3 code--

<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <h2 class="text-center">Register For a Funeral Plan</h2>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="firstNames" label="First Names" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="surname" label="Surname" required></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="email" label="Email" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="idNumber" label="Identity Number" required></v-text-field>
        </v-col>
      </v-row>

      <v-text-field v-model="contactPhoneNumber" label="Contact Phone Number" required></v-text-field>

      <v-row class="d-flex justify-center">
        <v-btn color="red" dark @click="submitForm">Continue</v-btn>
        <v-btn color="red" dark @click="cancel">Cancel</v-btn>
      </v-row>

      <div class="text-end mt-3">
        <v-dialog v-model="isModalOpen" max-width="500">
          <v-card>
            <v-card-title>What to do next?</v-card-title>
            <v-card-text>
              <p>Please confirm your contact details below and click the "Continue" button to proceed with the application or click the "Cancel" button to quit.</p>
              <p>- Riskfin Direct</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="red" dark @click="closeModal">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn color="primary" dark @click="openModal">Need Help ?</v-btn>
      </div>
    </v-form>
  </v-container>
</template> -->
