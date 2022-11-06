import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

// method which uses axios to fetch data from the backend
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// method for creating new anecdote
const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  console.log("RESPONSE: ", response);
  return response.data;
};

// method for updating votes to the server
const updateVotes = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  console.log("RESPONSE: ", response);
  return response.data;
};

// method for removing an anecdote
const removeAnecdote = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  console.log("ID: ", id);
  return response.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, updateVotes, removeAnecdote };
