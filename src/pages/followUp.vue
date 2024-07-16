<script setup>
import { ref, computed } from 'vue';
import { getNotifications, getNotificationTemplates, sendNotification } from '../api/notifications';
import { applyFilters } from '../api/filters';
import { getProducts } from '../api/products';
import { todayDate, addDays } from "../utilities/common";
import { getMobileUsers } from '../api/mobileAppUsers';

const messageType = ref("All");

const data = [
    {
        "date": "2024/07/05",
        "user": "Burton Guster",
        "product": "Funeral Cover",
        "type": "Late Payment",
        "case_worker": "Harris Trout",
        "status": "Open"
    },
    {
        "date": "2024/07/04",
        "user": "Carlton Lassiter",
        "product": "Accisure",
        "type": "New Policy",
        "case_worker": "Craig Snoden",
        "status": "Open"
    },
    {
        "date": "2024/06/23",
        "user": "Juliette Ohara",
        "product": "RSI Car Rental",
        "type": "Cancel Policy",
        "case_worker": "Chad Clever",
        "status": "In Progress"
    },
    {
        "date": "2024/06/12",
        "user": "Henry Spencer",
        "product": "RSI Car Rental",
        "type": "New Policy",
        "case_worker": "Craig Snoden",
        "status": "In Progress"
    },
    {
        "date": "2024/05/22",
        "user": "Karen Vick",
        "product": "Family Cover",
        "type": "Change Details",
        "case_worker": "Harris Trout",
        "status": "Closed"
    },
    {
        "date": "2024/05/22",
        "user": "Marlene Louw",
        "product": "Funeral Cover",
        "type": "Cancel Policy",
        "case_worker": "Chad Clever",
        "status": "Closed"
    }
];

const filteredData = computed(() => {
    if (messageType.value === "All") {
        return data;
    } else {
        return data.filter(item => item.type === messageType.value);
    }
});
</script>

<template>
	<div class="p-grid">
		<div class="p-col-12">
			<Card>
				<template #title>
					<div style="display: flex; align-items: center; justify-content: space-between;">
						<span>Follow-up</span>
					</div>
				</template>

				<template #content>
					<BlockUI :blocked="loading" fullScreen></BlockUI>
					<ProgressSpinner 
						v-show="loading" 
						class="overlay" 
						:pt="{
							spinner: { style: {width: '10rem', height: '10rem' } },
							circle: { style: { stroke: '#F59E0B', strokeWidth: 1, animation: 'none', width: '20px !important', height: '2rem'} }
						}"
					/>
					<div style="display: flex; align-items: center; justify-content: space-between;">
						<div class="view-card">
							<div class="view-section">
								<div class="view-label">View</div>
								<div class="separator"></div>

								<RadioButton v-model="messageType" inputId="ingredient1" name="pizza" value="All" />
								<label for="ingredient1" class="ml-2">All</label>

								<RadioButton class="ml-5" v-model="messageType" inputId="ingredient1" name="pizza" value="New Policy" />
								<label for="ingredient1" class="ml-2">New policies</label>

								<RadioButton class="ml-5" v-model="messageType" inputId="ingredient1" name="pizza" value="Cancel Policy" />
								<label for="ingredient1" class="ml-2">Cancel policies</label>

								<RadioButton class="ml-5" v-model="messageType" inputId="ingredient1" name="pizza" value="Late Payment" />
								<label for="ingredient1" class="ml-2">Late payments</label>

								<RadioButton class="ml-5" v-model="messageType" inputId="ingredient1" name="pizza" value="Change Details" />
								<label for="ingredient1" class="ml-2">Changed details</label>
							</div>
						</div>
					</div>
					<br>
					<table class="table">
						<thead>
							<tr>
								<th>Date</th>
								<th>User</th>
								<th>Product</th>
								<th>Type</th>
								<th>Case Worker</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in filteredData" :key="index">
								<td>{{ item.date }}</td>
								<td>{{ item.user }}</td>
								<td>{{ item.product }}</td>
								<td>{{ item.type }}</td>
								<td>{{ item.case_worker }}</td>
								<td>{{ item.status }}</td>
							</tr>
						</tbody>
					</table>
				</template>
			</Card>
		</div>
	</div>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table tr:hover {
  background-color: #e4b82a54;
}
</style>
