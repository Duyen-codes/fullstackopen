import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../services/notes";

const Note = ({ note, handleClick }) => {
  return (
    <li key={note.id} onClick={handleClick}>
      {note.content}
      <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ filter, notes }) => {
    if (filter === "ALL") {
      return notes;
    }
    return filter === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  });

  const handleToggleImportance = async (note) => {
    const changedNote = { ...note, important: !note.important };
    const returnedNote = await noteService.toggleImportance(
      note.id,
      changedNote
    );
    dispatch(toggleImportanceOf(returnedNote));
  };

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => handleToggleImportance(note)}
        />
      ))}
    </ul>
  );
};

export default Notes;
