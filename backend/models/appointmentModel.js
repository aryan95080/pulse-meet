import mongoose from 'mongoose'

const appointmentSchema=new mongoose.Schema({
    userId:{type:String,require:true},
    docId:{type:String,require:true},
    slotDate:{type:String,require:true},
    slotTime:{type:String,require:true},
    userData:{type:Object,require:true},
    docData:{type:Object,require:true},
    amount:{type:Number,require:true},
    date:{type:Number,require:true},
    cancelled:{type:Boolean,require:true},
    payment:{type:Boolean,require:true},
    isCompleted:{type:Boolean,require:true},
})

const appointmentModel=mongoose.models.appointment||mongoose.model('appointment',appointmentSchema)
export default appointmentModel