import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppoinments=()=> {
  const {backendUrl,token}=useContext(AppContext)
  const [appointments,setAppointments]=useState([])
  const getUerAppointments=async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments) 
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }
  useEffect(()=>{
    if(toast){
      getUerAppointments()
    }
  },[token])

  return (
    <div className='w-[95%] mx-[2.5%]'>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div className='px-1'>
        {appointments.map((item,index)=>(
          <div className='grid grid-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-blue-600 rounded' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-800 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs'><span>Date & Time:</span> {item.slotDate} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col justify-end gap-5'>
              <button className='bg-blue-600  text-sm text-white text-center sm:min-w-48 py-2 border rounded'>Pay Online</button>
              <button className='hover:bg-red-600 hover:text-white text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded'>Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppoinments