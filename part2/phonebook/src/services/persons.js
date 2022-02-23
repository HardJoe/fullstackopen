import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

// const getAll = () => {
//   const request = axios.get(baseUrl);
//   return request.then((response) => response.data);
// };

const getAll = async () => {
  try {
    const resp = await axios.get(baseUrl);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

// const create = (newObject) => {
//   const request = axios.post(baseUrl, newObject);
//   return request.then((response) => response.data);
// };

const create = async (newObject) => {
  try {
    const resp = await axios.post(baseUrl, newObject);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject);
//   return request.then((response) => response.data);
// };

const update = async (id, newObject) => {
  try {
    const resp = await axios.put(`${baseUrl}/${id}`, newObject);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

export default { getAll, create, update };
