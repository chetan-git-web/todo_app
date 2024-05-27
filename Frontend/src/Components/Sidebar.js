import React, { useState } from "react";
import { useSelector } from "react-redux";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const Sidebar = ({name}) => {

  const user = useSelector((store) => store.user.value);
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const showHideSidebar = () => {
    if (!sidebar) {
      setSidebar(true);
      document.getElementById("sidebar").style.display = "none";
      document.getElementById("sidebar-button").style.display = "block";
    } else {
      setSidebar(false);
      document.getElementById("sidebar").style.display = "block";
      document.getElementById("sidebar-button").style.display = "none";
    }
  };
  const openSearh = () => {
    document.getElementById("search-bar").style.display="flex"
    console.log("hello")
  }

  return (
    <div className=" h-screen">
      <Search/>
      <div
        title="Open sidebar"
        id="sidebar-button"
        className="p-2 inline md:hidden "
        onClick={() => {
          showHideSidebar();
        }}
      >
        <svg
          className="hover:bg-amber-100 p-1 rounded-md cursor-pointer group"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            className="group-hover:fill-amber-800"
            fill-rule="evenodd"
            d="M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2Zm-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1v-12Zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9v14Z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="w-[300px] bg-amber-50 h-[100%] md:block hidden " id="sidebar" >
        <div className="flex w-full space-x-4 p-2 justify-between items-center">
          <div className="flex items-center space-x-2 p-2 hover:bg-amber-100 rounded-md cursor-pointer">
            <img
              src="https://img.icons8.com/?size=256&id=86363&format=png"
              width={22}
              height={22}
              className="rounded-full text outline outline-offset-2 outline-2 outline-amber-800 bg-white cursor-pointer"
              alt="profile image"
            ></img>
            <p className="text-medium font-semibold">{user?.userName}</p>
          </div>
          <div className="flex items-center">
            <div title="Notification">
              <svg
                className="hover:bg-amber-100 p-1 rounded-md cursor-pointer group"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className="group-hover:fill-amber-800"
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="m6.585 15.388-.101.113c-.286.322-.484.584-.484 1h12c0-.416-.198-.678-.484-1l-.101-.113c-.21-.233-.455-.505-.7-.887-.213-.33-.355-.551-.458-.79-.209-.482-.256-1.035-.4-2.71-.214-3.5-1.357-5.5-3.857-5.5s-3.643 2-3.857 5.5c-.144 1.675-.191 2.227-.4 2.71-.103.239-.245.46-.457.79-.246.382-.491.654-.701.887Zm10.511-2.312c-.083-.341-.131-.862-.241-2.148-.113-1.811-.469-3.392-1.237-4.544C14.8 5.157 13.57 4.5 12 4.5c-1.571 0-2.8.656-3.618 1.883-.768 1.152-1.124 2.733-1.237 4.544-.11 1.286-.158 1.807-.241 2.148-.062.253-.13.373-.46.884-.198.308-.373.504-.57.723-.074.081-.15.166-.232.261-.293.342-.642.822-.642 1.557a1 1 0 0 0 1 1h3a3 3 0 0 0 6 0h3a1 1 0 0 0 1-1c0-.735-.35-1.215-.642-1.557-.082-.095-.158-.18-.232-.261-.197-.22-.372-.415-.57-.723-.33-.511-.398-.63-.46-.884ZM14 17.5h-4a2 2 0 1 0 4 0Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div
              title="Close sidebar"
              onClick={() => {
                showHideSidebar();
              }}
            >
              <svg
                className="hover:bg-amber-100 p-1 rounded-md cursor-pointer group"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  className="group-hover:fill-amber-800"
                  fill-rule="evenodd"
                  d="M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2Zm-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1v-12Zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9v14Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex w-11/12 space-x-4 p-3 m-3 hover:bg-amber-100 rounded-md cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="rgb(146 64 14)"
              d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm-.711-16.5a.75.75 0 1 1 1.5 0v4.789H17.5a.75.75 0 0 1 0 1.5h-4.711V17.5a.75.75 0 0 1-1.5 0V12.79H6.5a.75.75 0 1 1 0-1.5h4.789V6.5Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p className="text-xl text-amber-800 font-semibold">Add Task</p>
        </div>
        <div className="flex w-11/12 space-x-4 p-2 mx-2 hover:bg-amber-100 rounded-md cursor-pointer group" onClick={()=>{
          openSearh()
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              className="group-hover:fill-amber-800"
              fill="currentColor"
              fill-rule="evenodd"
              d="M16.29 15.584a7 7 0 1 0-.707.707l3.563 3.563a.5.5 0 0 0 .708-.707l-3.563-3.563ZM11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p className="group-hover:text-amber-800">Search</p>
        </div>
        <div className= {`flex w-11/12 space-x-4 p-2 mx-2 hover:bg-amber-100 rounded-md cursor-pointer group ${name === 'inbox' ? 'bg-amber-200':''}`} onClick={()=>{
          navigate("/inbox")
        }} >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              className="group-hover:fill-amber-800"
              fill="currentColor"
              fill-rule="evenodd"
              d="M8.062 4h7.876a2 2 0 0 1 1.94 1.515l2.062 8.246c.04.159.06.322.06.486V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3.754a2 2 0 0 1 .06-.485L6.12 5.515A2 2 0 0 1 8.061 4Zm0 1a1 1 0 0 0-.97.758L5.03 14.004a1 1 0 0 0-.03.242V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.754a.997.997 0 0 0-.03-.242L16.91 5.758a1 1 0 0 0-.97-.758H8.061Zm6.643 10a2.75 2.75 0 0 1-5.41 0H7a.5.5 0 1 1 0-1h2.75a.5.5 0 0 1 .5.5 1.75 1.75 0 1 0 3.5 0 .5.5 0 0 1 .5-.5H17a.5.5 0 0 1 0 1h-2.295Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p className="group-hover:text-amber-800">Inbox</p>
        </div>
        <div className={`flex w-11/12 space-x-4 p-2 mx-2 hover:bg-amber-100 rounded-md cursor-pointer group ${name === 'upcoming' ? 'bg-amber-200':''}`} onClick={()=>{
          navigate("/upcoming")
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              className="group-hover:fill-amber-800"
              fill="currentColor"
              fill-rule="evenodd"
              d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6Zm10 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1H7Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p className="group-hover:text-amber-800">Upcoming</p>
        </div>
        <div className="flex w-11/12 space-x-4 p-2 m-2 my-6 text-xl hover:bg-amber-100 rounded-md cursor-pointer justify-between items-center group">
          <p className="group-hover:text-amber-800">My Projects</p>
          <div className="flex justify-between items-center space-x-5">
            <div title="Create a new Project">
              <svg
                className="hover:bg-amber-300 p-1 rounded-md"
                width="22"
                height="22"
              >
                <path
                  className="group-hover:fill-amber-800"
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
                ></path>
              </svg>
            </div>
            <div title="Toggle list of my Projects">
              <svg
                className="hover:bg-amber-300 p-[2px] rounded-md"
                width="24"
                height="24"
                viewBox="0 0 16 16"
              >
                <path
                  className="group-hover:fill-amber-800"
                  fill="currentColor"
                  d="M14 5.758 13.156 5 7.992 9.506l-.55-.48.002.002-4.588-4.003L2 5.77 7.992 11 14 5.758"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
