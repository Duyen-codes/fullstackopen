import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

// with Redux Toolkit, we can easily create reducer and related action creators using createSlice function

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // createAnecdote(state, action) {
    //   state.push(action.payload);
    // },

    addVote(state, action) {
      const id = action.payload.id;
      // const anecdoteToChange = state.find((n) => n.id === id);
      const anecdoteToChange = action.payload;
      console.log("anecdoteToChange: ", anecdoteToChange);

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },

    deleteAnecdote(state, action) {
      const id = action.payload;
      return state.filter((anecdote) => anecdote.id !== id);
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    // setAnecdotes action/ action creator setAnecdotes
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addVote, appendAnecdote, setAnecdotes, deleteAnecdote } =
  anecdoteSlice.actions;

// with Redux Thunk, it's possible to implement action creators which return a function instead of an object. The function receives Redux store's dispatch and getState methods as params.

// define an action creator initializeAnecdotes which initializes the anecdotes based on the data received from the server
export const initializeAnecdotes = () => {
  return async (dispatch, getState) => {
    const anecdotes = await anecdoteService.getAll(); // fetch all anecdotes from server
    dispatch(setAnecdotes(anecdotes)); // dispatch setAnecdotes action, which adds anecdotes to the store
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updateAnecdote = (anecdote) => {
  const id = anecdote.id;

  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

  return async (dispatch) => {
    const response = await anecdoteService.updateVotes(id, votedAnecdote);
    console.log("updatedAnecdote: ", response);
    dispatch(addVote(anecdote));
  };
};

export const removeAnecdote = (id) => {
  return async (dispatch) => {
    const response = await anecdoteService.removeAnecdote(id);
    dispatch(deleteAnecdote(id));
  };
};
export default anecdoteSlice.reducer;
