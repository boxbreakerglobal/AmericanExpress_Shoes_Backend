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
    shoeStatus:{
        type:[String]
    },

    
    images:{
        type:[String]
    },
    Gender:{
        type:[String]
    },
    cost:{
        type:String
    },
    retailCost:{
        type:String
    },
    type:{
        type:[String]
    },
    size:{
        type:String
    },
    americanSize:{
        type:String
    },
    GhanaianSize:{
        type:String
    }
    
},{timestamps:true})


export const shoeModel = mongoose.model("shoe",shoeSchema)