import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='w-[95%] mx-[2.5%] backdrop-blur-2xl shadow-2xl shadow-blue-300 px-5 mt-20 py-10 rounded-t-md'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt- text-sm'>
        {/* ------left section------ */}
        <div className=''>
          <a className='flex justify-center items-center gap-5'  href=""><img className='w-10 md:w-20' src={assets.logo} alt="" /><p className='text-3xl md:text-5xl text-blue-800'>PULSE-MEET</p></a>
          <p className='w-full text-gray-600 leading-6 text-justify '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quam nesciunt fugit molestias quas? Eligendi nobis praesentium esse ipsam illum sequi dolorum consequuntur soluta laborum iste voluptatum expedita sunt corrupti, odio facere quibusdam repellat quisquam eaque </p>

        </div>

        {/* ------center section------ */}
        <div className=''>
          <p>COMPANY</p>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* ------right section------ */}
        <div className=''>
          <p>GET IN TOUCH</p>
          <ul>
            <li>
              +91-523-589-8923
            </li>
            <li>
              pulsmeet@gmail.com
            </li>
          </ul>
          
        </div>

      </div>
      <div className='flex flex-col items-center gap-4 mt-20 text-center'>
        <hr className='w-full bg-green-400' />
        <p className=''>Copyright 2025@ pulsmeet  - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer