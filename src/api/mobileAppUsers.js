import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const getMobileUsers = async () => {
   try {
      const response = await axios.get(`${API_ENDPOINT}/get-mobile-app-users`, {
         headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'app-id': 1
         }
      });
      return response.data;
   } 
   catch (error) {
      console.error("Error retrieving mobile user data:", error);
      throw error;
   }
};


export const updateMobileUser = async (payload) => {
   try {
      await axios.put(`${API_ENDPOINT}/update-mobile-app-user`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': 1
         }
      });
      return "Successfully deactivated users policy";
   } 
   catch (error) {
      console.error("Error retrieving mobile user data:", error);
      throw error;
   }
};


export const deleteUserPolicy = async (payload) => {
   try {
      await axios.put(`${API_ENDPOINT}/deactivate-user-policy`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': 2
         }
      });
      return "Successfully deactivated users policy";
   } 
   catch (error) {
      console.error("Error retrieving mobile user data:", error);
      throw error;
   }
};
