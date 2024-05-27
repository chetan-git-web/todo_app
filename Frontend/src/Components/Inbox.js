import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ilustration from "../assets/undraw_right_places_re_3sve.svg";
import AddTask from "./AddTask";
import axios from "axios";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TaskPage from "./TaskPage";
import { common } from "@mui/material/colors";

const Inbox = () => {
  const [newtask, setNewTask] = useState(false);
  const [inboxTasks, setInboxTasks] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [openTaskPage, setOpentaskPage] = useState(false);
  const navigate = useNavigate();
  const newtaskwindow = () => {
    setNewTask(false);
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchingTasks = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/tasks/getting-task",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
          },
        }
      );
      setInboxTasks(response?.data?.message?.data);
    };
    fetchingTasks();
  }, [refresh]);

  const taskCompleted = async (id) => {
    setTimeout(
      async (x) => {
        const response = await axios
          .delete("http://localhost:8000/api/v1/tasks/deleting-task", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
            },
            data: {
              id: x,
            },
          })
          .then((res) => {
            console.log(res);
            newtaskwindow();
            setRefresh(!refresh);
          });
      },
      300,
      id
    );
  };

  return (
    <div className="flex h-screen relative">
      <Sidebar name="inbox" />
      <div className="w-full h-screen flex justify-center pt-[10vh]">
        <div className="w-[60vw] ">
          <h1 className="text-3xl font-medium">Inbox</h1>
          {inboxTasks &&
            inboxTasks.map((task) => (
              <>
                {openTaskPage ? (
                  <div className="">
                    <TaskPage
                      id={task.id}
                      task={task.task}
                      description={task.description}
                      taskCompleted
                      comment={task.comment}
                      duedate={task.duedate}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex items-center cursor-pointer py-2">
                  <button className="group" onClick={()=>{
                    
                  }}>
                    <span class="fkdUSVv"></span>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:inline "
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.5056 9.00958C16.2128 8.71668 15.7379 8.71668 15.445 9.00958L10.6715 13.7831L8.72649 11.8381C8.43359 11.5452 7.95872 11.5452 7.66583 11.8381C7.37294 12.1309 7.37293 12.6058 7.66583 12.8987L10.1407 15.3736C10.297 15.5299 10.5051 15.6028 10.7097 15.5923C10.8889 15.5833 11.0655 15.5104 11.2023 15.3735L16.5056 10.0702C16.7985 9.77735 16.7985 9.30247 16.5056 9.00958Z"
                        fill="currentColor"
                        data-darkreader-inline-fill=""
                        className="group-hover:inline hidden"
                      ></path>
                    </svg>
                    <span class="PtDaWGV"></span>
                  </button>
                  <h1>{task.task}</h1>
                </div>
                <hr />
              </>
            ))}
          <button
            onClick={() => {
              setNewTask(true);
            }}
            className="group hover:text-amber-800 font-semibold mt-[5vh]"
          >
            <span className="text-xl group-hover:text-amber-800">+</span> Add
            Task
          </button>

          {newtask ? (
            <AddTask newtaskwindow={newtaskwindow} />
          ) : inboxTasks.length === 0 ? (
            <img className="w-[15vw] mx-auto" src={ilustration}></img>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
