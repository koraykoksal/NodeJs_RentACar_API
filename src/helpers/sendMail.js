"use strict"


const { response } = require('express');
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.NODEMAILER_PASS
    }

});



module.exports =  function (about,car) {

    const {startDate,endDate,price,priceType,quantity,totalPrice} = about
    const {plateNumber,brand,model,year,gear}=car

    const mailOptions = {
        from: {
            name: "Koray Rent A Car Company",
            address: process.env.MAIL_FROM,
        },
        to: process.env.MAIL_TO,
        subject: 'About Rent A Car.',
        text:`
            Dear Sir or Madam,
            
            Information:
            - Car Plate Number: ${plateNumber}
            - Brand: ${brand}
            - Model: ${model}
            - Gear: ${gear}
            - Year: ${year}
            - Rent Startdate: ${startDate}
            - Rent Enddate: ${endDate}
            - Total Day: ${quantity}
            - Total Price: ${totalPrice} ${priceType}
            
            Best Regards,
            Koray Rent A Car Company
        `

    };


    return transporter.sendMail(mailOptions).then(res=>console.log(res.response)).catch(err=>console.log(err))


}

