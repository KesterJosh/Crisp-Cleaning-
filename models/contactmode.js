const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    phone:String,
    message:String

})

const contactModel = mongoose.model("contacts", contactSchema)

module.exports = contactModel