import axios from 'axios';

const HOST = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const fetchPaymentAccount = async () => {
   try{
      const response = await axios.get(`${HOST}/get-account`,{
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': 2
         }
      });
      if (response.data[0]) {
         return response.data[0];
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


export const createPaymentAccount = async (payload) => {
   try{
      await axios.post(`${HOST}/create-account`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': 2
         },
         
      });
      return ("Successfully created payment account")
   }
   catch (error) {
      console.error("Error creating payment account:", error);
      throw error;
   }
};


export const updatePaymentAccount = async (payload) => {
   try {
      await axios.put(`${HOST}/update-account`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': 2
         }
      });
      return "Successfully updated payment account";
   } 
   catch (error) {
      console.error("Error updating payment account:", error);
      throw error;
   }
};
