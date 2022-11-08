import "./App.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useSelector, useDispatch } from "react-redux";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { initializeNotes, setNotes } from "./reducers/noteReducer";
import noteService from "./services/notes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, []);
  return (
    <div className="App">
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
}

export default App;
