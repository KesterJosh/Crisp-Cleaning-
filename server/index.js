// mongodb+srv://adeyelukester2:7EoKqh6yYM3uEd2f@crispsite.iuhh1.mongodb.net/?retryWrites=true&w=majority&appName=CrispSite

const express = require('express')
const connectDB = require('./db.js')
const itemModel = require('./models/item.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', async (req, res)=>{
    const items = await itemModel.find()
    res.json(items)
})

connectDB()

app.listen(4000, ()=>{
    console.log("App is running")
})