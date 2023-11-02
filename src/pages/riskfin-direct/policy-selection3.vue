<template>
    <!-- ... Your other template code ... -->
    <div class="container-fluid" style="max-height: 375px; border: 2px solid black; overflow-y: auto;">
        <table style="padding-top: 1rem;">
            <tbody>
                <tr v-for="(policy, index) in policies" :key="index">
                    <td>
                        <input type="radio" :value="policy.path" v-model="selectedPolicies[index]">
                    </td>
                    <td>{{ policy.name }}</td>
                    <td>{{ policy.description }}</td>
                </tr>
            </tbody>
        </table>
        <span v-if="validationError && !selectedPolicies.some(policy => policy)"
            style="margin-left: 45%; color: #a5223a; font-size: small;">You must select a Policy to continue!</span>
        <div style="margin: 1rem;">
            <p style="color: #90162a; font-size: 18px; text-align: center;">
                Select one of the above mentioned options
                <button @click="submitForm"
                    style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;">Continue</button>
                <button @click="goBack"
                    style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Back</button>
            </p>
        </div>
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
            selectedPolicies: [], // Create a separate array for selected policies
        };
    },

    setup() {
        const validationError = ref(false);
        const router = useRouter();

        const submitForm = () => {
            if (selectedPolicies.some(policy => policy)) {
                const selectedPolicy = selectedPolicies.find(policy => policy);
                router.push(`./cover-selection/${selectedPolicy}`);
            } else {
                validationError.value = true;
            }
        };

        const goBack = () => {
            router.go(-1);
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
                // Initialize the selectedPolicies array with the same length as policies
                selectedPolicies.value = new Array(response.data.length).fill(false);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching policies from the API:", error);
            }
        });

        return {
            validationError,
            selectedPolicies,
            submitForm,
            goBack,
            policies,
        };
    },
};
</script>
  