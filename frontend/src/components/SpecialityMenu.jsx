import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiChevronRight, FiSearch } from "react-icons/fi";
import { specialityData } from "../assets/assets";

const SpecialityMenu = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="speciality"
      className="w-full scroll-mt-24 px-3 py-5 sm:px-4 md:px-5 lg:px-6"
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          overflow-hidden
          rounded-2xl
          border
          border-gray-100
          bg-white
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
          {/* Badge */}
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
            <FiSearch className="text-sm" />
            Find Your Specialist
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
            Find by Speciality
          </h2>

          {/* Description */}
          <p
            className="
              mt-2
              max-w-xl
              text-xs
              leading-relaxed
              text-gray-500
              sm:mt-3
              sm:text-sm
              md:text-base
            "
          >
            Simply browse through our extensive list of trusted doctors and
            schedule your appointment hassle-free.
          </p>
        </div>

        {/* =====================================
            SPECIALITY LIST
        ====================================== */}
        <div
          className="
            mt-8
            flex
            w-full
            gap-3
            overflow-x-auto
            px-1
            pb-4
            pt-2
            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-gray-200
            sm:mt-10
            sm:justify-center
            sm:gap-4
            sm:px-2
          "
        >
          {specialityData.map((item, index) => (
            <Link
              key={item.speciality || index}
              to={`/doctors/${item.speciality}`}
              onClick={scrollToTop}
              className="
                group
                flex
                w-[108px]
                shrink-0
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-gray-100
                bg-gray-50/70
                px-3
                py-4
                text-center
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-100
                hover:bg-blue-50
                hover:shadow-lg
                hover:shadow-blue-100/50
                active:scale-95
                sm:w-[125px]
                sm:px-4
                sm:py-5
                md:w-[135px]
              "
            >
              {/* Icon container */}
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  p-2
                  shadow-sm
                  ring-1
                  ring-gray-100
                  transition-all
                  duration-300
                  group-hover:scale-105
                  group-hover:bg-blue-50
                  group-hover:ring-blue-100
                  sm:h-20
                  sm:w-20
                  sm:p-2.5
                  md:h-24
                  md:w-24
                "
              >
                <img
                  src={item.image}
                  alt={item.speciality || "Speciality"}
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </div>

              {/* Speciality name */}
              <div className="mt-3 flex w-full items-center justify-center gap-1">
                <p
                  className="
                    max-w-full
                    truncate
                    text-[11px]
                    font-semibold
                    text-gray-600
                    transition-colors
                    duration-200
                    group-hover:text-blue-600
                    sm:text-xs
                    md:text-sm
                  "
                >
                  {item.speciality}
                </p>

                <FiChevronRight
                  className="
                    shrink-0
                    text-[11px]
                    text-gray-300
                    transition-all
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:text-blue-500
                    sm:text-xs
                  "
                />
              </div>
            </Link>
          ))}
        </div>

        {/* =====================================
            BOTTOM HINT
        ====================================== */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-gray-400 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          <span>Select a speciality to explore available doctors</span>
          <FiArrowRight className="text-blue-400" />
        </div>
      </div>
    </section>
  );
};

export default SpecialityMenu;