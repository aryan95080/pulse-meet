import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='w-[95%] mx-[2.5%] '>
      <div className='text-center text-2xl my-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='flex flex-col md:flex-row gap-10 my-10 px-5'>
        <img className='w-full md:max-w-[360px] rounded' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center text-justify gap-6 md:w-3/4 text-sm text-gray-600'>
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <b className='text-gray-600'>Our Vision</b>
          <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it</p>
        </div>
      </div>
      <div className='text-center'>
        <p>WHY <span className='text-gray-600 font-semibold'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row my-10 rounded overflow-hidden bg-transparent backdrop-blur-2xl shadow-lg shadow-blue-200 '>
        <div className='px-10 py-15 text-justify hover:bg-blue-500 hover:text-white transition-all duration-500 text-gray-500 cursor-pointer m-5 bg-transparent backdrop-blur-2xl shadow-lg shadow-gray-300 rounded'>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='px-10 py-15 text-justify hover:bg-blue-500 hover:text-white transition-all duration-500 text-gray-500 cursor-pointer m-5 bg-transparent backdrop-blur-2xl shadow-lg shadow-gray-300 rounded'>
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='px-10 py-15 text-justify hover:bg-blue-500 hover:text-white transition-all duration-500 text-gray-500 cursor-pointer m-5 bg-transparent backdrop-blur-2xl shadow-lg shadow-gray-300 rounded'>
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About