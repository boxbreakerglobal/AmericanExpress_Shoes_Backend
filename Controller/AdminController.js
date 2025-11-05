import { adminModel } from "../Models/admin.js";
import bcrypt from "bcryptjs"
import { contactModel } from "../Models/ContactUs.js";
import { mobileHeroModel } from "../Models/heroMobile.js";
import { desktopHeroModel } from "../Models/heroDesktop.js";

export const addAdmin = async(req, res)=>{
    try{
        const {email,password,name} = req.body

        const user = await adminModel.findOne({email})

        if(user){
            return res.json({success:false, message:"User already existing"})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const newAdmin = new adminModel({name,email,password:hashedPassword})

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

export const fetchAdmins = async(req,res)=>{
    try{
        const users = await adminModel.find({})
        
        return res.json({success:true,admin:users})

    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}
export const deleteAdmin = async(req,res)=>{
    try{
        const {id}= req.params

        const admin = await adminModel.findByIdAndDelete(id)

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

export const addModileHeroImage = async(req,res)=>{
    try{
    const image = req.file.path?req.file.path:""
    
    const newMobileHero = new mobileHeroModel({image})

    newMobileHero.save()

    return res.json({success:true})

    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}
export const addDesktopHeroImage = async(req,res)=>{
    try{
    const image = req.file.path?req.file.path:""
    
    const newMobileHero = new desktopHeroModel({image})

    newMobileHero.save()

    return res.json({success:true})

    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}

export const updateMobileHeroImage = async(req,res)=>{
    try{
        const {id} = req.params

        const update = await mobileHeroModel.findByIdAndUpdate(id,{image:req.file.path},{new:true})

        return res.json({success:true})
 
    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}

export const updatedDesktopHeroImage = async(req,res)=>{
    try{
        const {id} = req.params

        const update = await desktopHeroModel.findByIdAndUpdate(id,{image:req.file.path},{new:true})

        return res.json({success:true})
 
    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}

export const DeleteMobileHeroImages = async(req,res)=>{
    try{
        const {id} = req.params

        const update = await mobileHeroModel.findByIdAndDelete(id)

        return res.json({success:true})
 
    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}
export const DeleteDesktopHeroImages = async(req,res)=>{
    try{
        const {id} = req.params

        const update = await desktopHeroModel.findByIdAndDelete(id)

        return res.json({success:true})
 
    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}

export const fetchHeroImages = async(req,res)=>{
    try{
        const mobileHeroImages = await mobileHeroModel.find({})

        const desktopHeroImages = await desktopHeroModel.find({})

        return res.json({success:true, mobile:mobileHeroImages, desktop: desktopHeroImages})
 
    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}
