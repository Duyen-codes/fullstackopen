import React from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";
import { connect } from "react-redux";

const NewNote = (props) => {
  // const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    // dispatch(createNote(content));
    props.createNote(content);
  };
  return (
    <form onSubmit={addNote}>
      <input type="text" name="note" />
      <button type="submit">add</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNote: (value) => {
      dispatch(createNote(value));
    },
  };
};

export default connect(null, mapDispatchToProps)(NewNote);

// export default NewNote;
