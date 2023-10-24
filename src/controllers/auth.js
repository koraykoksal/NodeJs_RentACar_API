"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const jwt = require('jsonwebtoken')
const setToken = require('../helpers/setToken')

const User = require('../models/user')
const Token = require('../models/tokens')
const { token } = require('morgan')

module.exports = {

    login: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'Login with username and password'
            _swagger.deprecated = true
            _swagger.ignore = true
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    username: 'test',
                    password: '1234'
                }
            }
        */

        const { username, password } = req.body

        if (username && password) {

            const user = await User.findOne({ username, password })
            //user bilgisi token model de var mı kontrol edilir
            const user2 = await Token.findOne({userId:user._id})

            

            if (user) {

                if (user.isActive) {

                    if(user2){

                        res.send({
                            error:false,
                            token:user2.token
                        })
                    }
                    else{

                        const data = setToken(user)
                        const result = await Token.create({userId:user.id,token:data.access})

                        res.send({
                            error: false,
                            token:result
                            
                        })
                    }


                    

                } else {

                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')
                }
            } else {

                res.errorStatusCode = 401
                throw new Error('Wrong username or password.')
            }
        } else {

            res.errorStatusCode = 401
            throw new Error('Please enter username and password.')
        }
    },

    refresh: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Token Refresh'
            #swagger.description = 'Refresh accessToken with refreshToken'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    token: {
                        refresh: '...refreshToken...'
                    }
                }
            }
        */

        const refreshToken = req.body?.token?.refreshToken

        if (refreshToken) {

            jwt.verify(refreshToken, process.env.REFRESH_KEY, async function (err, userData) {

                if (err) {

                    res.errorStatusCode = 401
                    throw err
                } else {

                    const { _id, password } = userData

                    if (_id && password) {

                        const user = await User.findOne({ _id })

                        if (user && user.password == password) {

                            if (user.isActive) {

                                res.send({
                                    error: false,
                                    token: setToken(user, true)
                                })

                            } else {

                                res.errorStatusCode = 401
                                throw new Error('This account is not active.')
                            }
                        } else {

                            res.errorStatusCode = 401
                            throw new Error('Wrong id or password.')
                        }
                    } else {

                        res.errorStatusCode = 401
                        throw new Error('Please enter id and password.')
                    }
                }
            })

        } else {
            res.errorStatusCode = 401
            throw new Error('Please enter token.refresh')
        }
    },

    logout: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        */

        res.send({
            error: false,
            message: 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        })

    },

}
