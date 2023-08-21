<script setup>
  import axios from 'axios';
import { onMounted, onUnmounted, reactive, ref } from 'vue';

  const data = ref([]);
  const user = ref([]);
  const dialog = ref(false);
  const showAlert = ref(false)

  const tabs = [
    { title: 'All', icon: 'bx:world', tab: 'account' },
    { title: 'Admin', icon: 'clarity:administrator-line', tab: 'security' },
    { title: 'Standard', icon: 'clarity:user-line', tab: 'notification' },
  ];

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:9000/all_web_user_profiles`);
      if (response && response.status === 200) {
        if (response.data) {
          data.value = response.data;
          console.log('Data:', data.value);
        }
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSaveNotification = async () => {
    try {
      var adminValue
      form.admin === 'Admin' ? adminValue = 1 : adminValue = 0
      const response = await axios.post(`http://localhost:9000/web_register`, {
        name: form.firstName,
        surname: form.lastName,
        email: form.email,
        password: form.password,
        admin: adminValue,
        active: 1,
      })
      if (response && response.status === 200) {
        showAlert.value = true
        setTimeout(() => {
          showAlert.value = false;
        }, 5000);
        fetchUsers();
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
    fetchUsers();
    const intervalId = setInterval(fetchUsers, 60000);
    onUnmounted(() => {
      clearInterval(intervalId);
    });
  });

  const form = reactive({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    admin: null,
  })
</script>

<template>
  <VCard class="text-center text-sm-start">
    <VRow no-gutters class="align-center justify-space-between">
      <VCol cols="auto">
        <VCardTitle class="text-md-h5 text-primary">
          User Management
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
            <span class="text-h5">Add new user</span>
          </v-card-title>
          <v-card-text>      
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="First Name"
                    required
                    v-model="form.firstName"
                  />
                </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.lastName"
                  label="Last Name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="['Admin', 'Standard']"
                  label="User type"
                  required
                  v-model="form.admin"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-alert
                type="success"
                title="Success"
                text="User has been created successfully!"
                v-model="showAlert"
              />
            </v-row>
          </v-container>
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
            First Name
          </th>
          <th class="text-center">
            Last Name
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            User Type
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data"
            :key="item.sid"
        >
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.admin === 1 ? "Admin" : "Standard" }}</td>
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
