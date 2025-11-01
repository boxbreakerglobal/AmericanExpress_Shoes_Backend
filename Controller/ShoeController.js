import mongoose from "mongoose";
import { shoeModel } from "../Models/Shoe.js";


export const addShoe = async(req,res)=>{
    try{
        const imageUrl = req.files.map((item)=>item.path)
        const images = req.files.length>=0? imageUrl:[]
        const {Gender,type,shoeStatus} = req.body

        const gender = JSON.parse(Gender)

        const shoeType = JSON.parse(type)

        const status = JSON.parse(shoeStatus)
        const newShoe = new shoeModel({...req.body,images,Gender:gender,type:shoeType,shoeStatus:status})
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

        const shoe = await shoeModel.findById(id)

        const image = req.files.length>=0?req.files.map(item=>item.path):[...shoe.images]

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