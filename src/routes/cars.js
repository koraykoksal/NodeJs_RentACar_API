"use strict"


const router = require('express').Router()
const cars=require('../controllers/cars')


const multer = require('multer')

//* form upload tarafından gelen datann nereye saklanacağını gösteriyor
const upload=multer({
    storage:multer.diskStorage({
        destination:'./upload'
    })
})

//? tek bir resim yüklemeye isim verir
//upload.single()


// URL : carss

router.route('/')
.get(cars.list)
.post(upload.single('image'),cars.create)


router.route('/:id')
.get(cars.read)
.put(cars.update)
.patch(cars.update)
.delete(cars.delete)

module.exports=router