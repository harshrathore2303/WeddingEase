import { useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import PlanningTools from "./components/PlanningTools/PlanningTools";
import { Routes, Route, Navigate } from "react-router-dom";
import Notfound from "./components/Notfound/Notfound";
import LoginPage from "./components/Login/LoginPage";
import SignupPage from "./components/Login/SignupPage";
import MainPage from "./components/Organise/MainPage";
import ShowDetails from "./components/Organise/ShowDetails";
import { useAuthStore } from "./store/UseAuthStore";
import { LuLoader } from "react-icons/lu";
import ConfirmPage from "./components/Booking/ConfirmPage";
import Dashboard from "./components/Admin/Dashboard";
import Notifications from "./components/Notification/Notifications";

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
      {!isAdmin && <NavBar />}
      <Routes>
        {isAdmin && (
          <>
            <Route
              path="/"
              element={<Navigate to="/admin/dashboard/services" />}
            />
            <Route path="/admin/dashboard/*" element={<Dashboard />} />
          </>
        )}

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={<Notifications />}
        />
        {!isAdmin && (
          <>
            <Route path="*" element={<Notfound />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/organize" element={<MainPage />} />
            <Route
              path="/organize/detail/:tag/:id"
              element={<ShowDetails />}
            />
            <Route
              path="/planning-tools"
              element={authUser ? <PlanningTools /> : <Navigate to="/login" />}
            />
            <Route path="/confirmed" element={<ConfirmPage />} />
          </>
        )}
      </Routes>

      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
