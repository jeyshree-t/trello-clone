import axios from "axios";

const API_URL = "https://trello-clone-backend-es3w.onrender.com/api/lists";

// Get all lists for a board
export const getListsByBoard = async (boardId) => {
  const response = await axios.get(`${API_URL}/board/${boardId}`);
  return response.data;
};

// Create a new list
export const createList = async (title, boardId) => {
  const response = await axios.post(API_URL, { title, boardId });
  return response.data;
};

// Update a list's title
export const updateList = async (id, title) => {
  const response = await axios.put(`${API_URL}/${id}`, { title });
  return response.data;
};

// Delete a list
export const deleteList = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};