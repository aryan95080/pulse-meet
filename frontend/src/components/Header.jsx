import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <section className="w-full px-3 sm:px-4 md:px-5 lg:px-6">
      <div
        className="
          relative
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-blue-600
          shadow-xl
          shadow-blue-100/60
          transition-all
          duration-300
          sm:rounded-3xl
          md:min-h-[430px]
          lg:min-h-[500px]
        "
      >
        {/* =====================================
            BACKGROUND DECORATION
        ====================================== */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

        {/* =====================================
            CONTENT WRAPPER
        ====================================== */}
        <div className="relative z-10 flex w-full flex-col md:flex-row">

          {/* =================================
              LEFT CONTENT
          ================================== */}
          <div
            className="
              flex
              w-full
              flex-col
              items-start
              justify-center
              px-5
              pb-8
              pt-9
              sm:px-8
              sm:pb-10
              sm:pt-11
              md:w-1/2
              md:px-8
              md:py-12
              lg:px-12
              lg:py-16
              xl:px-16
            "
          >
            {/* Small badge */}
            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/20
                bg-white/10
                px-3
                py-1.5
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-white/90
                backdrop-blur-sm
                sm:mb-5
                sm:px-4
                sm:py-2
                sm:text-xs
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Trusted Healthcare
            </div>

            {/* Main Heading */}
            <h1
              className="
                max-w-xl
                text-3xl
                font-bold
                leading-[1.12]
                tracking-tight
                text-white
                sm:text-4xl
                md:text-4xl
                lg:text-5xl
                xl:text-6xl
              "
            >
              Book Appointment
              <br />
              <span className="text-white/95">
                With Trusted Doctors
              </span>
            </h1>

            {/* Description */}
            <div
              className="
                mt-5
                flex
                w-full
                flex-col
                items-start
                gap-4
                sm:mt-6
                sm:flex-row
                sm:items-center
                sm:gap-4
              "
            >
              {/* Profile Images */}
              <div className="flex shrink-0 items-center">
                <img
                  src={assets.group_profiles}
                  alt="Trusted doctors"
                  className="
                    h-auto
                    w-24
                    object-contain
                    sm:w-28
                    md:w-24
                    lg:w-28
                  "
                />
              </div>

              {/* Text */}
              <p
                className="
                  max-w-md
                  text-xs
                  font-medium
                  leading-relaxed
                  text-white/90
                  sm:text-sm
                "
              >
                Simply browse through our extensive list of trusted
                doctors, schedule your appointment hassle-free.
              </p>
            </div>

            {/* CTA */}
            <a
              href="#speciality"
              className="
                group
                mt-6
                inline-flex
                min-h-[46px]
                w-full
                max-w-[210px]
                items-center
                justify-center
                gap-3
                rounded-full
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                text-gray-700
                shadow-lg
                shadow-blue-900/10
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:scale-[1.02]
                hover:shadow-xl
                active:scale-95
                sm:mt-7
                sm:w-auto
              "
            >
              <span>Book Appointment</span>

              <img
                src={assets.arrow_icon}
                alt=""
                className="
                  h-3
                  w-3
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>
          </div>

          {/* =================================
              RIGHT IMAGE
          ================================== */}
          <div
            className="
              relative
              flex
              w-full
              items-end
              justify-center
              md:w-1/2
            "
          >
            {/* Image glow */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/10 blur-3xl sm:h-64 sm:w-64" />

            <img
              src={assets.header_img}
              alt="Doctor"
              className="
                relative
                z-10
                block
                h-auto
                w-[82%]
                max-w-[430px]
                object-contain
                object-bottom
                transition-transform
                duration-500
                hover:scale-[1.02]
                sm:w-[70%]
                md:absolute
                md:bottom-0
                md:left-1/2
                md:w-[95%]
                md:max-w-[500px]
                md:-translate-x-1/2
                lg:w-[92%]
                xl:max-w-[560px]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;