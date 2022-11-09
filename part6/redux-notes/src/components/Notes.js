import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../services/notes";
import { connect } from "react-redux";

const Note = ({ note, handleClick }) => {
  return (
    <li key={note.id} onClick={handleClick}>
      {note.content}
      <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = (props) => {
  // const dispatch = useDispatch();
  // const notes = useSelector(({ filter, notes }) => {
  //   if (filter === "ALL") {
  //     return notes;
  //   }
  //   return filter === "IMPORTANT"
  //     ? notes.filter((note) => note.important)
  //     : notes.filter((note) => !note.important);
  // });

  const handleToggleImportance = async (note) => {
    const changedNote = { ...note, important: !note.important };
    props.toggleImportanceOf(changedNote);
  };

  return (
    <ul>
      {props.notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => handleToggleImportance(note)}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  if (state.filter === "ALL") {
    return {
      notes: state.notes,
    };
  }
  return {
    notes:
      state.filter === "IMPORTANT"
        ? state.notes.filter((note) => note.important)
        : state.notes.filter((note) => !note.important),
  };
};

const mapDispatchToProps = {
  toggleImportanceOf,
};

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes);
export default ConnectedNotes;
// export default Notes;
