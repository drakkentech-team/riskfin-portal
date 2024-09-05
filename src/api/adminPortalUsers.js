import axios from "axios";
import { useStore } from "../stores/store";

const HOST = import.meta.env.VITE_LOCAL;
const BEARER_TOKEN = import.meta.env.VITE_BEARERTOKEN;
const store = useStore();

export const fetchAdminPortalUsers = async () => {
  try {
    const response = await axios.get(`${HOST}/get-portal-users`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
        "app-id": store.user[0].app_fk,
      },
    });
    if (response) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error retrieving payment account details:", error);
    throw error;
  }
};

export const createAdminPortalUser = async (payload) => {
  try {
    await axios.post(`${HOST}/web_register`, payload, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
        "app-id": store.user[0].app_fk,
      },
    });
    return "Successfully created admin portal user";
  } catch (error) {
    console.error("Error creating admin portal user:", error);
    throw error;
  }
};

export const updateAdminPortalUser = async (sid, payload) => {
  try {
    await axios.put(`${HOST}/web_user_profile?user_id=${sid.sid}`, sid, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
        "app-id": store.user[0].app_fk,
      },
    });
    return "Successfully updated admin portal user";
  } catch (error) {
    console.error("Error updating admin portal user:", error);
    throw error;
  }
};

export const deleteAdminPortalUser = async (sid) => {
  try {
    await axios.put(
      `${HOST}/delete_web_user?sid=${sid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
          "app-id": store.user[0].app_fk,
        },
      }
    );
  } catch (error) {
    console.error(`Error deleting user with SID ${sid}:`, error);
    throw error;
  }
};
