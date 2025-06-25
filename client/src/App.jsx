import { useEffect } from "react";
import Footer from "./components/Footer/Footer";
// import HallsPage from "./components/Halls/HallsPage";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import PlanningTools from "./components/PlanningTools";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import Notfound from "./components/Notfound";
import LoginPage from "./components/Login/LoginPage";
import SignupPage from "./components/Login/SignupPage";
import WeddingServices from "./components/Organise/WeddingServices";
import MainPage from "./components/Organise/MainPage";
import ShowDetails from "./components/Organise/ShowDetails";
import { useAuthStore } from "./store/UseAuthStore";
import { LuLoader } from "react-icons/lu";
import ConfirmPage from "./components/Booking/ConfirmPage";
import Dashboard from "./components/Admin/Dashboard";

function App() {
  const { authUser, checkAuth, isCheckingAuth, isAdmin } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LuLoader className="animate-spin" size={45} />
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] min-h-screen flex flex-col">
      <NavBar />
      <Routes>
        <Route
          path="/admin/dashboard"
          element={isAdmin ? <Dashboard /> : <Navigate to="/" />}
        />
        
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={!isAdmin ? <Navigate to="/home" /> : <Dashboard />} />
        <Route path="/home" element={!isAdmin ? <Home /> : <Dashboard />} />
        <Route path="/organize" element={!isAdmin ? <WeddingServices /> : <Dashboard />} />
        <Route path="/organize/mainpage/:tag" element={!isAdmin ? <MainPage /> : <Dashboard />} />
        <Route path="/organize/mainpage/:tag/:id" element={!isAdmin ? <ShowDetails /> : <Dashboard />} />
        <Route
          path="/planning-tools"
          element={authUser ? !isAdmin && <PlanningTools /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route path="/confirmed" element={<ConfirmPage />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
