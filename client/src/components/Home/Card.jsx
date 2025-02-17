import React from "react";

export const Card = ({ item }) => {
  return (
    <div className="bg-[#F6F6F6] w-[300px] md:w-[500px] shadow-lg rounded-lg p-4 flex items-center">
      <div>
        <img
          src={item.img}
          alt={item.title}
          className="aspect-square w-[150px] md:w-[200px] rounded-lg object-cover"
        />
      </div>
      <div className="p-4">
        <q className="text-xl font-medium">{item.title}</q>
        <p className="text-black mt-2 font-thin hidden md:flex">{item.text}</p>
      </div>
    </div>
  );
};
