import { Routes, Route } from "react-router-dom";
import React from "react";
import AdminLogin from "./components/Admin/Authentication/AdminLogin";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard";
const AdminApp = () => {
    return <section className="bg-[#e61b1b] min-h-screen">
        <Routes>
        <Route path="/admin/login" element={<AdminDashboard/>}/>
        </Routes>
    </section>
}

export default AdminApp;