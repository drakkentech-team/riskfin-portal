<script setup>
  import axios from 'axios';
import { onMounted, onUnmounted, reactive, ref } from 'vue';

  const data = ref([]);
  const user = ref([]);
  const dialog = ref(false);
  const showAlert = ref(false);
  const messageStatusModal = ref(false);
  const messageStatusHeading = ["Still pending","received", "read", "closed"]
  const messageStatusModalHeading = ref("");
  const firstTableData = ref([]);
  const secondTableData = ref([]);
  const showSecondTable = ref(true);
  const itemsPerPage = ref(5);
  const headers= ref([{ title: "First Name", align: 'start', key: 'name'},
                      { title: 'Last Name', align: 'end', key: 'surname' },
                      { title: 'Email', align: 'end', key: 'email' },
                      { title: 'Contact Number', align: 'end', key: 'mobile_number'}
                    ])

  const tabs = [
    { title: 'All', icon: 'bx:world', tab: 'account' },
    { title: 'Automated', icon: 'bx-bot', tab: 'security' },
    { title: 'Custom', icon: 'bx-pencil', tab: 'notification' },
    { title: 'Scheduled', icon: 'bx:time', tab: 'notification' },
  ];

  const fetchMessage = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:9000/messages`);
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
                flagCounts: { pending: 0, received: 0, opened: 0, closed: 0 },
                sids: { pending: [], received: [], notReceived:[], 
                        opened: [], notOpened: [], closed: [], notClosed:[]},
                id: idCounter
              };
              idCounter++;
            }

            uniqueMessages[key].count++;
            if (uniqueMessages[key].date && !uniqueMessages[key].received_date &&
                !uniqueMessages[key].opened_date && !uniqueMessages[key].closed_date){
              uniqueMessages[key].flagCounts.pending++;
              uniqueMessages[key].sids.pending.push(message.user_sid);
              uniqueMessages[key].sids.notReceived.push(message.user_sid);
              uniqueMessages[key].sids.notOpened.push(message.user_sid);
              uniqueMessages[key].sids.notClosed.push(message.user_sid);
            }
            else if (uniqueMessages[key].date && uniqueMessages[key].received_date &&
                !uniqueMessages[key].opened_date && !uniqueMessages[key].closed_date){
              uniqueMessages[key].flagCounts.received ++;
              uniqueMessages[key].sids.received.push(message.user_sid);
              uniqueMessages[key].sids.notOpened.push(message.user_sid);
              uniqueMessages[key].sids.notClosed.push(message.user_sid);
            }
            else if (uniqueMessages[key].date && uniqueMessages[key].received_date && 
                uniqueMessages[key].opened_date && !uniqueMessages[key].closed_date){
              uniqueMessages[key].flagCounts.received ++;
              uniqueMessages[key].flagCounts.opened ++;
              uniqueMessages[key].sids.received.push(message.user_sid);
              uniqueMessages[key].sids.opened.push(message.user_sid);
              uniqueMessages[key].sids.notClosed.push(message.user_sid);
            }
            else if (uniqueMessages[key].date && uniqueMessages[key].received_date && 
                uniqueMessages[key].opened_date && uniqueMessages[key].closed_date){
                  uniqueMessages[key].flagCounts.received ++;
                  uniqueMessages[key].flagCounts.opened ++;
              uniqueMessages[key].flagCounts.closed ++;
              uniqueMessages[key].sids.received.push(message.user_sid);
              uniqueMessages[key].sids.opened.push(message.user_sid);
              uniqueMessages[key].sids.closed.push(message.user_sid);
            }
          });
          
          const filteredMessages = Object.values(uniqueMessages);
          console.log(filteredMessages)
          data.value = filteredMessages;
          console.log('Data:', data.value);
        }
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const r = await axios.get(`http://localhost:9000/all_user_profile`);
      if (r && r.status === 200) {
        if (r) {
          user.value = r.data;
          console.log('User:', user.value);
        }
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleFlagClick = (flagIndex, id) => {
    messageStatusModal.value = true;
    messageStatusModalHeading.value = messageStatusHeading[flagIndex];
    const clickedItem = data.value.find(item => item.id === id);
    console.log('clickedItem', clickedItem)
    if (flagIndex === 0){
      firstTableData.value = user.value.filter(users => clickedItem.sids.pending.includes(users.sid_users));
      showSecondTable.value = false;
    }
    else if (flagIndex === 1 && user){
      firstTableData.value = user.value.filter(users => clickedItem.sids.received.includes(users.sid_users));
      secondTableData.value = user.value.filter(users => clickedItem.sids.notReceived.includes(users.sid_users));
      showSecondTable.value = secondTableData.value.length > 0;
    }
    else if (flagIndex === 2){
      firstTableData.value = user.value.filter(users => clickedItem.sids.opened.includes(users.sid_users));
      secondTableData.value = user.value.filter(users => clickedItem.sids.notOpened.includes(users.sid_users));
      showSecondTable.value = secondTableData.value.length > 0;
    }
    else if (flagIndex === 3){
      firstTableData.value = user.value.filter(users => clickedItem.sids.closed.includes(users.sid_users));
      secondTableData.value = user.value.filter(users => clickedItem.sids.notClosed.includes(users.sid_users));
      showSecondTable.value = secondTableData.value.length > 0;
    }
    console.log(`Clicked on flag index ${flagIndex} for item`);
  }

  const handleSaveNotification = async () => {
    try {
      const response = await axios.post(`https://41ba-13-246-23-177.ngrok-free.app/send_message`, {
        title: form.title,
        message: form.message,
        user_id: form.user_id,
      })
      if (response && response.status === 200) {
        showAlert.value = true
        setTimeout(() => {
          showAlert.value = false;
        }, 5000);
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
  <VCard class="text-center text-sm-start">
    <VRow no-gutters class="align-center justify-space-between">
      <VCol cols="auto">
        <VCardTitle class="text-md-h5 text-primary">
          Notifications
        </VCardTitle>
      </VCol>
      <VCol cols="auto">
        <v-btn color="primary" @click="dialog=true" style="margin-right: 16px;">
          Add <VIcon icon="bx-message-add" />
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
      <v-dialog v-model="dialog" width="1024">
        <v-card>
          <v-card-title>
            <span class="text-h5">New Notification</span>
          </v-card-title>
          <v-card-text>      
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Title* "
                    required
                    v-model="form.title"
                  />
                </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.message"
                  label="Message*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['shane.vanniekerk@drakkentech.co.za  ']"
                  label="Users*"
                  required
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-alert
                type="success"
                title="Success"
                text="Your notification has been successfully sent!"
                v-model="showAlert"
              />
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
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
    <!--Flag status modal-->
    <v-row justify="center"> 
      <v-dialog v-model="messageStatusModal" width="1024">
        <v-card>
          <v-card-title>
            <span class="text-h5">Message {{messageStatusModalHeading}}</span>
          </v-card-title>
          <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="firstTableData"
            item-value="name"
            class="elevation-1"
          ></v-data-table>
          <v-card-title v-if="showSecondTable">
            <span class="text-h5">Message not yet {{messageStatusModalHeading}}</span>
          </v-card-title>
          <v-data-table
            v-if="showSecondTable"
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="secondTableData"
            item-value="name"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-dialog>
    </v-row>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            Message
          </th>
          <th class="text-left">
            <v-icon>mdi-progress-clock</v-icon>Pending
          </th>
          <th class="text-left">
            <v-icon>lucide:mail-check</v-icon>received
          </th>
          <th class="text-left">
            <v-icon>mdi-tick-circle-outline</v-icon>Read
          </th>
          <th class="text-left">
            <v-icon>basil:power-button-outline</v-icon>Closed
          </th>
          <th class="text-left">
            Date Sent
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data"
            :key="item.sid"
        >
          <td>{{ item.title }}</td>
          <td>{{ item.body }}</td>
          <td><span v-if="item.flagCounts.pending === 0" style="cursor: pointer;">None</span>
              <span v-else @click="handleFlagClick(0, item.id)" style="cursor: pointer;">{{ item.flagCounts.pending }}/{{ item.count }}</span>
          </td>
          <td><span @click="handleFlagClick(1,item.id)" style="cursor: pointer;">{{ item.flagCounts.received }}/{{ item.count }}</span></td>
          <td><span @click="handleFlagClick(2, item.id)" style="cursor: pointer;">{{ item.flagCounts.opened }}/{{ item.count }}</span></td>
          <td><span @click="handleFlagClick(3, item.id)" style="cursor: pointer;">{{ item.flagCounts.closed }}/{{ item.count }}</span></td>
          <td>{{ item.date }}</td>
        </tr>
      </tbody>
    </v-table>
  </VCard>
</template>

<style lang="scss" scoped>
.clickable-cell {
  cursor: pointer;
}
</style>
