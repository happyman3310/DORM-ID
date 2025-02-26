// frontend/src/services/miniAppService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/mini-apps';

export const getMiniApps = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const activateMiniApp = async (token, miniAppId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/activate`, { miniAppId }, config);
  return response.data;
};