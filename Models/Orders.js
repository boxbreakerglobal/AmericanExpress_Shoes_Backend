import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:String
    },
    total:{
        type:Number
    },
    items:{
        type:[Object]
    },
    location:{
        type:String,
        default:""
    },
    orderMode:{
        type:String
    },
    date:{
        type:String
    }

},{timestamps:true})

export const orderModel = mongoose.model("order",orderSchema)