const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const senderEmail = "tm.num.001@gmail.com";
const senderPassword = "xcbgbcamxpbntkls";
const app = express();
const port = 8003;

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service provider
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
});

app.use(express.json());
app.use(cors());

// Generate a 6-digit OTP
function generateOTP() {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}

// Store OTPs in memory (for demonstration purposes; consider a more secure storage for production)
const otpStore = {};

// Define an endpoint for sending emails
app.post("/send-email", (req, res) => {
  const { to } = req.body;

  // Generate a 6-digit OTP
  const otp = generateOTP();
  const otpExpirationTime = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes (adjust as needed)

  otpStore[to] = { otp, expirationTime: otpExpirationTime };

  console.log(otpStore);

  // Email data
  const mailOptions = {
    from: senderEmail,
    to: to,
    subject: "Hello from Node.js",
    text: `This is a test email sent from Node.js!\nYour OTP code is: ${otp}`,
  };

  setTimeout(() => {
    if (Date.now() >= otpStore[to].expirationTime) {
      delete otpStore[to];
      console.info("OTP deleted", otpStore[to]);
    }
  }, 5 * 60 * 1000);

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ message: "Email sent successfully" });
    }
  });
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const storedOTP = otpStore[email];

  // check OTP
  if (
    storedOTP &&
    storedOTP.otp === otp &&
    Date.now() < storedOTP.expirationTime
  ) {
    res.json({ message: "Verified" });
  } else {
    res.json({ error: "Failed to verify" });
  }
});

app.listen(port, () => {
  console.log(`Email API is running on port ${port}`);
});
