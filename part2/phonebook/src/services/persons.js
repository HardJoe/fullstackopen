import axios from 'axios';

const baseUrl = '/api/persons';

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
    throw err;
  }
};

const update = async (id, newObject) => {
  try {
    const resp = await axios.put(`${baseUrl}/${id}`, newObject);
    return resp.data;
  } catch (err) {
    throw err;
  }
};

const deleteId = async (id) => {
  try {
    const resp = await axios.delete(`${baseUrl}/${id}`);
    return resp.data;
  } catch (err) {
    throw err;
  }
};

const personService = { getAll, create, update, deleteId };

export default personService;
