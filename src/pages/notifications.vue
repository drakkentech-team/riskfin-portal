<script setup>
   import { ref, onMounted } from 'vue';
   import { fetchNotifications } from '../api/notifications';
   import {todayDate} from "../utilities/common"

   const notifications = ref(null);
   const newDialog = ref(false);
   const title = ref("");
   const titleValue = ref("");
   const message = ref("");
   const messageValue = ref("");
   const messageType = ref("Personal")
   const sendDate = ref(todayDate());
   const saved = ref(false);
   const menu = ref(null);

   const titlePlaceholder = (placeholder) =>{
      const inputElement = titleValue.value
      const cursorPosition = inputElement.selectionStart;

      const beforeCursor = title.value.substring(0, cursorPosition);
      const afterCursor = title.value.substring(cursorPosition);
      if (title.value.length){
         title.value = `${beforeCursor}{${placeholder}}${afterCursor}`;
      }
      else {
         title.value = `{${placeholder}} `;
      }
      const newCursorPosition = cursorPosition + placeholder.length + 2;
      inputElement.selectionStart = newCursorPosition;
      inputElement.selectionEnd = newCursorPosition;
   }


   const messagePlaceholder = (placeholder) =>{
      const inputElement = messageValue.value
      const cursorPosition = inputElement.selectionStart;

      const beforeCursor = message.value.substring(0, cursorPosition);
      const afterCursor = message.value.substring(cursorPosition);
      message.value = `${beforeCursor}{${placeholder}}${afterCursor}`;

    
      const newCursorPosition = cursorPosition + placeholder.length + 2; 
      inputElement.selectionStart = newCursorPosition;
      inputElement.selectionEnd = newCursorPosition;
   }


   const titleKeydown = (event) => {
      const inputElement = titleValue.value;
      const cursorPosition = inputElement.selectionStart;

      const beforeCursor = title.value.substring(0, cursorPosition);
      const afterCursor = title.value.substring(cursorPosition);


      const withinPlaceholder = /{[^}]*$/.test(beforeCursor) && /^[^}]*}/.test(afterCursor);
      const atEndOfPlaceholder = /}$/.test(beforeCursor) && !/^{/.test(afterCursor);

      if (withinPlaceholder || (event.key === 'Backspace' && atEndOfPlaceholder)) {
         event.preventDefault();
         const startPos = beforeCursor.lastIndexOf('{');
         const endPos = cursorPosition + (withinPlaceholder ? afterCursor.indexOf('}') + 1 : 0);

         title.value = title.value.substring(0, startPos) + title.value.substring(endPos);
         inputElement.selectionStart = startPos;
         inputElement.selectionEnd = startPos;
      }

      else if (event.key === 'ArrowLeft' && (withinPlaceholder || atEndOfPlaceholder)) {
         event.preventDefault();
         const startPos = beforeCursor.lastIndexOf('{');
         inputElement.selectionStart = startPos;
         inputElement.selectionEnd = startPos;
      }

      else if (event.key === 'ArrowRight' && withinPlaceholder) {
         event.preventDefault();
         const endPos = cursorPosition + afterCursor.indexOf('}') + 1;
         inputElement.selectionStart = endPos;
         inputElement.selectionEnd = endPos;
      }

      else if (withinPlaceholder) {
         event.preventDefault();
      }
   }


   const messageKeydown = (event) => {
      const inputElement = messageValue.value;
      const cursorPosition = inputElement.selectionStart;

      const beforeCursor = message.value.substring(0, cursorPosition);
      const afterCursor = message.value.substring(cursorPosition);

      const withinPlaceholder = /{[^}]*$/.test(beforeCursor) && /^[^}]*}/.test(afterCursor);
      const atEndOfPlaceholder = /}$/.test(beforeCursor) && !/^{/.test(afterCursor);

      if (withinPlaceholder || (event.key === 'Backspace' && atEndOfPlaceholder)) {
         event.preventDefault();
         const startPos = beforeCursor.lastIndexOf('{');
         const endPos = cursorPosition + (withinPlaceholder ? afterCursor.indexOf('}') + 1 : 0);

         message.value = message.value.substring(0, startPos) + message.value.substring(endPos);
         inputElement.selectionStart = startPos;
         inputElement.selectionEnd = startPos;
      }
    
      else if (event.key === 'ArrowLeft' && (withinPlaceholder || atEndOfPlaceholder)) {
         event.preventDefault();

         const startPos = beforeCursor.lastIndexOf('{');
         inputElement.selectionStart = startPos;
         inputElement.selectionEnd = startPos;
      }
    
      else if (event.key === 'ArrowRight' && withinPlaceholder) {
         event.preventDefault();

         const endPos = cursorPosition + afterCursor.indexOf('}') + 1;
         inputElement.selectionStart = endPos;
         inputElement.selectionEnd = endPos;
      }

      else if (withinPlaceholder) {
         event.preventDefault();
      }
   }

   const titlePlaceholders = [
      {  
         label: 'Name', 
         command: () => {
            titlePlaceholder("Name")
         }
      },
      {  
         label: 'Surname', 
         command: () => {
            addPlaceholder("Surname")
         }
      },
      {  
         label: 'Policy', 
         command: () => {
            addPlaceholder("Policy")
         }
      },
      {  
         label: 'Date', 
         command: () => {
            addPlaceholder("Date")
         }
      }
   ]

   const messagePlaceholders = [
      {  
         label: 'Name', 
         command: () => {
            titlePlaceholder("Name")
         }
      },
      {  
         label: 'Surname', 
         command: () => {
            addPlaceholder("Surname")
         }
      },
      {  
         label: 'Policy', 
         command: () => {
            addPlaceholder("Policy")
         }
      },
      {  
         label: 'Date', 
         command: () => {
            addPlaceholder("Date")
         }
      }
   ]

   onMounted(() => {
      fetchNotifications().then((data) => {
         notifications.value = data;
      });
   });

   const toggle = (event) => {
      menu.value.toggle(event);
   };

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
                  <DataTable 
                     :value="notifications"
                     paginator :rows="5" 
                     :rowsPerPageOptions="[5, 10, 20, 50]"
                     tableStyle="min-width: 50rem"
                  >
                     <Column field="sid" header="ID"></Column>
                     <Column field="title" header="Title"></Column>
                     <Column field="body" header="Message"></Column>
                     <Column field="date_sent" header="Date Sent"></Column>
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
                     <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                           <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editUser(slotProps.data)" />
                           <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                     </Column>
                  </DataTable>

                  <Dialog :dismissableMask="true" v-model:visible="newDialog" :style="{width: '500px'}" header="New Notification" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="col-7 pb-3">
                           <label for="title" class="bold-label">Title</label>
                           <InputText 
                              id="title" 
                              ref="titleValue" 
                              v-model.trim="title" 
                              required="true" 
                              autofocus :class="{'p-invalid': saved && !title}" 
                           />
                           <small class="p-error" v-if="saved && !title">Title is required.</small>
                        </div>
                        <div class="col-5">
                           <br>
                              <Button 
                                 type="button" 
                                 icon="pi pi-plus" 
                                 label="Insert Placeholder" 
                                 @click="toggle" 
                                 aria-haspopup="true" 
                                 aria-controls="overlay_menu" 
                              />
                              <Menu 
                                 ref="menu" 
                                 id="overlay_menu" 
                                 :model="titlePlaceholders" 
                                 :popup="true" 
                              />
                           </div>
                     </div>
                     <div class="field">
                        <label for="message" class="bold-label">Message</label>
                        <Textarea  id="message" v-model.trim="message" required="true" autofocus :class="{'p-invalid': saved && !message}" />
                        <small class="p-error" v-if="saved && !message">A Message is required.</small>
                     </div>
                     <div class="formgrid grid">
                           <div class="col-6 pb-3">
                              <Button 
                                 label="Add From Template" 
                                 icon="pi pi-plus" 
                                 severity="info" 
                                 @click="newDialog=true"
                              />
                           </div>
                           <div class="col-6 pb-3">
                              <Button 
                                 type="button" 
                                 icon="pi pi-plus" 
                                 label="Insert Placeholder" 
                                 @click="toggle" 
                                 aria-haspopup="true" 
                                 aria-controls="overlay_menu" 
                              />
                              <Menu 
                                 ref="menu" 
                                 id="overlay_menu" 
                                 :model="placeholders" 
                                 :popup="true" 
                              />
                           </div>
                        </div>
                     <div class="field">
                        <label class="mb-3 bold-label">Message Type</label>
                        <div class="formgrid grid">
                           <div class="field-radiobutton col-4">
                                 <RadioButton id="category1" name="category" value="Personal" v-model="messageType" />
                                 <label for="category1">Personal</label>
                           </div>
                           <div class="field-radiobutton col-4">
                                 <RadioButton id="category2" name="category" value="Scheduled" v-model="messageType" />
                                 <label for="category2">Scheduled</label>
                           </div>
                           <div class="field-radiobutton col-4">
                                 <RadioButton id="category3" name="category" value="Automated" v-model="messageType" />
                                 <label for="category3">Automated</label>
                           </div>
                        </div>
                        <div class="formgrid grid">
                           <div class="col-6">
                              <label for="send-date" class="bold-label">Send Date</label>
                              <Calendar 
                                 v-model="sendDate"
                                 dateFormat="yy/mm/dd" 
                                 showIcon />
                           </div>
                        </div>
                        <div class="formgrid grid">
                           <div class="col-4 pt-5">
                              <Button 
                                 label="Add Users" 
                                 icon="pi pi-plus" 
                                 severity="info" 
                                 @click="newDialog=true"
                              />
                           </div>
                        </div>
                        <div class="formgrid grid">
                           <div class="col-6 pl-5">
                              <span class="bold-label">0 Users Added</span>
                           </div>
                        </div>
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

