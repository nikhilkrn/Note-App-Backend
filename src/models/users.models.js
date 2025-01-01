const mongoose = require('mongoose')

const connectDB = require('../db/index.js')
connectDB()

const UserSchema = new mongoose.Schema({
    username:String,
    password: String,
    email:String,
})
const User = mongoose.model('User', UserSchema)

module.exports = { User }