const express = require('express');
const router = express.Router();
const Reward = require('../models/reward');

// Get user's rewards
router.get('/:userId', async (req, res) => {
  try {
    const rewards = await Reward.find({ userId: req.params.userId });
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Claim a reward
router.post('/claim/:rewardId', async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.rewardId);
    if (!reward) return res.status(404).json({ error: 'Reward not found' });

    if (reward.completed >= reward.required && !reward.claimed) {
      reward.claimed = true;
      await reward.save();

      // Simulate reward code generation
      reward.rewardCode = `DISCOUNT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
      await reward.save();

      return res.json({ message: 'Reward claimed!', reward });
    } else {
      return res.status(400).json({ error: 'Reward not eligible for claim' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
