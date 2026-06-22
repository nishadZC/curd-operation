import { BrowserRouter, Routes, Route } from "react-router-dom";
import Studios from "./components/display_services/Addphotographer"
import Home from "./components/Home"
import GetStudios from "./components/display_services/GetPhotographer";
import UploadImages from "./components/display_services/UploadImages";
import GetPhotographerDetail from "./components/display_services/GetPhotographerDetail";
import SubEvent from "./components/display_services/SubEvent";
import Contact from "./components/Contact";
import FetchSubEvent from "./components/display_services/FetchSubEvent";
import Package from "./components/package/AddPackage";
import GetPackage from "./components/package/GetPackage";
import Login from "./components/Login";
import UserForm from "./components/package/Userform";
import AdminDashboard from "./components/package/AdminHome";
import Header from "./components/Header";
import { Navigate } from "react-router-dom";
import { useState } from "react";
const App = () => {

  const [service, setServiceState] = useState(localStorage.getItem("service") || "");
  const [packageType, setPackageTypeState] = useState(localStorage.getItem("packageType") || "");
  const [admin, setAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  const setService = (value) => {
    localStorage.setItem("service", value);
    setServiceState(value);
  };

  const setPackageType = (value) => {
    localStorage.setItem("packageType", value);
    setPackageTypeState(value);
  };


  return (

    <BrowserRouter>
      <Header admin={admin} setAdmin={setAdmin} />
      <Routes>
       <Route path="/" element={<Home setService={setService} setPackageType={setPackageType} admin={admin} setAdmin={setAdmin} />} />

        <Route path="/addStudios" element={<Studios service={service} />} />
        <Route path="/getStudios" element={<GetStudios service={service} admin={admin} />} />
        <Route path="/uploadImages/:studioId" element={<UploadImages service={service} />} />
        <Route path="/getPhotographerImages/:studioId" element={<GetPhotographerDetail service={service} admin={admin} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/subevents/:studioId" element={<SubEvent service={service} />} />
        <Route path="/studios/:studioId/subevents" element={<FetchSubEvent />} />
        <Route path="/add_package" element={<Package service={service} packageType={packageType} />} />
        <Route path="/get_package" element={<GetPackage setService={setService} packageType={packageType} admin={admin} />} />
        <Route
          path="/login"
          element={
            admin
              ? <Navigate to="/admin_home" replace />
              : <Login setAdmin={setAdmin} />
          }
        />
        <Route path="/user_form/:packageId" element={<UserForm />} />
        <Route path="/admin_home" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
