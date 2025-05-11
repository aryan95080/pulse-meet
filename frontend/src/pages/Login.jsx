import React, { useState } from 'react'

const Login = () => {
  const [state,setState]=useState('Sign Up')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')

  const onSubmitHandler= async (event)=>{
    event.preventDefault()

  }
  return (
    <form className='min-h-[80vh] flex items-center justify-center  '>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:w-96 border-gray-400 ] rounded-2xl bg-transparent shadow-lg shadow-gray-600 px-5 py-6'>
        <p className='text-2xl font-semibold'>{state==='Sign Up' ?'Create Account':'Login'}</p>
        <p className='text-center'>Please {state==='Sign Up' ?'Sign Up':'Login'} to book appointment </p>
        {
          state==='Sign Up'&&<div className='w-full px-2'>
          <p>Full Name</p>
          <input className='border border-zinc-300 w-full mt-1 rounded-md px-2 py-1' placeholder='Enter name' type="text" onChange={(e)=>setName(e.target.value)} value={name} required />
        </div>
        }
        <div className='w-full px-2'>
          <p>Email</p>
          <input className='border border-zinc-300 w-full mt-1 rounded-md px-2 py-1' placeholder='example@123.com' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full px-2'>
          <p>Password</p>
          <input className='border border-zinc-300 w-full mt-1 rounded-md px-2 py-1' placeholder='password' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required />
        </div>
        <button className='bg-blue-500 text-white rounded-md mx-auto py-1.5 px-3'>{state==='Sign Up' ?'Create Account':'Login'}</button>
        {
          state==='Sign Up'?<p>Already have an Account ? <span onClick={()=>setState('Login')} className='text-blue-600 underline cursor-pointer'>Login here</span></p>:<p>Create an new account ? <span onClick={()=>setState('Sign Up')} className='text-blue-600 cursor-pointer underline'>Click here</span></p>

        }
        
      </div>

      
    </form>
  )
}

export default Login