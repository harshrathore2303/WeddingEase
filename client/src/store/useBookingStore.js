import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useBookingStore = create((set) => ({
  userBookings: [],
  adminBookings: [],
  conflicts: [],
  isLoading: false,
  isBooking:false,
  error: null,
  count: 0,

  fetchUserBookings: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/bookings/user");
      set({ userBookings: res.data.data });
    } catch (error) {
      console.error("Error from fetch user bookings in useBookingStore", error);
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  bookService: async (formData) => {
    set({ isBooking: true });
    try {
      const res = await axiosInstance.post("/booking", formData);
    } catch (error) {
      console.log("Error from book service in useBookingStore", error);
      set({ error: error?.response?.data?.message });
    } finally {
      set({ isBooking: false });
    }
  },

  fetchAdminBookings: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/owned");
      console.log(res.data.data);
      set({ adminBookings: res.data.data });
    } catch (error) {
      console.error("Failed to fetch admin bookings:", error);
      set({ error: error?.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateBooking: async ({ id, status }) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.patch(`/booking/update/${id}`, {status});
    } catch (error) {
      console.error("Failed to update booking status:", error);
      set({ error: error?.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },

  getConflicts: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/booking/conflicts/${id}`);
      set({conflicts: res.data.data});
    } catch (error) {
      console.error("Failed to get conflicts:", error);
      set({ error: error?.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },

  countBookings: async (params) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/booking/count`);
      set({count: res.data.count});
    } catch (error) {
      console.error("Failed to get countBookings:", error);
      set({ error: error?.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useBookingStore;
