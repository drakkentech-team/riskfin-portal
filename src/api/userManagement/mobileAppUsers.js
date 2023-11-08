import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_LOCAL;

export const mobileUserData = async () => {
   try {
      const response = await axios.get(`${API_ENDPOINT}/mobile-app-users`)
      return response.data;
   } 
   catch (error) {
      console.error("Error retrieving mobile user data:", error);
      throw error;
   }
};
