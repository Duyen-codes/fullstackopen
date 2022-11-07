import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayNotification(state, action) {
      console.log("notification state now: ", state);
      console.log("notification action now: ", action);
      const notification = action.payload;
      console.log("notification: ", notification);
      return notification;
    },

    clearNotification() {
      return "";
    },
  },
});

let timeoutId;
export const setNotification = (text, timer) => {
  console.log("TEXT: ", text);
  console.log("TIMER: ", timer);
  return (dispatch) => {
    console.log("TIMEOUTID: ", timeoutId);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    dispatch(displayNotification(text));
    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, timer);
  };
};
export const { displayNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
