import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiChevronRight,
  FiUserCheck,
} from "react-icons/fi";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors?.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );

      setRelDoc(doctorsData);
    } else {
      setRelDoc([]);
    }
  }, [doctors, speciality, docId]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/appointment/${doctorId}`);
    scrollToTop();
  };

  const handleViewAll = () => {
    navigate("/doctors");
    scrollToTop();
  };

  return (
    <section className="w-full px-3 py-5 sm:px-4 md:px-5 lg:px-6">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          overflow-hidden
          rounded-2xl
          border
          border-gray-100
          bg-gradient-to-b
          from-white
          via-white
          to-blue-50/30
          px-3
          py-10
          shadow-lg
          shadow-gray-100
          sm:rounded-3xl
          sm:px-5
          sm:py-12
          md:px-7
          md:py-14
          lg:px-10
          lg:py-16
        "
      >
        {/* =====================================
            SECTION HEADER
        ====================================== */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          {/* Small badge */}
          <div
            className="
              mb-3
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-100
              bg-blue-50
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              text-blue-600
              sm:mb-4
              sm:px-4
              sm:text-xs
            "
          >
            <FiUserCheck className="text-sm" />
            Trusted Healthcare
          </div>

          {/* Heading */}
          <h2
            className="
              text-2xl
              font-bold
              tracking-tight
              text-gray-800
              sm:text-3xl
              md:text-4xl
            "
          >
            Related Doctors
          </h2>

          {/* Description */}
          <p
            className="
              mt-2
              max-w-lg
              text-xs
              leading-relaxed
              text-gray-500
              sm:mt-3
              sm:text-sm
              md:text-base
            "
          >
            Simply browse through our extensive list of trusted doctors
            specializing in{" "}
            <span className="font-semibold text-blue-600">
              {speciality || "your healthcare needs"}
            </span>
            .
          </p>
        </div>

        {/* =====================================
            DOCTORS GRID
        ====================================== */}
        {relDoc.length > 0 ? (
          <div
            className="
              mt-8
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              sm:gap-5
              md:mt-10
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
            "
          >
            {relDoc.slice(0, 10).map((item, index) => (
              <article
                key={item._id || index}
                onClick={() => handleDoctorClick(item._id)}
                className="
                  group
                  min-w-0
                  cursor-pointer
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-100
                  hover:shadow-xl
                  hover:shadow-blue-100/50
                  active:scale-[0.98]
                "
              >
                {/* Doctor Image */}
                <div className="relative overflow-hidden bg-blue-50">
                  <img
                    src={item.image}
                    alt={item.name || "Doctor"}
                    loading="lazy"
                    className="
                      aspect-[4/4.2]
                      w-full
                      object-cover
                      object-top
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* Image overlay */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent opacity-70" />

                  {/* Availability */}
                  <div className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3">
                    {item.available ? (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-white/70
                          bg-white/90
                          px-2.5
                          py-1.5
                          text-[10px]
                          font-bold
                          text-green-600
                          shadow-sm
                          backdrop-blur-sm
                          sm:text-xs
                        "
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                        </span>
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
                          border-white/70
                          bg-white/90
                          px-2.5
                          py-1.5
                          text-[10px]
                          font-bold
                          text-gray-500
                          shadow-sm
                          backdrop-blur-sm
                          sm:text-xs
                        "
                      >
                        <span className="h-2 w-2 rounded-full bg-gray-400" />
                        Not Available
                      </span>
                    )}
                  </div>

                  {/* Arrow */}
                  <div
                    className="
                      absolute
                      bottom-3
                      right-3
                      flex
                      h-8
                      w-8
                      translate-y-2
                      items-center
                      justify-center
                      rounded-full
                      bg-white/95
                      text-blue-600
                      opacity-0
                      shadow-md
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                  >
                    <FiArrowRight className="text-sm" />
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="p-3.5 sm:p-4">
                  <h3
                    className="
                      truncate
                      text-sm
                      font-bold
                      text-gray-800
                      transition-colors
                      duration-200
                      group-hover:text-blue-600
                      sm:text-base
                    "
                  >
                    {item.name || "Doctor"}
                  </h3>

                  <p className="mt-1 truncate text-xs font-medium text-gray-500 sm:text-sm">
                    {item.speciality || "Healthcare Specialist"}
                  </p>

                  {/* Bottom info */}
                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 sm:text-xs">
                      <FiCalendar className="text-blue-500" />
                      <span>Book appointment</span>
                    </div>

                    <FiChevronRight
                      className="
                        text-sm
                        text-gray-300
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:text-blue-500
                      "
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* =====================================
              EMPTY STATE
          ====================================== */
          <div
            className="
              mx-auto
              mt-8
              flex
              min-h-[220px]
              max-w-xl
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-dashed
              border-gray-200
              bg-gray-50/70
              px-5
              py-10
              text-center
              sm:mt-10
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-blue-50
                text-blue-500
              "
            >
              <FiUserCheck className="text-2xl" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-gray-800 sm:text-base">
              No related doctors found
            </h3>

            <p className="mt-1 max-w-sm text-xs leading-relaxed text-gray-400 sm:text-sm">
              We couldn't find other doctors in this speciality at the
              moment. Explore all doctors to find more options.
            </p>
          </div>
        )}

        {/* =====================================
            VIEW ALL BUTTON
        ====================================== */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <button
            type="button"
            onClick={handleViewAll}
            className="
              group
              inline-flex
              min-h-[46px]
              items-center
              justify-center
              gap-2
              rounded-full
              bg-blue-600
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-md
              shadow-blue-200
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-blue-700
              hover:shadow-lg
              active:scale-95
              sm:px-7
            "
          >
            <span>View All Doctors</span>

            <FiArrowRight
              className="
                text-base
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RelatedDoctors;