import React, { useEffect, useState } from "react";
import { FaHome, FaBell, FaTools, FaUserAlt } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/UseAuthStore";
import useNotificationStore from "../../store/useNotificationStore";

export default function NavBar() {
  const { authUser, logout } = useAuthStore();
  const { countNotifications, count } = useNotificationStore();

  useEffect(() => {
    countNotifications();
  }, []);

  const [toggle, setToggle] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);

  const address = [
    {
      id: 1,
      name: "Home",
      address: "/home",
      icon: FaHome,
    },
    {
      id: 2,
      name: "Organize",
      address: "/organize",
      icon: IoPeople,
    },
    {
      id: 3,
      name: "Planning Tools",
      address: "/planning-tools",
      icon: FaTools,
    },
  ];

  return (
    <>
      <nav className="flex items-center justify-between py-5 px-3 bg-[#F6F6F6] shadow-lg font-serif w-full sticky top-0 z-50">
        <div className="md:text-3xl md:font-medium text-2xl">
          <h2>WedEase</h2>
        </div>

        <div className="md:flex space-x-8 hidden items-center">
          {address.map((item, index) => (
            <NavLink
              to={item.address}
              key={index}
              className={({ isActive }) =>
                `hover:underline ${
                  isActive ? "text-blue-700 underline" : ""
                } underline-offset-8`
              }
              onClick={() => {
                setToggle(false);
                setToggleProfile(false);
              }}
            >
              <div className="flex gap-2 items-center text-[18px]">
                <item.icon size={25} />
                {item.name}
              </div>
            </NavLink>
          ))}

          <div
            className="relative bg-gray-300 rounded-full inline-block aspect-square cursor-pointer"
          >
            <FaUserAlt
              size={20}
              className="m-2 hover:ease-out transition hover:scale-110 duration-100"
              onClick={() => setToggleProfile((prev) => !prev)}
            />
            {toggleProfile && (
              <div className="absolute bg-white border border-gray-800 rounded-lg right-0 mt-3 w-40 overflow-hidden">
                {authUser ? (
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block px-4 py-2 ${
                        isActive ? "bg-base-but text-white" : "text-black"
                      }`
                    }
                    onClick={() => {
                      setToggleProfile(false);
                      logout();
                    }}
                  >
                    Log out
                  </NavLink>
                ) : (
                  <div>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `block px-4 py-2 ${
                          isActive ? "bg-base-but text-white" : "text-black"
                        }`
                      }
                      onClick={() => setToggleProfile(false)}
                    >
                      Log in
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </div>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `hover:underline ${
                isActive ? "text-blue-700 underline" : ""
              } underline-offset-8`
            }
          >
            <span className="relative">
              <sub className={`absolute top-0 right-0 text-red-800 ${count == 0 ? "hidden" : ""}`}>{count}</sub>
              <FaBell
                size={25}
                className="mx-2 cursor-pointer hover:ease-out transition hover:scale-110 duration-100"
              />
            </span>
          </NavLink>
        </div>

        <div className="md:hidden items-center flex space-x-4">
          <div className="relative">
            <HiDotsVertical
              onClick={() => {
                setToggle((prev) => !prev);
                setToggleProfile(false);
              }}
            />

            {toggle && (
              <div className="absolute rounded-lg right-0 mt-3 w-40 bg-white border-black border overflow-hidden">
                {address.map((item, index) => (
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center py-1 gap-1 ${
                        isActive ? "bg-base-but text-white" : "text-black"
                      }`
                    }
                    key={index}
                    to={item.address}
                    onClick={() => setToggle(false)}
                  >
                    <item.icon />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative bg-gray-300 rounded-full inline-block aspect-square cursor-pointer"
            onClick={() => {
              setToggleProfile((prev) => !prev);
              setToggle(false);
            }}
          >
            <FaUserAlt size={20} className="m-2" />
            {toggleProfile && (
              <div className="absolute rounded-lg right-0 mt-3 w-40 bg-white border border-black overflow-hidden">
                {authUser ? (
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block px-4 py-2 ${
                        isActive ? "bg-base-but text-white" : "text-black"
                      }`
                    }
                    onClick={() => {
                      setToggleProfile(false);
                      logout();
                    }}
                  >
                    Log out
                  </NavLink>
                ) : (
                  <div>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `block px-4 py-2 ${
                          isActive ? "bg-base-but text-white" : "text-black"
                        }`
                      }
                      onClick={() => setToggleProfile(false)}
                    >
                      Log in
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </div>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `hover:underline ${
                isActive ? "text-blue-700 underline" : ""
              } underline-offset-8`
            }
          >
            <span className="relative">
              <sub className={`absolute top-0 right-0 text-red-800 ${count == 0 ? "hidden" : ""}`}>{count}</sub>
              <FaBell
                size={20}
                className="mx-2 cursor-pointer hover:ease-out transition hover:scale-110 duration-100"
              />
            </span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}
