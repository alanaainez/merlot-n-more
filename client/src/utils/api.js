import axios from 'axios';
import Auth from './auth';

const api = axios.create({
  baseURL: '/api'
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = Auth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = (userData) => {
  return api.post('/auth/login', userData);
};

export const signupUser = (userData) => {
  return api.post('/auth/signup', userData);
};

export const getFavoriteWines = () => {
  return api.get('/wines/favorites');
};

export const saveWine = (wineData) => {
  return api.post('/wines/favorites', wineData);
};

export const removeWine = (wineId) => {
  return api.delete(`/wines/favorites/${wineId}`);
};

export default api;
