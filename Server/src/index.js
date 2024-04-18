import dotenv from "dotenv"
import connectDB from "./db/dbconnect.js";


dotenv.config({
    path: '.env'
})


connectDB()
.then(()=>{
    
})
.catch((error)=>{
    console.log("Mongodb connection failed" ,error)
})