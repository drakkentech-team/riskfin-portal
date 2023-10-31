import { provide, ref } from "vue";
import { useStore } from "vuex";

export default (await import('vue')).defineComponent({
components: {
Modal,
},
name: 'FuneralPlanRegistration',
setup() {
const store = useStore();

const firstNames: ref; ('');
const formData = {
// firstNames: ref(''),
email: ref(''),
contactPhoneNumber: ref(''),
surname: ref(''),
idNumber: ref(''),
};

const submitForm = () => {
const userData = {
firstNames: formData.firstNames.value,
email: formData.email.value,
contactPhoneNumber: formData.contactPhoneNumber.value,
surname: formData.surname.value,
idNumber: formData.idNumber.value,
};

// Commit a mutation to save the data to the store
store.commit('user/setUserData', userData);

// Navigate to the next page
router.push({
name: 'welcome',
});
};

provide("formData", formData);

return {
formData,
submitForm,
};
},
setup() {
const isModalOpen = ref(false);

// Method to open the modal
const openModal = () => {
isModalOpen.value = true;
};

// Method to close the modal
const closeModal = () => {
isModalOpen.value = false;
};

return {
isModalOpen,
openModal,
closeModal,
};
},
methods: {
cancel() {
this.$router.go(-1);
},
},
});
