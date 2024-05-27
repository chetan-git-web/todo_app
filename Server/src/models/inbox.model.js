import mongoose from "mongoose";

const inboxScheme = new mongoose.Schema({
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

export const Project = mongoose.model("Project",inboxScheme)