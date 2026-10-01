import React, { useContext, useEffect, useMemo, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import {
  FiUsers,
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiUser,
  FiBriefcase,
  FiRefreshCw,
} from "react-icons/fi";

const DoctorsList = () => {
  const {
    doctors,
    aToken,
    getAllDoctors,
    changeAvailability,
  } = useContext(AdminContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /* --------------------------------
     Get Doctors
  --------------------------------- */
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  /* --------------------------------
     Filter Doctors
  --------------------------------- */
  const filteredDoctors = useMemo(() => {
    if (!doctors) return [];

    return doctors.filter((doctor) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        doctor.name?.toLowerCase().includes(searchValue) ||
        doctor.speciality?.toLowerCase().includes(searchValue);

      const matchesFilter =
        filter === "all" ||
        (filter === "available" && doctor.available) ||
        (filter === "unavailable" && !doctor.available);

      return matchesSearch && matchesFilter;
    });
  }, [doctors, search, filter]);

  /* --------------------------------
     Statistics
  --------------------------------- */
  const totalDoctors = doctors?.length || 0;

  const availableDoctors =
    doctors?.filter((doctor) => doctor.available).length || 0;

  const unavailableDoctors =
    totalDoctors - availableDoctors;

  return (
    <div className="min-h-full w-full bg-gray-50/70 p-3 sm:p-5 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* =====================================
            PAGE HEADER
        ====================================== */}
        <div className="mb-5 sm:mb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FiUsers className="text-xl" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  All Doctors
                </h1>

                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                  Manage doctors and their availability.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">

              {/* Total */}
              <div className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm sm:min-w-[110px] sm:px-4">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  Total
                </p>

                <p className="mt-0.5 text-lg font-bold text-gray-800">
                  {totalDoctors}
                </p>
              </div>

              {/* Available */}
              <div className="rounded-xl border border-green-100 bg-green-50/70 px-3 py-2.5 shadow-sm sm:min-w-[110px] sm:px-4">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-green-500">
                  Available
                </p>

                <p className="mt-0.5 text-lg font-bold text-green-700">
                  {availableDoctors}
                </p>
              </div>

              {/* Unavailable */}
              <div className="rounded-xl border border-red-100 bg-red-50/70 px-3 py-2.5 shadow-sm sm:min-w-[110px] sm:px-4">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-red-500">
                  Offline
                </p>

                <p className="mt-0.5 text-lg font-bold text-red-700">
                  {unavailableDoctors}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            SEARCH + FILTER
        ====================================== */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <FiSearch
                className="
                  pointer-events-none
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search doctor or speciality..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  py-3
                  pl-10
                  pr-4
                  text-sm
                  text-gray-800
                  outline-none
                  placeholder:text-gray-400
                  transition-all
                  duration-200
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />
            </div>

            {/* Filters */}
            <div className="flex w-full gap-2 overflow-x-auto md:w-auto">
              {[
                {
                  value: "all",
                  label: "All",
                },
                {
                  value: "available",
                  label: "Available",
                },
                {
                  value: "unavailable",
                  label: "Unavailable",
                },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={`
                    min-h-[42px]
                    shrink-0
                    rounded-xl
                    border
                    px-4
                    text-xs
                    font-semibold
                    transition-all
                    duration-200
                    active:scale-95
                    sm:text-sm
                    ${
                      filter === item.value
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================
            RESULTS HEADER
        ====================================== */}
        <div className="mb-4 flex items-center justify-between px-1">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Doctors
            </p>

            <p className="mt-0.5 text-xs text-gray-400">
              Showing {filteredDoctors.length} of {totalDoctors}
            </p>
          </div>

          {(search || filter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="
                flex
                items-center
                gap-1.5
                rounded-lg
                px-2.5
                py-1.5
                text-xs
                font-semibold
                text-gray-500
                transition-colors
                hover:bg-white
                hover:text-blue-600
              "
            >
              <FiRefreshCw />
              Clear
            </button>
          )}
        </div>

        {/* =====================================
            DOCTOR GRID
        ====================================== */}
        {filteredDoctors.length > 0 ? (
          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {filteredDoctors.map((item, index) => (
              <div
                key={item._id || index}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:shadow-xl
                "
              >
                {/* =================================
                    DOCTOR IMAGE
                ================================== */}
                <div className="relative aspect-[4/3] overflow-hidden bg-blue-50">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name || "Doctor"}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-blue-400">
                      <FiUser className="text-5xl" />
                    </div>
                  )}

                  {/* Gradient */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Availability Badge */}
                  <div className="absolute right-3 top-3">
                    {item.available ? (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-green-200
                          bg-white/95
                          px-2.5
                          py-1.5
                          text-[10px]
                          font-bold
                          text-green-600
                          shadow-sm
                          backdrop-blur-sm
                        "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Available
                      </span>
                    ) : (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-red-200
                          bg-white/95
                          px-2.5
                          py-1.5
                          text-[10px]
                          font-bold
                          text-red-500
                          shadow-sm
                          backdrop-blur-sm
                        "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        Unavailable
                      </span>
                    )}
                  </div>
                </div>

                {/* =================================
                    DOCTOR DETAILS
                ================================== */}
                <div className="p-4">

                  {/* Name */}
                  <h2 className="truncate text-base font-bold text-gray-900">
                    {item.name || "Unknown Doctor"}
                  </h2>

                  {/* Speciality */}
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <FiBriefcase className="shrink-0 text-xs text-blue-500" />

                    <p className="truncate text-xs font-medium text-gray-500">
                      {item.speciality || "Speciality not specified"}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-4 border-t border-gray-100" />

                  {/* Availability Control */}
                  <label
                    className="
                      flex
                      min-h-[44px]
                      cursor-pointer
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-gray-100
                      bg-gray-50
                      px-3
                      transition-all
                      duration-200
                      hover:border-blue-100
                      hover:bg-blue-50/50
                    "
                  >
                    <div className="flex items-center gap-2">
                      {item.available ? (
                        <FiCheckCircle className="text-green-500" />
                      ) : (
                        <FiXCircle className="text-gray-400" />
                      )}

                      <span className="text-xs font-semibold text-gray-600">
                        {item.available
                          ? "Currently Available"
                          : "Currently Unavailable"}
                      </span>
                    </div>

                    {/* Toggle */}
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={Boolean(item.available)}
                        onChange={() =>
                          changeAvailability(item._id)
                        }
                        className="peer sr-only"
                      />

                      <div
                        className="
                          h-6
                          w-11
                          rounded-full
                          bg-gray-300
                          transition-colors
                          duration-300
                          peer-checked:bg-blue-600
                        "
                      />

                      <div
                        className="
                          absolute
                          left-1
                          top-1
                          h-4
                          w-4
                          rounded-full
                          bg-white
                          shadow-sm
                          transition-transform
                          duration-300
                          peer-checked:translate-x-5
                        "
                      />
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* =====================================
              EMPTY SEARCH STATE
          ====================================== */
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
              <FiUsers className="text-3xl" />
            </div>

            <h2 className="text-base font-bold text-gray-800 sm:text-lg">
              No doctors found
            </h2>

            <p className="mt-1 max-w-sm text-xs leading-relaxed text-gray-400 sm:text-sm">
              No doctors match your current search or availability
              filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="
                mt-5
                rounded-xl
                bg-blue-600
                px-5
                py-2.5
                text-xs
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-blue-700
                hover:shadow-md
                active:scale-95
              "
            >
              Show All Doctors
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;