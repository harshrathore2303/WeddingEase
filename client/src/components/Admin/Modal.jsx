import React, { useState, useEffect } from "react";
import { useServiceStore } from "../../store/UseServiceStore";
import { LuLoader } from "react-icons/lu";

const Modal = ({ setOpen, editService }) => {
  const data = [
    "Hall",
    "Photographer",
    "Caterer",
    "Decorator",
    "Musician",
    "Dj",
    "Makeup Artist",
    "Mehendi Artist",
    "Planner",
    "Transporter",
    "Others",
  ];

  const { createService, isLoading, adminServices, updateService, error } =
    useServiceStore();

  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    location: "",
    dp: "",
    imageSet: [],
    tag: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageSet.length > 5) {
      alert("Only images up to 5 are allowed");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("location", formData.location);
    form.append("price", formData.price);
    form.append("tag", formData.tag);
    form.append("dp", formData.dp);

    for (let i = 0; i < formData.imageSet.length; i++) {
      form.append("imageSet", formData.imageSet[i]);
    }

    console.log(form);
    try {
      if (editService) {
        await updateService(editService._id, {
          title: formData.title,
          location: formData.location,
          price: formData.price,
          tag: formData.tag,
        });
      } else {
        await createService(form);
      }
      const { error: currentError } = useServiceStore.getState();

      if (!currentError) {
        await adminServices();
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      alert("Failed Operation");
    }
  };

  useEffect(() => {
    if (editService) {
      setFormData({
        title: editService.title,
        price: editService.price,
        location: editService.location,
        tag: editService.tag,
        dp: "",
        imageSet: [],
      });
    }
  }, [editService]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-serif">
      <div className="bg-[#fdfcf4] w-full max-w-md rounded-xl shadow-xl border border-[#dcd6a3] p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-3 text-xl font-bold text-[#3e3c1b] hover:text-red-500 transition"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-[#3e3c1b] mb-6">
          {editService ? "Edit Service" : "Create New Service"}
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 border border-[#ccc] rounded focus:ring-2 focus:ring-[#797531] outline-none"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full px-4 py-2 border border-[#ccc] rounded focus:ring-2 focus:ring-[#797531] outline-none"
            name="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />

          <input
            type="number"
            min={5}
            placeholder="Price"
            className="w-full px-4 py-2 border border-[#ccc] rounded focus:ring-2 focus:ring-[#797531] outline-none"
            name="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            required
          />

          {/* Tag Select */}
          <select
            className="w-full px-4 py-2 border border-[#ccc] bg-white rounded focus:ring-2 focus:ring-[#797531] outline-none"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            required
          >
            <option value="" disabled>
              Select Tag
            </option>
            {data.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* File Inputs */}
          <div className="space-y-2">
            <div>
              <label
                htmlFor="dp"
                className="text-[#3e3c1b] font-medium block mb-1"
              >
                Display Picture
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm"
                id="dp"
                onChange={(e) =>
                  setFormData({ ...formData, dp: e.target.files[0] })
                }
                required={!editService}
                disabled={editService}
              />
            </div>

            <div>
              <label
                htmlFor="sp"
                className="text-[#3e3c1b] font-medium block mb-1"
              >
                Sample Images (Max 5)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="w-full text-sm"
                id="sp"
                onChange={(e) =>
                  setFormData({ ...formData, imageSet: e.target.files })
                }
                required={!editService}
                disabled={editService}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#3e3c1b] hover:bg-[#2e2c15] text-white py-2 rounded-lg text-lg font-medium transition flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <LuLoader className="animate-spin h-5 w-5" />
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
