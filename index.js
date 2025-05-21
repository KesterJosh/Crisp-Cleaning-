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
// const publicPath = path.join(__dirname, "Views");
require("dotenv").config();


require("dotenv").config;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const cleanModel = require("./models/cleans.js");

const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

    res.json({ status: "Success", userId: user._id });
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

// nodemailer stuff
console.log("Email:", process.env.AUTH_EMAIL);
console.log(
  "Password:",
  process.env.AUTH_PASSWORD ? "Password is set" : "Password is missing"
);
let transporter = nodemailer.createTransport({
  host: "smtp.mailersend.net", // SMTP server
  port: 587, // Port for STARTTLS
  secure: false, // Use STARTTLS (false for port 587)
  auth: {
    user: "MS_acmUf3@trial-7dnvo4dxzd9g5r86.mlsender.net", // Your username
    pass: "zYyeUUqykO3MTgxt", // Your password
  },
});

// Test transporter
transporter.verify((error, success) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("SMTP Server is ready to take messages:", success);
  }
});

// Send email

const SendMail = (
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
) => {
  // url of the email
  const currentUrl = "http://localhost:4000";

  const mailOption = {
    from: "MS_acmUf3@trial-7dnvo4dxzd9g5r86.mlsender.net",
    to: "adeemole@gmail.com",
    subject: "Commercial Cleaning Initiated",
    html: `<p>Here is a sent email of the commercial clean sent from ${BusinessName}</p><p>Business Name: ${BusinessName}</p><p>Business Size: ${BusinessSize}</p><p>Business Environment: ${BusinessEnvironment}</p><p>Type of cleaning: ${BusinessTypeOfClean}</p><p>Amount of Rooms: ${BusinessRoomAmount}</p><p>Specified Info: ${BusinessDetail}</p><p>Frequency: ${BusinessTimeFrame}</p><p>Business Name: ${BusinessHours}</p><p>Extra Comments: ${BusinessComments}</p><p>Email of sender: ${email}</p>`,
  };

  transporter
    .sendMail(mailOption)
    .then(() => {
      console.log("Email sent successfully");
      // res.json({
      //     status:"Pending",
      //     message:"Email sent successfully"
      // })
    })
    .catch((error) => {
      console.log(error);
      // res.json({
      //     status:"Failed",
      //     message:"Email sending failed"
      // })
    });
};
const response = [];

// Send email

const SendContactMail = (
  { first_name, last_name, email, phone, message },
  res
) => {
  // url of the email
  const currentUrl = "http://localhost:4000";

  const mailOption = {
    from: "MS_acmUf3@trial-7dnvo4dxzd9g5r86.mlsender.net",
    to: "adeemole@gmail.com",
    subject: "Contact From Customer",
    html: `<p>This message came from ${first_name} ${last_name}</p><p>With Email: ${email}</p><p>Phone Number: ${phone}</p><p>Here is the message:<br/> <b>${message}</b></p>`,
  };

  transporter
    .sendMail(mailOption)
    .then(() => {
      console.log("Email sent successfully");
      // res.json({
      //     status:"Pending",
      //     message:"Email sent successfully"
      // })
    })
    .catch((error) => {
      console.log(error);
      // res.json({
      //     status:"Failed",
      //     message:"Email sending failed"
      // })
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
  } = req.body;

  commercialModel
    .create({
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
    })
    .then(() => {
      res.status(201).send("Clean record created successfully");
    })
    .catch((error) => {
      res.status(500).send("Error creating clean record: " + error.message);
    });
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

app.listen(4000, () => {
  console.log("App is running");
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });
