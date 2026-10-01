import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";
import {
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiActivity,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
  FiClipboard,
} from "react-icons/fi";

const Dashboard = () => {
  const {
    aToken,
    cancelAppointment,
    dashData,
    getDashdData,
  } = useContext(AdminContext);

  const { slotDateFormate } = useContext(AppContext);

  /* --------------------------------
     Get Dashboard Data
  --------------------------------- */
  useEffect(() => {
    if (aToken) {
      getDashdData();
    }
  }, [aToken]);

  /* --------------------------------
     Loading / Empty State
  --------------------------------- */
  if (!dashData) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center bg-gray-50/70">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="text-sm font-medium text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  /* --------------------------------
     Dashboard Stats
  --------------------------------- */
  const stats = [
    {
      title: "Doctors",
      value: dashData.doctors ?? 0,
      icon: assets.doctor_icon,
      iconBg: "bg-blue-50",
      valueColor: "text-blue-700",
    },
    {
      title: "Appointments",
      value: dashData.appointments ?? 0,
      icon: assets.appointments_icon,
      iconBg: "bg-violet-50",
      valueColor: "text-violet-700",
    },
    {
      title: "Patients",
      value: dashData.patients ?? 0,
      icon: assets.patients_icon,
      iconBg: "bg-emerald-50",
      valueColor: "text-emerald-700",
    },
  ];

  return (
    <div className="min-h-full w-full bg-gray-50/70 p-3 sm:p-5 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* =====================================
            PAGE HEADER
        ====================================== */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FiActivity className="text-xl" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Dashboard
              </h1>

              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                Overview of your healthcare management system.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================
            STAT CARDS
        ====================================== */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
                sm:p-6
              "
            >
              {/* Decorative Circle */}
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gray-50 transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    ${stat.iconBg}
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  `}
                >
                  <img
                    src={stat.icon}
                    alt={stat.title}
                    className="h-8 w-8 object-contain"
                  />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <p
                    className={`
                      text-2xl
                      font-bold
                      ${stat.valueColor}
                      sm:text-3xl
                    `}
                  >
                    {stat.value}
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                </div>
              </div>

              {/* Bottom Line */}
              <div className="relative mt-5 h-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`
                    h-full
                    w-1/3
                    rounded-full
                    transition-all
                    duration-500
                    group-hover:w-2/3
                    ${
                      stat.title === "Doctors"
                        ? "bg-blue-500"
                        : stat.title === "Appointments"
                        ? "bg-violet-500"
                        : "bg-emerald-500"
                    }
                  `}
                />
              </div>
            </div>
          ))}
        </div>

        {/* =====================================
            RECENT APPOINTMENTS
        ====================================== */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:mt-8">
          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-gray-100 bg-gradient-to-r from-blue-50/70 via-white to-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FiClipboard className="text-lg" />
              </div>

              <div>
                <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                  Recent Appointments
                </h2>

                <p className="text-xs text-gray-500 sm:text-sm">
                  Latest appointment activity
                </p>
              </div>
            </div>

            {/* Appointment Count */}
            <div className="flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm">
              <FiCalendar className="text-xs text-blue-500" />

              <span className="text-xs font-semibold text-gray-600">
                {dashData.latestAppointments?.length || 0} Recent
              </span>
            </div>
          </div>

          {/* =====================================
              APPOINTMENT LIST
          ====================================== */}
          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments &&
            dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={item._id || index}
                  className="
                    group
                    flex
                    flex-col
                    gap-4
                    p-4
                    transition-all
                    duration-200
                    hover:bg-gray-50/80
                    sm:flex-row
                    sm:items-center
                    sm:px-6
                    sm:py-4
                  "
                >
                  {/* =================================
                      DOCTOR INFO
                  ================================== */}
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    {/* Doctor Image */}
                    {item.docData?.image ? (
                      <img
                        className="
                          h-11
                          w-11
                          shrink-0
                          rounded-xl
                          bg-gray-100
                          object-cover
                          ring-2
                          ring-gray-100
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                        src={item.docData.image}
                        alt={item.docData?.name || "Doctor"}
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                        <FiUserCheck />
                      </div>
                    )}

                    {/* Doctor Details */}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                        {item.docData?.name || "Unknown Doctor"}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <FiCalendar className="text-blue-500" />

                          <span>
                            {item.slotDate
                              ? slotDateFormate(item.slotDate)
                              : "Date unavailable"}
                          </span>
                        </div>

                        {item.slotTime && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <FiClock className="text-gray-400" />

                            <span>{item.slotTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* =================================
                      STATUS
                  ================================== */}
                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    {item.cancelled ? (
                      <div
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-red-200
                          bg-red-50
                          px-3
                          py-1.5
                          text-[10px]
                          font-bold
                          text-red-600
                          sm:text-xs
                        "
                      >
                        <FiXCircle />
                        Cancelled
                      </div>
                    ) : item.isCompleted ? (
                      <div
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-green-200
                          bg-green-50
                          px-3
                          py-1.5
                          text-[10px]
                          font-bold
                          text-green-600
                          sm:text-xs
                        "
                      >
                        <FiCheckCircle />
                        Completed
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => cancelAppointment(item._id)}
                        className="
                          inline-flex
                          min-h-[40px]
                          items-center
                          justify-center
                          gap-1.5
                          rounded-xl
                          border
                          border-red-200
                          bg-red-50
                          px-4
                          py-2
                          text-xs
                          font-semibold
                          text-red-600
                          transition-all
                          duration-200
                          hover:border-red-300
                          hover:bg-red-100
                          active:scale-95
                        "
                      >
                        <FiXCircle />
                        Cancel
                      </button>
                    )}

                    {/* Desktop Arrow */}
                    <div className="hidden text-gray-300 transition-transform duration-300 group-hover:translate-x-1 sm:block">
                      <FiArrowRight />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* =================================
                  EMPTY STATE
              ================================== */
              <div className="flex min-h-[280px] flex-col items-center justify-center px-5 py-10 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                  <FiCalendar className="text-2xl" />
                </div>

                <h3 className="text-sm font-bold text-gray-800 sm:text-base">
                  No recent appointments
                </h3>

                <p className="mt-1 max-w-sm text-xs leading-relaxed text-gray-400 sm:text-sm">
                  Recent appointment activity will appear here when
                  appointments are available.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* =====================================
            FOOTER
        ====================================== */}
        <div className="mt-4 flex items-center gap-2 px-1 pb-2 text-[11px] text-gray-400">
          <FiUsers className="shrink-0" />

          <p>
            Dashboard statistics are based on the current system records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;