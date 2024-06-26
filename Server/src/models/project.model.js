import mongoose from "mongoose";
import { type } from "os";

const projectScheme = new mongoose.Schema({
    projectName:{
        type:String,
        required: true
    },
    tasks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Task"
        }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps: true})

export const Project = mongoose.model("Project",projectScheme)