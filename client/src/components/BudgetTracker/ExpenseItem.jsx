import React from 'react';

const ExpenseItem = ({ id, title, amount, checked, onCheckboxChange }) => {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-2 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition duration-200">
      <div className="flex flex-col text-left">
        <span className={`font-medium ${checked ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {title}
        </span>
        <span className={`text-sm ${checked ? 'line-through text-gray-400' : 'text-green-700'}`}>
          ₹{amount}
        </span>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheckboxChange(id, !checked)}
        className="h-4 w-4 accent-base-but cursor-pointer"
      />
    </div>
  );
};

export default ExpenseItem;
