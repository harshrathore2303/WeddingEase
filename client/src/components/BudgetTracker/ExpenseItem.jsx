import React from 'react';

const ExpenseItem = ({ id, title, amount, checked, onCheckboxChange }) => {
    return (
        <div className='flex justify-evenly py-2 px-5'>
            <div className='flex justify-evenly w-[350px]'>
                <span className={checked ? 'line-through' : ''}>{title}</span>
                <span className={checked ? 'line-through' : ''}>₹{amount}</span>
            </div>
            <input
                type='checkbox'
                checked={checked}
                onChange={() => onCheckboxChange(id, !checked)}
                className='mx-2'
            />
        </div>
    );
};

export default ExpenseItem;
