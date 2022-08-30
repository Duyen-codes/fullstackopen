import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

// index.js currently creates the Redux store using Redux's createStore function
// const store = createStore(anecdoteReducer);

store.subscribe(() => console.log(store.getState()));
// store.dispatch(
//   createAnecdote(
//     "A anecdote dispatched from index.js with store.dispatch function"
//   )
// );
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
