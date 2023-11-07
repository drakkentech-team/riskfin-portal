<template>
    <v-main>
        <v-container style="max-width:90%">
            <h1>Thank you {{ userData.name }}</h1><br>
            <v-text>
                An email was sent to the email address provided by you. Kindly open the email and click on the link
                contained in that email to proceed with the application for a new policy.
            </v-text><br><br>
            <v-text>- Riskfin Direct</v-text>


            <div class="mx-4 mt-1" style="font-size: 80%; text-align: end;padding: 3rem 0;">
                <v-btn @click="submit" color="#98142c"
                    style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;"
                    class="mr-4">Continue</v-btn>
                <v-btn @click="resendEmail" color="#98142c"
                    style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;"
                    class="mr-4">Resend</v-btn>
                <v-btn @click="goToHome" color="#98142c"
                    style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Back
                    to Home</v-btn>
            </div>
            <div class="mx-4 mt-1" style=" font-size: 80%; text-align: end;">
                <a href="#" @click="openModal" class="black--text"
                    style=" color: #4c5e70; font-size: 13px; text-decoration: none;">Need Help ?</a>
            </div>

            <!-- Use the reusable modal component -->
            <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal">
                <v-text>
                    To proceed with the application for a funeral policy, please check your email. We have sent you an email
                    which contains a link to the next step in the application process.
                </v-text>
                <v-text>
                    If you do not receive an email from us within the next 5 to 10 minutes, please click the resend button
                    so that we may resend the confirmation email to the address provided by you.
                </v-text>
                <v-text>- Riskfin Direct</v-text>
            </modal>
        </v-container>
    </v-main>
</template>
  
<script>
import { mapGetters } from 'vuex';
import Modal from './help-modal.vue';

export default {
    computed: {
        ...mapGetters(['getUserData']),
    },
    components: {
        Modal,
    },
    data() {
        return {
            isModalOpen: false,
            userData: {},
        };
    },
    methods: {
        submit() {
            this.$router.push({ name: 'build-funeral-policy' });
        },

        resendEmail() {
            this.$router.push({ name: 'register' });
        },
        goToHome() {
            this.$router.push({ name: 'home' });
        },
        // Method to open the modal
        openModal() {
            this.isModalOpen = true;
        },
        // Method to close the modal
        closeModal() {
            this.isModalOpen = false;
        },
    },
    created() {
        this.userData = this.getUserData;
    },
};
</script>
  