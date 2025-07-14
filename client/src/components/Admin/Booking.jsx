import React, { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import useBookingStore from "../../store/useBookingStore";

const Bookings = () => {
  const { fetchAdminBookings, adminBookings, updateBooking } =
    useBookingStore();

  useEffect(() => {
    fetchAdminBookings();
  }, []);

  const handleConfirm = async (id, status) => {
    await updateBooking({ id, status });
    fetchAdminBookings();
  };

  return (
    <div className="md:ml-64 ml-32 p-4 min-h-screen bg-[#fdfcf4] font-serif overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-6 text-[#3e3c1b]">Bookings</h2>

      {adminBookings.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">No bookings yet.</div>
      ) : (
        <table className="w-full table-auto bg-white shadow-md rounded-xl">
          <thead className="bg-base-but text-white text-md font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Purpose</th>
              <th className="py-3 px-4 text-left">Start Date</th>
              <th className="py-3 px-4 text-left">End Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {adminBookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b hover:bg-gray-100 transition duration-150"
              >
                <td className="py-3 px-4">
                  {booking.serviceId?.title || "N/A"}
                </td>
                <td className="py-3 px-4">
                  {booking.userId?.fullname || "N/A"}
                </td>
                <td className="py-3 px-4">{booking.userId?.phone || "N/A"}</td>
                <td className="py-3 px-4">{booking.purpose}</td>
                <td className="py-3 px-4">
                  {new Date(booking.startDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {new Date(booking.endDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {booking.status === "Pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleConfirm(booking._id, "Confirmed")}
                        className="flex items-center gap-1 bg-[#3e3c1b] hover:bg-[#5a5733] text-white text-xs px-3 py-1 rounded transition"
                      >
                        <MdCheckCircle size={16} />
                        Confirm
                      </button>
                      <button
                        onClick={() => handleConfirm(booking._id, "Rejected")}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;
