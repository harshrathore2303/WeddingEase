import React from "react";
import { MdDelete, MdMarkEmailRead } from "react-icons/md";
import useNotificationStore from "../../store/useNotificationStore";
import { useEffect } from "react";

const Notifications = () => {
  const {fetchNotifications, notifications, deleteNotification, updateNotification} = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [])

  const handleRead = async (id) => {
    await updateNotification(id);
    fetchNotifications();
  }
  const handleDelete = async (id) => {
    await deleteNotification(id);
    fetchNotifications();
  }

  return (
    <div className="px-4 md:px-16 lg:px-36 py-6 font-serif">
      <h2 className="text-2xl font-semibold mb-6 text-[#3e3c1b]">
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">No notifications yet.</div>
      ) : (
        <div className="space-y-4">
          {notifications.map((item) => (
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
                    onClick={() => handleRead(item._id)}
                  >
                    <MdMarkEmailRead size={20} />
                  </button>
                )}
                <button
                  title="Delete"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(item._id)}
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
