import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from "@mui/material";
import logo from "../assets/icons8-todo-list-48.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {loggingUser} from "../store/userSlice.js"
const Login = () => {
  const form = useForm();
  const { register, control, handleSubmit } = form;
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //on submit funvtion
  const onsubmit = async (data) => {
    const response = await axios
      .post("http://localhost:8000/api/v1/users/login", {
        usernameEmail: data.usernameEmail,
        password: data.password,
      })
      .then((data) => {
        console.log(data.data.message.user)
        document.getElementById("progress").style.display = "none";
        dispatch(loggingUser(data.data.message))
        console.log(data.data.message.accessToken)

        localStorage.setItem("accessToken",data.data.message.accessToken)
        localStorage.setItem("refreshToken",data.data.message.refreshToken)
        navigate("/inbox")
      })
      .catch((error) => {
        document.getElementById("progress").style.display = "none";
        document.getElementById("alert").style.display = "flex";
        setAlert(error.message);
        setTimeout(() => {
          document.getElementById("alert").style.display = "none";
        }, 3000);
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {/* progress circle */}
        <div
          id="progress"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.4)",
            zIndex: 1000,
            display: "none",
          }}
        >
          <CircularProgress size={60} />
        </div>
        {/* alert */}
        <Alert
          variant="filled"
          severity="error"
          className="fixed right-3 top-3 "
          id="alert"
          style={{ display: "none" }}
        >
          {alert}
        </Alert>
        <div className="flex py-10">
          <img width="40" height="40" src={logo} alt="todo-list--v1" />
          <h1 className="text-[30px] font-semibold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 inline-block text-transparent bg-clip-text font-mono">
            TODOER
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col justify-center items-center bg-yellow-200 min-w-[60vw] max-w-[70vw] mx-2  min-h-[60vh] rounded-full "
        >
          <h1 className="font-semibold text-3xl ">Login</h1>
          <input
            type="text"
            id="usernameEmail"
            {...register("usernameEmail")}
            placeholder="username or email"
            className="min-w-[20vw] h-[6vh] px-4 border-amber-800 border-[2px] rounded-md my-[1vh]"
          ></input>

          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="password"
            className="min-w-[20vw] h-[6vh] px-4 border-amber-800 border-[2px] rounded-md my-[1vh]"
          ></input>
          <button className="min-w-[20vw] h-[6vh] px-4 border-amber-800 border-[2px] rounded-md my-[1vh] hover:bg-amber-800 hover:text-white focus:outline-green-500 focus:ring-4 focus:ring-amber-600 text-amber-800 font-bold">
            Submit
          </button>
          <Link to={"/register"}>Register</Link>
        </form>
      </div>
      <DevTool control={control} />
    </>
  );
};

export default Login;
