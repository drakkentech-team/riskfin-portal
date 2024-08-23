<template>
  <div class="p-grid">
    <div class="p-col-12">
      <Card>
        <template #title>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>Follow-up</span>
            <Button
              icon="pi pi-pencil" 
              outlined rounded class="mr-2"
              :disabled="selectedRow === null"  
              @click="editRow(selectedRow)"
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
            tableStyle="min-width: 50rem"
            v-model:selection="selectedRow"
            selectionMode="single" 
            :totalRecords="totalRecords" 
            @page="onPageChange"
            @rowSelect="onRowSelect"
            v-on:dblclick="selectedRow"
          >
            <Column field="event_date" header="Date" sortable />
            <Column field="app_user" header="User" sortable />
            <Column field="policy" header="Policy" sortable />
            <Column field="action" header="Type" sortable />
            <Column field="agent" header="Agent" sortable />
            <Column field="status" header="Status" sortable />

            <template #body="slotProps">
              <tr @dblclick="selectRow(slotProps.index)" :class="{'selected-row': selectedRow.value === slotProps.index}">
                <td>{{ slotProps.data.event_date}}</td>
                <td>{{ slotProps.data.app_user }}</td>
                <td>{{ slotProps.data.policy }}</td>
                <td>{{ slotProps.data.action }}</td>
                <td>{{ slotProps.data.agent }}</td>
                <td>{{ slotProps.data.status }}</td>
              </tr>
            </template>
          </DataTable>
          <Dialog :dismissableMask="true" v-model:visible="editDialog" :style="{width: '450px'}" header="Edit Follow-up" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="event_date" class="bold-labels">Date</label>
                           <InputText id="name" v-model.trim="selectedRow.event_date" required="true" autofocus :class="{'p-invalid': saved && !selectedRow.event_date}" disabled/>
                           <small class="p-error" v-if="saved && !selectedRow.event_date">Date is required.</small>
                        </div>
                        <div class="field col-12">
                           <label for="app_user" class="bold-labels">User</label>
                           <InputText id="name" v-model.trim="selectedRow.app_user" required="true" autofocus :class="{'p-invalid': saved && !selectedRow.app_user}" disabled/>
                           <small class="p-error" v-if="saved && !selectedRow.app_user">User is required.</small>
                     </div>
                     <div class="field col-12">
                           <label for="policy" class="bold-labels">Policy</label>
                           <InputText id="name" v-model.trim="selectedRow.policy" required="true" autofocus :class="{'p-invalid': saved && !selectedRow.policy}" disabled/>
                           <small class="p-error" v-if="saved && !selectedRow.policy">Product is required.</small>
                     </div>
                     <div class="field col-12">
                           <label for="action" class="bold-labels">Type</label>
                           <InputText id="name" v-model.trim="selectedRow.action" required="true" autofocus :class="{'p-invalid': saved && !selectedRow.action}" disabled/>
                           <small class="p-error" v-if="saved && !selectedRow.action">Type is required.</small>
                     </div>
                     <div class="field col-12">
                      <label for="agent" class="bold-labels">Agent</label>
                           <Dropdown 
                              v-model="selectedRow.agent"
                              :options="[
                                { label: 'Liam Marshell', value: 'Liam Marshell' },
                                { label: 'Cindy Reid', value: 'Cindy Reid' },
                                { label: 'Jason Van Wyk', value: 'Jason Van Wyk' },
                                { label: 'Joshua Davids', value: 'Joshua Davids' },
                              ]"
                              optionLabel="label"
                              optionValue="value"
                              required="true"
                              :class="{'p-invalid': saved && !selectedRow.agent}"  
                           />

                           <small class="p-error" v-if="saved && !selectedRow.agent">Agent is required.</small>
                     </div>
                     <div class="field col-12">
                           <label for="status" class="bold-labels">Status</label>
                           <Dropdown 
                              v-model="selectedRow.status"
                              :options="[
                                { label: 'Open', value: 'Open' },
                                { label: 'In Progress', value: 'In Progress' },
                                { label: 'Closed', value: 'Closed' }
                              ]"
                              optionLabel="label"
                              optionValue="value"
                              required="true"
                              :class="{'p-invalid': saved && !selectedRow.status}" 
                           />                           
                           <small class="p-error" v-if="saved && !selectedRow.status">Status is required.</small>
                     </div>
                     <div class="field col-12">
                           <label for="type" class="bold-labels">Title</label>
                           <InputText id="name" v-model.trim="selectedRow.title"  autofocus :class="{'p-invalid': saved && !selectedRow.title}"/>
                           <!-- <small class="p-error" v-if="saved && !selectedRow.type">Type is required.</small> -->
                     </div>
                     <div class="field col-12">
                           <label for="type" class="bold-labels">Body</label>
                           <Textarea style="height: 200px;" id="body" v-model.trim="selectedRow.body"  autofocus :class="{'p-invalid': saved && !selectedRow.body}" />
                           <!-- <small class="p-error" v-if="saved && !selectedRow.type">Type is required.</small> -->
                     </div>
                     </div>
                     
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                        <Button label="Save" icon="pi pi-check" text @click="handleUpdateRow"/>
                     </template>
               </Dialog>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getFollowUp, updateFollowUp } from '../api/followUp';

const messageType = ref("All");
const selectedRow = ref(null);
const selectRowDialog = ref(false);
const selectRowTitle = ref(false);
const newDialog = ref(false);
const editDialog = ref(false);
const saved = ref(false);
const spinner = ref(false);
const currentPage = ref(1);
const rowsPerPage = ref(5);
const data = ref([]);

const fetchData = async () => {
  try {
    const response = await getFollowUp();
    data.value = response; 
  } catch (error) {
    console.error("Error in fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});


const filteredData = computed(() => {
  if (messageType.value === "All") {
    return data.value;
  } else {
    return data.value.filter(item => item.action === messageType.value);
  }
});

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return filteredData.value.slice(start, end);
});

const totalRecords = computed(() => filteredData.value.length);

const onPageChange = (event)  => {
    currentPage.value = event.page + 1;
    rowsPerPage.value = event.rows;
}

const selectRow = (index) => {
  if (!selectedRow.value === index) {
      selectedRow.value = null;
  } else {
      selectedRow.value = index; 
  }
}

const onRowSelect = () => {
      selectRowDialog.value = true
      selectRowTitle.value = "Title: " + selectedRow.value.title
   }

const editRow = (data) => {
    selectedRow.value = {...data};
    editDialog.value = true;
}


const handleUpdateRow = async () => {
  saved.value = true;
  const isRowValid =
    selectedRow.value.event_date &&
    selectedRow.value.app_user &&
    selectedRow.value.policy &&
    selectedRow.value.action &&
    selectedRow.value.agent &&
    selectedRow.value.status;
    selectedRow.value.title &&
    selectedRow.value.body;

  if (isRowValid) {
    try {
      delete selectedRow.value.event_date
      await updateFollowUp(selectedRow.value.sid, {
        event_date: selectedRow.value.event_date,
        app_user: selectedRow.value.app_user,
        policy: selectedRow.value.policy,
        action: selectedRow.value.action,
        agent : selectedRow.value.agent,
        status: selectedRow.value.status,
        sid: selectedRow.value.sid,
        title: selectedRow.value.title,
        body: selectedRow.value.body,
        
      });
      fetchData();
    } catch (error) {
      console.error("Error in updating row:", error);
    } finally {
      spinner.value = false;
      editDialog.value = false;
      saved.value = false;
      selectedRow.value = null;
    }
  } else {
    spinner.value = false;
  }
};


const closeDialog = () => {
    editDialog.value = false;
    saved.value = false;
   };

</script>

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
