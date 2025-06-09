const mongoose = require("mongoose");

const commercialSchema = new mongoose.Schema({
  BusinessName: { type: String, required: true },
  email: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  businessType: { type: String, required: true },
  businessSize: { type: String, required: true },
  cleaningFrequency: { type: String, required: true },
  specialRequirements: { type: String, required: true },
  startDate: { type: String, required: true },
  businessHours: { type: String, required: true },
  accessInstructions: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  budgetRange: { type: String, required: true },
  contractLength: { type: String, required: true },
  insuranceRequired: { type: String, required: false },
  additionalNotes: { type: String, required: false },
  taxId: { type: String, required: false },
});

const commercialModel = mongoose.model("commercial", commercialSchema);

module.exports = commercialModel;
