"use strict"


const express=require('express')
const app=express()


//? env
require('dotenv').config()


//? async eror
require('express-async-errors')


// ACCEPT JSON
app.use(express.json())



//* DB CONNECT
const {dbConnection}=require('./src/configs/dbConnections')
dbConnection()



// logger
app.use(require('./src/helpers/logger'))




//* MIDDLEWARE







//* ROUTES





//* ERROR HANDLER




app.use('/',(req,res)=>{

    res.send({
        error:false,
        result:"Welcome to Rentacar API Services",
        document:"/document",
        user:req.user
    })

})






const PORT = process.env.PORT || 8000

app.listen(PORT,()=>console.log(`Listenin http://172.0.0.1:${PORT}`))




