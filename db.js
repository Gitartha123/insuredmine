require('dotenv').config();
const mongoose = require('mongoose');

/***************** MongoDB connection establishment */
const connectToMongo = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log('MongoDB connected successfully !!!')
    } catch (error) {
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = connectToMongo 