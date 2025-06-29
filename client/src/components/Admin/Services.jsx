import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import { useServiceStore } from "../../store/UseServiceStore";
import { MdDelete, MdEdit } from "react-icons/md";

const Services = () => {
  const [open, setOpen] = useState(false);
  const { servicesByAdmin, adminServices, deleteService } = useServiceStore();
  const [editService, setEditService] = useState(null);

  useEffect(() => {
    adminServices();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService(id);
    }
  };
  return (
    <div className="md:ml-64 ml-32 p-4 h-screen">
      <div className="text-right">
        <button
          className="px-4 py-1 text-white rounded bg-base-but hover:bg-base-butHover transition"
          onClick={() => {setEditService(null); setOpen(true)}}
        >
          Create Service
        </button>
      </div>

      {open && <Modal setOpen={setOpen} editService={editService}/>}

      <table className="w-full table-auto shadow-lg rounded-xl overflow-hidden mt-5">
        <thead className="bg-base-but text-white text-md font-semibold">
          <tr>
            <th className="py-3 px-4">Dp</th>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Tag</th>
            <th className="py-3 px-4">Location</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>

        <tbody className="text-center text-sm bg-white">
          {servicesByAdmin.map((item, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-100 transition-colors duration-200 border-b"
            >
              <td className="py-3 px-4">
                <div className="flex justify-center">
                  <img
                    src={item.dp}
                    alt="img"
                    className="w-14 h-14 rounded-full object-cover border shadow"
                  />
                </div>
              </td>
              <td className="py-3 px-4">{item.title}</td>
              <td className="py-3 px-4">{item.tag}</td>
              <td className="py-3 px-4">{item.location}</td>
              <td className="py-3 px-4 font-medium text-green-600">
                ₹{item.price}
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center items-center gap-3">
                  <button
                    title="Edit"
                    className="text-gray-600 hover:text-gray-800 p-1"
                    onClick={() => {
                      setEditService(item);
                      setOpen(true);
                    }}
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    title="Delete"
                    className="text-red-600 hover:text-red-800 p-1"
                    onClick={() => handleDelete(item._id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Services;
