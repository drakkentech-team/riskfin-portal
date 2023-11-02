<template>
    <v-container>
        <v-form>
            <h2 class="text-center">Register For a Funeral Plan</h2>

            <div style="margin-left: 25%;">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="firstNames" label="First Names" :rules="nameRules"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field v-model="surname" label="Surname" :rules="nameRules"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="email" label="Email" :rules="emailRules"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field v-model="idNumber" label="Identity Number" :rules="idNumberRules"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="contactPhoneNumber" label="Contact Phone Number"
                            :rules="phoneRules"></v-text-field>
                    </v-col>
                </v-row>
            </div>

            <v-row>
                <v-col cols="12" class="text-right">
                    <a href="#" @click="openModal" style=" color: #4c5e70; font-size: 13px; text-decoration: none;">Need
                        Help ?</a>
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center" style="padding-bottom: 2rem; margin-top: 5rem;">
                <v-btn color="#98142c"
                    style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; color: #fff; cursor: pointer;"
                    @click="register">
                    Continue
                </v-btn>
                <v-btn color="#98142c"
                    style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; color: #fff; cursor: pointer;"
                    @click="cancel">
                    Cancel
                </v-btn>
            </v-row>

            <!--Help modal component -->
            <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal">

                <div class="text-left mb-6 mx-3">
                    <v-text>
                        Please click on "Apply For Funeral Plan" button to continue
                    </v-text>
                </div>
                <div>
                    <v-text class="text-left mx-3">
                        - Riskfin Direct
                    </v-text>
                </div>
            </modal>

            <!-- <v-row>
                <v-col cols="12" class="text-right">
                    <a href="#" @click="openModal" style=" color: #4c5e70; font-size: 13px; text-decoration: none;">Need
                        Help ?</a>
                </v-col>
            </v-row> -->

            <!--Need help modal component -->
            <!-- <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal">

                <div class="text-left mb-6 mx-3">
                    <v-text>
                        Please confirm your contact details below and click the "Continue" button to proceed with the
                        application or click the "Cancel" button to quit.
                    </v-text>
                </div>
                <div>
                    <v-text class="text-left mx-3">
                        - Riskfin Direct
                    </v-text>
                </div>
            </modal> -->

            <!-- <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal">

                <div class="text-left mb-6 mx-3">
                    <v-text>
                        Please confirm your contact details below and click the "Continue" button to proceed with the
                        application or click the "Cancel" button to quit.
                    </v-text>
                </div>
                <div>
                    <v-text class="text-left mx-3">
                        - Riskfin Direct
                    </v-text>
                </div>
            </modal> -->

        </v-form>
    </v-container>
</template>
  
<script>
import { ref } from "vue";
import Modal from './help-modal.vue';

export default {
    components: {
        Modal,
    },
    name: 'FuneralPlanRegistration',
    setup() {
        const firstNames = ref('');
        const email = ref('');
        const contactPhoneNumber = ref('');
        const surname = ref('');
        const idNumber = ref('');
        const isModalOpen = ref(false);
        const router = useRouter();
        const showAlert = ref(false)

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
        };

        const nameRules = [v => !!v || "First Name is required"];
        const emailRules = [
            v => !!v || "Email is required",
            v => /.+@.+\..+/.test(v) || "Email must be valid",
        ];
        const idNumberRules = [
            v => !!v || "Identity Number is required",
            v => /^\d{13}$/.test(v) || "Identity Number must be 13 digits",
        ];
        const phoneRules = [
            v => !!v || "Contact Phone Number is required",
            v => /^\d{10}$/.test(v) || "Contact Phone Number must be 10 digits",
        ];


        const register = () => {
            if (
                firstNames.value &&
                email.value &&
                idNumber.value &&
                contactPhoneNumber.value &&
                surname.value
            ) {
                router.push({
                    name: "welcome",
                    query: {
                        firstNames: firstNames.value,
                        email: email.value,
                        contactPhoneNumber: contactPhoneNumber.value,
                        surname: surname.value,
                        idNumber: idNumber.value,
                    },
                });
                console.log("query: " + query);
            } else {
                // Handle form validation errors here
                showAlert.value = true;
            }
        };
        const cancel = () => {
            this.$router.go(-1);
        };


        return {
            firstNames,
            email,
            contactPhoneNumber,
            surname,
            idNumber,
            isModalOpen,
            register,
            cancel,
            openModal,
            closeModal,
            nameRules,
            emailRules,
            idNumberRules,
            phoneRules,
        };
    },
};
</script>
  
<style scoped>
h2 {
    margin: 1rem 0 2rem;
    color: #262626;
    text-align: center;
}
</style>

  