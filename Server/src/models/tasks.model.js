import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName:{
        type: String,
        required: true,
        trim:true,
    },
    dueDate:{
        required: true,
        type: String,
    },
    content:{
        type: String,
    },
    priority:{
        type: Number,
        required: true,
        min: 1,
        max: 4
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type: String,
        trim: true
    },
}
,{timestamps:true})

export const Task = mongoose.model("Task",taskSchema)