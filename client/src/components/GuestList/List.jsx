import React, { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import ListData from "./ListData";
import { useGuestStore } from "../../store/UseGuestStore";

const List = () => {
  const { guests, fetchGuests, deleteGroup, deleteGuest } = useGuestStore();

  useEffect(() => {
    fetchGuests();
  }, []);

  const onDeleteGroup = async (groupId) => {
    const confirm = window.confirm("Are you sure you want to delete this group?");
    if (confirm) {
      await deleteGroup(groupId);
      fetchGuests();
    }
  };

  const onDeleteGuest = async (groupId, guestId) => {
    const confirm = window.confirm("Are you sure you want to delete this guest?");
    if (confirm) {
      await deleteGuest(groupId, guestId);
      fetchGuests();
    }
  };

  return (
    <div className="mx-auto mt-8  rounded-xl bg-[#fdfcf4]">

      {guests.length === 0 ? (
        <p className="text-center text-gray-600">No guest groups available.</p>
      ) : (
        guests.map((item) => (
          <div
            key={item._id}
            className="mb-8 bg-white border border-[#dcd6a3] shadow rounded-xl overflow-x-auto"
          >
            <div className="flex justify-between items-center px-4 py-3 bg-[#f3f1d8] border-b border-[#dcd6a3] rounded-t-xl">
              <div className="text-lg sm:text-xl font-semibold text-[#3e3c1b]">
                {item.title}{" "}
                <span className="text-sm text-gray-500">
                  ({item.guests.length})
                </span>
              </div>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => onDeleteGroup(item._id)}
                title="Delete Group"
              >
                <FaRegTrashAlt size={18} />
              </button>
            </div>

            <table className="min-w-[600px] w-full text-sm text-[#3e3c1b] bg-white">
              <thead className="bg-[#f3f1d8] text-[#3e3c1b] uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-2 w-1/3">Name</th>
                  <th className="text-center px-4 py-2 w-1/4">Phone</th>
                  <th className="text-center px-4 py-2 w-1/3">Email</th>
                  <th className="text-center px-2 py-2 w-10">Action</th>
                </tr>
              </thead>
              <tbody>
                {item.guests.map((guest) => (
                  <ListData
                    key={guest._id}
                    guest={guest}
                    onDeleteGuest={() => onDeleteGuest(item._id, guest._id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default List;
