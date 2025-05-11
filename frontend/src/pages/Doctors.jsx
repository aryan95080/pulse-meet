import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  // console.log(speciality)

  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };
  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);
  return (
    <div className="w-[95%] mx-[2.5%]  rounded py-2.5 bg-transparent backdrop-blur-2xl shadow-lg shadow-blue-100 px-2 ">
      <p className="text-gray-500">Browse through the doctors speciality.</p>
      <div className="grid gid-col sm:grid-cols-[1.5fr_5fr] items-start gap-2 py-2.5  mt-5 backdrop-blur-2xl shadow-lg shadow-gray-300 px-2">
        
        <div className=" flex-col rounded text-gray-600 md:sticky top-20 z-0">
        <p
            className={`sm:w-auto py-2 pl-2 rounded cursor-pointer backdrop-blur-2xl shadow-lg shadow-blue-100 bg-gray-200 text-md lg:text-xl font-bold
              `}
          >
            FILTER THE SPECIALISE
          </p>
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`sm:w-auto py-2 px-4  rounded my-5 cursor-pointer transition-all duration-500  backdrop-blur-2xl shadow-lg shadow-blue-100 hover:scale-102 hover:bg-blue-400 hover:text-white 
              ${
              speciality === "General physician" ? "bg-blue-500 text-white" : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`sm:w-auto py-2 px-4  rounded my-5 cursor-pointer transition-all duration- backdrop-blur-2xl shadow-lg shadow-blue-100 hover:scale-102  hover:bg-blue-500 hover:text-white ${
              speciality === "Gynecologist" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`sm:w-auto py-2 px-4  rounded my-5 cursor-pointer transition-all duration-500  backdrop-blur-2xl shadow-lg shadow-blue-100 hover:scale-102  hover:bg-blue-500 hover:text-white ${
              speciality === "Dermatologist" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`sm:w-auto py-2 px-4  rounded my-5 cursor-pointer transition-all duration-500  backdrop-blur-2xl shadow-lg shadow-blue-100 hover:scale-102  hover:bg-blue-500 hover:text-white ${
              speciality === "Pediatricians" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`sm:w-auto py-2 px-4  rounded my-5 cursor-pointer transition-all duration-500 backdrop-blur-2xl shadow-lg shadow-blue-100 hover:scale-102  hover:bg-blue-500 hover:text-white ${
              speciality === "Neurologist" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`sm:w-auto py-2 px-4  rounded my-5 cursor-pointer transition-all duration-500  backdrop-blur-2xl shadow-lg shadow-blue-100 hover:scale-102  hover:bg-blue-500 hover:text-white ${
              speciality === "Gastroenterologist"
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-6 sm:px-3  text-gray-600  w-full text-xs sm:text-sm md:text-md">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="rounded-xl overflow-hidden bg-cover cursor-pointer transition-all duration-500 bg-transparent backdrop-blur-2xl shadow-lg shadow-blue-100 hover:scale-105"
            >
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
      </div>
    </div>
  );
};

export default Doctors;
