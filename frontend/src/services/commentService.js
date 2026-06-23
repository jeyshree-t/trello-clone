import axios from "axios";

const API_URL = "http://localhost:5000/api/comments";

export const getCommentsByCard = async (cardId) => {
  const response = await axios.get(`${API_URL}/card/${cardId}`);
  return response.data;
};

export const createComment = async (text, cardId, author) => {
  const response = await axios.post(API_URL, { text, cardId, author });
  return response.data;
};