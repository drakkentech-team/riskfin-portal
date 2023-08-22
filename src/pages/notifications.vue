<script setup>
  import axios from 'axios';
import { onMounted, onUnmounted, reactive, ref } from 'vue';

  const data = ref([]);
  const user = ref([]);
  const dialog = ref(false);
  const showAlert = ref(false)

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
          response.data.forEach((message) => {
            const key = message.message_title + message.message_body;

            if (!uniqueMessages[key]) {
              uniqueMessages[key] = {
                ...message,
                count: 0,
                flagCounts: { 0: 0, 1: 0, 2: 0, 3: 0 }
              };
            }

            uniqueMessages[key].count++;
            uniqueMessages[key].flagCounts[message.sid_message_flags_fk]++;
          });

          const filteredMessages = Object.values(uniqueMessages);

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
          user.value = r;
          console.log('User:', user.value);
        }
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleFlagClick = (flagIndex) => {
    console.log(`Clicked on flag index ${flagIndex} for item`);
  }

  const handleSaveNotification = async () => {
    try {
      const response = await axios.post(`http://localhost:9000/send_message`, {
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
            <v-icon>lucide:mail-check</v-icon>Recieved
          </th>
          <th class="text-left">
            <v-icon>mdi-tick-circle-outline</v-icon>Read
          </th>
          <th class="text-left">
            <v-icon>basil:power-button-outline</v-icon>Closed
          </th>
          <th class="text-left">
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data"
            :key="item.sid_messages"
        >
          <td>{{ item.message_title }}</td>
          <td>{{ item.message_body }}</td>
          <td>
  
  <span @click="handleFlagClick(0)" style="cursor: pointer;">{{ item.flagCounts[0] }}/{{ item.count }}</span>
</td>
          <td><span @click="handleFlagClick(1)" style="cursor: pointer;">{{ item.flagCounts[1] }}/{{ item.count }}</span></td>
          <td><span @click="handleFlagClick(2)" style="cursor: pointer;">{{ item.flagCounts[2] }}/{{ item.count }}</span></td>
          <td><span @click="handleFlagClick(3)" style="cursor: pointer;">{{ item.flagCounts[3] }}/{{ item.count }}</span></td>
          <td>{{ item.message_date }}</td>
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
