import { defineStore } from 'pinia';

export const useDataStore = defineStore({
  id: 'dataStore',
  state: () => ({
    userData: null,
    mobileUserData: null
  }),
});