import React from 'react';
import { Star, Heart } from 'lucide-react';
import { saveWine, removeWine } from '../utils/api.js';
import Auth from '../utils/auth.js';

const WineCard = ({ wine, isFavorited, onFavoriteToggle }) => {
  const handleFavoriteClick = async () => {
    if (!Auth.loggedIn()) {
      window.location.assign('/login');
      return;
    }

    try {
      if (isFavorited) {
        await removeWine(wine.id);
      } else {
        await saveWine({
          wineId: wine.id,
          name: wine.name || wine.title,
          type: wine.type,
          region: wine.region,
          rating: wine.rating || wine.averageRating,
          image_url: wine.image_url || wine.imageUrl
        });
      }
      onFavoriteToggle && onFavoriteToggle(wine.id);
    } catch (err) {
      console.error('Error updating favorites:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={wine.image_url || wine.imageUrl || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3'}
        alt={wine.name || wine.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold mb-2">{wine.name || wine.title}</h3>
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              isFavorited ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">
            {(wine.rating || wine.averageRating)?.toFixed(1) || 'N/A'} 
            {(wine.review_count || wine.ratingCount) ? 
              ` (${wine.review_count || wine.ratingCount} reviews)` : ''}
          </span>
        </div>
        <p className="text-[#8b0000] font-semibold mb-2">
          ${wine.price || 'Price not available'}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          {wine.winery || 'Winery not available'} • {wine.region || 'Region not available'}
        </p>
        <p className="text-gray-500 text-sm line-clamp-3">
          {wine.description || 'No description available'}
        </p>
      </div>
    </div>
  );
};

export default WineCard;
