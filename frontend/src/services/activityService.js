import axios from "axios";

const API_URL = "https://trello-clone-backend-es3w.onrender.com/api/activities";

export const getActivityByCard = async (cardId) => {
  const response = await axios.get(`${API_URL}/card/${cardId}`);
  return response.data;
};