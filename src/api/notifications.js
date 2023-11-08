import axios from 'axios';

const HOST = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const fetchNotifications = async () => {
   try{
      const response = await axios.get(`${HOST}/messages`,{
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': 1
         }
      });
      return response.data;
   }
   catch (error) {
      console.error("Error retrieving notifications:", error);
      throw error;
   }
};