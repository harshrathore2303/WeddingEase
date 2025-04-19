import { useEffect } from "react";
import Footer from "./components/Footer";
// import HallsPage from "./components/Halls/HallsPage";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar";
import PlanningTools from "./components/PlanningTools";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import Notfound from "./components/Notfound";
import LoginPage from "./components/Login/LoginPage";
import SignupPage from "./components/Login/SignupPage";
import WeddingServices from "./components/Organise/WeddingServices";
import MainPage from "./components/Organise/MainPage";
import ShowDetails from "./components/Organise/ShowDetails";
import Login from "./components/Admin/Authentication/AdminLogin";
import { useAuthStore } from "./store/UseAuthStore";
import { LuLoader } from "react-icons/lu";
import ConfirmPage from "./components/Booking/ConfirmPage";
import AdminLogin from "./components/Admin/Authentication/AdminLogin";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

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
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/organize" element={<WeddingServices />}/>
        <Route path="/organize/mainpage/:tag" element={<MainPage />} />
        <Route path="/organize/mainpage/:tag/:id" element={<ShowDetails/>}/>
        <Route path="/planning-tools" element={authUser ? <PlanningTools /> : <Navigate to="/login"/>} />
        <Route path="/login" element={!authUser ? <LoginPage />:<Navigate to="/" />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/confirmed" element={<ConfirmPage/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

// {
//   <NavBar />
//       {/* <Home /> */}
//       <Routes>
//         <Route path="/mainpage" element={<MainPage/>}/>
//         <Route path="/mainpage/showdetails" element={<ShowDetails/>}/>
//         <Route path="/" element={<Navigate to="/home" />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/planning-tools" element={<PlanningTools />} />
//         <Route path="/organize" element={<WeddingServices />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="*" element={<Notfound />} />
//         <Route path="/admin/login" element={<Login/>}/>
//       </Routes>
//       {/* <Footer /> */}
// }
