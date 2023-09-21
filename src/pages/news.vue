<script setup>
  import axios from 'axios';
import { onMounted, ref } from 'vue';
import { formatDate } from "../utils/common";

  const apiBaseUrl = "http://localhost:9000";
  const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";
  const selectedUsers = ref([]);
  /*RULES*/
  const rules = {
    required: value => !!value || 'Required.',
    counter: value => value.length <= 20 || 'Max 20 characters',
    email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    },
  }

  const extractURL = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
  }

  /*New Notification Fields*/
  const title = ref("");
  const news = ref("");
  const users = ref([]);

  /*Snackbar*/
  const saveNotificationSnackbar = ref(false)
  const snackbarText = ref('News successfully sent');
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

  /*Checkboxes*/
  const allUsersCheckbox = ref(false)

  /*Headers*/
  const previousNotificationHeaders = ref([
    { title: "Title", align: 'start', key: 'title'},
    { title: 'news', align: 'start', key: 'news' },
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
    { title: "Title", align: 'center', key: 'title', width: '300px'},
    { title: 'Content', align: 'left', key: 'content' },
    { title: 'Date Sent', align: 'center', key: 'date_sent', width: '200px' },
  ])

  const headers= ref([{ title: "Name", align: 'start', key: 'name'},
                      { title: 'Email', align: 'start', key: 'email' },
                      { title: 'News Status', align: 'start', key: 'newsStatus'},
                      { title: 'Received On', align: 'start', key: 'received'},
                      { title: 'Read On', align: 'start', key: 'read'},
                      { title: 'Closed On', align: 'start', key: 'closed'},
                    ])

  const activeNotificationModalTab = ref("Standard")    
  const activeNotificationTabs = [
    { title: 'All', tab: 'All' },
    { title: 'Standard', tab: 'Standard' },
    { title: 'Automated', tab: 'Automated' },
    { title: 'Scheduled', tab: 'Scheduled' },
  ];

  const notificationModalTabs = [
    { title: 'Standard', tab: 'Standard' },
    { title: 'Automated', tab: 'Automated' },
    { title: 'Scheduled', tab: 'Scheduled' },
  ];
  

  /*Methods*/
  const handlePrevNotificationRowClick = (sid) => {
    const clickedItem = messageTemplateData.value.find(item => item.sid === sid);
    title.value = clickedItem.title
    news.value = clickedItem.news
    loadPreviousNotificationsModal.value = false
  }

  const handleCloseNewNotificationModal = () => {
    dialog.value = false
    title.value = ""
    news.value = ""
    users.value = []
    for (const user of userData.value) {
      user.userSelected = false;
    }
  }

  const handleCheckboxChange = (item) => {
    const userSid = item.raw.sid
    if (selectedUsers.value.includes(userSid)) 
    {
      const indexToRemove = selectedUsers.value.indexOf(userSid);
      if (indexToRemove !== -1) 
      {
        selectedUsers.value.splice(indexToRemove, 1);
      }
      const userToUpdate = userData.value.find(user => user.sid === userSid);
      if (userToUpdate) 
      {
        userToUpdate.userSelected = false;
      }
    }
    else 
    {
      selectedUsers.value.push(userSid);
      const userToUpdate = userData.value.find(user => user.sid === userSid);
      if (userToUpdate) 
      {
        userToUpdate.userSelected = true;
      }
    }
    if (userData.value.length !== selectedUsers.value.length)
    {
      allUsersCheckbox.value = false;
    }
  };

  const handleAddAllUsers = () => {
    allUsersCheckbox.value = !allUsersCheckbox.value
    if (allUsersCheckbox.value === true) 
    {
      selectedUsers.value.length = 0;
      userData.value.forEach(user => {
        user.userSelected = true;
      });
      selectedUsers.value.push(...userData.value.map(user => user.sid));
    } 
    else if (allUsersCheckbox.value === false) 
    {
      userData.value.forEach(user => {
        user.userSelected = false;
      });
      selectedUsers.value.length = 0;
    } 
  }

  /*Functions*/
  const isSendButtonDisabled = computed(() => {
    return !title.value.length || !news.value.length || !selectedUsers.value.length;
  });

  const userText = computed(() => {
    const userCount = selectedUsers.value.length;
    if (userCount === 0) {
      return "No users added";
    } else if (userCount === 1) {
      return "1 user added";
    } else {
      return `${userCount} users added`;
    }
  });


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
            news.value = event.target.value.substr(0, cursorPosition - item.value.length) + event.target.value.substr(cursorPosition);
            break;
          }
        }
      };

  const insertValue = (m) => {
    const lastCharacter = news.value.slice(-1);
      if (lastCharacter === ' ') {
        news.value += m; // Append the new value without a space
      } else {
        news.value += ' ' + m; // Append the new value with a space
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
      const response = await axios.get(`http://localhost:9000/news`,{
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response && response.status === 200) {
        if (response.data) {
          const uniqueNews = {};
          let idCounter = 1;
          response.data.forEach((news) => {
            const key = news.title + news.date_sent;

            if (!uniqueNews[key]) {
              uniqueNews[key] = {
                ...news,
                sids: [],
                newsStatus: [],
                newsReceived:[],
                read: [],
                closed: [],
                id: idCounter
              };
              idCounter++;
            }

            if(news.received_date){
              uniqueNews[key].newsReceived.push(news.received_date)
            }
            else{
              uniqueNews[key].newsReceived.push("Not yet received");
            }
              

            news.opened_date ? 
              uniqueNews[key].read.push(news.opened_date) :
              uniqueNews[key].read.push("Not yet read");

              news.closed_date ? 
              uniqueNews[key].closed.push(news.closed_date) :
              uniqueNews[key].closed.push("Not yet closed");  

            uniqueNews[key].sids.push(news.user_sid);
            if (news.date_sent && !news.received_date &&
                !news.opened_date && !news.closed_date){
              uniqueNews[key].newsStatus.push("Pending");
            }
            else if (news.date_sent && news.received_date &&
                !news.opened_date && !news.closed_date){
                  uniqueNews[key].newsStatus.push("Received");
            }
            else if (news.date_sent && news.received_date && 
            news.opened_date && !news.closed_date){
                  uniqueNews[key].newsStatus.push("Opened");
            }
            else if (news.date_sent && news.received_date && 
            news.opened_date && news.closed_date){
                  uniqueNews[key].newsStatus.push("Closed");
            }
          });
          
          const filteredNews = Object.values(uniqueNews);
          data.value = filteredNews;
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
      }
    } 
    catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleFlagClick = (id) => {
    messageStatusModal.value = true;
    const clickedItem = data.value.find(item => item.id === id);
    console.log(clickedItem)
    displayMessageTitle.value = clickedItem.title
    displayMessage.value = clickedItem.content
    firstTableData.value = userData.value.filter(users => clickedItem.sids.includes(users.sid));
    const { newsStatus, newsReceived, read, closed } = clickedItem;
    firstTableData.value.forEach((item, index) => {
      if (newsStatus[index]) {
        item.newsStatus = newsStatus[index];
        item.received = newsReceived[index];
        item.read = read[index];
        item.closed = closed[index];
      } else {
        item.newsStatus = "Unknown";
      }
    });
  }

  const handleSaveNotification = async () => {
    const formattedUserIds = selectedUsers.value.map(user_id => ({ "user_id": user_id.toString() }));
    try {
      
      const response = await axios.post(`http://localhost:9000/send-news`, {
        title: title.value,
        content: news.value,
        date: formatDate(),
        user_sid: formattedUserIds,
      })
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
  });
</script>

<template>
  <!--Notification main page-->
  <VCard class="text-center text-sm-start pt-4">
    <VRow no-gutters class="align-center justify-space-between">
      <VCol cols="auto">
        <VCardTitle class="text-md-h5 text-primary">
          News
        </VCardTitle>
      </VCol>
      <VCol cols="auto" class="pr-4">
        <v-btn color="primary" prepend-icon="ic:round-plus" @click="dialog=true"  >
          Add News Article
        </v-btn>
      </VCol>
    </VRow>

    <!--NEW NEWS PAGE MODAL-->
      <v-row justify="center"> 
        <v-dialog v-model="dialog" @click:outside="handleCloseNewNotificationModal" width="1024">
          <v-card>
            <v-row class="pl-4 pt-3">
              <v-col cols="12" sm="6" md="5">
                <v-card-title>
                  <v-text-field 
                    label="Add Title" 
                    v-model="title" 
                    variant="underlined" 
                  />
                </v-card-title>
              </v-col>
            </v-row>             

      
            <v-row class="my-n2">
        <v-col class="pl-10" cols="12" sm="6" md="4">
          <v-btn
            variant="text"
            @click="addUsersModal=true"
            prepend-icon="ph:users-bold"
          >
            <span class="pl-2">{{userText}}</span>
          </v-btn>
        </v-col>
        <v-col class="mx-n12" cols="12" sm="6" md="8 ">
          <v-checkbox
            v-model="allUsersCheckbox"
            label="Add all users"
            @click="handleAddAllUsers"
          ></v-checkbox>
        </v-col>
      </v-row>
      
      <v-container fluid>
        <v-textarea 
          class="pl-5 custom-textarea my-n4"
          name="input-7-1"
          variant="filled"
          label="Content"
          auto-grow
          model-value=""
          v-model="news"
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
                :disabled="isSendButtonDisabled"
              >
                Send
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

    

    <!--Add Users Modal-->
    <v-row justify="center"> 
        <v-dialog v-model="addUsersModal" width="800">
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
            <v-card-actions>
            <v-spacer/>
              <v-btn
                class="pt-2"
                color="blue-darken-1"
                variant="text"
                @click="addUsersModal=false"
              >
                Ok
              </v-btn>
            </v-card-actions>
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
      class="elevation-1 pt-5 pl-6 pr-4"
    >
    <template v-slot:item.title="{ item }">
      <tr>
        <td><span style="cursor: pointer;" @click="handleFlagClick(item.selectable.id)">{{ item.columns.title }}</span></td>
        </tr>
    </template>
    <template v-slot:item.content="{ item }">
  <tr>
    <td v-html="extractURL(item.columns.content)"></td>
  </tr>
</template>
    <template v-slot:item.date_sent="{ item }">
      <tr>
        <td><span style="cursor: pointer;" @click="handleFlagClick(item.selectable.id)">{{ item.columns.date_sent }}</span></td>
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
  inline-size: 98%; /* Adjust the width as needed */
}

.v-tabs .v-tabs-bar .v-tab .v-tab__slider {
  display: none;
}

.dark-bg {
  background-color: #333; /* Adjust this value to your desired darkness */
}
</style>
