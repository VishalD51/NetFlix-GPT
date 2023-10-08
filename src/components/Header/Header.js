import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../../redux/slice/userSlice";
import { LOGO, SUPPORTED_LANGUAGE } from "../../utils/constant";
import { toggleGptSearch } from "../../redux/slice/gptSlice";
import { changeLanguage } from "../../redux/slice/configSlice";
import "./header.scss";

const Header = () => {
  const user = useSelector((store) => store.user);
  const GptSearchShow = useSelector((store) => store.GptSearch.GptSearchShow);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGptSerachClick = () => {
    GptSearchShow ? navigate("/Browse") : navigate("/GPTSearch");

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
    <div className="header-main">
      <img className="logo" src={LOGO} alt="logo" />
      {user && (
        <div className="login-info">
          {GptSearchShow && (
            <select className="multi-lang" onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option value={lang.indentifier}>{lang.name}</option>
              ))}
            </select>
          )}

          <button className="gpt-btn" onClick={handleGptSerachClick}>
            {GptSearchShow ? "Home" : "GPT Search"}
          </button>

          <img src={user?.photoURL} className="profile-pic" />
          <button className="btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
