import express from 'express'
import authDoctor from '../middlewares/authDoctor.js'
import { appointmentDoctor } from '../controllers/doctorController.js'

const doctorRouter=express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentDoctor)
export default doctorRouter