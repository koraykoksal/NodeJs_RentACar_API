"use strict"

const router = require('express').Router()
const tokens=require('../controllers/tokens')

// URL : tokenss

router.route('/')
.get(tokens.list)
.post(tokens.create)


router.route('/:id')
.get(tokens.read)
.put(tokens.update)
.patch(tokens.update)
.delete(tokens.delete)

module.exports=router