import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";
import { createNote } from "./reducers/noteReducer";
import { filterChange } from "./reducers/filterReducer";

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer,
// });

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});
// const store = createStore(reducer);
console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
