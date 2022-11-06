import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";



function App() {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  const toggleImportance = id => {
   dispatch(toggleImportanceOf(id))
  }

  return (
    <div className="App">
    <NewNote />
     <Notes />
    </div>
  );
}

export default App;
