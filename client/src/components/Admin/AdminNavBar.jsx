import React from "react";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useAuthStore } from "../../store/UseAuthStore";

export default function AdminNavBar() {
  const { logout } = useAuthStore();

  return (
    <nav className="flex items-center justify-between py-5 px-6 bg-[#F6F6F6] shadow-md font-serif w-full sticky top-0 z-50">
      {/* Logo */}
      <div className="text-lg md:text-3xl font-semibold text-gray-800">
        Admin Dashboard
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-2 px-4 py-1 text-white rounded bg-base-but hover:bg-base-butHover transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </nav>
  );
}
