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
    },
    quantity:{
        type:Number,
        default:1,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
    priceType:{
        type:String,
        required:true,
        trim:true
    }


},{collection:'reservations',timestamps:true})


module.exports=mongoose.model('Reservation',ReservationSchema)