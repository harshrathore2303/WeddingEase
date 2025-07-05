import React from "react";
import { MdDelete, MdMarkEmailRead } from "react-icons/md";

const Notifications = () => {
  // Dummy data (you can later fetch this from your store/API)
  const dummyNotifications = [
    {
      _id: 1,
      message: "New user registered on your platform.",
      isRead: false,
      createdAt: new Date(),
    },
    {
      _id: 2,
      message: "Service 'Royal Hall' has been booked.",
      isRead: true,
      createdAt: new Date(),
    },
  ];

  return (
    <div className="md:ml-64 ml-32 p-4 min-h-screen bg-[#fdfcf4] font-serif">
      <h2 className="text-2xl font-semibold mb-6 text-[#3e3c1b]">
        Notifications
      </h2>

      {dummyNotifications.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">No notifications yet.</div>
      ) : (
        <div className="space-y-4">
          {dummyNotifications.map((item) => (
            <div
              key={item._id}
              className={`flex justify-between items-center p-4 rounded-lg border ${
                item.isRead ? "bg-white" : "bg-[#f0ead4]"
              } shadow-sm border-[#dcd6a3]`}
            >
              <div className="flex flex-col">
                <span className="text-[#3e3c1b] text-md">{item.message}</span>
                <span className="text-sm text-gray-500 mt-1">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="flex gap-3 items-center">
                {!item.isRead && (
                  <button
                    title="Mark as Read"
                    className="text-[#3e3c1b] hover:text-green-600"
                  >
                    <MdMarkEmailRead size={20} />
                  </button>
                )}
                <button
                  title="Delete"
                  className="text-red-600 hover:text-red-800"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
