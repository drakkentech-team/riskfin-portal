<template>
    <div class="progress-bar">
        <div class="step" v-for="(step, index) in steps" :key="index">
            {{ step }}
            <div class="step-indicator" :class="{ done: index < currentStep }"></div>
        </div>
    </div>

    <v-progress-linear id="progress" style="display: none;" height="7" color="grey lighten-3">
        <v-progress-linear v-if="loading" id="progressBar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
            style="display: none;">Loading ...
        </v-progress-linear>
    </v-progress-linear>

    <v-container class="my-6">
        <v-row>
            <v-col cols="12">
                <h1 class="text-h6">Please Enter Main Member Details</h1>
            </v-col>
        </v-row>
        <v-form @submit.prevent="nextPage" action="./spouse-details" method="POST">
            <fieldset>
                <!-- Input fields here (using v-text-field or v-select) -->

                <v-row>
                    <v-col cols="4">
                        <v-text-field v-model="formData.first_name" label="First Names" required
                            @input="showErrors = false"></v-text-field>

                        <v-text-field v-model="formData.known_as" label="KnownAs" required
                            @input="showErrors = false"></v-text-field>

                        <v-select v-model="formData.type_of_identity_document" label="Type of Identity Document" required
                            @input="showErrors = false">
                            <v-select-item value="RSA">RSA</v-select-item>
                            <v-select-item value="Passport">Passport</v-select-item>
                            <v-select-item value="Other">Other</v-select-item>
                        </v-select>

                        <v-text-field v-model="formData.id" label="Identity Number" required
                            @input="showErrors = false"></v-text-field>

                    </v-col>
                    <v-col cols="4">
                        <v-text-field v-model="formData.surname" label="Surname" required
                            @input="showErrors = false"></v-text-field>

                        <v-text-field v-model="formData.address_line_1" label="Address Line 1" required
                            @input="showErrors = false"></v-text-field>

                        <v-text-field v-model="formData.address_line_2" label="Address Line 2" required
                            @input="showErrors = false"></v-text-field>

                        <v-text-field v-model="formData.address_line_3" label="Address Line 3" required
                            @input="showErrors = false"></v-text-field>

                        <v-text-field v-model="formData.city" label="City" required
                            @input="showErrors = false"></v-text-field>

                        <v-text-field v-model="formData.mobile_number" label="Contact Number" required
                            @input="showErrors = false"></v-text-field>

                        <v-text-field v-model="formData.email" label="Email Address" required
                            @input="showErrors = false"></v-text-field>

                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <p class="text--secondary">* Indicates Mandatory fields</p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <p class="error-message" v-show="showErrors">Error messages go here</p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-btn color="primary" @click="submitForm">Continue</v-btn>
                        <v-btn color="error" @click="goBack">Cancel</v-btn>
                    </v-col>
                </v-row>
            </fieldset>
        </v-form>
        <input type="hidden" id="hdn_newRegInfo" name="hdn_newRegInfo" v-model="formData" />
    </v-container>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";

export default {
    computed: {
        ...mapGetters(['getUserData']),
        ...mapActions(['updateUserData']),
    },
    data() {
        return {
            currentStep: 2,
            steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
            userData: {
                name: '',
                surname: '',
                email: '',
                mobile_number: '',
                idNumber: '',
            },
            storedData: {
                first_name: '',
                known_as: '',
                surname: '',
                type_of_identity_document: '',
                id: '',
                age: '',
                date_of_birth: '',
                year: '',
                month: '',
                date: '',
                address_line_1: '',
                address_line_2: '',
                address_line_3: '',
                city: '',
                mobile_number: '',
                email: '',
                riskfin_direct_user_fk: "1"
            },
        };
    },
    methods: {

        updateDateOfBirth() {
            this.storedData.date_of_birth = `${this.storedData.year}-${this.storedData.month}-${this.storedData.date}`;
        },

        async nextPage() {
            this.storedData.first_name = this.getUserData.name;
            this.storedData.surname = this.getUserData.surname;
            this.storedData.email = this.getUserData.email;
            this.storedData.mobile_number = this.getUserData.mobile_number;
            this.storedData.id = this.getUserData.idNumber;
            this.updateDateOfBirth();

            const userData = {
                ...this.storedData,
            };

            this.$store.dispatch('updateUserData', userData);

            console.log(this.storedData);
            console.log(userData);
            try {
                const response = await axios.post('http://localhost:9000/riskfin_direct_user_details', this.storedData, {
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response.data.message);
                console.log(this.storedData);
                // this.updateUserData(userData);

                console.log(userData);
                this.$router.push('./spouse-details');
            } catch (error) {
                console.error('Error:', error);
            }
        },
        goBack() {
            this.$router.push('./home');
        },
        created() {
            this.userData = this.getUserData;
        },
    },
    validateForm() {
        // Implement your form validation logic here
        // Return true if the form is valid; otherwise, return false
    },
    submitForm() {
        // Submit the form data here
        // Use axios or fetch to make a POST request
    },
    goBack() {
        // Implement going back to the previous step or page
    },
},
};
</script>
  
<style lang="scss">
.container-fluid {
    margin-inline: auto;
    padding-inline: 15px;
}

.container-fluid::after,
.container-fluid::before {
    display: table;
    content: " ";
}

input,
select {
    padding: 4px;
    border: 0.2px solid #ccc;
    border-radius: 4px;
    inline-size: 16vw;

    /* inline-size: 100%; */
}

.container-fluid::after {
    clear: both;
}

.btn {
    inline-size: 6vw;
    margin-block-end: 1rem;
}

.fieldset {
    display: block;
    margin-inline-end: 2px;
    margin-inline-start: 2px;
    min-inline-size: min-content;
    padding-block-end: 0.625em;
    padding-block-start: 0.35em;
    padding-inline-end: 0.75em;
    padding-inline-start: 0.75em;
}

.progress-bar {
    display: flex;
    overflow: hidden;

    /* Hide overflowing rounded corners */
    align-items: center;
    justify-content: space-between;
    border: 1px solid #007bff;
    border-radius: 20px;

    /* Rounded border */
    background-color: #f0f0f0;

    /* Background color of the progress bar */
    inline-size: 80%;
    margin-block: 0;
    margin-block-start: 1rem;
    margin-inline: auto;
    padding-block: 10px;
    padding-inline: 0;
}

.step {
    position: relative;
    flex: 1;
    padding-block: 10px;
    padding-inline: 0;
    text-align: center;
}

.step:not(:last-child)::after {
    position: absolute;
    background-color: #007bff;

    /* Color of the separator line */
    content: "";
    inline-size: 2px;

    /* Adjust the width of the separator as needed */
    inset-block-start: 50%;
    inset-inline-end: -1px;

    /* Adjust the position of the separator */
    transform: translateY(-50%);
}

.step-indicator {
    position: absolute;
    border-radius: 50%;

    // background-color: #007bff;
    block-size: 20px;
    inline-size: 20px;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    margin-block: 0;
    margin-inline: auto;
    transform: translate(-50%, -50%);
    transition: background-color 0.3s;
}

.step-indicator.done {
    background-color: #28a745;

    // background-color: transparent; /* Set the background to transparent */
    color: #28a745;

    /* Change the text color for completed steps */
}
</style>
  
  