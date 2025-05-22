const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challengeType: { type: String, enum: ['referrals', 'cleans', 'misc'], required: true },
  completed: { type: Number, default: 0 },
  required: { type: Number, required: true },
  claimed: { type: Boolean, default: false },
  rewardDescription: { type: String },
  rewardCode: { type: String }
});

module.exports = mongoose.model('Reward', rewardSchema);
