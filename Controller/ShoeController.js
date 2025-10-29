import mongoose from "mongoose";
import { shoeModel } from "../Models/Shoe.js";


export const addShoe = async(req,res)=>{
    try{

        const image = req.file? req.file.path:""
        const newShoe = new shoeModel({...req.body,image})
        newShoe.save()

        return res.json({success:true})

    }catch(error){
        console.log(error)
        return res.json({success:false,message:error})
    }
}


export const allShoes = async(req,res)=>{
    try{
        const allItems = await shoeModel.find({})

        return res.json({success:true,allItems})


        
    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}

export const updateShoe = async(req,res)=>{
    try{
        const {id}= req.params

        const image = req.file? req.file.path:""

        const update = await shoeModel.findByIdAndUpdate(id,{...req.body,image}, {new:true})

        return res.json({success:true, update})



    }catch(error){
        console.log(error)
        return res.json({succes:false})
    }
}

export const deleteShoe = async(req,res)=>{
    try{
        const {id} = req.params

        await shoeModel.findByIdAndDelete(id)

        return res.json({success:true})


    }catch(error){
        console.log(error)
        return res.jsons({success:false})

    }
}