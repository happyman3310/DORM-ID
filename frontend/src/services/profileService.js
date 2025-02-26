// frontend/src/services/profileService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/profile';

export const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const updateProfile = async (token, profileData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.put(API_URL, profileData, config);
  return response.data;
};