import mongoose from "mongoose"


const contactSchema = mongoose.Schema({
    name:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    comment:{
        type:String
    }
})


export const contactModel = mongoose.model("contact",contactSchema)