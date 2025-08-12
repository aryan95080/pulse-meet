import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"


const changeAvailiblity=async(req,res)=>{
    try {
        // const {docId}=req.body
        const docId = req.docId
        const docData=await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({success:true,message:'Availability Changed'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const doctorList=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({succes:false,message:error.message})
    }
}

// API for doctor login
const  loginDoctor=async(req,res)=>{
    try {
        const {email,password}=req.body
        const doctor=await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,message:'Invalid Credentials'})
        }
        const isMatch=await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token=jwt.sign({doctorId:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,doctor,token})
        }
        else{
            res.json({success:false,message:'Invalid Credentials'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API for Doctor appointment for doctor panel
const appointmentsDoctor=async(req,res)=>{
    try {
        //const {docId}=req.body
        const docId = req.docId 
        const appointments=await appointmentModel.find({docId})
        res.json({success:true,appointments})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API for mark appointment as completed for doctor panel
const appointmentComplete=async()=>{
    try {
        const {docId,appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)
        if(appointmentData&&appointmentData.docId===docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true,message:'Appointment marked as completed'})
        }
        else{
            return res.json({success:false,message:'Mark Failed'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// API for cancel appointment for doctor panel
const appointmentCancel=async()=>{
    try {
        const {docId,appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)
        if(appointmentData&&appointmentData.docId===docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true,message:'Appointment Cancelled'})
        }
        else{
            return res.json({success:false,message:'Cancellation Failed'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

export {changeAvailiblity,doctorList,loginDoctor,appointmentsDoctor,appointmentComplete,appointmentCancel}