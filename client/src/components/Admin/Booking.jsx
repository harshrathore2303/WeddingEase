import React from "react";
import { MdCheckCircle } from "react-icons/md";

const Bookings = () => {
  const dummyBookings = [
    {
      _id: "1",
      serviceName: "Royal Banquet Hall",
      userName: "Harshit Rathore",
      purpose: "Wedding Reception",
      startDate: "2025-07-10",
      endDate: "2025-07-12",
      status: "Confirmed",
    },
    {
      _id: "2",
      serviceName: "Dream Decorators",
      userName: "Neha Sharma",
      purpose: "Engagement Ceremony",
      startDate: "2025-07-15",
      endDate: "2025-07-15",
      status: "Pending",
    },
  ];

  const handleConfirm = (id) => {
    // You can add confirmation logic here later
    console.log("Confirmed booking:", id);
  };

  return (
    <div className="md:ml-64 ml-32 p-4 min-h-screen bg-[#fdfcf4] font-serif">
      <h2 className="text-2xl font-semibold mb-6 text-[#3e3c1b]">Bookings</h2>

      {dummyBookings.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No bookings yet.
        </div>
      ) : (
        <table className="w-full table-auto bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-base-but text-white text-md font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Purpose</th>
              <th className="py-3 px-4 text-left">Start Date</th>
              <th className="py-3 px-4 text-left">End Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {dummyBookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b hover:bg-gray-100 transition duration-150"
              >
                <td className="py-3 px-4">{booking.serviceName}</td>
                <td className="py-3 px-4">{booking.userName}</td>
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
                    <button
                      onClick={() => handleConfirm(booking._id)}
                      className="flex items-center gap-1 bg-[#3e3c1b] hover:bg-[#5a5733] text-white text-xs px-3 py-1 rounded transition"
                    >
                      <MdCheckCircle size={16} />
                      Confirm
                    </button>
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
