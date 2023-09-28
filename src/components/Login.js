import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVTAR } from "../utils/constant";

const Login = () => {
  const [isSIgnInForm, setiIsSIgnInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVTAR,
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
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(" Already user exist");
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
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("Invalid login credintails.");
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
