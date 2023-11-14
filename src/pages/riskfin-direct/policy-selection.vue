<template>
    <v-container>
        <v-row class="content">
            <!-- <v-col cols="12">
                <div class="progress-bar">
                    <div v-for="(step, index) in steps" :key="index" class="step">
                        <v-icon :class="{ 'done': index < currentStep }" small>
                            {{ index < currentStep ? 'mdi-check-circle' : 'mdi-circle' }} </v-icon>
                                {{ step }}
                    </div>
                </div>
            </v-col> -->

            <div class="progress-bar">
                <div class="step" v-for="(step, index) in steps" :key="index">
                    {{ step }}
                    <div class="step-indicator" :class="{ done: index < currentStep }"></div>
                </div>
            </div>

            <v-col style="margin-bottom: -1rem" cols="12">
                <v-form @submit.prevent="submitForm">
                    <h1 style="margin-top: 1rem; margin-bottom: 10px; color: #262626; text-align: center;">
                        Policy Selection
                    </h1>
                    <v-container class="table-container"
                        style="max-height: 375px; border: 2px solid black; overflow-y: auto;">
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                    <tr v-for="(policy, index) in policies" :key="index">
                                        <td style="padding-right: 1rem;">
                                            <!-- <v-radio v-model="selectedPolicy" :value="policy" color="primary"
                                                name="policySelection"></v-radio> -->
                                            <input type="radio" :value="policy" v-model="selectedPolicy"
                                                :name="'policySelection'" />
                                        </td>
                                        <td style="padding-right: 0.5rem;">{{ policy.name }}</td>
                                        <td>{{ policy.long_description }}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-container>
                </v-form>
            </v-col>

            <v-col v-if="validationError && !selectedPolicy" style="margin-left: 20%; color: #a5223a; font-size: small;">
                You must select a Policy to continue!
            </v-col>

            <v-col style="margin: 1rem 0 1rem 3rem; display: flex;">
                <p style="color: #90162a; font-size: 18px; text-align: center; margin-inline-end: 5rem;">Select one of the
                    above
                    mentioned options
                </p>
                <v-btn @click="submitForm" color="#98142c"
                    style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;">
                    Continue
                </v-btn>
                <v-btn @click="goBack" color="#98142c"
                    style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">
                    Back
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';


const apiBaseUrl = "http://localhost:9000";
const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";

export default {
    data() {
        return {
            currentStep: 0,
            steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
            policies: [],
        };
    },

    setup() {
        const store = useStore();
        const validationError = ref(false);
        const selectedPolicy = ref(null);
        const router = useRouter();

        const goBack = () => {
            router.go(-1);
        };

        // const submit = () => {
        //     if (selectedPolicy.value) {
        //         router.push({
        //             path: "./cover-selection/family",
        //             // query: { policy: JSON.stringify(selectedPolicy.value) },
        //             query: { policyId: selectedPolicy.value.id },
        //         });
        //         console.log("pol ", selectedPolicy.value)
        //     } else {
        //         validationError.value = true;
        //     }
        // };

        const submitForm = () => {
            if (selectedPolicy.value) {
                store.dispatch('updateSelectedPolicy', selectedPolicy.value);

                router.push({
                    path: "./cover-selection/family",
                    query: { policyId: selectedPolicy.value.id }, // Pass policy ID instead of the whole policy
                });
                console.log("pol ", selectedPolicy.value);
                return; // Add this line to prevent the navigation guard warning
            } else {
                validationError.value = true;
            }
        };

        const policies = ref([]);

        onMounted(async () => {
            try {
                const response = await axios.post(
                    `${apiBaseUrl}/policy_details_get`,
                    { user_id: 0, flag: 0 },
                    {
                        headers: {
                            Authorization: `Bearer ${bearerToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                policies.value = response.data;
            } catch (error) {
                console.error("Error fetching policies from the API:", error);
            }
        });

        return {
            validationError,
            selectedPolicy,
            submitForm,
            goBack,
            policies,
        };
    },
};
</script>
  
<style scoped>
form {
    display: block;
    margin-block-start: 0;
    padding-inline-start: 50px;
}

.progress-bar {
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #007bff;
    border-radius: 20px;
    background-color: #f0f0f0;
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
    content: "";
    inline-size: 2px;
    inset-block-start: 50%;
    inset-inline-end: -1px;
    transform: translateY(-50%);
}

.step-indicator {
    position: absolute;
    border-radius: 50%;
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
    background-color: transparent;
    color: #28a745;
}

.table-container {
    max-block-size: 375px;
    overflow-y: auto;
}
</style>
  