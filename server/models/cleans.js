const mongoose = require('mongoose')

const cleanSchema = new mongoose.Schema({
    typeOfClean:String,
    rooms:String,
    kitchen:String,
    bathroom:String,
    others:String,
    windows:String,
    walls:String,
    cabinets:String,
    orginization:String,
    blinds:String,
    stove:String,
    fridge:String,
    dishwasher:String,
    garage:String,
    microwave:String,
    laundry:String,
    tiles:String,
    date:String,
    time:String,
    deltatime:String,
    regularOronetime:Boolean,
    frequency:String,
    mon:String,
    tue:String,
    wed:String,
    thu:String,
    fri:String,
    sat:String,
    sun:String,
    getinside: String,
    parkspot: String,
    pet: String,
    spComments: String,
    discount: String,
    email:String

})

const cleanModel = mongoose.model("clean", cleanSchema)

module.exports = cleanModel