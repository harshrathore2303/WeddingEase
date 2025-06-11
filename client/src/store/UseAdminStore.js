import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useAdminStore = create(({set, get}) => ({
    admin: null,
    isSigningUp: false,
    isLoggingIn: false,
    checkingAdminAuth: true,
    loginError: "",
    signError: "",

    checkingAdminAuth: async () =>{

    }
}))