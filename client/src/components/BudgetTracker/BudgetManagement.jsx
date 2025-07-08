import React, { useState, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import BudgetModal from "./BudgetModal";
import useBudgetStore from "../../store/useBudgetStore";

const BudgetManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { categories, fetchBudgetItems, deleteBudgetItem } = useBudgetStore();

  useEffect(() => {
    if (!isOpen) fetchBudgetItems();
  }, [isOpen]);

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this budget category?")
    ) {
      deleteBudgetItem(id);
    }
  };

  return (
    <div className="w-full bg-[#f4f4ff] border border-black shadow-md rounded-2xl p-5 font-serif flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#AD563B]">Budget Overview</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#dadce6] hover:bg-[#c6c7d4] text-[#AD563B] text-sm font-semibold px-3 py-1.5 rounded-lg transition shadow-sm hover:scale-105"
        >
          <IoIosAddCircleOutline size={18} />
          Add
        </button>
      </div>

      {isOpen && <BudgetModal setIsOpen={setIsOpen} />}

      <div className="flex justify-between text-[14px] text-black font-semibold border-b border-black pb-1 mb-2">
        <span>Category</span>
        <span>Amount</span>
      </div>

      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 flex-grow">
        {categories.length === 0 ? (
          <p className="text-sm text-black italic text-center mt-3">
            No categories added yet.
          </p>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className="flex justify-between items-center bg-[#fdfcf4] border border-gray-100 rounded-md px-3 py-2 shadow-sm hover:shadow transition"
            >
              <span className="text-sm text-gray-800">{category.title}</span>
              <span
                className={`text-sm font-medium ${
                  category.checked
                    ? "line-through text-gray-400"
                    : "text-green-700"
                }`}
              >
                ₹{category.amount}
              </span>
              <FaRegTrashAlt
                size={16}
                className="text-gray-400 hover:text-red-500 cursor-pointer transition"
                onClick={() => handleDelete(category._id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BudgetManagement;
