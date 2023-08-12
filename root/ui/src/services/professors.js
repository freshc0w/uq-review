import axios from 'axios';
const baseUrl = '/api/professors';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
}

const update = async (id, newObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObj);
  return response.data;
}

const removeProfessors = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
}

export default { getAll, create, update, removeProfessors };