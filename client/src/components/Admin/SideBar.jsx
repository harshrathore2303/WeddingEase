import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/UseAuthStore";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const { logout } = useAuthStore();

  const navLinkClass = ({ isActive }) =>
    `text-white text-sm md:text-lg w-full text-center block border border-transparent transition px-4 py-2 rounded-lg transition font-medium tracking-wide ${
      isActive
        ? "bg-[#3e3c1b] border border-white shadow-inner"
        : "hover:bg-[#3e3c1b] hover:border hover:border-white"
    }`;

  return (
    <div className="flex font-serif">
      <div className="bg-[#2e2c15] text-white fixed h-full z-10 md:w-64 w-32 py-6 px-2 border-r border-[#797531]">
        {/* Sidebar Header */}
        <div className="mb-6 text-center">
          <h1 className="text-xl md:text-3xl font-bold text-white">
            Admin Panel
          </h1>
          <div className="mt-2 border-t border-[#797531]"></div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-3 text-center">
          <NavLink to="services" className={navLinkClass}>
            Services
          </NavLink>
          <div className="border-t border-[#797531]"></div>

          <NavLink to="profile" className={navLinkClass}>
            Profile
          </NavLink>
          <div className="border-t border-[#797531]"></div>
          <NavLink to="bookings" className={navLinkClass}>
            Bookings
          </NavLink>
          <div className="border-t border-[#797531]"></div>

          <NavLink
            to="/"
            onClick={logout}
            className="text-white text-sm md:text-lg w-full text-center flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-[#3e3c1b] hover:border hover:border-white transition font-medium"
          >
            <FaSignOutAlt />
            Logout
          </NavLink>
          <div className="border-t border-[#797531]"></div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
