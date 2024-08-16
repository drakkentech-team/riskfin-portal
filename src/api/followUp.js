import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const getFollowUp = async () => {
    console.log("h")
   try {
      const response = await axios.get(`${API_ENDPOINT}/get-follow-up`, {
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