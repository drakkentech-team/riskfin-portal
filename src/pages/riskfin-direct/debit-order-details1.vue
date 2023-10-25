<template>
  <div>
    <h1>Debit Order Details</h1>
    <form @submit.prevent="nextPage">
      <div class="form-group">
        <label for="AccountHolder">Account Holder Initials</label>
        <input type="text" id="AccountHolder" class="form-control" name="AccountHolder"
          v-model="storedData.AccountHolder">
      </div>

      <div class="form-group">
        <label for="BankName">Bank Name</label>
        <select class="form-control" id="BankName" name="BankName" v-model="storedData.BankName">
          <option value="ABSA Bank">ABSA Bank</option>
          <!-- Add other essential bank options here -->
        </select>
      </div>

      <div class="form-group">
        <label for "BranchName">Branch Name</label>
        <select class="form-control" id="BranchName" name="BranchName" v-model="storedData.BranchName">
          <option value="ABSA Bank - All Branches">ABSA Bank - All Branches</option>
          <!-- Add other essential branch options here -->
        </select>
      </div>

      <div class="form-group">
        <label for="BranchCode">Branch Code</label>
        <input type="text" id="BranchCode" class="form-control" name="BranchCode" v-model="storedData.BranchCode">
      </div>

      <div class="form-group">
        <label for="AccountNo">Account Number</label>
        <input type="text" id="AccountNo" class="form-control" name="AccountNo" v-model="storedData.AccountNo">
      </div>

      <button type="submit">Continue</button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      storedData: {
        AccountHolder: '',
        BankName: 'ABSA Bank',
        BranchName: 'ABSA Bank - All Branches',
        BranchCode: '',
        AccountNo: '',
      },
    };
  },
  methods: {
    nextPage() {
      // Handle the submission of essential banking details

      // Prepare the data for submission to the server
      const userData = {
        AccountHolder: this.storedData.AccountHolder,
        BankName: this.storedData.BankName,
        BranchName: this.storedData.BranchName,
        BranchCode: this.storedData.BranchCode,
        AccountNo: this.storedData.AccountNo,
      };

      // Now, you can submit this data to your server for secure storage
    },
  },
};
</script>
