"use strict"


const router = require('express').Router()
const cars=require('../controllers/cars')

// URL : carss

router.route('/')
.get(cars.list)
.post(cars.create)


router.route('/:id')
.get(cars.read)
.put(cars.update)
.patch(cars.update)
.delete(cars.delete)

module.exports=router