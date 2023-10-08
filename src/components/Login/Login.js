import React, { useRef, useState } from "react";
import Header from "../Header/Header";
import { checkValidData } from "../../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slice/userSlice";
import { USER_AVTAR } from "../../utils/constant";
import "./login.scss";

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
    <div className="main">
      <div className="login-form">
        <form className="" onSubmit={(e) => e.preventDefault()}>
          <p>{isSIgnInForm ? "Sing In" : "Sign Up"}</p>
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
          <p className="error-message">{errorMessage}</p>
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
    </div>
  );
};

export default Login;
