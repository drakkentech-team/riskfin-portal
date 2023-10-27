<template>
    <v-container>
        <modal :is-open="isOpen" title="View" @close="closeModal" style="font-size: small;">
            <div class="scrollable-content">
                <h2 class="modal-title">Main Member Details</h2>
                <form @submit.prevent="submitForm">
                    <fieldset>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-row align-items-center">
                                        <div class="col-lg-4">
                                            <label for="firstNames">First Names</label>
                                        </div>
                                        <input tabindex="1" type="text" id="firstNames" class="form-control"
                                            name="firstNames" v-model="modalUserData.first_name" />
                                        <div class="star">*</div>
                                    </div>

                                    <div class="form-row align-items-center">
                                        <div class="col-lg-4">
                                            <label for="KnownAs">Known As</label>
                                        </div>
                                        <input tabindex="1" type="text" id="KnownAs" class="form-control" name="KnownAs"
                                            v-model="modalUserData.known_as" />
                                        <div class="star">*</div>
                                    </div>

                                    <div class="form-row align-items-center">
                                        <div class="col-lg-4">
                                            <label for="Type of Identity Document">Type of Identity Document</label>
                                        </div>
                                        <select class="form-control" id="TOD" name="TOD">
                                            <option value="-1">Type Of Doc</option>
                                            <option value="0">RSA</option>
                                            <option value="1">Passport</option>
                                            <option value="2">Other</option>
                                        </select>
                                        <div class="star">*</div>
                                    </div>

                                    <div class="form-row align-items-center">
                                        <div class="col-lg-4">
                                            <label for="id">Identity Number</label>
                                        </div>
                                        <input type="text" id="id" class="form-control" name="id"
                                            v-model="modalUserData.id" />
                                        <div class="star">*</div>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="form-row">
                                        <div class="col-lg-2">
                                            <label for="OR">OR</label>
                                        </div>
                                    </div>

                                    <div class="form-row align-items-center">
                                        <div class="col-lg-4">
                                            <label for="BirthDate">Date of Birth</label>
                                        </div>
                                        <input type="hidden" id="BirthDate" class="form-control" name="BirthDate"
                                            v-model="modalUserData.date_of_birth" />
                                        <input type="text" id="Year" class="form-control" name="Year" value="YYYY"
                                            style="width: 70px; margin-right: 10px;" />
                                        <input type="text" id="Month" class="form-control" name="Month" value="MM"
                                            style="width: 50px; margin-right: 10px;" />
                                        <input type="text" id="Date" class="form-control" name="Date" value="DD"
                                            style="width: 50px;" />
                                    </div>

                                    <div class="form-row align-items-center">
                                        <div class="col-lg-4">
                                            <label for="Age">Age</label>
                                        </div>
                                        <input type="text" id="Age" class="form-control" name="Age"
                                            v-model="modalUserData.age" />
                                    </div>

                                    <div class="form-row align-items-center">
                                        <div class="col-lg-4">
                                            <label for="contactPhoneNumber">Contact Phone Number</label>
                                        </div>
                                        <input type="text" id="contactPhoneNumber" class="form-control"
                                            name="contactPhoneNumber" v-model="modalUserData.mobile_number" />
                                        <div class="star">*</div>
                                    </div>

                                    <div class="form-row align-items-center">
                                        <div class="col-lg-4">
                                            <label for="email">Email Address</label>
                                        </div>
                                        <input type="text" id="email" class="form-control" name="email"
                                            v-model="modalUserData.email" />
                                        <div class="star">*</div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-row" style="padding-right: 10%; padding-left: 5%;">
                                <div class="col-lg-6">
                                    <p class="text-danger">* Indicates Mandatory fields</p>
                                </div>
                                <div class="col-lg-6" style="margin-inline-start: 50%;">
                                    <p class="text-danger" v-for="error in formErrors" :key="error">{{ error }}</p>
                                    <br />
                                    <input type="submit" class="btn btn-default"
                                        style="background-color: #90162a; color: white;" value="Edit" />
                                    <input type="button" class="btn btn-default"
                                        style="background-color: #90162a; color: white;" value="Save" @click="goBack" />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </modal>
    </v-container>
</template>
  
<script>
import { mapGetters } from 'vuex';
import Modal from '../help-modal.vue';

export default {
    computed: {
        ...mapGetters(['getUserData']),
    },
    data() {
        return {
            modalUserData: {}, // Initialize with the prop value
            formErrors: [],
        };
    },
    props: {
        isOpen: Boolean, // Control whether the modal is open or not
    },
    methods: {
        closeModal() {
            this.$emit('close'); // Emit a custom event to close the modal
        },
        // submitForm() {
        //     // Handle form submission logic here, e.g., validation and saving
        //     this.formErrors = []; // Clear previous errors
        //     if (/* Your validation logic */) {
        //         // Handle validation errors and populate this.formErrors
        //     } else {
        //         // Save the form data
        //         this.$emit('close');
        //     }
        // },


        goBack() {
            // Handle the "Save" button click event
        },
    },
    components: {
        Modal,
    },
    created() {
        // Assign the prop value to modalUserData in the created hook
        this.modalUserData = { ...this.getUserData };
    },
};
</script>
  
<style scoped>
.modal-title {
    margin: 1rem;
    color: #90162a;
    text-align: center;
}

.star {
    color: red;
    font-size: 20px;
}

.scrollable-content {
    max-height: 500px;
    /* Adjust the height as needed */
    overflow-y: auto;
}
</style>
  