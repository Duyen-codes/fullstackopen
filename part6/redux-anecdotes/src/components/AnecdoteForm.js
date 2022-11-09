import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.createAnecdote(content);
    props.setNotification(`You created '${content}'`, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     createAnecdote: (value) => {
//       dispatch(createAnecdote(value));
//     },
//     setNotification: (text, timer) => {
//       dispatch(setNotification(text, timer));
//     },
//   };
// };

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
// export default AnecdoteForm;
