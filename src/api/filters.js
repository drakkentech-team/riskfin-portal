import axios from 'axios';
import { useStore } from '../stores/store';

const HOST = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;
const store = useStore();

export const applyFilters = async (payload) => {
   try {
      const response = await axios.post(`${HOST}/filter_messages`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': store.user[0].app_fk
         }
      });
      return response.data;
   } 
   catch (error) {
      console.error("Error creating news:", error);
      throw error;
   }
};