import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayNotification(state = initialState, action) {
      console.log("notification state now: ", state);
      console.log("notification action: ", action);
      const notification = action.payload;
      return { ...state, notification };
    },

    clearNotification() {
      return "";
    },
  },
});

export const { displayNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
