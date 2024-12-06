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

app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    userModel.findOne({email:email})
    .then(user => {
       
        if(user){
            bcrypt.compare(password, user.password, (err, response) =>{
                if(err) {
                    res.json("The password is incorrect")
                }
                if(response) {
                    res.json("Success")
                }
            })
        }else{
            res.json("You don't have an account with us, or your email is not correct")
        }
    })


    .catch(err => res.json(err))
})

// app.post('/register', (req, res)=>{
//     const {first_name, last_name, email, phone, password, address, referral} = req.body;
//     bcrypt.hash(password, 10)
//     .then(hash =>{
//         userModel.create({first_name:first_name, last_name:last_name, email:email, phone:phone, password:hash, address:address, referral:referral})
//         .then(users => res.json(users))
//         .catch(err => res.json(err))
//     }).catch(error=>console.log(error.message))
// })
app.post('/register', (req, res) => {
    const { first_name, last_name, email, phone, password, address, referral } = req.body;

    bcrypt.hash(password, 10)
        .then(hash => {
            userModel.create({
                first_name,
                last_name,
                email,
                phone,
                password: hash,
                address,
                referral
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


app.listen(4000, ()=>{
    console.log("App is running")
})