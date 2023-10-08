import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import movieSlice from "../slice/movieSlice";
import GptSearchSlice from "../slice/gptSlice";
import configSlice from "../slice/configSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    movies: movieSlice,
    GptSearch: GptSearchSlice,
    config: configSlice,
  },
});

export default appStore;
