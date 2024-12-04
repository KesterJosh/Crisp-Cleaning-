const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect("mongodb+srv://adeyelukester2:7EoKqh6yYM3uEd2f@crispsite.iuhh1.mongodb.net/testDB?retryWrites=true&w=majority&appName=CrispSite");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;