const mongoose = require('mongoose');

const commercialSchema = new mongoose.Schema({
    BusinessName: { type: String, required: true },
    BusinessSize: { type: String, required: true },
    BusinessEnvironment: { type: String, required: true },
    BusinessTypeOfClean: { type: String, required: true },
    BusinessRoomAmount: { type: String, required: true },
    BusinessDetail: { type: String, required: true },
    BusinessTimeFrame: { type: String },
    BusinessHours: {type: String, require:true},
    BusinessComments: { type: String, required: true }, 
    email: { type: String, required: true } 
});

const commercialModel = mongoose.model("commercial", commercialSchema);

module.exports = commercialModel;