<script setup>
   import { ref, onMounted } from 'vue';
   import { fetchAdminPortalUsers, createAdminPortalUser, updateAdminPortalUser, deleteAdminPortalUser } from '../api/adminPortalUsers';
   import { useConfirm } from "primevue/useconfirm";
   import ConfirmDialog from 'primevue/confirmdialog';
   import { useToast } from "primevue/usetoast";

   const confirm = useConfirm();


   const users = ref(null);
   const user = ref(null);
   const editDialog = ref(false);
   const newDialog = ref(false);
   const saved = ref(false);
   const toast = useToast();

   const findIndexById = (id) => {
      return users.value.findIndex(user => user.id === id);
   };

   const newUser = ref({
      name: '',
      surname: '',
      email: '',
      password: '',
      admin: false,
      active: true
   })

   const editCurrentUser = ref({
      first_name: '',
      last_name: '',
      email: '',
      admin: false,
      // active: true,
      sid: 0
   })

   onMounted(() => {
      fetchAdminPortalUsers().then((data) => {
         users.value = data;
      });
   });

   const editUser = (data) => {
      user.value = {...data};
      editCurrentUser.value.first_name = data.first_name;
      editCurrentUser.value.last_name = data.last_name;
      editCurrentUser.value.email = data.email;
      editCurrentUser.value.sid = data.sid;
      if (data.admin === 1) {
         editCurrentUser.value.admin = true;
      } else {
         editCurrentUser.value.admin = false;
      }
      editDialog.value = true;
   };

   const saveUser = async () => {
      saved.value = true;

      if (user.value.first_name.trim()) {
         if (user.value.sid) {
            users.value[findIndexById(user.value.id)] = user.value;
            const isValid =
               user.value.first_name.trim() &&
               user.value.last_name.trim() &&
               user.value.email.trim()
               if (isValid) {
                  const propertiesToCheck = ['first_name', 'last_name', 'email', 'admin'];
                  // Loop to compare and delete properties
                  propertiesToCheck.forEach(property => {
                  const userValue = typeof user.value[property] === 'string' ? user.value[property].trim() : user.value[property];
                  const editUserValue = typeof editCurrentUser.value[property] === 'string' ? editCurrentUser.value[property].trim() : editCurrentUser.value[property];

                  if (userValue === editUserValue) {
                  delete editCurrentUser.value[property];
                  }
               });
                  if (user.value.admin === 1 && editCurrentUser.value.admin === true){
                     delete editCurrentUser.value.admin;
                  } else if (user.value.admin === 2 && editCurrentUser.value.admin === false){
                     delete editCurrentUser.value.admin;
                  }
                  if (user.value.admin === 1 && editCurrentUser.value.admin === false){
                     editCurrentUser.value.admin = 2;
                  } else if (user.value.admin === 2 && editCurrentUser.value.admin === true){
                     editCurrentUser.value.admin = 1;
                  }

                  try {
                     await updateAdminPortalUser({...editCurrentUser.value.sid,
                        ...editCurrentUser.value,
                     });
                  } catch (error) {
                     toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.message
                     })
                  } finally {
                     users.value = await fetchAdminPortalUsers();
                     saved.value = false;
                     editDialog.value = false;
                     // newDialog.value = false;
                     // newUser.value = blankNewUser();
                  }
               }
            toast.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
         }
         editDialog.value = false;
         user.value = {};
      }
   };

   const closeDialog = () => {
      editDialog.value = false;
      newDialog.value = false;
      saved.value = false;
   };
   const handleClick = (data) => {
    if (data.active === 0) {
      confirmActivateUser(data);
    } else {
      confirmDeleteUser(data);
    }
  }

   const confirmActivateUser = (userData) => {
      confirm.require({
         message: 'Are you sure you want to activate this user?',
         header: 'Confirmation',
         icon: 'pi pi-exclamation-triangle',
         accept: async () => {
            try {
               let newData = { "sid": userData.sid, "active": 1 };
               await updateAdminPortalUser(newData, { active: 1 });
               users.value = await fetchAdminPortalUsers();
            } catch (error) {
               toast.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: error.message
               });
            }
         }
      });
   };

   const confirmDeleteUser = (userData) => {
      confirm.require({
         message: 'Are you sure you want to delete this user?',
         header: 'Confirmation',
         icon: 'pi pi-exclamation-triangle',
         accept: async () => {
            try {
               await deleteAdminPortalUser(userData.sid);
               users.value = users.value.filter((user) => user.sid !== userData.sid);
            }
            catch (error) {
               toast.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: error.message,
               });
            }
         }
      });
   }


   const addNewUser = async () => {
      saved.value = true;

      const isValid =
         newUser.value.name.trim() &&
         newUser.value.surname.trim() &&
         newUser.value.email.trim() &&
         newUser.value.password.trim();

      if (isValid) {
         try {
            await createAdminPortalUser({
               ...newUser.value,
               admin: newUser.value.admin ? 1 : 0,
               active: newUser.value.active ? 1 : 0
            });
         } catch (error) {
            toast.add({
               severity: 'error',
               summary: 'Error',
               detail: error.message
            })
         } finally {
            users.value = await fetchAdminPortalUsers();
            saved.value = false;
            newDialog.value = false;
            newUser.value = blankNewUser();
         }
      }
   };

   const blankNewUser = () => ({
      name: '',
      surname: '',
      email: '',
      password: '',
      admin: false,
      active: true
   });

</script>

<template>
	<div class="p-grid">
		<div class="p-col-12">
			<Card>
            <template #title>
               <div class="flex align-items-center justify-content-between">
                  <span>Admin Portal Users</span>
                  <Button
                     label="New User"
                     icon="pi pi-plus"
                     severity="info"
                     @click="newDialog=true"
                  />
               </div>
            </template>
               <template #content>
                  <DataTable 
                     :value="users"
                     paginator :rows="5" 
                     :rowsPerPageOptions="[5, 10, 20, 50]"
                     tableStyle="min-width: 50rem"
                  >
                     <Column field="sid" header="ID"></Column>
                     <Column field="first_name" header="Name"></Column>
                     <Column field="last_name" header="Surname"></Column>
                     <Column field="admin" header="User Level">
                        <template #body="slotProps">
                           <span>{{ slotProps.data.admin === 1 ? 'Admin' : 'Standard' }}</span>
                        </template>
                     </Column>
                     <Column field="active" header="Status">
                        <template #body="slotProps">
                           <span>{{ slotProps.data.active === 1 ? 'Active' : 'Deactivated' }}</span>
                        </template>
                     </Column>
                     <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                           <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editUser(slotProps.data)" />
                           <!-- <Button :icon="slotProps.data.active === 1 ? 'pi pi-times' : 'pi pi-check'" outlined rounded :severity="slotProps.data.active === 1 ? danger : success" @click="confirmDeleteUser(slotProps.data)" /> -->
                           <Button 
                              :icon="slotProps.data.active === 1 ? 'pi pi-times' : 'pi pi-check'" 
                              outlined 
                              rounded 
                              :severity="slotProps.data.active === 1 ? 'danger' : 'success'" 
                              @click="handleClick(slotProps.data)" 
                              />

                        </template>
                     </Column>
                  </DataTable>

                  <Dialog :dismissableMask="true" v-model:visible="editDialog" :style="{width: '450px'}" header="User Details" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="name" class="bold-label">Name</label>
                           <InputText id="name" v-model.trim="editCurrentUser.first_name" required="true" autofocus :class="{'p-invalid': saved && !editCurrentUser.first_name}" />
                           <small class="p-error" v-if="saved && !editCurrentUser.first_name">Name is required.</small>
                        </div>
                        <div class="field col">
                           <label for="surname" class="bold-label">Surname</label>
                           <InputText id="name" v-model.trim="editCurrentUser.last_name" required="true" autofocus :class="{'p-invalid': saved && !editCurrentUser.last_name}" />
                           <small class="p-error" v-if="saved && !editCurrentUser.last_name">Surname is required.</small>
                        </div>
                     </div>
                     <div class="field">
                        <label for="email" class="bold-label">Email</label>
                        <InputText id="email" v-model.trim="editCurrentUser.email" required="true" autofocus :class="{'p-invalid': saved && !editCurrentUser.email}" />
                        <small class="p-error" v-if="saved && !editCurrentUser.email">Email is required.</small>
                     </div>
                     <div class="field col-10">
                        <label for="admin" class="bold-label">Admin</label>
                        <div>
                           <ToggleButton v-model="editCurrentUser.admin" required onIcon="pi pi-check" offIcon="pi pi-times" invalid class="w-full sm:w-10rem" aria-label="Confirmation" />
                        </div>
                     </div>
                     <!-- <div class="formgrid grid">
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
                     </div> -->
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                        <Button label="Save" icon="pi pi-check" text @click="saveUser" />
                     </template>
               </Dialog>

               <Dialog :dismissableMask="true" v-model:visible="newDialog" :style="{width: '670px'}" header="User Details" :modal="true" class="p-fluid">
                  <div class="formgrid grid">
                     <div class="field col-10">
                        <label for="name" class="bold-label">Name</label>
                        <InputText id="name" v-model.trim="newUser.name" required="true" autofocus :class="{'p-invalid': saved && !newUser.name}" />
                        <small class="p-error" v-if="saved && !newUser.name">Name is required.</small>
                     </div>
                     <div class="field col-10">
                        <label for="surname" class="bold-label">Surname</label>
                        <InputText id="surname" v-model.trim="newUser.surname" required="true" autofocus :class="{'p-invalid': saved && !newUser.surname}" />
                        <small class="p-error" v-if="saved && !newUser.surname">Surname is required.</small>
                     </div>
                     <div class="field col-10">
                        <label for="email" class="bold-label">Email</label>
                        <InputText id="email" type="email" v-model.trim="newUser.email" required="true" autofocus :class="{'p-invalid': saved && !newUser.email}" />
                        <small class="p-error" v-if="saved && !newUser.email">Email is required.</small>
                     </div>
                     <div class="field col-10">
                        <label for="password" class="bold-label">Password</label>
                        <InputText id="password" type="password" v-model.trim="newUser.password" required="true" autofocus :class="{'p-invalid': saved && !newUser.password}" />
                        <small class="p-error" v-if="saved && !newUser.password">Password is required.</small>
                     </div>
                     <div class="field col-10">
                        <label for="admin" class="bold-label">Admin</label>
                        <div>
                           <ToggleButton v-model="newUser.admin" required onIcon="pi pi-check" offIcon="pi pi-times" invalid class="w-full sm:w-10rem" aria-label="Confirmation" />
                        </div>
                     </div>
                  </div>
                  <template #footer>
                     <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                     <Button label="Save" icon="pi pi-check" text @click="addNewUser" />
                  </template>
               </Dialog>

               <Dialog :dismissableMask="true" v-model:visible="newDialog" :style="{width: '670px'}" header="User Details" :modal="true" class="p-fluid">
                  <div class="formgrid grid">
                     <div class="field col-10">
                        <label for="name" class="bold-label">Name</label>
                        <InputText id="name" v-model.trim="newUser.name" required="true" autofocus :class="{'p-invalid': saved && !newUser.name}" />
                        <small class="p-error" v-if="saved && !newUser.name">Name is required.</small>
                     </div>
                     <div class="field col-10">
                        <label for="surname" class="bold-label">Surname</label>
                        <InputText id="surname" v-model.trim="newUser.surname" required="true" autofocus :class="{'p-invalid': saved && !newUser.surname}" />
                        <small class="p-error" v-if="saved && !newUser.surname">Surname is required.</small>
                     </div>
                     <div class="field col-10">
                        <label for="email" class="bold-label">Email</label>
                        <InputText id="email" type="email" v-model.trim="newUser.email" required="true" autofocus :class="{'p-invalid': saved && !newUser.email}" />
                        <small class="p-error" v-if="saved && !newUser.email">Email is required.</small>
                     </div>
                     <div class="field col-10">
                        <label for="password" class="bold-label">Password</label>
                        <InputText id="password" type="password" v-model.trim="newUser.password" required="true" autofocus :class="{'p-invalid': saved && !newUser.password}" />
                        <small class="p-error" v-if="saved && !newUser.password">Password is required.</small>
                     </div>
                     <div class="field col-10">
                        <label for="admin" class="bold-label">Admin</label>
                        <div>
                           <ToggleButton v-model="newUser.admin" required onIcon="pi pi-check" offIcon="pi pi-times" invalid class="w-full sm:w-10rem" aria-label="Confirmation" />
                        </div>
                     </div>
                  </div>
                  <template #footer>
                     <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                     <Button label="Save" icon="pi pi-check" text @click="addNewUser" />
                  </template>
               </Dialog>
               <ConfirmDialog />
               </template>              
         </Card>
		</div>
	</div>
</template>

