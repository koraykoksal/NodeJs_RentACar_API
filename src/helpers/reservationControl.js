"use strict"


const reservation = require('../models/reservation')


module.exports=function(aracNo,baslangic,bitis){


    const reservationCar = reservation.findOne({carId:aracNo,
        $or:[
            {
                startDate:{$lte:baslangic},
                endDate:{$lte:baslangic}
            },
            {
                startDate:{$lte:bitis},
                endDate:{$gte:bitis}
            },
            {
                startDate:{$gte:baslangic},
                endDate:{$lte:bitis}
            }
        ]
    })

    console.log("reservationCar : ",reservationCar)

    if(reservationCar) return true

    // .exec((err,result)=>{
    //     if(err){
    //         console.log("hata var")
    //         return err
    //     }
    //     if(result){
    //         console.log("araç uygun değil")
    //         return result
    //     }
    //     else{
    //         console.log("araç uygun")
    //     }
    // })


}


