import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskname:{
        type: String,
        required: true,
        trim:true,
    },
    dueDate:{
        type: Date,
    },
    content:{
        type: String,
        required: true,
    },
    priority:{
        type: Number,
        required: true,
        min: 0,
        max: 4
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type: String,
        trim: true
    }
}
,{timestamps:true})

export const Task = mongoose.model("Task",taskSchema)