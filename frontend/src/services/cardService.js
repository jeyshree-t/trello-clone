import axios from "axios";

const API_URL = "https://trello-clone-backend-es3w.onrender.com/api/cards";

// Get all cards for a list
export const getCardsByList = async (listId) => {
  const response = await axios.get(`${API_URL}/list/${listId}`);
  return response.data;
};

// Create a new card
export const createCard = async (title, description, dueDate, priority, listId) => {
  const response = await axios.post(API_URL, { title, description, dueDate, priority, listId });
  return response.data;
};

// Update a card
export const updateCard = async (id, title, description, dueDate, priority) => {
  const response = await axios.put(`${API_URL}/${id}`, { title, description, dueDate, priority });
  return response.data;
};

// Delete a card
export const deleteCard = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Move a card to a different list (used for drag and drop)
export const moveCard = async (id, newListId) => {
  const response = await axios.put(`${API_URL}/${id}`, { listId: newListId });
  return response.data;
};
// Assign a member to a card
export const assignMember = async (cardId, userId) => {
  const response = await axios.put(`${API_URL}/${cardId}/assign`, { userId });
  return response.data;
};

// Remove a member from a card
export const removeMember = async (cardId, userId) => {
  const response = await axios.put(`${API_URL}/${cardId}/remove`, { userId });
  return response.data;
};