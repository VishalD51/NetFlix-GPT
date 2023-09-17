import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSIgnInForm, setiIsSIgnInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const email = useRef();
  const password = useRef();
  const name = useRef();

  const dispatch = useDispatch();
  const handleSubmitButton = () => {
    let message;
    if (!isSIgnInForm) {
      message = checkValidData(
        email.current.value,
        password.current.value,
        name.current.value
      );
    } else {
      message = checkValidData(email.current.value, password.current.value);
    }
    setErrorMessage(message);
    if (message) return;
    //Sign In - SIgn up login
    if (!isSIgnInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("update profile");
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://cdn.hashnode.com/res/hashnode/image/upload/v1681018967298/aVj24Iiqd.png?w=400&h=400&fit=crop&crop=faces&auto=compress,format&format=webp",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " - " + errorMessage);
          setErrorMessage(" Already user exist");
          navigate("/");
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " - " + errorMessage);
          setErrorMessage("Invalid login credintails.");
          navigate("/");
        });
    }
  };
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
        onSubmit={(e) => e.preventDefault()}
      >
        <p className="font-bold text-2xl">
          {isSIgnInForm ? "Sing In" : "Sign Up"}
        </p>
        {!isSIgnInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-900"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-900"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-900"
        />
        <p className="text-red-700 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 rounded-lg"
          onClick={handleSubmitButton}
        >
          {isSIgnInForm ? "Sing In" : "Sing Up"}
        </button>
        <p onClick={toggleSignInForm} className="cursor-pointer">
          {isSIgnInForm
            ? "Already user?  Sign Up now"
            : "New to Netflix? Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
