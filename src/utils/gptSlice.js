import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "GptSearch",
  initialState: {
    GptSearchShow: false,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.GptSearchShow = !state.GptSearchShow;
    },
  },
});

export const { toggleGptSearch } = gptSlice.actions;

export default gptSlice.reducer;
