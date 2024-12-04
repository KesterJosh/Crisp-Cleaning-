const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    phone:String,
    password:String,
    address:String,
    referral:String
})
// fName, lName, email, phone, password, address, referral

const userModel = mongoose.model("users", userSchema)

module.exports = userModel