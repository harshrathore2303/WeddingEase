import React, { useEffect, useState } from "react";
import { useGuestStore } from "../../store/UseGuestStore";
import { LuLoader } from "react-icons/lu";

const AddGuest = ({ setIsGuestOpen }) => {
  const { fetchGuests, guests, addGuest, error, clearError, isLoading } =
    useGuestStore();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    events: [],
  });

  const [selectedGroup, setSelectedGroup] = useState("");

  useEffect(() => {
    fetchGuests();
    clearError();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(typeof formData.phone);
    const { name, phone, email } = formData;

    if (!name.trim() || !phone.trim() || !email.trim() || !selectedGroup) {
      return;
    }
    console.log(formData);

    await addGuest({ ...formData, title: selectedGroup });
    const { error: currentError } = useGuestStore.getState();
    if (!currentError) {
      setIsGuestOpen(false);
      clearError();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-serif">
      <div className="bg-[#fdfcf4] w-full max-w-xl rounded-xl shadow-xl border border-[#dcd6a3] p-6 relative">
        <button
          className="absolute top-2 right-3 text-xl font-bold text-[#3e3c1b] hover:text-red-500 transition"
          onClick={() => setIsGuestOpen(false)}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-[#3e3c1b] mb-6">
          Add New Guest
        </h2>

        <form className="space-y-4" onSubmit={handleSave}>
          <div className="flex gap-4">
            <input
              name="name"
              type="text"
              placeholder="Guest name"
              className="w-full px-4 py-2 border border-[#ccc] rounded focus:ring-2 focus:ring-[#797531] outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone number"
              className="w-full px-4 py-2 border border-[#ccc] rounded focus:ring-2 focus:ring-[#797531] outline-none"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-[#ccc] rounded focus:ring-2 focus:ring-[#797531] outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-[#3e3c1b] text-lg font-medium">
            Select Group:
            <select
              className="w-full mt-2 px-4 py-2 border border-[#ccc] bg-white rounded focus:ring-2 focus:ring-[#797531] outline-none"
              onChange={(e) => setSelectedGroup(e.target.value)}
              value={selectedGroup}
              required
            >
              <option value="">Select Group</option>
              {guests.map((group) => (
                <option key={group._id} value={group.title}>
                  {group.title}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#3e3c1b] hover:bg-[#2e2c15] text-white rounded-full"
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
    </div>
  );
};

export default AddGuest;
