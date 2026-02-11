const mongoose = require('mongoose');


const connectDB = async()=>{
    try{

        await mongoose.connect("mongodb://localhost:27017")
        console.log("DB is connected")


    }catch (error){
        console.log("DB not connected")


    }
}

module.exports = connectDB;