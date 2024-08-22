import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const getFollowUp = async () => {
   try {
      const response = await axios.get(`${API_ENDPOINT}/follow_up`, {
         headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'app-id': 1
         }
      });
      return response.data;
   } 
   catch (error) {
      console.error("Error retrieving follow up data:", error);
      return "";
   }
};

export const updateFollowUp = async (sid, payload) => {
   console.log("im here")
   try {
      console.log("i tried")
      await axios.put(`${API_ENDPOINT}/follow_up`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': 1
         }
      });
      return `Successfully updated with SID ${sid}`;
   } 
   catch (error) {
      console.error(`Error while updating with SID ${sid}:`, error);
      throw error;
   }
};