const mongoose = require('mongoose');

const connectDB = async () => {
    try{
            const conn = await mongoose.connect(process.env.MONGO_URL)
            console.log(`MongoDB Connected: ${conn.connection.host}`.bgGreen);
    }catch(err){
        console.log(`${err}`.bgRed);
        process.exit(1);
    }
}      

module.exports = connectDB;