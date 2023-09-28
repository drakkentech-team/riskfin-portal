<script setup>
  import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
  const apiBaseUrl = "http://localhost:9000";
  const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";

  const activeUserArray = ref(null)
  const deactivatedUserArray = ref(null)


  const activeTab = ref("All")  
  /*RULES*/
  const rules = {
    required: value => !!value || 'Required.',
    counter: value => value.length <= 20 || 'Max 20 characters',
    emailValue: value => {
      if (value){
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }  
    },
    emailExists: value => {
      for (let user of data.value) {
        if (user.email === value) {
          console.log("Hello")
          return 'This user already exists.';
        }
      }
      return true
    },
    password: value => {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
      return pattern.test(value) || 'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.'
    },
    confirmPassword: value => {
      const string = password.value
      return value === string || 'Your passwords do not match.'
    }
  }

  // const isFormValid = computed(() => {
  //     return (
  //       emailValue(email.value) === true &&
  //       emailExists(email.value) === true &&
  //       password(password.value) === true &&
  //       confirmPassword(confirmPassword.value) === true
  //     );
  //   });

  const disableAddButton = computed(() => {
    return !title.value.length || !message.value.length || !users.value.length;
  });

  
  /*Edit User Fields*/
  const sid = ref(null);
  const firstName= ref("");
  const lastName= ref("");
  const email= ref("");
  const password= ref("");
  const confirmPassword= ref("");
  const admin= ref("Admin");
  const active= ref("Active");

  const emptyFieldErrorModal = ref(false);
  const emptyEditFieldErrorModal = ref(false);

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
                      { title: '', align: 'end', key: 'actions', sortable: false }
                    ])

  const activeUserTabs = [
    { title: 'All', tab: 'All' },
    { title: 'Active', tab: 'Active' },
    { title: 'Deactivated', tab: 'Deactivated' },
  ];

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:9000/all_web_user_profiles`,{
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        },
      });
      if (response && response.status === 200) {
        if (response.data) {
          data.value = response.data;
          data.value = data.value.map(item => {
            if (item.admin === 1) {
              item.admin = 'Admin';
            } else {
              item.admin = 'Standard';
            }
            if (item.active === 1) {
              item.active = 'Yes';
            } else {
              item.active = 'No';
            }
            return item;
          });
          activeUserArray.value = data.value.filter(user => user.active === 'Yes');
          deactivatedUserArray.value = data.value.filter(user => user.active=== 'No');
        }
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };
  const handleUpdateUser = async () => {
    var checkPassword = true
    var checkConfirmPassword = true
    if (password.value){
      checkPassword = rules.password(password.value)
    }
    if (password.value && confirmPassword.value){
      checkConfirmPassword = rules.confirmPassword(confirmPassword.value)
    }

    console.log(checkPassword)
    console.log(checkConfirmPassword)
    if (!firstName.value || !lastName.value
         || checkPassword !== true || checkConfirmPassword !== true ||
        !admin.value || !active.value) 
    {
      return emptyEditFieldErrorModal.value = true;
    }
    else{
    try {
      var adminValue, activeValue
      admin.value === 'Admin' ? adminValue = 1 : adminValue = 0
      active.value === 'Active' ? activeValue = 1 : activeValue = 0
      console.log(active.value)
      let payload = {
        first_name: firstName.value,
        last_name: lastName.value,
        admin: adminValue,
        active: activeValue,
      };

      // If form.password has a value, add it to the payload
      if (password.value) {
        payload.password = password.value;
      }
      console.log(payload)

      const response = await axios.put(`http://localhost:9000/web_user_profile?user_id=${sid.value}`, payload, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response && response.status === 200) {
        editUserModal.value = false
        showAlert.value = true
        firstName.value = ""
          lastName.value = ""
           email.value = ""
           password.value = ""
           confirmPassword.value = ""
           admin.value = "Admin"
           active.value = "Active"
        setTimeout(() => {
          showAlert.value = false;
        }, 5000);
        fetchUsers();
      } 
    } 
    catch (error) {
      console.log(error)
    }
  }
  }
  
  const handleSaveNotification = async () => {
    if (!firstName.value || !lastName.value ||
        !email.value || !password.value || 
        !confirmPassword.value ||
        !admin.value || !active.value) 
    {
      return emptyFieldErrorModal.value = true;
    }
    else{
      try {
        var adminValue
        var activeValue
        admin.value === 'Admin' ? adminValue = 1 : adminValue = 0
        active.value === 'Active' ? activeValue = 1 : activeValue = 0
        const response = await axios.post(`${apiBaseUrl}/web_register`, {
          name: firstName.value,
          surname: lastName.value,
          email: email.value,
          password: password.value,
          admin: adminValue,
          active: activeValue,
        },{
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response && response.status === 200) {
          addUserModal.value = false
          showAlert.value = true
          firstName.value = ""
          lastName.value = ""
           email.value = ""
           password.value = ""
           confirmPassword.value = ""
           admin.value = "Admin"
           active.value = "Active"
          setTimeout(() => {
            showAlert.value = false;
          }, 5000);
          fetchUsers();
        } 
      } 
      catch (error) {
        console.log(error)
      } 
    }
  }

  const deleteItem = (item) => {
    dialogDelete.value = true
    itemToBeDeleted.value = item
  }

  const selectedData = computed(() => {
    if (activeTab.value === 'All') {
        return data.value;
      } else if (activeTab.value === 'Active') {
        return activeUserArray.value;
      } else if (activeTab.value === 'Deactivated') {
        return deactivatedUserArray.value;
      }
      else {
        return [];
      }
  });

  const deleteConfirm = async () => {
    try {
      const deleteResponse = await axios.put(`http://127.0.0.1:9000/delete_web_user?user_id=${itemToBeDeleted.value}`, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      });
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
    sid.value = item.sid;
    firstName.value = item.first_name;
    lastName.value = item.last_name;
    admin.value = item.admin;
    if (item.active === "Yes")
      active.value = "Active";
    else{
      active.value = "Deactivated";
    }
  }

  const handleCloseNewNotificationModal = () => {
    addUserModal.value = false
    editUserModal.value = false
    firstName.value = ""
          lastName.value = ""
           email.value = ""
           password.value = ""
           confirmPassword.value = ""
           admin.value = "Admin"
           active.value = "Active"
  }

  onMounted(() => {

    fetchUsers();
  });
</script>

<template>
  <VCard class="text-center text-sm-start pt-4">
    <VRow no-gutters class="align-center justify-space-between">
      <VCol cols="auto">
        <VCardTitle class="text-md-h5 text-primary">
          User Management
        </VCardTitle>
      </VCol>
      <VCol cols="auto">
        <v-btn color="primary" @click="addUserModal=true" @click:outside="handleCloseNewNotificationModal" style="margin-right: 16px;">
          Add New User <VIcon icon="bx-message-add" />
        </v-btn>
      </VCol>
    </VRow>
    <VRow no-gutters class="pl-5">
      <VTabs
        v-model="activeTab"
        show-arrows
      >
        <VTab
          v-for="item in activeUserTabs"
          :key="item.icon"
          :value="item.tab"
        >
          {{ item.title }}
        </VTab>
      </VTabs>
    </VRow>

    <!-- Add New User Modal -->
      <v-dialog v-model="addUserModal" @click:outside="handleCloseNewNotificationModal" width="800">
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
                  v-model="email"
                  label="Email"
                  :rules="[rules.emailValue, rules.emailExists]"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  required
                />
              </v-col>
            </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="password"
                    label="Password"
                    placeholder="············"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                    :rules="[rules.password]"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    placeholder="············"
                    :rules="[rules.confirmPassword]"
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
                    v-model="admin"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="['Active', 'Deactivated']"
                    label="Account status"
                    required
                    v-model="active"
                  />
                </v-col>
              </v-row>
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
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!--End of Add New User Modal-->  
      <v-row justify="center">
              <v-alert
                type="success"
                title="Success"
                text="User Has Successfully Been Added/Updated"
                v-model="showAlert"
              ></v-alert>
            </v-row>
      <!--Edit User Modal-->
        <v-dialog v-model="editUserModal" @click:outside="handleCloseNewNotificationModal" width="800">
          <v-card>
            <v-container>
              <v-row class="justify-center">
                <v-col class="text-center" cols="12" sm="6" md="4">
                  <span class="text-h5">Edit User</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="firstName"
                    label="First Name"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="lastName"
                    label="Last Name"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                  v-model="password"
                    label="Password"
                    placeholder="············"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                    :rules="[rules.password]"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    placeholder="············"
                    :rules="[rules.confirmPassword]"
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
                    v-model="admin"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="['Active', 'Deactivated']"
                    label="Account status"
                    required
                    v-model="active"
                  />
                </v-col>
              </v-row>
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
                @click="handleUpdateUser"
              >
                Send
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!--End of Edit User Modal-->

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
        <v-dialog v-model="emptyFieldErrorModal" max-width="600px">
          <v-card>
            <v-card-title class="text-h5 centered-text">Unable to create new user. <br> Please make sure you have filled in all the fields</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="emptyFieldErrorModal = false">Ok</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="emptyEditFieldErrorModal" max-width="600px">
          <v-card>
            <v-card-title class="text-h5 centered-text">Unable to edit user. <br> Please make sure you have filled in all the fields</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="emptyEditFieldErrorModal = false">Ok</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="selectedData"
            item-value="first_name"
            class="elevation-1 pt-2 pl-5 pr-5"
          >
          <template v-slot:item.first_name="{ item }">
      <tr>
        <td><span style="cursor: pointer;" @click="editItem(item.selectable)">{{ item.columns.first_name }}</span></td>
        </tr>
    </template>
    <template v-slot:item.last_name="{ item }">
      <tr>
        <td><span style="cursor: pointer;" @click="editItem(item.selectable)">{{ item.columns.last_name }}</span></td>
        </tr>
    </template>
    <template v-slot:item.email="{ item }">
      <tr>
        <td><span style="cursor: pointer;" @click="editItem(item.selectable)">{{ item.columns.email }}</span></td>
        </tr>
    </template>
    <template v-slot:item.admin="{ item }">
      <tr>
        <td><span style="cursor: pointer;" @click="editItem(item.selectable)">{{ item.columns.admin }}</span></td>
        </tr>
    </template>
    <template v-slot:item.active="{ item }">
      <tr>
        <td><span style="cursor: pointer;" @click="editItem(item.selectable)">{{ item.columns.active }}</span></td>
        </tr>
    </template>
          <template v-slot:item.actions="{ item }">
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

.centered-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
