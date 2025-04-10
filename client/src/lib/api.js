import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_URL = `${BACKEND_URL}/api/wines`;

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

//OpenFoodFacts//
const OPEN_FOOD_FACTS_BASE_URL = 'https://world.openfoodfacts.org/api/v2/search';

export const fetchOpenFoodFactsWines = async (wineType) => {
  try {
    const response = await axios.get(OPEN_FOOD_FACTS_BASE_URL, {
      params: {
        categories_tags_en: `${wineType}-wine`, // Use the wine type to filter results
        fields: 'product_name, generic_name', // Specify the fields you want in the response
        json: 1,
      }
    });
  return response.data.products.map ((product) => ({
    name: product.product_name,
    genericName: product.generic_name,
  }));
  } catch (error) {
    console.error(`Error fetching ${wineType} wines from OpenFoodFacts:`, error);
    return []; // Return an empty array if there was an error
  }
};

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