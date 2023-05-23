import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import config from "../config/envConfig.js";
import jwt from "jsonwebtoken";

const userSchema=mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: [50, "Name must be less than 50 char"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: [8, "Password must be atleast 8 char"],
            select: false
        },
    },
    {
        timestamps: true
    }
)

// Encrypt the password before saving into database

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }

    this.password=await bcrypt.hash(this.password,10);
})

userSchema.methods={
    comparePassword: async function(password){
        const isMatch=await bcrypt.compare(password,this.password);
        return isMatch;
    },
    generateJwtToken: function(){
        return jwt.sign({
            _id: this._id,
            email: this.email
        },
        config.JWT_SECRET,{
            expiresIn: config.JWT_EXPIRY
        }
        )
    }
}

export default mongoose.model("user",userSchema);