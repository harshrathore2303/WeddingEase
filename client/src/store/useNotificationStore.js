import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useNotificationStore = create((set) => ({
  notifications: [],
  isLoading: false,
  error: null,

    fetchNotificationByAdmin: async () => {
        set({isLoading:true})
      try {
        const res = await axiosInstance.get("/notifications")
        
      } catch (error) {
        console.log("Error from fetch notification in useNotificationStore", error);
        set({error: error?.response?.data?.message});
      }  finally {
set({isLoading:false})
      }
    },

  clearError: () => {
    set({ error: null });
  },
}));

export default useNotificationStore;
