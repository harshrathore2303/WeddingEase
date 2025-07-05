import React, { useEffect } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import ExpenseItem from './ExpenseItem';
import useBudgetStore from '../../store/useBudgetStore';

const ExpenseTrack = () => {
  const { categories, fetchBudgetItems, updateBudgetItem } = useBudgetStore();

  useEffect(() => {
    fetchBudgetItems();
  }, [fetchBudgetItems]);

  const handleCheckboxChange = (id, checked) => {
    updateBudgetItem(id, checked);
  };

  const totalAmount = categories.reduce((total, cat) => total + cat.amount, 0);
  const checkedAmount = categories.reduce(
    (total, cat) => (cat.checked ? total + cat.amount : total),
    0
  );
  const remainingAmount = totalAmount - checkedAmount;

  return (
    <div className="font-serif">
      <div className="w-full max-w-md bg-[#f4f4ff] rounded-xl shadow-md border border-gray-300 p-4">
        <div className="bg-[#dadada] rounded-md py-2 px-4 text-center font-semibold text-[#3e3c1b] shadow">
          <div className="flex justify-center items-center gap-2 text-md">
            <FaRupeeSign />
            <span>Total Expense Tracker</span>
          </div>
        </div>

        <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {categories.map((cat) => (
            <ExpenseItem
              key={cat._id}
              id={cat._id}
              title={cat.title}
              amount={cat.amount}
              checked={cat.checked}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>

        <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-800 font-medium">
          <div className="flex justify-between">
            <span>Total Budget</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Used</span>
            <span>₹{checkedAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-700 font-semibold">
            <span>Remaining</span>
            <span>₹{remainingAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTrack;
