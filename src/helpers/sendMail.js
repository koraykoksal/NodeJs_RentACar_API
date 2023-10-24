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



module.exports =  function (about) {

    const {startDate,endDate,price,priceType,quantity,totalPrice} = about

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
            - StartDate: ${startDate}
            - EndDate: ${endDate}
            - TotalDay: ${quantity}
            - TotalPrice: ${totalPrice} ${priceType}
            
            Best Regards,
            Koray Rent A Car Company
        `

    };


    return transporter.sendMail(mailOptions).then(res=>console.log(res.response)).catch(err=>console.log(err))


}

