import React from "react";
import { assets } from "../assets/assets";
import {
  FiArrowRight,
  FiCheckCircle,
  FiHeart,
  FiShield,
  FiTarget,
  FiUsers,
  FiZap,
} from "react-icons/fi";

const About = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const features = [
    {
      icon: FiZap,
      title: "Efficiency",
      description:
        "Streamlined appointment scheduling that fits easily into your busy lifestyle.",
    },
    {
      icon: FiShield,
      title: "Convenience",
      description:
        "Access a network of trusted healthcare professionals and manage appointments with ease.",
    },
    {
      icon: FiHeart,
      title: "Personalization",
      description:
        "A simple experience designed to help you stay organized and on top of your healthcare needs.",
    },
  ];

  return (
    <main className="w-full overflow-x-hidden bg-gray-50">
      {/* ===================== HERO ===================== */}
      <section className="px-3 pt-5 sm:px-4 sm:pt-7 md:px-6 md:pt-10">
        <div
          className="
            relative mx-auto flex w-full max-w-7xl overflow-hidden
            rounded-2xl bg-white shadow-sm ring-1 ring-gray-100
            sm:rounded-3xl
          "
        >
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />

          <div className="relative z-10 grid w-full items-center md:grid-cols-2">
            {/* Text */}
            <div className="px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:px-4 sm:text-xs">
                <FiHeart className="text-sm" />
                About PULSE-MEET
              </div>

              <h1 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
                Healthcare that feels
                <span className="block text-blue-600">simple & connected.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:mt-5 sm:text-base">
                PULSE-MEET is designed to make finding trusted doctors and
                booking appointments a smooth, convenient experience.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
                <a
                  href="#why-us"
                  className="
                    inline-flex min-h-[44px] items-center justify-center gap-2
                    rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold
                    text-white shadow-lg shadow-blue-200 transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl
                    active:scale-95
                  "
                >
                  Why Choose Us
                  <FiArrowRight className="text-base" />
                </a>

                <button
                  type="button"
                  onClick={scrollToTop}
                  className="
                    inline-flex min-h-[44px] items-center justify-center gap-2
                    rounded-full border border-gray-200 bg-white px-5 py-2.5
                    text-sm font-semibold text-gray-700 transition-all duration-300
                    hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600
                    active:scale-95
                  "
                >
                  Learn More
                </button>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-gray-500 sm:text-sm">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-600" />
                  Easy scheduling
                </div>

                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-600" />
                  Trusted professionals
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative flex min-h-[260px] items-end justify-center px-5 pt-4 sm:min-h-[320px] md:min-h-[430px] md:px-8 md:pt-8">
              <div className="pointer-events-none absolute bottom-6 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-100 blur-3xl sm:h-72 sm:w-72" />

              <img
                src={assets.about_image}
                alt="About PULSE-MEET healthcare"
                className="
                  relative z-10 h-auto w-full max-w-[320px] object-contain
                  transition-transform duration-500 hover:scale-[1.02]
                  sm:max-w-[390px] md:max-w-[440px]
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ABOUT CONTENT ===================== */}
      <section className="px-3 py-12 sm:px-4 sm:py-16 md:px-6 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Section heading */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 shadow-sm sm:px-4 sm:text-xs">
              <FiTarget />
              Our Purpose
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              Making healthcare
              <span className="block text-blue-600">
                easier for everyone.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
              We focus on creating a simple digital experience that connects
              patients with healthcare professionals.
            </p>
          </div>

          {/* Content cards */}
          <div className="space-y-5">
            <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:rounded-3xl sm:p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FiUsers className="text-xl" />
              </div>

              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                A better way to manage appointments
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                Welcome to PULSE-MEET, your trusted partner in managing your
                healthcare needs conveniently and efficiently. We understand
                the challenges individuals face when it comes to scheduling
                doctor appointments and managing their healthcare journey.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:rounded-3xl sm:p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FiShield className="text-xl" />
              </div>

              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                Built around a smooth experience
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                PULSE-MEET is committed to excellence in healthcare technology.
                We continuously strive to enhance the platform by integrating
                modern technology to improve usability and deliver a smooth
                service experience.
              </p>
            </article>

            <article className="rounded-2xl border border-blue-100 bg-blue-600 p-5 shadow-lg shadow-blue-100 sm:rounded-3xl sm:p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                <FiTarget className="text-xl" />
              </div>

              <h3 className="text-lg font-bold text-white sm:text-xl">
                Our Vision
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base">
                Our vision at PULSE-MEET is to create a seamless healthcare
                experience for every user. We aim to bridge the gap between
                patients and healthcare providers, making it easier for you to
                access the care you need, when you need it.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE US ===================== */}
      <section
        id="why-us"
        className="scroll-mt-24 px-3 pb-12 sm:px-4 sm:pb-16 md:px-6 md:pb-20"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:px-4 sm:text-xs">
              <FiCheckCircle />
              Why Choose Us
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              A simpler healthcare experience
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Everything is designed around making appointment management
              easier, more convenient, and more personalized.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-3 md:gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="
                    group relative overflow-hidden rounded-2xl border border-gray-100
                    bg-white p-6 shadow-sm transition-all duration-300
                    hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl
                    sm:rounded-3xl sm:p-7
                  "
                >
                  <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-blue-50 transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative z-10">
                    <div
                      className="
                        flex h-12 w-12 items-center justify-center rounded-2xl
                        bg-blue-50 text-blue-600 transition-all duration-300
                        group-hover:bg-blue-600 group-hover:text-white
                      "
                    >
                      <Icon className="text-xl" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-gray-900">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {feature.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-600">
                      <span>Learn more</span>
                      <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;