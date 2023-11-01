import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userData: JSON.parse(sessionStorage.getItem('userData')) || null,
  }),
  actions: {
    setUserData(data) {
      this.userData = data;
      sessionStorage.setItem('userData', JSON.stringify(data));
    },
    clearUserData() {
      this.userData = null;
      sessionStorage.removeItem('userData');
    }
  }
});
