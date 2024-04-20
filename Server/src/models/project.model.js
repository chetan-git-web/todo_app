import mongoose from "mongoose";
import { type } from "os";

const projectModel = new mongoose.Schema({
    projectname:{
        type:String,
        required: true
    },
    color:{
        type:String,
        required: true
    },
    tasks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Task"
        }
    ]
},{timestamps: true})

export const Project