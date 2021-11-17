import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  p_a: "",
  d_a: "",
  d_f_d: 0,
  t_d: 0,
  fare: 0,
};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setDriver: (state, action) => {
      state.p_a = action.payload.p_a;
      state.d_a = action.payload.d_a;
      state.d_f_d = action.payload.d_f_d;
      state.t_d = action.payload.t_d;
      state.fare = action.payload.fare;
    },
  },
});

export const { setDriver } = driverSlice.actions;

export const selectP_a = (state) => state.driver.p_a;
export const selectD_a = (state) => state.driver.d_a;
export const selectD_f_d = (state) => state.driver.d_f_d;
export const selectT_d = (state) => state.driver.t_d;
export const selectFare = (state) => state.driver.fare;

export default driverSlice.reducer;
