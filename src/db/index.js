const mongoose = require('mongoose');

const connectDB = async ()=> {
    try {
        const connection = await mongoose.connect('YOUR-MONGODB-URL')
        
        console.log(` /n DB connected  /t DB Host:  ${connection.connection.host}`)
        
    } catch (error) {
        console.log("Database Connection Error ",error);
        process.exit(1)        
    }
}

module.exports = connectDB;