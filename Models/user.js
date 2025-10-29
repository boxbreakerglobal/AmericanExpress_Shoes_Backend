import { timeStamp } from "console"
import mongoose from "mongoose"


const userSchema =  new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
},{timestamps:true})


export const userModel = mongoose.model("user", userSchema)