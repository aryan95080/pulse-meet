import express from 'express'
import authDoctor from '../middlewares/authDoctor.js'
import { appointmentsDoctor, doctorList, loginDoctor } from '../controllers/doctorController.js'

const doctorRouter=express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
export default doctorRouter