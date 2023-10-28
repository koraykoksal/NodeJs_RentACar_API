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
        trim:true
    },
    year:{
        type:Number,
        required:true,
        trim:true
    },
    gear:{
        type:String,
        required:true,
        enum:["Auto","Manuel"],
        default:"Auto",
        trim:true
    },
    pricePerDay:{
        type:Number,
        trim:true,
        unique:false,
        required:true
    },
    priceType:{
        type:String,
        required:true,
        enum:["EURO","USD"],
        default:"USD"
    },
    isPublish:{
        type:Boolean,
        trim:true,
        default:true
    },
    images:{
        type:Array,
        default:[]
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