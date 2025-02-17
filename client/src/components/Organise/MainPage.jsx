import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import halls from "../../assets/data/halls.json";
import photographer from "../../assets/data/photographer.json";
import caterers from "../../assets/data/caterers.json";
import Card from "./Card";

const MainPage = () => {
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const tag = queryParams.get("tag");
  // console.log(tag);

  useEffect(() => {
    if (tag === "halls") {
      setItems(halls);
    } else if (tag === "photographer") {
      setItems(photographer);
    } else if (tag === "caterers") {
      setItems(caterers);
    }
  }, []);
  // console.log(items);
  return (
    <div className="px-4 md:px-16 lg:px-36 py-6 font-serif">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 border-2 rounded-xl pl-2 border-gray-700">
          <FaSearch />
          <input
            type="text"
            placeholder="Search"
            className="m-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 border-2 p-1 rounded-xl font-bold border-gray-700">
          <FaFilter />
          Filter
        </button>
      </div>

      <section className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-1">
          {items && items.length > 0 ? (
            items.map((item) => <Card key={item.id} detail={item} id={item.id}/>)
          ) : (
            <div className="text-center w-full">No items found</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
