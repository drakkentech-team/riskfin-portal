<script setup>
   import { ref, onMounted } from 'vue';
   import { mobileUserData } from '../api/userManagement/mobileAppUsers';

   const userData = ref(null);
   const user = ref(null);
   const editDialog = ref(false);
   const saved = ref(false);

   onMounted(() => {
      mobileUserData().then((data) => {
        userData.value = data;
      });
   });

   const editUser = (data) => {
      user.value = {...data};
      editDialog.value = true;
   };

   const saveUser = () => {
      saved.value = true;

      if (user.value.first_name.trim()) {
         if (user.value.sid) {
            userData.value[findIndexById(user.value.id)] = user.value;
            toast.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
         }
         editDialog.value = false;
         user.value = {};
      }
   };

   const closeDialog = () => {
      editDialog.value = false;
      saved.value = false;
   };

</script>

<template>
	<div class="p-grid">
		<div class="p-col-12">
			<Card>
            <template #title> Mobile App Users </template>
               <template #content>
                  <DataTable 
                     :value="userData"
                     paginator :rows="5" 
                     :rowsPerPageOptions="[5, 10, 20, 50]"
                     tableStyle="min-width: 50rem"
                  >
                     <Column field="user_sid" header="ID"></Column>
                     <Column field="first_name" header="Name"></Column>
                     <Column field="last_name" header="Surname"></Column>
                     <Column field="active_policy" header="Active Products">
                        <template #body="slotProps">
                           <div v-for="(policy, index) in slotProps.data.active_policy" :key="index">
                              • {{ policy.policy_name }}
                           </div>
                        </template>
                     </Column>
                     <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                           <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editUser(slotProps.data)" />
                           <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                     </Column>
                  </DataTable>

                  <Dialog :dismissableMask="true" v-model:visible="editDialog" :style="{width: '450px'}" header="User Details" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="name" class="bold-label">Name</label>
                           <InputText id="name" v-model.trim="user.first_name" required="true" autofocus :class="{'p-invalid': saved && !user.first_name}" />
                           <small class="p-error" v-if="saved && !user.first_name">Name is required.</small>
                        </div>
                        <div class="field col">
                           <label for="surname" class="bold-label">Surname</label>
                           <InputText id="name" v-model.trim="user.last_name" required="true" autofocus :class="{'p-invalid': saved && !user.last_name}" />
                           <small class="p-error" v-if="saved && !user.last_name">Surname is required.</small>
                        </div>
                     </div>
                     <div class="field">
                        <label for="email" class="bold-label">Email</label>
                        <InputText id="email" v-model.trim="user.email" required="true" autofocus :class="{'p-invalid': saved && !user.email}" />
                        <small class="p-error" v-if="saved && !user.email">Email is required.</small>
                     </div>
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="id" class="bold-label">ID</label>
                           <InputText id="id" v-model.trim="user.id" required="true" autofocus :class="{'p-invalid': saved && !user.id}" />
                           <small class="p-error" v-if="saved && !user.id">ID is required.</small>
                        </div>
                        <div class="field col">
                           <label for="contact_number" class="bold-label">Contact Number</label>
                           <InputText id="contact_number" v-model.trim="user.contact_number" required="true" autofocus :class="{'p-invalid': saved && !user.contact_number}" />
                           <small class="p-error" v-if="saved && !user.contact_number">Contact Number is required.</small>
                        </div>
                     </div>
                     <div class="field">
                        <label for="organisation" class="bold-label">Organisation</label>
                        <InputText id="organisation" v-model.trim="user.organisation" required="true" autofocus :class="{'p-invalid': saved && !user.organisation}" />
                        <small class="p-error" v-if="saved && !user.organisation">Organisation is required.</small>
                     </div>
                     <div class="field">
                        <DataTable 
                           :value="[user][0].active_policy"
                           tableStyle="width: 390px"
                        >
                           <Column field="policy_name" header="Policy"></Column>
                           <Column :exportable="false" style="min-width:8rem">
                              <template #body="slotProps">
                                 <Button icon="pi pi-trash" class="p-button-outlined p-button-rounded" severity="danger" />
                              </template>
                           </Column>
                        </DataTable>
                     </div>
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                        <Button label="Save" icon="pi pi-check" text @click="saveUser" />
                     </template>
               </Dialog>
               </template>
         </Card>
		</div>
	</div>
</template>

