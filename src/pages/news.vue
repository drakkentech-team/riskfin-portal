<script setup>
   import { computed, ref, onMounted } from 'vue';
   import { createNews, getNews, updateNews } from '../api/news';
   import { useToast } from "primevue/usetoast";
   import { getMobileUsers } from '../api/mobileAppUsers';
   import { todayDate } from "../utilities/common"
   
   const toast = useToast();

   const news = ref(null);
   const users = ref(null);
   const selectedNews = ref(null);
   const newDialog = ref(false);
   const addUsersDialog = ref(false);
   const selectedUsers = ref([]);
   const editDialog = ref(false);
   const saved = ref(false);
   const spinner = ref(false);

   const countSelectedUsers = computed(() => {
      return selectedUsers.value.length;
   });

   const newsForm = ref({
      title: "",
      body: "",
   })

   const intialNewsForm = () => ({
      title: "",
      body: "",
   });

   onMounted(() => {
      getNews().then((data) => {
        news.value = data;
      });
      getMobileUsers().then((data) => {
        users.value = data;
      });
   });


   const handleUserCheck = (sid) => {
      console.log(selectedUsers.value)
   }


   const handleCreateNews = async () => {
      const formattedUserIds = selectedUsers.value.map(user_id => ({ "user_id": user_id.toString() }));
      try {
         await createNews({
            title: newsForm.value.title,
            content: newsForm.value.content,
            date: todayDate(),
            user_sid: formattedUserIds
         });
         const data = await getNews();
         news.value = data;
      } 
      catch (error) {
        console.error("Error in saveUser:", error);
      } 
      finally {
        spinner.value = false;
        newDialog.value = false;
        toast.add({ severity: 'success', summary: 'Success', detail: 'News Created', life: 3000 });
        newsForm.value = intialNewsForm();
      }
   }


   const handleEditNews = (data) => {
      selectedNews.value = {...data};
      console.log(selectedNews)
      editDialog.value = true;
   };


   const deleteNews = (newsSid) => {
      spinner.value = true;
      const open_user = user.value.user_sid
      deleteUserPolicy({
         user_detail_fk: user.value.user_sid,
         policy_fk: policy_sid,
      })
      let updatedUsers = userData.value.map(user => {
         if (user.user_sid === open_user) {
            let updatedPolicies = user.active_policy.filter(policy => policy.policy_sid !== policy_sid);
            return {
                  ...user,
                  active_policy: updatedPolicies
            };
         }
         return user;
      });
      userData.value = updatedUsers
      editDialog.value = false;
      user.value = {};
   }

   const handleUpdateNews = async () => {
      saved.value = true;
      spinner.value = true;  
      const sid = selectedNews.value.sid
      try {
         await updateNews(sid, {
            title: selectedNews.value.title,
            content: selectedNews.value.content,
            active: 1,
         });
         const data = await getNews();
         news.value = data;
      } 
      catch (error) {
        console.error("Error in saveUser:", error);
      } 
      finally {
        spinner.value = false;
        editDialog.value = false;
        toast.add({ severity: 'success', summary: 'Success', detail: 'News Updated', life: 3000 });
        selectedNews.value = {};
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
            <template #title>
               <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>News</span>
                  <Button 
                     label="Publish News" 
                     icon="pi pi-plus" 
                     severity="info" 
                     @click="newDialog=true"
                  />
               </div>
            </template>
               <template #content>
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                     <!-- <div class="view-card" >
                        <div class="view-section">
                           <div class="view-label">View</div>
                           <div class="separator"></div>
                           
                           <Checkbox v-model="filteredNotification" inputId="ingredient1" name="All" value="All" />
                           <label for="ingredient1" class="ml-2"> All </label>

                           <Checkbox class="ml-5" v-model="filteredNotification" inputId="ingredient1" name="Personal" value="Personal" />
                           <label for="ingredient1" class="ml-2"> Active </label>

                           <Checkbox class="ml-5" v-model="filteredNotification" inputId="ingredient1" name="Scheduled" value="Scheduled" />
                           <label for="ingredient1" class="ml-2"> Deactivated </label>
                        </div>
                     <div>
                        
                     </div>
                  </div> -->
                  <!-- <div >
                        <Dropdown dropdownIcon="pi pi-calendar" v-model="selectedDateOption" :options="dates" optionLabel="name" placeholder="Date" class="w-full ml-12 md:w-10rem" />
                        <Button icon="pi pi-filter" label="Filter" severity="secondary" raised class="ml-5"/>
                     </div> -->
               </div>
               <br>
                  <DataTable 
                     :value="news"
                     paginator :rows="5" 
                     :rowsPerPageOptions="[5, 10, 20, 50]"
                     tableStyle="min-width: 50rem"
                  >
                     <Column field="sid" header="ID"></Column>
                     <Column field="title" header="Title"></Column>
                     <Column field="content" header="Body"></Column>
                     <Column field="created" header="Date"></Column>

                     <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                           <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="handleEditNews(slotProps.data)" />
                           <!-- <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteNews(slotProps.data)" /> -->
                        </template>
                     </Column>
                  </DataTable>

                  <Dialog :dismissableMask="true" v-model:visible="editDialog" :style="{width: '450px'}" header="Edit News" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="title" class="bold-label">Title</label>
                           <InputText id="name" v-model.trim="selectedNews.title" required="true" autofocus :class="{'p-invalid': saved && !selectedNews.title}" />
                           <small class="p-error" v-if="saved && !selectedNews.title">Title is required.</small>
                        </div>
                        <div class="field col-12">
                           <label for="body" class="bold-label">Body</label>
                           <Textarea style="height: 200px;" id="body" v-model.trim="selectedNews.content" required="true" autofocus :class="{'p-invalid': saved && !selectedNews.content}" />
                           <small class="p-error" v-if="saved && !selectedNews.content">Body is required.</small>
                     </div>
                     </div>
                     
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                        <Button label="Save" icon="pi pi-check" text @click="handleUpdateNews" />
                     </template>
               </Dialog>

               <Dialog :dismissableMask="true" v-model:visible="newDialog" :style="{width: '450px'}" header="Publish News" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="title" class="bold-label">Title</label>
                           <InputText id="name" v-model.trim="newsForm.title" required="true" autofocus :class="{'p-invalid': saved && !newsForm.title}" />
                           <small class="p-error" v-if="saved && !newsForm.title">Title is required.</small>
                        </div>
                        <div class="field col-12">
                           <label for="body" class="bold-label">Body</label>
                           <Textarea style="height: 200px;" id="body" v-model.trim="newsForm.content" required="true" autofocus :class="{'p-invalid': saved && !newsForm.content}" />
                           <small class="p-error" v-if="saved && !newsForm.content">Body is required.</small>
                        </div>
                        <div class="col-4">
                           <Button 
                              label="Add Users" 
                              icon="pi pi-plus" 
                              severity="info" 
                              @click="addUsersDialog=true"
                           />
                        </div>
                        <div class="col-4 pt-2">
                           <span>{{countSelectedUsers}} users selected</span>
                        </div>
                        
                     </div>
                     
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                        <Button label="Save" icon="pi pi-check" text @click="handleCreateNews" />
                     </template>
               </Dialog>

               <Dialog :dismissableMask="true" v-model:visible="addUsersDialog" :style="{width: '450px'}" header="Add Users" :modal="true" class="p-fluid">
                  <DataTable 
                     :value="users"
                     paginator :rows="5" 
                     :rowsPerPageOptions="[5, 10, 20, 50]"
                     tableStyle="min-width: 10rem"
                  >
                     <Column field="user_sid" header="ID"></Column>
                     <Column field="Name" header="Name">
                        <template #body="slotProps">
                           {{ slotProps.data.first_name }} {{ slotProps.data.last_name }}
                        </template>
                     </Column>
                     <Column header="Select" style="min-width:8rem">
                        <template #body="slotProps">
                           <Checkbox 
                              v-model="selectedUsers" 
                              :value="slotProps.data.user_sid" 
                              @change="handleUserCheck(slotProps.data.user_sid)" 
                           />
                        </template>
                     </Column>
                  </DataTable>
                     
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="addUsersDialog=false"/>
                        <Button label="Save" icon="pi pi-check" text @click="addUsersDialog=false" />
                     </template>
               </Dialog>
               <Toast />
               </template>
               
         </Card>
		</div>
	</div>
</template>

