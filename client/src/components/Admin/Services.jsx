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
    <div className="md:ml-64 ml-32 p-4 min-h-screen bg-[#fdfcf4] font-serif">
      {/* Header with Create button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#3e3c1b]">
          Manage Services
        </h2>
        <button
          className="px-4 py-2 text-white rounded-md bg-[#3e3c1b] hover:bg-[#2e2c15] transition"
          onClick={() => {
            setEditService(null);
            setOpen(true);
          }}
        >
          + Create Service
        </button>
      </div>

      {open && <Modal setOpen={setOpen} editService={editService} />}

      {/* Services Table */}
      <div className="overflow-x-auto bg-white rounded-xl border border-[#dcd6a3] shadow">
        <table className="w-full table-auto min-w-[800px]">
          <thead className="bg-[#3e3c1b] text-white text-sm uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4 text-left">Dp</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Tag</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm text-[#3e3c1b] divide-y divide-gray-200 bg-white">
            {servicesByAdmin.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-[#f5f4ea] transition duration-200 ease-in-out"
              >
                <td className="py-3 px-4">
                  <img
                    src={item.dp}
                    alt="service"
                    className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm"
                    loading="lazy"
                  />
                </td>
                <td className="py-3 px-4">{item.title}</td>
                <td className="py-3 px-4">{item.tag}</td>
                <td className="py-3 px-4">{item.location}</td>
                <td className="py-3 px-4 font-medium text-green-700">
                  ₹{item.price}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center items-center gap-4">
                    <button
                      title="Edit"
                      className="text-[#3e3c1b] hover:text-black"
                      onClick={() => {
                        setEditService(item);
                        setOpen(true);
                      }}
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      title="Delete"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(item._id)}
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
