<template>
    <v-main>
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
                            <v-col cols="2" sm="4" md="12" style="height: 4.5em">
                                <v-text-field label="Full Name" required v-model="fullName"
                                    @input="showErrors = false"></v-text-field>
                                <v-col class="red-text">
                                    <span>*</span>
                                </v-col>
                            </v-col>

                            <v-col cols="4" sm="4" md="12" style="height: 4.5rem">
                                <v-select v-model="storedData.type_of_identity_document" label="Type of Identity Document"
                                    required @input="showErrors = false" :items="['RSA', 'Passport', 'Other']">
                                </v-select>
                                <v-col class="red-text">
                                    <span>*</span>
                                </v-col>
                            </v-col>
                            <v-col cols="4" sm="4" md="12" style="height: 4.5rem">
                                <v-text-field v-model="getUserData.idNumber" label="Identity Number" required
                                    @input="showErrors = false"></v-text-field>
                                <v-col class="red-text">
                                    <span>*</span>
                                </v-col>
                            </v-col>

                            <v-row>
                                <v-col class="d-flex align-items-center" lg="15" mt="0.5rem">
                                    <v-col lg="4" style="padding-right: 4.5rem;">
                                        <v-label for="date_of_birth">Date of Birth</v-label>
                                    </v-col>

                                    <v-col style="height: 4.5rem">
                                        <v-row>
                                            <v-col>
                                                <v-text-field v-model="storedData.year" placeholder="YYYY" outlined
                                                    style="width: 80px; margin-left: -1rem;"
                                                    @input="showErrors = false"></v-text-field>
                                            </v-col>

                                            <v-col>
                                                <v-text-field v-model="storedData.month" placeholder="MM" outlined
                                                    style="width: 60px; margin-left: -0.5rem;"
                                                    @input="showErrors = false"></v-text-field>
                                            </v-col>

                                            <v-col>
                                                <v-text-field v-model="storedData.date" placeholder="DD" outlined
                                                    style="width: 60px; margin-left: -0.6rem;"
                                                    @input="showErrors = false"></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <!-- <v-col>
                                                <v-alert type="error" v-if="/* your condition for displaying the error */">
                                                    <-- Your error message goes here --
                                                </v-alert>
                                            </v-col> -->
                                        </v-row>
                                    </v-col>
                                </v-col>
                            </v-row>

                            <v-col cols="4" sm="4" md="12" style="height: 4.5rem">
                                <v-text-field v-model="getUserData.age" label="Age" required
                                    @input="showErrors = false"></v-text-field>
                            </v-col>
                        </v-col>


                        <v-col cols="4">
                            <!-- <v-col cols="4" sm="4" md="12" style="height: 4.5rem">
                                <v-text-field v-model="getUserData.surname" label="Surname" required
                                    @input="showErrors = false"></v-text-field>
                            </v-col> -->

                            <v-col cols="4" sm="4" md="12" style="height: 4.5rem">
                                <v-text-field v-model="storedData.known_as" label="KnownAs" required
                                    @input="showErrors = false"></v-text-field>
                                <v-col class="red-text">
                                    <span>*</span>
                                </v-col>
                            </v-col>

                            <v-col cols="4" sm="4" md="12" style="height: 4.5rem">
                                <v-text-field v-model="storedData.address_line_1" label="Address Line 1" required
                                    @input="showErrors = false"></v-text-field>
                                <v-col class="red-text">
                                    <span>*</span>
                                </v-col>
                            </v-col>

                            <!-- 
                        <v-text-field v-model="storedData.address_line_2" label="Address Line 2" required
                            @input="showErrors = false"></v-text-field>

                        <v-text-field v-model="storedData.address_line_3" label="Address Line 3" required
                            @input="showErrors = false"></v-text-field> -->

                            <v-col cols="4" sm="4" md="12" style="height: 4.5rem">
                                <v-text-field v-model="storedData.city" label="City" required
                                    @input="showErrors = false"></v-text-field>
                                <v-col class="red-text">
                                    <span>*</span>
                                </v-col>
                            </v-col>

                            <v-col cols="4" sm="4" md="12" style="height: 4.5rem">
                                <v-text-field v-model="getUserData.mobile_number" label="Contact Number" required
                                    @input="showErrors = false"></v-text-field>
                                <v-col class="red-text">
                                    <span>*</span>
                                </v-col>
                            </v-col>

                            <v-col cols="4" sm="4" md="12" style="height: 4.5rem">
                                <v-text-field v-model="getUserData.email" label="Email Address" required
                                    @input="showErrors = false"></v-text-field>
                                <v-col class="red-text">
                                    <span>*</span>
                                </v-col>
                            </v-col>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="8">
                            <p class="text--secondary" style="font-size: 14px; margin-inline-start: 1rem;">* Indicates
                                Mandatory fields</p>
                        </v-col>
                    </v-row>
                </fieldset>
            </v-form>
            <v-row>
                <v-col cols="12">
                    <p class="error-message" v-show="showErrors">Please fill in all required fields.</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" style="margin-inline-start: 40%; padding-top: 2rem;">
                    <v-btn color="#90162a" @click="nextPage"
                        style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; color: #fff; cursor: pointer;">Continue</v-btn>
                    <v-btn color="#90162a" @click="goBack"
                        style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; color: #fff; cursor: pointer;">Cancel</v-btn>
                </v-col>
            </v-row>
            <input type="hidden" id="hdn_newRegInfo" name="hdn_newRegInfo" v-model="storedData" />
        </v-container>
    </v-main>
</template>
  
<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";

export default {
    name: 'main-member-details',
    computed: {
        ...mapGetters(['getUserData']),
        ...mapActions(['updateUserData']),
        fullName: {
            get() {
                if (this.getUserData.name && this.getUserData.surname) {
                    return `${this.getUserData.name} ${this.getUserData.surname}`;
                } else {
                    return '';
                }
            },
            set(value) {
                const [name, surname] = value.split(' ');
                this.updateUserData({ name, surname });
            },
        },
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
                year: '',
                month: '',
                date: '',
                date_of_birth: '',
                address_line_1: '',
                address_line_2: '',
                address_line_3: '',
                city: '',
                mobile_number: '',
                email: '',
                riskfin_direct_user_fk: "1"
            },
            forceValidation: false,
            showErrors: false,
        };
    },
    methods: {

        updateDateOfBirth() {
            this.storedData.date_of_birth = `${this.storedData.year}-${this.storedData.month}-${this.storedData.date}`;
        },

        async nextPage() {
            this.forceValidation = true;
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

            const isFullNameValid = this.fullName && !isNaN(this.fullName);
            const isEmailValid = /.+@.+\..+/.test(this.getUserData.email);
            const isIdNumberValid = /^\d{13}$/.test(this.getUserData.idNumber);
            const isMobileNumberValid = /^\d{10}$/.test(this.getUserData.mobile_number);
            const isKnownAsValid = !!this.storedData.known_as;
            const isAddressLine1Valid = !!this.storedData.address_line_1;
            const isCityValid = !!this.storedData.city;

            if (
                !isFullNameValid ||
                !isEmailValid ||
                !isIdNumberValid ||
                !isMobileNumberValid ||
                !isKnownAsValid ||
                !isAddressLine1Valid ||
                !isCityValid
            ) {
                this.showErrors = true;
                console.log("not going through!")

                return;
            }

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
            this.forceValidation = false;
            this.showErrors = false;
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
    color: #28a745;

}

.red-text {
    color: red;
    margin-left: 98%;
    margin-top: -18%;
    // align-self: center;
    /* Adjust margin as needed */
}

.error-message {
    color: #90162a;
    font-size: 14px;
    text-align: center;
    padding-top: 2rem;
    margin-bottom: -2rem;
}
</style>
  
  