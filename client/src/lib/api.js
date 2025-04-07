import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = '/api/wines';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const searchWines = async (query) => {
  try {
    const response = await api.get('/search', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching wines:', error);
    return [];
  }
};

export const getWinesByType = async (type) => {
  try {
    const response = await api.get(`/type/${type.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${type} wines:`, error);
    return [];
  }
};

export const getFavoriteWines = async () => {
  try {
    const response = await api.get('/favorites');
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite wines:', error);
    throw error;
  }
};

export const saveWine = async (wineData) => {
  try {
    const response = await api.post('/favorites', wineData);
    return response.data;
  } catch (error) {
    console.error('Error saving wine:', error);
    throw error;
  }
};

export const removeWine = async (wineId) => {
  try {
    const response = await api.delete(`/favorites/${wineId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing wine:', error);
    throw error;
  }
};

export default api;