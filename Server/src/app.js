import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();
console.log("hello");
app.use(cors());
// .uses cors middleware 

app.use(express.json({limit:"16kb"}))
// it accept json files it is a middleware

app.use(express.urlencoded({limit: "16kb"}))
// for accepting the url data 

app.use(express.static("public"))
//accepting the pdf and img in public folder in server

app.use(cookieParser())
// used to access and set cookies in user browser

// routes import 
import userRoute from "./routes/user.routes.js"
import tasksRoute from "./routes/tasks.routes.js"
import projectRoute from "./routes/project.routes.js"
                                        
// routes declaration                   
app.use("/api/v1/users",userRoute)      
app.use("/api/v1/tasks",tasksRoute)     
app.use("/api/v1/project",projectRoute) 
                                        
export { app }                           
