import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const adminMenu = [
    {
      to: "/admin-dashboard",
      icon: assets.home_icon,
      label: "Dashboard",
    },
    {
      to: "/all-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    {
      to: "/add-doctor",
      icon: assets.add_icon,
      label: "Add Doctor",
    },
    {
      to: "/doctor-list",
      icon: assets.people_icon,
      label: "Doctors List",
    },
  ];

  const doctorMenu = [
    {
      to: "/doctor-dashboard",
      icon: assets.home_icon,
      label: "Dashboard",
    },
    {
      to: "/doctor-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    {
      to: "/doctor-profile",
      icon: assets.people_icon,
      label: "Profile",
    },
  ];

  const menuItems = aToken ? adminMenu : doctorMenu;

  return (
    <aside
      className="
        sticky top-16 md:self-start
        z-40
        w-full
        shrink-0
        border-b border-gray-200
        bg-white
        shadow-sm

        md:min-h-[calc(100vh-64px)]
        md:w-[230px]
        md:border-b-0
        md:border-r
        md:shadow-[2px_0_10px_rgba(0,0,0,0.03)]

        lg:w-[250px]
      "
    >
      {/* =====================================
          MOBILE / TABLET NAVIGATION
      ====================================== */}
      <div className="md:hidden">
        <div className="border-b border-gray-100 px-2 py-2">
          <div
            className="
              flex
              w-full
              gap-2
              overflow-x-auto
              pb-1
              scrollbar-hide
            "
          >
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  group
                  flex
                  min-h-[46px]
                  shrink-0
                  items-center
                  gap-2
                  rounded-xl
                  border
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  transition-all
                  duration-200
                  active:scale-95
                  sm:px-4
                  sm:text-sm

                  ${
                    isActive
                      ? "border-blue-200 bg-blue-50 text-blue-700 shadow-sm"
                      : "border-transparent bg-gray-50 text-gray-500 hover:border-gray-200 hover:bg-white hover:text-gray-800"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? "bg-blue-100"
                            : "bg-white group-hover:bg-gray-100"
                        }
                      `}
                    >
                      <img
                        src={item.icon}
                        alt=""
                        className={`
                          h-4
                          w-4
                          object-contain
                          transition-transform
                          duration-200
                          group-hover:scale-105

                          ${
                            isActive
                              ? "opacity-100"
                              : "opacity-60 group-hover:opacity-100"
                          }
                        `}
                      />
                    </span>

                    <span className="whitespace-nowrap">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================
          DESKTOP SIDEBAR
      ====================================== */}
      <div className="hidden h-full md:block">
        <nav className="px-3 py-5 lg:px-3.5">
          {/* Panel Label */}
          <div className="mb-4 px-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 lg:text-xs">
              {aToken ? "Admin Panel" : "Doctor Panel"}
            </p>
          </div>

          {/* Menu */}
          <ul className="space-y-1.5">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `
                    group
                    relative
                    flex
                    min-h-[48px]
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    ease-out
                    lg:px-3.5

                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator */}
                      <span
                        className={`
                          absolute
                          left-0
                          top-1/2
                          h-7
                          w-1
                          -translate-y-1/2
                          rounded-r-full
                          bg-blue-600
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "opacity-100"
                              : "opacity-0"
                          }
                        `}
                      />

                      {/* Icon */}
                      <span
                        className={`
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "bg-blue-100"
                              : "bg-gray-50 group-hover:bg-white"
                          }
                        `}
                      >
                        <img
                          src={item.icon}
                          alt=""
                          className={`
                            h-5
                            w-5
                            object-contain
                            transition-all
                            duration-300

                            ${
                              isActive
                                ? "scale-105 opacity-100"
                                : "opacity-70 group-hover:scale-105 group-hover:opacity-100"
                            }
                          `}
                        />
                      </span>

                      {/* Label */}
                      <span className="min-w-0 truncate whitespace-nowrap">
                        {item.label}
                      </span>

                      {/* Active dot */}
                      <span
                        className={`
                          ml-auto
                          h-1.5
                          w-1.5
                          shrink-0
                          rounded-full
                          bg-blue-600
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "scale-100 opacity-100"
                              : "scale-0 opacity-0"
                          }
                        `}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Bottom Information Card */}
          <div className="mt-8 hidden lg:block">
            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                </span>

                <span className="text-xs font-semibold text-gray-700">
                  {aToken ? "Admin Portal" : "Doctor Portal"}
                </span>
              </div>

              <p className="text-[11px] leading-relaxed text-gray-400">
                Manage appointments, doctors and your account from one
                place.
              </p>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;