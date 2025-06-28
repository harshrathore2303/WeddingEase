import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import { useServiceStore } from "../../store/UseServiceStore";

const Services = () => {
  const [open, setOpen] = useState(false);
  const {services, fetchServices, adminServices} = useServiceStore();

  useEffect(() => {
    adminServices();
  }, []);

  // console.log(services)
  return (
    <div className="md:ml-64 ml-32 p-4 h-screen">
      <div className="text-right">
        <button className="px-4 py-1 text-white rounded bg-base-but hover:bg-base-butHover transition" onClick={() => setOpen(true)}>
          Create Service
        </button>
      </div>

      {open && <Modal setOpen={setOpen}/>}

      <table className="w-full table-auto border-black border shadow-md rounded-lg mt-5">
        <thead className="text-center font-bold">
          <tr>
            <th className="border border-black py-2 px-4">Dp</th>
            <th className="border border-black py-2 px-4">Title</th>
            <th className="border border-black py-2 px-4">Tag</th>
            <th className="border border-black py-2 px-4">Location</th>
            <th className="border border-black py-2 px-4">Price</th>
            <th className="border border-black py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {
            
          }
          <tr>
            <td className="border border-black px-4 py-2">
              <img
                src="https://img.freepik.com/premium-photo/great-picture-image-will-make-your-work-more-beautiful_987032-102143.jpg"
                alt="img"
                className="object-cover w-16 h-16 rounded-full"
              />
            </td>
            <td className="border border-black px-4 py-2">blah blah blah</td>
            <td className="border border-black px-4 py-2">blah blah blah</td>
            <td className="border border-black px-4 py-2">blah blah blah</td>
            <td className="border border-black px-4 py-2">blah blah blah</td>
            <td className="border border-black px-4 py-2 space-x-4">
              <button>delete</button>
              <button>edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Services;
