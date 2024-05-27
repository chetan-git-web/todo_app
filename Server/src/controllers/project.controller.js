import { Project } from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/tasks.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { ReturnDocument } from "mongodb";

const creatingProject = asyncHandler(async (req, res) => {
  try{
    const token =
    req.cookies.refreshToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if(!token){
    throw new ApiError(400,"Token Invalid");
  }
  const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  if (!user) {
    throw new ApiError(400, "Token invalid");
  }

  const { projectname, color } = req.body;

  const createdproject = await Project.create({
    projectName: projectname,
    color: color,
    tasks: [],
    createdBy: user._id,
  });
  if(!createdproject){
    throw new ApiError(500, "Some internal error occured");
  }

  res.status(201).json(new ApiResponse(200,"Project Created Successfull"))
  }
  catch(error){
    throw new ApiError(500,error);
  }
});

const creatingTaskOfProject = asyncHandler(async (req, res) => {
  try {
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

    const { projectid, taskname, content, priority, comment } = await req.body;
    console.log(req.body);

    const createdtask = await Task.create({
      taskName: taskname,
      content: content,
      priority: priority,
      createdBy: user._id,
      comment: comment,
    });

    console.log(createdtask);

    const taskToAddInProject = Project.findByIdAndUpdate(projectid, {
      $push: { tasks: createdtask._id },
    });
  } catch (error) {
    throw new ApiError(400, "Some error occured");
  }
});

const gettingProject = asyncHandler(async (req, res) => {
  try {
    const token =
      req.cookies.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log(user._id);
    if (!user) {
      throw new ApiError(400, "Token invalid");
    }
    const projects = Project.find({ createdBy: user._id }).populate("tasks");
    console.log(projects);
    if (!projects) {
      throw new ApiError(400, "projects not found");
    }
    res.status(200).json(new ApiResponse(200, `${projects}`));
  } catch (error) {
    throw new ApiError(400, `${error}`);
  }
});

const updatingTaskOfProject = asyncHandler(async(req,res)=>{
})

const updateProject = asyncHandler(async(req,res)=>{
  try{
    const token =
      req.cookies.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log(user._id);
    if (!user) {
      throw new ApiError(400, "Token invalid");
    }
    const { projectname, color } = req.body;
    

  const createdproject = await Project.findByIdAndUpdate(id,{
    projectName: projectname,
    color: color,
  });

  await createdproject.save();

  return res.status(200).json( new ApiResponse(200,"Updated Project Successfull"))



  }
  catch(error){
    throw new ApiError(500,error)
  }
})

const deletingTaskOfProject = asyncHandler(async (req, res) => {
  try {
    const token =
      req.cookies.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");
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
      return e._id == req.body.task_id;
    });
    // if not found than return error
    if (!data) {
      throw new ApiError(400, "Invalid request");
    }
    await Task.findByIdAndDelete(req.body.id);

    const proj = await Project.findById(req.body.project_id);

    if (!proj) {
      throw new ApiError(400, "Invalid Request");
    }
    let index = 0;

    for (let i = 0; i < proj.tasks.length; i++) {
      if (proj.tasks[i] === req.body.task_id) {
        proj.tasks.splice(i, 1);
      }
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Task deleted successfull"));
  } catch (error) {
    throw new ApiError(400, `${error}`);
  }
});

const deletingProject = asyncHandler(async (req, res) => {
  const token =
    req.cookies.refreshToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  if (!decodedToken) {
    throw new ApiError(400, "Invalid Token");
  }
  const userId = decodedToken._id;
  
});





export { creatingProject, creatingTaskOfProject ,gettingProject, updatingTaskOfProject, updateProject, deletingTaskOfProject,deletingProject};
