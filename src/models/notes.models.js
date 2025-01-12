import mongoose from 'mongoose'



const NoteSchema = new mongoose.Schema({
    title : {
        type:String,
        required: true,
        index: true,
    },
    description: {
        type:String,
        required: true,
    },
    createdBy: {
        index:true,
        type : mongoose.Schema.Types.String,
        ref: "Users",
    }
},{
    timestamps:true
})

const Note = mongoose.model('Notes', NoteSchema)

export { Note }