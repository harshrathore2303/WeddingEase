import React, { useState } from "react";
import { useGuestStore } from "../../store/UseGuestStore";
import { LuLoader } from "react-icons/lu";

const AddGroup = ({ setIsGroupOpen }) => {
  const { addGroup, clearError, error, fetchGuests, isLoading } =
    useGuestStore();

  const [formData, setFormData] = useState({
    title: "",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    await addGroup(formData);
    const { error: currentError } = useGuestStore.getState();
    if (!currentError) {
      setIsGroupOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSave}
        className="bg-[#fdfcf4] w-full max-w-sm rounded-xl shadow-xl border border-[#dcd6a3] p-6 relative"
      >
        <button
          className="absolute top-2 right-3 text-xl font-bold text-[#3e3c1b] hover:text-red-500 transition"
          onClick={() => {
            setIsGroupOpen(false);
            clearError();
          }}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-[#3e3c1b] mb-6">
          Create New Group
        </h2>

        <input
          className="w-full px-4 py-2 border border-[#ccc] rounded focus:ring-2 focus:ring-[#797531] outline-none mb-4"
          placeholder="Enter group title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-[#3e3c1b] hover:bg-[#2e2c15] text-white rounded-full"
            type="submit"
          >
            {isLoading ? (
              <>
                <LuLoader className="h-5 w-5 animate-spin" />
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGroup;
