import axios from "axios";

const API_URL = "http://localhost:5000/api/activities";

export const getActivityByCard = async (cardId) => {
  const response = await axios.get(`${API_URL}/card/${cardId}`);
  return response.data;
};