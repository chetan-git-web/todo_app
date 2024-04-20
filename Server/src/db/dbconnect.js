import mongoose from "mongoose"
import { DBname } from "../constants.js" 


const connectDB = async ()=>{
    try{
        const db = await mongoose.connect(`${process.env.MONGODB_URL}/${DBname}`);
        console.log(`MongoDB Connected ${db.connection.host}`);
    }
    catch(error){
        console.log("Mongodb Connection error",error);
    }
}

export default connectDB;