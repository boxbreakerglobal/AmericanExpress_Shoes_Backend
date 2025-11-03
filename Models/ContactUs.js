import mongoose from "mongoose"


const contactSchema = mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:String
    },
    message:{
        type:String
    }
})


export const contactModel = mongoose.model("contact",contactSchema)