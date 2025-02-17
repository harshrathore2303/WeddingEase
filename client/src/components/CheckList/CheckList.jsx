import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import Modal from "./Modal";
import TaskItem from "./TaskItem";
import { IoIosAddCircleOutline } from "react-icons/io";

const API_URL = 'http://localhost:3000';

const CheckList = () => {
  const [todos, setTodos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editingChecklist, setEditingChecklist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChecklists();
  }, []);

  const fetchChecklists = async () => {
    try {
      const response = await fetch(`${API_URL}/checklists`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch checklists');
      const checklists = await response.json();
      setTodos(checklists);
    } catch (err) {
      setError("Failed to load checklists. Please try again.");
    }
  };

  const handleShowTask = (id) => {
    setSelectedId(id);
  };

  const handleCheckbox = async (todoId, taskId) => {
    try {
      const todo = todos.find(t => t._id === todoId);
      const task = todo.tasks.find(t => t._id === taskId);
      const updatedTask = { ...task, checked: !task.checked };
      
      const response = await fetch(`${API_URL}/checklists/${todoId}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ checked: updatedTask.checked })
      });
      
      if (!response.ok) throw new Error('Failed to update task');
      
      const updatedTodos = todos.map((t) => {
        if (t._id === todoId) {
          return {
            ...t,
            tasks: t.tasks.map((task) =>
              task._id === taskId ? updatedTask : task
            ),
          };
        }
        return t;
      });
      setTodos(updatedTodos);
    } catch (err) {
      setError("Failed to update task. Please try again.");
    }
  };

  const handleDeleteTask = async (todoId, taskId) => {
    try {
      const response = await fetch(`${API_URL}/checklists/${todoId}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete task');
      const updatedTodos = todos.map((todo) => {
        if (todo._id === todoId) {
          return {
            ...todo,
            tasks: todo.tasks.filter((task) => task._id !== taskId),
          };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (err) {
      setError("Failed to delete task. Please try again.");
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await fetch(`${API_URL}/checklists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newTodo)
      });
      if (!response.ok) throw new Error('Failed to create checklist');
      const createdChecklist = await response.json();
      setTodos([...todos, createdChecklist]);
    } catch (err) {
      setError("Failed to create checklist. Please try again.");
    }
  };

  const handleAddTaskToChecklist = async (checklistId, newTasks) => {
    try {
      const addedTasks = await Promise.all(newTasks.map(async task => {
        const response = await fetch(`${API_URL}/checklists/${checklistId}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(task)
        });
        if (!response.ok) throw new Error('Failed to add task');
        return response.json();
      }));
      const updatedTodos = todos.map((todo) => {
        if (todo._id === checklistId) {
          return {
            ...todo,
            tasks: [...todo.tasks, ...addedTasks],
          };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (err) {
      setError("Failed to add tasks. Please try again.");
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await fetch(`${API_URL}/checklists/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete checklist');
      const updatedTodos = todos.filter((todo) => todo._id !== todoId);
      setTodos(updatedTodos);
      if (selectedId === todoId) {
        setSelectedId(null);
      }
    } catch (err) {
      setError("Failed to delete checklist. Please try again.");
    }
  };

  const selectedTodo = todos.find((todo) => todo._id === selectedId);

  return (
    <div className="container mx-auto px-4 py-8">

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      <div className="flex flex-wrap gap-4 mb-8">
        {todos.map((todo) => (
          <div key={todo._id} className="flex items-center">
            <button
              className={`py-2 px-5 rounded-full flex items-center transition duration-150 ease-in-out ${
                selectedId === todo._id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => handleShowTask(todo._id)}
            >
              {todo.title}
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTodo(todo._id);
                }}
              >
                <GiCancel size={20} />
              </button>
            </button>
          </div>
        ))}

        <button
          className="flex flex-row items-center justify-center text-[#AD563B] transition duration-200 hover:scale-105 font-bold p-2 "
          onClick={() => setIsOpen(true)}
        >
          <IoIosAddCircleOutline size={25} className='mx-1' /> New Checklist
        </button>
      </div>

      {selectedTodo && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{selectedTodo.title}</h2>
          <button
            className="flex flex-row items-center justify-center text-[#AD563B] transition duration-200 hover:scale-105 font-bold p-2 rounded-full border-2 border-gray-700"
            onClick={() => {
              setEditingChecklist(selectedTodo);
              setIsOpen(true);
            }}
          > 
            <IoIosAddCircleOutline size={25} className='mx-1' />
            Add Task to Checklist
          </button>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-700">Pending Tasks</h3>
            {selectedTodo.tasks.filter(task => !task.checked).map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onCheckboxChange={() => handleCheckbox(selectedTodo._id, task._id)}
                onDelete={() => handleDeleteTask(selectedTodo._id, task._id)}
              />
            ))}
          </div>
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-medium text-gray-700">Completed Tasks</h3>
            {selectedTodo.tasks.filter(task => task.checked).map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onCheckboxChange={() => handleCheckbox(selectedTodo._id, task._id)}
                onDelete={() => handleDeleteTask(selectedTodo._id, task._id)}
              />
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <Modal
          onSave={editingChecklist ? handleAddTaskToChecklist : handleAddTodo}
          onClose={() => {
            setIsOpen(false);
            setEditingChecklist(null);
          }}
          existingChecklist={editingChecklist}
        />
      )}
    </div>
  );
};

export default CheckList;

