<script setup>
   import { ref, onMounted } from 'vue';
   import { fetchPaymentAccount, createPaymentAccount, updatePaymentAccount } from '../api/paymentAccount';
   import { textOnly, numbersOnly } from "../utilities/common"

   const accountData = ref(null);
   const accountHolder = ref("");
   const bank = ref("");
   const accountNr = ref(null);
   const branchCode = ref(null);
   const accountType = ref(null);
   const swiftCode = ref("");
   const reference = ref("");
   const buttonLabel = ref("Add Account Details");
   const editDialog = ref(false);
   const saved = ref(false);
   const spinner = ref(false);
   const editForm = ref({
      accountHolder: "",
      bank: "",
      accountNr: null,
      branchCode: null,
      accountType: "",
      swiftCode: "",
      reference: "",
   })

   const accountTypes = [
      { name: 'Savings' },
      { name: 'Cheque/Current' },
      { name: 'Transmission' }
   ];

   onMounted(() => {
      fetchPaymentAccount().then((data) => {
         if (data) {
            accountData.value = data
            buttonLabel.value = "Edit Account Details"
            if (data.account_holder) {
               accountHolder.value = data.account_holder;
               editForm.value.accountHolder = data.account_holder;
            }
            if (data.bank) {
               bank.value = data.bank;
               editForm.value.bank = data.bank;
            }
            if (data.account_nr) {
               accountNr.value = data.account_nr;
               editForm.value.accountNr = data.account_nr;
            }
            if (data.branch_code) {
               branchCode.value = data.branch_code;
               editForm.value.branchCode = data.branch_code;
            }
            if (data.account_type) {
               accountType.value = data.account_type;
               editForm.value.accountType = data.account_type;
            }
            if (data.swift_code) {
               swiftCode.value = data.swift_code;
               editForm.value.swiftCode = data.swift_code;
            }
            if (data.reference) { 
               reference.value = data.reference;
               editForm.value.reference = data.reference;
            }
         }
      });
   });


   const saveDetails = () => {
      saved.value = true;
      spinner.value = true;
      console.log(editForm.value.accountType)
      const isFormValid = editForm.value.accountHolder &&
         editForm.value.bank &&
         editForm.value.accountNr &&
         editForm.value.branchCode &&
         editForm.value.accountType &&
         editForm.value.swiftCode &&
         editForm.value.reference;

      if (accountData.value && isFormValid) {
         updatePaymentAccount({
            account_holder: editForm.value.accountHolder,
            bank: editForm.value.bank,
            account_nr: editForm.value.accountNr,
            branch_code: editForm.value.branchCode,
            account_type: editForm.value.accountType.name,
            swift_code: editForm.value.swiftCode,
            reference: editForm.value.reference
         })
      }
      else if (!accountData.value && isFormValid) {
         createPaymentAccount({
            account_holder: editForm.value.accountHolder,
            bank: editForm.value.bank,
            account_nr: editForm.value.accountNr,
            branch_code: editForm.value.branchCode,
            account_type: editForm.value.accountType.name,
            swift_code: editForm.value.swiftCode,
            reference: editForm.value.reference
         })
      }
      if (isFormValid) {
         accountHolder.value = editForm.value.accountHolder
         bank.value = editForm.value.bank
         accountNr.value = editForm.value.accountNr
         branchCode.value = editForm.value.branchCode
         accountType.value = editForm.value.accountType.name
         swiftCode.value = editForm.value.swiftCode
         reference.value = editForm.value.reference
         saved.value = false; 
         spinner.value = false; 
         editDialog.value = false;
      } 
      else {
         spinner.value = false;
      }
   }


   const intialFormState = () => ({
      accountHolder: "",
      bank: "",
      accountNr: null,
      branchCode: null,
      accountType: "",
      swiftCode: "",
      reference: "",
    });


    const closeDialog = () => {
      editForm.value = intialFormState();
      editDialog.value = false;
      saved.value = false;
   };

   // const validateText = (event, fieldName) => {
   //    editForm.value[fieldName] = event.target.value.replace(/[^A-Za-z\s]/g);
   // }

</script>


<template>
	<div class="p-grid">
		<div class="p-col-12">
			<Card>
            <template #title>
               <div style="display: flex; align-items: center; justify-content: space-between;" class="pb-4">
                  <span>Payment Account</span>
                  <Button 
                     :label="buttonLabel" 
                     icon="pi pi-plus" 
                     severity="info" 
                     @click="editDialog=true"
                  />
               </div>
            </template>

            <template #content>
               <div v-if="accountData">
                  <div class="shift-right">
                     <span class="bold-label ">Account Holder: </span> {{ accountHolder }}
                  </div>
                  <div class="shift-right">
                     <span class="bold-label">Account Number: </span> {{ accountNr }}
                  </div>  
                  <div class="shift-right">
                     <span class="bold-label">Bank: </span> {{ bank }}
                  </div>
                  <div class="shift-right">
                     <span class="bold-label">Branch Code: </span> {{ branchCode }}
                  </div>
                  <div class="shift-right">
                     <span class="bold-label">Account Type: </span> {{ accountType }}
                  </div>
                  <div class="shift-right">
                     <span class="bold-label">Swift Code: </span> {{ swiftCode }}
                  </div>
                  <div class="shift-right">
                     <span class="bold-label">Reference: </span> {{ reference }}
                  </div>
               </div>
               <div v-else>
                  <div>
                     <span class="bold-label">No account data. Please click on the button to add your account details.</span>
                  </div>
               </div>

               <Dialog :dismissableMask="true" v-model:visible="editDialog" :style="{width: '500px'}" header="Edit Details" :modal="true" class="p-fluid">
                  <div class="formgrid grid">
                     <div class="col-6 pb-3">
                        <label for="accountHolder" class="bold-label">Account Holder</label>
                        <InputText 
                           id="accountHolder"
                           v-model.trim="editForm.accountHolder" 
                           required="true" 
                           autofocus :class="{'p-invalid': saved && !editForm.accountHolder}" 
                        />
                        <small class="p-error" v-if="saved && !editForm.accountHolder">Account Holder is required.</small>
                        <small class="p-error" v-if="saved && !textOnly(editForm.accountHolder)">Only letters are allowed.</small>
                     </div>
                     <div class="col-6 pb-3">
                        <label for="accountNumber" class="bold-label">Account Number</label>
                        <InputText
                           :useGrouping="false"
                           id="accountNr" 
                           v-model.trim="editForm.accountNr" 
                           required="true" 
                           :maxlength="12"
                           autofocus :class="{'p-invalid': saved && !editForm.accountNr}" 
                        />
                        <small class="p-error" v-if="saved && !editForm.accountNr">Account Number is required.</small>
                        <small class="p-error" v-if="saved && !numbersOnly(editForm.accountNr)">Only numbers are allowed.</small>
                     </div>
                  </div>
                  <div class="formgrid grid">
                     <div class="col-6 pb-3">
                        <label for="bank" class="bold-label">Bank</label>
                        <InputText 
                           id="bank" 
                           v-model.trim="editForm.bank" 
                           required="true" 
                           autofocus :class="{'p-invalid': saved && !editForm.bank}" 
                        />
                        <small class="p-error" v-if="saved && !editForm.bank">Bank is required.</small>
                        <small class="p-error" v-if="saved && !textOnly(editForm.bank)">Only letters are allowed.</small>
                     </div>
                     <div class="col-6 pb-3">
                        <label for="accountType" class="bold-label">Account Type</label>
                        <Dropdown 
                           v-model="editForm.accountType" 
                           optionLabel="name"
                           :options="accountTypes" 
                           placeholder="Select an account type"
                           autofocus :class="{'p-invalid': saved && !editForm.accountType}" 
                        />
                        <small class="p-error" v-if="saved && !editForm.accountType">Account Type is required.</small>
                     </div>
                     </div>
                     <div class="formgrid grid">
                        <div class="col-6 pb-3">
                           <label for="branchCode" class="bold-label">Branch Code</label>
                           <InputText 
                              id="branchCode" 
                              v-model.trim="editForm.branchCode" 
                              required="true" 
                              autofocus :class="{'p-invalid': saved && !editForm.branchCode}" 
                           />
                           <small class="p-error" v-if="saved && !editForm.branchCode">Branch Code is required.</small>
                           <small class="p-error" v-if="saved && !numbersOnly(editForm.accountNr)">Only numbers are allowed.</small>
                        </div>
                        <div class="col-6 pb-3">
                           <label for="swiftCode" class="bold-label">Swift Code</label>
                           <InputText 
                              id="swiftCode" 
                              v-model.trim="editForm.swiftCode" 
                              required="true" 
                              autofocus :class="{'p-invalid': saved && !editForm.swiftCode}" 
                           />
                           <small class="p-error" v-if="saved && !editForm.swiftCode">Swift Code is required.</small>
                        </div>
                     </div>
                     <div class="field col-12">
                        <label for="reference" class="bold-label">Reference</label>
                        <Textarea  id="reference" v-model.trim="editForm.reference" required="true" autofocus :class="{'p-invalid': saved && !editForm.reference}" />
                        <small class="p-error" v-if="saved && !editForm.reference">Reference is required.</small>
                     </div>
                     <ProgressSpinner  v-if="spinner"/>
                     <template #footer>
                           <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                           <Button label="Save" icon="pi pi-check" text @click="saveDetails" />
                     </template>
               </Dialog>
            </template>
         </Card>
      </div>
   </div>
</template>

<style scoped>

</style>
