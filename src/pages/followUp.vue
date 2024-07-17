<script setup>
import { ref, computed } from 'vue';
import { getNotifications, getNotificationTemplates, sendNotification } from '../api/notifications';
import { applyFilters } from '../api/filters';
import { getProducts } from '../api/products';
import { todayDate, addDays } from "../utilities/common";
import { getMobileUsers } from '../api/mobileAppUsers';

const messageType = ref("All");
const selectedRow = ref(null);
const selectRowDialog = ref(false);
const selectRowTitle = ref(false);

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

const currentPage = ref(1);
const rowsPerPage = ref(5);

const filteredData = computed(() => {
    if (messageType.value === "All") {
        return data;
    } else {
        return data.filter(item => item.type === messageType.value);
    }
});

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return filteredData.value.slice(start, end);
});

const totalRecords = computed(() => filteredData.value.length);

function onPageChange(event) {
    currentPage.value = event.page + 1;
    rowsPerPage.value = event.rows;
}

function selectRow(index) {
    if (selectedRow.value === index) {
        selectedRow.value = null;
    } else {
        selectedRow.value = index; 
    }
}

function deselectRow(event) {
    const isClickedOutside = !event.target.closest('.table-row'); // Check if clicked outside any table row
    if (isClickedOutside) {
        selectedRow.value = null; // Deselect the row
    }
}


function editRow() {
    if (selectedRow.value !== null) {
        // Implement your edit logic here
        alert(`Editing row: ${JSON.stringify(paginatedData.value[selectedRow.value])}`);
    }
}

</script>

<template>
  <div class="p-grid">
    <div class="p-col-12">
      <Card>
        <template #title>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>Follow-up</span>
            <Button 
              icon="pi pi-pencil" 
              outlined 
              rounded 
              class="mr-2" 
              :disabled="selectedRow === null"  
              @click="editRow"
            />
          </div>
        </template>
        <template #content>
          <BlockUI :blocked="loading" fullScreen></BlockUI>
          <ProgressSpinner 
            v-show="loading" 
            class="overlay" 
            :pt="{
              spinner: { style: { width: '10rem', height: '10rem' } },
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
                <RadioButton class="ml-5" v-model="messageType" inputId="ingredient2" name="pizza" value="New Policy" />
                <label for="ingredient2" class="ml-2">New policies</label>
                <RadioButton class="ml-5" v-model="messageType" inputId="ingredient3" name="pizza" value="Cancel Policy" />
                <label for="ingredient3" class="ml-2">Cancel policies</label>
                <RadioButton class="ml-5" v-model="messageType" inputId="ingredient4" name="pizza" value="Late Payment" />
                <label for="ingredient4" class="ml-2">Late payments</label>
                <RadioButton class="ml-5" v-model="messageType" inputId="ingredient5" name="pizza" value="Change Details" />
                <label for="ingredient5" class="ml-2">Changed details</label>
              </div>
            </div>
          </div>
          <br>
          <DataTable 
            :value="filteredData" 
            :paginator="true" 
            :rows="rowsPerPage" 
            :rowsPerPageOptions="[5, 10, 20]" 
            :totalRecords="totalRecords" 
            @page="onPageChange"
          >
            <Column field="date" header="Date" sortable />
            <Column field="user" header="User" sortable />
            <Column field="product" header="Product" sortable />
            <Column field="type" header="Type" sortable />
            <Column field="case_worker" header="Case Worker" sortable />
            <Column field="status" header="Status" sortable />
            <template #body="slotProps">
              <tr @dblclick="selectRow(slotProps.index)" :class="{'selected-row': selectedRow === slotProps.index}">
                <td>{{ slotProps.data.date }}</td>
                <td>{{ slotProps.data.user }}</td>
                <td>{{ slotProps.data.product }}</td>
                <td>{{ slotProps.data.type }}</td>
                <td>{{ slotProps.data.case_worker }}</td>
                <td>{{ slotProps.data.status }}</td>
              </tr>
            </template>
          </DataTable>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>

.table {
    display: table;
    width: 100%;
    border-collapse: collapse;
}

.table-row {
    display: table-row;
}

.table-cell {
    display: table-cell;
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.table-header {
    background-color: #f2f2f2;
    font-weight: bold;
}

.table-row:hover {
    background-color: #f2f2f2;
}

.selected-row {
    background-color: rgba(173, 216, 230, 0.5); 
}

.paginator {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}
.view-card {
    width: 100%;
}

.view-section {
    display: flex;
    align-items: center;
}

.view-label {
    margin-right: 1rem;
    font-weight: bold;
}

.separator {
    margin: 0 1rem;
    border-right: 1px solid #ccc;
    height: 1.5rem;
}

.radio-group {
    display: flex;
    align-items: center;
    margin-right: 2rem;
}

.radio-group label {
    margin-left: 0.5rem;
    white-space: nowrap;
}
</style>
