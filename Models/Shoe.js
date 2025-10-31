import mongoose from "mongoose";

const shoeSchema = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    itemNumber:{
        type:String
    },
    quantity:{
        type:String
    },
    
    image:{
        type:[String]
    },
    Gender:{
        type:String
    },
    cost:{
        type:String
    },
    type:{
        type:[String]
    },
    size:{
        type:String
    },
    
},{timestamps:true})


export const shoeModel = mongoose.model("shoe",shoeSchema)