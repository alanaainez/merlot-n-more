import React, { useState, useEffect } from 'react';
import { Wine, Star, Trash2 } from 'lucide-react';
import { getFavoriteWines, removeWine } from '../utils/api';
import Auth from '../utils/auth';

const Favorites = () => {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await getFavoriteWines();
      setWines(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error loading favorites');
      setLoading(false);
      console.error(err);
    }
  };

  const handleDeleteWine = async (wineId) => {
    try {
      await removeWine(wineId);
      setWines(wines.filter(wine => wine.wineId !== wineId));
    } catch (err) {
      setError('Error removing wine');
      console.error(err);
    }
  };

  if (!Auth.loggedIn()) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Please log in to view your favorites.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b0000]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">My Favorite Wines</h2>
      
      {error && (
        <div className="text-red-600 mb-4">
          {error}
        </div>
      )}

      {wines.length === 0 ? (
        <div className="text-center py-12">
          <Wine className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No saved wines yet!</p>
          <p className="text-gray-400">Browse wines and add them to your favorites.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wines.map((wine) => (
            <div key={wine.wineId} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold mb-2">{wine.name}</h3>
                  <button
                    onClick={() => handleDeleteWine(wine.wineId)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">
                    {wine.rating ? wine.rating.toFixed(1) : 'No rating'}
                  </span>
                </div>
                <p className="text-gray-600">{wine.type}</p>
                <p className="text-gray-500">{wine.region}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
