import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  FiArrowUpRight,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavigation = () => {
    scrollToTop();
  };

  return (
    <footer className="w-full px-3 pt-10 sm:px-4 md:px-5 lg:px-6">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          overflow-hidden
          rounded-t-3xl
          border
          border-gray-100
          bg-white
          shadow-xl
          shadow-blue-100/50
        "
      >
        {/* =====================================
            MAIN FOOTER
        ====================================== */}
        <div className="relative overflow-hidden px-5 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12 lg:py-14">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-50 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-blue-50/70 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr] md:gap-8 lg:grid-cols-[2.5fr_1fr_1.2fr] lg:gap-14">
            {/* =================================
                LEFT SECTION
            ================================== */}
            <div className="max-w-xl">
              <Link
                to="/"
                onClick={handleNavigation}
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  transition-transform
                  duration-200
                  hover:scale-[1.01]
                  active:scale-95
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    p-2
                    transition-all
                    duration-300
                    group-hover:bg-blue-100
                    sm:h-14
                    sm:w-14
                  "
                >
                  <img
                    src={assets.logo}
                    alt="PULSE-MEET Logo"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <p
                    className="
                      text-2xl
                      font-bold
                      tracking-tight
                      text-blue-700
                      sm:text-3xl
                    "
                  >
                    PULSE-MEET
                  </p>

                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-xs">
                    Healthcare made simple
                  </p>
                </div>
              </Link>

              <p
                className="
                  mt-5
                  max-w-xl
                  text-xs
                  leading-6
                  text-gray-500
                  sm:text-sm
                  sm:leading-7
                "
              >
                Find trusted doctors, explore healthcare specialities, and
                book appointments easily with PULSE-MEET. Our goal is to make
                healthcare access simple, convenient, and accessible.
              </p>

              {/* Contact mini cards */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href="tel:+915235898923"
                  className="
                    group
                    flex
                    min-h-[48px]
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-gray-100
                    bg-gray-50
                    px-3
                    transition-all
                    duration-200
                    hover:border-blue-100
                    hover:bg-blue-50
                  "
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <FiPhone className="text-sm" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Call us
                    </p>
                    <p className="truncate text-xs font-semibold text-gray-600 group-hover:text-blue-600 sm:text-sm">
                      +91-523-589-8923
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:pulsmeet@gmail.com"
                  className="
                    group
                    flex
                    min-h-[48px]
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-gray-100
                    bg-gray-50
                    px-3
                    transition-all
                    duration-200
                    hover:border-blue-100
                    hover:bg-blue-50
                  "
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <FiMail className="text-sm" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Email us
                    </p>
                    <p className="truncate text-xs font-semibold text-gray-600 group-hover:text-blue-600 sm:text-sm">
                      pulsmeet@gmail.com
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* =================================
                COMPANY
            ================================== */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-blue-600" />

                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
                  Company
                </h3>
              </div>

              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    onClick={handleNavigation}
                    className="
                      group
                      flex
                      min-h-[40px]
                      items-center
                      justify-between
                      rounded-lg
                      px-2
                      text-sm
                      text-gray-500
                      transition-all
                      duration-200
                      hover:bg-blue-50
                      hover:px-3
                      hover:text-blue-600
                    "
                  >
                    <span>Home</span>
                    <FiArrowUpRight className="text-sm opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    onClick={handleNavigation}
                    className="
                      group
                      flex
                      min-h-[40px]
                      items-center
                      justify-between
                      rounded-lg
                      px-2
                      text-sm
                      text-gray-500
                      transition-all
                      duration-200
                      hover:bg-blue-50
                      hover:px-3
                      hover:text-blue-600
                    "
                  >
                    <span>About</span>
                    <FiArrowUpRight className="text-sm opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    onClick={handleNavigation}
                    className="
                      group
                      flex
                      min-h-[40px]
                      items-center
                      justify-between
                      rounded-lg
                      px-2
                      text-sm
                      text-gray-500
                      transition-all
                      duration-200
                      hover:bg-blue-50
                      hover:px-3
                      hover:text-blue-600
                    "
                  >
                    <span>Contact Us</span>
                    <FiArrowUpRight className="text-sm opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/privacy-policy"
                    onClick={handleNavigation}
                    className="
                      group
                      flex
                      min-h-[40px]
                      items-center
                      justify-between
                      rounded-lg
                      px-2
                      text-sm
                      text-gray-500
                      transition-all
                      duration-200
                      hover:bg-blue-50
                      hover:px-3
                      hover:text-blue-600
                    "
                  >
                    <span>Privacy Policy</span>
                    <FiArrowUpRight className="text-sm opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* =================================
                GET IN TOUCH
            ================================== */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-blue-600" />

                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
                  Get In Touch
                </h3>
              </div>

              <div className="space-y-3">
                <a
                  href="tel:+915235898923"
                  className="
                    group
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    p-2
                    transition-colors
                    duration-200
                    hover:bg-blue-50
                  "
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                    <FiPhone className="text-sm" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Phone
                    </p>
                    <p className="mt-0.5 break-all text-sm font-medium text-gray-600 group-hover:text-blue-600">
                      +91-523-589-8923
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:pulsmeet@gmail.com"
                  className="
                    group
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    p-2
                    transition-colors
                    duration-200
                    hover:bg-blue-50
                  "
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                    <FiMail className="text-sm" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Email
                    </p>
                    <p className="mt-0.5 break-all text-sm font-medium text-gray-600 group-hover:text-blue-600">
                      pulsmeet@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3 rounded-xl p-2">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FiMapPin className="text-sm" />
                  </span>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Location
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-gray-600">
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            COPYRIGHT
        ====================================== */}
        <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-5 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-[11px] leading-relaxed text-gray-400 sm:text-xs">
              © {new Date().getFullYear()} PULSE-MEET. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span>Healthcare made simple & accessible</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;