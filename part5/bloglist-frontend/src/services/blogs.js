import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const deleteOne = async (id) => {
  const config = {
    headers: { authorization: token },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

const createComment = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject);
  return response.data;
};

const blogService = {
  getAll,
  create,
  update,
  deleteOne,
  setToken,
  createComment,
};
export default blogService;
