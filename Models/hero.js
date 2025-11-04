import mongoose from "mongoose"


const heroSchema = new mongoose.Schema({
    desktop:{
        type:String,
        default:""
    },
    mobile:{
        type:String,
        default:""
    }
},{timestamps:true})


export const heroModel = mongoose.model("hero", heroSchema)