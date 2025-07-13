import React, { useState } from "react";
import { useGuestStore } from "../../store/UseGuestStore";

const AddEvent = ({ setIsEventOpen }) => {
  const {addEvent, error, clearError} = useGuestStore();
  const [title, setTitle] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();

    await addEvent({title: title});
    const {error: currentError} = useGuestStore.getState();
    if (!currentError){
      setIsEventOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-serif">
      <form onSubmit={handleSave} className="bg-[#fdfcf4] w-full max-w-sm rounded-xl shadow-xl border border-[#dcd6a3] p-6 relative">
        <button
          className="absolute top-2 right-3 text-xl font-bold text-[#3e3c1b] hover:text-red-500 transition"
          onClick={() => {setIsEventOpen(false); clearError();}}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-[#3e3c1b] mb-6">
          Create New Event
        </h2>
        <input
          className="w-full px-4 py-2 border border-[#ccc] rounded focus:ring-2 focus:ring-[#797531] outline-none mb-6"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <div className="flex justify-end">
          <button
          type="submit"
            className="px-4 py-2 bg-[#3e3c1b] hover:bg-[#2e2c15] text-white rounded-full"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
