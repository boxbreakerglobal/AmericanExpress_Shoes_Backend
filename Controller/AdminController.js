import { adminModel } from "../Models/admin.js";
import bcrypt from "bcryptjs"
import { contactModel } from "../Models/ContactUs.js";
import { heroModel } from "../Models/hero.js";


export const addAdmin = async(req, res)=>{
    try{
        const {email,password} = req.body

        const user = await adminModel.findOne({email})

        if(user){
            return res.json({success:false, message:"User already existing"})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const newAdmin = new adminModel({email,password:hashedPassword})

        newAdmin.save()

        return res.json({success:true})
        
    }catch(error){
        comsole.log(error)
        return res.json({success:false})
    }
}

export const adminLogin = async(req,res)=>{
    try{
        const {email,password} = req.body

        const user = await adminModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"Invalid email or password"})
        }

        const comparePassword = await bcrypt.compare(password,user.password)

        if(!comparePassword){
            return res.json({success:false, message:"Invalid email or password"})
        }

        return res.json({success:true})



    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}

export const deleteMessage = async(req,res)=>{
    try{
        const {id}= req.params

        await contactModel.findByIdAndDelete(id)

        return res.json({success:true})
        



    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}

export const addImage = async(req,res)=>{
    try{
        const {type} = req.body
        if(type=="mobile"){
            const newImage = new heroModel({mobile:req.file.path,desktop:""})
            newImage.save()
            return res.json({success:true})

        }
        if(type=="desktop"){
            const newImage = new heroModel({desktop:req.file.path,mobile:""})
            newImage.save()
            return res.json({success:true})

        }
        

    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}

export const updateImages = async(req,res)=>{
    try{
        const {id} = req.params

        const update = await heroModel.findByIdAndUpdate(id,req.body,{new:true})

        return res.json({success:true})



    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}