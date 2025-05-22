// utils/seedRewards.js
const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  challengeType: { type: String, required: true },
  completed: { type: Number, required: true },
  required: { type: Number, required: true },
  rewardDescription: { type: String, required: true },
  claimed: { type: Boolean, default: false },
});

const Reward = mongoose.models.Reward || mongoose.model('Reward', rewardSchema);

const seedRewards = async (userId) => {
  if (!userId) throw new Error('No user ID provided to seedRewards');

  try {
    // Optionally clean old rewards for this user
    await Reward.deleteMany({ userId });

    // Create new reward entries
    const rewards = await Reward.create([
      {
        userId,
        challengeType: 'referrals',
        completed: 0,
        required: 4,
        rewardDescription: 'Get 10% off after 4 referrals',
      },
      {
        userId,
        challengeType: 'cleans',
        completed: 0,
        required: 3,
        rewardDescription: 'Free clean after 3 cleans',
      },
    ]);

    return rewards;
  } catch (err) {
    console.error('Failed to seed rewards:', err);
    throw err;
  }
};

module.exports = seedRewards;
