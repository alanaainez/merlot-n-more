import React, { useState, useEffect } from 'react';
import { Wine, Star, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const WINE_FAVORITES_KEY = 'wineFavorites';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load favorites from localStorage
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem(WINE_FAVORITES_KEY);
        const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavorites(parsedFavorites);
      } catch (err) {
        console.error('Error loading favorites from localStorage:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = (wineToRemove) => {
    const updatedFavorites = favorites.filter(wine => 
      !(wine.name === wineToRemove.name && wine.genericName === wineToRemove.genericName)
    );
    setFavorites(updatedFavorites);
    localStorage.setItem(WINE_FAVORITES_KEY, JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b0000]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4 text-gray-600 hover:text-[#8b0000]">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-3xl font-bold text-gray-900">My Favorite Wines</h2>
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Wine className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No saved wines yet!</p>
          <p className="text-gray-400 mb-4">Browse wines and add them to your favorites.</p>
          <Link 
            to="/" 
            className="inline-block bg-[#8b0000] text-white px-6 py-2 rounded-md hover:bg-[#6b0000] transition-colors"
          >
            Browse Wines
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((wine, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold mb-2">{wine.name}</h3>
                  <button
                    onClick={() => handleRemoveFavorite(wine)}
                    className="text-gray-400 hover:text-red-600 focus:outline-none"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">Favorite</span>
                </div>
                <p className="text-gray-500 mt-2">{wine.genericName || 'No description available'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
