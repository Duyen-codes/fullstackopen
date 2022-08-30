import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { updateAnecdote, removeAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick, handleDelete }) => {
  return (
    <li>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote)}>vote</button>
        <button onClick={() => handleDelete(anecdote.id)}>delete</button>
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
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5000));
  };

  const deleteAnecdote = (id) => {
    dispatch(removeAnecdote(id));
  };
  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => combineFunctions(anecdote)}
          handleDelete={() => deleteAnecdote(anecdote.id)}
        />
      ))}
    </ul>
  );
};

export default AnecdoteList;
