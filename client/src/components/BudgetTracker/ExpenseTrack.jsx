import React, { useState, useEffect } from 'react';
import { FaRupeeSign } from "react-icons/fa";
import ExpenseItem from './ExpenseItem';

const ExpenseTrack = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchBudgetItems();

        const onBudgetChange = () => fetchBudgetItems();
        window.addEventListener('budgetChange', onBudgetChange);

        return () => window.removeEventListener('budgetChange', onBudgetChange);
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
        } catch (error) {
            console.error('Error fetching budget items:', error);
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

    const totalAmount = categories.reduce((total, category) => total + category.amount, 0);
    const checkedAmount = categories.reduce((total, category) => category.checked ? total + category.amount : total, 0);
    const remainingAmount = totalAmount - checkedAmount;

    return (
        <div className=''>
            <div className='bg-[#F4F4FF] w-[400px] rounded-lg shadow-lg border-gray-300 border'>
                <div className='flex justify-center font-inria font-bold items-center py-2 w-full bg-[#DADAE6] rounded-lg shadow-lg'>
                    <FaRupeeSign size={15} className='mx-1' />
                    Total Expense
                </div>

                {categories.map((category) => (
                    <ExpenseItem
                        key={category._id}
                        id={category._id}
                        title={category.title}
                        amount={category.amount}
                        checked={category.checked}
                        onCheckboxChange={handleCheckboxChange}
                    />
                ))}

                <div className='flex justify-evenly px-5 py-5 border-t-gray-300 border-t-2'>
                    <div className='flex justify-evenly w-[350px]'>
                        <span>Total Amount</span>
                        <span>₹{totalAmount}</span>
                    </div>
                </div>
                <div className='flex justify-evenly px-5 py-1'>
                    <div className='flex justify-evenly w-[350px]'>
                        <span>Remaining</span>
                        <span>₹{remainingAmount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTrack;
