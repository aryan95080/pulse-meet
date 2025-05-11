import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'

const MyAppoinments=()=> {
  const {doctors}=useContext(AppContext)
  return (
    <div className='w-[95%] mx-[2.5%]'>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div className='px-1'>
        {doctors.slice(0,5).map((item,index)=>(
          <div className='grid grid-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-blue-600 rounded' src={item.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.name}</p>
              <p>{item.speciality}</p>
              <p className='text-zinc-800 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.address.line1}</p>
              <p className='text-xs'>{item.address.line2}</p>
              <p className='text-xs'><span>Date & Time:</span> 25, July, 2025 | 08:30pm</p>
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