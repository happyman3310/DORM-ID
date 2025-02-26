// frontend/src/services/dashboardService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/dashboard';

export const getDashboardSettings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const updateDashboardSettings = async (token, widgets) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL, { widgets }, config);
  return response.data;
};