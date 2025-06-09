const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewType: {
    type: String,
    enum: ["text", "video"],
    required: true,
  },
  text: {
    type: String,
    required: function () {
      return this.reviewType === "text";
    },
  },
  videoUrl: {
    type: String,
    required: function () {
      return this.reviewType === "video";
    },
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
