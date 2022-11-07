import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { useSelector, useDispatch } from "react-redux";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
}

export default App;
