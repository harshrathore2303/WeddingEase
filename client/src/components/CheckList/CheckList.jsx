import React, { useEffect, useState } from "react";
import { useChecklistStore } from "../../store/useCheckListStore";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuLoader } from "react-icons/lu";

const CheckList = () => {
  const {
    checklists,
    fetchChecklists,
    addChecklist,
    updateChecklist,
    deleteChecklist,
    clearError,
    error,
    isLoading,
  } = useChecklistStore();

  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("low");
  const [newDueDate, setNewDueDate] = useState("");

  useEffect(() => {
    fetchChecklists();
    clearError();
  }, []);

  const handleAddChecklist = async () => {
    if (!newTitle.trim()) return;
    await addChecklist({
      title: newTitle,
      priority: newPriority,
      dueDate: newDueDate,
    });
    const { error: currentError } = useGuestStore.getState();
    if (!currentError) {
      clearError();
      setNewTitle("");
      setNewPriority("low");
      setNewDueDate("");
      fetchChecklists();
    }
  };

  const toggleCheck = async (item) => {
    await updateChecklist(item._id);
    const { error: currentError } = useGuestStore.getState();
    if (!currentError) {
      setIsGuestOpen(false);
      clearError();
    }
    fetchChecklists();
  };

  const handleDelete = async (id) => {
    await deleteChecklist(id);
    const { error: currentError } = useGuestStore.getState();
    if (!currentError) {
      setIsGuestOpen(false);
      clearError();
    }
    fetchChecklists();
  };

  return (
    <div className="font-serif p-6 bg-[#fdfcf4] rounded-xl shadow border border-[#e4e1b5]">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-6">
        <input
          type="text"
          placeholder="Checklist title"
          className="px-4 py-2 border border-[#ccc] rounded outline-none"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          className="px-4 py-2 border border-[#ccc] rounded outline-none"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          className="px-4 py-2 border border-[#ccc] rounded outline-none"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        onClick={handleAddChecklist}
        className="bg-[#3e3c1b] hover:bg-[#2e2c15] text-white px-6 py-2 rounded mb-6"
      >
        {isLoading ? (
          <>
            <LuLoader className="h-5 w-5 animate-spin" />
          </>
        ) : (
          <>
            <IoIosAddCircleOutline className="inline mr-1" />
            "Add Task"
          </>
        )}
      </button>

      <ul className="space-y-4">
        {checklists.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-start bg-white border border-[#dcd6a3] rounded-lg px-4 py-3"
          >
            <label className="flex items-start gap-3 cursor-pointer text-[#3e3c1b] w-full">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(item)}
                className="mt-1 accent-[#3e3c1b]"
              />
              <div className="flex flex-col">
                <span className={item.checked ? "line-through" : ""}>
                  {item.title}
                </span>
                <span className="text-sm text-gray-500">
                  Priority: {item.priority}, Due:{" "}
                  {item.dueDate
                    ? new Date(item.dueDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </label>
            <button
              onClick={() => handleDelete(item._id)}
              className="text-red-600 hover:text-red-800 ml-3"
              title="Delete"
            >
              <FaTrashAlt size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckList;
