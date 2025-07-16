import React, { useState } from "react";
import useBudgetStore from "../../store/useBudgetStore";
import { LuLoader } from "react-icons/lu";

const BudgetModal = ({ setIsOpen }) => {
  const { addBudgetItem, error, clearError, fetchBudgetItems, isLoading } = useBudgetStore();
  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title.trim() === "" || formData.amount === 0) {
      alert("No empty field allowed");
      return;
    }

    await addBudgetItem(formData);
    const { error: currentError } = useBudgetStore.getState();
    if (!currentError) {
      setIsOpen(false);
    } else {
      clearError();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-serif">
      <div className="bg-[#fdfcf4] w-full max-w-md rounded-xl shadow-xl border border-[#dcd6a3] p-6 relative">
        <button
          className="absolute top-2 right-3 text-xl font-bold text-[#3e3c1b] hover:text-red-500 transition"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-[#3e3c1b] mb-6">
          Add Budget Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-[#3e3c1b] mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 border border-[#ccc] rounded focus:ring-2 focus:ring-[#AD563B] outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-[#3e3c1b] mb-1"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-[#ccc] rounded focus:ring-2 focus:ring-[#AD563B] outline-none"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: Number(e.target.value) })
              }
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-sm bg-[#AD563B] text-white hover:bg-[#8d3d29]"
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

export default BudgetModal;
