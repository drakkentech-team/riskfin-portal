import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;

export const getProducts = async () => {
   try {
      const response = await axios.get(`${API_ENDPOINT}/get-products`, {
         headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'app-id': 1
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
           'app-id': 1
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
           'app-id': 1
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
           'app-id': 1
         }
      });
      return `Successfully deleted cover with SID ${sid}`;
   } 
   catch (error) {
      console.error(`Error while deleting cover with SID ${sid}:`, error);
      throw error;
   }
};
