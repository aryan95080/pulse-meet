import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    const {aToken}=useContext(AdminContext)
  return (
    <div className='min-h-screen bg-white border-r border-gray-300'>
        {
            aToken&&<ul className='mt-5 text-gray-500' >
                <NavLink to={'/admin-dashboard'} className={({isActive})=>`flex items-center gap-3 py-3.5  px-3 mad:px-5 md:min-w-50 cursor-pointer ${isActive?'bg-blue-100 border-r-4 border-blue-600':''}`}>
                    <img src={assets.home_icon} alt="" />
                    <p>Dashboard</p>
                </NavLink>
                <NavLink to={'/all-appointments'} className={({isActive})=>`flex items-center gap-3 py-3.5  px-3 mad:px-5 md:min-w-50 cursor-pointer ${isActive?'bg-blue-100 border-r-4 border-blue-600':''}`}>
                    <img src={assets.appointment_icon} alt="" />
                    <p>Appointments</p>
                </NavLink>
                <NavLink to={'/add-doctor'} className={({isActive})=>`flex items-center gap-3 py-3.5  px-3 mad:px-5 md:min-w-50 cursor-pointer ${isActive?'bg-blue-100 border-r-4 border-blue-600':''}`}>
                    <img src={assets.add_icon} alt="" />
                    <p>Add Doctor</p>
                </NavLink>
                <NavLink to={'/doctor-list'} className={({isActive})=>`flex items-center gap-3 py-3.5  px-3 mad:px-5 md:min-w-50 cursor-pointer ${isActive?'bg-blue-100 border-r-4 border-blue-600':''}`}>
                    <img src={assets.people_icon} alt="" />
                    <p>Doctors List</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar