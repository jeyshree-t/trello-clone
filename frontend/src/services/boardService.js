import axios from "axios";

const API_URL = "http://localhost:5000/api/boards";

export const getBoards = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateBoard = async (id, name, description) => {
  const response = await axios.put(`${API_URL}/${id}`, { name, description });
  return response.data;
};

export const getBoardById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};