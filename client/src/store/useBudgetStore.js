import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

const useBudgetStore = create((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchBudgetItems: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get('/budget');
      set({ categories: response.data.data});
    } catch (error) {
      
    } finally {
      set({isLoading: false})
    }
  },

  addBudgetItem: async (formData) => {
    set({isLoading: true});
    try {
      const res = await axiosInstance.post('/budget', formData);
    } catch (error) {
      set({error: error?.response?.data?.message || "Failed to add"});
    } finally {
      set({isLoading: false});
    }
  },

  deleteBudgetItem: async (id) => {
    try {
      await axiosInstance.delete(`/budget/${id}`);
    } catch (error) {
      set({error: error?.response?.data?.message || "Failed to delete"});
    }
  },
  updateBudgetItem: async (id, checked) => {
    try {
      await axiosInstance.patch(`/budget/${id}`, { checked });
    } catch (error) {
      set({error: error?.response?.data?.message || "Failed to update"});
    }
  },

  clearError: () => {
    set({error: null});
  }
}));

export default useBudgetStore;
