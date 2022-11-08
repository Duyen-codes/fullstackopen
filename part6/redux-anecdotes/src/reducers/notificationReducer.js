import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    showNotification: (state, action) => {
      const notification = action.payload;
      return notification;
    },
    clearNotification() {
      return "";
    },
  },
});

let timeoutId;
export const setNotification = (text, timer) => {
  return async (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    dispatch(showNotification(text));
    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, timer);
  };
};

export const { showNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
