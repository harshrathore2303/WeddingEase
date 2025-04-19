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

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/checkAuth");
      console.log(res);
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.log("error::", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/user/signup", data);
      set({ authUser: res.data });
    } catch (error) {
        set({ signUpErr: error?.response?.data?.message })
      console.log("error::", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/user/login", data);
      console.log(res.data);
      set({ authUser: res.data });
    } catch (error) {
      set({ loginErr: error?.response?.data?.message });
      console.log("error::", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/user/logout");
      set({ authUser: null });
    } catch (error) {
      console.log("error::", error);
    }
  },
}));

export { useAuthStore };
