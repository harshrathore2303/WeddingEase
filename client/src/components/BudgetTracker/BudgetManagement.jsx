import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import BudgetModal from './BudgetModal';
import useBudgetStore from '../../store/useBudgetStore';

const BudgetManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    categories,
    fetchBudgetItems,
    addBudgetItem,
    deleteBudgetItem
  } = useBudgetStore();

  useEffect(() => {
    fetchBudgetItems();
  }, [fetchBudgetItems]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddCategory = (newCategory) => {
    addBudgetItem(newCategory);
    closeModal();
  };

  const handleDelete = (id) => {
    deleteBudgetItem(id);
  };

  return (
    <div className="border bg-[#f4f4ff] border-black shadow-md rounded-2xl p-5 w-full max-w-sm font-serif">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#AD563B]">Budget Overview</h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-[#dadce6] hover:bg-[#c6c7d4] text-[#AD563B] text-sm font-semibold px-3 py-1.5 rounded-lg transition shadow-sm hover:scale-105"
        >
          <IoIosAddCircleOutline size={18} />
          Add
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <BudgetModal closeModal={closeModal} addCategory={handleAddCategory} />
      )}

      {/* Table Headings */}
      <div className="flex justify-between text-[14px] text-black font-semibold border-b border-black pb-1 mb-2">
        <span>Category</span>
        <span>Amount</span>
      </div>

      {/* Budget List */}
      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
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
              <span className={`text-sm font-medium ${category.checked ? "line-through text-gray-400" : "text-green-700"}`}>
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
