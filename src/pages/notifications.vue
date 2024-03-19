<script setup>
   import { ref, reactive, onMounted, onUnmounted, nextTick, watch, computed  } from 'vue';
   import { getNotifications, getNotificationTemplates, sendNotification } from '../api/notifications';
   import { applyFilters } from '../api/filters';
   import { getProducts } from '../api/products';
   import { todayDate, addDays } from "../utilities/common"
   import { getMobileUsers } from '../api/mobileAppUsers';
   import { useStore } from '../stores/store';
   
   const notifications = ref(null);
   const personalNotifications = ref(null);
   const scheduledNotifications = ref(null);
   const automatedNotifications = ref(null);
   const notificationTemplates = ref(null);
   const products = ref(null);
   const newDialog = ref(false);
   const addUsersDialog = ref(false);
   const addTemplateDialog = ref(false);
   const addProductsDialog = ref(false);
   const titleInput = ref(null);
   const messageType = ref("All")
   const sendDate = ref(todayDate());
   const saved = ref(false);
   const titlePlaceholderMenu = ref(null);
   const messagePlaceholderMenu = ref(null);
   const loading = ref(false);
   const selectedNotification = ref(null);
   const selectNotifDialog = ref(false);
   const selectNotifTitle = ref(false);
   const filteredNotification = ref("All")
   const selectedDateOption = ref({ name: "Today"})
   const users = ref(null);
   const selectedUsers = ref([]);
   const selectedProducts = ref([]);
   const activeTab = ref(0)
   const selectAllUsers  = ref(false)
   const selectAllProducts  = ref(false)



   const newNotification = ref({
      title: '',
      message: '',
      send_date: todayDate(),
   })

   const handleCancelNewNotification = () => ({
      title: '',
      message: '',
      send_date: todayDate(),
   });


   const tabItems = ref([
      { label: 'Personal', icon: 'pi pi-user', value:0 },
      { label: 'Scheduled', icon: 'pi pi-clock', value:1 },
      { label: 'Automated', icon: 'pi pi-cog', value:2},
   ]);


   const handleCloseNewDialog = () => {
      newNotification.value = handleCancelNewNotification()
      saved.value = false;
      newDialog.value = false;
      addUsersDialog.value = false;
      addTemplateDialog.value = false;
      addProductsDialog.value = false;
      selectedUsers.value = [];
      selectedProducts.value = [];
      activeTab.value = 0;
   };

   watch(activeTab, (newValue, oldValue) => {
      console.log("Active tab changed to:", newValue);
   });

   const countSelectedUsers = computed(() => {
      return selectedUsers.value.length;
   });

   
   const titlePlaceholders = [
      {
         label: 'Name',
         command: () => {
            addPlaceholder("{Name}", "title")
         }
      },
      {
         label: 'Surname',
         command: () => {
            addPlaceholder("{Surname}", "title")
         }
      },
      {
         label: 'Policy',
         command: () => {
            addPlaceholder("{Policy}", "title")
         }
      },
      {
         label: 'Date',
         command: () => {
            addPlaceholder("{Date}", "title")
         }
      },
   ]


   const messagePlaceholders = [
      {
         label: 'Name',
         command: () => {
            addPlaceholder("{Name}", "message")
         }
      },
      {
         label: 'Surname',
         command: () => {
            addPlaceholder("{Surname}", "message")
         }
      },
      {
         label: 'Policy',
         command: () => {
            addPlaceholder("{Policy}", "message")
         }
      },
      {
         label: 'Date',
         command: () => {
            addPlaceholder("{Date}", "message")
         }
      },
   ]


   const addPlaceholder = (placeholder, input) => {
      input === "title" ? 
      newNotification.value.title = newNotification.value.title + placeholder :
      newNotification.value.message = newNotification.value.message + placeholder
   };


   const notificationTableData = computed(() => {
      if (messageType.value === 'All') {
        return notifications.value;
      } else if (messageType.value === 'Personal') {
        return personalNotifications.value;
      } else if (messageType.value === 'Automated') {
        return automatedNotifications.value;
      } else if (messageType.value === 'Scheduled') {
        return scheduledNotifications.value;
      }
      else {
        return [];
      }
   });


   


   const onNotificationSelect = () => {
      selectNotifDialog.value = true
      selectNotifTitle.value = "Title: " + selectedNotification.value.title
      console.log(selectedNotification)
   }


   const onTemplateSelect = () => {
      newNotification.value.title = selectedNotification.value.title
      newNotification.value.message = selectedNotification.value.message
      if (selectedNotification.value.message_type === "message"){
         activeTab.value = 0
      }
      else if (selectedNotification.value.message_type === "scheduled_message"){
         activeTab.value = 1
      }
      else if (selectedNotification.value.message_type === "automated_message"){
         activeTab.value = 2
      }
      addTemplateDialog.value = false;
   }

   onMounted(() => {
      loading.value = true
      const user = useStore()
      getNotifications().then((data) => {
         notifications.value = data;
         personalNotifications.value = data.filter(item => item.flag === 'message');
         scheduledNotifications.value = data.filter(item => item.flag === 'scheduled_message');
         automatedNotifications.value = data.filter(item => item.flag === 'automated_message');
         loading.value = false; 
      });
      getMobileUsers().then((data) => {
         users.value = data;
      });
      getNotificationTemplates().then((data) => {
        notificationTemplates.value = data;
      });
      getProducts().then((data) => {
        products.value = data;
      });
       
   });

   const titleMenuToggle = (event) => {
      titlePlaceholderMenu.value.toggle(event);
   };

   const messageMenuToggle = (event) => {
      messagePlaceholderMenu.value.toggle(event);
   };

   const onNewNotificationClose = () => {
      newNotification.value.title = "";
      newNotification.value.message = "";
      saved.value = false;
      newDialog.value = false;
      addUsersDialog.value = false;
      addTemplateDialog.value = false;
      addProductsDialog.value = false;
      selectedUsers.value = [];
      selectedProducts.value = [];
      activeTab.value = 0;
   }


   const dates = [
      { name: 'Today', value: todayDate() },
      { name: 'Last 7 Days', value: todayDate(addDays(new Date(), 7)) },
      { name: 'Last 30 Days', value: todayDate(addDays(new Date(), 30)) },
      { name: 'Last 90 Days', value: todayDate(addDays(new Date(), 90)) },
      { name: 'Custom', value: todayDate() }
   ];


   const onDateFilter = async () => {
      const date = selectedDateOption.value.value
      const today = todayDate()
      loading.value = true
      try {
         await applyFilters({
            date_sent: [date, today]
         }).then((data) => {
            notifications.value = data;
            personalNotifications.value = data.filter(item => item.flag === 'message');
            scheduledNotifications.value = data.filter(item => item.flag === 'scheduled_message');
            automatedNotifications.value = data.filter(item => item.flag === 'automated_message');
            console.log(scheduledNotifications.value)
            } );    
      } 
      catch (error) {
        console.error("Error in Filtering:", error);
      } 
      finally {
         loading.value = false;
      }
   }


   const handleSendNotification = async () => {
      console.log(selectedProducts.value)
      var payload
      const formattedUserIds = selectedUsers.value.map(item => ({ "user_id": item.sid.toString() }));
      // const formattedPolicyIds = selectedProducts.value.map(policy_sid => ({ "policy_id": policy_sid.toString() }));
      const formattedPolicyIds = selectedProducts.value.map(item => ({ "policy_id": item.sid.toString() }));
      console.log(formattedUserIds)
      payload = {
         title: newNotification.value.title,
         message: newNotification.value.message,
         policy_id: formattedPolicyIds,
         user_id: formattedUserIds,
         message_type: "message",
         date_to_send: todayDate()
      }
      
      try {
         loading.value = true
         await sendNotification(payload);
            const data = await getNotifications();
            notifications.value = data;
         } 
         catch (error) {
            console.error("Error in adding product:", error);
         } 
         finally {
            loading.value = false;
            newDialog.value = false;
            saved.value = false
         }
   }

   const handleSelectAllUsers = (event) => {
      selectAllUsers.value = event.checked;
      if (selectAllUsers.value) {
         selectedUsers.value = users.value
         console.log(selectedUsers.value)
      } else {
         selectedUsers.value = []
      }
   }

   const handleSelectAllProducts = (event) => {
      console.log("Hello")
      selectAllProducts.value = event.checked;
      if (selectAllProducts.value) {
         selectedProducts.value = products.value
      } else {
         selectedProducts.value = []
      }
   }

</script>

<template>
	<div class="p-grid">
		<div class="p-col-12">
			<Card>
            <template #title>
               <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>Notifications</span>
                  <Button 
                     label="New Notification" 
                     icon="pi pi-plus" 
                     severity="info" 
                     @click="newDialog=true"
                  />
               </div>
            </template>

            <template #content>
               <BlockUI :blocked="loading" fullScreen></BlockUI>
               <ProgressSpinner 
                  v-show="loading" 
                  class="overlay" 
                  :pt="{
                     spinner: { style: {width: '10rem', height: '10rem' } },
                     circle: { style: { stroke: '#F59E0B', strokeWidth: 1, animation: 'none', width: '20px !important', height: '2rem'} }
                  }"
               />
               <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div class="view-card">
                     <div class="view-section">
                        <div class="view-label">View</div>
                        <div class="separator"></div>

                        <RadioButton v-model="messageType" inputId="ingredient1" name="pizza" value="All" />
                        <label for="ingredient1" class="ml-2">All</label>

                        <RadioButton class="ml-5" v-model="messageType" inputId="ingredient1" name="pizza" value="Personal" />
                        <label for="ingredient1" class="ml-2">Personal</label>

                        <RadioButton class="ml-5" v-model="messageType" inputId="ingredient1" name="pizza" value="Scheduled" />
                        <label for="ingredient1" class="ml-2">Scheduled</label>

                        <RadioButton class="ml-5" v-model="messageType" inputId="ingredient1" name="pizza" value="Automated" />
                        <label for="ingredient1" class="ml-2">Automated</label>
                     </div>
                  </div>
                  <div>
                     
                  </div>
               </div>
               <br>

               <DataTable 
                  sortField="date_sent"
                  :sortOrder="-1"
                  :value="notificationTableData"
                  paginator :rows="5" 
                  :rowsPerPageOptions="[5, 10, 20, 50]"
                  tableStyle="min-width: 50rem"
                  v-model:selection="selectedNotification"
                  selectionMode="single"  
                  @rowSelect="onNotificationSelect"
               >
                     <Column field="title" header="Subject" style="min-width: 11rem" sortable />
                     <Column field="body" header="Message" sortable />
                     <Column sortable field="date_sent" header="Date Sent" style="min-width: 11rem" />
                     <Column header="Pending" :exportable="false">
                        <template #body="slotProps">
                           {{ slotProps.data.counts.pending }} / {{ slotProps.data.counts.sent }}
                        </template>
                     </Column>
                     <Column header="Received" :exportable="false">
                        <template #body="slotProps">
                           {{ slotProps.data.counts.received }} / {{ slotProps.data.counts.sent }}
                        </template>
                     </Column>
                     <Column header="Opened" :exportable="false">
                        <template #body="slotProps">
                           {{ slotProps.data.counts.read }} / {{ slotProps.data.counts.sent }}
                        </template>
                     </Column>
                     <Column header="Closed" :exportable="false">
                        <template #body="slotProps">
                           {{ slotProps.data.counts.closed }} / {{ slotProps.data.counts.sent }}
                        </template>
                     </Column>
                  </DataTable>


                  <Dialog 
                     class="p-fluid"
                     :modal="true" 
                     @hide="onNewNotificationClose"
                     :dismissableMask="true" 
                     :style="{width: '650px'}" 
                     header="New Notification" 
                     v-model:visible="newDialog" 
                  >
                     <div class="formgrid grid">
                        <div class="col-8">
                           <TabMenu 
                              class="pb-5" 
                              :model="tabItems" 
                              v-model:activeIndex="activeTab"
                           />
                        </div>
                        <div class="col-4">
                           <Button 
                              severity="secondary"
                              label="Load From Template" 
                              icon="pi pi-plus" 
                              @click="addTemplateDialog=true"
                           />
                        </div>
                     </div>
                     <div class="formgrid grid">
                        <div class="col-4">
                           <Button 
                           severity="secondary"
                              label="Add User" 
                              icon="pi pi-user-plus" 
                              @click="addUsersDialog=true"
                           />
                        </div>
                        <div class="col-4 pb-4">
                           <Button 
                           severity="secondary"
                              label="Add Product" 
                              icon="pi pi-book" 
                              @click="addProductsDialog=true"
                           />
                        </div>
                     </div>
                     <div class="formgrid grid">
                           <div class="col-4 pb-4" v-if="activeTab !== 0">
                              <label for="send-date" class="bold-label">Send Date</label>
                              <Calendar 
                                 v-model="sendDate"
                                 dateFormat="yy/mm/dd" 
                                 showIcon
                              />
                           </div>
                        </div>
                     <div class="formgrid grid">
                        <div class="col-8 pb-3">
                           <label for="title" class="bold-label">Subject</label>
                           <InputText 
                              id="title" 
                              ref="titleInput" 
                              v-model.trim="newNotification.title" 
                              required="true" 
                              autofocus :class="{'p-invalid': saved && !newNotification.title}" 
                           />
                           <small class="p-error" v-if="saved && !newNotification.title">Title is required.</small>
                        </div>
                        <div class="col-4">
                           <br>
                              <Button 
                                 severity="secondary"
                                 label="Insert Placeholder" 
                                 aria-haspopup="true" 
                                 aria-controls="overlay_menu"
                                 @click="titleMenuToggle" 
                              />
                              <Menu 
                                 ref="titlePlaceholderMenu" 
                                 id="overlay_menu" 
                                 :model="titlePlaceholders" 
                                 :popup="true" 
                              />
                        </div>
                     </div>
                     <div class="field">
                        <label for="message" class="bold-label">Body</label>
                        <Textarea style="height: 200px;" id="message" v-model.trim="newNotification.message" required="true" autofocus :class="{'p-invalid': saved && !newNotification.message}" />
                        <small class="p-error" v-if="saved && !newNotification.message">A Message is required.</small>
                     </div>
                     <div class="formgrid grid">
                           <div class="col-8"></div>
                           <div class="col-4">
                              <Button 
                                 severity="secondary"
                                 label="Insert Placeholder" 
                                 aria-haspopup="true" 
                                 aria-controls="overlay_menu"
                                 @click="messageMenuToggle" 
                              />
                              <Menu 
                                 ref="messagePlaceholderMenu" 
                                 id="overlay_menu" 
                                 :model="messagePlaceholders" 
                                 :popup="true" 
                              />
                           </div>
                        </div>
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="handleCloseNewDialog"/>
                        <Button label="Send" icon="pi pi-send" text @click="handleSendNotification" />
                     </template>
               </Dialog>


               <Dialog 
                  :dismissableMask="true" 
                  v-model:visible="selectNotifDialog" 
                  :style="{width: '1000px'}" 
                  header="Notification Status" 
                  :modal="true" 
                  class="p-fluid"
               >
                  <div>
                     <span class="bold-big">Title: </span> <span class="medium-font">{{ selectedNotification.title }}</span>
                  </div><br>
                  <div>
                     <span class="bold-big">Message: </span> <span class="medium-font">{{ selectedNotification.body }}</span>
                  </div><br>
                  <div>
                     <span class="bold-big">Sent: </span> <span class="medium-font">{{ selectedNotification.date_sent }}</span>
                  </div><br>
                  <div>
                     <DataTable 
                        :value="selectedNotification.user_details"
                        paginator :rows="5" 
                        :rowsPerPageOptions="[5, 10, 20, 50]"
                        tableStyle="min-width: 50rem"
                     >
                        <Column 
                           field="name" 
                           header="Name" 
                           style="min-width: 10rem"
                           suppressMenu: true
                           >
                        </Column>
                        <Column 
                           field="received_date" 
                           header="Received" 
                           style="min-width: 10rem"
                           suppressMenu: true
                           >
                              <template #body="{ data }">
                                 {{ data.received_date ? data.received_date : "Not yet received" }}
                              </template>
                        </Column>
                        <Column 
                           field="read_date" 
                           header="Read" 
                           style="min-width: 10rem"
                           suppressMenu: true
                           >
                              <template #body="{ data }">
                                 {{ data.read_date ? data.read_date : "Not yet read" }}
                              </template>
                        </Column>
                        <Column 
                           field="closed_date" 
                           header="Closed" 
                           style="min-width: 10rem"
                           suppressMenu: true
                           >
                              <template #body="{ data }">
                                 {{ data.closed_date ? data.closed_date : "Not yet closed" }}
                              </template>
                        </Column>
                  </DataTable>
                  </div>
                  
               </Dialog>


               <Dialog 
                  :dismissableMask="true" 
                  v-model:visible="addUsersDialog" 
                  :style="{width: '450px'}" 
                  header="Add Users" 
                  :modal="true" 
                  class="p-fluid"
               >
                  <DataTable 
                     :value="users"
                     paginator :rows="5" 
                     :rowsPerPageOptions="[5, 10, 20, 50]"
                     tableStyle="min-width: 10rem"
                     v-model:selection="selectedUsers" :selectAll="selectAllUsers" @select-all-change="handleSelectAllUsers"
                  >
                     <Column field="Name" header="Name" style="min-width:10rem">
                        <template #body="slotProps">
                           {{ slotProps.data.first_name }} {{ slotProps.data.last_name }}
                        </template>
                     </Column>
                     <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                     
                  </DataTable>
                  <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="addUsersDialog=false"/>
                        <Button label="Save" icon="pi pi-check" text @click="addUsersDialog=false" />
                     </template>
                  </Dialog>


                  <Dialog 
                     :dismissableMask="true" 
                     v-model:visible="addProductsDialog" 
                     :style="{width: '450px'}" 
                     header="Add Products" 
                     :modal="true" 
                     class="p-fluid"
                  >
                     <DataTable 
                        :value="products"
                        paginator :rows="5" 
                        :rowsPerPageOptions="[5, 10, 20, 50]"
                        tableStyle="min-width: 10rem"
                        v-model:selection="selectedProducts" :selectAll="selectAllProducts" @select-all-change="handleSelectAllProducts"
                     >
                        <Column field="name" header="Name" style="min-width:18rem"></Column>
                        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                     </DataTable>
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="addProductsDialog=false"/>
                        <Button label="Save" icon="pi pi-check" text @click="addProductsDialog=false" />
                     </template>
                  </Dialog>


                  <Dialog 
                     :dismissableMask="true" 
                     v-model:visible="addTemplateDialog" 
                     :style="{width: '650px'}" 
                     header="Add Template" 
                     :modal="true" 
                     class="p-fluid"
                  >
                     <DataTable 
                        paginator :rows="5" 
                        selectionMode="single"  
                        tableStyle="min-width: 10rem"
                        :value="notificationTemplates"
                        @rowSelect="onTemplateSelect"
                        :rowsPerPageOptions="[5, 10, 20, 50]"
                        v-model:selection="selectedNotification"
                     >
                        <Column field="title" header="Subject" />
                        <Column field="message" header="Body" />
                     </DataTable>
                  <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="addTemplateDialog=false"/>
                        <Button label="Save" icon="pi pi-check" text @click="addTemplateDialog=false" />
                     </template>
                  </Dialog>
               </template>
         </Card>
		</div>
	</div>
</template>

