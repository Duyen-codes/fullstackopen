import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

const generateId = () => Number((Math.random() * 100000).toFixed(0));

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
    createNote(state, action) {
      state.push(action.payload);
    },

    toggleImportanceOf(state, action) {
      const changedNote = action.payload;
      const id = action.payload.id;
      return state.map((note) => (note.id !== id ? note : changedNote));
    },

    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { createNote, toggleImportanceOf, setNotes } = noteSlice.actions;
export default noteSlice.reducer;
