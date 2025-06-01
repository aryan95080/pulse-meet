import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'

const Login = () => {
  const [state, setState]=useState('Admin')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const {setAtoken,backendUrl}=useContext(AdminContext)
  

  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto '><span className='text-blue-500'>{state}</span> login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onClick={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full mt-1 p-2' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onClick={setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full mt-1 p-2' type="password" required />
        </div>
        <button className='border border-[#DADADA]  py-1.5 px-5 mx-auto rounded-md text-xl  hover:bg-blue-500 text-gray-700 hover:text-white'>Login</button>
        {
          state==='Admin'?<p>Doctor Login ? <span className='text-blue-500 cursor-pointer underline' onClick={()=>setState('Doctor')}>Click here</span></p>:<p>Admin Login ? <span className='text-blue-500 cursor-pointer underline'  onClick={()=>setState("Admin")}>Click here</span></p>
        }
      </div>
    </form>
  )  
}

export default Login