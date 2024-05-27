import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TaskPage = ({
  id,
  task,
  description,
  taskCompleted,
  comment,
  duedate,
  priority,
  newtaskwindow,
}) => {
  const [edit, setEdit] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedComment, setUpdatedComment] = useState(comment);
  const [updatedDueDate, setUpdatedDueDate] = useState(duedate);
  const [updatedPriority, setUpdatedPriority] = useState(priority);
  var updatedTextArea = document.getElementById("updatedTextArea");

  const updateTask = async () => {
    const response = await axios
      .put(
        "http://localhost:8000/api/v2/tasks/updating-task",
        {
          taskName: updatedTask,
          content: updatedDescription,
          priority: updatedPriority,
          comment: updatedComment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
          },
        }
      )
      .then((response) => {
        newtaskwindow();
      })
      .catch((error) => {
        newtaskwindow();
      });
  };

  const navigate = useNavigate();
  const param = useParams();
  return (
    <div
      id="task-page"
      className="w-full h-screen flex justify-center items-center absolute backdrop-blur-sm z-10 "
    >
      <div className="w-[60vw] h-[80vh] bg-white rounded-lg  flex-col z-10 shadow-[0_15px_50px_0px_rgba(0,0,0,.35)] space-y-[2vh] relative">
        <div className="px-[2vw]">
          <div className="flex justify-between items-center w-full h-[6vh] border-b-2">
            <button className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                class=""
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M15.994 6.082a.5.5 0 1 0-.987-.164L14.493 9h-3.986l.486-2.918a.5.5 0 1 0-.986-.164L9.493 9H7a.5.5 0 1 0 0 1h2.326l-.666 4H6a.5.5 0 0 0 0 1h2.493l-.486 2.918a.5.5 0 1 0 .986.164L9.507 15h3.986l-.486 2.918a.5.5 0 1 0 .987.164L14.507 15H17a.5.5 0 1 0 0-1h-2.326l.667-4H18a.5.5 0 1 0 0-1h-2.493l.487-2.918ZM14.327 10H10.34l-.667 4h3.987l.667-4Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <h3 className="text-center">{id}</h3>
            </button>
            <div>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    transform="translate(3 10)"
                  >
                    <circle cx="2" cy="2" r="2"></circle>
                    <circle cx="9" cy="2" r="2"></circle>
                    <circle cx="16" cy="2" r="2"></circle>
                  </g>
                </svg>
              </button>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path
                    fill="currentColor"
                    d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* task  */}
          {edit ? (
            <input
              type="text"
              value={task}
              placeholder="Task"
              className="w-full h-[6vh] text-xl outline-none"
              maxLength={60}
              onChange={(e) => {
                setUpdatedTask(e.target.value);
              }}
            ></input>
          ) : (
            <h1 className="text-2xl w-full font-semibold mx-4">{task}</h1>
          )}

          {/* description */}
          {edit ? (
            <textarea
              id="updatedTextArea"
              type="text"
              placeholder="Description"
              className="outline-none block w-full"
              rows="4"
              // for changing the height of the textarea dynamically
              onChange={(e) => {
                setUpdatedDescription(e.target.value);
                document.getElementById("updatedTextArea").style.height =
                  ""; /* Reset the height*/
                document.getElementById("updatedTextArea").style.height =
                  Math.min(updatedTextArea.scrollHeight, 140) + "px";
              }}
            ></textarea>
          ) : (
            <p className="border-black border-2 mx-4 h-[15vh] w-auto p-2">
              {description === "" || description === undefined ? (
                <span className="text-gray-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M8.5 12a.5.5 0 1 1 0 1h-5a.5.5 0 0 1 0-1h5Zm3.864-4c.351 0 .636.224.636.5 0 .246-.225.45-.522.492L12.364 9H3.636C3.285 9 3 8.777 3 8.5c0-.245.225-.45.522-.491L3.636 8h8.728Zm0-4c.351 0 .636.224.636.5 0 .246-.225.45-.522.492L12.364 5H3.636C3.285 5 3 4.777 3 4.5c0-.245.225-.45.522-.491L3.636 4h8.728Z"
                    ></path>
                  </svg>
                  Description
                </span>
              ) : (
                { description }
              )}
            </p>
          )}
          {/* comment */}
          {edit ? (
            <textarea
              id="updatedTextArea"
              type="text"
              placeholder="Comment"
              className="outline-none block w-full"
              rows="4"
              // for changing the height of the textarea dynamically
              onChange={(e) => {
                setUpdatedComment(e.target.value);
                document.getElementById("updatedTextArea").style.height =
                  ""; /* Reset the height*/
                document.getElementById("updatedTextArea").style.height =
                  Math.min(updatedTextArea.scrollHeight, 200) + "px";
              }}
              cols="10"
            ></textarea>
          ) : (
            <p className="border-black border-2 mx-4 w-auto p-2 mb-6">
              {comment === "" || comment === undefined ? (
                <span className="text-gray-400">Comment</span>
              ) : (
                { comment }
              )}
            </p>
          )}
          {/* duedate  */}
          {edit ? (
            <>
              <label for="dueDate" className="text-gray-400">
                Due Date:{" "}
              </label>
              <input
                type="date"
                id="dueDate"
                onChange={(e) => {
                  setUpdatedDueDate(e.target.value);
                }}
                name="dueDate"
                min={new Date().toISOString().split("T")[0]}
                className="text-gray-400 outline-none"
              />
            </>
          ) : (
            <p className="border-black border-2 mx-4 mt-4  p-2 inline-block">
              Due Date :- {duedate}
            </p>
          )}
          {edit ? (
            <select
              id="Priority"
              name="Priority"
              className="text-gray-400"
              onChange={(e) => {
                setUpdatedPriority(e.target.value);
              }}
            >
              <option value="1">Priority 1</option>
              <option value="2">Priority 2</option>
              <option value="3">Priority 3</option>
              <option value="4">Priority 4</option>
            </select>
          ) : (
            <p className="border-black border-2 mx-4 mt-4  p-2 inline-block">
              Priority :- {priority}
            </p>
          )}
        </div>
        {/* buttons */}
        {edit ? (
          <div className="flex justify-between w-full absolute bottom-[2vh] px-[2vw] ">
            <button
              className="w-[6vw] py-[1vh] bg-amber-200 rounded-md "
              onClick={() => {
                updateTask();
              }}
            >
              Update
            </button>
            <button
              className="w-[6vw] py-[1vh] bg-red-200 rounded-md"
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex justify-between w-full absolute bottom-[2vh] px-[2vw] ">
            <div className="space-x-[2vw]">
              <button
                className="w-[6vw] py-[1vh] bg-amber-200 rounded-md "
                onClick={() => {
                  setEdit(true);
                }}
              >
                Edit
              </button>
              <button
                className="w-[6vw] py-[1vh] bg-green-200 rounded-md"
                onClick={() => {
                  taskCompleted(param);
                }}
              >
                Completed
              </button>
            </div>
            <button className="w-[6vw] py-[1vh] bg-red-200 rounded-md">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
