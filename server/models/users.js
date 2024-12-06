const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    referral: { type: String }
})
// fName, lName, email, phone, password, address, referral

const userModel = mongoose.model("users", userSchema)

module.exports = userModel