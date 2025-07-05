const mongoose = require("mongoose");

const commercialSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    businessSize: { type: String, required: true },
    typeOfEnvironment: { type: String, required: false },
    typeOfClean: { type: String, required: false },
    cleaningFrequency: { type: String, required: true },
    availabilityDays: { type: [String], required: false },
    insuranceRequired: { type: Boolean, required: false },
    budgetRange: { type: String, required: false },
    additionalNotes: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const CommercialModel = mongoose.model("CommercialRequest", commercialSchema);

module.exports = CommercialModel;
