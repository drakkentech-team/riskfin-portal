<script setup>
import axios from 'axios';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const apiBaseUrl = "http://localhost:9000";
const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";

const max_entry_age = 100;
const showInputFields = ref(false);
const formFields = reactive([
    {
        model: 'policy_premium',
        label: 'Policy Premium*',
        rules: [
            (v) => !!v || 'Policy Premium is required.',
            (v) => /^\d+(\.\d+)?$/.test(v) || 'Policy Premium must be a numeric value.',
        ],
    },
    {
        model: 'cover',
        label: 'Cover Amount*',
        rules: [
            (v) => !!v || 'Cover amount is required.',
            (v) => /^\d+(\.\d+)?$/.test(v) || 'Cover amount must be a numeric value.',
        ],
    },
    {
        model: 'underwriter',
        label: 'Underwriter*',
        rules: [(v) => !!v || 'Underwriter is required.'],
    },
    {
        model: 'max_entry_age',
        label: 'Max. Entry Age*',
        rules: [
            (v) => !!v || 'Max. Entry Age is required.',
            (v) => /^\d+$/.test(v) || 'Max. Entry Age must be a numeric value.',
            (v) => v <= max_entry_age || 'Max. Entry Age must be less than or equal to ' + max_entry_age,

        ],
    },
    // {
    //     model: 'administration_fee',
    //     label: 'Administration Fee*',
    //     rules: [
    //         (v) => !!v || 'Administration fee is required.',
    //         (v) => /^\d+(\.\d+)?$/.test(v) || 'Administration fee must be a numeric value.',
    //     ],
    // },
]);

const secondForm = reactive({});
const showSecondForm = false;
let showTable = false;
const policyCovers = reactive([]);


const addInputFields = (count) => {
    showInputFields.value = true;
    formFields.forEach((field) => {
        for (let i = 0; i < count; i++) {
            const newField = {
                model: field.model + i,
                label: field.label + ' ' + (i + 1),
                rules: field.rules,
            };
            formFields.push(newField);
        }
        console.log('User Max Age:', max_Entry_Age);
    });
    count++;
};


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
const policyDetailsDialog = ref(false)
const selectedPolicy = ref(null)

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
// const policyCovers_data = ref

const updateDialog = ref(false);
const updateProductId = ref(null);

const rules = {
    policy_name: [(v) => !!v || 'Policy Name is required.'],
    short_description: [(v) => !!v || 'Short Description is required.'],
    long_description: [(v) => !!v || 'Long Description is required.'],
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
    policy_covers: false,
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
            console.log(response.data);
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
    name: '',
    short_description: '',
    long_description: '',
    policy_covers: [],

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
    if (!policyCovers.length) {

        addErrorFields.policy_covers = true;

        console.log(policyCovers.length);
        addValidationError.value = 'Please add policy covers.';
    }

    if (Object.values(addErrorFields).some(fieldError => fieldError)) {
        addValidationError.value = 'Please fill in all required fields.';
        return;
    }

    // if (!form.policy_covers.length) {
    //     addErrorFields.policy_covers = true;
    //     addValidationError.value = 'Please add policy covers.';
    //     return;
    // }

    try {
        const policyCoversArray = policyCovers.map((cover) => ({
            cover: cover.cover,
            underwriter: cover.underwriter,
            premium: cover.policy_premium,
            max_entry_age: cover.max_entry_age,
            // administration_fee: cover.administration_fee,
        }));

        const requestData = {
            policy_name: form.policy_name,
            short_description: form.short_description,
            long_description: form.long_description,
            date: '2023-10-19',
            administration_fee: "20",
            policy_covers: policyCoversArray,
        };
        console.log('requestData ', requestData);
        const response = await axios.post(`http://localhost:9000/policy_details`, requestData, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
            },
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
            policyCovers.length = 0;

            getPolicies();

        }
    } catch (error) {
        console.error('Error adding product:', error);

        if (error.response && error.response.data && error.response.data.validation_error) {
            console.error('Validation error details:', error.response.data.validation_error);
        }
    }

    // }
};

const addPolicyCover = () => {
    policyCovers.push({});
    console.log(policyCovers);

};

const removePolicyCover = (index) => {
    policyCovers.splice(index, 1);
};


const showUpdateDialog = (item) => {
    forms.policy_name = item.name;
    forms.short_description = item.short_description;
    forms.long_description = item.long_description;
    forms.policy_covers = getCoverDetails(item);
    console.log(forms.policy_covers);

    updateProductId.value = item.sid;
    updateDialog.value = true;



};


const forms = reactive({
    policy_name: '',
    short_description: '',
    long_description: '',
    policy_covers: [],

    // policy_premium: '',
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
    if (!policyCovers.length) {

        addErrorFields.policy_covers = true;

        console.log(policyCovers.length);
        addValidationError.value = 'Please add policy covers.';
    }
    // if (!forms.policy_premium) {
    //     errorFields.policy_premium = true;
    // }

    if (Object.values(errorFields).some(fieldError => fieldError)) {
        validationError.value = 'Please fill in all required fields.';
        return;
    }
    // console.log(forms.policy_premium)
    try {
        // const policyCoversArray = policyCovers.map((cover) => ({
        //     cover: cover.cover,
        //     underwriter: cover.underwriter,
        //     premium: cover.policy_premium,
        //     max_entry_age: cover.max_entry_age,
        //     // administration_fee: cover.administration_fee,
        // }));

        const requestUpdateData = {
            policy_name: forms.policy_name,
            short_description: forms.short_description,
            long_description: forms.long_description,
            date: '2023-10-19',
            administration_fee: "20",
            policy_covers: forms.policy_covers,
        }
        console.log(requestUpdateData);

        const response = await axios.put(`http://localhost:9000/update_policy_details?sid=${updateProductId.value}`, requestUpdateData, {
            // name: forms.policy_name,
            // short_description: forms.short_description,
            // long_description: forms.long_description,
            // policy_covers: policyCoversArray,
            // premium: forms.policy_premium,
            // premium_due_date: forms.premium_due_date,
            // }, {
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
        console.log("item premium:", item.cover_details.premium);
        // selectedPolicy = item;
        // console.log('selectedPolicy', selectedPolicy)
        // policyDetailsDialog = true;
        showUpdateDialog(item);
    }
};

// works
const handleViewPolicyCovers = (item) => {
    selectedPolicy.value = item;
    policyDetailsDialog.value = true;
};

const getCoverDetails = (item) => {
    // const covers = item.cover_details;

    try {
        const details = JSON.parse(item.cover_details);
        return Array.isArray(details) ? details : [details];
    } catch (error) {
        console.error('Error parsing cover details:', error);
        return [];
    }
};

// const openUpdateDialog = (item) => {
//     // selectedPolicy = item;
//     console.log("openUdateDialog ", item);
//     // updateDialog = true;
// };

// const showUpdateDialog = (item) => {
//     try {
//         this.openUpdateDialog(item);
//     } catch (error) {
//         console.error('Error in showUpdateDialog:', error);
//     }
// };

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
                <v-btn color="primary" prepend-icon="ic:round-plus" @click="addNewPolicyModal = true"
                    style="margin-right: 16px;">
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
                                <v-textarea label="Policy Name* " v-model="form.policy_name"
                                    :rules="rules.policy_name"></v-textarea>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-textarea v-model="form.short_description" label="Short Description*"
                                    :rules="rules.short_description"></v-textarea>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-textarea v-model="form.long_description" label="Long Description*"
                                    :rules="rules.long_description"></v-textarea>
                            </v-col>
                        </v-row>

                        <v-row v-for="(cover, index) in policyCovers" :key="index">
                            <v-col cols="12" sm="6" md="8" v-for="(field, fieldIndex) in formFields" :key="fieldIndex">
                                <v-text-field v-model="cover[field.model]" :label="field.label"
                                    :rules="field.rules"></v-text-field>
                            </v-col>
                            <v-col cols="auto">
                                <v-btn @click="removePolicyCover(index)">Remove Cover</v-btn>
                            </v-col>
                        </v-row>
                        <v-col cols="auto">
                            <v-btn @click="addPolicyCover">Add Policy Cover</v-btn>
                        </v-col>

                        <v-alert type="error" title="Error" v-if="!isFormFieldFocused && addValidationError">
                            {{ addValidationError }}
                        </v-alert>
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
                        <!-- Policy Premium -->
                        Policy Cover
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
                    <!-- <td @click="handleRowClick(item)">{{ item.premium }}</td> -->
                    <td @click="handleViewPolicyCovers(item)">View</td>
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
                                <v-textarea label="Policy Name* " required v-model="forms.policy_name"
                                    :rules="rules.policy_name" @scroll="handleInputScroll" @focus="handleInputFocus"
                                    @blur="handleInputBlur" />
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

                            <!-- <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="forms.policy_premium" label="Policy Premium*" required
                                    :rules="rules.policy_premium" @scroll="handleInputScroll" @focus="handleInputFocus"
                                    @blur="handleInputBlur"></v-text-field>
                            </v-col> -->

                            <v-table>
                                <thead>
                                    <tr>
                                        <th class="text-left">Cover</th>
                                        <th class="text-left">Premium</th>
                                        <th class="text-left">Underwriter</th>
                                        <th class="text-left">Max Entry Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="cover in forms.policy_covers" :key="cover.sid" class="clickable-row">
                                        <td class="text-center">{{ cover.cover }}</td>
                                        <td class="text-center">{{ cover.premium }}</td>
                                        <td class="text-center">{{ cover.underwriter }}</td>
                                        <td class="text-center">{{ cover.max_entry_age }}</td>
                                    </tr>
                                </tbody>
                            </v-table>


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

        <!-- Modal for displaying policy details -->
        <v-dialog v-model="policyDetailsDialog" max-width="800">
            <v-card>
                <v-card-title>
                    Policy Details
                </v-card-title>
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Cover
                            </th>
                            <th class="text-left">
                                Premium
                            </th>
                            <th class="text-left">
                                Underwriter
                            </th>
                            <th class="text-left">
                                Max Entry Age
                            </th>

                            <!-- <th class="text-left">
                                Action
                            </th> -->
                        </tr>
                    </thead>
                    <tbody v-if="getCoverDetails(selectedPolicy).length > 0">
                        <tr v-for="item in getCoverDetails(selectedPolicy)" :key="item.sid" class="clickable-row">
                            <td class="text-center">{{ item.cover }}</td>
                            <td class="text-center">{{ item.premium }}</td>
                            <td class="text-center">{{ item.underwriter }}</td>
                            <td class="text-center">{{ item.max_entry_age }}</td>
                            <!-- <td>
                                <div class="button-container"> -->
                            <!-- <button @click="policyDetailsDialog = false">Close</button> -->
                            <!-- <button class="btn btn-danger" @click="policyDetailsDialog = false">Delete</button>
                                </div>
                            </td> -->
                            <!-- <td>
                                <div class="button-container">
                                    <button v-if="item.active === 0" @click="restoreProduct(item)"
                                        class="btn btn-success">Restore</button>
                                    <button v-if="item.active === 1" @click="handleDeletePolicy(item.sid)"
                                        class="btn btn-danger">Delete</button>
                                </div>
                            </td> -->
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="5">No Data</td>
                        </tr>

                    </tbody>
                </v-table>
                <v-card-actions>
                    <v-btn @click="policyDetailsDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        Policy Premium
                    </th>
                    <th class="text-left">
                        Cover Amount
                    </th>
                    <th class="text-left">
                        Underwriter
                    </th>
                    <th class="text-left">
                        Max. Entry Age
                    </th> -->
        <!-- <th class="text-left">
          Premium Due Date
        </th> -->
        <!-- <th class="text-left">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody v-if="data.length > 0">
                <tr v-for="item in data" :key="item.sid" class="clickable-row">
                    <td @click="handleRowClick(item)">{{ item.premium }}</td>
                    <td @click="handleRowClick(item)">{{ item.cover }}</td>
                    <td @click="handleRowClick(item)">{{ item.underwriter }}</td>
                    <td @click="handleRowClick(item)">{{ item.max_entry_age }}</td> -->
        <!-- <td>{{ item.premium_due_date }}</td> -->
        <!-- <td>
                        <div class="button-container"> -->
        <!-- Restore Button -->
        <!-- <button v-if="item.active === 0" @click="restoreProduct(item)" class="btn btn-success">
                                Restore
                            </button> -->
        <!-- Edit and Delete Buttons -->
        <!-- <button v-if="item.policy_detail_delete === 0" @click="showUpdateDialog(item)" class="btn btn-danger">
                Edit
              </button> -->
        <!-- <button v-if="item.active === 1" @click="handleDeletePolicy(item.sid)" class="btn btn-danger">
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
        </v-table> -->
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

.text-center {
    text-align: center;
}
</style>
