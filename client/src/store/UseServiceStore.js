import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useServiceStore = create((set) => ({
  services: [],
  isLoading: false,
  error: null,
  success: false,
  servicesByAdmin: [],

  fetchServices: async () => {
    set({loading: true, error: null})
    try {
        const res = await axiosInstance.get("/services");
        console.log(res);
        set({services: res.data});
    } catch (error) {
        set({error: error?.response?.data?.message});
    } finally{
      set({isLoading: false})
    }
  },
  
  adminServices: async () => {
    set({loading: true, error: null})
    try {
        const res = await axiosInstance.get("/adminServices");
        console.log(res);
        set({servicesByAdmin: res.data});
    } catch (error) {
        set({error: error?.response?.data?.message});
    } finally{
      set({isLoading: false})
    }
  }
  ,

  createService: async (formData) => {
    set({isLoading: true, error: null});
    try {
      console.log(formData)
      const res = await axiosInstance.post("/services", formData);
    } catch (error) {
      console.log(error)
      set({ error: error.response?.data?.message || "Failed to create service"});
    } finally {
      set({isLoading: false});
    }
  },

  deleteService: async (id) => {
    
  },

  updateService: async (id) => {
    
  }
}));

export {useServiceStore};