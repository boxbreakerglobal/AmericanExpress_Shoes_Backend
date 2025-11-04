import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    orderId:{
        type:String
    },
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
    },
    status:{
        type:String,
        default:"Pending"
    }

},{timestamps:true})

export const orderModel = mongoose.model("order",orderSchema)