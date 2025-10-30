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
    }

},{timestamps:true})

export const orderModel = mongoose.model("order",orderSchema)