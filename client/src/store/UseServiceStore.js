import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useServiceStore = create((set) => ({
  services: [],
  isLoading: false,
  error: null,
  success: false,
  servicesByAdmin: [],

  fetchServices: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/services");
      set({ services: res.data, error:null });
    } catch (error) {
      set({ error: error?.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },

  adminServices: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/adminServices");
      set({ servicesByAdmin: res.data.data, error:null });
    } catch (error) {
      set({ error: error?.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },
  createService: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/services", formData);
      set({error: null})
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Failed to create service",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteService: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.delete(`/delete/${id}`);
      set((state) => ({
        servicesByAdmin: state.servicesByAdmin.filter(
          (service) => service._id !== id
        ),
        error:null
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete service",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updateService: async (id, formData) => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosInstance.put(`/services/${id}`, formData);
      set({error: null});
    } catch (error) {
      console.error(error);
      set({
        error: error.response?.data?.message || "Failed to update service",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export { useServiceStore };
