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

  const handleDelete = async(id) => {
    if (
      window.confirm("Are you sure you want to delete this budget category?")
    ) {
      await deleteBudgetItem(id);
    }
  };

  return (
    <div className="w-full bg-[#fdfcf4] border border-[#d3cfc7] shadow-md rounded-xl p-5 font-serif flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-[#3e3c1b] tracking-wide">
          Budget Overview
        </h2>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#ecebe5] hover:bg-[#dcdad2] text-[#3e3c1b] text-sm font-semibold px-3 py-1.5 rounded-lg border border-[#c8c6b9] shadow-sm"
        >
          <IoIosAddCircleOutline size={18} />
          Add
        </button>
      </div>

      {isOpen && <BudgetModal setIsOpen={setIsOpen} />}

      <div className="flex justify-between items-center text-[15px] text-[#5c5c3d] font-semibold border-b pb-2 mb-3 border-[#b4b29c]">
        <span>Category</span>
        <span>Amount</span>
      </div>
      
      <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1 flex-grow">
        {categories.length === 0 ? (
          <p className="text-sm text-gray-500 italic text-center mt-3">
            No budget categories added yet.
          </p>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className="flex justify-between items-center bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm"
            >
              <span className="text-sm text-[#3e3c1b] font-medium capitalize">
                {category.title}
              </span>
              <span
                className={`text-sm font-semibold ${
                  category.checked
                    ? "line-through text-gray-400"
                    : "text-green-700"
                }`}
              >
                ₹{category.amount}
              </span>
              <FaRegTrashAlt
                size={16}
                className="text-gray-400 hover:text-red-500 cursor-pointer"
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
