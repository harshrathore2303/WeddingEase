import React, { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import Slider from "../Slider";
import { useLocation } from "react-router-dom";
import halls from "../../assets/data/halls.json";
import photographer from "../../assets/data/photographer.json";
import caterers from "../../assets/data/caterers.json"
import Loading from "../Loading";

const ShowDetails = () => {
  const location = useLocation();
  const [item, setItem] = useState({});

  const queryParams = new URLSearchParams(location.search);
  const tag = queryParams.get("tag");
  const id = queryParams.get("id");
  // console.log(tag);
  // console.log(id);

  useEffect(() => {
    if (tag === "halls") {
      setItem(halls.find((hall) => hall.id === Number(id)));
    } else if (tag === "photographer") {
      setItem(photographer.find((photo) => photo.id === Number(id)))
    } else if (tag === "caterers") {
      setItem(caterers.find((caterer) => caterer.id === Number(id)))
    }
  }, [tag, id]);
  console.log(item);
  return (
    !item || !item.imageSet ? <Loading/> :
    <div className="flex justify-between mx-36 font-serif">
      <div>
        <Slider slides={item.imageSet} />
      </div>
      <div className="m-4 md:w-full bg-red-800 relative h-[300px]">
        <div className="flex justify-between">
          <div>{item.title}</div>
          <div>{item.rating}★</div>
        </div>

        <h3>{item.location}</h3>
        <span>price₹{item.price}</span>

        <div className="flex justify-center space-x-6 absolute bottom-0 left-0 w-full">
          <button>button1</button>
          <button>button2</button>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
