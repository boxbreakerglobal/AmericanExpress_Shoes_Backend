import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { shoeRouter } from "./Route/shoeRouter.js"


dotenv.config()


const app = express()
app.use(cors())
// app.use(express.json())

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));




const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server connected at ${PORT}`)
})



mongoose.connect(process.env.MONGO_URL).then(()=>{

    console.log(`Database connected`)
})

app.use("/api/v1", shoeRouter)

