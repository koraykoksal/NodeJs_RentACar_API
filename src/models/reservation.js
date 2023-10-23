"use strict"


const mongoose=require('mongoose')

const ReservationSchema=new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    carId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Car"
    },
    startDate:{
        type:Date,
        trim:true,
        required:true
    },
    endDate:{
        type:Date,
        trim:true,
        required:true
    }


},{collection:'reservations',timestamps:true})


module.exports=mongoose.model('Reservation',ReservationSchema)