import React, { useState } from "react";

const Search = () => {
  const [text, setText] = useState("");
  return (
    <div id="search-bar" className="w-full h-screen hidden justify-center pt-10 absolute backdrop-blur-sm"onClick={()=>{
      document.getElementById("search-bar").style.display="none";
    }}>
      <div className="w-[50vw] h-[8vh] max-h-[70vh] rounded-lg shadow-[0_15px_50px_0px_rgba(0,0,0,.35)] flex justify-between items-center px-2" onClick={(e)=>{
        e.stopPropagation();
      }}>
        <svg
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
            d="M16.29 15.584a7 7 0 1 0-.707.707l3.563 3.563a.5.5 0 0 0 .708-.707l-3.563-3.563ZM11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <input
          type="text"
          className="w-full h-full px-2 rounded-lg outline-none"
          placeholder="Search your task and projects here..."
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></input>
      </div>
      </div>

    
  );
};

export default Search;
