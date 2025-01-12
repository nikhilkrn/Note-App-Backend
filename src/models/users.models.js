import mongoose  from 'mongoose'
import bcrypt  from 'bcrypt'
import jwt  from 'jsonwebtoken'


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    password: {
        type:String,
        required: true,
        trim:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
        trim: true,
        index: true,
    },
    refreshToken:{
        type:String,

    }
})

UserSchema.pre("save", async function (next) {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 10)
        next()
    
    return next()
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.GenerateAccessToken = function(){
    return jwt.sign({
        id:this._id,
        username: this.username,
        email:this.email
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)}

const User = mongoose.model('User', UserSchema)

export  { User }