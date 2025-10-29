import { adminModel } from "../Models/admin.js";
import bcrypt from "bcryptjs"


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