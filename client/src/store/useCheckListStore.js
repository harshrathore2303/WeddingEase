import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChecklistStore = create((set, get) => ({
  checklists: [],
  isLoading: false,
  error: null,

  fetchChecklists: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/lists");
      set({ checklists: res.data.data });
    } catch (error) {
      set({ error: error?.response?.data?.message || "Failed to fetch checklists" });
    } finally {
      set({ isLoading: false });
    }
  },

  addChecklist: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/list", data);
      set({checklist: res.data.data})
    } catch (error) {
      set({ error: error?.response?.data?.message || "Failed to add checklist" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateChecklist: async (id) => {
    try {
      const res = await axiosInstance.put(`/list/${id}`);
    } catch (error) {
      set({ error: error?.response?.data?.message || "Failed to update checklist" });
    }
  },

  deleteChecklist: async (id) => {
    try {
      await axiosInstance.delete(`/list/${id}`);
    } catch (error) {
      set({ error: error?.response?.data?.message || "Failed to delete checklist" });
    }
  },

  clearError: () => set({ error: null }),
}));
