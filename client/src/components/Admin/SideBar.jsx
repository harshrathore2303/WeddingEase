//Sidebar.js
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/UseAuthStore";
import { FaBell, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const { logout } = useAuthStore();
  // const navigate = useNavigate();
  // const handleLogout = () => {
  //   logout();
  //   navigate('/home');
  // }


  return (
    <div className="flex font-serif">
      {/* Sidebar */}
      <div
        className="bg-base-but text-white 
                    fixed h-screen transition-all 
                    duration-300 z-10 md:w-64 w-32"
      >
        {/* Sidebar content */}
        <div className="flex flex-col items-center px-2">
          <div className="text-lg md:text-3xl font-semibold text-gray-800 text-center">
            Admin Dashboard
          </div>
          <div className="border border-[#797531] w-full"></div>

          <div className="my-2 text-center w-full">
            <NavLink
              to="services"
              className="text-white hover:bg-[#3e3c1b] border border-transparent hover:border-white hover:transition rounded-lg text-sm md:text-lg inline-block w-full"
            >
              Services
            </NavLink>
          </div>
          <div className="border border-[#797531] w-full"></div>
          <div className="my-2 text-center w-full">
            <NavLink
              to="profile"
              className="text-white hover:bg-[#3e3c1b] border border-transparent hover:border-white hover:transition rounded-lg text-sm md:text-lg inline-block w-full"
            >
              Profile
            </NavLink>
          </div>
          <div className="border border-[#797531] w-full"></div>
          <div className="my-2 text-center w-full">
            <NavLink
              to="notifications"
              className="text-white hover:bg-[#3e3c1b] border border-transparent hover:border-white hover:transition rounded-lg text-sm md:text-lg inline-block w-full"
            >
              Notifications
            </NavLink>
          </div>
          <div className="border border-[#797531] w-full"></div>
          <div className="my-2 text-center w-full">
            <NavLink
              to="/"
              className="text-white hover:bg-[#3e3c1b] border border-transparent hover:border-white hover:transition rounded-lg text-sm md:text-lg w-full text-center flex items-center justify-center gap-2"
              onClick={logout}
            >
              <FaSignOutAlt />
              Logout
            </NavLink>
          </div>
          <div className="border border-[#797531] w-full"></div>
        </div>
      </div>
      {/* Main content */}
    </div>
  );
};

export default Sidebar;
