import { userModel } from "../Models/user.js";

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