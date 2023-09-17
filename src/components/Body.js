import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      } else {
        dispatch(removeUser);
      }
    });
  }, []);
  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRoute} />
    </div>
  );
};

export default Body;
