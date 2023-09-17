// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSgFdsbhkh8iYn4n5aDaVryKUDBtvbrdI",
  authDomain: "netflixgpt-f702c.firebaseapp.com",
  projectId: "netflixgpt-f702c",
  storageBucket: "netflixgpt-f702c.appspot.com",
  messagingSenderId: "957365142333",
  appId: "1:957365142333:web:fa89c2705ceff0a1f8bb54",
  measurementId: "G-MDK1X4K5NW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
