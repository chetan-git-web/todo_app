import React from "react";

const Login = () => {
  return (
    <div className="w-full h-[100">
      <h1 className="text-[40px] font-bold">Log in</h1>
      <form>
        <div>
          <label for="email">Email</label>
          <input type="email" id="fname" name="fname" autoComplete="true"></input>
        </div>
        <div>
          <input type="password"></input>
        </div>
      </form>
    </div>
  );
};

export default Login;
