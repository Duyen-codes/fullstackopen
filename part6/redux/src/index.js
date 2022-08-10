import React from "react";
import ReactDOM from "react-dom/client";

import App from './App'
import { createStore } from "redux";
import {Provider} from 'react-redux'
import counterReducer from "./reducers/reducer";


const store = createStore(counterReducer);

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  data: {
    id: 2
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)