import React, { useEffect, useState } from "react";
import axios from "axios"
import { Alert } from "@mui/material";


const AddTask = ({newtaskwindow}) => {

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [priority,setPriority]= useState(1)
  const [comment,setComment] = useState("");
  const [alert, setAlert] = useState("");
  var textarea = document.getElementById("textarea");
  console.log(localStorage.getItem("refreshToken"));
  const handleAsync = async () => {
    await axios.post("http://localhost:8000/api/v1/tasks/adding-task",{
      taskName:name,
      content:description,
      priority:priority,
      comment:comment,
    },{headers:{
      Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
    }})
    .then((response)=>{
      newtaskwindow();
    })
    .catch((error)=>{
      newtaskwindow();
    })
  }

  useEffect(()=>{
    var input = document.getElementById("taskbox");
    input.addEventListener("keypress",function(event){
      if(event.key == "Enter"){
        document.getElementById("add-task").click();
      }
    })
  },[])
  return (
    <div className="flex flex-col w-[60vw]  border-2 border-gray-200 rounded-xl p-2  mt-[10vh] bg-white" id="taskbox">
      <Alert
          variant="filled"
          severity="error"
          className="fixed right-3 top-3 "
          id="alert"
          style={{ display: "none" }}
        >
          {alert}
        </Alert>
      <input
        type="text"
        placeholder="Task Name"
        className="font-semibold w-full outline-none"
        autoFocus="true"
        onChange={(e)=>{
          setName(e.target.value)
        }}
      ></input>
      <textarea
        id="textarea"
        type="text"
        placeholder="Description"
        className="outline-none"
        height="10"
        rows="2"
        // for changing the height of the textarea dynamically
        onChange={(e)=>{
            setDescription(e.target.value)
            document.getElementById("textarea").style.height = ""; /* Reset the height*/
            document.getElementById("textarea").style.height = Math.min(textarea.scrollHeight, 200) + "px";
        }}
        cols="10"
      ></textarea>
      <div className="py-2">
        <label for="dueDate" className="text-gray-400">
          Due Date:{" "}
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          min={new Date().toISOString().split("T")[0]}
          className="text-gray-400 outline-none"
        />
        <select id="Priority" name="Priority" className="text-gray-400">
          <option value="1">Priority 1</option>
          <option value="2">Priority 2</option>
          <option value="3">Priority 3</option>
          <option value="4">Priority 4</option>
        </select>
      </div>
      <hr />
      <div className="space-x-4 mt-[2vh] flex justify-between items-center">
        <select
          id="parent"
          name="parent"
          className="text-gray-400 outline-gray-100"
        >
          <option value="Inbox">Inbox</option>
        </select>
        <div className="space-x-[1vw]">
          <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 "onClick={()=>{
            newtaskwindow()
          }}>
            Cancel
          </button>
          <button
            className={`bg-green-300 p-2 rounded-md hover:bg-green-400 ${name === "" ? "cursor-not-allowed": "cursor-pointer"}`}
            disabled={name === "" ? true:false}
            id="add-task"
            onClick={()=>{
              handleAsync()
            }}
            
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
