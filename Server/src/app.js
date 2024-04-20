import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();
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


export {app}