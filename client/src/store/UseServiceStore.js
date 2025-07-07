import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useServiceStore = create((set) => ({
  services: [],
  isLoading: false,
  error: null,
  success: false,
  servicesByAdmin: [],
  page: 0,
  totalPage: 0,
  service: null,

  fetchServices: async (query = {}) => {
    set({ isLoading: true, error: null });
    try {
      const queryString = new URLSearchParams(query).toString();
      const res = await axiosInstance.get(`/services?${queryString}`);
      set({ services: res.data.data, error:null, page: res.data.page, totalPages: res.data.totalPages });
    } catch (error) {
      set({ error: error?.response?.data?.message || "Failed to fetch services"  });
    } finally {
      set({ isLoading: false });
    }
  },
  
  getServiceById: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/services/${id}`);
      set({service: res.data.data});
    } catch (error) {
      set({ error: error?.response?.data?.message || "Failed to fetch services"  });
    } finally {
      set({ isLoading: false });
    }
  },

  adminServices: async () => {
    set({ isLoading: true, error: null });
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
