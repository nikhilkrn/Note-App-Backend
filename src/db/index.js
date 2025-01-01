const mongoose = require('mongoose');

const connectDB = async ()=> {
    try {
        const connection = await mongoose.connect('mongodb+srv://admin:be7GF9D03413LLJf@cluster0.jmoryxq.mongodb.net/Note-App')
        
        console.log(` /n DB connected  /t DB Host:  ${connection.connection.host}`)
        
    } catch (error) {
        console.log("Database Connection Error ",error);
        process.exit(1)        
    }
}

module.exports = connectDB;