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
}

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
                  <div class="table">
                      <div class="table-row table-header">
                          <div class="table-cell">Date</div>
                          <div class="table-cell">User</div>
                          <div class="table-cell">Product</div>
                          <div class="table-cell">Type</div>
                          <div class="table-cell">Case Worker</div>
                          <div class="table-cell">Status</div>
                      </div>
                      <div v-for="(item, index) in paginatedData" :key="index" class="table-row">
                          <div class="table-cell">{{ item.date }}</div>
                          <div class="table-cell">{{ item.user }}</div>
                          <div class="table-cell">{{ item.product }}</div>
                          <div class="table-cell">{{ item.type }}</div>
                          <div class="table-cell">{{ item.case_worker }}</div>
                          <div class="table-cell">{{ item.status }}</div>
                      </div>
                  </div>
                  <Paginator 
                      :rows="rowsPerPage" 
                      :totalRecords="totalRecords" 
                      @page="onPageChange" 
                      :currentPageReportTemplate="`Showing ${currentPage.value} to ${currentPage.value + rowsPerPage.value - 1} of ${totalRecords.value} entries`"
                  />
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
    background-color: #ffdd6d5e;
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
