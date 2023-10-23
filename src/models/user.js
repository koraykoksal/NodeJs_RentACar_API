"use strict"

const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({

    username:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:[true,"Email field must be required."],
        unique:[true,"There is this email. Email field must be unique."],
        validate:[
            (email)=>{
                const emailRegexCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                return emailRegexCheck.test(email)
            },"Email type is incorrect !"
        ]

    },
    gender:{
        type:String,
        enum:[null,"M","F"],
        default:null
    },
    firstname:{
        type:String,
        trim:true,
        required:true,
    },
    lastname:{
        type:String,
        trim:true,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    }



},{collection:'users',timestamps:true})


module.exports=mongoose.model('User',UserSchema)

