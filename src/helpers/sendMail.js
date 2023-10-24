"use strict"


const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.NODEMAILER_PASS
    }

});



module.exports = async function (about) {

    console.log(about)

    const mailOptions = {
        from: {
            name: "Koray Rent A Car Company",
            address: process.env.MAIL_FROM,
        },
        to: process.env.MAIL_TO,
        subject: 'About Rent A Car.',
        text: {
            "startDate":about.startDate,
            "endDate":about.endDate,
            "price":about.totalPrice,
            "priceType":about.priceType,
            "quantity":about.quantity
        }
    };


    return(
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    )
    

}

