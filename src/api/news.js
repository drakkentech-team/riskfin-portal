import axios from 'axios';
import { useStore } from '../stores/store';

const API_ENDPOINT = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;
const store = useStore();

export const createNews = async (payload) => {
   try {
      await axios.post(`${API_ENDPOINT}/send-news`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': store.user[0].app_fk
         }
      });
      return "Successfully created news";
   } 
   catch (error) {
      console.error("Error creating news:", error);
      throw error;
   }
};


export const getNews = async () => {
   try {
      const response = await axios.get(`${API_ENDPOINT}/news`,{
         headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'app-id': store.user[0].app_fk
         }
      })
      return response.data;
   } 
   catch (error) {
      console.error("Error retrieving news:", error);
      throw error;
   }
};


export const updateNews = async (sid, payload) => {
   try {
      await axios.put(`${API_ENDPOINT}/update-news?sid=${sid}`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': store.user[0].app_fk
         }
      });
      return "Successfully updated news";
   } 
   catch (error) {
      console.error("Error updating news:", error);
      throw error;
   }
};



