import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  d_name: window.localStorage.getItem("d_name") || null,
  d_lat: window.localStorage.getItem("d_lat") || null,
  d_lng: window.localStorage.getItem("d_lng") || null,
};

const destSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.d_name = action.payload.d_name;
      state.d_lat = action.payload.d_lat;
      state.d_lng = action.payload.d_lng;
    },
  },
});

export const { setDestination } = destSlice.actions;

export const selectD_Name = (state) => state.destination.d_name;
export const selectD_Lat = (state) => state.destination.d_lat;
export const selectD_Lng = (state) => state.destination.d_lng;

export default destSlice.reducer;
