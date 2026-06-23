import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const updateProfile = async (id, name, email) => {
  const response = await axios.put(`${API_URL}/users/${id}`, { name, email });
  return response.data;
};

export const changePassword = async (id, currentPassword, newPassword) => {
  const response = await axios.put(`${API_URL}/users/${id}/password`, { currentPassword, newPassword });
  return response.data;
};

export const updateNotificationPreferences = async (id, preferences) => {
  const response = await axios.put(`${API_URL}/users/${id}/notifications`, preferences);
  return response.data;
};