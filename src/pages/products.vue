<script setup>
   import { ref, onMounted, watch } from 'vue';
   import { getProducts, updateProducts, addProduct, deleteCover } from '../api/products';
   import { todayDate } from "../utilities/common"
   import { useConfirm } from "primevue/useconfirm";


   const confirm = useConfirm();

   const products = ref(null);
   const selectedProduct = ref(null);
   const addedCovers = ref([]);
   const removedCovers = ref([]);
   const newDialog = ref(false);
   const editDialog = ref(false);
   const saved = ref(false);
   const spinner = ref(false);

   const newProduct = ref({
      client_id: null,
      name: '',
      short_description: '',
      long_description: null,
      administration_fee: 0,
      covers: []
   })

   const blankNewProduct = () => ({
      client_id: null,
      name: '',
      short_description: '',
      long_description: null,
      administration_fee: 0,
      covers: []
   });

   const addNewCover = () => {
      newProduct.value.covers.push({ premium: 0, cover: 0, max_entry_age: null, underwriter: '' });
   }

   const addExtraCover = () => {
      selectedProduct.value.covers.push({ cover_sid: 0, premium: 0, cover: 0, max_entry_age: null, underwriter: '' });
   }

   const removeCover = (index) => {
      newProduct.value.covers.splice(index, 1);
   }

   const handleDeleteCover = (index, sid) => {
      console.log(sid)
      if (sid === 0){
         selectedProduct.value.covers.splice(index, 1);
      }
      else {
         confirm.require({
            message: 'This is an existing cover. Are you sure you want to delete it?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                  selectedProduct.value.covers.splice(index, 1);
                  try{
                     deleteCover(sid)
                  }
                  catch (error) {
                     console.error("Error in adding product:", error);
                  } 
               },
            reject: () => {
            }
         });
      }
      
   }

   const addNewProduct = async () => {
      saved.value = true;
      const isProductValid = 
         newProduct.value.name &&
         newProduct.value.short_description &&
         newProduct.value.long_description &&
         newProduct.value.administration_fee &&
         newProduct.value.covers.length

      if (isProductValid) {
         try {
            await addProduct({
               client_id: newProduct.value.client_id,
               name: newProduct.value.name,
               short_description: newProduct.value.short_description,
               long_description: newProduct.value.long_description,
               administration_fee: newProduct.value.administration_fee,
               covers: newProduct.value.covers,
               date: todayDate()
            });
            
         } 
         catch (error) {
            console.error("Error in adding product:", error);
         } 
         finally {
            const data = await getProducts();
            products.value = data;
            spinner.value = false;
            newDialog.value = false;
            saved.value = false
            newProduct.value = blankNewProduct();
         }
      }
      else {
         spinner.value = false;
      }
   }


   const handleUpdatePolicy = async () => {
      saved.value = true;
      const isProductValid = 
         selectedProduct.value.name &&
         selectedProduct.value.short_description &&
         selectedProduct.value.long_description &&
         selectedProduct.value.administration_fee &&
         selectedProduct.value.covers.length

      if (isProductValid) {
         try {
            await updateProducts(selectedProduct.value.sid,{      
               client_id: selectedProduct.value.client_id,
               name: selectedProduct.value.name,
               short_description: selectedProduct.value.short_description,
               long_description: selectedProduct.value.long_description,
               administration_fee: selectedProduct.value.administration_fee,
               covers: selectedProduct.value.covers,
            });
            // const data = getProducts();
            // products.value = data;
         } 
         catch (error) {
            console.error("Error in adding product:", error);
         } 
         finally {
            spinner.value = false;
            editDialog.value = false;
            saved.value = false
            selectedProduct.value = null;
         }
      }
      else {
         spinner.value = false;
      }
   }

   watch(newProduct.value.covers, (newValue, oldValue) => {
      console.log("Product looks like:", newValue);
   });

   onMounted(() => {
      getProducts().then((data) => {
        products.value = data;
      });
   });

   const editUser = (data) => {
      selectedProduct.value = {...data};
      editDialog.value = true;
   };

</script>

<template>
	<div class="p-grid">
		<div class="p-col-12">
			<Card>
            <template #title>
               <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>Products</span>
                  <Button 
                     label="New Product" 
                     icon="pi pi-plus" 
                     severity="info" 
                     @click="newDialog=true"
                  />
               </div>
            </template>
               <template #content>
                  <DataTable 
                     :value="products"
                     paginator :rows="5" 
                     :rowsPerPageOptions="[5, 10, 20, 50]"
                     tableStyle="min-width: 50rem"
                  >
                     <Column field="name" header="Name"></Column>
                     <Column field="long_description" header="Description"></Column>
                     <Column style="min-width:8rem" field="date_created" header="Date Created"></Column>

                     <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                           <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editUser(slotProps.data)" />
                           <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                     </Column>
                  </DataTable>

                  <Dialog :dismissableMask="true" v-model:visible="editDialog" :style="{width: '670px'}" header="Product Details" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col-6">
                           <label for="client_id" class="bold-label">Client Internal Reference</label>
                           <InputText 
                              id="name" 
                              v-model.trim="selectedProduct.client_id"
                           />
                           <!-- <small class="p-error" v-if="saved && !selectedProduct.client_id">Client Internal Reference is required.</small> -->
                        </div>
                     </div>
                     <div class="formgrid grid">
                        <div class="field col-10">
                           <label for="name" class="bold-label">Name</label>
                           <InputText id="name" v-model.trim="selectedProduct.name" required="true" autofocus :class="{'p-invalid': saved && !selectedProduct.name}" />
                           <small class="p-error" v-if="saved && !selectedProduct.name">Name is required</small>
                        </div>
                     </div>
                     <div class="formgrid grid">
                        <div class="field col-10">
                           <label for="name" class="bold-label">Short Description</label>
                           <InputText id="name" v-model.trim="selectedProduct.short_description" required="true" autofocus :class="{'p-invalid': saved && !selectedProduct.short_description}" />
                           <small class="p-error" v-if="saved && !selectedProduct.short_description">A Short Description is required</small>
                        </div>
                     </div>
                     <div class="formgrid grid">
                        <div class="field col-10">
                           <label for="message" class="bold-label"> Long Description </label>
                           <Textarea style="height: 200px;" id="message" v-model.trim="selectedProduct.long_description" required="true" autofocus :class="{'p-invalid': saved && !selectedProduct.long_description}" />
                           <small class="p-error" v-if="saved && !selectedProduct.long_description">A Long Description is required.</small>
                        </div>
                     </div>
                     <div class="formgrid grid">
                        <div class="field col-4">
                           <label 
                              for="currency-us" 
                              class="font-bold block mb-2"
                           > 
                              Administration Fee 
                           </label>
                           <InputNumber 
                              autofocus 
                              currency="ZAR" 
                              locale="en-ZA"
                              required="true" 
                              mode="currency" 
                              inputId="currency-zar" 
                              v-model="selectedProduct.administration_fee" 
                              :class="{'p-invalid': saved && !selectedProduct.administration_fee}" 
                           />
                           <small class="p-error" v-if="saved && !selectedProduct.administration_fee">Administration Fee is required</small>
                        </div>
                     </div>
                     <div class="formgrid grid">
                        <div class="field col-4 pt-4">
                           <Button 
                              label="Add New Cover" 
                              severity="secondary" 
                              raised 
                              @click="addExtraCover"
                           />      
                        </div>
                        <small 
                           class="p-error pt-5 pl-3" 
                           v-if="saved && !newProduct.covers.length"
                        >
                           At least 1 cover is required
                        </small>
                     </div>              
                     <div class="formgrid grid" v-for="(cover, index) in selectedProduct.covers" :key="index">
                        <div class="col-2 pb-2">
                           <label for="currency-us" v-if="index === 0" class="font-bold block mb-2"> Cover </label>
                           <InputNumber 
                              autofocus 
                              currency="ZAR" 
                              locale="en-ZA"
                              required="true" 
                              mode="currency" 
                              inputId="currency-zar" 
                              v-model="cover.cover" 
                              :class="{'p-invalid': saved && !cover.cover}"  
                           />
                           <small class="p-error" v-if="saved && !cover.cover">Cover is required</small>
                        </div>
                        <div class="col-3">
                           <label for="currency-us" v-if="index === 0" class="font-bold block mb-2"> Underwriter </label>
                           <InputText 
                              autofocus 
                              :class="{'p-invalid': saved && !cover.underwriter}"  
                              v-model="cover.underwriter" 
                           />
                           <small class="p-error" v-if="saved && !cover.underwriter">Underwriter is required</small>
                        </div>
                        <div class="col-2">
                           <label for="currency-us" v-if="index === 0" class="font-bold block mb-2"> 
                              Premium 
                           </label>
                           <InputNumber 
                              autofocus 
                              currency="ZAR" 
                              locale="en-ZA"
                              required="true" 
                              mode="currency" 
                              inputId="currency-zar" 
                              v-model="cover.premium" 
                              :class="{'p-invalid': saved && !cover.premium}" 
                           />
                           <small class="p-error" v-if="saved && !cover.premium">Premium is required</small>
                        </div>

                        <div class="col-3">
                           <label for="currency-us" v-if="index === 0" class="font-bold block mb-2"> Max entry age </label>
                           <InputNumber 
                              autofocus 
                              required="true" 
                              inputId="integeronly" 
                              v-model="cover.max_entry_age" 
                              :class="{'p-invalid': saved && !cover.max_entry_age}"  
                           />
                           <small class="p-error" v-if="saved && !cover.max_entry_age">Max entry age is required</small>
                        </div>

                        
                        <div :class="index === 0 ? 'col-1 pt-5' : 'col-1'">
                           <Button icon="pi pi-times" @click="handleDeleteCover(index, cover.cover_sid)" severity="danger" text rounded aria-label="Cancel" />
                        </div>
                     </div>  
                     <ConfirmDialog></ConfirmDialog>                
                     
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                        <Button label="Save" icon="pi pi-check" text @click="handleUpdatePolicy" />
                     </template>
               </Dialog>


               <Dialog :dismissableMask="true" v-model:visible="newDialog" :style="{width: '670px'}" header="Product Details" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col-4">
                           <label for="client_id" class="bold-label">Client Internal Reference</label>
                           <InputText 
                              id="name" 
                              v-model.trim="newProduct.client_id" 
                           />
                           <!-- <small class="p-error" v-if="saved && !newProduct.client_id">Client Internal Reference is required.</small> -->
                        </div>
                     </div>
                     <div class="formgrid grid">
                        <div class="field col-10">
                           <label for="name" class="bold-label">Name</label>
                           <InputText id="name" v-model.trim="newProduct.name" required="true" autofocus :class="{'p-invalid': saved && !newProduct.name}" />
                           <small class="p-error" v-if="saved && !newProduct.name">Name is required</small>
                        </div>
                     </div>
                     <div class="formgrid grid">
                        <div class="field col-10">
                           <label for="name" class="bold-label">Short Description</label>
                           <InputText id="name" v-model.trim="newProduct.short_description" required="true" autofocus :class="{'p-invalid': saved && !newProduct.short_description}" />
                           <small class="p-error" v-if="saved && !newProduct.short_description">A Short Description is required</small>
                        </div>
                     </div>
                     <div class="formgrid grid">
                        <div class="field col-10">
                           <label for="message" class="bold-label"> Long Description </label>
                           <Textarea style="height: 200px;" id="message" v-model.trim="newProduct.long_description" required="true" autofocus :class="{'p-invalid': saved && !newProduct.long_description}" />
                           <small class="p-error" v-if="saved && !newProduct.long_description">A Long Description is required.</small>
                        </div>
                     </div>
                     <div class="formgrid grid">
                        <div class="field col-4">
                           <label 
                              for="currency-us" 
                              class="font-bold block mb-2"
                           > 
                              Administration Fee 
                           </label>
                           <InputNumber 
                              autofocus 
                              currency="ZAR" 
                              locale="en-ZA"
                              required="true" 
                              mode="currency" 
                              inputId="currency-zar" 
                              v-model="newProduct.administration_fee" 
                              :class="{'p-invalid': saved && !newProduct.administration_fee}" 
                           />
                           <small class="p-error" v-if="saved && !newProduct.administration_fee">Administration Fee is required</small>
                        </div>
                     </div>
                     <div class="formgrid grid">
                        <div class="field col-4 pt-4">
                           <Button 
                              label="Add New Cover" 
                              severity="secondary" 
                              raised 
                              @click="addNewCover"
                           />      
                        </div>
                        <small 
                           class="p-error pt-5 pl-3" 
                           v-if="saved && !newProduct.covers.length"
                        >
                           At least 1 cover is required
                        </small>
                     </div>              
                     <div 
                        class="formgrid grid" 
                        v-for="(cover, index) in newProduct.covers" 
                        :key="index"
                     >
                        <div class="col-2 pb-2">
                           <label 
                              for="currency-us" 
                              v-if="index === 0" 
                              class="font-bold block mb-2"
                           > 
                              Premium 
                           </label>
                           <InputNumber 
                              autofocus 
                              currency="ZAR" 
                              locale="en-ZA"
                              required="true" 
                              mode="currency" 
                              inputId="currency-zar" 
                              v-model="cover.premium" 
                              :class="{'p-invalid': saved && !cover.premium}" 
                           />
                           <small class="p-error" v-if="saved && !cover.premium">Premium is required</small>
                        </div>
                        <div class="col-2">
                           <label for="currency-us" v-if="index === 0" class="font-bold block mb-2"> Cover </label>
                           <InputNumber 
                              autofocus 
                              currency="ZAR" 
                              locale="en-ZA"
                              required="true" 
                              mode="currency" 
                              inputId="currency-zar" 
                              v-model="cover.cover" 
                              :class="{'p-invalid': saved && !cover.cover}"  
                           />
                           <small class="p-error" v-if="saved && !cover.cover">Cover is required</small>
                        </div>
                        <div class="col-3">
                           <label for="currency-us" v-if="index === 0" class="font-bold block mb-2"> Max entry age </label>
                           <InputNumber 
                              autofocus 
                              required="true" 
                              inputId="integeronly" 
                              v-model="cover.max_entry_age" 
                              :class="{'p-invalid': saved && !cover.max_entry_age}"  
                           />
                           <small class="p-error" v-if="saved && !cover.max_entry_age">Max entry age is required</small>
                        </div>
                        <div class="col-3">
                           <label for="currency-us" v-if="index === 0" class="font-bold block mb-2"> Underwriter </label>
                           <InputText 
                              autofocus 
                              :class="{'p-invalid': saved && !cover.underwriter}"  
                              v-model="cover.underwriter" 
                           />
                           <small class="p-error" v-if="saved && !cover.underwriter">Underwriter is required</small>
                        </div>
                        
                        <div :class="index === 0 ? 'col-1 pt-5' : 'col-1'">
                           <Button icon="pi pi-times" @click="removeCover(index)" severity="danger" text rounded aria-label="Cancel" />
                        </div>
                     </div>                  
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                        <Button label="Save" icon="pi pi-check" text @click="addNewProduct" />
                     </template>
               </Dialog>
               </template>
         </Card>
		</div>
	</div>
</template>

