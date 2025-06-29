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


  isAdmin: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/checkAuth");
      // console.log(res);
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
      // console.log(res)
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
}));

export { useAuthStore };
