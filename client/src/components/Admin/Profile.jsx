import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = () => {
    console.log("Updating profile:", formData);
    // Connect to your backend here
  };

  return (
    <div className="md:ml-64 ml-32 p-4 min-h-screen flex items-center justify-center bg-[#fdfcf4] font-serif">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-8 border border-[#dcd6a3]">
        <h2 className="text-3xl font-bold text-center text-[#3e3c1b] mb-8">
          Update Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#3e3c1b] mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#797531]"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3e3c1b] mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#797531]"
              placeholder="johndoe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3e3c1b] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#797531]"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3e3c1b] mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#797531]"
              placeholder="+91 1234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3e3c1b] mb-1">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#797531]"
              placeholder="********"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3e3c1b] mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#797531]"
              placeholder="********"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleUpdate}
            className="bg-[#3e3c1b] text-white px-6 py-2 rounded-lg hover:bg-[#2e2c15] transition"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
