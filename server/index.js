// mongodb+srv://adeyelukester2:7EoKqh6yYM3uEd2f@crispsite.iuhh1.mongodb.net/?retryWrites=true&w=majority&appName=CrispSite

const express = require('express')
const connectDB = require('./db.js')
const itemModel = require('./models/item.js')
const userModel = require('./models/users.js')
const cors = require('cors')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', async (req, res)=>{
    const items = await itemModel.find()
    res.json(items)
})

connectDB()

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        // Return the user ID if the login is successful
                        res.json({ status: "Success", userId: user._id });
                    } else {
                        res.json("The password is incorrect");
                    }
                })
            } else {
                res.json("You don't have an account with us, or your email is not correct");
            }
        })
        .catch(err => res.json(err))
});

    app.post('/data', (req, res) => {
        const { userId } = req.body;

        // Validate that userId is provided
        if (!userId) {
            return res.status(400).json("User ID is required");
        }

        userModel.findById(userId)
            .then(user => {
                if (user) {
                    // Return the user's data, excluding sensitive information (e.g., password)
                    const { password, ...userData } = user._doc; // _doc contains the user document in Mongoose
                    res.json(userData);
                } else {
                    res.status(404).json("User not found");
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json("An error occurred while retrieving the user data");
            });
    });


app.post('/register', (req, res) => {
    const { first_name, last_name, email, phone, password, address, referral } = req.body;

    // Get current date in DD/MM/YYYY format
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${
        (currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

    bcrypt.hash(password, 10)
        .then(hash => {
            userModel.create({
                first_name,
                last_name,
                email,
                phone,
                password: hash,
                address,
                referral,
                date_joined: formattedDate // Add the date here
            })
                .then(users => res.json(users))
                .catch(err => {
                    if (err.code === 11000 && err.keyPattern.email) {
                        res.status(400).json({ error: "Email is already registered" });
                    } else {
                        res.status(500).json({ error: "Internal Server Error" });
                    }
                });
        })
        .catch(error => res.status(500).json({ error: "Error encrypting password" }));
});

app.put('/update', (req, res) => {
    const { id, first_name, last_name, email, phone, password, address } = req.body;

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
            bcrypt.hash(password, 10)
                .then(hash => {
                    updateData.password = hash;
                    performUpdate();
                })
                .catch(err => res.status(500).json({ error: "Error encrypting password" }));
        } else {
            performUpdate();
        }
    };

    // Function to perform the database update
    const performUpdate = () => {
        userModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
            .then(user => {
                if (user) {
                    res.json(user); // Return updated user data
                } else {
                    res.status(404).json({ error: "User not found" });
                }
            })
            .catch(err => {
                if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
                    res.status(400).json({ error: "Email is already registered" });
                } else {
                    res.status(500).json({ error: "Internal Server Error" });
                }
            });
    };

    updateUser();
});

app.post('/referrals', (req, res) => {
    const { userId } = req.body;

    // Validate that userId is provided
    if (!userId) {
        return res.status(400).json("User ID is required");
    }

    userModel.findById(userId)
        .then(user => {
            if (user) {
                // Find all users whose referral field matches the userId (the referrer)
                userModel.find({ referral: userId })
                    .then(referrals => {
                        // Exclude passwords from referred users' data
                        const referralsWithoutPassword = referrals.map(referral => {
                            const { password, ...referralData } = referral._doc; // Remove password
                            return referralData;
                        });

                        // Return the user's data and the list of referrals
                        res.json({
                            userData: user,
                            referrals: referralsWithoutPassword,
                            totalReferred: referrals.length // Return total number of referrals
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json("An error occurred while retrieving referrals");
                    });
            } else {
                res.status(404).json("User not found");
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json("An error occurred while retrieving the user data");
        });
});


app.listen(4000, ()=>{
    console.log("App is running")
})