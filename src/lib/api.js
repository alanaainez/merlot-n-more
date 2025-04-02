import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/food/wine';

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
