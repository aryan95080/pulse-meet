import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
    const {aToken,setAToken}=useContext(AdminContext)
    const {dToken,setDToken}=useContext(DoctorContext)

    const navigate=useNavigate()

    const logout=()=>{
        navigate('/')
        aToken&&setAToken('')
        aToken&&localStorage.removeItem('aToken')
        dToken&&setDToken('')
        dToken&&localStorage.removeItem('dToken')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-5 py-1 border-b bg-blue-500 text-white'>
        <div className='flex items-center gap-2 text-xs'>
                <img className='w-30 sm:w-40 cursor-pointer bg-gray-200 rounded-3xl text-blue-500 px-2 py-0.5' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-300'>{aToken?'Admin':'Doctor'}</p>
        </div>
        <button onClick={logout} className='cursor-pointer rounded-full px-10 py-2 text-sm'>Logout</button>
    </div>
  )
}

export default Navbar