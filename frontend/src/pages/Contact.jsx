import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='w-[95%] mx-[2.5%] '>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='flex my-10 flex-col md:flex-row justify-center gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px] rounded' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>847569 Beta Chowk <br /> near Marwari Gumti <br />Railway station Darbhanga</p>
          <p className='text-gray-500'>TEl: (456) 888-5030 <br />EMAIL: pulsemeet@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers At PULSEMEET</p>
          <p className='text-gray-500'>Learn more about our teams job openings.</p>
          <button className='hover:bg-blue-600 hover:text-white px-5 rounded py-3 bg-transparent backdrop-blur-2xl shadow-lg shadow-gray-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact