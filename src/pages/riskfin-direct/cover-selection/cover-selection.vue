<template>
    <div>
        <v-row class="progress-bar">
            <v-col v-for="(step, index) in steps" :key="index" cols="2">
                <div class="step">
                    {{ step }}
                    <v-avatar :class="{ done: index < currentStep }">
                        <v-icon v-if="index < currentStep">mdi-check</v-icon>
                    </v-avatar>
                </div>
            </v-col>
        </v-row>

        <v-form @submit.prevent="submitForm" action="../main-member-details" method="POST">
            <v-container class="mt-4">
                <v-row>
                    <v-col>
                        <h1 class="text-center" style="color: #262626;">Cover Selection - Family</h1>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="overflow-container">
                        <v-data-table :items="policies" item-key="value" show-select single-select>
                            <template v-slot:top>
                                <tr class="table-header">
                                    <th></th>
                                    <th>Cover</th>
                                    <th>Underwriter</th>
                                    <th>Premium</th>
                                    <th>Max. Entry Age</th>
                                </tr>
                            </template>
                            <template v-slot:items="props">
                                <tr :class="{ 'td-inner-data': props.selected }">
                                    <td>
                                        <v-radio v-model="selectedPolicy" :value="props.item" id="policyCover"
                                            name="policyCover"></v-radio>
                                    </td>
                                    <td>{{ props.item.cover }}</td>
                                    <td>{{ props.item.underwriter }}</td>
                                    <td>{{ props.item.premium }}</td>
                                    <td>{{ props.item.maxAge }}</td>
                                </tr>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>

                <v-row class="mt-4">
                    <v-col>
                        <p style="color: #90162a; font-size: 18px;">Select one of the above mentioned options</p>
                        <span v-if="validationError && !selectedPolicy" style="color: #a5223a; font-size: small;">You must
                            select an Option to continue!</span><br>
                        <v-btn @click="submitForm" color="#98142c" class="mr-2"
                            style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Continue</v-btn>
                        <v-btn @click="goBack" color="#98142c"
                            style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Back</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>
  
<script>
import { useRouter } from "vue-router";
import { useStore } from 'vuex';

export default {
    data() {
        return {
            currentStep: 1,
            steps: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Done"],
            selectedPolicy: null,
            policies: [
                {
                    value: "6",
                    cover: "R 5,000",
                    underwriter: "Safrican",
                    premium: 73.00,
                    maxAge: "64"
                },
                {
                    value: "16",
                    cover: "R 10,000",
                    underwriter: "Safrican",
                    premium: 109.00,
                    maxAge: "64"
                },
                {
                    value: "24",
                    cover: "R 15,000",
                    underwriter: "Safrican",
                    premium: 120.00,
                    maxAge: "64"
                },
                {
                    value: "28",
                    cover: "R 20,000",
                    underwriter: "Safrican",
                    premium: 140.00,
                    maxAge: "64"
                },
                {
                    value: "91",
                    cover: "R 25,000",
                    underwriter: "Safrican",
                    premium: 165.00,
                    maxAge: "64"
                },
                {
                    value: "29",
                    cover: "R 30,000",
                    underwriter: "Safrican",
                    premium: 200.00,
                    maxAge: "64"
                }
            ]
        };
    },

    setup() {
        const store = useStore();
        const validationError = ref(false);
        const selectedPolicy = ref(null);
        const router = useRouter();

        const submitForm = () => {
            if (selectedPolicy.value) {
                store.dispatch('updateSelectedPremium', selectedPolicy.value.premium);
                store.dispatch('updateSelectedCover', selectedPolicy.value.cover);
                // Redirect to the next page (page two)
                router.push('../main-member-details');
            } else {
                validationError.value = true;
            }
        };

        const goBack = () => {
            console.log(router.currentRoute.value.query.policy);
            router.go(-1);
        };

        return {
            validationError,
            selectedPolicy,
            submitForm,
            goBack,
        };
    },
};
</script>
  
<style scoped>
.progress-bar {
    display: flex;
    justify-content: space-between;
    border: 1px solid #007bff;
    border-radius: 20px;
    background-color: #f0f0f0;
    width: 80%;
    margin: 1rem auto;
    padding: 5px 0;
}

.step {
    position: relative;
    text-align: center;
}

.step-indicator {
    position: absolute;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 0.3s;
}

.step-indicator.done {
    background-color: #28a745;
    color: #28a745;
}

.overflow-container {
    width: 80%;
    max-height: 375px;
    border: 2px solid black;
    margin: 0 8rem;
    overflow-y: auto;
}

.table-header {
    font-weight: bold;
    text-align: center;
}

.td-inner-data {
    background-color: #90162a;
    color: white;
    font-weight: bold;
    text-align: center;
}
</style>
  