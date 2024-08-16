<template>
  <div class="p-grid">
    <div class="p-col-12">
      <Card>
        <template #title>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>Follow-up</span>
            <Button
              label="Edit"
              icon="pi pi-pencil" 
              class="mr-2" 
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
            <Column field="date" header="Date" sortable />
            <Column field="user" header="User" sortable />
            <Column field="product" header="Product" sortable />
            <Column field="type" header="Type" sortable />
            <Column field="case_worker" header="Agent" sortable />
            <Column field="title" header="Title" sortable />
            <Column field="body" header="Body" sortable />

            <template #body="slotProps">
              <tr @dblclick="selectRow(slotProps.index)" :class="{'selected-row': selectedRow.value === slotProps.index}">
                <td>{{ slotProps.data.date }}</td>
                <td>{{ slotProps.data.user }}</td>
                <td>{{ slotProps.data.product }}</td>
                <td>{{ slotProps.data.type }}</td>
                <td>{{ slotProps.data.case_worker }}</td>
                <td>{{ slotProps.data.status }}</td>
              </tr>
            </template>
          </DataTable>
          <Dialog :dismissableMask="true" v-model:visible="editDialog" :style="{width: '450px'}" header="Edit Follow-up" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="date" class="bold-label">Date</label>
                           <InputText id="name" v-model.trim="selectedRow.date" required="true" autofocus :class="{'p-invalid': saved && !selectedRow.date}" disabled/>
                           <small class="p-error" v-if="saved && !selectedRow.date">Date is required.</small>
                        </div>
                        <div class="field col-12">
                           <label for="user" class="bold-label">User</label>
                           <InputText id="name" v-model.trim="selectedRow.user" required="true" autofocus :class="{'p-invalid': saved && !selectedRow.user}" disabled/>
                           <small class="p-error" v-if="saved && !selectedRow.user">User is required.</small>
                     </div>
                     <div class="field col-12">
                           <label for="product" class="bold-label">Product</label>
                           <InputText id="name" v-model.trim="selectedRow.product" required="true" autofocus :class="{'p-invalid': saved && !selectedRow.product}" disabled/>
                           <small class="p-error" v-if="saved && !selectedRow.product">Product is required.</small>
                     </div>
                     <div class="field col-12">
                           <label for="type" class="bold-label">Type</label>
                           <InputText id="name" v-model.trim="selectedRow.type" required="true" autofocus :class="{'p-invalid': saved && !selectedRow.type}" disabled/>
                           <small class="p-error" v-if="saved && !selectedRow.type">Type is required.</small>
                     </div>
                     <div class="field col-12">
                      <label for="case_worker" class="bold-label">Agent</label>
                           <Dropdown 
                              v-model="selectedRow.case_worker"
                              :options="[
                                { label: 'Harris Trout', value: 'Harris Trout' },
                                { label: 'Craig Snoden', value: 'Craig Snoden' },
                                { label: 'Chad Clever', value: 'Chad Clever' }
                              ]"
                              optionLabel="label"
                              optionValue="value"
                              required="true"
                              :class="{'p-invalid': saved && !selectedRow.status}" 
                           />

                           <small class="p-error" v-if="saved && !selectedRow.case_worker">Agent is required.</small>
                     </div>
                     <div class="field col-12">
                           <label for="status" class="bold-label">Status</label>
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
                           <label for="type" class="bold-label">Title</label>
                           <InputText id="name" v-model.trim="selectedRow.title" required="true" autofocus :class="{'p-invalid': saved && !selectedRow.type}"/>
                           <!-- <small class="p-error" v-if="saved && !selectedRow.type">Type is required.</small> -->
                     </div>
                     <div class="field col-12">
                           <label for="type" class="bold-label">Body</label>
                           <Textarea style="height: 200px;" id="body" v-model.trim="selectedRow.body" required="true" autofocus :class="{'p-invalid': saved && !selectedNews.content}" />
                           <!-- <small class="p-error" v-if="saved && !selectedRow.type">Type is required.</small> -->
                     </div>
                     </div>
                     
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                        <Button label="Save" icon="pi pi-check" text @click="handleUpdateRow" />
                     </template>
               </Dialog>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getFollowUp } from '../api/followUp';

const messageType = ref("All");
const selectedRow = ref(null);
const selectRowDialog = ref(false);
const selectRowTitle = ref(false);
const newDialog = ref(false);
const editDialog = ref(false);
const saved = ref(false);
const spinner = ref(false);
//const data = ref([]);
// const data2 = ref([
//     {
//         "date": "2024/07/05",
//         "user": "Burton Guster",
//         "product": "Funeral Cover",
//         "type": "Late Payment",
//         "case_worker": "Harris Trout",
//         "status": "Open",
//         "title" : "title",
//         "body" : "body"
//     },
//     {
//         "date": "2024/07/04",
//         "user": "Carlton Lassiter",
//         "product": "Accisure",
//         "type": "New Policy",
//         "case_worker": "Craig Snoden",
//         "status": "Open",
//         "title" : "title",
//         "body" : "body"
//     },
//     {
//         "date": "2024/06/23",
//         "user": "Juliette Ohara",
//         "product": "RSI Car Rental",
//         "type": "Cancel Policy",
//         "case_worker": "Chad Clever",
//         "status": "In Progress",
//         "title" : "title",
//         "body" : "body"
//     },
//     {
//         "date": "2024/06/12",
//         "user": "Henry Spencer",
//         "product": "RSI Car Rental",
//         "type": "New Policy",
//         "case_worker": "Craig Snoden",
//         "status": "In Progress",
//         "title" : "title",
//         "body" : "body"
//     },
//     {
//         "date": "2024/05/22",
//         "user": "Karen Vick",
//         "product": "Family Cover",
//         "type": "Change Details",
//         "case_worker": "Harris Trout",
//         "status": "Closed",
//         "title" : "title",
//         "body" : "body"
//     },
//     {
//         "date": "2024/05/22",
//         "user": "Marlene Louw",
//         "product": "Funeral Cover",
//         "type": "Cancel Policy",
//         "case_worker": "Chad Clever",
//         "status": "Closed",
//         "title" : "title",
//         "body" : "body"
//     }
// ]);



const data = [
    {
        "date": "2024/07/05",
        "user": "Burton Guster",
        "product": "Funeral Cover",
        "type": "Late Payment",
        "case_worker": "Harris Trout",
        "status": "Open",
        "title" : "title",
        "body" : "body"
    },
    {
        "date": "2024/07/04",
        "user": "Carlton Lassiter",
        "product": "Accisure",
        "type": "New Policy",
        "case_worker": "Craig Snoden",
        "status": "Open",
        "title" : "title",
        "body" : "body"
    },
    {
        "date": "2024/06/23",
        "user": "Juliette Ohara",
        "product": "RSI Car Rental",
        "type": "Cancel Policy",
        "case_worker": "Chad Clever",
        "status": "In Progress",
        "title" : "title",
        "body" : "body"
    },
    {
        "date": "2024/06/12",
        "user": "Henry Spencer",
        "product": "RSI Car Rental",
        "type": "New Policy",
        "case_worker": "Craig Snoden",
        "status": "In Progress",
        "title" : "title",
        "body" : "body"
    },
    {
        "date": "2024/05/22",
        "user": "Karen Vick",
        "product": "Family Cover",
        "type": "Change Details",
        "case_worker": "Harris Trout",
        "status": "Closed",
        "title" : "title",
        "body" : "body"
    },
    {
        "date": "2024/05/22",
        "user": "Marlene Louw",
        "product": "Funeral Cover",
        "type": "Cancel Policy",
        "case_worker": "Chad Clever",
        "status": "Closed",
        "title" : "title",
        "body" : "body"
    }
];

const currentPage = ref(1);
const rowsPerPage = ref(5);

const fetchData = async () => {
  try{
    const response = await getFollowUp();

    console.log("response", response);
    //data.value = response;

  }catch(error){
    console.log("what did the fox say");
    console.error("Error in fetching data:", error);
  } 
}

onMounted(() => {
    console.log("mounting")
    fetchData();
});

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
         selectedRow.value.date &&
         selectedRow.value.user &&
         selectedRow.value.product &&
         selectedRow.value.type &&
         selectedRow.value.case_worker &&
         selectedRow.value.status &&
         selectedRow.value.title &&
         selectedRow.value.body

      if (isRowValid) {
         try {
            await updateRow(selectedRow.value.sid,{      
               date: selectedRow.value.date,
               user: selectedRow.value.user,
               product: selectedRow.value.product,
               type: selectedRow.value.type,
               case_worker: selectedRow.value.case_worker,
               status: selectedRow.value.status,
               title: selectedRow.value.title,
               body: selectedRow.value.body
            });
            const data = getFollowUp();
            products.value = data;
         } 
         catch (error) {
            console.error("Error in updating row:", error);
         } 
         finally {
            spinner.value = false;
            editDialog.value = false;
            saved.value = false
            selectedRow.value = null;
         }
      }
      else {
         spinner.value = false;
      }
   }

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
