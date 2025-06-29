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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-2 right-3 text-xl font-bold text-gray-700 hover:text-red-500"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {editService ? "Edit Service" : "Create New Service"}
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border border-gray-500 rounded"
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
            className="w-full p-2 border border-gray-500 rounded"
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
            className="w-full p-2 border border-gray-500 rounded"
            name="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            required
          />

          <select
            className="w-full p-2 border rounded bg-base-but"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            required
          >
            <option value="" className="border border-black">
              Select Tag
            </option>
            {data.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>

          <div className="">
            <label htmlFor="dp" className="font-semibold">
              Display Picture:{" "}
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              id="dp"
              onChange={(e) =>
                setFormData({ ...formData, dp: e.target.files[0] })
              }
              required={!editService}
              disabled={editService}
            />

            <label htmlFor="sp" className="font-semibold">
              Sample Picture:{" "}
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full"
              id="sp"
              onChange={(e) =>
                setFormData({ ...formData, imageSet: e.target.files })
              }
              required={!editService}
              disabled={editService}
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="bg-base-but hover:bg-base-butHover  text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <LuLoader className="h-5 w-5 animate-spin" />
                Loading...
              </div>
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
