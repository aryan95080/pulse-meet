import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="bg-blue-500 flex flex-col md:flex-row flex-wrap w-[95%] mx-auto rounded-lg overflow-hidden px-5 md:px-5 lg:px-20">

      {/*left side */}

      <div className="md:w-1/2 flex-col items-start justify-center gap-4 m-auto px-10 py-5 md:py-[5.5vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br />
          With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-medium">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p >
            Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" />
            schedule your appoinment hassle-free.
          </p>
        </div>
        <a className="bg-white items-center gap-3 px-3 py-2 rounded-full text-gray-600 text-md mt-5 w-45  lg:w-50 justify-center flex hover:scale-105 transition-all duration-300 " href="#speciality">
          Book appoinment<img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
        
      </div>

      {/*right side  */}

      <div className="md:w-1/2 relative ">
        <img
          className="md:absolute bottom-0 w-full h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
