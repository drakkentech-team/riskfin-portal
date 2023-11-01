<script setup>
import axios from 'axios';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const apiBaseUrl = "http://localhost:9000";
const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";

const policyToBeDisabled = ref(null)
/*TABS*/
const activePolicyTab = ref('all')
const policyTabs = [
  { title: 'All', tab: 'all' },
  { title: 'Available', tab: 'available' },
  { title: 'Disabled', tab: 'disabled' },
];


const showAlert = ref(false)
const isFormFieldFocused = ref(false);


/*MODALS*/
const addNewPolicyModal = ref(false)
const deletePolicyModal = ref(false)

/*METHODS*/
const handleTabClick = (tabItem) => {
  activePolicyTab.value = tabItem;
  if (tabItem === 'all') {
    data.value = responseData;
  }
  else if (tabItem === 'available') {
    // data.value = availableProdList; 
    getPolicies();

  }
  else if (tabItem === 'disabled') {
    data.value = deletedProdList;
  }
}

const handleDeletePolicy = (item) => {

  deletePolicyModal.value = true
  policyToBeDisabled.value = item
}


const data = ref([])

const updateDialog = ref(false);
const updateProductId = ref(null);

const rules = {
  policy_name: [(v) => !!v || 'Policy Name is required.'],
  short_description: [(v) => !!v || 'Short Description is required.'],
  long_description: [(v) => !!v || 'Long Description is required.'],
  policy_premium: [
    (v) => !!v || 'Policy Premium is required.',
    (v) => /^\d+(\.\d+)?$/.test(v) || 'Policy Premium must be a numeric value.',
  ],
  // policy_premium: [(v) => !!v || 'Policy Premium is required.'],
  // premium: value => {
  //   const pattern = value?.length > 1 && /[0-9-]+/.test(value)
  //   return pattern.test(value) || 'Premium needs to be a numerical value.'
  // },
};



const validationError = ref('');
const errorFields = reactive({
  policy_name: false,
  short_description: false,
  long_description: false,
  policy_premium: false,
});

const addValidationError = ref('');
const addErrorFields = reactive({
  policy_name: false,
  short_description: false,
  long_description: false,
  policy_premium: false,
});


let availableProdList = [];
let deletedProdList = [];
let responseData = [];

const getPolicies = async () => {
  try {
    const response = await axios.post(`${apiBaseUrl}/policy_details_get`, {
      "user_id": 0,
      "flag": 0
    },
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      });

    if (response && response.status === 200) {
      responseData = response.data;
      console.log(response.data)
      availableProdList = responseData.filter(item => item.active === 1);
      deletedProdList = responseData.filter(item => item.active === 0);
      data.value = availableProdList;
    }
  }
  catch (error) {
    console.error('Failed to fetch policy details:', error);
  }
};

onMounted(() => {

  getPolicies();
});


const showAvailableProducts = () => {
  data.value = availableProdList;
};

const showDeletedProducts = () => {
  data.value = deletedProdList;
};

const showAllProducts = () => {
  data.value = responseData;
};

const restoreProduct = async (item) => {
  try {
    const response = await axios.put(
      `http://localhost:9000/update_policy_details?sid=${item.sid}`,
      {
        active: 1,
      }, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (response && response.status === 200) {
      const index = data.value.findIndex(product => product.sid === item.sid);
      if (index !== -1) {
        data.value[index].policy_detail_delete = 0;
      }
      deletedProdList = deletedProdList.filter(product => product.sid !== item.sid);
      // getPolicies();
      data.value = deletedProdList;
      // getPolicies();

    }
  } catch (error) {
    console.error('Error restoring product:', error);
  }
};




const form = reactive({
  policy_name: '',
  short_description: '',
  long_description: '',
  policy_premium: '',
  // premium_due_date: '',
});


const handleSaveProduct = async () => {

  addValidationError.value = '';
  for (const field in addErrorFields) {
    addErrorFields[field] = false;
  }

  if (!form.policy_name) {
    addErrorFields.policy_name = true;
  }
  if (!form.short_description) {
    addErrorFields.short_description = true;
  }
  if (!form.long_description) {
    addErrorFields.long_description = true;
  }
  if (!form.policy_premium) {
    addErrorFields.policy_premium = true;
  }

  if (Object.values(addErrorFields).some(fieldError => fieldError)) {
    addValidationError.value = 'Please fill in all required fields.';
    return;
  }


  try {
    const response = await axios.post(`http://localhost:9000/policy_details?`, {
      policy_name: form.policy_name,
      short_description: form.short_description,
      long_description: form.long_description,
      policy_premium: form.policy_premium,
      premium_due_date: "2023-08-15",
    }, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
    if (response && response.status === 200) {
      showAlert.value = true
      setTimeout(() => {
        showAlert.value = false;
      }, 5000);

      form.policy_name = null;
      form.short_description = null;
      form.long_description = null;
      form.policy_premium = null;

      getPolicies();

    }
  } catch (error) {
    console.error('Error adding product:', error);
  }
  // }
};

const showUpdateDialog = (item) => {
  forms.policy_name = item.name;
  forms.short_description = item.short_description;
  forms.long_description = item.long_description;
  forms.policy_premium = item.premium;
  // forms.premium_due_date = item.premium_due_date;

  updateProductId.value = item.sid;

  updateDialog.value = true;
};


const forms = reactive({
  policy_name: '',
  short_description: '',
  long_description: '',
  policy_premium: '',
  // premium_due_date: '',
});


// Function to handle updating the product
const handleUpdateProduct = async () => {

  validationError.value = '';
  for (const field in errorFields) {
    errorFields[field] = false;
  }

  if (!forms.policy_name) {
    errorFields.policy_name = true;
  }
  if (!forms.short_description) {
    errorFields.short_description = true;
  }
  if (!forms.long_description) {
    errorFields.long_description = true;
  }
  if (!forms.policy_premium) {
    errorFields.policy_premium = true;
  }

  if (Object.values(errorFields).some(fieldError => fieldError)) {
    validationError.value = 'Please fill in all required fields.';
    return;
  }
  // console.log(forms.policy_premium)
  try {
    const response = await axios.put(`http://localhost:9000/update_policy_details?sid=${updateProductId.value}`, {
      name: forms.policy_name,
      short_description: forms.short_description,
      long_description: forms.long_description,
      premium: forms.policy_premium,
      // premium_due_date: forms.premium_due_date,
    }, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    });
    if (response && response.status === 200) {
      showAlert.value = true;
      setTimeout(() => {
        showAlert.value = false;
      }, 5000);
      getPolicies();
    }
  } catch (error) {
    console.error('Error updating product:', error);
  }
};


// Function to handle deleting a product
const disablePolicy = async () => {
  try {
    const response = await axios.put(`http://localhost:9000/update_policy_details?sid=${policyToBeDisabled.value}`, {
      active: 0
    },
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      });

    if (response && response.status === 200) {
      policyToBeDisabled.value = null
      getPolicies();
      deletePolicyModal.value = false
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }

};

const handleRowClick = (item) => {
  if (item.active === 1) {
    // Open the update dialog for non-deleted items
    showUpdateDialog(item);
  }
};

const handleInputScroll = () => {
  const textareaElement = document.querySelector('.scrollable-textarea');
  if (textareaElement) {
    textareaElement.classList.add('scrolled');
  }
};

const handleInputFocus = () => {
  const textareaElement = document.querySelector('.scrollable-textarea');
  isFormFieldFocused.value = true;
  if (textareaElement) {
    textareaElement.classList.remove('scrolled');
  }
};

const handleInputBlur = () => {
  const textareaElement = document.querySelector('.scrollable-textarea');
  isFormFieldFocused.value = false;
  if (textareaElement && !textareaElement.value) {
    textareaElement.classList.remove('scrolled');
  }
};

watch(isFormFieldFocused, (newValue) => {

  if (newValue) {
    addValidationError.value = '';
    validationError.value = '';
  }
});
</script>

<template>
  <VCard class="text-center text-sm-start">
    <VRow no-gutters class="align-center justify-space-between">
      <VCol cols="auto">
        <VCardTitle class="text-md-h5 text-primary">
          Policies
        </VCardTitle>
      </VCol>
      <VCol cols="auto">
        <v-btn color="primary" prepend-icon="ic:round-plus" @click="addNewPolicyModal = true" style="margin-right: 16px;">
          Add New Policy
        </v-btn>
      </VCol>
    </VRow>
    <!--POLICY TABS-->
    <VRow no-gutters class="pl-5">
      <VTabs v-model="activePolicyTab" show-arrows class="custom-tabs">
        <VTab v-for="item in policyTabs" :key="item.icon" :value="item.tab" @click="handleTabClick(item.tab)">
          {{ item.title }}
        </VTab>
      </VTabs>
    </VRow>
    <!--END OF POLICY TABS-->
    <!-- <v-row no-gutters>
      <v-col cols="12" sm="8" order="2" order-sm="1">
        <v-btn variant="plain" @click="showAvailableProducts">
          Available Products
        </v-btn>
        <v-btn variant="plain" @click="showDeletedProducts">
          Deleted Products
        </v-btn>
        <v-btn variant="plain" @click="showAllProducts">
          All Products
        </v-btn>
      </v-col>
    </v-row> -->

    <!---New product fields-->
    <v-dialog v-model="addNewPolicyModal" width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">New Product</span>
        </v-card-title>
        <v-card-text>
          <v-container>

            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-textarea label="Policy Name* " v-model="form.policy_name" :rules="rules.policy_name"
                  @scroll="handleInputScroll" @focus="handleInputFocus" @blur="handleInputBlur" />
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-textarea v-model="form.short_description" label="Short Description*" :rules="rules.short_description"
                  @scroll="handleInputScroll" @focus="handleInputFocus" @blur="handleInputBlur"></v-textarea>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-textarea v-model="form.long_description" label="Long Description*" :rules="rules.long_description"
                  @scroll="handleInputScroll" @focus="handleInputFocus" @blur="handleInputBlur"></v-textarea>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="form.policy_premium" label="Policy Premium*" :rules="rules.policy_premium"
                  @scroll="handleInputScroll" @focus="handleInputFocus" @blur="handleInputBlur"></v-text-field>
              </v-col>

              <v-alert type="error" title="Error" v-if="!isFormFieldFocused && addValidationError">
                {{ addValidationError }}
              </v-alert>

              <!-- <v-alert type="error" title="Error" v-if="!isFormFieldFocused && addValidationError">
                {{ addValidationError }}
              </v-alert> -->
              <!-- <v-col cols="12" sm="6" md="4">
          <v-date-picker v-model="forms.premium_due_date" label="Premium Due Date*" required></v-date-picker>
        </v-col> -->
              <!-- <v-col cols="12" sm="6" md="4">
              <v-date-picker
                v-model="form.premium_due_date"
                label="Premium Due Date*"
                required
              ></v-date-picker>
            </v-col> -->
              <!-- <v-date-picker v-model="forms.premium_due_date" label="Premium Due Date*" required /> -->
              <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.premium_due_date"
                  label="Premium Due Date*"
                  required
                ></v-text-field>
              </v-col> -->
            </v-row>
            <v-row justify="center">
              <v-alert type="success" title="Success" text="New product has been successfully added!"
                v-model="showAlert"></v-alert>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="addNewPolicyModal = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="handleSaveProduct">
            Add Product
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Short Description
          </th>
          <th class="text-left">
            Long Description
          </th>
          <th class="text-left">
            Policy Premium
          </th>
          <!-- <th class="text-left">
          Premium Due Date
        </th> -->
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody v-if="data.length > 0">
        <tr v-for="item in data" :key="item.sid" class="clickable-row">
          <td @click="handleRowClick(item)">{{ item.name }}</td>
          <td @click="handleRowClick(item)">{{ item.short_description }}</td>
          <td @click="handleRowClick(item)">{{ item.long_description }}</td>
          <td @click="handleRowClick(item)">{{ item.premium }}</td>
          <!-- <td>{{ item.premium_due_date }}</td> -->
          <td>
            <div class="button-container">
              <!-- Restore Button -->
              <button v-if="item.active === 0" @click="restoreProduct(item)" class="btn btn-success">
                Restore
              </button>
              <!-- Edit and Delete Buttons -->
              <!-- <button v-if="item.policy_detail_delete === 0" @click="showUpdateDialog(item)" class="btn btn-danger">
                Edit
              </button> -->
              <button v-if="item.active === 1" @click="handleDeletePolicy(item.sid)" class="btn btn-danger">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="5">No Data</td>
        </tr>

      </tbody>
    </v-table>

    <!--DELETE POLICY POPUP-->
    <v-dialog v-model="deletePolicyModal" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to disable this policy?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="deletePolicyModal = false">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="disablePolicy">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--END OF DELETE POLICY POPUP-->

    <!-- Update Product Dialog -->
    <v-dialog v-model="updateDialog" width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">Update Product</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-textarea label="Policy Name* " required v-model="forms.policy_name" :rules="rules.policy_name"
                  @scroll="handleInputScroll" @focus="handleInputFocus" @blur="handleInputBlur" />
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-textarea v-model="forms.short_description" label="Short Description*" required
                  :rules="rules.short_description" @scroll="handleInputScroll" @focus="handleInputFocus"
                  @blur="handleInputBlur"></v-textarea>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-textarea v-model="forms.long_description" label="Long Description*" required
                  :rules="rules.long_description" @scroll="handleInputScroll" @focus="handleInputFocus"
                  @blur="handleInputBlur"></v-textarea>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="forms.policy_premium" label="Policy Premium*" required
                  :rules="rules.policy_premium" @scroll="handleInputScroll" @focus="handleInputFocus"
                  @blur="handleInputBlur"></v-text-field>
              </v-col>

              <v-alert type="error" title="Error" v-if="!isFormFieldFocused && validationError">
                {{ validationError }}
              </v-alert>
              <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="forms.premium_due_date"
                  label="Premium Due Date*"
                  required
                ></v-text-field>
              </v-col> -->
            </v-row>
            <v-row justify="center">
              <v-alert type="success" title="Success" text="Product has been successfully updated!"
                v-model="showAlert"></v-alert>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="updateDialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="handleUpdateProduct">
            Update Product
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </VCard>
</template>

<style>
tr.clickable-row {
  cursor: pointer;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.scrollable-textarea-label {
  display: none;
}

.scrollable-textarea::placeholder,
.scrollable-textarea:focus::placeholder {
  opacity: 0;
}
</style>
