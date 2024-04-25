import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
        index: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim:true,
        unique: true,
    },
    fullName:{
        type: String,
        required: true,
        trim:true,
        index: true
    },
    avatar:{
        type:String, // cloudinary image
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})
// before entering the data in the database this pre middleware works
userSchema.pre("save", async function(next) {
    // if mdifies then return next
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10) // here 10 is number of rounds
    console.log("ha chal rha hai")
    console.log(this.password)
    next()
})
// this is the method which is used to recheck the password  provided by user
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

// to generate an access token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.userName,
            fullname : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
// to generate a refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)

