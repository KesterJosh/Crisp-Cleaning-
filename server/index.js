// mongodb+srv://adeyelukester2:7EoKqh6yYM3uEd2f@crispsite.iuhh1.mongodb.net/?retryWrites=true&w=majority&appName=CrispSite
const express = require("express");
const connectDB = require("./db.js");
const itemModel = require("./models/item.js");
const userModel = require("./models/users.js");
const commercialModel = require("./models/commercial.js");
const contactModel = require("./models/contactmode.js");
const cors = require("cors");
const rewardRoutes = require("./routes/rewardRoutes.js");
const seedRewards = require("./utils/seedRewards.js");
const bodyParser = require("body-parser");
const path = require("path");
const publicPath = path.join(__dirname, "Views");
require("dotenv").config();
const reviewRoutes = require("./routes/review");
const stripe = require("stripe")(process.env.MY_STRIPE_KEY);
const webhookRoutes = require("./routes/stripeWebhook.js");
const Payment = require("./models/Payment.js");
const { OAuth2Client } = require("google-auth-library");
const GoogleUser = require("./models/GoogleUser.js");
const authRoutes = require("./routes/resetPassword.js");
const otpAuth = require("./routes/otpVerification.js");
const updatePassword = require("./routes/updatePassword.js");
const transporter = require("./utils/emailService");
const Review = require("./models/review.js");
require("dotenv").config;
const client = new OAuth2Client(
  "617840144228-0fa899q99cktsq7a8culf9cacamvr0kf.apps.googleusercontent.com"
);
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const cleanModel = require("./models/cleans.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", otpAuth);
app.use("/api/auth", updatePassword);

app.get("/", async (req, res) => {
  const items = await itemModel.find();
  res.json(items);
});

connectDB();

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json(
        "You don't have an account with us, or your email is not correct"
      );
    }

    const passwordMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (!passwordMatch) {
      return res.json("The password is incorrect");
    }

    await seedRewards(user._id);

    res.json({
      status: "Success",
      userId: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: "Error", message: "Server error" });
  }
});

app.post("/data", (req, res) => {
  const { userId } = req.body;

  // Validate that userId is provided
  if (!userId) {
    return res.status(400).json("User ID is required");
  }

  userModel
    .findById(userId)
    .then((user) => {
      if (user) {
        // Return the user's data, excluding sensitive information (e.g., password)
        const { password, ...userData } = user._doc; // _doc contains the user document in Mongoose
        res.json(userData);
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("An error occurred while retrieving the user data");
    });
});
// 📦 Commercial Cleaning Mail
const SendCommercialEmail = async (data, res) => {
  const {
    businessName,
    contactPerson,
    email,
    phone,
    address,
    businessSize,
    typeOfEnvironment,
    typeOfClean,
    cleaningFrequency,
    availabilityDays,
    insuranceRequired,
    budgetRange,
    additionalNotes,
  } = data;

  const mailOption = {
    from: '"Crisp Cleaning"',
    to: "crispcleaningmelbourne@outlook.com",
    subject: "New Commercial Cleaning Request",
    html: `
      <h3>Commercial Cleaning Request</h3>
      <p><strong>Business Name:</strong> ${businessName}</p>
      <p><strong>Contact Person:</strong> ${contactPerson}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Business Size:</strong> ${businessSize}</p>
      <p><strong>Type of Environment:</strong> ${typeOfEnvironment || "N/A"}</p>
      <p><strong>Type of Clean:</strong> ${typeOfClean || "N/A"}</p>
      <p><strong>Cleaning Frequency:</strong> ${cleaningFrequency}</p>
      <p><strong>Availability Days:</strong> ${
        availabilityDays?.join(", ") || "N/A"
      }</p>
      <p><strong>Insurance Required:</strong> ${
        insuranceRequired ? "Yes" : "No"
      }</p>
      <p><strong>Budget Range:</strong> ${budgetRange}</p>
      <p><strong>Additional Notes:</strong> ${additionalNotes || "None"}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOption);
    console.log("Commercial request email sent");
    res.status(200).json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error("Email sending failed:", err);
    res.status(500).json({ success: false, message: "Email failed to send" });
  }
};

module.exports = SendCommercialEmail;

const SendContactMail = (
  { first_name, last_name, email, phone, message },
  res
) => {
  const mailOption = {
    from: `"Crisp Support"`,
    to: "crispcleaningmelbourne@outlook.com",
    subject: "New Customer Contact Form",
    html: `
      <p>This message came from <strong>${first_name} ${last_name}</strong></p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phone}</p>
      <p><strong>Message:</strong><br/> ${message}</p>
    `,
  };

  transporter
    .sendMail(mailOption)
    .then(() => {
      console.log("Contact email sent");
      res.status(200).json({ success: true, message: "Email sent" });
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send email" });
    });
};

app.post("/register", (req, res) => {
  const { first_name, last_name, email, phone, password, address, referral } =
    req.body;

  if (!first_name || !last_name || !email || !phone || !password || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const currentDate = new Date();
  const formattedDate = `${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}/${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${currentDate.getFullYear()}`;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      userModel
        .create({
          first_name,
          last_name,
          email,
          phone,
          password: hash,
          address,
          referral,
          date_joined: formattedDate,
        })
        .then((user) => res.status(201).json({ message: "Successful", user }))
        .catch((err) => {
          console.error("Registration error:", err);
          if (err.code === 11000 && err.keyPattern?.email) {
            res.status(400).json({ error: "Email is already registered" });
          } else {
            res
              .status(500)
              .json({ error: "Internal Server Error", details: err.message });
          }
        });
    })
    .catch((error) => {
      console.error("Password hashing error:", error);
      res.status(500).json({ error: "Error encrypting password" });
    });
});

app.post("/commercial", (req, res) => {
  const {
    businessName,
    contactPerson,
    email,
    phone,
    address,
    businessType,
    businessSize,
    cleaningFrequency,
    specialRequirements,
    startDate,
    businessHours,
    accessInstructions,
    emergencyContact,
    budgetRange,
    contractLength,
    insuranceRequired,
    additionalNotes,
    taxId,
  } = req.body;

  commercialModel
    .create({
      businessName,
      contactPerson,
      email,
      phone,
      address,
      businessType,
      businessSize,
      cleaningFrequency,
      specialRequirements,
      startDate,
      businessHours,
      accessInstructions,
      emergencyContact,
      budgetRange,
      contractLength,
      insuranceRequired,
      additionalNotes,
      taxId,
    })
    .then((commercials) => {
      res.json({
        status: "Pending",
        message: "Business information submitted successfully.",
      });

      SendMail(
        {
          BusinessName,
          BusinessSize,
          BusinessEnvironment,
          BusinessTypeOfClean,
          BusinessRoomAmount,
          BusinessDetail,
          BusinessTimeFrame,
          BusinessHours,
          BusinessComments,
          email,
        },
        res
      );
    })
    .catch((err) => {
      console.log(err);
    });
});

// contactus

app.post("/contactus", (req, res) => {
  const { first_name, last_name, email, phone, message } = req.body;

  contactModel
    .create({
      first_name,
      last_name,
      email,
      phone,
      message,
    })
    .then((contacts) => {
      res.json({
        status: "Pending",
        message: "Message submitted successfully",
      });

      SendContactMail(
        {
          first_name,
          last_name,
          email,
          phone,
          message,
        },
        res
      );
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/update", (req, res) => {
  const { id, first_name, last_name, email, phone, password, address } =
    req.body;

  // Validate that the required ID is provided
  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Create an update object dynamically
  const updateData = { first_name, last_name, email, phone, address };

  // Check if the password needs to be updated
  const updateUser = () => {
    if (password) {
      // Hash the new password
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          updateData.password = hash;
          performUpdate();
        })
        .catch((err) =>
          res.status(500).json({ error: "Error encrypting password" })
        );
    } else {
      performUpdate();
    }
  };

  // Function to perform the database update
  const performUpdate = () => {
    userModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .then((user) => {
        if (user) {
          res.json(user); // Return updated user data
        } else {
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch((err) => {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
          res.status(400).json({ error: "Email is already registered" });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      });
  };

  updateUser();
});

// Set Cleans
app.post("/clean", (req, res) => {
  const {
    Total,
    type,
    sliderValueO,
    sliderValueK,
    sliderValue,
    sliderValueOX,
    windows,
    walls,
    Cabinets,
    organization,
    blind,
    stovetop,
    fridge,
    Dishwasher,
    garage,
    microwave,
    Laundry,
    tiles,
    MyDate,
    timeFrame,
    email,
    CleanType,
    intervalValue,
    daySelect1,
    daySelect2,
    daySelect3,
    daySelect4,
    daySelect5,
    daySelect6,
    daySelect7,
    GetInside,
    Park,
    Animal,
    spComments,
    discountNew,
  } = req.body;

  // time in miliseconds
  const currentTimeInMilliseconds = Date.now();

  cleanModel
    .create({
      typeOfClean: type,
      rooms: sliderValueO,
      kitchen: sliderValueK,
      bathroom: sliderValue,
      others: sliderValueOX,
      windows: windows,
      walls: walls,
      cabinets: Cabinets,
      orginization: organization,
      blinds: blind,
      stove: stovetop,
      fridge: fridge,
      dishwasher: Dishwasher,
      garage: garage,
      microwave: microwave,
      laundry: Laundry,
      tiles: tiles,
      date: MyDate,
      time: timeFrame,
      deltatime: currentTimeInMilliseconds,
      regularOronetime: CleanType,
      frequency: intervalValue,
      mon: daySelect1,
      tue: daySelect2,
      wed: daySelect3,
      thu: daySelect4,
      fri: daySelect5,
      sat: daySelect6,
      sun: daySelect7,
      getinside: GetInside,
      parkspot: Park,
      pet: Animal,
      spComments: spComments,
      discount: discountNew,
      email,
      completed: false,
      total: Total,
    })
    .then(() => {
      res.status(201).send("Clean record created successfully");
    })
    .catch((error) => {
      res.status(500).send("Error creating clean record: " + error.message);
    });
});

app.put("/edit/clean/:id", async (req, res) => {
  const {
    Total,
    type,
    sliderValueO,
    sliderValueK,
    sliderValue,
    sliderValueOX,
    windows,
    walls,
    Cabinets,
    organization,
    blind,
    stovetop,
    fridge,
    Dishwasher,
    garage,
    microwave,
    Laundry,
    tiles,
    MyDate,
    timeFrame,
    email,
    CleanType,
    intervalValue,
    daySelect1,
    daySelect2,
    daySelect3,
    daySelect4,
    daySelect5,
    daySelect6,
    daySelect7,
    GetInside,
    Park,
    Animal,
    spComments,
    discountNew,
  } = req.body;

  const currentTimeInMilliseconds = Date.now();
  const { id } = req.params;

  try {
    const updatedClean = await cleanModel.findByIdAndUpdate(
      id,
      {
        typeOfClean: type,
        rooms: sliderValueO,
        kitchen: sliderValueK,
        bathroom: sliderValue,
        others: sliderValueOX,
        windows,
        walls,
        cabinets: Cabinets,
        orginization: organization,
        blinds: blind,
        stove: stovetop,
        fridge,
        dishwasher: Dishwasher,
        garage,
        microwave,
        laundry: Laundry,
        tiles,
        date: MyDate,
        time: timeFrame,
        deltatime: currentTimeInMilliseconds,
        regularOronetime: CleanType,
        frequency: intervalValue,
        mon: daySelect1,
        tue: daySelect2,
        wed: daySelect3,
        thu: daySelect4,
        fri: daySelect5,
        sat: daySelect6,
        sun: daySelect7,
        getinside: GetInside,
        parkspot: Park,
        pet: Animal,
        spComments,
        discount: discountNew,
        email,
        completed: false,
        total: Total,
      },
      { new: true } // return the updated document
    );

    if (!updatedClean) {
      return res.status(404).send("Clean record not found");
    }

    res.status(200).send("Clean record updated successfully");
  } catch (error) {
    res.status(500).send("Error updating clean record: " + error.message);
  }
});

// Get Cleans by User ID
app.get("/user-clean/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(user)

    // Find cleaning records with the user's email
    const cleanRecords = await cleanModel
      .find({ email: user.email })
      .sort({ date: -1 }); // Sort by date in descending order;

    // Respond with user info and cleaning records
    res.status(200).json({
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      cleanRecords: cleanRecords,
    });
    console.log(cleanRecords);
  } catch (error) {
    console.error("Error fetching user or cleaning records:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/cleans", async (req, res) => {
  try {
    // Fetch all clean records, sorted by date (most recent first)
    const allCleans = await cleanModel.find().sort({ date: -1 });

    res.status(200).json({ cleanRecords: allCleans });
  } catch (error) {
    console.error("Error fetching cleaning records:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/clean/:id", async (req, res) => {
  try {
    const clean = await cleanModel.findById(req.params.id);
    if (!clean) {
      return res.status(404).json({ message: "Clean record not found." });
    }
    res.json(clean);
  } catch (error) {
    console.error("Error fetching clean record:", error);
    res.status(500).json({ message: "Server error." });
  }
});

app.delete("/clean/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    await cleanModel.deleteMany({ userId });
    res.json({ success: true });
  } catch (error) {
    console.error("Error cancelling cleans:", error);
    res.status(500).json({ success: false, error: "Failed to cancel cleans" });
  }
});

app.delete("/clean/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClean = await cleanModel.findByIdAndDelete(id);

    if (!deletedClean) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({ message: "Booking cancelled successfully." });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Server error while cancelling booking." });
  }
});

app.post("/google-auth", async (req, res) => {
  const { credential, clientId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name } = payload;

    let user = await GoogleUser.findOne({ Email: email });
    if (!user) {
      user = await GoogleUser.create({
        Email: email,
        LastName: family_name,
        FirstName: given_name,
        authSource: "google",
      });
    }
    const userId = user._id;

    res.status(200).json({
      success: true,
      redirectUrl: "/dashboard",
      payload,
      userId,
      user: {
        email: user.Email,
        firstName: user.FirstName,
        lastName: user.LastName,
      },
    });
  } catch (err) {
    console.error("Error during Google authentication:", err);
    res.status(400).json({
      success: false,
      message: "Authentication failed",
      error: err.message,
    });
  }
});

app.post("/referrals", (req, res) => {
  const { userId } = req.body;

  // Validate that userId is provided
  if (!userId) {
    return res.status(400).json("User ID is required");
  }

  userModel
    .findById(userId)
    .then((user) => {
      if (user) {
        // Find all users whose referral field matches the userId (the referrer)
        userModel
          .find({ referral: userId })
          .then((referrals) => {
            // Exclude passwords from referred users' data
            const referralsWithoutPassword = referrals.map((referral) => {
              const { password, ...referralData } = referral._doc; // Remove password
              return referralData;
            });

            // Return the user's data and the list of referrals
            res.json({
              userData: user,
              referrals: referralsWithoutPassword,
              totalReferred: referrals.length, // Return total number of referrals
            });
          })
          .catch((err) => {
            console.error(err);
            res
              .status(500)
              .json("An error occurred while retrieving referrals");
          });
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("An error occurred while retrieving the user data");
    });
});

app.use("/api/rewards", rewardRoutes);
app.use("/webhook", webhookRoutes);

app.post("/webhook", express.raw({ type: "application/json" }), webhookRoutes);

app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: item.price,
        product_data: {
          name: item.name,
        },
      },
      quantity: 1,
    })),
    mode: "payment",
    success_url: "https://crisp-frontend.onrender.com/#/success",
    cancel_url: "https://crisp-frontend.onrender.com/#/cancel",
    customer_email: req.body.email,
    // setup_future_usage: "off_session",
  });

  res.json({ id: session.id });
});

app.post("/create-tip-session", async (req, res) => {
  const { amount, comment } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Cleaner Tip",
            description: comment,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url:
      "https://crisp-frontend.onrender.com/#/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://crisp-frontend.onrender.com/#/cancel",
  });

  await Payment.create({
    sessionId: session.id,
    amount,
    comment,
    status: "pending",
    createdAt: new Date(),
  });

  res.json({ id: session.id });
});

app.get("/payments/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const payment = await Payment.findOne({ sessionId });

    if (!payment) return res.status(404).json({ message: "Not found" });

    const card = payment.card || {
      brand: "Visa",
      last4: "1234",
      exp_month: "--",
      exp_year: "--",
    };

    res.json({
      ...payment.toObject(),
      card,
    });
  } catch (err) {
    console.error("Error fetching payment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // Sorted by latest

    res.status(200).json({
      success: true,
      total: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

app.delete("/clean/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await cleanModel.deleteMany({ email: user.email });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} cleans deleted for user ${user.email}`,
    });
  } catch (error) {
    console.error("Error deleting cleans by email:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.listen(4000, () => {
  console.log("App is running");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
