"use strict"

const Reservation = require('../models/reservation')
const Car = require('../models/cars')
const mail = require('../helpers/sendMail')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Reservations"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Reservation)


        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Reservation),
            data
        })

    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "Reservationname": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */

        //* yeni rezervasyon oluşturulmak istendiğinde önce aracın ispublish değeri kontrol edilir. Burada arac yayına hazır mı ona bakılır

        const { startDate, endDate, carId } = req.body

        const selectedCar = await Car.findOne({ _id: carId })

        const fark = new Date(endDate).getTime() - new Date(startDate).getTime()
        const gunSayisi = Math.floor(fark / 1000 / 60 / 60 / 24)

        const totalUcret = gunSayisi * selectedCar.pricePerDay

        req.body.quantity = gunSayisi
        req.body.totalPrice = totalUcret
        req.body.priceType = selectedCar.priceType



        if (selectedCar.isPublish) {

            //* rezervasyonu oluşturulmak istenen aracın rezervasyonu var mı kontol edilir
            // const data = await Reservation.findOne({ _id:  carId})

            const data = await Reservation.create(req.body)

            res.status(201).send({
                error: false,
                data
            })

            mail(data)

        }
        else {
            res.status(201).send({
                error: true,
                result: "Sorry, The car is not available !",
                details:`isPublish : ${selectedCar.isPublish}`
            })
        }


    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */

        const data = await Reservation.findOne({ _id: req.params.id })


        res.status(200).send({
            error: false,
            data
        })


    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "Reservationname": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */

        const data = await Reservation.updateOne({ _id: req.params.id }, req.body)

        res.status(202).send({
            error: false,
            data,
            new: await Reservation.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

        const data = await Reservation.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },

}