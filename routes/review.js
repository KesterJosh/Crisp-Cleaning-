const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Review = require("../models/review");

const router = express.Router();

// Setup Multer for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },// 10MB max
});

// POST /api/reviews
router.post("/", upload.single("video"), async (req, res) => {
  try {
    const { reviewType, text, userId, userName } = req.body;

    // Validate required fields
    if (!reviewType || !userId || !userName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (reviewType === "text" && !text) {
      return res.status(400).json({ message: "Text review is required" });
    }

    if (reviewType === "video" && !req.file) {
      return res.status(400).json({ message: "Video file is required" });
    }

    const newReview = new Review({
      reviewType,
      text: reviewType === "text" ? text : undefined,
      videoUrl:
        reviewType === "video" ? `/uploads/${req.file.filename}` : undefined,
      userId,
      userName,
    });

    await newReview.save();

    res
      .status(201)
      .json({ message: "Review saved successfully", review: newReview });
  } catch (err) {
    console.error("Review submission error:", err);
    res
      .status(500)
      .json({ message: "Error saving review", error: err.message });
  }
});

module.exports = router;
