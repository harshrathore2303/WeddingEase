import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./SideBar";
import Profile from "./Profile";
import Services from "./Services";
import Bookings from "./Booking";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div className="flex-1 w-screen">
        <Routes>
          <Route path="services" element={<Services />} />
          <Route path="profile" element={<Profile />} />
          <Route path="bookings" element={<Bookings/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
