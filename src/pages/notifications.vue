<script setup>
  import axios from 'axios';
import { onMounted, ref } from 'vue';
import 'vue-datepicker-ui/lib/vuedatepickerui.css';
import { useRouter } from 'vue-router';
import { formatDate } from "../utils/common";
import config from "../utils/config";
import Placeholders from '../layouts/components/Placeholders.vue';

const router = useRouter()
  
  const apiBaseUrl = "http://localhost:9000";
  const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";
  const showAlert = ref(false)
  const messageDueDays = ref(1);
  const date = ref(null)
  /*RULES*/
  const rules = {
    required: value => !!value || 'Required.',
    counter: value => value.length <= 20 || 'Max 20 characters',
    email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    },
  }

  /*New Notification Fields*/
  const title = ref("");
  const message = ref("");
  const users = ref([]);
  const selectedPolicies = ref([]);
  const selectedUsers = ref([]);
  
  const messageArray = ref(null)
  const scheduledMessageArray = ref(null)
  const triggerMessageArray = ref(null)
  
  const policyData = ref([])
  const daysOverdue = ref(1);


  /*Modal Dropdown Lists*/
  const titleDropdownList = [
    { title: 'First Name', value:"{First Name}"},
    { title: 'Last Name', value: '{Last Name}'},
    { title: 'Policy', value: '{Policy}'},
    { title: 'Date', value: '{Date}'},
    { title: 'Days in arrears', value: '{Days in arrears}'},
  ]

  const items = [
    { title: 'First Name', value:"{First Name}"},
    { title: 'Last Name', value: '{Last Name}'},
    { title: 'Policy', value: '{Policy}'},
    { title: 'Date', value: '{Date}'},
    { title: 'Days in arrears', value: '{Days in arrears}'}
  ]

  const numbers = Array.from({ length: 31 }, (_, i) => i + 1);
  const days = ["Daily", "Weekly", "Monthly"]

  /*Data*/
  const messageTemplateData = ref(null)
  const userData = ref(null);

  /*Modals*/
  const loadPreviousNotificationsModal = ref(false);
  const addUsersModal = ref(false);
  const addPolicyModal = ref(false);

  /*Checkboxes*/
  const allUsersCheckbox = ref(false);
  const allPoliciesCheckbox = ref(false);

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

  const addPolicyHeaders = ref([
    { title: "Name", align: 'start', key: 'policy_name'},
    { title: 'Short Description', align: 'start', key: 'short_description' },
    { title: 'Date Created', align: 'start', key: 'date_policy_details' },
    { title: 'Selected', align: 'start', key: 'policySelected' },
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
    { title: "Title", align: 'center', key: 'title', width: "250px"},
    { title: 'Message', align: 'left', key: 'body',width: "500px"},
    { title: 'Date Sent', align: 'center', key: 'date_sent',width: "200px"},
    { title: 'Pending', align: 'center', key: 'count_pending',width: "100px"},
    { title: 'Received', align: 'center', key: 'count_received',width: "100px"},
    { title: 'Opened', align: 'center', key: 'count_opened',width: "100px"},
    { title: 'Closed', align: 'center', key: 'count_closed',width: "100px" },
  ])

  const headers= ref([{ title: "Name", align: 'start', key: 'name'},
                      { title: 'Email', align: 'start', key: 'email' },
                      { title: 'Date Sent', align: 'start', key: 'date_sent' },
                      { title: 'Message Status', align: 'start', key: 'messageStatus'},
                      { title: 'Received On', align: 'start', key: 'received'},
                      { title: 'Read On', align: 'start', key: 'read'},
                      { title: 'Closed On', align: 'start', key: 'closed'},
                    ])

  const activeNotificationModalTab = ref("Personal")  
  const activeTab = ref("All")  
  const activeNotificationTabs = [
    { title: 'All', tab: 'All' },
    { title: 'Manual', tab: 'Personal' },
    { title: 'Scheduled', tab: 'Scheduled' },
    { title: 'Automated', tab: 'Trigger' },
  ];

  const notificationModalTabs = [
    { title: 'Manual', tab: 'Personal' },
    { title: 'Scheduled', tab: 'Scheduled' },
    { title: 'Automated', tab: 'Triggered' },
  ];

  const editDateModal = ref(false)
  
  const editItem = (item) => {
    console.log(item)
    editDateModal.value = true
    dialog.value = true
    activeNotificationModalTab.value = "Scheduled"
    title.value = item.title;
    date.value = item.date_to_send;
    lastName.value = item.last_name;
    admin.value = item.admin;
    if (item.active === "Yes")
      active.value = "Active";
    else{
      active.value = "Deactivated";
    }
  }


  watch(activeTab, (newTab) => {
    if (newTab === 'Scheduled') {
      notificationHeaders.value.splice(2, 0, { title: 'Date Created', align: 'center', key: 'date_created', width: "200px" });
      notificationHeaders.value.push({ title: 'Actions', align: 'end', key: 'actions', sortable: false });
    } else {
      const index = notificationHeaders.value.findIndex(header => header.key === 'date_created');
      if (index !== -1) {
        notificationHeaders.value.splice(index, 1);
      }
    }
  });


  /*Methods*/
  const handlePrevNotificationRowClick = (sid) => {
    const clickedItem = messageTemplateData.value.find(item => item.sid === sid);
    title.value = clickedItem.title
    message.value = clickedItem.message
    loadPreviousNotificationsModal.value = false
  }

  const handleCloseNewNotificationModal = () => {
    dialog.value = false
    selectedUsers.value = []
    selectedPolicies.value = []
    allUsersCheckbox.value = false
    allPoliciesCheckbox.value = false
    title.value = ""
    message.value = ""
    userData.value.forEach((user) => {
      user.userSelected = false
    })
    policyData.value.forEach((policy) => {
      policy.policySelected = false
    })
  }


  const handleUserCheckbox = (item) => {
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


  const handlePolicyCheckbox = (item) => {
    const policySid = item.raw.sid
    if (selectedPolicies.value.includes(policySid)) 
    {
      const indexToRemove = selectedPolicies.value.indexOf(policySid);
      if (indexToRemove !== -1) 
      {
        selectedPolicies.value.splice(indexToRemove, 1);
      }
      const policyToUpdate = policyData.value.find(policy => policy.sid === policySid);
      if (policyToUpdate) 
      {
        policyToUpdate.policySelected = false;
      }
    }
    else 
    {
      selectedPolicies.value.push(policySid);
      const policyToUpdate = policyData.value.find(policy => policy.sid === policySid);
      if (policyToUpdate) 
      {
        policyToUpdate.policySelected = true;
      }
    }
    if (policyData.value.length !== selectedPolicies.value.length)
    {
      allPoliciesCheckbox.value = false;
    }
    console.log(selectedPolicies.value)
  };


  const addAllUsers = () => {
    allUsersCheckbox.value = !allUsersCheckbox.value
    if (allUsersCheckbox.value === true) 
    {
      selectedUsers.value.length = 0;
      filteredUserData.value.forEach(user => {
        user.userSelected = true;
      });
      selectedUsers.value.push(...filteredUserData.value.map(user => user.sid));
    } 
    else if (allUsersCheckbox.value === false) 
    {
      filteredUserData.value.forEach(user => {
        user.userSelected = false;
      });
      selectedUsers.value.length = 0;
    } 
  }

  const addAllPolicies = () => {
    allPoliciesCheckbox.value = !allPoliciesCheckbox.value
    if (allPoliciesCheckbox.value === true) 
    {
      selectedPolicies.value.length = 0;
      policyData.value.forEach(policy => {
        policy.policySelected = true;
      });
      selectedPolicies.value.push(...policyData.value.map(policy => policy.sid));
    } 
    else if (allPoliciesCheckbox.value === false) 
    {
      policyData.value.forEach(policy => {
        policy.policySelected = false;
      });
      selectedPolicies.value.length = 0;
    } 
  }

  /*Functions*/
  const isSendButtonDisabled = computed(() => {
    return !title.value.length || !message.value.length || !selectedUsers.value.length
  });

  const selectedData = computed(() => {
    if (activeTab.value === 'All') {
        return data.value;
      } else if (activeTab.value === 'Personal') {
        return messageArray.value;
      } else if (activeTab.value === 'Trigger') {
        return triggerMessageArray.value;
      } else if (activeTab.value === 'Scheduled') {
        return scheduledMessageArray.value;
      }
      else {
        return [];
      }
  });

  const filteredUserData = computed(() => {
    if (selectedPolicies.value.length){
      const userFkArrays = [];
      selectedPolicies.value.forEach(sid => {
        const policy = policyData.value.find(policy => policy.sid === sid);
        if (policy) {
          userFkArrays.push(policy.user_fk);
        }
      });
      const matchingUsers = [];
      userData.value.forEach(user => {
        if (userFkArrays.some(fkArray => fkArray.includes(user.sid))) {
          matchingUsers.push(user);
        }
      });
      return matchingUsers
    }
    else {
      return userData.value
    }
  });

  const userText = computed(() => {
    const userCount = selectedUsers.value.length;
    if (userCount === 0) {
      return "Add User";
    } else if (userCount === 1) {
      return "1 user added";
    } else {
      return `${userCount} users added`;
    }
  });

  const showAddUserButton = ref(false)

  const policyText = computed(() => {
    const policyCount = selectedPolicies.value.length;
    if (policyCount === 0) {
      showAddUserButton.value = false;
      selectedUsers.value = []
      userData.value.forEach(user => {
        user.userSelected = false;
      });
      allUsersCheckbox.value = false
      return "Add Policy";
    } else if (policyCount === 1) {
      showAddUserButton.value = true
      selectedUsers.value = []
      userData.value.forEach(user => {
        user.userSelected = false;
      });
      allUsersCheckbox.value = false
      return "1 policy added";
    } else {
      showAddUserButton.value = true
      selectedUsers.value = []
      userData.value.forEach(user => {
        user.userSelected = false;
      });
      allUsersCheckbox.value = false
      return `${policyCount} policies added`;
    }
  });

  const daysText = computed(() => {
    const days = daysOverdue.value;
    if (days === 1) {
      return "1 Day Overdue";
    } else if (days > 1) {
      return `${days} Days Overdue`;
    } 
  });

  const daysDueText = computed(() => {
    const days = messageDueDays.value;
    if (days === 1) {
      return "Resend Every Day";
    } else if (days > 1) {
      return `Resend every ${days} days`;
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

  const getPolicies = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/user_policy_view`,{
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response && response.status === 200) {
        const combinedPolicies = response.data.reduce((result, policy) => {
          const key = `${policy.policy_name}-${policy.date_policy_details}`;
          if (!result[key]) {
            result[key] = {
              sid: policy.sid_policy_details,
              policy_name: policy.policy_name,
              short_description: policy.short_description,
              date_policy_details: policy.date_policy_details,
              premium_due_date: policy.premium_due_date,
              user_fk: [policy.user_fk],
            };
          } else {
            result[key].user_fk.push(policy.user_fk);
          }
          return result;
        }, {});
        const combinedPolicyArray = Object.values(combinedPolicies);
        policyData.value = combinedPolicyArray;
        policyData.value.forEach((policy) => {
          policy.userSelected = false
        })
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

  

  const insertNumber = (m) => {
    daysOverdue.value = m
  }

  const insertDays = (m) => {
    messageDueDays.value = m
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
            const key = message.template_fk;

            if (!uniqueMessages[key]) {
              uniqueMessages[key] = {
                ...message,
                count: 0,
                sids: [],
                messageStatus: [],
                messageReceived:[],
                read: [],
                closed: [],
                id: idCounter,
                count_pending:0,
                count_received:0,
                count_opened:0,
                count_closed:0
              };
              idCounter++;
            }

            uniqueMessages[key].count++;


            if(message.received_date)
            {
              uniqueMessages[key].messageReceived.push(message.received_date)
            }
            else
            {
              uniqueMessages[key].messageReceived.push("Not yet received");
            }

            if(message.read_date)
            {
              uniqueMessages[key].read.push(message.read_date)
            }
            else
            {
              uniqueMessages[key].read.push("Not yet read");
            }

            if(message.closed_date)
            {
              uniqueMessages[key].closed.push(message.closed_date)
            }
            else
            {
              uniqueMessages[key].closed.push("Not yet closed");
            }


            uniqueMessages[key].sids.push(message.user_fk);
            if (message.date_sent && !message.received_date &&
                !message.read_date && !message.closed_date){
              uniqueMessages[key].messageStatus.push("Pending");
              uniqueMessages[key].count_pending++;
            }
            else if (message.date_sent && message.received_date &&
                !message.read_date && !message.closed_date){
                  uniqueMessages[key].messageStatus.push("Received");
                  uniqueMessages[key].count_received++;
            }
            else if (message.date_sent && message.received_date && 
            message.read_date && !message.closed_date){
                  uniqueMessages[key].messageStatus.push("Opened");
                  uniqueMessages[key].count_received++;
                  uniqueMessages[key].count_opened++;
            }
            else if (message.date_sent && message.received_date && 
            message.read_date && message.closed_date){
                  uniqueMessages[key].messageStatus.push("Closed");
                  uniqueMessages[key].count_received++;
                  uniqueMessages[key].count_opened++;
                  uniqueMessages[key].count_closed++;
            }
          });
          
          const filteredMessages = Object.values(uniqueMessages);
          filteredMessages.forEach(item => {
            if (!item.date_sent) {
              item.date_sent = "Not yet sent";
            }
          });
          messageArray.value = filteredMessages.filter(message => message.flag === 'message');
          scheduledMessageArray.value = filteredMessages.filter(message => message.flag === 'scheduled_message');
          triggerMessageArray.value = filteredMessages.filter(message => message.flag === 'automated_message');
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
    firstTableData.value = userData.value.filter(users => clickedItem.sids.includes(users.sid));
    
    const { messageStatus, messageReceived, read, closed, date_sent, date_created } = clickedItem;
    console.log(clickedItem)
    console.log(date_sent)
    firstTableData.value.forEach((item, index) => {
      if (messageStatus[index]) {
        item.dateSent = date_sent ? date_sent : "Not yet sent";
        item.dateCreated = date_created;
        item.messageStatus = messageStatus[index];
        item.received = messageReceived[index];
        item.read = read[index];
        item.closed = closed[index];
      } else {
        item.messageStatus = "Unknown";
      }
    });
    console.log(firstTableData)
  }
  const handleSaveNotification = async () => {
    var payload
    const formattedUserIds = selectedUsers.value.map(user_sid => ({ "user_id": user_sid.toString() }));
    const formattedPolicyIds = selectedPolicies.value.map(policy_sid => ({ "policy_id": policy_sid.toString() }));
    if (activeNotificationModalTab.value === "Personal"){
      payload = {
        title: title.value,
        message: message.value,
        policy_id: formattedPolicyIds,
        user_id: formattedUserIds,
        message_type: "message",
        date_to_send: ""
      }
    }
    else if (activeNotificationModalTab.value === "Scheduled"){
      payload = {
        title: title.value,
        message: message.value,
        policy_id: formattedPolicyIds,
        user_id: formattedUserIds,
        message_type: "scheduled_message",
        date_to_send: formatDate(date.value)
      }
    }
    else if (activeNotificationModalTab.value === "Triggered"){
      payload = {
        title: title.value,
        message: message.value,
        arrears_days: daysOverdue.value,
        policy_id: formattedPolicyIds,
        user_id: formattedUserIds,
        message_type: "automated_message",
        date_to_send: ""
      }
    }
    try {
      const response = await axios.post(`${config.local}/send_message`, payload, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      })
      if (response && response.status === 200) {
        showAlert.value = true
        dialog.value=false
        selectedUsers.value = []
        selectedPolicies.value = []
        allUsersCheckbox.value = false
        allPoliciesCheckbox.value = false
        title.value = ""
        message.value = ""
        date.value = ""
        userData.value.forEach((user) => {
          user.userSelected = false
        })
        policyData.value.forEach((policy) => {
          policy.policySelected = false
        })
        setTimeout(() => {
          showAlert.value = false;
        }, 5000);
        
        fetchMessage();
        getMessageTemplate();
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
    getPolicies()
    
  });

  const titleRef = ref(null)

  const updateTitle = (updatedTitle) => {
    title.value = updatedTitle
  }
  const updateMessage = (updatedMessage) => {
    message.value = updatedMessage
  }

  const titleText = ref(null)
  watch(title, (newValue, oldValue) => {
    const textField = titleText.value; // Get the reference to the text field
    const cursorPosition = textField.selectionStart;

  });

</script>

<template>
  <!--Notification main page-->
  <v-card class="text-center text-sm-start pt-4">
    <VRow no-gutters class="align-center justify-space-between">
      <VCol cols="auto">
        <VCardTitle class="text-md-h5 text-primary">
          Notifications
        </VCardTitle>
      </VCol>
      <VCol cols="auto pr-5">
        <v-btn color="primary" prepend-icon="ic:round-plus" @click="dialog=true"  >
          Add New Notification
        </v-btn>
      </VCol>
    </VRow>

    <!--NOTIFICATION TABS-->
      <VRow no-gutters class="pl-5">
        <VTabs
          v-model="activeTab"
          show-arrows
          class="custom-tabs"
        >
          <VTab
            v-for="item in activeNotificationTabs"
            :key="item.icon"
            :value="item.tab"
          >
            {{ item.title }}
          </VTab>
        </VTabs>
      </VRow>
    <!--END OF NOTIFICATION TABS-->

    <!--New Notification Modal-->
      <v-row justify="center"> 
        <v-dialog v-model="dialog" @click:outside="handleCloseNewNotificationModal" width="1024">
          <v-card>
            <v-row class="pl-13 pt-3">
                  <v-col cols="12" sm="6" md="5">
                    <v-card-title>
                      <v-text-field 
                        label="Add Title" 
                        v-model="title" 
                        variant="underlined"
                        ref="titleText" 
                      />
                    </v-card-title>
                  </v-col>
                  <v-col class=" pt-10" cols="12" sm="6" md="2">
            <Placeholders 
              @placeholder="updateTitle" 
              :text="'Add field to title'" 
              :body="title" 
              :setRef="titleText"
            />
        </v-col>
                  
              </v-row>   
                
            
            <!--NOTIFICATION TABS-->
      <VRow no-gutters class="pl-15">
        <VTabs 
          v-model="activeNotificationModalTab"
          show-arrows
          class="custom-tabs pl-4"
        >
          <VTab
            v-for="item in notificationModalTabs"
            :key="item.icon"
            :value="item.tab"
          >
            {{ item.title }}
          </VTab>
        </VTabs>
      </VRow>
    <!--END OF NOTIFICATION TABS-->

      <v-row class="pl-9 my-n1"  v-if="activeNotificationModalTab === 'Personal'">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            prepend-icon="bx:time"
            placeholder="Send Immediately"
            variant="plain"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="pl-7 my-n1"  v-if="activeNotificationModalTab === 'Triggered'">
        <v-col cols="12" sm="6" md="4">
          <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                variant="text"
                v-bind="props"
                prepend-icon="bx:time"
              >
              <span class="pl-2">{{daysText}}</span>
              </v-btn>
            </template>
        <v-list>
          <v-list-item
            v-for="number in numbers"
            :key="number"
            :value="number"
            @click="insertNumber(number)"
          >
          <v-list-item-title>{{ number }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
        </v-col>
      </v-row>
      <v-row class="pl-8 my-n3"  v-if="activeNotificationModalTab === 'Scheduled'">
        <v-col cols="12" sm="6" md="4">
          <Datepicker 
            ref="datepickerRef"
            circle
            lang="en"
            v-model="date" 
            position="center"
            first-day-of-week="sunday"
            placeholder="SELECT SEND DATE"
            
            
          />
        </v-col>
      </v-row>
      <v-row class="my-n2">
        <v-col class="pl-10" cols="12" sm="6" md="4">
          <v-btn
            variant="text"
            @click="addPolicyModal=true"
            prepend-icon="bx-book-content"
          >
            <span class="pl-2">{{policyText}}</span>
          </v-btn>
        </v-col>
        <v-col class="mx-n12" cols="12" sm="6" md="8 ">
          <v-checkbox
            v-model="allPoliciesCheckbox"
            label="Add all policies"
            @click="addAllPolicies"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row class="my-n2">
        <v-col class="pl-10" cols="12" sm="6" md="4">
          <v-btn v-if="showAddUserButton"
            variant="text"
            @click="addUsersModal=true"
            prepend-icon="ph:users-bold"
          >
            <span class="pl-2">{{userText}}</span>
          </v-btn>
        </v-col>
        <v-col class="mx-n12" cols="12" sm="6" md="8 ">
          <v-checkbox v-if="showAddUserButton"
            v-model="allUsersCheckbox"
            label="Add all users"
            @click="addAllUsers"
          ></v-checkbox>
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
          <Placeholders @placeholder="updateMessage" :text="'Add field to message'" :body="message" />
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
                :disabled="isSendButtonDisabled"
              >
                Send
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row justify="center">
              <v-alert
                type="success"
                title="Success"
                text="Notification has been successfully sent!"
                v-model="showAlert"
              ></v-alert>
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

    <!--Add Policy Modal-->
    <v-row justify="center"> 
        <v-dialog v-model="addPolicyModal" width="800">
          <v-card>
            <v-card-title class="pt-5">
                <span class="text-h7 ">Select a policy to add as a reference</span>
            </v-card-title>
            <v-data-table
              v-model:items-per-page="itemsPerPage"
              :headers="addPolicyHeaders"
              :items="policyData"
              item-value="name"
              class="elevation-1"
            >
              <template v-slot:item.policySelected="{ item }">
                <v-checkbox-btn
                  v-model="item.columns.policySelected"
                  @change="handlePolicyCheckbox(item)"
                ></v-checkbox-btn>
              </template>
            </v-data-table>
            <v-card-actions>
            <v-spacer/>
              <v-btn
                class="pt-2"
                color="blue-darken-1"
                variant="text"
                @click="addPolicyModal=false"
              >
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    <!--End of Add Users Modal-->

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
              :items="filteredUserData"
              item-value="name"
              class="elevation-1"
            >
              <template v-slot:item.userSelected="{ item }">
                <v-checkbox-btn
                  v-model="item.columns.userSelected"
                  @change="handleUserCheckbox(item)"
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


    <!--Flag status modal-->
    <v-row justify="center"> 
      <v-dialog v-model="messageStatusModal" width="1200">
        <v-card>
          <v-card-title class="text-h7 pb-5">
            <span class="text-h7 pb-3">Message Status</span>
          </v-card-title>
          <v-row>
              <v-col cols="12" sm="6" md="8" class="pl-9">
                <span class="text-h7"><strong>Title:</strong> {{displayMessageTitle}}</span>
              </v-col>
          </v-row>
          <v-row>
              <v-col cols="12" sm="6" md="8" class="pl-9 pb-8 mt-n5">
              <span ><strong>Message:</strong> {{displayMessage}}</span>
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
    <div class="table-container">
    <v-data-table
      v-model:items-per-page="notificationsPerPage"
      :headers="notificationHeaders"
      :items="selectedData"
      item-value="title"
      class="elevation-1 pt-5 pl-5 pr-5 "
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
    <template v-slot:item.count_pending="{ item }">
      <td>
        <span style="cursor: pointer;" @click="handleFlagClick(item.selectable.id)">
          {{ item.selectable.count_pending === 0 ? 'None' : item.selectable.count_pending + '/' + item.selectable.count }}
        </span>
      </td>
    </template>
    <template v-slot:item.count_received="{ item }">
      <tr>
        <td><span style="cursor: pointer;" @click="handleFlagClick(item.selectable.id)">{{ item.selectable.count_received }}/{{ item.selectable.count }}</span></td>
      </tr>
    </template>
    <template v-slot:item.count_opened="{ item }">
      <tr>
        <td><span style="cursor: pointer;" @click="handleFlagClick(item.selectable.id)">{{ item.selectable.count_opened }}/{{ item.selectable.count }}</span></td>
      </tr>
    </template>
    <template v-slot:item.count_closed="{ item }">
      <tr>
        <td><span style="cursor: pointer;" @click="handleFlagClick(item.selectable.id)">{{ item.selectable.count_closed }}/{{ item.selectable.count }}</span></td>
      </tr>
    </template>
    <template v-slot:item.actions="{ item }">
            <v-icon
              size="small"
              class="me-2"
              @click="editItem(item.selectable)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              size="small"
              v-if="item.selectable.active === 'No'"
            >
              mdi-delete-off
            </v-icon>
            <v-icon
              size="small"
              @click="deleteItem(item.selectable.sid)"
              v-else
            >
              mdi-delete
            </v-icon>
          </template>
    </v-data-table>
  </div>
  </v-card>
</template>

<style lang="scss" scoped>
.clickable-cell {
  cursor: pointer;
}

.custom-text-field::placeholder {
  cursor: pointer;
}

.custom-textarea {
  inline-size: 75%; /* Adjust the width as needed */
}

.v-tabs .v-tabs-bar .v-tab .v-tab__slider {
  display: none;
}

.v-data-table {
  overflow-x: auto;
}

.v-data-table .pending-column {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
