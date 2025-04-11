import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchWines, fetchOpenFoodFactsWines } from '../lib/api.js';
const WINE_FAVORITES_KEY = 'wineFavorites';
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
  useEffect(() => {
    const loadWines = async () => {
      setLoading(true);
      try {
        const red = await fetchOpenFoodFactsWines('red');
        const white = await fetchOpenFoodFactsWines('white');
        const rose = await fetchOpenFoodFactsWines('rose');
        const sparkling = await fetchOpenFoodFactsWines('sparkling');
        setRedWines(red.filter(w => w.name));
        setWhiteWines(white.filter(w => w.name));
        setRoseWines(rose.filter(w => w.name));
        setSparklingWines(sparkling.filter(w => w.name));
      } catch (err) {
        setError('Failed to load wines.');
      }
      setLoading(false);
    };
    loadWines();
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
  const handleSuggestionClick = (text) => {
    setSearchTerm(text);
    setShowSuggestions(false);
  };
  useEffect(() => {
    if (searchTerm.length > 1) {
      setSuggestions(
        ["Merlot", "Pinot Noir", "Cabernet", "Rosé", "Chardonnay"].filter(s =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);
  const isFavorite = (wineType) => favorites.includes(wineType);
  const toggleFavorite = (wineType) => {
    let updatedFavorites;
    if (favorites.includes(wineType)) {
      updatedFavorites = favorites.filter(fav => fav !== wineType);
    } else {
      updatedFavorites = [...favorites, wineType];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem(WINE_FAVORITES_KEY, JSON.stringify(updatedFavorites));
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
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#8B0000] w-64"
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
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#8B0000] w-48"
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
      {/* Wine Types Section */}
      <div className="mb-12 bg-[#FFF8F8] p-6 rounded-xl animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Wine Types Guide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {wineTypes.map((wine) => (
            <div
              key={wine.type}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition transform duration-300 relative"
            >
              <button
                onClick={() => toggleFavorite(wine.type)}
                className="absolute top-2 right-2 z-10 p-1"
                title="Toggle Favorite"
              >
                <Star
                  className={`h-6 w-6 ${
                    isFavorite(wine.type) ? 'text-yellow-400 fill-current' : 'text-gray-300'
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
                  <p className="text-sm text-gray-700">{wine.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
