import axios from "axios";

const api = axios.create({
  baseURL: "https://trello-clone-backend-es3w.onrender.com",
});

export default api;