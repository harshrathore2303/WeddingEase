import React from 'react'
import { CgChevronRight } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

const CustomButton = ({title, width, padding, address}) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(address);
        console.log(address);
    }
  return (
    <button
      style={{
        width: width,
        padding: padding,
      }}
      className="bg-base-but rounded-full mt-8 hover:bg-base-butHover hover:text-white transition duration-100 flex items-center justify-center"
      onClick={handleClick}
    >
      {title}
      <CgChevronRight size={25} className="ml-2" />
    </button>
  )
}

export default CustomButton