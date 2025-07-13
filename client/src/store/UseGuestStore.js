import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useGuestStore = create((set) => ({
  guests: [],
  isLoading: false,
  error: null,
  events: [],

  addGuest: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/group/addGuest", formData);
      set({ error: null });
    } catch (error) {
      console.log("error:", error);
      set({ error: error?.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchGuests: async () => {
    try {
      const res = await axiosInstance.get("/group");
      set({ guests: res.data.guests });
    } catch (error) {
      console.log("error:", error);
    }
  },

  addGroup: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/group", formData);
      set({ error: null });
    } catch (error) {
      console.log("error:", error);
      set({ error: error?.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteGroup: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/group/${id}`);
      await get().fetchGuests();
    } catch (error) {
      console.log("deleteGroup error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteGuest: async (groupId, guestId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/group/${groupId}/guest/${guestId}`);
      await get().fetchGuests();
    } catch (error) {
      console.log("deleteGuest error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

export { useGuestStore };
