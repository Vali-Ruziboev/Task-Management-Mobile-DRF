import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    update: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { update } = authSlice.actions;

export const selectItem = (state) => state.mySlice.item;

export default authSlice.reducer;
