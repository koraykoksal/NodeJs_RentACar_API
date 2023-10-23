"use strict"


const mongoose=require('mongoose')

const CarSchema=new mongoose.Schema({

    plateNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    brand:{
        type:String,
        required:true,
        unique:false,
        trim:true
    },
    model:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    year:{
        type:Number,
        required:true,
        unique:false,
        trim:true
    },
    gear:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    pricePerDay:{
        type:Number,
        trim:true,
        unique:false,
        required:true
    },
    isPublish:{
        type:Boolean,
        trim:true,
        default:true
    },
    createdId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    updatedId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{collection:'cars',timestamps:true})



module.exports=mongoose.model('Car',CarSchema)