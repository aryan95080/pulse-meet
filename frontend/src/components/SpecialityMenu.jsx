import React from 'react'
import {Link} from 'react-router-dom'
import { specialityData } from '../assets/assets'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='w-[95%] mx-[2.5%] my-10 flex flex-col items-center gap-4 py-16 text-gray-600 bg-transparent backdrop-blur-2xl shadow-lg shadow-gray-300'>
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors , Schedule your appoinment hassle-free.</p>
      <div className='flex sm:justify-center w-full px-3 gap-3 py-5 overflow-scroll '>
        {specialityData.map((item,index)=>(
          <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 bg-transparent backdrop-blur-2xl shadow-lg shadow-gray-300 px-5 py-2 rounded-sm' key={index} to={`/doctors/${item.speciality}`}>
            <img className='w-16 sm:w-24 mb-3' src={item.image} alt="" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
      
    </div>
  )
}

export default SpecialityMenu