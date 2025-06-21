// utils/seedRewards.js
const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  challengeType: { type: String, required: true },
  completed: { type: Number, required: true },
  required: { type: Number, required: true },
  rewardDescription: { type: String, required: true },
  claimed: { type: Boolean, default: false },
});

const Reward = mongoose.models.Reward || mongoose.model("Reward", rewardSchema);

const seedRewards = async (userId) => {
  if (!userId) throw new Error("No user ID provided to seedRewards");

  try {
    // Optionally clean old rewards for this user
    await Reward.deleteMany({ userId });

    // Create new reward entries
    const rewards = await Reward.create([
      {
        userId,
        challengeType: "referrals",
        completed: 0,
        required: 1,
        rewardDescription: "Refer 1 friend",
      },
      {
        userId,
        challengeType: "referrals",
        completed: 0,
        required: 5,
        rewardDescription: "Refer 5 friends",
      },
      {
        userId,
        challengeType: "referrals",
        completed: 0,
        required: 10,
        rewardDescription: "Refer 10 friends",
      },
      {
        userId,
        challengeType: "cleans",
        completed: 0,
        required: 5,
        rewardDescription: "Schedule 5 cleans",
      },
      {
        userId,
        challengeType: "cleans",
        completed: 0,
        required: 20,
        rewardDescription: "Schedule 20 cleans",
      },
      {
        userId,
        challengeType: "cleans",
        completed: 0,
        required: 50,
        rewardDescription: "Schedule 50 cleans",
      },
      {
        userId,
        challengeType: "misc",
        completed: 0,
        required: 1,
        rewardDescription: "Leave a positive review",
      },
      {
        userId,
        challengeType: "misc",
        completed: 0,
        required: 1,
        rewardDescription: "Tip the cleaner",
      },
      {
        userId,
        challengeType: "misc",
        completed: 0,
        required: 1,
        rewardDescription: "Send a positive video testimonial",
      },
    ]);

    return rewards;
  } catch (err) {
    console.error("Failed to seed rewards:", err);
    throw err;
  }
};

module.exports = seedRewards;
