import "./App.css";
import Footer from "./components/Footer";
// import HallsPage from "./components/Halls/HallsPage";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar";
import PlanningTools from "./components/PlanningTools";
import { Routes, Route, Navigate } from "react-router-dom";
import Notfound from "./components/Notfound";
import LoginPage from "./components/Login/LoginPage";
import SignupPage from "./components/Login/SignupPage";
import WeddingServices from "./components/Organise/WeddingServices";
// import Photographer from "./components/Photography/Photographer";
// import HallDetails from "./components/Halls/HallDetails";
// import PhotographerDetails from "./components/Photography/PhotoGrapherDetails";
import MainPage from "./components/Organise/MainPage";
import ShowDetails from "./components/Organise/ShowDetails";

function App() {
  return (
    <div className="bg-[#ffffff]">
      <NavBar />
      {/* <Home /> */}
      <Routes>
        <Route path="/mainpage" element={<MainPage/>}/>
        <Route path="/mainpage/showdetails" element={<ShowDetails/>}/>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/planning-tools" element={<PlanningTools />} />
        <Route path="/organize" element={<WeddingServices />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
