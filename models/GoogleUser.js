const mongoose = require("mongoose");

const GoogleUserSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  authSource: {
    type: String,
    required: true,
  },
});

const GoogleUser = mongoose.model("GoogleUser", GoogleUserSchema);
module.exports = GoogleUser;