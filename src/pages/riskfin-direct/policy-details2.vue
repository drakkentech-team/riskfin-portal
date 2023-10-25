<template>
  <div class="progress-bar">
    <div class="step" v-for="(step, index) in steps" :key="index">
      {{ step }}
      <div class="step-indicator" :class="{ done: index < currentStep }"></div>
    </div>
  </div>


  <div>
    <h1 class="text-center mt-4 mb-4" style="color: #262626;">Policy Details</h1>
    <form @submit.prevent="nextPage" action="./debit-order-details" method="POST">
      <div class="container-fluid" style="width: 90%; border: 2px solid black; margin: 0 auto; overflow-y: auto;">
        <table class="table table-condensed table-responsive">
          <thead>
            <tr style="background-color: #90162a; color: white; font-weight: bold;">
              <th></th>
              <th>Name</th>
              <th>Surname</th>
              <th>ID No.</th>
              <th>Relationship</th>
              <th>Premium</th>
              <th>Cover Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Main Member Row -->
            <tr style="background-color: #90162a;color: white;font-style: bold;">
              <td></td>
              <td style="text-align: start;">{{ userData.name }}</td>
              <td style="text-align: start;"> {{ userData.surname }}</td>

              <td style="text-align: start;">{{ userData.id }}</td>
              <td style="text-align: start;"> Member </td>
              <td class="td-inner-data" style="text-align: end;"> R 73.00</td>
              <td class="td-inner-data" style="width: 150px;text-align: end;"> R 5,000.00</td>
              <td class="td-inner-data" style="width: 75px;background-color: white;"><a href="#"
                  onclick="viewMainMemberData(73);" data-toggle="modal" data-target="#MemberViewModel"
                  data-whatever="@mdo">View</a> | <a href="#" data-toggle="modal" onclick="viewMainMemberData(73);"
                  data-target="#MemberViewModel" data-whatever="@mdo">Edit</a> | </td>
            </tr>

            <!-- Spouse Row (conditionally rendered) -->
            <tr v-if="spouseDataProvided" style="background-color: #90162a;color: white;font-style: bold;">
              <td></td>
              <td style="text-align: start;">{{ spouseData.name }}</td>
              <td style="text-align: start;">{{ spouseData.surname }}</td>

              <td style="text-align: start;">{{ spouseData.id }}</td>
              <td style="text-align: start;"> Spouse </td>
              <td class="td-inner-data" style="text-align: end;">R 0.00</td>
              <td class="td-inner-data" style="width: 150px;text-align: end;"> R 5,000.00</td>
              <td class="td-inner-data" style="width: 75px;background-color: white;"><a href="#"
                  onclick="viewSpouseMemberData(8);" data-toggle="modal" data-target="#SpouseViewModel"
                  data-whatever="@mdo">View</a> | <a href="#" onclick="viewSpouseMemberData(8);" data-toggle="modal"
                  data-target="#SpouseViewModel" data-whatever="@mdo">Edit</a> | <a href="#"
                  onclick="deleteSpouseMemberDets(8);">Del</a></td>
            </tr>

            <!-- Child Row (conditionally rendered) -->
            <tr v-if="childDataProvided" style="background-color: #90162a;color: white;font-style: bold;">
              <td></td>
              <td style="text-align: start;">{{ childData.name }}</td>
              <td style="text-align: start;">{{ childData.surname }}</td>

              <td style="text-align: start;">{{ getChildData.id }}</td>
              <td style="text-align: start;"> Child </td>
              <td class="td-inner-data" style="text-align: end;">R 0.00</td>
              <td class="td-inner-data" style="width: 150px;text-align: end;">R 5,000.00</td>
              <td class="td-inner-data" style="width: 75px;background-color: white;"><a href="#"
                  onclick="viewChildMemberData(15);" data-toggle="modal" data-target="#ChildViewModel"
                  data-whatever="@mdo">View</a> | <a href="#" data-toggle="modal" onclick="viewChildMemberData(15);"
                  data-target="#ChildViewModel" data-whatever="@mdo">Edit</a> | <a href="#" data-toggle="modal"
                  onclick="deleteChilrenMemberDets(15);">Del</a></td>
            </tr>

            <!-- Extended Child Row (conditionally rendered) -->
            <tr v-if="extendedChildDataProvided" style="background-color: #90162a;color: white;font-style: bold;">
              <td></td>
              <td style="text-align: start;">{{ childData.name }}</td>
              <td style="text-align: start;">{{ childData.surname }}</td>

              <td style="text-align: start;">{{ getChildData.id }}</td>
              <td style="text-align: start;"> Child </td>
              <td class="td-inner-data" style="text-align: end;">R 0.00</td>
              <td class="td-inner-data" style="width: 150px;text-align: end;">R 5,000.00</td>
              <td class="td-inner-data" style="width: 75px;background-color: white;"><a href="#"
                  onclick="viewChildMemberData(15);" data-toggle="modal" data-target="#ChildViewModel"
                  data-whatever="@mdo">View</a> | <a href="#" data-toggle="modal" onclick="viewChildMemberData(15);"
                  data-target="#ChildViewModel" data-whatever="@mdo">Edit</a> | <a href="#" data-toggle="modal"
                  onclick="deleteChilrenMemberDets(15);">Del</a></td>
            </tr>

            <!-- Total Premium Row -->
            <tr style="background-color: #90162a; color: white; font-weight: bold;">
              <td colspan="3"></td>
              <td class="td-inner-data">Administration fee</td>
              <td class="td-inner-data">R 10.00</td>
              <td></td>
              <td style="background-color: white;"></td>
            </tr>
            <tr style="background-color: #90162a; color: white; font-weight: bold;">
              <td colspan="3"></td>
              <td class="td-inner-data">Total Premium</td>
              <td class="td-inner-data">R 83.00</td>
              <td></td>
              <td style="background-color: white;"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Form controls and buttons go here -->
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getUserData', 'getSpouseData', 'getChildData']),
    spouseDataProvided() {
      // Return a boolean indicating whether spouseData is provided
      return Boolean(this.getSpouseData);
    },
    childDataProvided() {
      // Return a boolean indicating whether childData is provided
      return Boolean(this.getChildData);
    },
    extendedChildDataProvided() {
      // Return a boolean indicating whether extendedChildData is provided
      // You can implement similar checks for extended child data if needed
      return false; // Replace with your actual check
    },
  },
  methods: {
    nextPage() {
      this.$router.push('./debit-order-details');
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.userData = this.getUserData;
    this.spouseData = this.getSpouseData;
    this.childData = this.getChildData;
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
