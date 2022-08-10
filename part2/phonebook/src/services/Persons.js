import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
  return axios.get(baseURL);
};

const create = (newObject) => {
  return axios.post(baseURL, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject);
};

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export default { getAll, create, update, remove };
