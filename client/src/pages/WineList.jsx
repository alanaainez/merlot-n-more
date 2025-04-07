import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Star, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchWines, fetchOpenFoodFactsWines } from '../lib/api.js'; // Import both API functions

const WINE_FAVORITES_KEY = 'wineFavorites'; // Local storage key for wine favorites

const wineTypes = [
  {
    type: "Red Wine",
    description: "Full-bodied and rich in tannins...",
    image: "https://images.unsplash.com/photo-1561461056-77634126673a",
    apiType: 'red',
    path: "/wines/red"
  },
  {
    type: "White Wine",
    description: "Crisp and refreshing...",
    image: "https://images.unsplash.com/photo-1558346489-19413928158b",
    apiType: 'white',
    path: "/wines/white"
  },
  {
    type: "Rosé",
    description: "Fresh and vibrant...",
    image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0",
    apiType: 'rose',
    path: "/wines/rose"
  },
  {
    type: "Sparkling",
    description: "Effervescent and celebratory...",
    image: "https://plus.unsplash.com/premium_photo-1677327746215-6d9411e306f1",
    apiType: 'sparkling',
    path: "/wines/sparkling"
  }
];

const commonWineTypes = [
  "Cabernet Sauvignon", "Merlot", "Pinot Noir", "Chardonnay", "Sauvignon Blanc",
  "Riesling", "Champagne", "Prosecco", "Rosé", "Syrah/Shiraz", "Malbec",
  "Zinfandel", "Pinot Grigio", "Gewürztraminer", "Moscato"
];

const WineList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [redWines, setRedWines] = useState([]);
  const [whiteWines, setWhiteWines] = useState([]);
  const [roseWines, setRoseWines] = useState([]);
  const [sparklingWines, setSparklingWines] = useState([]);
  const [wines, setWines] = useState([]); // State for search results
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem(WINE_FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

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
        setError('Failed to fetch initial wine data. Please try again.');
        setLoading(false);
        console.error('Error loading initial wine data:', err);
      }
    };

    loadWinesByType();
  }, [fetchOpenFoodFactsWines, setRedWines, setWhiteWines, setRoseWines, setSparklingWines, setLoading, setError]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.length < 2) {
        setWines([]);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const searchResults = await searchWines(searchTerm);
        setWines(searchResults);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch search results. Please try again.');
        setLoading(false);
        console.error('Error fetching search results:', err);
      }
    };

    fetchSearchResults();
  }, [searchTerm, searchWines, setLoading, setError]);

  useEffect(() => {
    localStorage.setItem(WINE_FAVORITES_KEY, JSON.stringify(favorites)); // Store favorites in local storage
  }, [favorites]);

  const isFavorite = (wine) => {
    return favorites.some(fav => fav.name === wine.name && fav.genericName === wine.genericName);
  }

  const toggleFavorite = (wine) => {
    const alreadyFavorite = isFavorite(wine);
    if (alreadyFavorite) {
      setFavorites(favorites.filter(fav => !(fav.name === wine.name && fav.genericName === wine.genericName)));
    } else {
      setFavorites([...favorites, wine]);
    }
  }

  const allWinesByType = {
    red: redWines,
    white: whiteWines,
    rose: roseWines,
    sparkling: sparklingWines,
  };

  const filteredWinesByType = Object.entries(allWinesByType).reduce((acc, [type, wines]) => {
    if (!selectedType || selectedType.toLowerCase() === type) {
      acc[type] = wines;
    } else {
      acc[type] = [];
    }
    return acc;
  }, {});

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = commonWineTypes.filter(type =>
        type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const filteredSearchResults = wines.filter(wine => {
    const matchesType = !selectedType || wine.title.toLowerCase().includes(selectedType.toLowerCase());
    return matchesType;
  });

  const shouldDisplaySearchResults = searchTerm.length >= 2 && !loading && !error;
  const shouldDisplayByType = searchTerm.length < 2;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Wine Collection</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search wines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#8b0000] focus:border-[#8b0000] w-full"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

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
            <Link
              key={wine.type}
              to={wine.path}
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
            </Link>
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

      {shouldDisplaySearchResults && filteredSearchResults.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No wines found for "{searchTerm}". Try a different search term.
        </div>
      )}

      {shouldDisplaySearchResults && filteredSearchResults.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSearchResults.map((wine) => (
            <div key={wine.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={wine.imageUrl || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3'}
                alt={wine.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{wine.title}</h3>
                <div className="flex items-center mb-2">
                  <Star className={`h-4 w-4 ${isFavorite(wine) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                  <span className="ml-1 text-sm text-gray-600">
                    {wine.averageRating ? wine.averageRating.toFixed(1) : 'N/A'}
                    {wine.ratingCount ? ` (${wine.ratingCount} reviews)` : ''}
                  </span>
                </div>
                <p className="text-[#8b0000] font-semibold mb-4">{wine.price || 'Price not available'}</p>
                <p className="text-gray-500 text-sm line-clamp-3">{wine.description || 'No description available'}</p>
                <a
                  href={wine.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[#8b0000] hover:text-[#6b0000] text-sm font-medium"
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {shouldDisplayByType && Object.values(filteredWinesByType).flat().length === 0 && !loading && !error && (
        <div className="text-center py-12 text-gray-500">
          No wines found for the selected type.
        </div>
      )}

      {shouldDisplayByType && !loading && !error && Object.values(filteredWinesByType).flat().length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(filteredWinesByType).map(([type, wines]) => (
            wines.length > 0 && (
              <div key={type} className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {type.charAt(0).toUpperCase() + type.slice(1)} Wines
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wines.map((wine, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="p-6 relative">
                        <h3 className="text-xl font-semibold mb-2">{wine.name || 'No Name'}</h3>
                        <p className="text-gray-500 text-sm line-clamp-3">{wine.genericName || 'No Description'}</p>
                        <button onClick={() => toggleFavorite(wine)} className="absolute top-2 right-2 focus:outline-none">
                          <Star className={`h-5 w-5 ${isFavorite(wine) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
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
  );
};

export default WineList;