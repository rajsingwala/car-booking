import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  s_name: window.localStorage.getItem("s_name") || null,
  s_lat: window.localStorage.getItem("s_lat") || null,
  s_lng: window.localStorage.getItem("s_lng") || null,
};

const sourceSlice = createSlice({
  name: "source",
  initialState,
  reducers: {
    setSource: (state, action) => {
      state.s_name = action.payload.s_name;
      state.s_lat = action.payload.s_lat;
      state.s_lng = action.payload.s_lng;
    },
  },
});

export const { setSource } = sourceSlice.actions;

export const selectS_Name = (state) => state.source.s_name;
export const selectS_Lat = (state) => state.source.s_lat;
export const selectS_Lng = (state) => state.source.s_lng;

export default sourceSlice.reducer;
