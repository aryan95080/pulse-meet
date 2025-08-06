import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments,cancelAppointment} = useContext(AdminContext);
  const { calculateAge,sloteDateFormate,currency} = useContext(AppContext);
  useEffect(() => {
    getAllAppointments();
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointment</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr] grid-flow-col py-3 px-6 border-b ">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctors</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData?.image || ""}
                alt="image "
              />
              <p>{item.userData?.name || "Unknown"}</p>
            </div>
            <p className="max-sm:hidden ">{calculateAge(item.userData?.dob)}</p> 
            <p>{sloteDateFormate(item.slotDate)},{item.slotTime}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={item.docData?.image || ""}
                alt="image "
              />
              <p>{item.docData?.name || "Unknown"}</p>
            </div>
            <p>{currency} {item.amount} /-</p>
            {
              !item.cancelled ? (
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => cancelAppointment(item._id)}
                >
                  Cancel
                </button>
              ) : (
                <p className="text-red-500">Cancelled</p>
              )
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
