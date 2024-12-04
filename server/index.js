// mongodb+srv://adeyelukester2:7EoKqh6yYM3uEd2f@crispsite.iuhh1.mongodb.net/?retryWrites=true&w=majority&appName=CrispSite

const express = require('express')
const connectDB = require('./db.js')
const itemModel = require('./models/item.js')
const userModel = require('./models/users.js')
const cors = require('cors')

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
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("You don't have an account with us, or your email is not correct")
        }
    })


    .catch(err => res.json(err))
})

app.post('/register', (req, res)=>{
    userModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(4000, ()=>{
    console.log("App is running")
})