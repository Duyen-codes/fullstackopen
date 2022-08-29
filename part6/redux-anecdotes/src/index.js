import React from "react";
import ReactDOM from "react-dom/client";
// import { createStore, combineReducers } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

// index.js currently creates the Redux store using Redux's createStore function
// const store = createStore(anecdoteReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
