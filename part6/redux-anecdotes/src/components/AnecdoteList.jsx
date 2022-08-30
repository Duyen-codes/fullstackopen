import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote)}>vote</button>
      </div>
    </li>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) =>
    state.filter === ""
      ? state.anecdotes
      : state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
  );

  const combineFunctions = async (anecdote) => {
    console.log("ANECDOTE: ", anecdote);
    dispatch(updateAnecdote(anecdote));
    dispatch(setNotification(anecdote.content));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10));
  };

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => combineFunctions(anecdote)}
        />
      ))}
    </ul>
  );
};

export default AnecdoteList;
