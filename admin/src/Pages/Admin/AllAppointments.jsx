import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiUserCheck,
  FiDollarSign,
  FiXCircle,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const AllAppointments = () => {
  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelAppointment,
  } = useContext(AdminContext);

  const {
    calculateAge,
    slotDateFormate,
    currency,
  } = useContext(AppContext);

  /* --------------------------------
     Get Appointments
  --------------------------------- */
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  /* --------------------------------
     Appointment Status
  --------------------------------- */
  const getStatus = (item) => {
    if (item.cancelled) {
      return {
        label: "Cancelled",
        icon: <FiXCircle />,
        className:
          "border-red-200 bg-red-50 text-red-600",
      };
    }

    if (item.isCompleted) {
      return {
        label: "Completed",
        icon: <FiCheckCircle />,
        className:
          "border-green-200 bg-green-50 text-green-600",
      };
    }

    return {
      label: "Scheduled",
      icon: <FiCalendar />,
      className:
        "border-blue-200 bg-blue-50 text-blue-600",
    };
  };

  return (
    <div className="min-h-full w-full bg-gray-50/70 p-3 sm:p-5 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* =====================================
            PAGE HEADER
        ====================================== */}
        <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FiCalendar className="text-xl" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  All Appointments
                </h1>

                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                  Manage and monitor all patient appointments.
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Count */}
          <div className="flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-blue-500" />

            <span className="text-xs font-semibold text-gray-600 sm:text-sm">
              {appointments?.length || 0} Appointments
            </span>
          </div>
        </div>

        {/* =====================================
            APPOINTMENT CONTAINER
        ====================================== */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Table Header */}
          <div
            className="
              hidden
              lg:grid
              grid-cols-[50px_minmax(180px,1.5fr)_80px_minmax(180px,1.3fr)_minmax(180px,1.3fr)_100px_120px]
              items-center
              gap-4
              border-b
              border-gray-100
              bg-gray-50/80
              px-5
              py-4
              text-[11px]
              font-bold
              uppercase
              tracking-wider
              text-gray-400
            "
          >
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Status</p>
          </div>

          {/* =====================================
              EMPTY STATE
          ====================================== */}
          {!appointments || appointments.length === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center px-5 py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                <FiCalendar className="text-3xl" />
              </div>

              <h2 className="text-base font-bold text-gray-800 sm:text-lg">
                No appointments found
              </h2>

              <p className="mt-1 max-w-sm text-xs leading-relaxed text-gray-400 sm:text-sm">
                There are currently no appointments available to display.
              </p>
            </div>
          ) : (
            /* =====================================
                APPOINTMENT LIST
            ====================================== */
            <div className="divide-y divide-gray-100">
              {appointments.map((item, index) => {
                const status = getStatus(item);

                return (
                  <div
                    key={item._id || index}
                    className="
                      group
                      p-4
                      transition-all
                      duration-200
                      hover:bg-gray-50/80
                      sm:p-5
                    "
                  >
                    {/* =================================
                        DESKTOP ROW
                    ================================== */}
                    <div
                      className="
                        hidden
                        lg:grid
                        grid-cols-[50px_minmax(180px,1.5fr)_80px_minmax(180px,1.3fr)_minmax(180px,1.3fr)_100px_120px]
                        items-center
                        gap-4
                      "
                    >
                      {/* Number */}
                      <p className="text-sm font-medium text-gray-400">
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      {/* Patient */}
                      <div className="flex min-w-0 items-center gap-3">
                        {item.userData?.image ? (
                          <img
                            src={item.userData.image}
                            alt={item.userData?.name || "Patient"}
                            className="
                              h-10
                              w-10
                              shrink-0
                              rounded-xl
                              object-cover
                              ring-2
                              ring-gray-100
                              transition-transform
                              duration-300
                              group-hover:scale-105
                            "
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                            <FiUser />
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-800">
                            {item.userData?.name || "Unknown Patient"}
                          </p>

                          <p className="mt-0.5 text-[11px] text-gray-400">
                            Patient
                          </p>
                        </div>
                      </div>

                      {/* Age */}
                      <p className="text-sm text-gray-600">
                        {item.userData?.dob
                          ? `${calculateAge(item.userData.dob)} yrs`
                          : "—"}
                      </p>

                      {/* Date & Time */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="shrink-0 text-sm text-blue-500" />

                          <p className="truncate text-sm font-medium text-gray-700">
                            {slotDateFormate(item.slotDate)}
                          </p>
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                          <FiClock className="shrink-0 text-xs text-gray-400" />

                          <p className="text-xs text-gray-400">
                            {item.slotTime}
                          </p>
                        </div>
                      </div>

                      {/* Doctor */}
                      <div className="flex min-w-0 items-center gap-3">
                        {item.docData?.image ? (
                          <img
                            src={item.docData.image}
                            alt={item.docData?.name || "Doctor"}
                            className="
                              h-10
                              w-10
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
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                            <FiUserCheck />
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-800">
                            {item.docData?.name || "Unknown Doctor"}
                          </p>

                          <p className="mt-0.5 truncate text-[11px] text-gray-400">
                            Doctor
                          </p>
                        </div>
                      </div>

                      {/* Fees */}
                      <div className="flex items-center gap-1.5">
                        <FiDollarSign className="text-sm text-gray-400" />

                        <p className="text-sm font-semibold text-gray-700">
                          {currency}
                          {item.amount}
                        </p>
                      </div>

                      {/* Status */}
                      <div>
                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            px-2.5
                            py-1.5
                            text-[10px]
                            font-bold
                            ${status.className}
                          `}
                        >
                          {status.icon}
                          {status.label}
                        </span>
                      </div>
                    </div>

                    {/* =================================
                        MOBILE / TABLET CARD
                    ================================== */}
                    <div className="lg:hidden">
                      {/* Card Top */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          {item.userData?.image ? (
                            <img
                              src={item.userData.image}
                              alt={item.userData?.name || "Patient"}
                              className="
                                h-11
                                w-11
                                shrink-0
                                rounded-xl
                                object-cover
                                ring-2
                                ring-gray-100
                              "
                            />
                          ) : (
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                              <FiUser />
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-gray-800 sm:text-base">
                              {item.userData?.name || "Unknown Patient"}
                            </p>

                            <p className="mt-0.5 text-[11px] text-gray-400">
                              Patient #{index + 1}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`
                            inline-flex
                            shrink-0
                            items-center
                            gap-1
                            rounded-full
                            border
                            px-2
                            py-1
                            text-[9px]
                            font-bold
                            sm:px-2.5
                            sm:py-1.5
                            sm:text-[10px]
                            ${status.className}
                          `}
                        >
                          {status.icon}
                          {status.label}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="my-4 border-t border-gray-100" />

                      {/* Information Grid */}
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {/* Age */}
                        <div className="rounded-xl bg-gray-50 p-3">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                            Age
                          </p>

                          <p className="text-sm font-semibold text-gray-700">
                            {item.userData?.dob
                              ? `${calculateAge(item.userData.dob)} yrs`
                              : "—"}
                          </p>
                        </div>

                        {/* Date */}
                        <div className="rounded-xl bg-gray-50 p-3">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                            Date
                          </p>

                          <p className="truncate text-sm font-semibold text-gray-700">
                            {slotDateFormate(item.slotDate)}
                          </p>
                        </div>

                        {/* Time */}
                        <div className="rounded-xl bg-gray-50 p-3">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                            Time
                          </p>

                          <p className="text-sm font-semibold text-gray-700">
                            {item.slotTime}
                          </p>
                        </div>

                        {/* Fees */}
                        <div className="rounded-xl bg-gray-50 p-3">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                            Fees
                          </p>

                          <p className="text-sm font-semibold text-gray-700">
                            {currency}
                            {item.amount}
                          </p>
                        </div>
                      </div>

                      {/* Doctor */}
                      <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3">
                        {item.docData?.image ? (
                          <img
                            src={item.docData.image}
                            alt={item.docData?.name || "Doctor"}
                            className="
                              h-10
                              w-10
                              shrink-0
                              rounded-xl
                              bg-gray-100
                              object-cover
                            "
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                            <FiUserCheck />
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                            Doctor
                          </p>

                          <p className="truncate text-sm font-semibold text-gray-700">
                            {item.docData?.name || "Unknown Doctor"}
                          </p>
                        </div>
                      </div>

                      {/* Cancel Button */}
                      {!item.cancelled && !item.isCompleted && (
                        <button
                          type="button"
                          onClick={() => cancelAppointment(item._id)}
                          className="
                            mt-3
                            flex
                            min-h-[44px]
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-red-200
                            bg-red-50
                            px-4
                            py-2.5
                            text-xs
                            font-semibold
                            text-red-600
                            transition-all
                            duration-200
                            hover:border-red-300
                            hover:bg-red-100
                            active:scale-[0.98]
                          "
                        >
                          <FiXCircle />
                          Cancel Appointment
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* =====================================
            FOOTER INFO
        ====================================== */}
        {appointments?.length > 0 && (
          <div className="mt-4 flex items-center gap-2 px-1 text-[11px] text-gray-400">
            <FiAlertCircle className="shrink-0" />

            <p>
              Appointment information is displayed according to the
              current records.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;