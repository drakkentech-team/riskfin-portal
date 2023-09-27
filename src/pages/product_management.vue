<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';

  const showAlert = ref(false)
  const dialog = ref(false)
  const data = ref([])

  const updateDialog = ref(false); 
  const updateProductId = ref(null);

let availableProdList = [];
let deletedProdList = [];
let responseData = [];

onMounted(async () => {
  try {
    const url = "http://localhost:9000/policy_details_get";
    const datas = {
      "user_id": 0,
      "flag": 0
    };
    const response = await axios.post(url, datas);
    
    if (response && response.status === 200) {
      responseData = response.data;
      availableProdList = responseData.filter(item => item.policy_details_delete === 0);
      deletedProdList = responseData.filter(item => item.policy_details_delete === 1);

      data.value = availableProdList; 
    }
  } catch (error) {
    console.error('Failed to fetch policy details:', error);
  }
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
      `http://localhost:9000/update_policy_details?sid_policy_details=${item.sid_policy_details}`,
      {
        policy_details_delete: 0,
      }
    );

    if (response && response.status === 200) {
      const index = data.value.findIndex(product => product.sid_policy_details === item.sid_policy_details);
      if (index !== -1) {
        data.value[index].policy_details_delete = 0;
      }
      deletedProdList = deletedProdList.filter(product => product.sid_policy_details !== item.sid_policy_details);
      data.value = deletedProdList;
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
  try {
    const response = await axios.post(`http://localhost:9000/policy_details?`, {
      policy_name: form.policy_name,
      short_description: form.short_description,
      long_description: form.long_description,
      policy_premium: form.policy_premium,
      // premium_due_date: form.premium_due_date,
    });
    console.log(response);
    if (response && response.status === 200) {
      showAlert.value = true;
      setTimeout(() => {
        showAlert.value = false;
      }, 5000);
    }
  } catch (error) {
      console.error('Error adding product:', error);
  }
};

const showUpdateDialog = (item) => {
  forms.policy_name = item.policy_name;
  forms.short_description = item.short_description;
  forms.long_description = item.long_description;
  forms.policy_premium = item.policy_premium;
  // forms.premium_due_date = item.premium_due_date;

  updateProductId.value = item.sid_policy_details;

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
  try {
    const response = await axios.put(`http://localhost:9000/update_policy_details?sid_policy_details=${updateProductId.value}`, {
      policy_name: forms.policy_name,
      short_description: forms.short_description,
      long_description: forms.long_description,
      policy_premium: forms.policy_premium,
      // premium_due_date: forms.premium_due_date,
    });
    if (response && response.status === 200) {
      showAlert.value = true;
      setTimeout(() => {
        showAlert.value = false;
      }, 5000);
    }    
  } catch (error) {
    console.error('Error updating product:', error);
  }
};


// Function to handle deleting a product
const disablePolicy = async () => {
  try {
    const response = await axios.put(`http://localhost:9000/update_policy_details?sid=${policyToBeDisabled.value}`, {
      policy_detail_delete: 1
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
  // }
  
};

// const deleteProduct = async (item) => {
//   try {
//     const response = await axios.put(
//       `http://localhost:9000/update_policy_details?sid_policy_details=${item.sid_policy_details}`,
//       {
//         policy_details_delete: 1,
//         // You can include other fields if needed
//       }
//     );

//     if (response && response.status === 200) {
//       // Update the data array to reflect the restored status
//       const index = data.value.findIndex(product => product.sid_policy_details === item.sid_policy_details);
//       if (index !== -1) {
//         data.value[index].policy_details_delete = 1;
//       }
//     }
//   } catch (error) {
//     console.error('Error restoring product:', error);
//   }
// };

</script>

<template>
  <VCard class="text-center text-sm-start">
    <VRow no-gutters class="align-center justify-space-between">
      <VCol cols="auto">
        <VCardTitle class="text-md-h5 text-primary">
          Products
        </VCardTitle>
      </VCol>
      <VCol cols="auto">
        <v-btn color="primary" @click="dialog=true" style="margin-right: 16px;">
          Add <VIcon icon="bx-message-add" />
        </v-btn>
      </VCol>
    </VRow>
     <v-row no-gutters>
      <v-col cols="12" sm="8" order="2" order-sm="1">
        <!-- <v-card-item class="d-flex align-center">
          <v-card-title class="text-md-h5 text-primary flex-grow-1">
            Products
          </v-card-title>
          <v-btn color="primary" @click="dialog=true" >
            Add Product <v-icon icon="bx-message-add" />
          </v-btn>
        </v-card-item> -->

        <!---Delete filter Controls-->
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
    </v-row>

    <!---New product fields-->
    <v-dialog v-model="dialog" width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">New Product</span>
        </v-card-title>
        <v-card-text>
          <v-container>

              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Policy Name* "
                    required
                    v-model="form.policy_name"
                  />
                </v-col>
              
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.short_description"
                  label="Short Description*"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.long_description"
                  label="Long Description*"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="form.policy_premium"
                  label="Policy Premium*"
                  required
                ></v-text-field>
              </v-col>

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
              <v-alert
                type="success"
                title="Success"
                text="New product has been successfully added!"
                v-model="showAlert"
              ></v-alert>  
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
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
          Policy Name
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
      <tr v-for="item in data" :key="item.sid_policy_details">
        <td>{{ item.policy_name }}</td>
        <td>{{ item.short_description }}</td>
        <td>{{ item.long_description }}</td>
        <td>{{ item.policy_premium }}</td>
        <!-- <td>{{ item.premium_due_date }}</td> -->
        <td>
          <div class="button-container">
          <!-- Restore Button -->
          <button
            v-if="item.policy_details_delete === 1"
            @click="restoreProduct(item)"
            class="btn btn-success"
          >
            Restore
          </button>
          <!-- Edit and Delete Buttons -->
          <button
            v-if="item.policy_details_delete === 0"
            @click="showUpdateDialog(item)"
            class="btn btn-danger"
          >
            Edit
          </button>
          <button
            v-if="item.policy_details_delete === 0"
            @click="deleteProduct(item)"
            class="btn btn-danger"
          >
            Delete
          </button>
        </div>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="5">Loading...</td>
      </tr>

    </tbody>
  </v-table>

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
                  <v-text-field
                    label="Policy Name* "
                    required
                    v-model="forms.policy_name"
                  />
                </v-col>
              
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="forms.short_description"
                  label="Short Description*"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="forms.long_description"
                  label="Long Description*"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="forms.policy_premium"
                  label="Policy Premium*"
                  required
                ></v-text-field>
              </v-col>

              <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="forms.premium_due_date"
                  label="Premium Due Date*"
                  required
                ></v-text-field>
              </v-col> -->
            </v-row>
            <v-row justify="center">
              <v-alert
                type="success"
                title="Success"
                text="Product has been successfully updated!"
                v-model="showAlert"
              ></v-alert>
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

     <!-- Delete Product Dialog -->
    <!-- <v-dialog v-model="deleteDialog" width="1024">
      <v-card> -->
        <!-- <v-card-title>
          <span class="text-h5">Update Product</span>
        </v-card-title> -->
        <!-- <v-card-text>
          <v-container> -->
            <!-- <v-row>
              <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Policy Name* "
                    required
                    v-model="forms.policy_name"
                  />
                </v-col> -->
              
              <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="forms.short_description"
                  label="Short Description*"
                  required
                ></v-text-field>
              </v-col> -->

              <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="forms.long_description"
                  label="Long Description*"
                  required
                ></v-text-field>
              </v-col> -->

              <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="forms.policy_premium"
                  label="Policy Premium*"
                  required
                ></v-text-field>
              </v-col> -->

              <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="forms.premium_due_date"
                  label="Premium Due Date*"
                  required
                ></v-text-field>
              </v-col> -->
            <!-- </v-row> -->
            <!-- <v-row justify="center">
              <v-alert
                type="success"
                title="Success"
                text="Product has been successfully deleted!"
                v-model="showAlert"
              ></v-alert>
            </v-row>
          </v-container> -->
          <!-- <small>*indicates required field</small> -->
        <!-- </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="updateDialog = false">
            Close
          </v-btn> -->
          <!-- <v-btn color="blue-darken-1" variant="text" @click="handleUpdateProduct">
            Update Product
          </v-btn> -->
        <!-- </v-card-actions>
      </v-card>
    </v-dialog> -->

  </VCard>
</template>

<style>
.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
