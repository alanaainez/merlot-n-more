import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://wine-explorer-api-ratings-insights-and-search.p.rapidapi.com';

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
    const response = await axios.get(`${BASE_URL}/recommendation`, {
      params: {
        apiKey: API_KEY,
        wine: query,
        number: 10,
      },
    });

    return response.data.recommendedWines.map((wine) => ({
      id: wine.id,
      title: wine.title,
      description: wine.description,
      price: wine.price,
      imageUrl: wine.imageUrl,
      averageRating: wine.averageRating,
      ratingCount: wine.ratingCount,
      score: wine.score,
      link: wine.link,
    }));
  } catch (error) {
    console.error('Error fetching wines:', error);
    return [];
  }
};
