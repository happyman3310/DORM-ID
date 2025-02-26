// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';  // Бэкенд остается на порту 5000

export const register = async (email, password, username) => {
  const response = await axios.post(`${API_URL}/register`, { email, password, username });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};