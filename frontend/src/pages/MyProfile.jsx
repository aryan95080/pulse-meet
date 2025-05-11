import React, { useState } from 'react'
import {assets} from '../assets/assets'

const MyProfile=()=> {
  const [userData,setUserData]=useState({
    name:"Indresh Kumar",
    image:assets.profile_pic,
    email:'indresh123@gmail.com',
    phone:'+91-589 598 8793',
    address:{
      line1:"LIG Sector-b Minal road Darbhanga",
      line2:"Laheria sarai beta choak Darbhanga"
    },
    gender:'Male',
    dob:'04-01-2005',
  })

  const [isEdit,setIsEdit]=useState(false)

  return (
    <div className='w-[95%] mx-auto flex flex-col gap-2 text-sm items-center justify-around'>
      <div className='px-10 py-5 rounded-xl bg-transparent shadow-2xl shadow-gray-500 '>
      <img className='w-25 rounded mx-auto ' src={userData.image} alt="" />
      <div className='flex justify-center mb-5'>
      {
        isEdit?<p><input className='bg-gray-50 text-2xl font-medium max-w-100 mt-4 ' type='text'value={userData.name}  onChange={e=>setUserData(prev=>({...prev,name:e.target.value}))}/></p>:<p className='font-medium text-2xl text-neutral-800 mt-4 items '>{userData.name}</p>
      }
      </div>
      <hr className='bg-zinc-400 h-[1px] border-none'/>
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_2fr] text-neutral-500'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-800'>{userData.email}</p>
          <p className='font-medium'>PHone:</p>
          {
            isEdit?<input className='bg-gray-100 max-w-52' type='text' value={userData.phone} onChange={e=>setUserData(prev=>({...prev,email:e.target.value}))}/>:<p className='text-blue-700'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit?<p><input className='bg-gray-50' type='text' value={userData.address.line1} onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} /><br /><input className='bg-gray-50' type='text'value={userData.address.line2} onChange={e=>setUserData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} /></p>:<p className='text-gray-500'>{userData.address.line1}<br/>{userData.address.line2}</p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>Basic information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 ' >
          <p className='font-medium'>Gender:</p>
          {
            isEdit?<select className='max-w-20 bg-gray-100' onChange={(e)=>setUserData(prev=>({...prev,gender:e.target.value}))}>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>

            </select>:<p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit?<input className='max-w-28 bg-gray-100' type='date' value={userData.dob} onChange={(e)=>setUserData(prev=>({...prev,dob:e.target.value}))} />:<p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit?<button className='border border-blue-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all ' onClick={()=>setIsEdit(false)}>Save information</button>:<button className='border border-blue-600 px-8 py-2 rounded-full  hover:bg-blue-600 hover:text-white transition-all ' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
      </div>
    </div>
  )
}

export default MyProfile