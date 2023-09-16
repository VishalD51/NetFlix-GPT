import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSIgnInForm, setiIsSIgnInForm] = useState(true);

  const toggleSignInForm = () => {
    setiIsSIgnInForm(!isSIgnInForm);
  };
  return (
    <div>
      <div className="absolute">
        <Header />
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
      </div>
      <form
        className="w-3/12 bg-black p-12 absolute my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80
      "
      >
        <p className="font-bold text-2xl">
          {isSIgnInForm ? "Sing In" : "Sign Up"}
        </p>
        {!isSIgnInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-900"
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-900"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-900"
        />
        <button className="p-4 my-6 bg-red-700 rounded-lg">
          {isSIgnInForm ? "Sing Up" : "Sing In"}
        </button>
        <p onClick={toggleSignInForm} className="cursor-pointer">
          {isSIgnInForm
            ? "Already user?  Sign In now"
            : "New to Netflix? Sign Up now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
