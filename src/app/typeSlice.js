import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: window.localStorage.getItem("type") || "",
};

const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload.type;
    },
  },
});

export const { setType } = typeSlice.actions;

export const select_type = (state) => state.type.type;

export default typeSlice.reducer;
