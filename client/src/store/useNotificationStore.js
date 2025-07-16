import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useNotificationStore = create((set) => ({
  notifications: [],
  isLoading: false,
  error: null,
  count: 0,
  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/notifications")
      set({notifications: res.data.data});
    } catch (error) {
      console.log("Error in fetch notification in useNotificationStore",error);
      set({ error: error?.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateNotification: async (id) => {
    set({isLoading: true});
    try {
      await axiosInstance.patch(`/notification/${id}`);
    } catch (error) {
      console.log("Error in update notification in useNotificationStore", error);
      set({error: error?.response?.data?.message});
    } finally {
      set({isLoading: false});
    }
  },

  deleteNotification: async (id) => {
    set({isLoading: true});
    try {
      await axiosInstance.delete(`/notification/${id}`);
    } catch (error) {
      console.log("Error in delte notification in useNotificationStore", error);
      set({error: error?.response?.data?.message});
    } finally {
      set({isLoading: false});
    }
  },

  countNotifications: async (params) => {
    set({isLoading: true});
    try {
      const res = await axiosInstance.get("/notification/count");
      set({count: res.data.count});
    } catch (error) {
      console.log("Error in count notification in useNotificationStore", error);
      set({error: error?.response?.data?.message});
    } finally {
      set({isLoading: false});
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useNotificationStore;
