import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Star, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchWines, fetchOpenFoodFactsWines } from '../lib/api.js';

const WINE_FAVORITES_KEY = 'wineFavorites';

const wineTypes = [
  {
    type: 'Red Wine',
    description: 'Full-bodied and rich in tannins...',
    image: 'https://images.unsplash.com/photo-1561461056-77634126673a',
    apiType: 'red',
    path: '/wines/red',
  },
  {
    type: 'White Wine',
    description: 'Crisp and refreshing...',
    image: 'https://images.unsplash.com/photo-1558346489-19413928158b',
    apiType: 'white',
    path: '/wines/white',
  },
  {
    type: 'Rosé',
    description: 'Fresh and vibrant...',
    image: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0',
    apiType: 'rose',
    path: '/wines/rose',
  },
  {
    type: 'Sparkling',
    description: 'Effervescent and celebratory...',
    image: 'https://plus.unsplash.com/premium_photo-1677327746215-6d9411e306f1',
    apiType: 'sparkling',
    path: '/wines/sparkling',
  },
];

const WineList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem(WINE_FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wines, setWines] = useState([]);
  const [error, setError] = useState('');
  const searchRef = useRef(null);

  const [redWines, setRedWines] = useState([]);
  const [whiteWines, setWhiteWines] = useState([]);
  const [roseWines, setRoseWines] = useState([]);
  const [sparklingWines, setSparklingWines] = useState([]);

  const allWinesByType = {
    red: redWines,
    white: whiteWines,
    rose: roseWines,
    sparkling: sparklingWines,
  };

  const shouldDisplaySearchResults = searchTerm.length > 1 && wines.length > 0;
  const filteredSearchResults = wines;
  const filteredWinesByType = selectedType
    ? { [selectedType]: allWinesByType[selectedType] }
    : allWinesByType;
  const shouldDisplayByType = !searchTerm || wines.length === 0;

  useEffect(() => {
    const loadWines = async () => {
      setLoading(true);
      try {
        const red = await fetchOpenFoodFactsWines('red');
        const white = await fetchOpenFoodFactsWines('white');
        const rose = await fetchOpenFoodFactsWines('rose');
        const sparkling = await fetchOpenFoodFactsWines('sparkling');
        setRedWines(red.filter((w) => w.name));
        setWhiteWines(white.filter((w) => w.name));
        setRoseWines(rose.filter((w) => w.name));
        setSparklingWines(sparkling.filter((w) => w.name));
      } catch (err) {
        setError('Failed to load wines.');
      }
      setLoading(false);
    };
    loadWines();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedFavorites = localStorage.getItem(WINE_FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      setSuggestions(
        ['Merlot', 'Pinot Noir', 'Cabernet', 'Rosé', 'Chardonnay'].filter((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (text) => {
    setSearchTerm(text);
    setShowSuggestions(false);
  };

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
        setWines(searchResults.filter((wine) => wine.title));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch search results. Please try again.');
        setLoading(false);
        console.error('Error fetching search results:', err);
      }
    };
    fetchSearchResults();
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem(WINE_FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (wine) => {
    if (wine.title) {
      return favorites.some((fav) => fav.name === wine.title);
    } else if (wine.name) {
      return favorites.some(
        (fav) => fav.name === wine.name && fav.genericName === wine.genericName
      );
    }
    return false;
  };

  const toggleFavorite = (wine, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const wineToAdd = wine.title
      ? { name: wine.title, genericName: wine.description || '' }
      : { name: wine.name, genericName: wine.genericName || '' };
    const isAlreadyFavorite = isFavorite(wine);
    if (isAlreadyFavorite) {
      const updatedFavorites = favorites.filter((fav) => {
        if (wine.title) {
          return fav.name !== wine.title;
        } else {
          return !(
            fav.name === wine.name && fav.genericName === wine.genericName
          );
        }
      });
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, wineToAdd]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Wine Collection</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search wines..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#8b0000] w-64"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-md w-full">
                {suggestions.map((sug, i) => (
                  <div
                    key={i}
                    onClick={() => handleSuggestionClick(sug)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {sug}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#8b0000] w-48"
            >
              <option value="">All Types</option>
              <option value="red">Red</option>
              <option value="white">White</option>
              <option value="rose">Rosé</option>
              <option value="sparkling">Sparkling</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-12 bg-[#fff8f8] p-6 rounded-xl animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Wine Types Guide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {wineTypes.map((wine) => (
            <div
              key={wine.type}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition transform duration-300 relative"
            >
              <button
                onClick={(e) => toggleFavorite({ name: wine.type, genericName: '' }, e)}
                className="absolute top-2 right-2 z-10 p-1"
                title="Toggle Favorite"
              >
                <Star
                  className={`h-6 w-6 ${
                    isFavorite({ name: wine.type, genericName: '' })
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
              <Link to={wine.path}>
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
                  <p className="text-gray-600 text-sm">{wine.description}</p>
                </div>
              </Link>
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
        <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">{error}</div>
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
              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{wine.title}</h3>
                  <button
                    onClick={(e) => toggleFavorite(wine, e)}
                    className="focus:outline-none"
                    aria-label={isFavorite(wine) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        isFavorite(wine) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-600">
                    {wine.averageRating ? wine.averageRating.toFixed(1) : 'N/A'}
                    {wine.ratingCount ? ` (${wine.ratingCount} reviews)` : ''}
                  </span>
                </div>
                <p className="text-[#8b0000] font-semibold mb-4">
                  {wine.price || 'Price not available'}
                </p>
                <p className="text-gray-500 text-sm line-clamp-3">
                  {wine.description || 'No description available'}
                </p>
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

      {shouldDisplayByType &&
        Object.values(filteredWinesByType).flat().length === 0 &&
        !loading &&
        !error && (
          <div className="text-center py-12 text-gray-500">
            No wines found for the selected type.
          </div>
        )}

      {shouldDisplayByType &&
        !loading &&
        !error &&
        Object.values(filteredWinesByType).flat().length > 0 && (
          <div>
            {Object.entries(filteredWinesByType).map(([type, wines]) =>
              wines.length > 0 ? (
                <div key={type} className="mb-12">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Wines
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wines.map((wine, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold">{wine.name}</h3>
                            <button
                              onClick={(e) => toggleFavorite(wine, e)}
                              className="focus:outline-none"
                              aria-label={
                                isFavorite(wine) ? 'Remove from favorites' : 'Add to favorites'
                              }
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  isFavorite(wine)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          </div>
                          <p className="text-gray-500 text-sm line-clamp-3">
                            {wine.genericName || 'No description available'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}

      <div className="fixed bottom-8 right-8">
        <Link
          to="/favorites"
          className="flex items-center gap-2 bg-[#8b0000] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#6b0000] transition-colors"
        >
          <Star className="h-5 w-5" />
          <span>My Favorites ({favorites.length})</span>
        </Link>
      </div>
    </div>
  );
};

export default WineList;
