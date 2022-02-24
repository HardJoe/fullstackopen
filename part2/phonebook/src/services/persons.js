import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
  try {
    const resp = await axios.get(baseUrl);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

const create = async (newObject) => {
  try {
    const resp = await axios.post(baseUrl, newObject);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

const update = async (id, newObject) => {
  const resp = await axios.put(`${baseUrl}/${id}`, newObject);
  return resp.data;
};

const deleteId = async (id) => {
  const resp = await axios.delete(`${baseUrl}/${id}`);
  return resp.data;
};

export default { getAll, create, update, deleteId };
