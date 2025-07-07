import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useCheckListStore = create((set) => ({
  checklists: [],
  isLoading: false,
  error: null,

  
}));

export { useCheckListStore };
