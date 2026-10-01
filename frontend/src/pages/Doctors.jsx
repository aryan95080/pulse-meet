import React, { useContext, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiChevronRight,
  FiFilter,
  FiSearch,
  FiUser,
  FiXCircle,
} from "react-icons/fi";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const filterDoc = useMemo(() => {
    if (!speciality) {
      return doctors || [];
    }

    return (doctors || []).filter(
      (doc) => doc.speciality === speciality
    );
  }, [doctors, speciality]);

  const handleSpeciality = (value) => {
    if (speciality === value) {
      navigate("/doctors");
    } else {
      navigate(`/doctors/${value}`);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDoctorClick = (id) => {
    navigate(`/appointment/${id}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAllDoctors = () => {
    navigate("/doctors");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [speciality]);

  const availableDoctors = filterDoc.filter(
    (doctor) => doctor.available
  ).length;

  return (
    <main className="w-full overflow-x-clip bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-4 sm:py-7 md:px-6 md:py-10">
        {/* ==================================================
            PAGE HEADER
        ================================================== */}
        <section
          className="
            relative overflow-hidden rounded-2xl border border-gray-100
            bg-white shadow-sm sm:rounded-3xl
          "
        >
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-blue-50 blur-3xl" />

          <div className="relative z-10 px-5 py-7 sm:px-7 sm:py-9 md:px-10 md:py-11">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:px-4 sm:text-xs">
                  <FiSearch />
                  Find Your Doctor
                </div>

                {/* Heading */}
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                  {speciality ? (
                    <>
                      {speciality}
                      <span className="text-blue-600"> Specialists</span>
                    </>
                  ) : (
                    <>
                      Browse Our
                      <span className="text-blue-600"> Doctors</span>
                    </>
                  )}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                  Browse through our extensive list of trusted doctors and
                  choose a healthcare professional that fits your needs.
                </p>
              </div>

              {/* Stats */}
              <div className="flex shrink-0 gap-2 sm:gap-3">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-center">
                  <p className="text-lg font-bold text-gray-900 sm:text-xl">
                    {filterDoc.length}
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                    Doctors
                  </p>
                </div>

                <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-center">
                  <p className="text-lg font-bold text-green-600 sm:text-xl">
                    {availableDoctors}
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-green-500">
                    Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            CONTENT
        ================================================== */}
        <section className="mt-6 grid items-start gap-6 lg:grid-cols-[235px_1fr]">
          {/* ==================================================
              FILTERS
          ================================================== */}
          <aside
            className="
              rounded-2xl border border-gray-100 bg-white p-4 shadow-sm
              sm:rounded-3xl sm:p-5
              sticky lg:top-24
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FiFilter />
                </span>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Specialities
                  </p>

                  <p className="text-[10px] text-gray-400">
                    Filter doctors
                  </p>
                </div>
              </div>

              {speciality && (
                <button
                  type="button"
                  onClick={handleAllDoctors}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Clear
                </button>
              )}
            </div>

            <div
              className="
                mt-4 flex gap-2 overflow-x-auto pb-1
                lg:block lg:space-y-2 lg:overflow-visible
              "
            >
              {/* All doctors */}
              <button
                type="button"
                onClick={handleAllDoctors}
                className={`
                  flex min-h-[42px] shrink-0 items-center justify-between
                  gap-3 rounded-xl px-4 py-2.5 text-left text-xs font-semibold
                  transition-all duration-300 active:scale-95 lg:w-full
                  sm:text-sm
                  ${
                    !speciality
                      ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                      : "border border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
              >
                <span>All Doctors</span>
                <FiChevronRight />
              </button>

              {specialities.map((item) => {
                const isActive = speciality === item;

                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => handleSpeciality(item)}
                    className={`
                      flex min-h-[42px] shrink-0 items-center justify-between
                      gap-3 rounded-xl px-4 py-2.5 text-left text-xs font-semibold
                      transition-all duration-300 active:scale-95 lg:w-full
                      sm:text-sm
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                          : "border border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600"
                      }
                    `}
                  >
                    <span>{item}</span>
                    <FiChevronRight
                      className={`shrink-0 ${
                        isActive ? "text-white" : "text-gray-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ==================================================
              DOCTOR GRID
          ================================================== */}
          <div className="min-w-0">
            {/* Results header */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-gray-900 sm:text-base">
                  {speciality || "All Doctors"}
                </p>

                <p className="mt-0.5 text-xs text-gray-400">
                  {filterDoc.length}{" "}
                  {filterDoc.length === 1 ? "doctor" : "doctors"} found
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs text-gray-500 shadow-sm ring-1 ring-gray-100">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Available doctors
              </div>
            </div>

            {/* Doctors */}
            {filterDoc.length > 0 ? (
              <div
                className="
                  grid grid-cols-1 gap-4
                  min-[480px]:grid-cols-2
                  md:grid-cols-3
                  xl:grid-cols-4
                "
              >
                {filterDoc.map((item) => (
                  <article
                    key={item._id}
                    onClick={() => handleDoctorClick(item._id)}
                    className="
                      group cursor-pointer overflow-hidden rounded-2xl
                      border border-gray-100 bg-white shadow-sm
                      transition-all duration-300
                      hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl
                      active:scale-[0.99]
                      sm:rounded-3xl
                    "
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-blue-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="
                          aspect-[4/3] w-full object-cover object-top
                          transition-transform duration-500
                          group-hover:scale-[1.04]
                        "
                      />

                      {/* Availability */}
                      <div
                        className={`
                          absolute left-3 top-3 inline-flex items-center gap-1.5
                          rounded-full px-2.5 py-1.5 text-[10px] font-semibold
                          shadow-sm backdrop-blur-sm sm:text-xs
                          ${
                            item.available
                              ? "bg-white/95 text-green-600"
                              : "bg-white/95 text-gray-500"
                          }
                        `}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.available
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        />

                        {item.available
                          ? "Available"
                          : "Not Available"}
                      </div>

                      {/* Hover arrow */}
                      <div
                        className="
                          absolute bottom-3 right-3 flex h-9 w-9
                          translate-y-2 items-center justify-center
                          rounded-full bg-white text-blue-600 opacity-0
                          shadow-lg transition-all duration-300
                          group-hover:translate-y-0 group-hover:opacity-100
                        "
                      >
                        <FiArrowRight />
                      </div>
                    </div>

                    {/* Information */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2 className="truncate text-base font-bold text-gray-900 sm:text-lg">
                            {item.name}
                          </h2>

                          <p className="mt-1 truncate text-xs font-medium text-blue-600 sm:text-sm">
                            {item.speciality}
                          </p>
                        </div>

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <FiUser className="text-sm" />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 sm:text-xs">
                          <FiCalendar />
                          <span>Book appointment</span>
                        </div>

                        <FiChevronRight className="text-gray-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* ==================================================
                  EMPTY STATE
              ================================================== */
              <div
                className="
                  flex min-h-[360px] flex-col items-center justify-center
                  rounded-3xl border border-dashed border-gray-200 bg-white
                  px-5 py-12 text-center shadow-sm
                "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                  {speciality ? (
                    <FiXCircle className="text-2xl" />
                  ) : (
                    <FiUser className="text-2xl" />
                  )}
                </div>

                <h2 className="mt-5 text-lg font-bold text-gray-900">
                  No doctors found
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  {speciality
                    ? `We couldn't find any doctors under ${speciality}. Try another speciality or browse all doctors.`
                    : "There are currently no doctors available to display."}
                </p>

                {speciality && (
                  <button
                    type="button"
                    onClick={handleAllDoctors}
                    className="
                      mt-5 inline-flex min-h-[44px] items-center gap-2
                      rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold
                      text-white shadow-lg shadow-blue-100 transition-all
                      duration-300 hover:-translate-y-0.5 hover:bg-blue-700
                      active:scale-95
                    "
                  >
                    <FiArrowRight />
                    Browse All Doctors
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ==================================================
            BOTTOM TRUST MESSAGE
        ================================================== */}
        <div
          className="
            mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl
            border border-blue-100 bg-blue-50 px-5 py-4 text-center
            sm:flex-row sm:text-left sm:rounded-3xl
          "
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
              <FiCheckCircle />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Find the right healthcare professional
              </p>

              <p className="mt-0.5 text-xs text-gray-500">
                Browse verified doctor profiles and choose a convenient
                appointment slot.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAllDoctors}
            className="
              inline-flex min-h-[40px] shrink-0 items-center gap-2
              rounded-full bg-white px-4 py-2 text-xs font-semibold text-blue-600
              shadow-sm transition-all duration-300
              hover:bg-blue-600 hover:text-white active:scale-95
            "
          >
            View All
            <FiArrowRight />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Doctors;