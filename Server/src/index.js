import dotenv from "dotenv"
import connectDB from "./db/dbconnect.js";
import { app } from "./app.js";
dotenv.config({
    path: '.env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Example app listening on port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("Mongodb connection failed" ,error)
}) 