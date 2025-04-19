import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useCheckListStore = create((set) => ({
  checklists: [],
  isLoading: false,
  error: null,

  fetchCheckLists: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/checkList");
      set({ checklists: response.data, isLoading: false });
    } catch (error) {
      set({ error: error?.response?.data?.message || "Failed to fetch checklists", isLoading: false });
      console.log("Error fetching checklists:", error);
    }
  },

  // Add a new category (checklist)
  addCategory: async (newCategory) => {
    try {
      const response = await axiosInstance.post("/checkList/addCategory", newCategory);
      set((state) => ({
        checklists: [...state.checklists, response.data.category],
      }));
    } catch (error) {
      console.log("Error adding category:", error);
    }
  },

  // Add a new task to a specific checklist category
  addTask: async (categoryId, newTask) => {
    try {
      const response = await axiosInstance.post(`/checkList/${categoryId}/addTask`, newTask);
      set((state) => ({
        checklists: state.checklists.map((category) =>
          category._id === categoryId
            ? { ...category, tasks: [...category.tasks, response.data.task] }
            : category
        ),
      }));
    } catch (error) {
      console.log("Error adding task:", error);
    }
  },

  // Delete a specific category
  deleteCategory: async (categoryId) => {
    try {
      await axiosInstance.delete(`/checkList/${categoryId}`);
      set((state) => ({
        checklists: state.checklists.filter((category) => category._id !== categoryId),
      }));
    } catch (error) {
      console.log("Error deleting category:", error);
    }
  },

  // Delete a specific task from a category
  deleteTask: async (categoryId, taskId) => {
    try {
      await axiosInstance.delete(`/checkList/${categoryId}/${taskId}`);
      set((state) => ({
        checklists: state.checklists.map((category) =>
          category._id === categoryId
            ? {
                ...category,
                tasks: category.tasks.filter((task) => task._id !== taskId),
              }
            : category
        ),
      }));
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  },
}));

export { useCheckListStore };
