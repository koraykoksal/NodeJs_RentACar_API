"use strict"


const auth=require('../controllers/auth')
const router = require('express').Router()



router.route('/login').post(auth.login)
router.route('/refresh').post(auth.refresh)
router.route('/logout').post(auth.logout)


module.exports=router




