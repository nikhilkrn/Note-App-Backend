const mongoose = require('mongoose')
const connectDB = require('../db/index.js')

connectDB()
// const schema = mongoose.Schema()

const NoteSchema = new mongoose.Schema({
    title : String,
    description: String,
    CreatedAt : String,
    updatedAt: String,
    createdBy: {
        type : mongoose.Schema.Types.String,
        ref: "Users",
    }
})

const Note = mongoose.model('Notes', NoteSchema)

module.exports = { Note }