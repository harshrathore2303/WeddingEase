import React, { useState } from 'react';

const BudgetModal = ({ closeModal, addCategory }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && amount) {
      const newCategory = {
        title,
        amount: parseFloat(amount),
      };
      addCategory(newCategory);
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-[#fdfcf4] w-full max-w-md p-6 rounded-xl shadow-lg font-serif border border-gray-300">
        <h2 className="text-xl font-semibold text-center text-[#3e3c1b] mb-4">
          Add Budget Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#AD563B]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#AD563B]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-md text-sm bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-sm bg-[#AD563B] text-white hover:bg-[#8d3d29]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;
