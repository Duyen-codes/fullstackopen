import { createSlice } from "@reduxjs/toolkit";
import noteService from "../services/notes";

// const initialState = [
//   {
//     content: "reducer defines how redux store works",
//     important: true,
//     id: 1,
//   },
//   {
//     content: "state of store can contain any data",
//     important: false,
//     id: 2,
//   },
// ];

// const generateId = () => Number((Math.random() * 100000).toFixed(0));

// const noteReducer = (state = initialState, action) => {
//   console.log("ACTION: ", action);
//   switch (action.type) {
//     case "NEW_NOTE":
//       return [...state, action.data];
//     case "TOGGLE_IMPORTANCE":
//       const id = action.data.id;
//       const noteToChange = state.find((note) => note.id === id);
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important,
//       };
//       return state.map((note) => (note.id !== id ? note : changedNote));
//     default:
//       return state;
//   }
// };

// export const createNote = (content) => {
//   return {
//     type: "NEW_NOTE",
//     data: {
//       content,
//       important: false,
//       id: generateId(),
//     },
//   };
// };

// export const toggleImportanceOf = (id) => {
//   return {
//     type: "TOGGLE_IMPORTANCE",
//     data: { id },
//   };
// };
// export default noteReducer;

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    appendNote(state, action) {
      state.push(action.payload);
    },

    toggleNoteImportance(state, action) {
      const changedNote = action.payload;
      const id = action.payload.id;
      return state.map((note) => (note.id !== id ? note : changedNote));
    },

    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  };
};

export const toggleImportanceOf = (changedNote) => {
  return async (dispatch) => {
    const returnedNote = await noteService.toggleImportance(
      changedNote.id,
      changedNote
    );
    dispatch(toggleNoteImportance(returnedNote));
  };
};
export const { appendNote, toggleNoteImportance, setNotes } = noteSlice.actions;
export default noteSlice.reducer;
