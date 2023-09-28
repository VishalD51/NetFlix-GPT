import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGE } from "../utils/constant";
import { toggleGptSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const GptSearchShow = useSelector((store) => store.GptSearch.GptSearchShow);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGptSerachClick = () => {
    dispatch(toggleGptSearch());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        dispatch(removeUser());
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
        navigate("/browse");
      } else {
        navigate("/");

        dispatch(removeUser());
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between w-screen align-middle">
      <img className="w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex align-middle text-white">
          {GptSearchShow && (
            <select
              className=" m-4 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option value={lang.indentifier}>{lang.name}</option>
              ))}
            </select>
          )}

          <button
            className="px-4 m-4 bg-purple-800 text-white"
            onClick={handleGptSerachClick}
          >
            {GptSearchShow ? "Home" : "GPT Search"}
          </button>

          <img src={user?.photoURL} className="w-16 h-16" />
          <button className="font-bold text-xl" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
