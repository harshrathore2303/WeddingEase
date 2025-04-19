import React from "react";
import hallsData from "../../assets/data/halls.json";
import photo from "../../assets/data/photographer.json";
import caterers from "../../assets/data/caterers.json";
import Items from "./Items";
import { Outlet } from "react-router-dom";

export default function WeddingServices() {


  return (
    <div className="px-4 md:px-16 lg:px-36 py-6 font-serif">
      {/* Heading */}
      <h1 className="text-3xl text-center font-semibold mb-6">
        Organize Your Wedding
      </h1>

      {/* Halls Section */}
      <Items data={hallsData}/>
      <Items data={photo}/>
      <Items data={caterers}/>

      <Outlet/>
    </div>
  );
}
