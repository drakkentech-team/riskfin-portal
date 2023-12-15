import axios from 'axios';
import { useStore } from '../stores/store';

const API_ENDPOINT = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

const user = useStore()

export const login = async (payload) => {
   try {
      const response = await axios.post(`${API_ENDPOINT}/admin-portal-login`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': "login"
         }
      });
      return response;
   } 
   catch (error) {
      console.error("Error during login:", error);
      throw error;
   }
};
