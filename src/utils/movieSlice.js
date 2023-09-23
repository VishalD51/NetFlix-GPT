import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    movieVideo: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addMovieVideo: (state, action) => {
      state.movieVideo = action.payload;
    },
  },
});
export const { addNowPlayingMovies, addMovieVideo } = movieSlice.actions;
export default movieSlice.reducer;
