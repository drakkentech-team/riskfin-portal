import axios from 'axios';
import { useStore } from '../stores/store';

const HOST = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;
const store = useStore();

export const getNotifications = async () => {
   try{
      const response = await axios.get(`${HOST}/messages`,{
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': store.user[0].app_fk
         }
      });
      return response.data;
   }
   catch (error) {
      console.error("Error retrieving notifications:", error);
      throw error;
   }
};

export const getNotificationTemplates = async () => {
   try{
      const response = await axios.get(`${HOST}/message_template`,{
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': store.user[0].app_fk
         }
      });
      return response.data;
   }
   catch (error) {
      console.error("Error retrieving notification templates:", error);
      throw error;
   }
};


export const sendNotification = async (payload) => {
   try{
      const response = await axios.post(`${HOST}/send_message`, payload, {
         headers: {
           'Authorization': `Bearer ${BEARER_TOKEN}`,
           'Content-Type': 'application/json',
           'app-id': store.user[0].app_fk
         }
      });
      return response.data;
   }
   catch (error) {
      console.error("Error retrieving notifications:", error);
      throw error;
   }
};
