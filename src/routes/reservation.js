"use strict"

const router = require('express').Router()
const reservation=require('../controllers/reservation')

// URL : reservations

router.route('/')
.get(reservation.list)
.post(reservation.create)


router.route('/:id')
.post(reservation.read)
.put(reservation.update)
.patch(reservation.update)
.delete(reservation.delete)

module.exports=router