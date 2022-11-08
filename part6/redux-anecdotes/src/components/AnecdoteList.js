import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote, updateVotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return [...anecdotes].sort((a, b) => {
        return b.votes - a.votes;
      });
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    dispatch(updateVotes(changedAnecdote));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5000));
  };

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default AnecdoteList;
