"use strict"


const mongan=require('morgan')
const fs=require('node:fs')


const now=new Date()
const today=now.toISOString().split('T')[0]


module.exports=mongan('combined',{
    stream: fs.createWriteStream(`./logs/${today}.log`)
})
