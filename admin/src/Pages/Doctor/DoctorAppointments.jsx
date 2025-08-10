import React from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext } from 'react'
import { useEffect } from 'react'

const DoctorAppointments = () => {
  const {dToken, getAppointments, appointments} = useContext(DoctorContext)

  useEffect(()=>{
    if(dToken){
      getAppointments()
    }
  }, [dToken])

  return (
    <div>doctorAppointments</div>
  )
}

export default DoctorAppointments