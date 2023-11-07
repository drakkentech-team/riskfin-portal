<template>
    <div class="container">
        <section class="content">
            <div class="progress-bar">
                <div class="step" v-for="(step, index) in steps" :key="index">
                    {{ step }}
                    <div class="step-indicator" :class="{ done: index < currentStep }"></div>
                </div>
            </div>

            <div style="margin-bottom: 1rem;">
                <form @submit.prevent="submitForm">
                    <h1 style="margin-top: 1rem; margin-bottom: 10px; color: #262626; text-align: center;">Policy Selection
                    </h1>
                    <div class="container-fluid" style="max-height: 375px; border: 2px solid black; overflow-y: auto;">
                        <table style="padding-top: 1rem;">
                            <tbody>
                                <tr v-for="(policy, index) in policies" :key="index">
                                    <td>
                                        <input type="radio" :value="policy" v-model="selectedPolicy"
                                            :name="'policySelection'" />
                                    </td>
                                    <td>{{ policy.name }}</td>
                                    <td>{{ policy.long_description }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <span v-if="validationError && !selectedPolicy"
                            style="margin-left: 45%; color: #a5223a; font-size: small;">You must select a Policy to
                            continue!</span>
                        <div style="margin: 1rem;">
                            <p style="color: #90162a; font-size: 18px; text-align: center;">
                                Select one of the above mentioned options
                                <button @click="submitForm"
                                    style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;">
                                    Continue
                                </button>
                                <button @click="goBack"
                                    style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">
                                    Back
                                </button>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>
  
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const apiBaseUrl = "http://localhost:9000";
const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";

export default {
    data() {
        return {
            currentStep: 1,
            steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
            policies: [],
        };
    },

    setup() {
        const validationError = ref(false);
        const selectedPolicy = ref(null);
        const router = useRouter();

        const goBack = () => {
            router.go(-1);
        };

        const submitForm = () => {
            if (selectedPolicy.value) {
                // Pass the selected policy as a query parameter
                router.push({
                    // path: "./cover-selection/cover-selection",
                    path: "./cover-selection/family",
                    query: { policy: JSON.stringify(selectedPolicy.value) },
                });
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
                console.log(response.data);
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

.container {
    margin-block: 0;
    margin-inline: 5rem;
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

    /* Set the background to transparent */
    color: #28a745;

    /* Change the text color for completed steps */
}

.table-container {
    max-block-size: 375px;
    overflow-y: auto;
}
</style>
  