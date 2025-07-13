import React from 'react'

const CustomButton = ({ title, icon: Icon, onClick }) => {
  return (
    <div className='transition ease-out duration-200 hover:scale-110'>
      <button className='p-2 bg-base-but text-white hover:bg-base-butHover border-2 border-gray-300 rounded-lg flex items-center' onClick={onClick}>
        {Icon && <Icon size={20} className='mr-2' />}
        {title}
      </button>
    </div>
  );
}

export default CustomButton