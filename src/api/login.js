import axios from 'axios';
import { useDataStore } from '../stores/store'

// const API_ENDPOINT = process.env.VUE_APP_LOCAL;
const API_ENDPOINT = 'http://localhost:9000'
const store = useDataStore()
export const login = async (email, password) => {
   try {
      const response = await axios.post(`${API_ENDPOINT}/web_login`, {
         email: email,
         password: password
      });
      store.userData = response.data
      return response;
   } 
   catch (error) {
      console.error("Error during login:", error);
      throw error;
   }
};
