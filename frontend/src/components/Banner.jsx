import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiShield,
} from "react-icons/fi";

const Banner = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCreateAccount = () => {
    navigate("/login");
    scrollToTop();
  };

  return (
    <section className="w-full overflow-x-hidden px-3 py-5 sm:px-4 md:px-5 lg:px-6">
      <div
        className="
          relative mx-auto flex w-full max-w-7xl
          overflow-hidden rounded-2xl bg-blue-600
          shadow-xl shadow-blue-100/60
          sm:rounded-3xl
        "
      >
        {/* =====================================
            DECORATIVE BACKGROUND
        ====================================== */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="pointer-events-none absolute right-[35%] top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

        {/* =====================================
            CONTENT
        ====================================== */}
        <div className="relative z-10 flex w-full flex-col md:flex-row">
          {/* =================================
              LEFT CONTENT
          ================================== */}
          <div
            className="
              flex w-full flex-1 flex-col items-start justify-center
              px-5 py-9
              sm:px-8 sm:py-11
              md:w-1/2 md:px-10 md:py-14
              lg:px-14 lg:py-16
              xl:px-16
            "
          >
            {/* Small badge */}
            <div
              className="
                inline-flex items-center gap-2 rounded-full
                border border-white/20 bg-white/10
                px-3 py-1.5
                text-[10px] font-bold uppercase tracking-wider
                text-white/90 backdrop-blur-sm
                sm:px-4 sm:text-xs
              "
            >
              <FiShield className="text-sm" />
              Trusted Healthcare
            </div>

            {/* Heading */}
            <h2
              className="
                mt-4 max-w-xl
                text-2xl font-bold leading-tight tracking-tight text-white
                sm:mt-5 sm:text-3xl
                md:text-4xl
                lg:text-5xl
                xl:text-6xl
              "
            >
              Book Appointment

              <span className="mt-1 block text-white/90">
                With 100+ Trusted Doctors
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                mt-4 max-w-lg
                text-xs leading-relaxed text-white/80
                sm:mt-5 sm:text-sm
                md:text-base
              "
            >
              Connect with trusted healthcare professionals and schedule
              your appointment quickly and conveniently.
            </p>

            {/* CTA */}
            <button
              type="button"
              onClick={handleCreateAccount}
              className="
                group mt-6 inline-flex min-h-[46px]
                items-center justify-center gap-3
                rounded-full bg-white
                px-6 py-3
                text-sm font-semibold text-gray-700
                shadow-lg shadow-blue-900/10
                transition-all duration-300
                hover:-translate-y-0.5
                hover:scale-[1.02]
                hover:shadow-xl
                active:scale-95
                sm:mt-7 sm:px-7
              "
            >
              <span>Create Account</span>

              <FiArrowRight
                className="
                  text-base text-blue-600
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </button>

            {/* Trust indicator */}
            <div
              className="
                mt-5 flex items-center gap-2
                text-[10px] font-medium text-white/70
                sm:text-xs
              "
            >
              <FiCalendar className="text-white/80" />
              <span>Easy appointment scheduling</span>
            </div>
          </div>

          {/* =================================
              RIGHT IMAGE
          ================================== */}
          <div
            className="
              relative hidden min-h-[280px]
              w-full items-end justify-center
              md:flex md:w-1/2
              lg:min-h-[340px]
            "
          >
            {/* Image glow */}
            <div
              className="
                pointer-events-none absolute bottom-0 left-1/2
                h-64 w-64 -translate-x-1/2
                rounded-full bg-white/10 blur-3xl
                lg:h-80 lg:w-80
              "
            />

            <img
              src={assets.appointment_img}
              alt="Book an appointment"
              className="
                relative z-10 h-auto w-[78%]
                max-w-[390px] object-contain object-bottom
                transition-transform duration-500
                hover:scale-[1.02]
                lg:w-[88%] lg:max-w-[450px]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;