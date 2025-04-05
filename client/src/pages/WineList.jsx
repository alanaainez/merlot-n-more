import React, { useState, useEffect } from 'react';
import { Filter, Star, Loader } from 'lucide-react';
import { fetchOpenFoodFactsWines } from '../lib/api.js';

const WINE_FAVORITES_KEY = 'wineFavorites'; // Local storage key for wine favorites, change to database in the future

const wineTypes = [
  {
    type: "Red Wine",
    description: "Full-bodied and rich in tannins, red wines range from light Pinot Noir to bold Cabernet Sauvignon. Perfect with red meats and hearty dishes.",
    image: "https://images.unsplash.com/photo-1561461056-77634126673a",
    apiType: 'red'
  },
  {
    type: "White Wine",
    description: "Crisp and refreshing, white wines vary from dry Chardonnay to sweet Riesling. Ideal with seafood, poultry, and light dishes.",
    image: "https://images.unsplash.com/photo-1558346489-19413928158b",
    apiType: 'white'
  },
  {
    type: "Rosé",
    description: "Fresh and vibrant, rosé wines offer the perfect balance between red and white. Great for summer and light Mediterranean cuisine.",
    image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0",
    apiType: 'rose'
  },
  {
    type: "Sparkling",
    description: "Effervescent and celebratory, sparkling wines like Champagne and Prosecco are perfect for celebrations and appetizers.",
    image: "https://plus.unsplash.com/premium_photo-1677327746215-6d9411e306f1",
    apiType: 'sparkling'
  }
];

const WineList = () => {
  //const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [redWines, setRedWines] = useState([]);
  const [whiteWines, setWhiteWines] = useState([]);
  const [roseWines, setRoseWines] = useState([]);
  const [sparklingWines, setSparklingWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem(WINE_FAVORITES_KEY); // Retrieve favorites from local storage
    return storedFavorites ? JSON.parse(storedFavorites) : []; // Parse the stored JSON or return an empty array
  });

  useEffect(() => {
    const loadWinesByType = async () => {
      setLoading(true);
      setError('');
      try {
        const redData = await fetchOpenFoodFactsWines('red');
        setRedWines(redData);
  
        const whiteData = await fetchOpenFoodFactsWines('white');
        setWhiteWines(whiteData);
  
        const roseData = await fetchOpenFoodFactsWines('rose');
        setRoseWines(roseData);
  
        const sparklingData = await fetchOpenFoodFactsWines('sparkling');
        setSparklingWines(sparklingData);
  
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch wine data. Please try again.');
        setLoading(false);
        console.error('Error loading wine data:', err);
      }
    };
    loadWinesByType();
  }, [fetchOpenFoodFactsWines, setRedWines, setWhiteWines, setRoseWines, setSparklingWines, setLoading, setError]);

  useEffect(() => {
    localStorage.setItem(WINE_FAVORITES_KEY, JSON.stringify(favorites)); // Store favorites in local storage
  }, [favorites]);

  const isFavorite = (wine) => {
    return favorites.some(fav => fav.name === wine.name && fav.genericName === wine.genericName);
  }
  
  const toggleFavorite = (wine) => {
    const alreadyFavorite = isFavorite(wine);
    if (alreadyFavorite) {
      setFavorites(favorites.filter(fav => !(fav.name === wine.name && fav.genericName === wine.genericName))); // Remove from favorites  
    } else {
      setFavorites([...favorites, wine]);
    }
  }

  const allWines = {
    red: redWines,
    white: whiteWines,
    rose: roseWines,
    sparkling: sparklingWines,
  };

  const filteredWines = Object.entries(allWines).reduce((acc, [type, wines]) => {
    if (!selectedType || selectedType.toLowerCase() === type) {
      acc[type] = wines; // Include wines of the current type if no filter is applied
    } else {
      acc[type] = []; // Exclude wines of the current type if it doesn't match the filter
    }
    return acc;
    }, {});

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Wine Collection</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#8b0000] focus:border-[#8b0000] w-full appearance-none"
            >
              <option value="">All Types</option>
              <option value="red">Red Wine</option>
              <option value="white">White Wine</option>
              <option value="sparkling">Sparkling Wine</option>
              <option value="rose">Rosé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Wine Types Guide */}
      <div className="mb-12 bg-[#fff8f8] rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Wine Types Guide</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wineTypes.map((wine) => (
            <div
              key={wine.type}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={wine.image}
                  alt={wine.type}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                  {wine.type}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">
                  {wine.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader className="h-8 w-8 text-[#8b0000] animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {!loading && !error && Object.values(filteredWines).flat().length > 0 && (
        <div className="grid md: grid-cols2 lg:grid-cols-3 gap-6">
          {Object.entries(filteredWines).map(([type, wines]) => (
            wines.length > 0 && (
              <div key={type} className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {type.charAt(0).toUpperCase() + type.slice(1)} Wines</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wines.map((wine, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="p-6 relative">
                      <h3 className="text-xl font-semibold mb-2">{wine.name || 'No Name'}</h3>
                      <p className="text-gray-500 text-sm line-clamp-3">{wine.genericName || 'No Description'}</p>
                      <button onClick={() => toggleFavorite(wine)}
                              className="absolute top-2 right-2 focus:outline-none">
                      <Star className={`h-5 w-5 ${isFavorite(wine) ? 'text-yellow-400' : 'text-gray-300'}`} />
                      </button>
                    </div>
                 </div>
              ))}
              </div>
            </div>
            )
        ))}
      </div>
    )}
  </div>
  )};

export default WineList;
