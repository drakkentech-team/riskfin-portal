<!-- <template>
  <div>
    -- Table with user data --
    <table>
      <tr>
        <td>{{ userData.name }}</td>
        <td>{{ userData.surname }}</td>
        -- Other user data fields --
        <td>
          <a href="#" @click="openMainMemberDetailsModal">View</a>
        </td>
      </tr>
    </table>

    -- Main Member Details Modal --
    <main-member-details-modal
      :userData="userData"
      :isOpen="isMainMemberDetailsModalOpen"
      @close="closeMainMemberDetailsModal"
    ></main-member-details-modal>
  </div>
</template>

<script>
import MainMemberDetailsModal from './form-modals/MainMemberDetailsModal.vue'; // Import your modal component

export default {
  data() {
    return {
      userData: {
        name: 'John',
        surname: 'Doe',
        // Other user data fields
      },
      isMainMemberDetailsModalOpen: false,
    };
  },
  methods: {
    openMainMemberDetailsModal() {
      this.isMainMemberDetailsModalOpen = true;
    },
    closeMainMemberDetailsModal() {
      this.isMainMemberDetailsModalOpen = false;
    },
  },
  components: {
    MainMemberDetailsModal,
  },
};
</script> -->


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
    <h1 style="margin-top: 2rem; margin-bottom: 10px; color: #262626; text-align: center;">Policy Details</h1>
    <form @submit.prevent="nextPage" action="./debit-order-details" method="POST">
      <div id="FormPolicySelection">

        <div class="container-fluid"
          style="overflow: scroll;width: 90%;height: 375px;padding: 10px;  border: 2px solid black;margin: 0 auto;">

          <div class="row">
            <div class="col-md-12">
              <center>
                <h3 style="color: #90162a;">Policy Underwritten by : Safrican</h3>
              </center>
              <table class="table table-condensed table-responsive">
                <thead>
                  <tr style="color: #90162a;">
                    <th></th>
                    <th style="text-align: start;"> Name </th>
                    <th style="text-align: start;"> Surname </th>
                    <th style="text-align: start;" class="td-inner-data"> ID No. </th>
                    <th style="text-align: start;"> Relationship </th>
                    <th style="text-align: end;"> Premium </th>
                    <th style="text-align: end;" class="td-inner-data"> Cover Amount </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Main member row -->
                  <tr style="background-color: #90162a; color: white; font-weight: bold;">
                    <td></td>
                    <td style="text-align: start;">{{ userData.first_name }}</td>
                    <td style="text-align: start;">{{ userData.surname }}</td>
                    <td style="text-align: start;">{{ userData.id }}</td>
                    <td style="text-align: start;">Member</td>
                    <td class="td-inner-data" style="text-align: end;">{{ getSelectedPremium }}</td>
                    <td class="td-inner-data" style="width: 150px; text-align: end;">{{ getSelectedCover }}</td>
                    <!-- <td class="td-inner-data" style="width: 75px; background-color: white;"> -->
                    <!-- @click="viewMemberData(userData);"  -->
                    <!-- <a href="#" @click="openModal">View</a> |
    <a href="#" @click="editMemberData(userData);" data-toggle="modal" data-target="#MemberViewModel"
       data-whatever="@mdo">Edit</a> |
  </td> -->
                    <!-- <td class="td-inner-data" style="width: 75px; background-color: white;">
  <a href="#" @click="viewMainMemberDetails(userData)">View</a> |
  <a href="#" @click="editMemberData(userData);" data-toggle="modal" data-target="#MemberViewModel" data-whatever="@mdo">Edit</a> |
</td> -->
                    <td class="td-inner-data" style="width: 110px; background-color: white;">
                      <!-- <router-link :to="'./main-member-details'">View</router-link> | -->
                      <a href="#" @click="openMainMemberDetailsModal">View</a> |
                      <a href="#" @click="editMemberData(userData);" data-toggle="modal" data-target="#MemberViewModel"
                        data-whatever="@mdo">Edit</a> |
                    </td>
                    <!-- <td class="td-inner-data" style="width: 75px; background-color: white;">
  <a href="#" @click="openModal">View</a> |
  <a href="#" @click="editMemberData(userData);" data-toggle="modal" data-target="#MemberViewModel" data-whatever="@mdo">Edit</a> |
</td> -->
                  </tr>

                  <!-- Main Member Details Modal -->
                  <!-- <main-member-details-modal
      :userData="userData"
      :isOpen="isMainMemberDetailsModalOpen"
      @close="closeMainMemberDetailsModal"
    ></main-member-details-modal> -->
                  <!-- </div> -->

                  <!-- modal component -->
                  <!-- <modal :is-open="isModalOpen" title="View?" @close="closeModal"> -->
                  <!-- Content of the modal goes here -->
                  <!-- this.$router.push('./main-member-details'); -->
                  <!-- </modal> -->


                  <!-- Spouse row -->
                  <tr v-if="spouseData && Object.keys(spouseData).length > 0"
                    style="background-color: #90162a; color: white; font-weight: bold;">
                    <td></td>
                    <td style="text-align: start;">{{ spouseData.name }}</td>
                    <td style="text-align: start;">{{ spouseData.surname }}</td>
                    <td style="text-align: start;">{{ spouseData.idNumber }}</td>
                    <td style="text-align: start;">{{ spouseData.relationship }}</td>
                    <td class="td-inner-data" style="text-align: end;">R 0.00</td>
                    <td class="td-inner-data" style="width: 150px; text-align: end;">{{ getSelectedCover }}</td>
                    <td class="td-inner-data" style="width: 75px; background-color: white;">
                      <a href="#" @click="openSpouseDetailsModal">View</a> |
                      <a href="#" @click="editSpouseData(spouseData);" data-toggle="modal" data-target="#SpouseViewModel"
                        data-whatever="@mdo">Edit</a> |
                      <a href="#" @click="deleteMemberData(spouseData.id);" data-toggle="modal"
                        data-target="#SpouseViewModel" data-whatever="@mdo">Del</a>
                    </td>
                  </tr>

                  <!-- Child rows -->
                  <tr v-for="(child, index) in childData" :key="index"
                    style="background-color: #90162a; color: white; font-weight: bold;">
                    <td></td>
                    <td style="text-align: start;">{{ child.name }}</td>
                    <td style="text-align: start;">{{ child.surname }}</td>
                    <td style="text-align: start;">{{ child.idNumber }}</td>
                    <td style="text-align: start;">{{ child.relationship }}</td>
                    <td class="td-inner-data" style="text-align: end;">R 0.00</td>
                    <td class="td-inner-data" style="width: 150px; text-align: end;">{{ getSelectedCover }}</td>
                    <td class="td-inner-data" style="width: 125px; background-color: white;">
                      <a href="#" @click="openChildDetailsModal">View</a> |
                      <a href="#" @click="editChildData(child);" data-toggle="modal"
                        :data-target="'#ChildViewModel' + index" data-whatever="@mdo">Edit</a> |
                      <a href="#" @click="deleteMemberData(child.id);" data-toggle="modal"
                        :data-target="'#ChildViewModel' + index" data-whatever="@mdo">Del</a>
                    </td>
                  </tr>

                  <!-- <tr style="background-color: #90162a;color: white;font-style: bold;">
                    <td></td>
                    <td style="text-align: start;">{{ userData.name }}</td>
                    <td style="text-align: start;"> {{ userData.surname }}</td>

                    <td style="text-align: start;">{{ userData.id }}</td>
                    <td style="text-align: start;"> Member </td>
                    <td class="td-inner-data" style="text-align: end;"> {{ getSelectedPremium }}</td>
                    <td class="td-inner-data" style="width: 150px;text-align: end;"> {{ getSelectedCover }}</td>
                    <td class="td-inner-data" style="widt+ackground-color: white;"><a href="#"
                        onclick="viewMainMemberData(73);" data-toggle="modal" data-target="#MemberViewModel"
                        data-whatever="@mdo">View</a> | <a href="#" data-toggle="modal" onclick="viewMainMemberData(73);"
                        data-target="#MemberViewModel" data-whatever="@mdo">Edit</a> | </td>
                  </tr>
                  <tr style="background-color: #90162a;color: white;font-style: bold;">
                    <td></td>
                    <td style="text-align: start;">{{ getSpouseData.name }}</td>
                    <td style="text-align: start;">{{ getSpouseData.surname }}</td>

                    <td style="text-align: start;">{{ getSpouseData.idNumber }}</td>
                    <td style="text-align: start;"> {{ getSpouseData.relationship }} </td>
                    <td class="td-inner-data" style="text-align: end;">R 0.00</td>
                    <td class="td-inner-data" style="width: 150px;text-align: end;">{{ getSelectedCover }}</td>
                    <td class="td-inner-data" style="width: 75px;background-color: white;"><a href="#"
                        onclick="viewSpouseMemberData(8);" data-toggle="modal" data-target="#SpouseViewModel"
                        data-whatever="@mdo">View</a> | <a href="#" onclick="viewSpouseMemberData(8);" data-toggle="modal"
                        data-target="#SpouseViewModel" data-whatever="@mdo">Edit</a> | <a href="#"
                        onclick="deleteSpouseMemberDets(8);">Del</a></td>
                  </tr>
                  <tr style="background-color: #90162a;color: white;font-style: bold;">
                    <td></td>
                    <td style="text-align: start;">{{ getChildData[0].name }}</td>
                    <td style="text-align: start;">{{ getChildData[0].surname }}</td>

                    <td style="text-align: start;">{{ getChildData[0].idNumber }}</td>
                    <td style="text-align: start;"> {{ getChildData[0].relationship }} </td>
                    <td class="td-inner-data" style="text-align: end;">R 0.00</td>
                    <td class="td-inner-data" style="width: 150px;text-align: end;">{{ getSelectedCover }}</td>
                    <td class="td-inner-data" style="width: 125px;background-color: white;"><a href="#"
                        onclick="viewChildMemberData(15);" data-toggle="modal" data-target="#ChildViewModel"
                        data-whatever="@mdo">View</a> | <a href="#" data-toggle="modal" onclick="viewChildMemberData(15);"
                        data-target="#ChildViewModel" data-whatever="@mdo">Edit</a> | <a href="#" data-toggle="modal"
                        onclick="deleteChilrenMemberDets(15);">Del</a></td>
                  </tr> -->

                  <!-- Main Member Details Modal -->
                  <main-member-details-modal :userData="userData" :isOpen="isMainMemberDetailsModalOpen"
                    @close="closeMainMemberDetailsModal"></main-member-details-modal>


                  <!-- Child Details Modal -->
                  <child-details-modal :childData="childData" :isOpen="isChildDetailsModalOpen"
                    @close="closeChildDetailsModal"></child-details-modal>

                  <!-- Spouse Details Modal -->
                  <spouse-details-modal :spouseData="spouseData" :isOpen="isSpouseDetailsModalOpen"
                    @close="closeSpouseDetailsModal"></spouse-details-modal>


                  <tr style="background-color: #90162a;color: white;font-style: bold;">
                    <td></td>
                    <td colspan="3"></td>
                    <td style="text-align: start;" class="td-inner-data">Administration fee </td>
                    <td style="text-align: end;" class="td-inner-data">R 10.00</td>
                    <td></td>
                    <td style="background-color: white;"></td>
                  </tr>
                  <tr style="background-color: #90162a;color: white;font-style: bold;">
                    <td></td>
                    <td colspan="3"></td>
                    <td class="td-inner-data" style="text-align: start;"> Total Premium </td>
                    <td class="td-inner-data" style="text-align: end;"> R {{ totalPremium }}</td>
                    <td></td>
                    <td style="background-color: white;"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top: 1%;">
        <form method="post" id="FrmPolicyDets" name="FrmPolicyDets" class="role">
          <div class="col-lg-1"></div>
          <div class="col-lg-11">

            <div class="row">
              <div class="col-lg-12">
                <span id="ErrSpan"></span>
              </div>
            </div>

            <div class="row" style="display: flex;  justify-content: space-around;">

              <div class="col-lg-5">
                <div class="checkbox">
                  <label>
                    <input name="Accept_Terms_Conditions" id="Accept_Terms_Conditions" type="checkbox"
                      style="width: 1.5rem;" required>I accept the terms
                    and conditions
                  </label>
                </div>

              </div>
              <div class="col-lg-4">


                <a href="" target="_blank"> <input type="button" style="width: 15rem;" id="display_Terms_Conditions"
                    name="display_Terms_Conditions" class="btn btn-default" value="Display Terms and Conditions"></a>

              </div>
              <div class="col-lg-3">

                <input type="hidden" id="hdn_FrmPolicyList" name="hdn_FrmPolicyList" value="">

                <!-- <input type="submit" id="btn_Form1Next" name="btn_Form1Next" class="btn btn-default" value="Continue" >
                <input type="button" id="btnCancel" name="btnCancel" class="btn btn-default" value="Cancel"
                  onclick="goBack();"> -->
                <input type="button" style="background-color: #90162a;color: white;" id="btn_newRegInfoContinue"
                  name="btn_newRegInfoContinue" class="btn btn-default" value="Continue" @click="nextPage">


                <input type="button" style="background-color: #90162a;color: white;" id="btnCancel" name="btnCancel"
                  class="btn btn-default" value="Back" @click="goBack">
              </div>
            </div>

          </div>
        </form>
      </div>
    </form>
  </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
// import Modal from './help-modal.vue';
import ChildDetailsModal from './form-modals/ChildModal.vue';
import MainMemberDetailsModal from './form-modals/MainMemberDetailsModal.vue'; // Import your modal component
import SpouseDetailsModal from './form-modals/SpouseModal.vue';

export default {
  computed: {
    ...mapGetters(['getUserData', 'getSpouseData', 'getChildData', 'getSelectedPremium', 'getSelectedCover']),

    totalPremium() {
      const premiumValue = parseFloat(this.getSelectedPremium); // Parse the premium value to a float
      const administrationValue = 10.00;
      const total = premiumValue + administrationValue;
      return total.toFixed(2);

    }

  },
  data() {
    return {
      currentStep: 4,
      steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
      storedData: {
        firstNames: '',
        surname: '',
        idNumber: '',
      },
      isMainMemberDetailsModalOpen: false,
      isChildDetailsModalOpen: false,
      isSpouseDetailsModalOpen: false,
    };
  },
  // components: {
  //   Modal,
  // },
  methods: {

    goBack() {

      this.$router.go(-1);
    },

    nextPage() {
      // console.log(getChildData);
      this.$router.push('./debit-order-details');
    },

    openMainMemberDetailsModal() {
      this.isMainMemberDetailsModalOpen = true;
    },
    editMemberData(userData) {
      this.isMainMemberDetailsModalOpen = true;
    },
    openChildDetailsModal() {
      this.isChildDetailsModalOpen = true;
    },
    editChildData(child) {
      this.isChildDetailsModalOpen = true;
    },
    openSpouseDetailsModal() {
      this.isSpouseDetailsModalOpen = true;
    },
    editSpouseData(spouseData) {
      this.isSpouseDetailsModalOpen = true;
    },
    closeMainMemberDetailsModal() {
      this.isMainMemberDetailsModalOpen = false;
    },
    closeChildDetailsModal() {
      this.isChildDetailsModalOpen = false;
    },
    closeSpouseDetailsModal() {
      this.isSpouseDetailsModalOpen = false;
    },
    // openModal() {
    //   this.isModalOpen = true;
    // },
    // closeModal() {
    //   this.isModalOpen = false;
    // },
    // viewMainMemberDetails(userId) {
    // Use programmatic navigation to go to the ../main-member-details/:id route
    //   this.$router.push({ path: `./main-member-details` });
    // },
    // editMemberData(userData) {
    // Your editMemberData logic here
    // }
    // viewMainMemberDetails() {
    // Use programmatic navigation to go to the ../main-member-details route
    //   this.$router.push('./main-member-details');
    // },
    // editMemberData(userData) {
    // Your editMemberData logic here
    // }
  },
  components: {
    MainMemberDetailsModal,
    SpouseDetailsModal,
    ChildDetailsModal,

  },
  created() {
    this.userData = this.getUserData;
    this.spouseData = this.getSpouseData;
    this.childData = this.getChildData;
    this.selectedCover = this.getSelectedCover;
    this.selectedPremium = this.getSelectedPremium;
  },
};
</script>
  
<style lang="scss">
table {
  inline-size: 90%;
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
  padding: 5px;
  border: 0.2px solid #ccc;
  border-radius: 4px;
}

.btn {
  background-color: #90162a;
  color: white;
  inline-size: 6vw;
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
  
