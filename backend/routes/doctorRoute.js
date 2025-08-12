import express from 'express'
import authDoctor from '../middlewares/authDoctor.js'
import { appointmentsDoctor, doctorList, loginDoctor, appointmentCancel,appointmentComplete} from '../controllers/doctorController.js'

const doctorRouter=express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
export default doctorRouter