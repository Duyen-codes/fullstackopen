import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayNotification(state = initialState, action) {
      console.log("notification state now: ", state);
      console.log("notification action now: ", action);
      const notification = action.payload;
      console.log("notification: ", notification);
      return { ...state, notification };
    },

    clearNotification() {
      return "";
    },
  },
});

export const setNotification = (text, timer) => {
  console.log("TEXT: ", text);
  console.log("TIMER: ", timer);
  return async (dispatch) => {
    dispatch(displayNotification(text, timer));
  };
};
export const { displayNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
