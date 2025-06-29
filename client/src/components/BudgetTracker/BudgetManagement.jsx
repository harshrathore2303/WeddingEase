import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import BudgetModal from './BudgetModal';
import { FaRegTrashAlt } from "react-icons/fa";
import useBudgetStore from '../../store/useBudgetStore';

const BudgetManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    categories,
    fetchBudgetItems,
    addBudgetItem,
    deleteBudgetItem,
    updateBudgetItem
  } = useBudgetStore();

  useEffect(() => {
    fetchBudgetItems();
  }, [fetchBudgetItems]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onClickTrash = (id) => {
    deleteBudgetItem(id);
  };

  const addCategory = (newCategory) => {
    addBudgetItem(newCategory);
    closeModal();
  };

  return (
    <div className="bg-[#fdfcf4] p-4 rounded-xl shadow-md border border-gray-200 font-serif w-full max-w-sm mx-auto">
      {/* Add Button */}
      <button
        className="w-full flex items-center justify-center gap-2 bg-[#DADAE6] text-[#AD563B] font-semibold py-2 rounded-md hover:scale-105 transition-transform duration-200"
        onClick={openModal}
      >
        <IoIosAddCircleOutline size={22} />
        Add Category
      </button>

      {isModalOpen && <BudgetModal closeModal={closeModal} addCategory={addCategory} />}

      {/* Headers */}
      <div className="flex justify-between items-center border-b border-gray-300 mt-4 pb-1 font-medium text-gray-700">
        <span>Category</span>
        <span>Amount</span>
      </div>

      {/* Items */}
      <div className="mt-2 space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex justify-between items-center py-2 border-b border-gray-100 hover:bg-gray-50 px-2 rounded-md transition"
          >
            <span className="text-sm text-gray-700">{category.title}</span>
            <span
              className={`text-sm font-medium ${
                category.checked ? "line-through text-gray-400" : "text-green-700"
              }`}
            >
              ₹{category.amount}
            </span>
            <FaRegTrashAlt
              size={16}
              className="text-gray-500 hover:text-red-500 cursor-pointer transition"
              onClick={() => onClickTrash(category._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetManagement;
