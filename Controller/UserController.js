import { userModel } from "../Models/user.js";
import { contactModel } from "../Models/ContactUs.js";




export const addUser = async(req, res)=>{
    try{
        const {email,password} = req.body

        const user = await adminModel.findOne({email})

        if(user){
            return res.json({success:false, message:"User already existing"})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const newAdmin = new userModel({email,password:hashedPassword})
        
        newAdmin.save()
        
    }catch(error){
        comsole.log(error)
        return res.json({success:false})
    }
}
export const userLogin = async(req,res)=>{
    try{
        const {email,password} = req.body

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"Invalid email or password"})
        }

        const comparePassword = await bcrypt.hash(password,user.password)

        if(!comparePassword){
            return res.json({success:false, message:"Invalid email or password"})
        }

        return res.json({success:true})



    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}

export const addMessage = async(req,res)=>{
    try{
        const message = await  new contactModel(req.body)

        message.save()

        return res.json({success:true})

    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}

export const allMessages = async(req,res)=>{
    try{
        const allMessages = await contactModel.find({})

        return res.json({success:true, allMessages})



    }catch(error){
        console.log(error)
        return res.json({success:false})
    }
}