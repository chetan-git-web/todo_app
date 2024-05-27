import { ObjectId } from "mongodb";
import { Task } from "../models/tasks.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const creatingTasks = asyncHandler(async (req, res) => {
  console.log(req);

  const token =
    req.cookies.refreshToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  console.log(token);

  if (!token) {
    throw new ApiError(400, "Token invalid");
  }

  const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  console.log("yha tak to aa rha hai");
  console.log(req.body);
  if (!user) {
    throw new ApiError(400, "Token invalid");
  }

  const { taskName, content, priority, comment } = await req.body;
  const createdtask = await Task.create({
    taskName: taskName,
    content: content,
    priority: priority,
    createdBy: user._id,
    comment: comment,
  });

  if (!createdtask) {
    throw new ApiError(500, "Something went wrong while creating a task");
  }

  return res.status(200).json(new ApiResponse(200, "Task created successful"));
});

const gettingTasks = asyncHandler(async (req, res) => {
  const token =
    req.cookies.refreshToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(400, "Token Invalid");
  }

  const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  if (!user) {
    throw new ApiError(400, "Token invalid");
  }

  const data = await Task.find({ createdBy: user._id });

  const temp = data.map((x) => {
    return {
      id: x._id,
      task: x.taskName,
      content: x.content,
      priority: x.priority,
      comment: x.comment,
    };
  });

  return res.status(200).json(
    new ApiResponse(200, {
      data: temp,
    })
  );
});

const updatingTasks = asyncHandler(async (req, res) => {
  try {
    const token =
      req.cookies.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    // DECODING REFRESH TOKEN AND GETTING USER ID
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    if (!decodedToken) {
      throw new ApiError(400, "Token Invalid");
    }
    // getting user id from token
    const userId = decodedToken._id;

    const user = await User.findById(userId);
    // getting all the tasks created by userid
    const tasks = await Task.find({ createdBy: userId });
    // finding particular task that user want to update
    const data = tasks.filter((e) => {
      return e._id == req.body.id;
    });
    // if not found than return error
    if (!data) {
      throw new ApiError(400, "False request");
    }

    const { id, taskname, content, priority, comment } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, {
      taskName: taskname,
      content: content,
      priority: priority,
      comment: comment,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Task updated successfull"));
  } catch (error) {
    throw new ApiError(400, `Some internal error Occured ${error}`);
  }
});

const deletedTasks = asyncHandler(async (req, res) => {
  try {
    const token =
      req.cookies.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(400, "Token Invalid");
    }
    // DECODING REFRESH TOKEN AND GETTING USER ID
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    if (!decodedToken) {
      throw new ApiError(400, "Invalid Token");
    }
    const userId = decodedToken._id;
    // getting all the tasks created by userid
    const tasks = await Task.find({ createdBy: userId });
    // finding particular task that user want to update
    const data = tasks.filter((e) => {
      return e._id == req.body.id;
    });
    // if not found than return error
    if (!data) {
      throw new ApiError(400, "invalid request");
    }
    console.log(req.body.id)
    await Task.findByIdAndDelete(req.body.id);

    return res
      .status(200)
      .json(new ApiResponse(200, "Task delted successfull"));
  } catch (error) {
    return res.status(400).json(new ApiError(200, error));
  }
});

export { creatingTasks, gettingTasks, updatingTasks, deletedTasks };
