import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiClock,
  FiHeart,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiShield,
} from "react-icons/fi";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <main className="w-full overflow-x-hidden bg-gray-50">
      {/* ==================================================
          HERO / PAGE HEADER
      ================================================== */}
      <section className="px-3 pt-5 sm:px-4 sm:pt-7 md:px-6 md:pt-10">
        <div
          className="
            relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl
            bg-white shadow-sm ring-1 ring-gray-100 sm:rounded-3xl
          "
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-blue-50 blur-3xl" />

          <div className="relative z-10 px-5 py-10 text-center sm:px-8 sm:py-12 md:px-10 md:py-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:px-4 sm:text-xs">
              <FiHeart className="text-sm" />
              We're Here To Help
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Contact
              <span className="text-blue-600"> PULSE-MEET</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              Have a question, need assistance, or want to learn more about
              PULSE-MEET? Our team is here to help you.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          CONTACT CONTENT
      ================================================== */}
      <section className="px-3 py-10 sm:px-4 sm:py-14 md:px-6 md:py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          {/* ==================================================
              CONTACT IMAGE
          ================================================== */}
          <div
            className="
              relative overflow-hidden rounded-2xl bg-blue-100 shadow-sm
              ring-1 ring-gray-100 sm:rounded-3xl
            "
          >
            <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-sm backdrop-blur-sm">
              <FiShield />
              Trusted Healthcare
            </div>

            <img
              src={assets.contact_image}
              alt="Contact PULSE-MEET"
              className="
                h-full min-h-[280px] w-full object-cover
                transition-transform duration-500 hover:scale-[1.02]
                sm:min-h-[360px] lg:min-h-[560px]
              "
            />

            {/* Image bottom overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950/70 via-gray-950/20 to-transparent p-5 pt-20 sm:p-7 sm:pt-24">
              <p className="text-lg font-bold text-white sm:text-xl">
                Your healthcare journey matters.
              </p>

              <p className="mt-1 text-xs leading-5 text-white/80 sm:text-sm">
                We're committed to making healthcare access simpler and more
                convenient.
              </p>
            </div>
          </div>

          {/* ==================================================
              CONTACT DETAILS
          ================================================== */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 md:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:px-4 sm:text-xs">
              <FiSend />
              Get In Touch
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              We'd love to hear from you.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Whether you have a question about appointments, doctors, or the
              PULSE-MEET platform, feel free to reach out to us.
            </p>

            {/* Contact cards */}
            <div className="mt-7 space-y-3">
              {/* Office */}
              <div className="group flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:border-blue-100 hover:bg-blue-50/60">
                <div
                  className="
                    flex h-11 w-11 shrink-0 items-center justify-center
                    rounded-xl bg-blue-100 text-blue-600 transition-all duration-300
                    group-hover:bg-blue-600 group-hover:text-white
                  "
                >
                  <FiMapPin className="text-lg" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Our Office
                  </p>

                  <p className="mt-1 text-sm font-medium leading-6 text-gray-700">
                    847569 Beta Chowk
                    <br />
                    Near Marwari Gumti
                    <br />
                    Railway Station, Darbhanga
                  </p>
                </div>
              </div>

              {/* Phone */}
              <a
                href="tel:+914568885030"
                className="group flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:border-blue-100 hover:bg-blue-50/60"
              >
                <div
                  className="
                    flex h-11 w-11 shrink-0 items-center justify-center
                    rounded-xl bg-blue-100 text-blue-600 transition-all duration-300
                    group-hover:bg-blue-600 group-hover:text-white
                  "
                >
                  <FiPhone className="text-lg" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700 transition-colors group-hover:text-blue-600">
                    (456) 888-5030
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:pulsemeet@gmail.com"
                className="group flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:border-blue-100 hover:bg-blue-50/60"
              >
                <div
                  className="
                    flex h-11 w-11 shrink-0 items-center justify-center
                    rounded-xl bg-blue-100 text-blue-600 transition-all duration-300
                    group-hover:bg-blue-600 group-hover:text-white
                  "
                >
                  <FiMail className="text-lg" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-gray-700 transition-colors group-hover:text-blue-600">
                    pulsemeet@gmail.com
                  </p>
                </div>
              </a>
            </div>

            {/* ==================================================
                CAREERS
            ================================================== */}
            <div className="mt-7 rounded-2xl bg-blue-600 p-5 shadow-lg shadow-blue-100 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                  <FiHeart className="text-lg" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/70">
                    Careers at PULSE-MEET
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-white">
                    Build the future of healthcare with us.
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Learn more about our teams and current job openings.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.open(
                    "mailto:pulsemeet@gmail.com?subject=Career%20Opportunity%20at%20PULSE-MEET",
                    "_self"
                  )
                }
                className="
                  group mt-5 inline-flex min-h-[44px] items-center justify-center
                  gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold
                  text-blue-600 shadow-sm transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-lg active:scale-95
                "
              >
                Explore Jobs
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          QUICK SUPPORT STRIP
      ================================================== */}
      <section className="px-3 pb-12 sm:px-4 sm:pb-16 md:px-6 md:pb-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiClock />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Quick Response
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                We're here to assist.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiShield/>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Trusted Platform
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                Your healthcare matters.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiHeart />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Patient Focused
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                Designed around you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;