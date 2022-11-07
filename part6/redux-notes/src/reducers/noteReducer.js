const initialState = {
  notes: [
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
  ],
  filter: "IMPORTANT",
};
const noteReducer = (state = initialState.notes, action) => {
  console.log("ACTION: ", action);
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.data];
    case "TOGGLE_IMPORTANCE":
      const id = action.data.id;
      const noteToChange = state.find((note) => note.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    default:
      return state;
  }
};

const generateId = () => Number((Math.random() * 100000).toFixed(0));

export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    data: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    data: { id },
  };
};
export default noteReducer;
