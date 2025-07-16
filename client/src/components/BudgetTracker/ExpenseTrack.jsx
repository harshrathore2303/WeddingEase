import React, { useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import ExpenseItem from "./ExpenseItem";
import useBudgetStore from "../../store/useBudgetStore";

const ExpenseTrack = () => {
  const { categories, fetchBudgetItems, updateBudgetItem } = useBudgetStore();

  useEffect(() => {
    fetchBudgetItems();
  }, []);

  const handleCheckboxChange = async (id, checked) => {
    await updateBudgetItem(id, checked);
    await fetchBudgetItems();
  };

  const totalAmount = categories.reduce((total, cat) => total + cat.amount, 0);
  const checkedAmount = categories.reduce(
    (total, cat) => (cat.checked ? total + cat.amount : total),
    0
  );
  const remainingAmount = totalAmount - checkedAmount;

  return (
    <div className="w-full bg-[#fdfcf4] border border-[#dad8c7] rounded-2xl shadow-md p-5 font-serif flex flex-col">
      <div className="bg-[#eae8dc] rounded-md py-2 px-4 text-center font-semibold text-[#3e3c1b] shadow-sm border border-[#cbc8b3]">
        <div className="flex justify-center items-center gap-2 text-md">
          <FaRupeeSign className="text-[#3e3c1b]" />
          <span>Total Expense Tracker</span>
        </div>
      </div>

      <div className="mt-4 space-y-3 max-h-[280px] overflow-y-auto pr-1 flex-grow">
        {categories.length === 0 ? (
          <p className="text-sm text-center italic text-gray-500 mt-2">
            No budget categories found.
          </p>
        ) : (
          categories.map((cat) => (
            <ExpenseItem
              key={cat._id}
              id={cat._id}
              title={cat.title}
              amount={cat.amount}
              checked={cat.checked}
              onCheckboxChange={handleCheckboxChange}
            />
          ))
        )}
      </div>

      <div className="mt-6 border-t border-[#ccc] pt-4 space-y-2 text-sm font-medium text-[#3e3c1b]">
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
  );
};

export default ExpenseTrack;
