import React from 'react';

const ExpenseItem = ({ id, title, amount, checked, onCheckboxChange }) => {
  return (
    <div className="flex items-center justify-between bg-[#fdfcf4] px-4 py-2 rounded-lg border border-[#dad8c7] shadow-sm hover:shadow-md font-serif">
      <div className="flex flex-col text-left">
        <span
          className={`text-sm font-medium ${
            checked ? "line-through text-gray-400" : "text-[#3e3c1b]"
          }`}
        >
          {title}
        </span>
        <span
          className={`text-sm ${
            checked ? "line-through text-gray-400" : "text-green-700 font-semibold"
          }`}
        >
          ₹{amount}
        </span>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheckboxChange(id, !checked)}
        className="h-4 w-4 accent-[#AD563B] cursor-pointer"
      />
    </div>
  );
};

export default ExpenseItem;
