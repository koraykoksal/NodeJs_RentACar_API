"use strict"

const mongoose=require('mongoose')

const TokenSchema= new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    token:{
        type:String,
        required:true,
        trim:true
    }

},{collection:'tokens',timestamps:true})

module.exports=mongoose.model('Token',TokenSchema)