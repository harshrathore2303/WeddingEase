import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  loginErr: "",
  signUpErr: "",
  updateErr: "",
  isAdmin: false,
  success: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/checkAuth");
      set({ authUser: res.data, isAdmin: res.data.role === "admin" });
    } catch (error) {
      set({ authUser: null, isAdmin: false });
      console.log("error::", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/signup", data);
      set({ authUser: res.data, isAdmin: res.data.role === "admin" });
    } catch (error) {
      set({ signUpErr: error?.response?.data?.message });
      console.log("error::", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/login", data);
      console.log(res.data.role);
      set({ authUser: res.data, isAdmin: res.data.role === "admin" });
    } catch (error) {
      set({ loginErr: error?.response?.data?.message });
      console.log("error::", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/logout");
      set({ authUser: null, isAdmin: false });
    } catch (error) {
      console.log("error::", error);
    }
  },

  updateProfile: async (formData) => {
    set({ isUpdatingProfile: true });
    try {
      console.log("Hey!! There i reached here.");
      await axiosInstance.put("/update", formData);
      set({ success: true });
    } catch (error) {
      set({ updateErr: error?.response?.data?.message });
      // console.log("error::", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  clearError: async () => {
    set({ updateErr: null, signUpErr: null, loginErr: null });
  },

  clearSuccess: async () => {
    setTimeout(() => {
      set({ success: false });
    }, 3000);
  },
}));

export { useAuthStore };
