import React from 'react';

const TaskItem = ({ task, onCheckboxChange, onDelete }) => {
  return (
    <div className={`task p-4 mb-3 rounded-lg shadow-md transition-all duration-300 ${task.checked ? 'bg-green-100' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            checked={task.checked}
            onChange={onCheckboxChange}
          />
          <span className={`ml-2 text-lg ${task.checked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.description}
          </span>
        </label>
        <button
          className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
      <div className="text-sm mt-2 text-gray-600">
        <p>Done by: {task.done_by || 'N/A'}</p>
        <p>Created at: {new Date(task.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TaskItem;

