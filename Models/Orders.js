import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    customerName:{
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