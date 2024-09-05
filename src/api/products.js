import axios from 'axios';
import { useStore } from '../stores/store';

const API_ENDPOINT = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;
const store = useStore();

export const getProducts = async () => {
   try {
      const response = await axios.get(`${API_ENDPOINT}/get-products`, {
         headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'app-id': store.user[0].app_fk
         }
      });
      return response.data;
   } 
   catch (error) {
      console.error("Error retrieving products:", error);
      throw error;
   }
};


export const addProduct = async (payload) => {
   try {
      await axios.post(`${API_ENDPOINT}/add-product`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': store.user[0].app_fk
         }
      });
      return `Successfully updated product with SID ${sid}`;
   } 
   catch (error) {
      console.error(`Error while updating product with SID ${sid}:`, error);
      throw error;
   }
}


export const updateProducts = async (sid, payload) => {
   try {
      await axios.put(`${API_ENDPOINT}/update-product?sid=${sid}`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': store.user[0].app_fk
         }
      });
      return `Successfully updated product with SID ${sid}`;
   } 
   catch (error) {
      console.error(`Error while updating product with SID ${sid}:`, error);
      throw error;
   }
};


export const deleteCover = async (sid) => {
   try {
      await axios.delete(`${API_ENDPOINT}/delete-cover?sid=${sid}`, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': store.user[0].app_fk
         }
      });
      return `Successfully deleted cover with SID ${sid}`;
   } 
   catch (error) {
      console.error(`Error while deleting cover with SID ${sid}:`, error);
      throw error;
   }
};

export const deleteProduct = async (sid) => {
   await axios.delete(`${API_ENDPOINT}/policy_details?sid_policy_detail=${sid}`, {
      headers: {
         'Authorization': `Bearer ${BEARER_TOKEN}`,
         'Content-Type': 'application/json',
         'app-id': store.user[0].app_fk
      }
   });
};
