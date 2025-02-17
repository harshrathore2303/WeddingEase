import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import BudgetModal from './BudgetModal';
import { FaRegTrashAlt } from "react-icons/fa";

const BudgetManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchBudgetItems();
    }, []);

    const fetchBudgetItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/budget', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setCategories(data);

            window.dispatchEvent(new Event('budgetChange'));
        } catch (error) {
            console.error('Error fetching budget items:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onClickTrash = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:3000/budget/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchBudgetItems();
        } catch (error) {
            console.error('Error deleting budget item:', error);
        }
    };

    const addCategory = async (newCategory) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/budget', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newCategory)
            });
            if (response.ok) {
                fetchBudgetItems();
                closeModal();
            }
        } catch (error) {
            console.error('Error adding budget item:', error);
        }
    };

    const handleCheckboxChange = async (id, checked) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:3000/budget/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ checked })
            });
            fetchBudgetItems();
        } catch (error) {
            console.error('Error updating budget item:', error);
        }
    };

    return (
        <div className=''>
            <div className='w-[350px] bg-[#F4F4FF] rounded-lg shadow-lg border-gray-300 border'>
                <div className='flex  bg-[#DADAE6] rounded-lg justify-center font-inria shadow-lg flex-col transition duration-200 hover:scale-105'>
                    <button className='flex flex-row items-center justify-center text-[#AD563B] transition transform font-bold py-2' onClick={openModal}>
                        <IoIosAddCircleOutline size={20} className='mx-1' />
                        Add Category
                    </button>
                </div>
                {isModalOpen && <BudgetModal closeModal={closeModal} addCategory={addCategory} />}

                <div className='flex font-inria py-2 border-t-2 border-t-gray-300 justify-between px-4 font-bold'>
                    <div>Category</div>
                    <div className='flex-1 text-center'>Amount</div>
                </div>

                {categories.map((category) => (
                    <div key={category._id} className='flex justify-between items-center font-inria py-2 border-t-2 border-t-gray-300 px-4'>
                        <div className="flex items-center">
                            <span>{category.title}</span>
                        </div>
                        <p className={category.checked ? 'line-through' : ''}>₹{category.amount}</p>
                        <FaRegTrashAlt size={20} className='text-gray-500 cursor-pointer' onClick={() => onClickTrash(category._id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BudgetManagement;
