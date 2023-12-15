import axios from 'axios';

const HOST = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const applyFilters = async (payload) => {
   try {
      const response = await axios.post(`${HOST}/filter_messages`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': 1
         }
      });
      return response.data;
   } 
   catch (error) {
      console.error("Error creating news:", error);
      throw error;
   }
};