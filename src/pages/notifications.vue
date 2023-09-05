<script setup>
  import axios from 'axios';
import { onMounted, onUnmounted, reactive, ref } from 'vue';

  const apiBaseUrl = "http://localhost:9000";
  const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";

  /*New Notification Fields*/
  const title = ref("");
  const message = ref("");
  const users = ref([]);

  /*Snackbar*/
  const saveNotificationSnackbar = ref(false)
  const snackbarText = ref('Notification successfully sent');
  const snackbarTimeout = ref(5000)

  /*Modal Dropdown Lists*/
  const titleDropdownList = [
    { title: 'First Name', value:"<First Name>"},
    { title: 'Last Name', value: '<Last Name>'},
    { title: 'Policy', value: '<Policy>'},
    { title: 'Date', value: '<Date>'},
    { title: 'Days in arrears', value: '<Days in arrears>'},
  ]

  const items = [
    { title: 'First Name', value:"<First Name>"},
    { title: 'Last Name', value: '<Last Name>'},
    { title: 'Policy', value: '<Policy>'},
    { title: 'Date', value: '<Date>'},
    { title: 'Days in arrears', value: '<Days in arrears>'}
  ]

  /*Data*/
  const messageTemplateData = ref(null)
  const userData = ref(null);

  /*Modals*/
  const loadPreviousNotificationsModal = ref(false);
  const addUsersModal = ref(false);

  /*Headers*/
  const previousNotificationHeaders = ref([
    { title: "Title", align: 'start', key: 'title'},
    { title: 'Message', align: 'start', key: 'message' },
    { title: 'Date Sent', align: 'start', key: 'date' },
  ])

  const addUsersHeaders = ref([
    { title: "Name", align: 'start', key: 'name'},
    { title: 'Email', align: 'start', key: 'email' },
    { title: 'Selected', align: 'start', key: 'userSelected' },
  ])

  const data = ref([]);
  
  const dialog = ref(false);
  const messageStatusModal = ref(false);
  const displayMessageTitle = ref("");
  const displayMessage = ref("");
  const firstTableData = ref([]);
  const itemsPerPage = ref(5);
  const notificationsPerPage = ref(10);
  const textareaValue = ref("")
  const notificationHeaders = ref([
    { title: "Title", align: 'start', key: 'title'},
    { title: 'Message', align: 'start', key: 'body' },
    { title: 'Date Sent', align: 'start', key: 'date' },
  ])

  const headers= ref([{ title: "Name", align: 'start', key: 'name'},
                      { title: 'Email', align: 'start', key: 'email' },
                      { title: 'Message Status', align: 'start', key: 'messageStatus'},
                      { title: 'Received On', align: 'start', key: 'received'},
                      { title: 'Read On', align: 'start', key: 'read'},
                      { title: 'Closed On', align: 'start', key: 'closed'},
                    ])

  const tabs = [
    { title: 'All', icon: 'bx:world', tab: 'account' },
    { title: 'Automated', icon: 'bx-bot', tab: 'security' },
    { title: 'Custom', icon: 'bx-pencil', tab: 'notification' },
    { title: 'Scheduled', icon: 'bx:time', tab: 'notification' },
  ];

  /*Methods*/
  const handlePrevNotificationRowClick = (sid) => {
    const clickedItem = messageTemplateData.value.find(item => item.sid === sid);
    title.value = clickedItem.title
    message.value = clickedItem.message
    loadPreviousNotificationsModal.value = false
  }

  const handleCloseNewNotificationModal = () => {
    dialog.value = false
    title.value = ""
    message.value = ""
    users.value = []
  }

  const handleCheckboxChange = (item) => {
    console.log(item)
    const foundIndex = userData.value.findIndex((user) => user.sid_users === item.raw.sid_users);
    console.log(foundIndex)
    if (foundIndex !== -1) {
      userData.value[foundIndex].columns.userSelected = item.columns.userSelected;
    }
  };

  /*API Calls*/
  const getMessageTemplate = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/message_template`,{
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response && response.status === 200) {
          messageTemplateData.value = response.data;
      }
    } 
    catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };




      const handleTextareaInput = (event) => {
        const cursorPosition = event.target.selectionStart;
        for (const item of items) {
          if (
            cursorPosition >= item.value.length &&
            event.target.value.substr(cursorPosition - item.value.length, item.value.length) === item.value
          ) {
            message.value = event.target.value.substr(0, cursorPosition - item.value.length) + event.target.value.substr(cursorPosition);
            break;
          }
        }
      };

  const insertValue = (m) => {
    const lastCharacter = message.value.slice(-1);
      if (lastCharacter === ' ') {
        message.value += m; // Append the new value without a space
      } else {
        message.value += ' ' + m; // Append the new value with a space
      }
  }

  const insertValueTitle = (m) => {
    const lastCharacter = title.value.slice(-1);
      if (lastCharacter === ' ') {
        title.value += m; // Append the new value without a space
      } else {
        title.value += ' ' + m; // Append the new value with a space
      }
  }

  const notificationTabs = [
    { title: 'Manual',  tab: 'account' },
    { title: 'Scheduled',  tab: 'security' },
    { title: 'Triggerd',  tab: 'notification' },
  ];

  const fetchMessage = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/messages`,{
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response && response.status === 200) {
        if (response.data) {
          const uniqueMessages = {};
          let idCounter = 1;
          response.data.forEach((message) => {
            const key = message.title + message.date;

            if (!uniqueMessages[key]) {
              uniqueMessages[key] = {
                ...message,
                count: 0,
                sids: [],
                messageStatus: [],
                messageReceived:[],
                read: [],
                closed: [],
                id: idCounter
              };
              idCounter++;
            }

            uniqueMessages[key].count++;
            if(message.received_date){
              uniqueMessages[key].messageReceived.push(message.received_date)
            }
            else{
              uniqueMessages[key].messageReceived.push("Not yet received");
            }
              

            message.opened_date ? 
              uniqueMessages[key].read.push(message.opened_date) :
              uniqueMessages[key].read.push("Not yet read");

              message.closed_date ? 
              uniqueMessages[key].closed.push(message.closed_date) :
              uniqueMessages[key].closed.push("Not yet closed");  

            uniqueMessages[key].sids.push(message.user_sid);
            if (message.date && !message.received_date &&
                !message.opened_date && !message.closed_date){
              uniqueMessages[key].messageStatus.push("Pending");
            }
            else if (message.date && message.received_date &&
                !message.opened_date && !message.closed_date){
                  uniqueMessages[key].messageStatus.push("Received");
            }
            else if (message.date && message.received_date && 
            message.opened_date && !message.closed_date){
                  uniqueMessages[key].messageStatus.push("Opened");
            }
            else if (message.date && message.received_date && 
            message.opened_date && message.closed_date){
                  uniqueMessages[key].messageStatus.push("Closed");
            }
          });
          
          const filteredMessages = Object.values(uniqueMessages);
          data.value = filteredMessages;
        }
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/all_user_profile`,{
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response && response.status === 200) {
        response.data.forEach((user) => {
          user.name = `${user.name} ${user.surname}`;
          user.userSelected = false
        })
        userData.value = response.data;
        console.log(userData.value)
      }
    } 
    catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleFlagClick = (id) => {
    messageStatusModal.value = true;
    const clickedItem = data.value.find(item => item.id === id);
    displayMessageTitle.value = clickedItem.title
    displayMessage.value = clickedItem.body
    firstTableData.value = userData.value.filter(users => clickedItem.sids.includes(users.sid_users));
    const { messageStatus, messageReceived, read, closed } = clickedItem;
    firstTableData.value.forEach((item, index) => {
      if (messageStatus[index]) {
        item.messageStatus = messageStatus[index];
        item.received = messageReceived[index];
        item.read = read[index];
        item.closed = closed[index];
      } else {
        item.messageStatus = "Unknown";
      }
    });
  }

  const handleSaveNotification = async () => {
    console.log(title.value)
    console.log(message.value)
    console.log(users.value)
    try {
      const response = await axios.post(`${apiBaseUrl}/send_message`, {
        title: title.value,
        message: message.value,
        user_id: users.value,
      },{
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
          }})
      if (response && response.status === 200) {
        saveNotificationSnackbar.value = true
        fetchMessage();
      } 
    } 
    catch (error) {
      if (error.response && error.response.status === 404) {
        errorMessage.value = 'This user does not exist'
      }
      else if (error.response && error.response.status === 401) {
        errorMessage.value = 'Your password is incorrect'
      }
    } 
  }

  onMounted(() => {
    fetchMessage();
    fetchUser();
    getMessageTemplate();
    const intervalId = setInterval(fetchMessage, 60000);
    onUnmounted(() => {
      clearInterval(intervalId);
    });
  });

  const form = reactive({
    title: '',
    message: '',
    user_id: [{"user_id": 1},{"user_id": 3}],
  })
</script>

<template>
  <!--Notification main page-->
  <VCard class="text-center text-sm-start">
    <VRow no-gutters class="align-center justify-space-between">
      <VCol cols="auto">
        <VCardTitle class="text-md-h5 text-primary">
          Notifications
        </VCardTitle>
      </VCol>
      <VCol cols="auto">
        <v-btn color="primary" @click="dialog=true" style="margin-right: 16px;">
          New Notification <VIcon icon="bx-message-add" />
        </v-btn>
      </VCol>
    </VRow>
    <VRow no-gutters>
      <VTabs
        v-model="activeTab"
        show-arrows
      >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />
      </VRow>
    <!--New Notification Modal-->
    <v-row justify="center"> 
      <v-dialog v-model="dialog" @click:outside="handleCloseNewNotificationModal" width="1024">
        <v-card>

          <v-row class="pl-13 pt-3">
                <v-col cols="12" sm="6" md="5">
                  <v-card-title>
                    <v-text-field label="Add Title" v-model="title" variant="underlined"></v-text-field>
                  </v-card-title>
                </v-col>
                <v-col class=" pt-10" cols="12" sm="6" md="2">
          <v-menu >
            <template v-slot:activator="{ props }">
              <v-btn 
              variant="text"
              v-bind="props"
              prepend-icon="ic:round-plus"
            >
              Add field to title
            </v-btn>
          </template>
      <v-list >
        <v-list-item
          v-for="(item, index) in titleDropdownList"
          :key="index"
          :value="index"
          @click="insertValueTitle(item.value)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      </v-col>
                
            </v-row>   
              
          
          <v-row class="pl-15 my-n1">
            <v-col cols="12" sm="6" md="6">
              <v-btn
        variant="text"
        @click="length--"
      >
        Standard
      </v-btn>
      <v-btn
        variant="text"
        @click="length++"
      >
        Scheduled
      </v-btn>
      <v-btn
        variant="text"
        @click="length++"
      >
        Automated
      </v-btn>
              </v-col>
            </v-row>
            <v-row>
              </v-row>
              <v-row class="pl-9 my-n1">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          prepend-icon="bx:time"
          placeholder="Send Immediately"
          variant="plain"
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="pl-7 my-n2">
      <v-col cols="12" sm="6" md="4">
        <v-btn
        variant="text"
        @click="addUsersModal=true"
        prepend-icon="ph:users-bold"
      >
      <span class="pl-2">Add users</span>
      </v-btn>
      </v-col>
    </v-row>
    <v-row >
      <v-col cols="12" sm="6" md="4">
        <v-btn class="mx-15"
        variant="text"
        @click="loadPreviousNotificationsModal=true"
        prepend-icon="ic:round-plus"
      >
        Load previous notification
      </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="4">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
              variant="text"
              v-bind="props"
              prepend-icon="ic:round-plus"
            >
              Add field to message
            </v-btn>
          </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
          @click="insertValue(item.value)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-textarea class="pl-15 custom-textarea my-n4"
        name="input-7-1"
        variant="filled"
        label="Message"
        auto-grow
        model-value=""
        v-model="message"
        @input="handleTextareaInput($event)"
      />
    </v-container>
        <v-card-actions>
          <v-spacer/>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="handleCloseNewNotificationModal"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="handleSaveNotification"
            >
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--Load Previous Notification modal-->
      <v-row justify="center"> 
        <v-dialog v-model="loadPreviousNotificationsModal" width="1200">
          <v-card>
            <v-card-title class="pt-5">
                <span class="text-h7 ">Click on a notification to load it</span>
            </v-card-title>
            <v-data-table
              v-model:items-per-page="itemsPerPage"
              :headers="previousNotificationHeaders"
              :items="messageTemplateData"
              item-value="title"
              class="elevation-1"
            >
              <template v-slot:item.title="{ item }">
                <tr>
                  <td><span style="cursor: pointer;" @click="handlePrevNotificationRowClick(item.selectable.sid)">{{ item.columns.title }}</span></td>
                  </tr>
              </template>
              <template v-slot:item.message="{ item }">
                <tr>
                  <td><span style="cursor: pointer;" @click="handlePrevNotificationRowClick(item.selectable.sid)">{{ item.columns.message }}</span></td>
                </tr>
              </template>
              <template v-slot:item.date="{ item }">
                <tr>
                  <td><span style="cursor: pointer;" @click="handlePrevNotificationRowClick(item.selectable.sid)">{{ item.columns.date }}</span></td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-dialog>
      </v-row>
    <!--End of Load Previous Notification modal-->

    <!--Add Users Modal-->
    <v-row justify="center"> 
        <v-dialog v-model="addUsersModal" width="1200">
          <v-card>
            <v-card-title class="pt-5">
                <span class="text-h7 ">Select a user to add as a recipient</span>
            </v-card-title>
            <v-data-table
              v-model:items-per-page="itemsPerPage"
              :headers="addUsersHeaders"
              :items="userData"
              item-value="name"
              class="elevation-1"
            >
              <template v-slot:item.userSelected="{ item }">
                <v-checkbox-btn
                  v-model="item.columns.userSelected"
                  @change="handleCheckboxChange(item)"
                ></v-checkbox-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-dialog>
      </v-row>
    <!--End of Add Users Modal-->

    <!--Snackbar-->
      <div class="text-center">
        <v-snackbar
          v-model="saveNotificationSnackbar"
          :timeout="snackbarTimeout"
        >
          {{ snackbarText }}

          <template v-slot:actions>
            <v-btn
              color="blue"
              variant="text"
              @click="saveNotificationSnackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    <!--End of Snackbar-->  

    <!--Flag status modal-->
    <v-row justify="center"> 
      <v-dialog v-model="messageStatusModal" width="1200">
        <v-card>
          <v-card-title>
              <span class="text-h7">{{displayMessageTitle}}</span>
          </v-card-title>
          <v-row>
          
              <v-col cols="12" sm="6" md="8" class="pl-9 pb-8">
              <span >{{displayMessage}}</span>
              </v-col>
            </v-row>
          <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="firstTableData"
            item-value="name"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-dialog>
    </v-row>
    <v-data-table
      v-model:items-per-page="notificationsPerPage"
      :headers="notificationHeaders"
      :items="data"
      item-value="title"
      class="elevation-1 pt-5"
    >
    <template v-slot:item.title="{ item }">
      <tr>
        <td><span style="cursor: pointer;" @click="handleFlagClick(item.selectable.id)">{{ item.columns.title }}</span></td>
        </tr>
    </template>
    <template v-slot:item.body="{ item }">
      <tr>
        <td><span style="cursor: pointer;" @click="handleFlagClick(item.selectable.id)">{{ item.columns.body }}</span></td>
      </tr>
    </template>
    <template v-slot:item.date="{ item }">
      <tr>
        <td><span style="cursor: pointer;" @click="handleFlagClick(item.selectable.id)">{{ item.columns.date }}</span></td>
      </tr>
    </template>
    </v-data-table>
  </VCard>
</template>

<style lang="scss" scoped>
.clickable-cell {
  cursor: pointer;
}

.custom-text-field::placeholder {
  cursor: pointer;
}

.custom-textarea {
  inline-size: 55%; /* Adjust the width as needed */
}
</style>
