<script setup>
  import axios from 'axios';
import { onMounted, onUnmounted, reactive, ref } from 'vue';

  const data = ref([]);
  const dialogDelete = ref(false)
  const addUserModal = ref(false);
  const editUserModal = ref(false);
  const itemToBeDeleted = ref(null)
  const showAlert = ref(false);
  const isPasswordVisible = ref(false);
  const isConfirmPasswordVisible = ref(false);
  const itemsPerPage = ref(10);
  const headers= ref([{ title: "First Name", align: 'start', key: 'first_name'},
                      { title: 'Last Name', align: 'start', key: 'last_name' },
                      { title: 'Email', align: 'start', key: 'email' },
                      { title: 'User type', align: 'start', key: 'admin'},
                      { title: 'Active', align: 'start', key: 'active'},
                      { title: 'Actions', align: 'end', key: 'actions', sortable: false }
                    ])

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
          data.value = data.value.map(item => {
            if (item.admin === 1) {
              item.admin = 'Admin';
            } else {
              item.admin = 'Standard';  // Assuming you want to set it to 'Standard' for other values
            }
            if (item.active === 1) {
              item.active = 'Yes';
            } else {
              item.active = 'No';  // Assuming you want to set it to 'Standard' for other values
            }
            return item;
          });
          console.log('Data:', data.value);
        }
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };
  const handleUpdateUser = async () => {
    try {
      var adminValue, activeValue
      form.admin === 'Admin' ? adminValue = 1 : adminValue = 0
      form.active === 'Yes' ? activeValue = 1 : activeValue = 0

      let payload = {
        name: form.firstName,
        surname: form.lastName,
        email: form.email,
        admin: adminValue,
        active: activeValue,
      };

      // If form.password has a value, add it to the payload
      if (form.password) {
        payload.password = form.password;
      }
      const response = await axios.put(`http://localhost:9000/web_user_profile?user_id=${form.sid}`, payload);
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

  const deleteItem = (item) => {
    dialogDelete.value = true
    itemToBeDeleted.value = item
  }

  const deleteConfirm = async () => {
    try {
      const deleteResponse = await axios.put(`http://127.0.0.1:9000/delete_web_user?user_id=${itemToBeDeleted.value}`);
      if (deleteResponse && deleteResponse.status === 200) {
        console.log(deleteResponse)
        itemToBeDeleted.value = null
        fetchUsers();
        dialogDelete.value = false

      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const editItem = (item) => {
    editUserModal.value = true
    form.sid = item.sid;
    form.email = item.email;
    form.firstName = item.first_name;
    form.lastName = item.last_name;
    form.admin = item.admin;
    if (item.active === "Yes")
      form.active = "Active";
    else{
      form.active = "Deactivated";
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
    sid: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    admin: null,
    active: null,
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
        <v-btn color="primary" @click="addUserModal=true" style="margin-right: 16px;">
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

    <!-- Modal -->
    <v-dialog v-model="addUserModal" width="800">
      <v-card>
        <v-container>
          <v-row class="justify-center">
            <v-col class="text-center" cols="12" sm="6" md="4">
              <span class="text-h5">Create A New User</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="12">
              <v-text-field
                v-model="form.email"
                label="Email"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="form.firstName"
                label="First Name"
                required
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="form.last"
                label="Last Name"
                required
              />
            </v-col>
          </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="form.confirmPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="['Admin', 'Standard']"
                  label="User type"
                  required
                  v-model="form.admin"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="['Active', 'Deactivated']"
                  label="Account status"
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
        <v-card-actions>
          <v-spacer/>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="addUserModal = false"
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
      <v-dialog v-model="editUserModal" width="800">
      <v-card>
        <v-container>
          <v-row class="justify-center">
            <v-col class="text-center" cols="12" sm="6" md="4">
              <span class="text-h5">Edit User</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="12">
              <v-text-field
                v-model="form.email"
                label="Email"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="form.firstName"
                label="First Name"
                required
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="form.lastName"
                label="Last Name"
                required
              />
            </v-col>
          </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="form.confirmPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="['Admin', 'Standard']"
                  label="User type"
                  required
                  v-model="form.admin"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="['Active', 'Deactivated']"
                  label="Account status"
                  required
                  v-model="form.active"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-alert
                type="success"
                title="Success"
                text="User has been updated successfully!"
                v-model="showAlert"
              />
            </v-row>
          </v-container>
        <v-card-actions>
          <v-spacer/>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="addUserModal = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="handleUpdateUser"
            >
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to deactivate this user?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="dialogDelete = false">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="data"
            item-value="first_name"
            class="elevation-1"
          >
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
  </VCard>
</template>

<style lang="scss" scoped>
.clickable-cell {
  cursor: pointer;
}

.capitalize {
  text-transform: capitalize;
}
</style>
