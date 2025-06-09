const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  sessionId: String,
  customerEmail: String,
  price: Number,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  card: {
    brand: String,
    last4: String,
    exp_month: Number,
    exp_year: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
