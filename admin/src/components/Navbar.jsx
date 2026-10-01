import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext.jsx";
import { FiLogOut, FiShield, FiUser } from "react-icons/fi";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");

    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }

    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
  };

  const isAdmin = Boolean(aToken);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="flex min-h-[64px] items-center justify-between gap-3 px-3 sm:px-5 md:px-7 lg:px-8">

        {/* Left Section */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
          
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="group flex cursor-pointer items-center"
          >
            <img
              src={assets.logo}
              alt="Admin Logo"
              className="
                h-9 w-auto max-w-[150px]
                rounded-xl object-contain
                bg-gray-50 px-2 py-1
                transition-all duration-300
                group-hover:scale-[1.02]
                group-hover:shadow-sm
                sm:h-10 sm:max-w-[180px]
                md:h-11 md:max-w-[200px]
              "
            />
          </div>

          {/* Role Badge */}
          <div
            className={`
              flex items-center gap-1.5
              rounded-full border
              px-2.5 py-1
              text-[10px] font-semibold
              uppercase tracking-wide
              transition-all duration-300
              sm:px-3 sm:py-1.5 sm:text-xs
              ${
                isAdmin
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }
            `}
          >
            {isAdmin ? (
              <FiShield className="text-xs sm:text-sm" />
            ) : (
              <FiUser className="text-xs sm:text-sm" />
            )}

            <span>{isAdmin ? "Admin" : "Doctor"}</span>
          </div>
        </div>

        {/* Right Section */}
        <button
          type="button"
          onClick={logout}
          className="
            group flex shrink-0 items-center justify-center gap-2
            rounded-full
            border border-gray-200
            bg-gray-50
            px-3.5 py-2
            text-xs font-semibold text-gray-700
            shadow-sm
            transition-all duration-300
            hover:border-red-200
            hover:bg-red-50
            hover:text-red-600
            hover:shadow-md
            active:scale-95
            sm:px-5 sm:py-2.5 sm:text-sm
          "
        >
          <FiLogOut
            className="
              text-sm transition-transform duration-300
              group-hover:translate-x-0.5
              sm:text-base
            "
          />

          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;