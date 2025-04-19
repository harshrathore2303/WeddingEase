import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import BudgetModal from './BudgetModal';
import { FaRegTrashAlt } from "react-icons/fa";
import useBudgetStore from '../../store/useBudgetStore';

const BudgetManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { categories, fetchBudgetItems, addBudgetItem, deleteBudgetItem, updateBudgetItem } = useBudgetStore();

    useEffect(() => {
        fetchBudgetItems();
    }, [fetchBudgetItems]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onClickTrash = (id) => {
        deleteBudgetItem(id);
    };

    const addCategory = (newCategory) => {
        addBudgetItem(newCategory);
        closeModal();
    };

    const handleCheckboxChange = (id, checked) => {
        updateBudgetItem(id, checked);
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
