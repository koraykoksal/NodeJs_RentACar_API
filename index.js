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



//? MIDDLEWARE

//* AUTHORIZATION
app.use(require('./src/middlewares/authentication'))


//* FIND SEARCH
app.use(require('./src/middlewares/findSearchSortPage'))



//? ROUTES


app.all('/',(req,res)=>{

    res.send({
        error:false,
        result:"Welcome to Rentacar API Services",
        document:"/document",
        user:req.user
    })

})

app.use('/api/auth',require('./src/routes/auth'))
app.use('/api/users',require('./src/routes/user'))
app.use('/api/cars',require('./src/routes/cars'))
app.use('/api/reservation',require('./src/routes/reservation'))
app.use('/api/token',require('./src/routes/token'))





//* ERROR HANDLER
app.use(require('./src/middlewares/errorHandler'))






const PORT = process.env.PORT || 8000

app.listen(PORT,()=>console.log(`Listenin http://172.0.0.1:${PORT}`))




