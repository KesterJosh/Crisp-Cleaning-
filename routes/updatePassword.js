const express = require("express");
const router = express.Router();
const User = require("../models/users"); // your user model
const bcrypt = require("bcrypt")

// POST /api/auth/reset-password
router.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Email and password required." });

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Clear OTP fields
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
