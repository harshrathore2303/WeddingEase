import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Card = ({ id, detail }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[300px] w-full bg-[#f6f6f6] shadow-lg rounded-xl flex flex-col overflow-hidden p-3">
      {/* Image Section */}
      <div className="relative w-full h-40 md:h-56">
        <img
          src={detail.dp}
          alt="image"
          className="w-full h-full object-cover rounded-xl shadow-inner"
        />
        <div className="absolute top-2 right-2 flex items-center text-white bg-yellow-500 rounded-xl px-2 py-1 text-sm">
          <span>{detail.rating}</span>
          <span>★</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-medium mt-3 text-gray-800 truncate">
        {detail.title}
      </h2>

      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mt-2 w-fit">
        {detail.tag}
      </span>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
        <IoLocationSharp className="text-red-500" />
        <span className="underline underline-offset-2">{detail.location}</span>
      </div>

      {/* Price */}
      <div className="text-gray-800 text-base font-medium mt-2">
        Price: <span className="text-green-600">₹{detail.price}</span>
      </div>

      {/* Button */}
      <button
        className="w-full bg-base-but text-white rounded-lg py-2 mt-4 hover:bg-base-butHover transition"
        onClick={() => {
          navigate(`/organize/mainpage/${detail.tag}/${id}`);
        }}
      >
        Book Now
      </button>
    </div>
  );
};

export default Card;
