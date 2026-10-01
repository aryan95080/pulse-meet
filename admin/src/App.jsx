import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./Pages/Login";

import Dashboard from "./Pages/Admin/Dashboard";
import AllAppointments from "./Pages/Admin/AllAppointments";
import AddDoctor from "./Pages/Admin/AddDoctor";
import DoctorsList from "./Pages/Admin/DoctorsList";

import DoctorDashboard from "./Pages/Doctor/DoctorDashboard";
import DoctorProfile from "./Pages/Doctor/DoctorProfile";
import DoctorAppointments from "./Pages/Doctor/DoctorAppointments";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const isAuthenticated = Boolean(aToken || dToken);

  return isAuthenticated ? (
    <div className="min-h-screen w-full overflow-x-clip bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <Navbar />

      <div className="flex w-full flex-col md:flex-row">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-x-hidden">
          <Routes>
            {/* Root */}
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    aToken
                      ? "/admin-dashboard"
                      : "/doctor-dashboard"
                  }
                  replace
                />
              }
            />

            {/* Admin */}
            {aToken && (
              <>
                <Route
                  path="/admin-dashboard"
                  element={<Dashboard />}
                />

                <Route
                  path="/all-appointments"
                  element={<AllAppointments />}
                />

                <Route
                  path="/add-doctor"
                  element={<AddDoctor />}
                />

                <Route
                  path="/doctor-list"
                  element={<DoctorsList />}
                />
              </>
            )}

            {/* Doctor */}
            {dToken && (
              <>
                <Route
                  path="/doctor-dashboard"
                  element={<DoctorDashboard />}
                />

                <Route
                  path="/doctor-profile"
                  element={<DoctorProfile />}
                />

                <Route
                  path="/doctor-appointments"
                  element={<DoctorAppointments />}
                />
              </>
            )}

            {/* Unknown route */}
            <Route
              path="*"
              element={
                <Navigate
                  to={
                    aToken
                      ? "/admin-dashboard"
                      : "/doctor-dashboard"
                  }
                  replace
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <>
      <Login />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
};

export default App;