import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "GptSearch",
  initialState: {
    GptSearchShow: false,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.GptSearchShow = !state.GptSearchShow;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleGptSearch, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;
