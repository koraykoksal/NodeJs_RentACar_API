"use strict"

const Car=require('../models/cars')

module.exports={


    list: async (req, res) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "List Cars"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Car)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Car),
            data
        })

        
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Create Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "Carname": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */
       
    //    console.log("file : ",req.file) // upload single()
    //    console.log("files : ",req.files) // upload array() or upload.any()

       req.body.images = req.body?.images || []

       for(let file of req.files){
        req.body.images.push(file.originalName)
       }

        const data = await Car.create(req.body)

        res.status(201).send({
            error: false,
            data
        })

       
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Get Single Car"
        */

        const data = await Car.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

        

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Update Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "Carname": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */

        const data = await Car.updateOne({ _id: req.params.id }, req.body)

        res.status(202).send({
            error: false,
            data,
            new: await Car.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Delete Car"
        */

        const data = await Car.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },

}
