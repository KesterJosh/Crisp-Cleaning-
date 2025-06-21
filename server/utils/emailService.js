// utils/emailService.js (or top of your file)
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME, // Your Gmail
    pass: process.env.EMAIL_PASSWORD, // Your App Password
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("Gmail SMTP is ready to send emails.");
  }
});

module.exports = transporter;
