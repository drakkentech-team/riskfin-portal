import axios from 'axios';

const HOST = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const fetchAdminPortalUsers = async () => {
   try{
      const response = await axios.get(`${HOST}/get-portal-users`,{
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': 1
         }
      });
      if (response) {
         return response.data;
      }
      else {
         return []
      }
      
   }
   catch (error) {
      console.error("Error retrieving payment account details:", error);
      throw error;
   }
};


export const createAdminPortalUser = async (payload) => {
   try{
      await axios.post(`${HOST}/web_register`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': 1
         },
         
      });
      return ("Successfully created admin portal user")
   }
   catch (error) {
      console.error("Error creating admin portal user:", error);
      throw error;
   }
};


export const updateAdminPortalUser = async (sid, payload) => {
   try {
      await axios.put(`${HOST}/web_user_profile?user_id=${sid}`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': 1
         }
      });
      return "Successfully updated admin portal user";
   } 
   catch (error) {
      console.error("Error updating admin portal user:", error);
      throw error;
   }
};
