const express = require("express");
const router = express.Router();
const User = require("../models/users");

// POST /api/auth/verify-otp
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Email and OTP are required.",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const otpMatch = user.resetOtp === parseInt(otp);
    const notExpired =
      user.otpExpires && new Date(user.otpExpires) > new Date();

    if (!otpMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (!notExpired) {
      return res.status(410).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // Clear OTP after successful verification
    user.resetOtp = null;
    user.otpExpires = null;
    await user.save();

    res.json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during OTP verification.",
    });
  }
});

module.exports = router;
