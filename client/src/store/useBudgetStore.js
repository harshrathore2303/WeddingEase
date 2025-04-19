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
      set({ categories: response.data, isLoading: false });
    } catch (error) {
      set({ error: error?.response?.data?.message || 'Failed to fetch budget items', isLoading: false });
      console.error('Error fetching budget items:', error);
    }
  },

  addBudgetItem: async (newCategory) => {
    try {
      const response = await axiosInstance.post('/budget', newCategory);
      set((state) => ({
        categories: [...state.categories, response.data],
      }));
    } catch (error) {
      console.error('Error adding budget item:', error);
    }
  },

  deleteBudgetItem: async (id) => {
    try {
      await axiosInstance.delete(`/budget/${id}`);
      set((state) => ({
        categories: state.categories.filter((category) => category._id !== id),
      }));
    } catch (error) {
      console.error('Error deleting budget item:', error);
    }
  },
  updateBudgetItem: async (id, checked) => {
    try {
      await axiosInstance.patch(`/budget/${id}`, { checked });
      set((state) => ({
        categories: state.categories.map((category) =>
          category._id === id ? { ...category, checked } : category
        ),
      }));
    } catch (error) {
      console.error('Error updating budget item:', error);
    }
  },
}));

export default useBudgetStore;
