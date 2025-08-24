import { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointments=()=> {
  const {backendUrl,token,getDoctorsData}=useContext(AppContext)
  const [appointments,setAppointments]=useState([])

  const months=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const sloteDateFormate=(slotDate)=>{
    const dateArray=slotDate.split('-')
    return `${dateArray[2]} ${months[Number(dateArray[1]) - 1]} ${dateArray[0]}`;

  }
  const navigate=useNavigate()
  const getUserAppointments=async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments) 
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }

  const cancelAppointment=async(appointmentId)=>{
    try {
      // console.log(appointmentId);
      const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        setAppointments(prev =>
        prev.map(item =>
          item._id === appointmentId ? { ...item, cancelled: true } : item
        )
      );
        // getUerAppointments()
        getDoctorsData() // Refresh doctor data after cancellation
      }
      else{
        toast.error(data.message) 
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  
  const initpay=(order)=>{
    const options={
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. 
      currency: order.currency,
      name: "Pulse+Meet", 
      description: "Appointment Payment",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async (response)=>{
        // Handle successful payment here
        console.log(response);
        try {
          const {data}=await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}})
          if(data.success){
            getUserAppointments() // Refresh appointments after successful payment
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      },
    }
    const rzp=new window.Razorpay(options);
    rzp.open();
  }

  const appointmentRazorpay=async(appointmentId)=>{
    try {
      const {data}=await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}});
    if(data.success){
      //console.log(data.order);
      initpay(data.order);
    }
  
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
    
  }

  useEffect(()=>{
      getUserAppointments()
  },[token])

  return (
    <div className='w-[95%] mx-[2.5%]'>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div className='px-1'>
        {appointments.map((item,index)=>(
          <div className='grid grid-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-blue-600 rounded' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-800 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs'><span>Date & Time:</span> {sloteDateFormate(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col justify-end gap-5'>
              {!item.cancelled&&item.payment &&!item.isCompleted&&<button className='bg-green-400  text-sm text-white text-center sm:min-w-48 py-2 border rounded cursor-pointer'>Payment Done</button>}
              {!item.cancelled&&!item.payment&&!item.isCompleted&&<button onClick={()=>appointmentRazorpay(item._id)} className='bg-blue-600  text-sm text-white text-center sm:min-w-48 py-2 border rounded cursor-pointer'>Pay Online</button>}
              {!item.cancelled&&!item.isCompleted&&<button onClick={()=>cancelAppointment(item._id)} className='hover:bg-red-600 hover:text-white text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded cursor-pointer'>Cancel Appointment</button>}
              {item.cancelled&&!item.isCompleted&&<button className='bg-red-600 text-sm text-white text-center sm:min-w-48 py-2 border rounded cursor-pointer'>Cancelled Appointment</button>}
              {item.isCompleted&&<button className='sm:min-w-48 py-2 border border-green-400 rounded text-green-500'>Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments