import mongoose from "mongoose"


const heroSchema = new mongoose.Schema({

    image:{
        type:String,
        default:""
    }
},{timestamps:true})


export const desktopHeroModel = mongoose.model("desktopHero", heroSchema)