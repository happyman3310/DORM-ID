// frontend/src/services/achievementService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/achievements';

export const getAchievements = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};