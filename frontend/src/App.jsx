import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctor from "./pages/Doctors";
import Login from "./pages/Login";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <Navbar className="sticky top-0 z-[1000] " />

      <main className="w-full min-w-0">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Informational pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Doctors */}
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/doctors/:speciality" element={<Doctor />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />

          {/* User pages */}
          <Route
            path="/my-appointments"
            element={<MyAppointments />}
          />

          <Route
            path="/my-profile"
            element={<MyProfile />}
          />

          {/* Appointment booking */}
          <Route
            path="/appointment/:docId"
            element={<Appointment />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;