import React, { useContext } from "react";
import {useNavigate} from "react-router-dom"
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate=useNavigate()
  const {doctors}=useContext(AppContext)
  return (
    <div className="w-[95%] mx-[2.5%] px-3 my-5 flex flex-col items-center gap-4 py-16 text-gray-600 bg-transparent backdrop-blur-2xl shadow-lg shadow-gray-300">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="text-center text-sm sm:w-1/3">
        Simply broswe through our extensive list of trusted doctors.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-6 sm:px-3  text-gray-600 bg-white w-full text-xs sm:text-sm md:text-md ">
        {doctors.slice(0, 30).map((item, index) => (
          <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} key={index} className="rounded-xl overflow-hidden bg-cover cursor-pointer transition-all duration-500 bg-transparent backdrop-blur-2xl shadow-lg shadow-blue-100 hover:scale-105">
            <img className="bg-blue-400 w-full " src={item.image} alt="" />
            <div className="px-2 py-2">
              <div className="flex items-center gap-2 text-green-500 text-sm">
                <p className="bg-green-400 w-2 h-2 rounded-full"></p>
                <p>Available Here</p>
              </div>
              <p>{item.name}</p>
              <p>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className="hover:bg-blue-600 hover:text-white px-5 py-2 rounded-full text-xl backdrop-blur-lg shadow-gray-900 border-l-3 hover:border-white border-blue-500 border-b-3 shadow-2xl mt-7">
        more
      </button>
    </div>
  );
};

export default TopDoctors;
